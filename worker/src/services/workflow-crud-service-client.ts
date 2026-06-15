/**
 * workflow-crud-service-client.ts
 *
 * Worker-side client for the workflow-crud microservice (:3007).
 *
 * Feature flag: WORKFLOW_CRUD_SERVICE_ENABLED=true activates delegation.
 * Default: false — all save/load/delete handled by worker's own route handlers.
 *
 * Canary: WORKFLOW_CRUD_SERVICE_CANARY_PERCENT (default 0 — must opt in).
 *   0   = disabled (worker handles all CRUD)
 *   50  = 50% of userIds routed to workflow-crud-service (Phase 2 staging)
 *   100 = all traffic routed to workflow-crud-service
 *
 * Routing formula: fnv1a(userId) % 100 < pct  (keyed on userId — CRUD is per-user)
 *
 * Phase 1: All remote methods return null (service returns 501).
 *          No wiring to worker CRUD routes — this client is scaffolded only.
 *
 * Phase 2: Wire saveWorkflowRemote / getWorkflowRemote / listWorkflowsRemote /
 *          deleteWorkflowRemote into worker/src/api/save-workflow.ts.
 *
 * Phase 3: Wire version history endpoints into worker/src/api/workflow-versioning.ts.
 *
 * See: docs/engineering/workflow-crud-service-contract.md
 */

import { incWorkflowCrudDelegation } from '../middleware/highScaleMetrics';

// ── FNV-1a 32-bit hash — deterministic canary routing ────────────────────────

function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash;
}

// ── Feature flag helpers — read env at call time for hot-reload ───────────────

export function isWorkflowCrudServiceEnabled(): boolean {
  return process.env.WORKFLOW_CRUD_SERVICE_ENABLED === 'true';
}

export function getCanaryPercent(): number {
  const raw = process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT;
  if (!raw) return 0;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
}

/**
 * Canary routing is keyed on userId — workflow CRUD is a per-user operation,
 * so fnv1a(userId) gives deterministic per-user routing.
 */
export function shouldUseWorkflowCrudService(userId: string): boolean {
  if (!isWorkflowCrudServiceEnabled()) return false;
  const pct = getCanaryPercent();
  if (pct <= 0) return false;
  if (pct >= 100) return true;
  return fnv1a(userId) % 100 < pct;
}

export function getBaseUrl(): string {
  return process.env.WORKFLOW_CRUD_SERVICE_URL?.replace(/\/$/, '') ?? 'http://localhost:3007';
}

function getServiceKey(): string {
  return process.env.WORKFLOW_CRUD_SERVICE_KEY ?? '';
}

function serviceHeaders(userId?: string): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  const k = getServiceKey();
  if (k) h['x-service-key'] = k;
  if (userId) h['x-user-id'] = userId;
  return h;
}

// ── Shared fetch helpers ──────────────────────────────────────────────────────

async function servicePost<T>(path: string, userId: string, body: unknown): Promise<T | null> {
  if (!isWorkflowCrudServiceEnabled()) return null;
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'POST',
      headers: serviceHeaders(userId),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      incWorkflowCrudDelegation('miss');
      return null;
    }
    incWorkflowCrudDelegation('hit');
    return (await res.json()) as T;
  } catch {
    incWorkflowCrudDelegation('error');
    return null;
  }
}

async function serviceGet<T>(path: string, userId: string): Promise<T | null> {
  if (!isWorkflowCrudServiceEnabled()) return null;
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'GET',
      headers: serviceHeaders(userId),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      incWorkflowCrudDelegation('miss');
      return null;
    }
    incWorkflowCrudDelegation('hit');
    return (await res.json()) as T;
  } catch {
    incWorkflowCrudDelegation('error');
    return null;
  }
}

async function serviceDelete<T>(path: string, userId: string): Promise<T | null> {
  if (!isWorkflowCrudServiceEnabled()) return null;
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'DELETE',
      headers: serviceHeaders(userId),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      incWorkflowCrudDelegation('miss');
      return null;
    }
    incWorkflowCrudDelegation('hit');
    return (await res.json()) as T;
  } catch {
    incWorkflowCrudDelegation('error');
    return null;
  }
}

// ── Result types — match workflow-crud-service response shapes ────────────────

/** Matches the service POST /workflows response body. */
export interface SaveWorkflowResult {
  success: true;
  workflowId: string;
  workflow: WorkflowRecord;
  validation: {
    valid: boolean;
    warnings: string[];
    migrationsApplied: string[];
  };
}

/** Matches a row from the workflows table as returned by the service. */
export interface WorkflowRecord {
  id: string;
  user_id: string;
  name: string;
  nodes: unknown[];
  edges: unknown[];
  settings: Record<string, unknown>;
  graph: Record<string, unknown>;
  metadata: Record<string, unknown>;
  status: string | null;
  phase: string | null;
  schema_version: number;
  setup_completed: boolean;
  created_at: string;
  updated_at: string;
}

/** Matches the service GET /workflows response body. */
export interface WorkflowListResult {
  workflows: WorkflowRecord[];
  total: number;
}

/** Matches the service GET /workflows/:id response body. */
export interface WorkflowGetResult {
  workflow: WorkflowRecord;
}

