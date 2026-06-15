import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listConnections,
  createConnection,
  updateConnection,
  deleteConnection,
  testConnection,
  type ConnectionRecord,
} from '@/lib/api/connections';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { invalidateAfterConnectionChange } from '@/lib/queryInvalidation';

export function useConnections() {
  return useQuery({ queryKey: QUERY_KEYS.connections, queryFn: listConnections });
}

export function useCreateConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createConnection,
    onSuccess: () => invalidateAfterConnectionChange(qc),
  });
}

export function useUpdateConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateConnection>[1] }) =>
      updateConnection(id, patch),
    onSuccess: () => invalidateAfterConnectionChange(qc),
  });
}

export function useDeleteConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteConnection(id),
    onSuccess: () => invalidateAfterConnectionChange(qc),
  });
}

export function useTestConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => testConnection(id),
    onSuccess: () => invalidateAfterConnectionChange(qc),
  });
}

export function useConnectionsByProvider(provider: string): ConnectionRecord[] {
  const { data = [] } = useConnections();
  return data.filter((c) => c.provider === provider);
}

export function useConnectionsByCredentialType(credentialTypeId: string): ConnectionRecord[] {
  const { data = [] } = useConnections();
  return data.filter((c) => c.credentialTypeId === credentialTypeId);
}
