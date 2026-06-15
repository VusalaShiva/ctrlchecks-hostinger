/**
 * AWS Cognito auth client — backed by AWS Amplify + Cognito.
 * Exports `awsClient` (preferred) and `awsDb` (short alias for call-sites still migrating).
 *
 * Auth: AWS Amplify + Cognito.
 * DB `from()` calls: forwarded to the worker /api/db proxy.
 */

import { Amplify } from 'aws-amplify';
import {
  confirmSignUp,
  signIn,
  signOut,
  signUp,
  signInWithRedirect,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

// ─── Amplify Configuration ─────────────────────────────────────────────────

const cognitoUserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID || '';
const cognitoClientId   = import.meta.env.VITE_COGNITO_CLIENT_ID    || '';
const cognitoDomain     = import.meta.env.VITE_COGNITO_DOMAIN        || '';

if (cognitoUserPoolId && cognitoClientId) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId:       cognitoUserPoolId,
        userPoolClientId: cognitoClientId,
        loginWith: cognitoDomain
          ? {
              oauth: {
                domain:          cognitoDomain,
                scopes:          ['openid', 'email', 'profile'],
                redirectSignIn:  [
                  `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/google/callback`,
                  `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/facebook/callback`,
                ],
                redirectSignOut: [`${typeof window !== 'undefined' ? window.location.origin : ''}/`],
                responseType:    'code' as const,
              },
            }
          : undefined,
      },
    },
  });
} else {
  console.warn('[Auth] Cognito env vars not set — auth will not work');
}

// ─── Session helper (with 30-second cache to avoid Cognito rate limiting) ───

let _sessionCache: { session: any; expiresAt: number } | null = null;
let _sessionInflight: Promise<any> | null = null;  // deduplicates concurrent calls

async function buildSession() {
  // Return cached result (30s TTL) — prevents hammering Cognito on every DB query
  if (_sessionCache && Date.now() < _sessionCache.expiresAt) return _sessionCache.session;
  // If a fetch is already in-flight, return the same promise instead of starting another
  if (_sessionInflight) return _sessionInflight;

  _sessionInflight = (async () => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens?.accessToken) { _sessionCache = null; return null; }
      const cogUser = await getCurrentUser();

      // ID token already carries email/name for ALL login methods (email, Google, GitHub, Facebook).
      // fetchUserAttributes requires aws.cognito.signin.user.admin scope which is absent for
      // federated/admin-auth users — reading it here would always produce a 400 for those users.
      const idClaims = (session.tokens as any)?.idToken?.payload as Record<string, any> || {};

      const email =
        (idClaims.email as string) ||
        (cogUser.signInDetails?.loginId as string) ||
        '';

      const name =
        (idClaims.name as string) ||
        (idClaims.given_name as string) ||
        email.split('@')[0] ||
        'User';

      const built = {
        access_token: session.tokens.accessToken.toString(),
        expires_at:   session.tokens.accessToken.payload.exp as number | undefined,
        user: {
          id:            cogUser.userId,
          email,
          user_metadata: { role: 'user', full_name: name, name },
          banned_until:  undefined as string | undefined,
        },
      };
      _sessionCache = { session: built, expiresAt: Date.now() + 30_000 };
      return built;
    } catch {
      _sessionCache = null;
      return null;
    } finally {
      _sessionInflight = null;
    }
  })();

  return _sessionInflight;
}

/** Call this after sign-in/sign-out to invalidate the cache immediately */
function clearSessionCache() { _sessionCache = null; _sessionInflight = null; }

// ─── Auth compat ───────────────────────────────────────────────────────────

