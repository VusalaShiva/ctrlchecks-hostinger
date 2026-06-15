import type { QueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';

/**
 * Invalidates every query that depends on connection state.
 * Call this after any OAuth callback success or credential save so that
 * the Connections list, credential dropdowns, and status badges all
 * refresh automatically — whether the change happened in this tab,
 * a popup window, or a redirect flow.
 */
export function invalidateAfterConnectionChange(qc: QueryClient): void {
  qc.invalidateQueries({ queryKey: QUERY_KEYS.connections });
  qc.invalidateQueries({ queryKey: QUERY_KEYS.credentialTypes });
}
