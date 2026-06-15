import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { awsClient } from '@/integrations/aws/client';
import { Plus, Search, Zap, MoreHorizontal, Play, Trash2, Copy, Clock, History, Bot, Cpu, Workflow, MessageSquare, ChevronRight, Edit, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { AppChromeHeader } from '@/components/layout/AppChromeHeader';
import GoogleConnectionStatus from '@/components/GoogleConnectionStatus';
import { WorkflowAuthGate } from '@/components/WorkflowAuthGate';
import { WorkflowActionButton } from '@/components/WorkflowActionButton';
import { WorkflowCreationOptions } from '@/components/workflow/WorkflowCreationOptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Tables, Json } from '@/integrations/aws/types';
import { is406Error } from '@/lib/utils';
import { workflowAPI } from '@/lib/api/workflowAPI';

type WorkflowRecord = Tables<'workflows'> & {
  last_execution?: { started_at: string; status: string } | null;
  execution_count?: number;
  workflow_type?: 'chatbot' | 'agent' | 'automation';
};

type Execution = Tables<'executions'>;

// Detect workflow type from nodes
const detectWorkflowType = (nodes: Json): 'chatbot' | 'agent' | 'automation' => {
  if (!Array.isArray(nodes)) return 'automation';

  const nodeTypes = nodes.map((n: any) => n?.data?.type || n?.type).filter(Boolean);

  // Check for AI nodes (chatbot/agent indicators)
  const hasAINodes = nodeTypes.some((type: string) =>
    ['openai_gpt', 'anthropic_claude', 'google_gemini', 'memory'].includes(type)
  );

  // Check for reasoning/agent patterns
  const hasReasoning = nodeTypes.some((type: string) =>
    type.includes('reasoning') || type.includes('agent')
  );

  if (hasReasoning) return 'agent';
  if (hasAINodes && nodeTypes.includes('webhook')) return 'chatbot';
  if (hasAINodes) return 'agent';
  return 'automation';
};

export default function Workflows() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRecord | null>(null);
  const [workflowExecutions, setWorkflowExecutions] = useState<Execution[]>([]);
  const [loadingExecutions, setLoadingExecutions] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      setStatsLoading(true);
      setLoadError(null);
      // Phase 1: Load workflows fast and render immediately
      const { data: workflowsData, error: workflowsError } = await awsClient
        .from('workflows')
        .select('*')
        .eq('setup_completed', true)
        .order('updated_at', { ascending: false });

      if (workflowsError) throw workflowsError;
      const baseWorkflows = (workflowsData || []).map((workflow) => ({
        ...workflow,
        last_execution: null,
        execution_count: 0,
        workflow_type: detectWorkflowType(workflow.nodes),
      }));
      if (mountedRef.current) {
        setWorkflows(baseWorkflows);
        setLoadError(null);
        setLoading(false);
      }

      // Phase 2: Batch load execution stats in one query (avoids 2*N requests)
      const workflowIds = baseWorkflows.map((w) => w.id);
      if (workflowIds.length === 0) {
        if (mountedRef.current) setStatsLoading(false);
        return;
      }

      const CHUNK_SIZE = 100;
      const executionRows: any[] = [];
      for (let i = 0; i < workflowIds.length; i += CHUNK_SIZE) {
        const idChunk = workflowIds.slice(i, i + CHUNK_SIZE);
        const { data: executionsData, error: executionsError } = await awsClient
          .from('executions')
          .select('workflow_id, started_at, status')
          .in('workflow_id', idChunk)
          .order('started_at', { ascending: false })
          .limit(10000);

        if (executionsError) {
          if (!is406Error(executionsError)) {
            console.warn('Error loading execution stats batch:', executionsError);
          }
          continue;
        }
        if (Array.isArray(executionsData) && executionsData.length > 0) {
          executionRows.push(...executionsData);
        }
      }

      const statsByWorkflow = new Map<string, { execution_count: number; last_execution: { started_at: string; status: string } | null }>();
      for (const exec of executionRows) {
        const workflowId = (exec as any).workflow_id as string;
        const startedAt = (exec as any).started_at as string;
        const status = (exec as any).status as string;
        const existing = statsByWorkflow.get(workflowId);
        if (!existing) {
          statsByWorkflow.set(workflowId, {
            execution_count: 1,
            last_execution: { started_at: startedAt, status },
          });
        } else {
          existing.execution_count += 1;
        }
      }

      if (mountedRef.current) {
        const applyExecutionStats = (workflow: WorkflowRecord): WorkflowRecord => {
          const stats = statsByWorkflow.get(workflow.id);
          if (!stats) return workflow;
          return {
            ...workflow,
            execution_count: stats.execution_count,
            last_execution: stats.last_execution,
          };
        };
        setWorkflows((prev) =>
          prev.map(applyExecutionStats)
        );
        setSelectedWorkflow((prev) => (prev ? applyExecutionStats(prev) : prev));
        setStatsLoading(false);
      }
    } catch (error) {
      console.error('Error loading workflows:', error);
      if (mountedRef.current) {
        setLoadError('Unable to load workflows. Please retry in a moment.');
      }
      toast({
        title: 'Error',
        description: 'Failed to load workflows',
        variant: 'destructive',
      });
    } finally {
      if (mountedRef.current) setLoading(false);
      if (mountedRef.current) setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      loadWorkflows();
    }
  }, [user?.id, loadWorkflows]);

  const loadWorkflowExecutions = async (workflowId: string) => {
    setLoadingExecutions(true);
    try {
      const { data, error } = await awsClient
        .from('executions')
        .select('*')
        .eq('workflow_id', workflowId)
        .order('started_at', { ascending: false })
        .limit(20);

      if (error) {
        // Handle 406 errors gracefully (expected when no executions exist)
        const isNotAcceptable = error.code === 'PGRST116' ||
          error.message?.includes('406') ||
          (error as any).status === 406 ||
          (error as any).statusCode === 406;

        if (isNotAcceptable) {
          setWorkflowExecutions([]);
          return;
        }
        throw error;
      }
      setWorkflowExecutions(data || []);
    } catch (error) {
      console.error('Error loading executions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load execution history',
        variant: 'destructive',
      });
    } finally {
      setLoadingExecutions(false);
    }
  };

  const deleteWorkflow = async (id: string) => {
    // Optimistic: remove immediately so the UI feels instant
    setWorkflows(prev => prev.filter(w => w.id !== id));

    try {
      await workflowAPI.deleteWorkflow(id);
      toast({
        title: 'Deleted',
        description: 'Workflow deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting workflow:', error);
      // Rollback: reload list from server
      loadWorkflows();
      toast({
        title: 'Error',
        description: 'Failed to delete workflow',
        variant: 'destructive',
      });
    }
  };

  const duplicateWorkflow = async (workflow: Workflow) => {
    try {
      const { data, error } = await awsClient
        .from('workflows')
        .insert({
          name: `${workflow.name} (Copy)`,
          nodes: workflow.nodes,
          edges: workflow.edges,
          user_id: user!.id,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setWorkflows([data, ...workflows]);
        toast({
          title: 'Duplicated',
          description: 'Workflow duplicated successfully',
        });
      }
    } catch (error) {
      console.error('Error duplicating workflow:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate workflow',
        variant: 'destructive',
      });
    }
  };

  const filteredWorkflows = workflows.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'paused': return 'bg-warning/10 text-warning border-warning/20';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getWorkflowTypeIcon = (type?: string) => {
    switch (type) {
      case 'chatbot': return <MessageSquare className="h-4 w-4" />;
      case 'agent': return <Bot className="h-4 w-4" />;
      default: return <Workflow className="h-4 w-4" />;
    }
  };

  const getWorkflowTypeLabel = (type?: string) => {
    switch (type) {
      case 'chatbot': return 'Chatbot';
      case 'agent': return 'AI Agent';
      default: return 'Automation';
    }
  };

  const handleWorkflowClick = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    loadWorkflowExecutions(workflow.id);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <AppChromeHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <WorkflowAuthGate>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Workflows</h1>
              <p className="text-muted-foreground mt-1">Manage and run your automation workflows</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/executions')}
              >
                <History className="mr-2 h-4 w-4" /> Executions
              </Button>
              <WorkflowActionButton
                className="gradient-primary text-primary-foreground"
                onClick={() => setShowCreateOptions(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> New Workflow
              </WorkflowActionButton>
            </div>
          </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Workflows Grid */}
        {loadError ? (
          <Card className="border-destructive/40 bg-destructive/5">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-destructive/10 p-6 mb-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Workflows could not load</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">{loadError}</p>
              <Button variant="outline" onClick={loadWorkflows}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : filteredWorkflows.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Zap className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {search ? 'No workflows found' : 'No workflows yet'}
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                {search
                  ? 'Try a different search term'
                  : 'Create your first workflow to start automating your tasks'}
              </p>
              {!search && (
                <Button
                  className="gradient-primary text-primary-foreground"
                  onClick={() => setShowCreateOptions(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Workflow
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => handleWorkflowClick(workflow)}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {workflow.description || 'No description'}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/workflow/${workflow.id}`); }}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); duplicateWorkflow(workflow); }}>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => { e.stopPropagation(); deleteWorkflow(workflow.id); }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getWorkflowTypeIcon(workflow.workflow_type)}
                        {getWorkflowTypeLabel(workflow.workflow_type)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {statsLoading ? (
                          <Skeleton className="h-3.5 w-20" />
                        ) : (
                          <span>{workflow.execution_count || 0} executions</span>
                        )}
                      </div>
                      {workflow.last_execution && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(workflow.last_execution.started_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Updated</span>
                      <span>{new Date(workflow.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        </WorkflowAuthGate>
      </main>

      {/* Workflow Detail Dialog */}
      <Dialog open={!!selectedWorkflow} onOpenChange={(open) => !open && setSelectedWorkflow(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedWorkflow?.name}</DialogTitle>
            <DialogDescription>
              {selectedWorkflow?.description || 'View workflow details, execution history, and logs'}
            </DialogDescription>
          </DialogHeader>

          {selectedWorkflow && (
            <Tabs defaultValue="executions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="executions">Execution History</TabsTrigger>
                <TabsTrigger value="details">Workflow Details</TabsTrigger>
                <TabsTrigger value="logs">Recent Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="executions" className="space-y-4">
                {loadingExecutions ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : workflowExecutions.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No executions yet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          setSelectedWorkflow(null);
                          navigate(`/workflow/${selectedWorkflow.id}`);
                        }}
                      >
                        Run Workflow
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {workflowExecutions.map((execution) => (
                      <Card
                        key={execution.id}
                        className="hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedWorkflow(null);
                          navigate(`/execution/${execution.id}`);
                        }}
                      >
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge
                                variant="outline"
                                className={
                                  execution.status === 'success'
                                    ? 'bg-success/10 text-success border-success/20'
                                    : execution.status === 'failed'
                                      ? 'bg-destructive/10 text-destructive border-destructive/20'
                                      : ''
                                }
                              >
                                {execution.status}
                              </Badge>
                              <div className="text-sm">
                                <div className="font-medium">
                                  {new Date(execution.started_at).toLocaleString()}
                                </div>
                                {execution.duration_ms && (
                                  <div className="text-xs text-muted-foreground">
                                    Duration: {execution.duration_ms}ms
                                  </div>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          {execution.error && (
                            <div className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded">
                              {execution.error}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Workflow Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        {getWorkflowTypeIcon(selectedWorkflow.workflow_type)}
                        {getWorkflowTypeLabel(selectedWorkflow.workflow_type)}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className={getStatusColor(selectedWorkflow.status)}>
                        {selectedWorkflow.status}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Total Executions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {statsLoading ? <Skeleton className="h-8 w-12" /> : selectedWorkflow.execution_count || 0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Last Executed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedWorkflow.last_execution ? (
                        <div className="text-sm">
                          {new Date(selectedWorkflow.last_execution.started_at).toLocaleString()}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Never</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedWorkflow(null);
                    navigate(`/workflow/${selectedWorkflow.id}`);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Workflow
                </Button>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4">
                {loadingExecutions ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : workflowExecutions.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No execution logs available</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {workflowExecutions.slice(0, 5).map((execution) => {
                      const logs = (execution.logs as any) || [];
                      return (
                        <Card key={execution.id}>
                          <CardHeader>
                            <CardTitle className="text-sm">
                              Execution {new Date(execution.started_at).toLocaleString()}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {logs.length > 0 ? (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {logs.map((log: any, idx: number) => (
                                  <div key={idx} className="text-xs font-mono bg-muted p-2 rounded">
                                    <div className="font-semibold">{log.nodeName || log.nodeId}</div>
                                    {log.output && (
                                      <div className="mt-1 text-muted-foreground">
                                        {typeof log.output === 'string'
                                          ? log.output
                                          : JSON.stringify(log.output, null, 2)}
                                      </div>
                                    )}
                                    {log.error && (
                                      <div className="mt-1 text-destructive">{log.error}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No logs available</p>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 w-full"
                              onClick={() => {
                                setSelectedWorkflow(null);
                                navigate(`/execution/${execution.id}`);
                              }}
                            >
                              View Full Logs
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Workflow Creation Options Overlay */}
      {showCreateOptions && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateOptions(false);
            }
          }}
        >
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl px-4 py-8">
            <Button
              variant="ghost"
              onClick={() => setShowCreateOptions(false)}
              className="mb-4"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <WorkflowCreationOptions onNavigate={() => setShowCreateOptions(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