const auth = {
  /** Returns the current session (Cognito access token + user). */
  async getSession() {
    const session = await buildSession();
    return { data: { session }, error: null };
  },

  /** Returns the current user (same data as session.user). */
  async getUser() {
    const session = await buildSession();
    return { data: { user: session?.user ?? null }, error: null };
  },

  /** Subscribe to auth state changes. */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    buildSession().then((session) => {
      callback(session ? 'INITIAL_SESSION' : 'SIGNED_OUT', session);
    });

    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
        case 'tokenRefresh': {
          const s = await buildSession();
          callback(payload.event === 'signedIn' ? 'SIGNED_IN' : 'TOKEN_REFRESHED', s);
          break;
        }
        case 'signedOut':
          callback('SIGNED_OUT', null);
          break;
      }
    });

    return { data: { subscription: { unsubscribe } } };
  },

  async signUp({ email, password, options }: { email: string; password: string; options?: any }) {
    try {
      const result = await signUp({
        username: email,
        password,
        options: { userAttributes: { email, name: options?.data?.full_name || '' } },
      });
      return { data: { user: { id: result.userId || '', email }, nextStep: result.nextStep }, error: null };
    } catch (err: any) {
      return { data: { user: null }, error: { message: err.message } };
    }
  },

  async confirmSignUp({ email, code }: { email: string; code: string }) {
    try {
      const result = await confirmSignUp({ username: email, confirmationCode: code });
      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  async resendSignUpCode({ email }: { email: string }) {
    try {
      const result = await resendSignUpCode({ username: email });
      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    try {
      await signIn({ username: email, password });
      clearSessionCache();
      const session = await buildSession();
      return { data: { user: session?.user ?? null, session }, error: null };
    } catch (err: any) {
      return { data: { user: null, session: null }, error: { message: err.message } };
    }
  },

  async signInWithOAuth({ provider, options }: { provider: string; options?: any }) {
    try {
      const providerMap: Record<string, string> = {
        google: 'Google', facebook: 'Facebook', github: 'GitHub',
      };
      await signInWithRedirect({
        provider: (providerMap[provider] || provider) as any,
        customState: options?.redirectTo,
      });
      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  async signOut() {
    clearSessionCache();
    try { await signOut(); } catch { /* ignore */ }
  },

  async updateUser(_attrs: any) {
    // Password changes from inside the app are not supported with Cognito.
    // Use the /forgot-password flow instead (sends a reset code to email).
    return { data: null, error: { message: 'Use the Forgot Password flow to change your password.' } };
  },

  async resetPasswordForEmail(_email: string) {
    return { data: null, error: null };
  },
};

// ─── DB proxy query builder ────────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

type DbOp = 'select' | 'insert' | 'update' | 'delete' | 'upsert';

class QueryBuilder {
  private _table:   string;
  private _op:      DbOp = 'select';
  private _cols     = '*';
  private _count?:  'exact' | 'planned' | 'estimated';
  private _head     = false;
  private _eqs:     Array<{ col: string; val: any }> = [];
  private _ins:     Array<{ col: string; vals: any[] }> = [];
  private _notIsNulls: string[] = [];
  private _data:    any = null;
  private _single   = false;
  private _limitVal?: number;
  private _orderCol?: string;
  private _orderAsc = false;
  private _upsertConflict?: string;
  private _ranges: Array<{ col: string; op: 'gte' | 'lte' | 'gt' | 'lt'; val: any }> = [];

  constructor(table: string) { this._table = table; }

  select(cols = '*', opts?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean })  {
    this._cols = cols;
    this._count = opts?.count;
    this._head = opts?.head === true;
    // Mutation chains such as insert(...).select().single() keep the active mutation op.
    // A fresh builder with no data remains a SELECT.
    if (!this._data && this._op !== 'delete') this._op = 'select';
    return this;
  }
  insert(data: any)   { this._data = data; this._op = 'insert'; return this; }
  update(data: any)   { this._data = data; this._op = 'update'; return this; }
  delete()            { this._op = 'delete'; return this; }
  upsert(data: any, opts?: { onConflict?: string }) {
    this._data = data; this._op = 'upsert';
    this._upsertConflict = opts?.onConflict;
    return this;
  }

  eq(col: string, val: any)  { this._eqs.push({ col, val }); return this; }
  in(col: string, vals: any[]) { this._ins.push({ col, vals: Array.isArray(vals) ? vals : [] }); return this; }
  neq(_col: string, _val: any) { return this; }
  is(_col: string, _val: any)  { return this; }
  not(col: string, op: string, val: any) {
    if (op === 'is' && val === null) {
      this._notIsNulls.push(col);
    }
    return this;
  }
  or(_raw: string)             { return this; }
  gte(col: string, val: any)   { this._ranges.push({ col, op: 'gte', val }); return this; }
  lte(col: string, val: any)   { this._ranges.push({ col, op: 'lte', val }); return this; }
  gt(col: string, val: any)    { this._ranges.push({ col, op: 'gt',  val }); return this; }
  lt(col: string, val: any)    { this._ranges.push({ col, op: 'lt',  val }); return this; }
  single()                    { this._single = true; return this; }
  maybeSingle()               { this._single = true; return this; }
  limit(n: number)            { this._limitVal = n; return this; }
  order(col: string, opts?: { ascending?: boolean }) {
    this._orderCol = col;
    this._orderAsc = opts?.ascending !== false;
    return this;
  }

  then(resolve: (v: { data: any; error: any }) => any, reject?: (r?: any) => any) {
    return this._run().then(resolve, reject);
  }
  catch(fn: (r?: any) => any) { return this._run().catch(fn); }

  private async _run(): Promise<{ data: any; error: any }> {
    try {
      const session = await buildSession();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;

      // ── Workflow-specific endpoints ──────────────────────────────────────
      if (this._table === 'workflows' && this._op === 'delete') {
        const id = this._eqs.find((c) => c.col === 'id')?.val;
        const r = await fetch(`${API_URL}/api/workflows/${id}`, { method: 'DELETE', headers });
        return r.ok ? { data: null, error: null } : { data: null, error: { message: `HTTP ${r.status}` } };
      }

      // ── Generic db-proxy (whitelisted tables) ────────────────────────────
      if (this._op === 'select') {
        const qs = new URLSearchParams();
        if (this._cols && this._cols !== '*') {
          qs.set('select', this._cols);
        }
        if (this._orderCol) {
          qs.set('order_col', this._orderCol);
          qs.set('order_dir', this._orderAsc ? 'ASC' : 'DESC');
        }
        if (this._limitVal !== undefined) qs.set('limit', String(this._limitVal));
        if (this._count) qs.set('count', this._count);
        if (this._head) qs.set('head', 'true');
        for (const { col, val } of this._eqs) {
          qs.set(`filter_${col}`, String(val));
        }
        for (const { col, vals } of this._ins) {
          qs.set(`in_${col}`, JSON.stringify(vals));
        }
        for (const col of this._notIsNulls) {
          qs.set(`notnull_${col}`, 'true');
        }
        for (const { col, op, val } of this._ranges) {
          qs.set(`${op}_${col}`, String(val));
        }
        const r = await fetch(`${API_URL}/api/db/${this._table}?${qs}`, { headers });
        if (!r.ok) return { data: null, error: { message: `HTTP ${r.status}` } };
        const body = await r.json();
        const rows = body.data ?? body;
        return {
          data: this._single ? (rows[0] ?? null) : rows,
          error: null,
          count: typeof body.count === 'number' ? body.count : null,
        } as any;
      }

      if (this._op === 'insert') {
        const r = await fetch(`${API_URL}/api/db/${this._table}`, {
          method: 'POST', headers, body: JSON.stringify(this._data),
        });
        const body = await r.json();
        return r.ok ? { data: body.data, error: null } : { data: null, error: body.error };
      }

      if (this._op === 'update') {
        const id = this._eqs.find((c) => c.col === 'id')?.val;
        const qs = new URLSearchParams();
        for (const { col, val } of this._eqs) {
          if (col !== 'id') qs.set(`filter_${col}`, String(val));
        }
        const target = id !== undefined && id !== null && String(id).trim() !== ''
          ? `${API_URL}/api/db/${this._table}/${encodeURIComponent(String(id))}`
          : `${API_URL}/api/db/${this._table}?${qs}`;
        const r = await fetch(target, {
          method: 'PUT', headers, body: JSON.stringify(this._data),
        });
        const body = await r.json();
        return r.ok ? { data: body.data, error: null } : { data: null, error: body.error };
      }

      if (this._op === 'delete') {
        const id = this._eqs.find((c) => c.col === 'id')?.val;
        const qs = new URLSearchParams();
        for (const { col, val } of this._eqs) {
          if (col !== 'id') qs.set(`filter_${col}`, String(val));
        }
        const target = id !== undefined && id !== null && String(id).trim() !== ''
          ? `${API_URL}/api/db/${this._table}/${encodeURIComponent(String(id))}`
          : `${API_URL}/api/db/${this._table}?${qs}`;
        const r = await fetch(target, { method: 'DELETE', headers });
        const body = await r.json();
        return r.ok ? { data: null, error: null } : { data: null, error: body.error };
      }

      if (this._op === 'upsert') {
        const r = await fetch(`${API_URL}/api/db/${this._table}/upsert`, {
          method: 'POST', headers,
          body: JSON.stringify({ data: this._data, onConflict: this._upsertConflict }),
        });
        const body = await r.json();
        return r.ok ? { data: body.data, error: null } : { data: null, error: body.error };
      }

      return { data: null, error: { message: `Unsupported operation: ${this._op}` } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  }
}

// ─── Realtime stub (degrades to polling) ──────────────────────────────────

function makeNoOpChannel() {
  const ch: any = {
    on:        ()  => ch,
    subscribe: ()  => ch,
    unsubscribe: () => {},
  };
  return ch;
}

// ─── Exported AWS db client ────────────────────────────────────────────────

export const awsClient = {
  auth,
  from:          (table: string) => new QueryBuilder(table),
  channel:       (_name: string) => makeNoOpChannel(),
  removeChannel: (_ch: any)      => {},
  rpc:           async (_fn: string, _params?: any) => ({ data: null, error: null }),
};

/** @deprecated Alias kept briefly while all call-sites migrate. Use awsClient instead. */
export const awsDb = awsClient;
