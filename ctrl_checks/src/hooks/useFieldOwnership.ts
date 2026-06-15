/**
 * useFieldOwnership Hook
 * 
 * Custom React hook that encapsulates field ownership logic for managing AI-built values,
 * manual values, and runtime AI values in workflow nodes.
 * 
 * This hook provides:
 * - Mode change logic (AI-built ↔ You ↔ AI Runtime)
 * - Value restoration when switching back to AI-built
 * - Unlock functionality for credential-owned fields
 * - API integration with attach-inputs endpoint
 * 
 * Requirements Coverage: 4.2, 4.3, 4.4, 4.5, 4.7
 */

import { useState, useCallback, useEffect } from 'react';
import { awsClient } from '@/integrations/aws/client';
import { ENDPOINTS } from '@/config/endpoints';
import type { FieldFillMode } from '@/lib/fillMode';

export interface UseFieldOwnershipParams {
  /** The workflow ID */
  workflowId: string | null;
  
  /** The node ID this field belongs to */
  nodeId: string;
  
  /** The field name (e.g., "subject", "body", "recipients") */
  fieldName: string;
  
  /** Current fill mode from node config */
  currentMode: FieldFillMode;
  
  /** Current field value */
  currentValue?: unknown;
  
  /** Whether the field is locked (credentialTogglePolicy: 'locked') */
  isLocked?: boolean;
  
  /** Whether the field is unlockable (credentialTogglePolicy: 'unlockable') */
  isUnlockable?: boolean;
  
  /** Whether the field has been unlocked (from config._ownershipUnlock) */
  isUnlocked?: boolean;
  
  /** Callback to update node config in the store */
  onConfigUpdate: (updates: Record<string, unknown>) => void;
  
  /** Optional callback for toast notifications */
  onError?: (message: string) => void;
}

export interface UseFieldOwnershipReturn {
  /** Current fill mode */
  currentMode: FieldFillMode;
  
  /** Original AI-built value (for restoration) */
  originalValue: unknown;
  
  /** Whether the field is effectively locked (locked and not unlocked) */
  isEffectivelyLocked: boolean;
  
  /** Whether the field has been unlocked */
  isUnlocked: boolean;
  
  /** Change the fill mode (with API persistence) */
  changeMode: (newMode: FieldFillMode, restoredValue?: unknown) => Promise<void>;
  
  /** Unlock the field (with API persistence) */
  unlock: () => Promise<void>;
  
  /** Restore the original AI-built value */
  restoreValue: () => Promise<void>;
  
  /** Whether a mode change operation is in progress */
  isChangingMode: boolean;
  
  /** Whether an unlock operation is in progress */
  isUnlocking: boolean;
}

/**
 * useFieldOwnership Hook
 * 
 * Manages field ownership state and API interactions for a single field in a workflow node.
 * 
 * @example
 * ```tsx
 * const fieldOwnership = useFieldOwnership({
 *   workflowId: 'wf_123',
 *   nodeId: 'node_456',
 *   fieldName: 'subject',
 *   currentMode: 'buildtime_ai_once',
 *   currentValue: 'Welcome Email',
 *   isLocked: false,
 *   isUnlockable: false,
 *   isUnlocked: false,
 *   onConfigUpdate: (updates) => updateNodeConfig(nodeId, updates),
 *   onError: (msg) => toast({ title: 'Error', description: msg }),
 * });
 * 
 * // Change mode
 * await fieldOwnership.changeMode('manual_static');
 * 
 * // Restore original value
 * fieldOwnership.restoreValue();
 * 
 * // Unlock field
 * await fieldOwnership.unlock();
 * ```
 */
