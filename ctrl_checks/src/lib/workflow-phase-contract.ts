/**
 * Workflow phase strings aligned with the worker attach-inputs / attach-credentials contract.
 * Worker currently uses `ready_for_ownership` as the canonical post-input phase,
 * with older deployments still returning `inputs_applied` / `configuring_credentials`.
 * See worker/src/api/attach-credentials.ts phase guard.
 *
 * ## Freeze boundary (`metadata.freezeBoundary`)
 *
 * After the workflow reaches `ready_for_ownership` / `ready_for_execution`, `freezeBoundary.frozen`
 * is set by attach-inputs. **Freeze policy is topology-only** (see worker attach-inputs):
 *
 * - **Enforced:** graph structure must not change (node/edge identity and wiring vs baseline topology fingerprint).
 * - **Not enforced for persistence:** non-credential node config values may still be updated via attach-inputs
 *   (AI build-time fields, templates, ownership fill modes). This keeps configuration editable until execution
 *   without spurious 409s from protected-config hashing.
 *
 * Credential injection still must not change topology (attach-credentials).
 */

export const PHASE_INPUTS_APPLIED = 'inputs_applied' as const;
export const PHASE_CONFIGURING_CREDENTIALS = 'configuring_credentials' as const;
export const PHASE_READY_FOR_OWNERSHIP = 'ready_for_ownership' as const;
export const PHASE_READY_FOR_EXECUTION = 'ready_for_execution' as const;

const PHASES_THAT_ALLOW_ATTACH_CREDENTIALS = new Set<string>([
  PHASE_INPUTS_APPLIED,
  PHASE_CONFIGURING_CREDENTIALS,
  PHASE_READY_FOR_OWNERSHIP,
]);

/**
 * Whether the client should run the attach-credentials step after a successful attach-inputs response.
 * Do not run on `ready_for_execution`: that phase means credentials are already satisfied.
 */
export function shouldRunAttachCredentialsAfterAttachInputs(phase: string | undefined | null): boolean {
  const p = String(phase ?? '').toLowerCase().trim();
  return PHASES_THAT_ALLOW_ATTACH_CREDENTIALS.has(p);
}
