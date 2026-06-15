#!/bin/bash
# CtrlChecks post-deploy smoke test.
# Usage: BASE_URL=https://api.example.com AUTH_TOKEN=<jwt> SMOKE_WORKFLOW_ID=<uuid> ./scripts/smoke-test.sh
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3001}"
TOKEN="${AUTH_TOKEN:-}"
SMOKE_WORKFLOW_ID="${SMOKE_WORKFLOW_ID:-}"
AI_GENERATOR_URL="${AI_GENERATOR_URL:-}"
AI_GENERATOR_SERVICE_KEY="${AI_GENERATOR_SERVICE_KEY:-}"

if [ -z "$TOKEN" ]; then
  echo "ERROR: AUTH_TOKEN is required"
  exit 1
fi

echo "=== CtrlChecks Smoke Tests ==="
echo "    BASE_URL: $BASE_URL"
echo ""

# 1. Health check
echo "1. Health check..."
HEALTH=$(curl -sf "$BASE_URL/api/health")
echo "   ✓ Health: $HEALTH"

if [ -n "$AI_GENERATOR_URL" ]; then
  AI_GEN_BASE="${AI_GENERATOR_URL%/}"
  echo "1b. AI generator health..."
  AI_GEN_HEALTH=$(curl -sf "$AI_GEN_BASE/health")
  echo "   OK AI generator health: $AI_GEN_HEALTH"

  if [ -n "$AI_GENERATOR_SERVICE_KEY" ]; then
    echo "1c. AI generator route mount..."
    STRUCTURAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$AI_GEN_BASE/generate/structural-prompt" \
      -H "x-service-key: $AI_GENERATOR_SERVICE_KEY" \
      -H "Content-Type: application/json" \
      -d '{}')
    if [ "$STRUCTURAL_STATUS" != "400" ]; then
      echo "   ERROR: expected /generate/structural-prompt to return 400 for empty input, got $STRUCTURAL_STATUS"
      exit 1
    fi
    echo "   OK AI generator structural route is mounted"
  else
    echo "1c. [skip] AI_GENERATOR_SERVICE_KEY not set - skipping protected ai-generator route check"
  fi
else
  echo "1b. [skip] AI_GENERATOR_URL not set - skipping ai-generator checks"
fi

# 2. Auth status
echo "2. Auth check..."
AUTH_CHECK=$(curl -sf -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/auth-status")
echo "   ✓ Auth: $AUTH_CHECK"

# 3. Workflow list
echo "3. Workflow list..."
WORKFLOWS=$(curl -sf -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/db/workflows")
COUNT=$(echo "$WORKFLOWS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d) if isinstance(d,list) else len(d.get('workflows',[])))" 2>/dev/null || echo "?")
echo "   ✓ Workflows: $COUNT items"

# 4. Execute a test workflow (optional — requires SMOKE_WORKFLOW_ID)
if [ -n "$SMOKE_WORKFLOW_ID" ]; then
  echo "4. Execute test workflow ($SMOKE_WORKFLOW_ID)..."
  EXEC=$(curl -sf -X POST "$BASE_URL/api/execute-workflow" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"workflowId\":\"$SMOKE_WORKFLOW_ID\",\"input\":{}}")
  EXEC_ID=$(echo "$EXEC" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('executionId',''))" 2>/dev/null || echo "")
  if [ -z "$EXEC_ID" ]; then
    echo "   ✗ Execute: no executionId returned"
    echo "   Response: $EXEC"
    exit 1
  fi
  echo "   ✓ Execute: executionId=$EXEC_ID"

  # 5. Poll for completion
  echo "5. Polling execution status..."
  ATTEMPTS=0
  while [ $ATTEMPTS -lt 20 ]; do
    sleep 3
    STATUS_RESP=$(curl -sf -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/execution-status/$EXEC_ID" || echo '{}')
    STATUS=$(echo "$STATUS_RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','unknown'))" 2>/dev/null || echo "unknown")
    echo "   ... status: $STATUS"
    if [ "$STATUS" = "success" ] || [ "$STATUS" = "failed" ] || [ "$STATUS" = "error" ]; then
      break
    fi
    ATTEMPTS=$((ATTEMPTS + 1))
  done
  echo "   ✓ Final status: $STATUS"

  if [ "$STATUS" = "failed" ] || [ "$STATUS" = "error" ]; then
    echo "   ✗ Execution ended in failed/error state"
    exit 1
  fi
else
  echo "4. [skip] SMOKE_WORKFLOW_ID not set — skipping execution test"
fi

echo ""
echo "=== All smoke tests passed ==="
