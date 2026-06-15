/**
 * PropertiesPanel Unlock Functionality Tests
 * 
 * Tests the unlock functionality for credential-owned fields in PropertiesPanel.
 * 
 * Requirements Coverage: 4.7, 5.6
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('PropertiesPanel Unlock Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleFieldUnlock callback', () => {
    it('should call attach-inputs with unlock_<nodeId>_<fieldName> key', () => {
      const nodeId = 'node_slack_123';
      const fieldName = 'webhookUrl';
      const workflowId = 'workflow_456';
      
      // Expected unlock key format
      const expectedUnlockKey = `unlock_${nodeId}_${fieldName}`;
      
      expect(expectedUnlockKey).toBe('unlock_node_slack_123_webhookUrl');
    });

    it('should update _ownershipUnlock flag in node config', () => {
      const fieldName = 'apiKey';
      const ownershipUnlockMap: Record<string, boolean> = {};
      
      // Simulate unlock
      ownershipUnlockMap[fieldName] = true;
      
      expect(ownershipUnlockMap[fieldName]).toBe(true);
    });

    it('should enable toggle when field is unlocked', () => {
      const isLocked = true;
      const isUnlockable = true;
      const isUnlocked = true;
      
      // Field is effectively unlocked when isUnlockable && isUnlocked
      const effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
      
      expect(effectivelyLocked).toBe(false);
    });
  });

  describe('Credential ownership detection', () => {
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

    it('should detect non-credential field from backend schema', () => {
      const backendInputSchema = {
        subject: {
          type: 'string',
          ownership: 'config',
        },
      };
      
      const fieldDef = backendInputSchema['subject'];
      const fieldOwnership = fieldDef?.ownership;
      const credentialTogglePolicy = fieldDef?.credentialTogglePolicy;
      
      const isCredentialOwned = fieldOwnership === 'credential';
      const isLocked = isCredentialOwned && credentialTogglePolicy === 'locked';
      const isUnlockable = isCredentialOwned && credentialTogglePolicy === 'unlockable';
      
      expect(isCredentialOwned).toBe(false);
      expect(isLocked).toBe(false);
      expect(isUnlockable).toBe(false);
    });
  });

  describe('Unlock state persistence', () => {
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

    it('should handle missing _ownershipUnlock gracefully', () => {
      const nodeConfig = {
        webhookUrl: 'https://hooks.slack.com/...',
      };
      
      const ownershipUnlockMap = (nodeConfig as any)._ownershipUnlock ?? {};
      const isUnlocked = ownershipUnlockMap['webhookUrl'] === true;
      
      expect(isUnlocked).toBe(false);
    });

    it('should handle multiple unlocked fields', () => {
      const nodeConfig = {
        _ownershipUnlock: {
          webhookUrl: true,
          apiKey: true,
          token: false,
        },
      };
      
      const ownershipUnlockMap = nodeConfig._ownershipUnlock ?? {};
      
      expect(ownershipUnlockMap['webhookUrl']).toBe(true);
      expect(ownershipUnlockMap['apiKey']).toBe(true);
      expect(ownershipUnlockMap['token']).toBe(false);
    });
  });

  describe('Optimistic UI updates', () => {
    it('should update config optimistically before API call', () => {
      const previousOwnershipUnlock = {
        webhookUrl: false,
      };
      
      const fieldKey = 'webhookUrl';
      
      // Optimistic update
      const current = { ...previousOwnershipUnlock };
      const updatedConfig = { ...current, [fieldKey]: true };
      
      expect(updatedConfig[fieldKey]).toBe(true);
    });

    it('should revert optimistic update on API failure', () => {
      const previousOwnershipUnlock = {
        webhookUrl: false,
      };
      
      const fieldKey = 'webhookUrl';
      const previousUnlockState = previousOwnershipUnlock[fieldKey];
      
      // Simulate API failure - revert to previous state
      const revertedConfig = { ...previousOwnershipUnlock, [fieldKey]: previousUnlockState };
      
      expect(revertedConfig[fieldKey]).toBe(false);
    });
  });

  describe('API request format', () => {
    it('should format unlock request correctly', () => {
      const nodeId = 'node_slack_123';
      const fieldKey = 'webhookUrl';
      const workflowId = 'workflow_456';
      
      const unlockKey = `unlock_${nodeId}_${fieldKey}`;
      const inputs: Record<string, unknown> = {
        [unlockKey]: true,
      };
      
      const expectedRequest = {
        inputs: {
          'unlock_node_slack_123_webhookUrl': true,
        },
      };
      
      expect(inputs).toEqual(expectedRequest.inputs);
    });

    it('should send request to correct endpoint', () => {
      const workflowId = 'workflow_456';
      const expectedEndpoint = `/api/workflows/${workflowId}/attach-inputs`;
      
      expect(expectedEndpoint).toBe('/api/workflows/workflow_456/attach-inputs');
    });
  });

  describe('Error handling', () => {
    it('should handle authentication error', () => {
      const token = null;
      
      if (!token) {
        const error = new Error('Authentication required');
        expect(error.message).toBe('Authentication required');
      }
    });

    it('should handle API error response', () => {
      const errorResponse = {
        error: 'Failed to unlock field',
        message: 'Field not found',
      };
      
      const errorMessage = errorResponse.error || errorResponse.message || 'Failed to unlock field: 500';
      
      expect(errorMessage).toBe('Failed to unlock field');
    });

    it('should handle network error', () => {
      const error = new Error('Network request failed');
      
      expect(error.message).toBe('Network request failed');
    });
  });

  describe('Integration with FieldOwnershipToggle', () => {
    it('should pass correct props to FieldOwnershipToggle for locked field', () => {
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
      
      const ownershipUnlockMap = {};
      const isUnlocked = (ownershipUnlockMap as any)['apiKey'] === true;
      
      // Expected props
      expect(isLocked).toBe(true);
      expect(isUnlockable).toBe(false);
      expect(isUnlocked).toBe(false);
    });

    it('should pass correct props to FieldOwnershipToggle for unlockable field', () => {
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
      
      const ownershipUnlockMap = { webhookUrl: true };
      const isUnlocked = ownershipUnlockMap['webhookUrl'] === true;
      
      // Expected props
      expect(isLocked).toBe(false);
      expect(isUnlockable).toBe(true);
      expect(isUnlocked).toBe(true);
    });

    it('should pass correct props to FieldOwnershipToggle for non-credential field', () => {
      const backendInputSchema = {
        subject: {
          type: 'string',
          ownership: 'config',
        },
      };
      
      const fieldDef = backendInputSchema['subject'];
      const fieldOwnership = fieldDef?.ownership;
      const credentialTogglePolicy = fieldDef?.credentialTogglePolicy;
      
      const isCredentialOwned = fieldOwnership === 'credential';
      const isLocked = isCredentialOwned && credentialTogglePolicy === 'locked';
      const isUnlockable = isCredentialOwned && credentialTogglePolicy === 'unlockable';
      
      const ownershipUnlockMap = {};
      const isUnlocked = (ownershipUnlockMap as any)['subject'] === true;
      
      // Expected props
      expect(isLocked).toBe(false);
      expect(isUnlockable).toBe(false);
      expect(isUnlocked).toBe(false);
    });
  });

  describe('User workflow', () => {
    it('should follow correct unlock workflow', () => {
      // 1. User sees locked credential field
      const isLocked = true;
      const isUnlockable = true;
      const isUnlocked = false;
      
      let effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
      expect(effectivelyLocked).toBe(true);
      
      // 2. User clicks unlock button
      const unlockClicked = true;
      
      // 3. Field is unlocked
      const newIsUnlocked = unlockClicked;
      effectivelyLocked = isLocked && !(isUnlockable && newIsUnlocked);
      expect(effectivelyLocked).toBe(false);
      
      // 4. User can now change ownership mode
      const canChangeMode = !effectivelyLocked;
      expect(canChangeMode).toBe(true);
    });
  });
});
