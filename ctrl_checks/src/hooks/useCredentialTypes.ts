import { useQuery } from '@tanstack/react-query';
import { listCredentialTypes, type CredentialTypeDefinition } from '@/lib/api/connections';
import { QUERY_KEYS } from '@/lib/queryKeys';

export function useCredentialTypes() {
  return useQuery({ queryKey: QUERY_KEYS.credentialTypes, queryFn: listCredentialTypes, staleTime: 5 * 60_000 });
}

export function useCredentialType(id: string): CredentialTypeDefinition | undefined {
  const { data = [] } = useCredentialTypes();
  return data.find((t) => t.id === id);
}
