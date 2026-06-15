import { awsClient } from '@/integrations/aws/client';
import { getBackendUrl } from './getBackendUrl';

export type RuntimeCredentialStatus = {
  connected: boolean;
  provider: string;
  scopes?: string[];
  expiresAt?: string | null;
  source?: string | null;
  reason?: string;
  details?: Record<string, unknown>;
};

export async function fetchRuntimeCredentialStatus(provider: string): Promise<RuntimeCredentialStatus> {
  const token = (await awsClient.auth.getSession()).data.session?.access_token;
  if (!token) return { connected: false, provider, reason: 'Unauthorized' };

  let response: Response;
  try {
    response = await fetch(`${getBackendUrl()}/api/credentials/status?provider=${encodeURIComponent(provider)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return { connected: false, provider, reason: 'network_error' };
  }

  if (!response.ok) {
    return { connected: false, provider, reason: `HTTP_${response.status}` };
  }

  return response.json();
}
