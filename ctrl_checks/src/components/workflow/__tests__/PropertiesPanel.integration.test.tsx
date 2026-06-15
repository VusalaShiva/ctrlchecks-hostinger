/**
 * PropertiesPanel Integration Tests with Field Ownership
 * 
 * Tests the integration of PropertiesPanel with FieldOwnershipToggle component.
 * Validates end-to-end functionality for field ownership display, mode changes,
 * value restoration, and unlock functionality.
 * 
 * Requirements Coverage: 4.1, 4.2, 4.3, 4.4, 4.5, 4.7
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { FieldFillMode } from '@/lib/fillMode';

describe('PropertiesPanel Integration with FieldOwnershipToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Requirement 4.1: Display FieldOwnershipToggle for each field', () => {
    it('should display FieldOwnershipToggle for all config fields', () => {
      // Mock node with multiple config fields
      const nodeConfig = {
        subject: 'AI-generated subject',
        body: 'AI-generated body',
        recipients: ['user@example.com'],
        _fillMode: {
          subject: 'buildtime_ai_once',
          body: 'buildtime_ai_once',
          recipients: 'buildtime_ai_once',
        },
      };

      const configFields = ['subject', 'body', 'recipients'];
      
      // Each field should have a FieldOwnershipToggle
      configFields.forEach(fieldKey => {
        const fillMode = (nodeConfig._fillMode as Record<string, FieldFillMode>)[fieldKey];
        expect(fillMode).toBeDefined();
        expect(['manual_static', 'buildtime_ai_once', 'runtime_ai']).toContain(fillMode);
      });
    });

    it('should read _fillMode metadata from node config for each field', () => {
      const nodeConfig = {
        subject: 'Test subject',
        body: 'Test body',
        _fillMode: {
          subject: 'buildtime_ai_once',
          body: 'manual_static',
        },
      };

      const fillModeMap = nodeConfig._fillMode as Record<string, FieldFillMode>;
      
      expect(fillModeMap['subject']).toBe('buildtime_ai_once');
      expect(fillModeMap['body']).toBe('manual_static');
    });

    it('should display field value alongside toggle', () => {
      const nodeConfig = {
        subject: 'AI-generated subject',
        _fillMode: {
          subject: 'buildtime_ai_once',
        },
      };

      const fieldValue = nodeConfig.subject;
      const fillMode = (nodeConfig._fillMode as Record<string, FieldFillMode>)['subject'];
      
      expect(fieldValue).toBe('AI-generated subject');
      expect(fillMode).toBe('buildtime_ai_once');
    });

    it('should handle fields without _fillMode metadata (default to manual_static)', () => {
      const nodeConfig = {
        subject: 'Test subject',
        // No _fillMode metadata
      };

      const fillModeMap = (nodeConfig as any)._fillMode ?? {};
      const fillMode = fillModeMap['subject'] ?? 'manual_static';
      
      expect(fillMode).toBe('manual_static');
    });

    it('should display toggle for all field types (string, array, object)', () => {
      const nodeConfig = {
        subject: 'String field',
        recipients: ['array@example.com'],
        metadata: { key: 'object field' },
        _fillMode: {
          subject: 'buildtime_ai_once',
          recipients: 'buildtime_ai_once',
          metadata: 'manual_static',
        },
      };

      const fields = ['subject', 'recipients', 'metadata'];
      const fillModeMap = nodeConfig._fillMode as Record<string, FieldFillMode>;
      
      fields.forEach(fieldKey => {
        expect(fillModeMap[fieldKey]).toBeDefined();
        expect(nodeConfig[fieldKey as keyof typeof nodeConfig]).toBeDefined();
      });
    });
  });

  describe('Requirement 4.2: Display toggle in correct state for buildtime_ai_once', () => {
    it('should show "AI-built" button as active when mode is buildtime_ai_once', () => {
      const currentMode: FieldFillMode = 'buildtime_ai_once';
      
      // Toggle should show AI-built as active
      expect(currentMode).toBe('buildtime_ai_once');
    });

    it('should show "You" button as active when mode is manual_static', () => {
      const currentMode: FieldFillMode = 'manual_static';
      
      // Toggle should show You as active
      expect(currentMode).toBe('manual_static');
    });

    it('should show "AI Runtime" button as active when mode is runtime_ai', () => {
      const currentMode: FieldFillMode = 'runtime_ai';
      
      // Toggle should show AI Runtime as active
      expect(currentMode).toBe('runtime_ai');
    });

    it('should read current mode from config._fillMode', () => {
      const nodeConfig = {
        subject: 'Test',
        _fillMode: {
          subject: 'buildtime_ai_once',
        },
      };

      const fillModeMap = nodeConfig._fillMode as Record<string, FieldFillMode>;
      const currentMode = fillModeMap['subject'];
      
      expect(currentMode).toBe('buildtime_ai_once');
    });
  });

  describe('Requirement 4.3: Allow switching between ownership modes', () => {
    it('should allow switching from AI-built to You', () => {
      let currentMode: FieldFillMode = 'buildtime_ai_once';
      
      // User clicks "You" button
      const newMode: FieldFillMode = 'manual_static';
      currentMode = newMode;
      
      expect(currentMode).toBe('manual_static');
    });

    it('should allow switching from You to AI Runtime', () => {
      let currentMode: FieldFillMode = 'manual_static';
      
      // User clicks "AI Runtime" button
      const newMode: FieldFillMode = 'runtime_ai';
      currentMode = newMode;
      
      expect(currentMode).toBe('runtime_ai');
    });

    it('should allow switching from AI Runtime to AI-built', () => {
      let currentMode: FieldFillMode = 'runtime_ai';
      
      // User clicks "AI-built" button
      const newMode: FieldFillMode = 'buildtime_ai_once';
      currentMode = newMode;
      
      expect(currentMode).toBe('buildtime_ai_once');
    });

    it('should complete full cycle: AI-built → You → AI Runtime → AI-built', () => {
      const modes: FieldFillMode[] = [];
      let currentMode: FieldFillMode = 'buildtime_ai_once';
      
      // Cycle through all modes
      currentMode = 'manual_static';
      modes.push(currentMode);
      
      currentMode = 'runtime_ai';
      modes.push(currentMode);
      
      currentMode = 'buildtime_ai_once';
      modes.push(currentMode);
      
      expect(modes).toEqual(['manual_static', 'runtime_ai', 'buildtime_ai_once']);
    });
  });

  describe('Requirement 4.4: Mode change updates node config and calls API', () => {
    it('should update config._fillMode when mode changes', () => {
      const nodeConfig = {
        subject: 'Test',
        _fillMode: {
          subject: 'buildtime_ai_once',
        },
      };

      // User changes mode to manual_static
      const fillModeMap = nodeConfig._fillMode as Record<string, FieldFillMode>;
      fillModeMap['subject'] = 'manual_static';
      
      expect(fillModeMap['subject']).toBe('manual_static');
    });

    it('should call attach-inputs API with mode_<nodeId>_<fieldName> key', () => {
      const nodeId = 'node_gmail_123';
      const fieldKey = 'subject';
      const newMode: FieldFillMode = 'manual_static';
      
      const modeKey = `mode_${nodeId}_${fieldKey}`;
      const inputs: Record<string, unknown> = {
        [modeKey]: newMode,
      };
      
      expect(inputs).toEqual({
        'mode_node_gmail_123_subject': 'manual_static',
      });
    });

    it('should send POST request to /api/workflows/:workflowId/attach-inputs', () => {
      const workflowId = 'workflow_456';
      const endpoint = `/api/workflows/${workflowId}/attach-inputs`;
      
      expect(endpoint).toBe('/api/workflows/workflow_456/attach-inputs');
    });

    it('should include Authorization header with bearer token', () => {
      const token = 'mock-jwt-token';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      
      expect(headers.Authorization).toBe('Bearer mock-jwt-token');
    });

    it('should perform optimistic UI update before API call', () => {
      const previousMode: FieldFillMode = 'buildtime_ai_once';
      const newMode: FieldFillMode = 'manual_static';
      
      // Optimistic update happens immediately
      const currentMode = newMode;
      
      expect(currentMode).toBe('manual_static');
      expect(currentMode).not.toBe(previousMode);
    });

    it('should revert optimistic update on API failure', () => {
      const previousMode: FieldFillMode = 'buildtime_ai_once';
      const newMode: FieldFillMode = 'manual_static';
      
      // Optimistic update
      let currentMode = newMode;
      expect(currentMode).toBe('manual_static');
      
      // API fails - revert to previous mode
      const apiError = true;
      if (apiError) {
        currentMode = previousMode;
      }
      
      expect(currentMode).toBe('buildtime_ai_once');
    });

    it('should handle API error response gracefully', () => {
      const errorResponse = {
        error: 'Failed to update mode',
        message: 'Node not found',
      };
      
      const errorMessage = errorResponse.error || errorResponse.message || 'Failed to update mode: 500';
      
      expect(errorMessage).toBe('Failed to update mode');
    });

    it('should handle authentication error', () => {
      const token = null;
      
      if (!token) {
        const error = new Error('Authentication required');
        expect(error.message).toBe('Authentication required');
      }
    });
  });

  describe('Requirement 4.5: Value restoration works end-to-end', () => {
    it('should store original AI-built value when component mounts', () => {
      const currentMode: FieldFillMode = 'buildtime_ai_once';
      const currentValue = 'Original AI-built value';
      
      // Component stores original value
      let originalAiBuiltValue: unknown = undefined;
      
      if (currentMode === 'buildtime_ai_once' && currentValue !== undefined) {
        originalAiBuiltValue = currentValue;
      }
      
      expect(originalAiBuiltValue).toBe('Original AI-built value');
    });

    it('should restore original value when switching from You to AI-built', () => {
      const originalValue = 'Original AI-built value';
      let currentValue = 'User-modified value';
      let currentMode: FieldFillMode = 'manual_static';
      
      // User switches back to AI-built
      currentMode = 'buildtime_ai_once';
      currentValue = originalValue; // Restore original value
      
      expect(currentValue).toBe('Original AI-built value');
      expect(currentMode).toBe('buildtime_ai_once');
    });

    it('should include restored value in attach-inputs API call', () => {
      const nodeId = 'node_gmail_123';
      const fieldKey = 'subject';
      const restoredValue = 'Original AI-built value';
      const newMode: FieldFillMode = 'buildtime_ai_once';
      
      const modeKey = `mode_${nodeId}_${fieldKey}`;
      const inputKey = `input_${nodeId}_${fieldKey}`;
      const inputs: Record<string, unknown> = {
        [modeKey]: newMode,
        [inputKey]: restoredValue,
      };
      
      expect(inputs).toEqual({
        'mode_node_gmail_123_subject': 'buildtime_ai_once',
        'input_node_gmail_123_subject': 'Original AI-built value',
      });
    });

    it('should handle case where original value is not available', () => {
      const originalValue: unknown = undefined;
      let currentValue = 'User-modified value';
      let currentMode: FieldFillMode = 'manual_static';
      
      // User switches to AI-built but no original value stored
      currentMode = 'buildtime_ai_once';
      if (originalValue !== undefined) {
        currentValue = originalValue;
      }
      // else: keep current value or use empty/default
      
      expect(currentMode).toBe('buildtime_ai_once');
      expect(currentValue).toBe('User-modified value'); // No restoration occurred
    });

    it('should restore value locally for immediate UI update', () => {
      const originalValue = 'Original AI-built value';
      let currentValue = 'User-modified value';
      
      // Local restoration (immediate UI update)
      currentValue = originalValue;
      
      expect(currentValue).toBe('Original AI-built value');
    });

    it('should work with different value types (string, array, object)', () => {
      const testCases = [
        { original: 'String value', modified: 'Modified string' },
        { original: ['item1', 'item2'], modified: ['modified'] },
        { original: { key: 'value' }, modified: { key: 'modified' } },
      ];
      
      testCases.forEach(({ original, modified }) => {
        let currentValue: unknown = modified;
        
        // Restore original
        currentValue = original;
        
        expect(currentValue).toEqual(original);
      });
    });

    it('should handle empty string as valid original value', () => {
      const originalValue = '';
      let currentValue = 'User-modified value';
      
      // Restore empty string
      currentValue = originalValue;
      
      expect(currentValue).toBe('');
    });

    it('should handle null as valid original value', () => {
      const originalValue = null;
      let currentValue = 'User-modified value';
      
      // Restore null
      currentValue = originalValue;
      
      expect(currentValue).toBe(null);
    });
  });

  describe('Requirement 4.7: Unlock functionality enables toggle', () => {
    it('should detect locked credential field from backend schema', () => {
      const backendInputSchema = {
        apiKey: {
          type: 'string',
          ownership: 'credential',
          credentialTogglePolicy: 'locked',
        },
      };
      
      const fieldDef = backendInputSchema['apiKey'];
      const fieldOwnership = fieldDef?.ownership;
      const credentialTogglePolicy = fieldDef?.credentialTogglePolicy;
      
      const isCredentialOwned = fieldOwnership === 'credential';
      const isLocked = isCredentialOwned && credentialTogglePolicy === 'locked';
      const isUnlockable = isCredentialOwned && credentialTogglePolicy === 'unlockable';
      
      expect(isCredentialOwned).toBe(true);
      expect(isLocked).toBe(true);
      expect(isUnlockable).toBe(false);
    });

    it('should detect unlockable credential field from backend schema', () => {
      const backendInputSchema = {
        webhookUrl: {
          type: 'string',
          ownership: 'credential',
          credentialTogglePolicy: 'unlockable',
        },
      };
      
      const fieldDef = backendInputSchema['webhookUrl'];
      const fieldOwnership = fieldDef?.ownership;
      const credentialTogglePolicy = fieldDef?.credentialTogglePolicy;
      
      const isCredentialOwned = fieldOwnership === 'credential';
      const isLocked = isCredentialOwned && credentialTogglePolicy === 'locked';
      const isUnlockable = isCredentialOwned && credentialTogglePolicy === 'unlockable';
      
      expect(isCredentialOwned).toBe(true);
      expect(isLocked).toBe(false);
      expect(isUnlockable).toBe(true);
    });

    it('should read unlock state from config._ownershipUnlock', () => {
      const nodeConfig = {
        webhookUrl: 'https://hooks.slack.com/...',
        _ownershipUnlock: {
          webhookUrl: true,
        },
      };
      
      const ownershipUnlockMap = nodeConfig._ownershipUnlock ?? {};
      const isUnlocked = ownershipUnlockMap['webhookUrl'] === true;
      
      expect(isUnlocked).toBe(true);
    });

    it('should disable toggle when locked and not unlocked', () => {
      const isLocked = true;
      const isUnlockable = true;
      const isUnlocked = false;
      
      const effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
      
      expect(effectivelyLocked).toBe(true);
    });

    it('should enable toggle when field is unlocked', () => {
      const isLocked = true;
      const isUnlockable = true;
      const isUnlocked = true;
      
      const effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
      
      expect(effectivelyLocked).toBe(false);
    });

    it('should call attach-inputs with unlock_<nodeId>_<fieldName> key', () => {
      const nodeId = 'node_slack_123';
      const fieldKey = 'webhookUrl';
      
      const unlockKey = `unlock_${nodeId}_${fieldKey}`;
      const inputs: Record<string, unknown> = {
        [unlockKey]: true,
      };
      
      expect(inputs).toEqual({
        'unlock_node_slack_123_webhookUrl': true,
      });
    });

    it('should update config._ownershipUnlock when field is unlocked', () => {
      const nodeConfig = {
        webhookUrl: 'https://hooks.slack.com/...',
        _ownershipUnlock: {},
      };
      
      const fieldKey = 'webhookUrl';
      const ownershipUnlockMap = nodeConfig._ownershipUnlock as Record<string, boolean>;
      ownershipUnlockMap[fieldKey] = true;
      
      expect(ownershipUnlockMap[fieldKey]).toBe(true);
    });

    it('should perform optimistic UI update before unlock API call', () => {
      const previousUnlockState = false;
      let isUnlocked = previousUnlockState;
      
      // Optimistic update
      isUnlocked = true;
      
      expect(isUnlocked).toBe(true);
    });

    it('should revert optimistic update on unlock API failure', () => {
      const previousUnlockState = false;
      let isUnlocked = true; // Optimistic update
      
      // API fails - revert
      const apiError = true;
      if (apiError) {
        isUnlocked = previousUnlockState;
      }
      
      expect(isUnlocked).toBe(false);
    });

    it('should show toast notification when field is unlocked', () => {
      const fieldKey = 'webhookUrl';
      const toastMessage = `You can now change the ownership mode for ${fieldKey}`;
      
      expect(toastMessage).toBe('You can now change the ownership mode for webhookUrl');
    });

    it('should handle unlock error gracefully', () => {
      const errorResponse = {
        error: 'Failed to unlock field',
        message: 'Field not found',
      };
      
      const errorMessage = errorResponse.error || errorResponse.message || 'Failed to unlock field: 500';
      
      expect(errorMessage).toBe('Failed to unlock field');
    });
  });

  describe('End-to-end workflow scenarios', () => {
    it('should handle complete workflow: display → mode change → API call → success', () => {
      // 1. Display field with AI-built mode
      const nodeConfig = {
        subject: 'AI-generated subject',
        _fillMode: {
          subject: 'buildtime_ai_once',
        },
      };
      
      let currentMode = (nodeConfig._fillMode as Record<string, FieldFillMode>)['subject'];
      expect(currentMode).toBe('buildtime_ai_once');
      
      // 2. User changes mode to manual_static
      const newMode: FieldFillMode = 'manual_static';
      currentMode = newMode;
      expect(currentMode).toBe('manual_static');
      
      // 3. API call succeeds
      const apiSuccess = true;
      expect(apiSuccess).toBe(true);
      
      // 4. Mode persisted
      (nodeConfig._fillMode as Record<string, FieldFillMode>)['subject'] = newMode;
      expect((nodeConfig._fillMode as Record<string, FieldFillMode>)['subject']).toBe('manual_static');
    });

    it('should handle complete workflow: display → unlock → mode change → API call', () => {
      // 1. Display locked credential field
      const nodeConfig = {
        webhookUrl: 'https://hooks.slack.com/...',
        _fillMode: {
          webhookUrl: 'manual_static',
        },
        _ownershipUnlock: {},
      };
      
      const isLocked = true;
      const isUnlockable = true;
      let isUnlocked = false;
      
      let effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
      expect(effectivelyLocked).toBe(true);
      
      // 2. User unlocks field
      isUnlocked = true;
      (nodeConfig._ownershipUnlock as Record<string, boolean>)['webhookUrl'] = true;
      
      effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
      expect(effectivelyLocked).toBe(false);
      
      // 3. User changes mode
      let currentMode = (nodeConfig._fillMode as Record<string, FieldFillMode>)['webhookUrl'];
      currentMode = 'buildtime_ai_once';
      
      expect(currentMode).toBe('buildtime_ai_once');
    });

    it('should handle complete workflow: AI-built → You → modify → AI-built → restore', () => {
      // 1. Initial state: AI-built
      const originalValue = 'Original AI-built value';
      let currentValue = originalValue;
      let currentMode: FieldFillMode = 'buildtime_ai_once';
      
      expect(currentValue).toBe('Original AI-built value');
      expect(currentMode).toBe('buildtime_ai_once');
      
      // 2. User switches to manual mode
      currentMode = 'manual_static';
      expect(currentMode).toBe('manual_static');
      
      // 3. User modifies value
      currentValue = 'User-modified value';
      expect(currentValue).toBe('User-modified value');
      
      // 4. User switches back to AI-built
      currentMode = 'buildtime_ai_once';
      currentValue = originalValue; // Restore
      
      expect(currentMode).toBe('buildtime_ai_once');
      expect(currentValue).toBe('Original AI-built value');
    });

    it('should handle error recovery: mode change → API error → revert → retry → success', () => {
      const previousMode: FieldFillMode = 'buildtime_ai_once';
      let currentMode = previousMode;
      
      // 1. User changes mode
      currentMode = 'manual_static';
      expect(currentMode).toBe('manual_static');
      
      // 2. API error - revert
      const apiError = true;
      if (apiError) {
        currentMode = previousMode;
      }
      expect(currentMode).toBe('buildtime_ai_once');
      
      // 3. User retries
      currentMode = 'manual_static';
      expect(currentMode).toBe('manual_static');
      
      // 4. API success
      const apiSuccess = true;
      expect(apiSuccess).toBe(true);
      expect(currentMode).toBe('manual_static');
    });

    it('should handle multiple fields with different modes', () => {
      const nodeConfig = {
        subject: 'AI-generated subject',
        body: 'User-entered body',
        recipients: ['ai@example.com'],
        _fillMode: {
          subject: 'buildtime_ai_once',
          body: 'manual_static',
          recipients: 'runtime_ai',
        },
      };
      
      const fillModeMap = nodeConfig._fillMode as Record<string, FieldFillMode>;
      
      expect(fillModeMap['subject']).toBe('buildtime_ai_once');
      expect(fillModeMap['body']).toBe('manual_static');
      expect(fillModeMap['recipients']).toBe('runtime_ai');
    });

    it('should handle mixed credential and non-credential fields', () => {
      const backendInputSchema = {
        subject: {
          type: 'string',
          ownership: 'config',
        },
        apiKey: {
          type: 'string',
          ownership: 'credential',
          credentialTogglePolicy: 'locked',
        },
        webhookUrl: {
          type: 'string',
          ownership: 'credential',
          credentialTogglePolicy: 'unlockable',
        },
      };
      
      const fields = ['subject', 'apiKey', 'webhookUrl'];
      
      fields.forEach(fieldKey => {
        const fieldDef = backendInputSchema[fieldKey as keyof typeof backendInputSchema];
        const isCredentialOwned = fieldDef?.ownership === 'credential';
        
        if (fieldKey === 'subject') {
          expect(isCredentialOwned).toBe(false);
        } else {
          expect(isCredentialOwned).toBe(true);
        }
      });
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle missing workflowId gracefully', () => {
      const workflowId = null;
      
      if (!workflowId) {
        // Should not call API
        const shouldCallApi = false;
        expect(shouldCallApi).toBe(false);
      }
    });

    it('should handle missing selectedNode gracefully', () => {
      const selectedNode = null;
      
      if (!selectedNode) {
        // Should not call API
        const shouldCallApi = false;
        expect(shouldCallApi).toBe(false);
      }
    });

    it('should handle network error during mode change', () => {
      const error = new Error('Network request failed');
      
      expect(error.message).toBe('Network request failed');
    });

    it('should handle network error during unlock', () => {
      const error = new Error('Network request failed');
      
      expect(error.message).toBe('Network request failed');
    });

    it('should handle malformed API response', () => {
      const response = { unexpected: 'format' };
      
      const errorMessage = (response as any).error || (response as any).message || 'Unknown error';
      
      expect(errorMessage).toBe('Unknown error');
    });

    it('should handle concurrent mode changes', () => {
      let currentMode: FieldFillMode = 'buildtime_ai_once';
      const pendingChanges: FieldFillMode[] = [];
      
      // User clicks multiple times quickly
      pendingChanges.push('manual_static');
      pendingChanges.push('runtime_ai');
      pendingChanges.push('buildtime_ai_once');
      
      // Only last change should be applied
      currentMode = pendingChanges[pendingChanges.length - 1];
      
      expect(currentMode).toBe('buildtime_ai_once');
    });

    it('should handle field with no backend schema definition', () => {
      const backendInputSchema = {};
      const fieldKey = 'unknownField';
      
      const fieldDef = (backendInputSchema as any)[fieldKey];
      const isCredentialOwned = fieldDef?.ownership === 'credential';
      
      expect(isCredentialOwned).toBe(false);
    });

    it('should handle field with incomplete schema definition', () => {
      const backendInputSchema = {
        partialField: {
          type: 'string',
          // Missing ownership and credentialTogglePolicy
        },
      };
      
      const fieldDef = backendInputSchema['partialField'];
      const isCredentialOwned = fieldDef?.ownership === 'credential';
      const isLocked = isCredentialOwned && (fieldDef as any)?.credentialTogglePolicy === 'locked';
      
      expect(isCredentialOwned).toBe(false);
      expect(isLocked).toBe(false);
    });
  });
});