/** Matches the service DELETE /workflows/:id response body. */
export interface DeleteWorkflowResult {
  success: true;
  id: string;
}

export interface WorkflowVersionRecord {
  version: number;
  savedAt: string;
  label?: string;
}

export interface RollbackResult {
  id: string;
  version: number;
  rolledBackFrom: number;
}

// ── Remote methods (Phase 1: all return null — service stubs 501) ─────────────

/**
 * Save (create or update) a workflow via workflow-crud-service.
 * Phase 2: wire into worker/src/api/save-workflow.ts when canary routes the userId.
 */
export async function saveWorkflowRemote(
  userId: string,
  workflow: {
    workflowId?: string;
    name: string;
    nodes: unknown[];
    edges: unknown[];
    settings?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  },
): Promise<SaveWorkflowResult | null> {
  return servicePost<SaveWorkflowResult>('/workflows', userId, workflow);
}

/**
 * Load a workflow by id via workflow-crud-service.
 * Phase 2: wire into worker GET /api/workflows/:id handler when available.
 */
export async function getWorkflowRemote(
  userId: string,
  workflowId: string,
): Promise<WorkflowGetResult | null> {
  return serviceGet<WorkflowGetResult>(`/workflows/${workflowId}`, userId);
}

/**
 * List all workflows for a user via workflow-crud-service.
 * Phase 2: wire into worker GET /api/workflows handler when available.
 */
export async function listWorkflowsRemote(
  userId: string,
): Promise<WorkflowListResult | null> {
  return serviceGet<WorkflowListResult>('/workflows', userId);
}

/**
 * Delete a workflow by id via workflow-crud-service.
 * Phase 2: wire into worker DELETE /api/workflows/:id handler.
 */
export async function deleteWorkflowRemote(
  userId: string,
  workflowId: string,
): Promise<DeleteWorkflowResult | null> {
  return serviceDelete<DeleteWorkflowResult>(`/workflows/${workflowId}`, userId);
}

/**
 * List version history for a workflow via workflow-crud-service.
 * Phase 3: wire into worker/src/api/workflow-versioning.ts.
 */
export async function listWorkflowVersionsRemote(
  userId: string,
  workflowId: string,
): Promise<WorkflowVersionRecord[] | null> {
  return serviceGet<WorkflowVersionRecord[]>(`/workflows/${workflowId}/versions`, userId);
}

/**
 * Rollback a workflow to a specific version via workflow-crud-service.
 * Phase 3: wire into worker/src/api/workflow-versioning.ts.
 */
export async function rollbackWorkflowRemote(
  userId: string,
  workflowId: string,
  version: number,
): Promise<RollbackResult | null> {
  return servicePost<RollbackResult>(
    `/workflows/${workflowId}/versions/${version}/rollback`,
    userId,
    {},
  );
}

// ── Phase 4 — template proxy helpers ─────────────────────────────────────────

export interface TemplateRecord {
  id: string;
  name: string;
  description: string | null;
  category: string;
  nodes: unknown[];
  edges: unknown[];
  difficulty: string | null;
  estimated_setup_time: number | null;
  tags: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  preview_image: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface TemplateListResult {
  templates: TemplateRecord[];
}

export interface TemplateGetResult {
  template: TemplateRecord;
}

/**
 * List active templates via workflow-crud-service.
 * No canary — always try remote (global read, not user-scoped).
 * Omits userId header because templates are public.
 */
export async function listTemplatesRemote(options?: {
  category?: string;
  search?: string;
}): Promise<TemplateListResult | null> {
  if (!isWorkflowCrudServiceEnabled()) return null;
  try {
    const params = new URLSearchParams();
    if (options?.category) params.set('category', options.category);
    if (options?.search) params.set('search', options.search);
    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${getBaseUrl()}/templates${qs}`, {
      method: 'GET',
      headers: serviceHeaders(),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) { incWorkflowCrudDelegation('miss'); return null; }
    incWorkflowCrudDelegation('hit');
    return (await res.json()) as TemplateListResult;
  } catch {
    incWorkflowCrudDelegation('error');
    return null;
  }
}

/**
 * Fetch a single template by id via workflow-crud-service.
 * No canary — always try remote.
 */
export async function getTemplateRemote(
  templateId: string,
): Promise<TemplateGetResult | null> {
  if (!isWorkflowCrudServiceEnabled()) return null;
  try {
    const res = await fetch(`${getBaseUrl()}/templates/${templateId}`, {
      method: 'GET',
      headers: serviceHeaders(),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) { incWorkflowCrudDelegation('miss'); return null; }
    incWorkflowCrudDelegation('hit');
    return (await res.json()) as TemplateGetResult;
  } catch {
    incWorkflowCrudDelegation('error');
    return null;
  }
}

// ── Phase 4 — local-writes retirement gate ───────────────────────────────────

/**
 * When true: canary users whose remote call returns null get 503 instead of
 * falling back to local writes. Prevents double-write during retirement soak.
 * Default: false — set true only after 2-week soak at CANARY=100.
 */
export function isWorkflowCrudLocalWritesDisabled(): boolean {
  return process.env.WORKFLOW_CRUD_LOCAL_WRITES_DISABLED === 'true';
}
