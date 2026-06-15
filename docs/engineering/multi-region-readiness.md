# Multi-Region Readiness — CtrlChecks

## When to act (thresholds)

Do NOT split regions prematurely. Act when **two or more** of these are sustained for 48h+:

| Signal | Threshold | Action |
|---|---|---|
| Registered users | > 10,000 | Begin region planning |
| API p99 latency | > 500ms sustained | Profile before scaling out |
| RDS CPU | > 70% sustained | Add read replica first |
| RDS connections | > 80% of max | PgBouncer + read replica |
| EC2 CPU | > 60% sustained | Vertical scale or ASG first |
| Kafka consumer lag | > 10,000 messages | Add partitions / consumers |

**Default stance:** One EC2 host (`ubuntu@3.7.115.58`) is sufficient up to ~5,000 active users with the current async execution model.

---

## Phase 1 — Horizontal scale on current AWS account (no multi-region needed)

### 1.1 Stateless services — scale first (zero shared state)

These services can be added behind an ALB with no session concerns:

| Service | Port | State | Scale method |
|---|---|---|---|
| `ai-generator` | 3002 | Stateless | Multiple EC2 instances behind ALB |
| `execution-engine` | 3003 | Stateless (Redis queue) | Multiple instances consume shared Redis queue |
| `credential-service` | 3004 | DB-backed | Multiple instances, same RDS |
| `notification-service` | 3005 | DB-backed + Redis pub | Multiple instances, same Redis |
| `trigger-service` | 3006 | DB-backed | Multiple instances |

**`worker` (3001) requires session affinity** for WebSocket — see §1.3.

### 1.2 RDS read replica

Add a read replica for analytics, reporting, and read-heavy credential lookups:

```bash
# AWS CLI — create read replica
aws rds create-db-instance-read-replica \
  --db-instance-identifier ctrlchecks-postgres-read \
  --source-db-instance-identifier ctrlchecks-postgres \
  --db-instance-class db.t4g.medium \
  --availability-zone ap-south-1b  # different AZ from primary
```

Route read-only queries via `DATABASE_READ_URL` env var (add to worker `.env`). Write path stays on `DATABASE_URL`.

### 1.3 WebSocket sticky sessions (CRITICAL)

The WebSocket server (`GET /ws/executions`, `GET /ws/chat`) **must** stay on the worker process permanently. It uses an in-process map of `executionId → WebSocket`. Moving the WebSocket server or load-balancing it without sticky sessions will break real-time execution status updates.

When adding a second worker instance behind ALB:
1. Enable ALB target group stickiness: **duration-based** cookie, 1-hour TTL
2. All WebSocket connections from a browser will always hit the same worker
3. Execution status events flow through Redis pub/sub (`ws:exec:events`) — any worker instance subscribed to Redis will receive the event and forward to its connected clients

```bash
# Enable stickiness on ALB target group (AWS CLI)
aws elbv2 modify-target-group-attributes \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --attributes Key=stickiness.enabled,Value=true \
               Key=stickiness.type,Value=lb_cookie \
               Key=stickiness.lb_cookie.duration_seconds,Value=3600
```

### 1.4 Redis ElastiCache Multi-AZ

```bash
# Upgrade to Multi-AZ with automatic failover
aws elasticache modify-replication-group \
  --replication-group-id ctrlchecks-redis \
  --automatic-failover-enabled \
  --multi-az-enabled \
  --apply-immediately
```

Update `REDIS_URL` to point to the cluster endpoint (not a node endpoint) so all services automatically route to the primary.

---

## Phase 2 — Auto Scaling Group (when EC2 CPU > 60% for 30 min)

### 2.1 Create launch template

```bash
aws ec2 create-launch-template \
  --launch-template-name ctrlchecks-worker-lt \
  --version-description "v1" \
  --launch-template-data '{
    "ImageId": "ami-0xxxxxxx",
    "InstanceType": "t3.medium",
    "IamInstanceProfile": { "Name": "ctrlchecks-ec2-role" },
    "UserData": "base64-encoded-startup-script"
  }'
```

### 2.2 Create ASG

```bash
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name ctrlchecks-worker-asg \
  --launch-template LaunchTemplateName=ctrlchecks-worker-lt,Version='$Latest' \
  --min-size 1 --max-size 4 --desired-capacity 1 \
  --vpc-zone-identifier "subnet-xxx,subnet-yyy" \
  --target-group-arns "arn:aws:elasticloadbalancing:..."
```

Scale-out policy: EC2 CPU > 60% for 5 minutes → add 1 instance
Scale-in policy: EC2 CPU < 30% for 15 minutes → remove 1 instance

---

## Phase 3 — Multi-region (when p99 > 500ms due to geographic latency)

### Architecture

```
Route53 latency-based routing
  ├── ap-south-1 (Mumbai) — primary — all services + RDS primary
  └── us-east-1 (N. Virginia) — secondary — stateless services + RDS read replica
```

### Step-by-step (reference only — do not execute without planning)

1. **CloudFront for frontend** (immediate win, no backend change):
   - Point CloudFront to S3 bucket with `ctrl_checks/dist/`
   - Serves from edge POPs globally — p99 < 50ms for static assets
   - `VITE_API_URL` points to worker via ALB

2. **ai-generator in secondary region** (lowest risk — stateless, no DB):
   - Deploy `services/ai-generator/` in us-east-1
   - Worker's `AI_GENERATOR_URL` points to whichever is closer (feature flag, not DNS)
   - Each region's ai-generator uses the same Gemini API key pool

3. **RDS cross-region read replica**:
   - Promote to standalone RDS in us-east-1 if read traffic warrants
   - Worker in us-east-1 reads from local replica, writes to ap-south-1 primary
   - Lag typically 100–300ms — acceptable for non-execution reads

4. **Do NOT split WebSocket server across regions** — sticky session + Redis pub/sub is sufficient at scale. Only reconsider when > 50k concurrent WebSocket connections per region.

5. **Execution state is always single-primary**:
   - `executions` table writes always go to ap-south-1 primary
   - Cross-region execution status reads can use read replica

---

## DNS / Route53 cutover checklist

When promoting a second region:

```
[ ] Create ALB in new region + health check target: /health/ready
[ ] Create Route53 health check pointing to new ALB
[ ] Add Route53 latency-based record for new region
[ ] Verify RDS read replica in new region is < 200ms behind
[ ] Verify Redis replication lag < 100ms
[ ] Run smoke tests: curl -fsS https://worker.ctrlchecks.ai/health
[ ] Run smoke tests: POST /api/execute-workflow with test workflow
[ ] Monitor for 24h before removing old record
[ ] DO NOT point WebSocket traffic to multiple regions without sticky sessions
```

---

## What NOT to do prematurely

- Do NOT add multi-region before sustained traffic warrants it (cost is ~3x for redundant infrastructure)
- Do NOT split WebSocket off the worker without a stateful session store (Redis-backed WS mapping)
- Do NOT migrate Kafka/MSK to multi-region until execution volume > 10k jobs/day
- Do NOT add a Service Mesh (Istio/Envoy) — unnecessary at this scale; ALB + health checks are sufficient
