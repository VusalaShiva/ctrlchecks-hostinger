# Grafana Setup Guide — CtrlChecks

## Overview

Three importable Grafana dashboards in `infra/grafana/dashboards/`:

| File | Purpose |
|---|---|
| `ctrlchecks-overview.json` | Request rate, 5xx rate, p95 latency per service |
| `ctrlchecks-executions.json` | Queue depth, job success/fail, engine delegation |
| `ctrlchecks-ai.json` | AI generation rate, Gemini key pool, stage calls |

---

## Option A: Grafana Cloud (free tier — recommended for 1 EC2 host)

1. Sign up at [grafana.com/grafana/cloud](https://grafana.com/grafana/cloud)
2. Create a free stack (Prometheus remote-write included)
3. Install the Grafana Agent on EC2:
   ```bash
   # EC2 install
   curl -fsSL https://apt.grafana.com/gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/grafana.gpg
   echo "deb [signed-by=/usr/share/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
   sudo apt-get update && sudo apt-get install -y grafana-agent
   ```
4. Configure `/etc/grafana-agent.yaml` to remote-write to your Grafana Cloud stack (see cloud UI for URLs and API key)
5. Set the scrape config to point at each service's `/metrics`:
   ```yaml
   metrics:
     configs:
       - name: ctrlchecks
         scrape_configs:
           - job_name: ctrlchecks-services
             static_configs:
               - targets:
                   - 127.0.0.1:3001
                   - 127.0.0.1:3002
                   - 127.0.0.1:3003
                   - 127.0.0.1:3004
                   - 127.0.0.1:3005
                   - 127.0.0.1:3006
         remote_write:
           - url: https://<your-cloud-url>/api/prom/push
             basic_auth:
               username: <cloud-user-id>
               password: <cloud-api-key>
   ```
6. Start agent: `sudo systemctl enable grafana-agent && sudo systemctl start grafana-agent`

---

## Option B: Self-hosted Prometheus + Grafana on EC2

```bash
# Install Prometheus
PROM_VERSION=2.52.0
wget https://github.com/prometheus/prometheus/releases/download/v${PROM_VERSION}/prometheus-${PROM_VERSION}.linux-amd64.tar.gz
tar xf prometheus-${PROM_VERSION}.linux-amd64.tar.gz
sudo cp prometheus-${PROM_VERSION}.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-${PROM_VERSION}.linux-amd64/promtool /usr/local/bin/

# Copy the repo's prometheus.yml
sudo mkdir -p /etc/prometheus
sudo cp /opt/ctrlchecks-worker/infra/prometheus/prometheus.yml /etc/prometheus/prometheus.yml

# Systemd unit
cat | sudo tee /etc/systemd/system/prometheus.service <<'EOF'
[Unit]
Description=Prometheus
After=network.target

[Service]
User=ubuntu
ExecStart=/usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --storage.tsdb.retention.time=15d
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable prometheus
sudo systemctl start prometheus

# Install Grafana OSS
sudo apt-get install -y adduser libfontconfig1 musl
wget https://dl.grafana.com/oss/release/grafana_11.0.0_amd64.deb
sudo dpkg -i grafana_11.0.0_amd64.deb
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana default: `http://<EC2-IP>:3000` — **do NOT expose port 3000 publicly without authentication**.
Lock it down: add `GF_SERVER_HTTP_ADDR=127.0.0.1` in `/etc/grafana/grafana.ini` and access via SSH tunnel:
```bash
ssh -L 3000:localhost:3000 -i ctrlchecks-backend.pem ubuntu@3.7.115.58
```
Then open `http://localhost:3000` in your browser.

---

## Import dashboards

1. Log in to Grafana → `+` → **Import**
2. Paste JSON or upload file from `infra/grafana/dashboards/`
3. Select **Prometheus** as datasource when prompted
4. Repeat for all three JSON files

---

## Alert rules

Create the following alerts in Grafana (Alerting → Alert rules):

| Alert | Condition | Severity |
|---|---|---|
| Queue depth high | `ctrlchecks_execution_queue_depth > 100` for 5m | warning |
| Queue critical | `ctrlchecks_execution_queue_depth > 200` for 2m | critical |
| 5xx rate high | `rate(ctrlchecks_http_requests_total{status=~"5.."}[5m]) > 0.01` | critical |
| Engine unhealthy | `up{job="ctrlchecks-execution-engine"} == 0` for 1m | critical |
| Trigger service down | `up{job="ctrlchecks-trigger-service"} == 0` for 1m | warning |
| AI generator down | `up{job="ctrlchecks-ai-generator"} == 0` for 2m | warning |

Routing: Connect alert contact points to PagerDuty or Slack webhook in Grafana → Alerting → Contact points.

---

## Reference: Prometheus targets vs ports

| Service | Port | Metrics path |
|---|---|---|
| worker | 3001 | `/metrics` |
| ai-generator | 3002 | `/metrics` |
| execution-engine | 3003 | `/metrics` |
| credential-service | 3004 | `/metrics` |
| notification-service | 3005 | `/metrics` |
| trigger-service | 3006 | `/metrics` |

All `/metrics` endpoints are public (no auth) — they are bound to `127.0.0.1` so only localhost can reach them.
