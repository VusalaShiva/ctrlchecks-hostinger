/**
 * OAuth rows for the post-build wizard: align UI + gates with unified-readiness style
 * (discoveredCredentials + credentialStatuses), plus live Google token checks.
 */

function norm(s: unknown): string {
  return String(s ?? '').trim().toLowerCase();
}

function normalizeOAuthId(vaultKey: string, credentialId: string): string {
  const v = norm(vaultKey) || norm(credentialId);
  if (v === 'gmail') return 'google';
  return v;
}

function rowDedupeKey(row: Record<string, unknown>): string {
  const vk = norm(row.vaultKey) || norm(row.credentialId);
  const id = vk === 'gmail' ? 'google' : vk;
  return `oauth::${id}`;
}

/**
 * OAuth connections the workflow may still need (from discovery + required_missing statuses).
 * Does not apply live token checks — use {@link filterStillBlockingOAuth} for gating.
 */
export function oauthRequirementCandidates(
  discoveredCredentials?: unknown[] | null,
  credentialStatuses?: unknown[] | null
): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const seen = new Set<string>();

  const push = (row: Record<string, unknown>) => {
    const k = rowDedupeKey(row);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(row);
  };

  const disc = Array.isArray(discoveredCredentials) ? discoveredCredentials : [];
  for (const c of disc) {
    if (norm((c as any)?.type) !== 'oauth') continue;
    if ((c as any).satisfied === true || (c as any).resolved === true) continue;
    push({ ...(c as any) });
  }

  const st = Array.isArray(credentialStatuses) ? credentialStatuses : [];
  for (const s of st) {
    if (norm((s as any)?.status) !== 'required_missing') continue;
    const cid = norm((s as any)?.credentialId);
    if (!cid || cid === 'none') continue;

    const matchedDisc = disc.some(
      (c) =>
        norm((c as any)?.type) === 'oauth' &&
        normalizeOAuthId(String((c as any).vaultKey || ''), String((c as any).credentialId || '')) ===
          normalizeOAuthId(cid, cid)
    );
    const isGoogleish = cid === 'google' || cid === 'gmail';
    if (!matchedDisc && !isGoogleish) continue;

    const nid = String((s as any)?.nodeId || '').trim();
    push({
      type: 'oauth',
      provider: isGoogleish ? 'google' : cid,
      vaultKey: isGoogleish ? 'google' : cid,
      credentialId: isGoogleish ? 'google' : cid,
      nodeIds: nid ? [nid] : [],
      displayName:
        (s as any).displayName ||
        (isGoogleish ? 'Google (Gmail, Drive, Sheets, …)' : cid),
    });
  }

  return out;
}

function statusShowsConnected(
  credentialStatuses: unknown[] | null | undefined,
  oauthId: string
): boolean {
  const st = Array.isArray(credentialStatuses) ? credentialStatuses : [];
  const want = normalizeOAuthId(oauthId, oauthId);
  return st.some((s: any) => {
    if (norm(s?.status) !== 'resolved_connected') return false;
    const sid = normalizeOAuthId(String(s?.credentialId || ''), String(s?.credentialId || ''));
    return sid === want;
  });
}

/**
 * Subset of candidates that still blocks save/continue (matches backend “missing credential” intent).
 */
export function filterStillBlockingOAuth(
  candidates: Record<string, unknown>[],
  credentialStatuses: unknown[] | null | undefined,
  googleOAuthConnectedLive: boolean
): Record<string, unknown>[] {
  return candidates.filter((row) => {
    if ((row as any).satisfied === true || (row as any).resolved === true) return false;
    const vk = String((row as any).vaultKey || (row as any).credentialId || '');
    const provider = String((row as any).provider || '');
    const oauthId = normalizeOAuthId(vk, String((row as any).credentialId || ''));
    if (statusShowsConnected(credentialStatuses, oauthId)) return false;
    if (oauthId === 'google' && googleOAuthConnectedLive) return false;
    return true;
  });
}

export function oauthRowNeedsGoogleConnect(row: Record<string, unknown>): boolean {
  const oauthId = normalizeOAuthId(
    String((row as any).vaultKey || ''),
    String((row as any).credentialId || '')
  );
  return oauthId === 'google' || norm((row as any).provider) === 'google';
}
