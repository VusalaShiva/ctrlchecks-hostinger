#!/usr/bin/env bash
# CI static analysis: enforce edge ownership rule
# Forbidden patterns must not appear in capability stage/API files
# (only unified-graph-orchestrator.ts is allowed to touch workflow.edges)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

SEARCH_DIRS=(
  "$WORKSPACE_ROOT/worker/src/services/ai/stages"
  "$WORKSPACE_ROOT/worker/src/api/capability-selection"
)

PATTERNS=(
  'workflow\.edges\.push'
  'workflow\.edges[[:space:]]*=[[:space:]]*\['
)

EXCLUDE_FILE="unified-graph-orchestrator.ts"

found_violations=0

for dir in "${SEARCH_DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    continue
  fi

  # Find capability-*.ts files in stages dir, all .ts files in capability-selection dir
  if [[ "$dir" == *"/stages" ]]; then
    mapfile -t files < <(find "$dir" -maxdepth 1 -name "capability-*.ts" 2>/dev/null || true)
  else
    mapfile -t files < <(find "$dir" -name "*.ts" 2>/dev/null || true)
  fi

  for file in "${files[@]}"; do
    # Skip the orchestrator itself
    if [[ "$(basename "$file")" == "$EXCLUDE_FILE" ]]; then
      continue
    fi

    for pattern in "${PATTERNS[@]}"; do
      if grep -Eq "$pattern" "$file" 2>/dev/null; then
        echo "❌ VIOLATION: forbidden pattern '$pattern' found in:"
        echo "   $file"
        grep -En "$pattern" "$file" | while IFS= read -r line; do
          echo "   $line"
        done
        found_violations=1
      fi
    done
  done
done

if [ "$found_violations" -eq 1 ]; then
  echo ""
  echo "Edge ownership check FAILED."
  echo "Direct workflow.edges mutations are forbidden outside unified-graph-orchestrator.ts."
  echo "Use unifiedGraphOrchestrator.initializeWorkflow(), injectNode(), or reconcileWorkflow() instead."
  exit 1
fi

echo "✅ Edge ownership check passed — no forbidden patterns found."
exit 0
