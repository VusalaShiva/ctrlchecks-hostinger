# Centralized Logging — CtrlChecks

## Log format

All 6 services emit structured JSON to stdout/stderr. Request logs:

```json
{"level":"info","service":"notification-service","method":"POST","path":"/notifications/email","status":202,"durationMs":45,"requestId":"a1b2c3d4-..."}
```

Fields:
- `level` — `info` / `warn` / `error` (HTTP 2xx/3xx/4xx → info/warn; 5xx → error)
- `service` — service name string
- `method`, `path`, `status`, `durationMs` — HTTP request info
- `requestId` — `x-request-id` header (UUID generated per request, echoed in response header)

Systemd collects all stdout/stderr into journald.

---

## Option A: AWS CloudWatch (recommended — same AWS account)

### Step 1 — Attach IAM role to EC2

Create an EC2 instance role with this inline policy (or attach `CloudWatchAgentServerPolicy`):

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams"
    ],
    "Resource": "arn:aws:logs:*:*:*"
  }]
}
```

Attach via EC2 console → Instance → Actions → Security → Modify IAM role.
**Do NOT put AWS credentials in `.env`** — use the instance role.

### Step 2 — Install CloudWatch Agent

```bash
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
```

### Step 3 — Configure log collection from journald

Create `/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json`:

```json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/journal/**",
            "log_group_name": "/ctrlchecks/worker",
            "log_stream_name": "ctrlchecks-worker",
            "filters": [{ "type": "include", "expression": "ctrlchecks-worker" }]
          }
        ]
      }
    },
    "log_stream_name": "ctrlchecks-{instance_id}"
  }
}
```

For better per-service granularity, configure individual journald unit collection using the systemd plugin:

```json
{
  "logs": {
    "logs_collected": {
      "journald": {
        "log_group_name": "/ctrlchecks",
        "units": [
          "ctrlchecks-worker.service",
          "ctrlchecks-ai-generator.service",
          "ctrlchecks-execution-engine.service",
          "ctrlchecks-credential-service.service",
          "ctrlchecks-notification-service.service",
          "ctrlchecks-trigger-service.service"
        ]
      }
    }
  }
}
```

### Step 4 — Start agent

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config -m ec2 \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json -s

sudo systemctl enable amazon-cloudwatch-agent
```

### Step 5 — CloudWatch Insights query

In AWS Console → CloudWatch → Log Insights, select `/ctrlchecks` log group:

```
# Find all errors in last 1 hour
fields @timestamp, service, status, path, requestId
| filter level = "error"
| sort @timestamp desc
| limit 100

# P95 latency per service
fields @timestamp, service, durationMs
| filter ispresent(durationMs)
| stats pct(durationMs, 95) as p95_ms by service
| sort p95_ms desc
```

---

## Option B: Loki + Promtail (self-hosted, same host)

### Install Loki + Promtail via docker-compose

Add to `infra/docker-compose.observability.yml`:

```yaml
version: '3.8'
services:
  loki:
    image: grafana/loki:3.0.0
    ports:
      - "127.0.0.1:3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - loki-data:/loki

  promtail:
    image: grafana/promtail:3.0.0
    volumes:
      - /var/log/journal:/var/log/journal:ro
      - /run/log/journal:/run/log/journal:ro
      - /etc/machine-id:/etc/machine-id:ro
      - ./infra/promtail-config.yaml:/etc/promtail/config.yaml:ro
    command: -config.file=/etc/promtail/config.yaml

volumes:
  loki-data:
```

Create `infra/promtail-config.yaml`:

```yaml
server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: journal
    journal:
      max_age: 12h
      labels:
        job: journald
    relabel_configs:
      - source_labels: ['__journal__systemd_unit']
        target_label: unit
      - source_labels: ['__journal__hostname']
        target_label: host
```

Start: `docker compose -f infra/docker-compose.observability.yml up -d`

### Connect Grafana to Loki

1. Grafana → Configuration → Data sources → Add data source → Loki
2. URL: `http://127.0.0.1:3100`
3. Save & Test

Query example:
```logql
{unit="ctrlchecks-worker.service"} |= "error" | json | line_format "{{.service}} {{.path}} {{.status}}"
```

---

## Log rotation

All services write to journald. Journald auto-rotates; control retention in `/etc/systemd/journald.conf`:

```ini
[Journal]
SystemMaxUse=1G
SystemKeepFree=500M
MaxRetentionSec=7day
```

Apply: `sudo systemctl restart systemd-journald`

---

## Quick log commands (on-call reference)

```bash
# All services — last 100 lines, follow
sudo journalctl -u ctrlchecks-worker -f -n 100

# All ctrlchecks units — last 200 errors only
sudo journalctl _SYSTEMD_UNIT=ctrlchecks-worker.service \
               _SYSTEMD_UNIT=ctrlchecks-ai-generator.service \
               _SYSTEMD_UNIT=ctrlchecks-trigger-service.service \
               -p err -n 200

# Find a specific request by requestId
sudo journalctl -u ctrlchecks-worker --since "1 hour ago" | grep "a1b2c3d4"

# Count 5xx errors per service in last hour
sudo journalctl --since "1 hour ago" | grep '"level":"error"' | grep '"status":5' | \
  python3 -c "import sys,json; [print(json.loads(l)['service']) for l in sys.stdin if l.strip()]" | sort | uniq -c
```
