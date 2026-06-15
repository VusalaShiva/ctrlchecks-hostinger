import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { ENDPOINTS } from '@/config/endpoints';
import { awsClient } from '@/integrations/aws/client';

export interface WorkflowMissingConnection {
  provider: string;
  displayName: string;
  nodes: string[];
}

async function fetchWorkflowMissingConnections(workflowId: string): Promise<WorkflowMissingConnection[]> {
  const { data: { session } } = await awsClient.auth.getSession();
  const token = session?.access_token;

  const res = await fetch(`${ENDPOINTS.itemBackend}/api/workflows/${workflowId}/missing-items`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) return [];

  const body = await res.json();
  const credentials: Array<{ provider: string; displayName: string; nodes?: string[]; satisfied?: boolean }> =
    body.credentials || [];

  // Only return credentials that are explicitly missing (satisfied === false)
  return credentials
    .filter((c) => c.satisfied === false)
    .map((c) => ({
      provider: c.provider,
      displayName: c.displayName || c.provider,
      nodes: c.nodes || [],
    }));
}

export function useWorkflowConnectionStatus(workflowId: string | null | undefined) {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const queryClient = useQueryClient();
  const location = useLocation();
  const wasOnConnections = useRef(false);

  // 7-second delay before first check — gives the workflow time to fully render
  // Resets whenever workflowId changes (new workflow opened)
  useEffect(() => {
    setQueryEnabled(false);
    if (!workflowId || workflowId === 'new') return;
    const timer = setTimeout(() => setQueryEnabled(true), 7000);
    return () => clearTimeout(timer);
  }, [workflowId]);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['workflow-connection-status', workflowId],
    queryFn: () => fetchWorkflowMissingConnections(workflowId!),
    enabled: queryEnabled && !!workflowId && workflowId !== 'new',
    staleTime: 30_000,
    retry: 1,
  });

  // Auto-recheck when user navigates back from /connections
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/connections')) {
      wasOnConnections.current = true;
    } else if (wasOnConnections.current && workflowId && workflowId !== 'new') {
      wasOnConnections.current = false;
      queryClient.invalidateQueries({ queryKey: ['workflow-connection-status', workflowId] });
    }
  }, [location.pathname, workflowId, queryClient]);

  // isLoading = true only when the API call is actually in flight (not during the 7s delay)
  const isLoading = queryEnabled && isFetching && data === undefined;

  return {
    missingConnections: data ?? [],
    isLoading,
    recheck: refetch,
  };
}