export function useFieldOwnership({
  workflowId,
  nodeId,
  fieldName,
  currentMode,
  currentValue,
  isLocked = false,
  isUnlockable = false,
  isUnlocked = false,
  onConfigUpdate,
  onError,
}: UseFieldOwnershipParams): UseFieldOwnershipReturn {
  // Store the original AI-built value for restoration
  const [originalValue, setOriginalValue] = useState<unknown>(undefined);
  const [hasStoredOriginal, setHasStoredOriginal] = useState(false);
  
  // Loading states
  const [isChangingMode, setIsChangingMode] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Store the original AI-built value when the component mounts with buildtime_ai_once mode
  // or when the mode changes to buildtime_ai_once
  useEffect(() => {
    if (currentMode === 'buildtime_ai_once' && !hasStoredOriginal && currentValue !== undefined) {
      setOriginalValue(currentValue);
      setHasStoredOriginal(true);
    }
  }, [currentMode, currentValue, hasStoredOriginal]);

  // Calculate if field is effectively locked
  const isEffectivelyLocked = isLocked && !(isUnlockable && isUnlocked);

  /**
   * Change the fill mode for this field
   * 
   * Implements Requirements 4.4, 4.5:
   * - Updates _fillMode metadata via attach-inputs endpoint
   * - Handles value restoration when switching back to AI-built
   * - Provides optimistic UI updates with rollback on error
   * 
   * @param newMode - The new fill mode to set
   * @param restoredValue - Optional restored value when switching to AI-built
   */
  const changeMode = useCallback(
    async (newMode: FieldFillMode, restoredValue?: unknown) => {
      if (!workflowId) {
        onError?.('Workflow ID is required to change mode');
        return;
      }

      if (isEffectivelyLocked) {
        onError?.('Cannot change mode for locked field');
        return;
      }

      // Store previous mode for rollback
      const previousMode = currentMode;

      // Optimistic UI update
      onConfigUpdate({
        _fillMode: { [fieldName]: newMode },
      });

      setIsChangingMode(true);

      try {
        // Get auth token
        const { data: sessionData } = await awsClient.auth.getSession();
        const token = sessionData?.session?.access_token;

        if (!token) {
          throw new Error('Authentication required');
        }

        // Build attach-inputs payload
        const modeKey = `mode_${nodeId}_${fieldName}`;
        const inputs: Record<string, unknown> = {
          [modeKey]: newMode,
        };

        // If restoring a value (switching back to AI-built), include the restored value
        if (restoredValue !== undefined && newMode === 'buildtime_ai_once') {
          const inputKey = `input_${nodeId}_${fieldName}`;
          inputs[inputKey] = restoredValue;
          console.log(`[useFieldOwnership] Restoring AI-built value for ${fieldName}:`, restoredValue);
        }

        // Call attach-inputs endpoint
        const response = await fetch(`${ENDPOINTS.itemBackend}/api/workflows/${workflowId}/attach-inputs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            inputs,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || errorData.message || `Failed to update mode: ${response.status}`);
        }

        // Success - mode persisted to backend
        console.log(`[useFieldOwnership] Mode updated for ${fieldName}: ${newMode}`);
      } catch (error: any) {
        // Revert optimistic update on failure
        console.error('[useFieldOwnership] Failed to update fill mode:', error);
        onConfigUpdate({
          _fillMode: { [fieldName]: previousMode },
        });

        onError?.(error?.message || 'Could not persist mode change to server');
      } finally {
        setIsChangingMode(false);
      }
    },
    [workflowId, nodeId, fieldName, currentMode, isEffectivelyLocked, onConfigUpdate, onError]
  );

  /**
   * Unlock the field
   * 
   * Implements Requirements 4.7, 5.6:
   * - Updates _ownershipUnlock flag via attach-inputs endpoint
   * - Enables the toggle for credential-owned fields
   * - Provides optimistic UI updates with rollback on error
   */
  const unlock = useCallback(async () => {
    if (!workflowId) {
      onError?.('Workflow ID is required to unlock field');
      return;
    }

    if (!isUnlockable) {
      onError?.('Field is not unlockable');
      return;
    }

    // Store previous unlock state for rollback
    const previousUnlockState = isUnlocked;

    // Optimistic UI update
    onConfigUpdate({
      _ownershipUnlock: { [fieldName]: true },
    });

    setIsUnlocking(true);

    try {
      // Get auth token
      const { data: sessionData } = await awsClient.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        throw new Error('Authentication required');
      }

      // Build attach-inputs payload
      const unlockKey = `unlock_${nodeId}_${fieldName}`;
      const inputs: Record<string, unknown> = {
        [unlockKey]: true,
      };

      // Call attach-inputs endpoint
      const response = await fetch(`${ENDPOINTS.itemBackend}/api/workflows/${workflowId}/attach-inputs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          inputs,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `Failed to unlock field: ${response.status}`);
      }

      // Success - unlock persisted to backend
      console.log(`[useFieldOwnership] Field unlocked: ${fieldName}`);
    } catch (error: any) {
      // Revert optimistic update on failure
      console.error('[useFieldOwnership] Failed to unlock field:', error);
      onConfigUpdate({
        _ownershipUnlock: { [fieldName]: previousUnlockState },
      });

      onError?.(error?.message || 'Could not unlock field');
    } finally {
      setIsUnlocking(false);
    }
  }, [workflowId, nodeId, fieldName, isUnlockable, isUnlocked, onConfigUpdate, onError]);

  /**
   * Restore the original AI-built value
   * 
   * Implements Requirement 4.5:
   * - Restores the original AI-built value stored when component mounted
   * - Calls attach-inputs API with restored value
   * - Updates _fillMode back to buildtime_ai_once
   * - Used when switching from "You" back to "AI-built"
   */
  const restoreValue = useCallback(async () => {
    if (!hasStoredOriginal) {
      console.warn(`[useFieldOwnership] No original value stored for ${fieldName}`);
      return;
    }

    // First update local state optimistically
    onConfigUpdate({
      [fieldName]: originalValue,
    });
    console.log(`[useFieldOwnership] Restoring original value for ${fieldName}:`, originalValue);

    // Then persist via changeMode which will call attach-inputs API with the restored value
    await changeMode('buildtime_ai_once', originalValue);
  }, [fieldName, originalValue, hasStoredOriginal, onConfigUpdate, changeMode]);

  return {
    currentMode,
    originalValue,
    isEffectivelyLocked,
    isUnlocked,
    changeMode,
    unlock,
    restoreValue,
    isChangingMode,
    isUnlocking,
  };
}
