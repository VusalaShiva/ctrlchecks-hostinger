import { awsClient } from '@/integrations/aws/client';
import { getBackendUrl } from './getBackendUrl';

export type GeminiWalletStatus = 'empty' | 'active' | 'invalid' | 'quota_exceeded' | 'error' | 'disabled';

export interface GeminiWalletState {
  enabled: boolean;
  status: GeminiWalletStatus;
  hasKey: boolean;
  maskedKey: string | null;
  lastValidatedAt: string | null;
  lastUsedAt: string | null;
  lastErrorCode: string | null;
  lastErrorMessage: string | null;
  subscriptionFrozen: boolean;
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await awsClient.auth.getSession();
  const token = data?.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function walletFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = await authHeaders();
  const response = await fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...headers, ...(init?.headers || {}) },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    let message = text || `Request failed: ${response.status}`;
    let code: string | undefined;
    try {
      const parsed = JSON.parse(text) as { error?: string; message?: string; code?: string };
      message = parsed.message || parsed.error || message;
      code = parsed.code;
    } catch {
      // keep raw message
    }
    const error = new Error(message) as Error & { code?: string; statusCode?: number };
    error.code = code;
    error.statusCode = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
}

function unwrapWallet(data: { wallet: GeminiWalletState }): GeminiWalletState {
  return data.wallet;
}

export async function getGeminiWallet(): Promise<GeminiWalletState> {
  return unwrapWallet(await walletFetch<{ wallet: GeminiWalletState }>('/api/ai-wallet/gemini'));
}

export async function saveGeminiWalletKey(apiKey: string): Promise<GeminiWalletState> {
  return unwrapWallet(await walletFetch<{ wallet: GeminiWalletState }>('/api/ai-wallet/gemini', {
    method: 'PUT',
    body: JSON.stringify({ apiKey }),
  }));
}

export async function testGeminiWallet(): Promise<GeminiWalletState> {
  return unwrapWallet(await walletFetch<{ wallet: GeminiWalletState }>('/api/ai-wallet/gemini/test', {
    method: 'POST',
    body: '{}',
  }));
}

export async function activateGeminiWallet(): Promise<GeminiWalletState> {
  return unwrapWallet(await walletFetch<{ wallet: GeminiWalletState }>('/api/ai-wallet/gemini/activate', {
    method: 'POST',
    body: '{}',
  }));
}

export async function deactivateGeminiWallet(): Promise<GeminiWalletState> {
  return unwrapWallet(await walletFetch<{ wallet: GeminiWalletState }>('/api/ai-wallet/gemini/deactivate', {
    method: 'POST',
    body: '{}',
  }));
}

export async function deleteGeminiWallet(): Promise<GeminiWalletState> {
  return unwrapWallet(await walletFetch<{ wallet: GeminiWalletState }>('/api/ai-wallet/gemini', {
    method: 'DELETE',
  }));
}
