import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ENDPOINTS } from '@/config/endpoints';
import { awsClient } from '@/integrations/aws/client';
import { cn } from '@/lib/utils';
import { RefreshCw, CheckCircle2, XCircle, Clock, Download, Search } from 'lucide-react';

interface NodeTestResult {
  nodeType: string;
  passed: boolean;
  executionTimeMs: number;
  error?: string;
  assertionsFailed?: string[];
}

interface BatchTestResponse {
  totalNodes: number;
  passed: number;
  failed: number;
  passRate: number;
  results: NodeTestResult[];
  timestamp: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  triggers: 'bg-primary/10 text-primary border-primary/30',
  logic: 'bg-secondary/10 text-secondary-foreground border-secondary/30',
  data: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
  utility: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/30',
  ai: 'bg-violet-500/10 text-violet-700 border-violet-500/30',
  crm: 'bg-pink-500/10 text-pink-700 border-pink-500/30',
  devops: 'bg-orange-500/10 text-orange-700 border-orange-500/30',
  analytics: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
  payment: 'bg-yellow-600/10 text-yellow-700 border-yellow-600/30',
  output: 'bg-slate-500/10 text-slate-700 border-slate-500/30',
  productivity: 'bg-teal-500/10 text-teal-700 border-teal-500/30',
};

function guessCategory(nodeType: string): string {
  if (['manual_trigger', 'schedule', 'interval', 'webhook', 'chat_trigger', 'error_trigger', 'workflow_trigger', 'form', 'whatsapp_trigger', 'instagram_trigger'].includes(nodeType)) return 'triggers';
  if (['if_else', 'switch', 'filter', 'loop', 'split_in_batches', 'merge', 'merge_data', 'wait', 'noop', 'stop_and_error', 'error_handler', 'human_approval', 'retry_with_backoff', 'circuit_breaker', 'timeout_guard', 'fallback_router', 'escalation_router', 'workflow_state_manager', 'execution_context_store', 'session_manager', 'human_handoff_notification'].includes(nodeType)) return 'logic';
  if (['set', 'set_variable', 'edit_fields', 'rename_keys', 'aggregate', 'sort', 'limit', 'item_lists', 'function', 'function_item', 'javascript', 'json_parser', 'csv', 'xml', 'text_formatter', 'execute_command', 'math'].includes(nodeType)) return 'data';
  if (['date_time', 'crypto', 'html_extract', 'rss_feed_read', 'read_binary_file', 'write_binary_file', 'document_ocr', 'resume_parser', 'invoice_parser', 'document_classifier', 'file_metadata_extractor', 'http_request', 'graphql', 'respond_to_webhook'].includes(nodeType)) return 'utility';
  if (nodeType.includes('crm')) return 'crm';
  if (['alert_correlation_engine', 'incident_classifier', 'auto_remediation_planner', 'postmortem_generator'].includes(nodeType)) return 'devops';
  if (['agent_performance_tracker', 'cost_monitor', 'accuracy_evaluator', 'compliance_log_writer', 'feedback_loop_collector'].includes(nodeType)) return 'analytics';
  if (['expense_categorizer', 'payment_reminder_engine', 'audit_trail_generator', 'tax_rule_engine', 'fraud_detection_node'].includes(nodeType)) return 'payment';
  if (['log_output', 'chat_send', 'email_sequence_sender', 'auto_followup_sender', 'approval_request_sender', 'reminder_scheduler', 'human_handoff_notification'].includes(nodeType)) return 'output';
  if (['knowledge_base_search', 'onboarding_flow_generator', 'policy_sync_node', 'employee_faq_indexer', 'schedulewise'].includes(nodeType)) return 'productivity';
  return 'ai';
}

export default function NodeTestPage() {
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle');
  const [response, setResponse] = useState<BatchTestResponse | null>(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const runTests = useCallback(async () => {
    setState('running');
    try {
      const { data: sessionData } = await awsClient.auth.getSession();
      const token = sessionData?.session?.access_token ?? '';
      const res = await fetch(`${ENDPOINTS.itemBackend}/api/test-all-type1-nodes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const data: BatchTestResponse = await res.json();
      setResponse(data);
      setState('done');
    } catch (err) {
      console.error('Batch test failed:', err);
      setState('idle');
    }
  }, []);

  const exportCsv = useCallback(() => {
    if (!response) return;
    const header = 'nodeType,category,passed,executionTimeMs,error';
    const rows = response.results.map((r) =>
      `${r.nodeType},${guessCategory(r.nodeType)},${r.passed},${r.executionTimeMs},"${r.error ?? ''}"`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `node-test-results-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [response]);

  const filteredResults = (response?.results ?? []).filter((r) => {
    if (statusFilter === 'passed' && !r.passed) return false;
    if (statusFilter === 'failed' && r.passed) return false;
    const cat = guessCategory(r.nodeType);
    if (categoryFilter !== 'all' && cat !== categoryFilter) return false;
    if (filter && !r.nodeType.toLowerCase().includes(filter.toLowerCase())) return false;
    return true;
  });

  const categories = Array.from(new Set((response?.results ?? []).map((r) => guessCategory(r.nodeType)))).sort();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Type 1 Node Test Runner</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Automated testing for all nodes that require no external credentials.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {response && (
              <Button variant="outline" size="sm" onClick={exportCsv} className="gap-1.5 text-xs">
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </Button>
            )}
            <Button
              size="sm"
              onClick={runTests}
              disabled={state === 'running'}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className={cn('h-3.5 w-3.5', state === 'running' && 'animate-spin')} />
              {state === 'running' ? 'Running tests…' : state === 'done' ? 'Re-run All' : 'Run All Tests'}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        {response && (
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-lg border border-border/60 bg-card p-4">
              <p className="text-xs text-muted-foreground">Total nodes</p>
              <p className="text-2xl font-bold mt-1">{response.totalNodes}</p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 p-4">
              <p className="text-xs text-emerald-700 dark:text-emerald-400">Passed</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">{response.passed}</p>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-xs text-destructive">Failed</p>
              <p className="text-2xl font-bold text-destructive mt-1">{response.failed}</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-4">
              <p className="text-xs text-muted-foreground">Pass rate</p>
              <p className={cn(
                'text-2xl font-bold mt-1',
                response.passRate >= 80 ? 'text-emerald-600' : response.passRate >= 50 ? 'text-yellow-600' : 'text-destructive'
              )}>
                {response.passRate}%
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        {response && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter by node type…"
                className="pl-8 h-8 text-xs border-border/60"
              />
            </div>
            <div className="flex items-center gap-1">
              {(['all', 'passed', 'failed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'h-7 px-3 rounded-md text-xs font-medium transition-colors',
                    statusFilter === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/40 text-muted-foreground hover:bg-muted/60'
                  )}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setCategoryFilter('all')}
                className={cn(
                  'h-7 px-2 rounded-md text-xs transition-colors',
                  categoryFilter === 'all'
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/40'
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'h-7 px-2 rounded-md text-xs transition-colors capitalize',
                    categoryFilter === cat
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/40'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Table */}
        {state === 'idle' && !response && (
          <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 py-20 flex flex-col items-center gap-3 text-muted-foreground">
            <RefreshCw className="h-8 w-8 opacity-30" />
            <p className="text-sm">Click "Run All Tests" to start testing all Type 1 nodes.</p>
          </div>
        )}

        {state === 'running' && (
          <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 py-20 flex flex-col items-center gap-3 text-muted-foreground">
            <RefreshCw className="h-8 w-8 opacity-50 animate-spin" />
            <p className="text-sm">Running tests for all nodes… this may take 30–60 seconds.</p>
          </div>
        )}

        {state === 'done' && response && (
          <ScrollArea className="h-[520px] rounded-lg border border-border/60">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr className="border-b border-border/60">
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground w-8">Status</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Node Type</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Category</th>
                  <th className="text-right px-3 py-2.5 font-medium text-muted-foreground w-20">Time</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Error / Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((r) => {
                  const cat = guessCategory(r.nodeType);
                  return (
                    <tr
                      key={r.nodeType}
                      className={cn(
                        'border-b border-border/30 transition-colors',
                        r.passed ? 'hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20' : 'bg-destructive/5 hover:bg-destructive/10'
                      )}
                    >
                      <td className="px-3 py-2">
                        {r.passed
                          ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          : <XCircle className="h-4 w-4 text-destructive" />
                        }
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px]">{r.nodeType}</td>
                      <td className="px-3 py-2">
                        <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-medium border capitalize', CATEGORY_COLORS[cat] ?? 'bg-muted text-muted-foreground border-border/40')}>
                          {cat}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                        <span className="flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" />
                          {r.executionTimeMs}ms
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground max-w-[300px] truncate">
                        {r.error ?? <span className="text-emerald-600 text-[10px]">All assertions passed</span>}
                      </td>
                    </tr>
                  );
                })}
                {filteredResults.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-muted-foreground">
                      No results match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </ScrollArea>
        )}

        {response && (
          <p className="text-[10px] text-muted-foreground text-right">
            Last run: {new Date(response.timestamp).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
