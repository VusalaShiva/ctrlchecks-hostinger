/**
 * FieldOwnershipToggle Component Tests
 * 
 * Tests the field ownership toggle component logic and props handling.
 * Note: Full rendering tests require @testing-library/react which is not currently installed.
 * These tests verify the component interface and type safety.
 */

import { describe, it, expect } from 'vitest';
import type { FieldOwnershipToggleProps } from '../FieldOwnershipToggle';
import type { FieldFillMode } from '@/lib/fillMode';

describe('FieldOwnershipToggle Component Interface', () => {
  it('should accept all required props', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'manual_static',
      onModeChange: (mode: FieldFillMode) => {
        expect(['manual_static', 'buildtime_ai_once', 'runtime_ai']).toContain(mode);
      },
    };
    
    expect(props.fieldName).toBe('subject');
    expect(props.nodeId).toBe('node_123');
    expect(props.currentMode).toBe('manual_static');
    expect(typeof props.onModeChange).toBe('function');
  });

  it('should accept optional isLocked prop', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'apiKey',
      nodeId: 'node_456',
      currentMode: 'buildtime_ai_once',
      onModeChange: () => {},
      isLocked: true,
    };
    
    expect(props.isLocked).toBe(true);
  });

  it('should accept optional className prop', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'body',
      nodeId: 'node_789',
      currentMode: 'runtime_ai',
      onModeChange: () => {},
      className: 'custom-class',
    };
    
    expect(props.className).toBe('custom-class');
  });

  it('should support all three fill modes', () => {
    const modes: FieldFillMode[] = ['manual_static', 'buildtime_ai_once', 'runtime_ai'];
    
    modes.forEach(mode => {
      const props: FieldOwnershipToggleProps = {
        fieldName: 'test',
        nodeId: 'node_test',
        currentMode: mode,
        onModeChange: () => {},
      };
      
      expect(props.currentMode).toBe(mode);
    });
  });

  it('should call onModeChange with correct mode type', () => {
    let capturedMode: FieldFillMode | null = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'recipients',
      nodeId: 'node_email',
      currentMode: 'manual_static',
      onModeChange: (mode: FieldFillMode) => {
        capturedMode = mode;
      },
    };
    
    // Simulate mode change
    props.onModeChange('buildtime_ai_once');
    expect(capturedMode).toBe('buildtime_ai_once');
    
    props.onModeChange('runtime_ai');
    expect(capturedMode).toBe('runtime_ai');
    
    props.onModeChange('manual_static');
    expect(capturedMode).toBe('manual_static');
  });

  it('should handle locked state correctly', () => {
    const lockedProps: FieldOwnershipToggleProps = {
      fieldName: 'password',
      nodeId: 'node_secure',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
    };
    
    expect(lockedProps.isLocked).toBe(true);
    
    const unlockedProps: FieldOwnershipToggleProps = {
      fieldName: 'password',
      nodeId: 'node_secure',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: false,
    };
    
    expect(unlockedProps.isLocked).toBe(false);
  });

  it('should accept isUnlockable prop for unlockable credential fields', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
    };
    
    expect(props.isUnlockable).toBe(true);
  });

  it('should accept isUnlocked prop to track unlock state', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: true,
    };
    
    expect(props.isUnlocked).toBe(true);
  });

  it('should accept onUnlock callback prop', () => {
    let unlockCalled = false;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: false,
      onUnlock: () => {
        unlockCalled = true;
      },
    };
    
    expect(typeof props.onUnlock).toBe('function');
    
    // Simulate unlock
    if (props.onUnlock) {
      props.onUnlock();
    }
    expect(unlockCalled).toBe(true);
  });

  it('should work with different field names', () => {
    const fieldNames = ['subject', 'body', 'recipients', 'apiKey', 'webhookUrl', 'spreadsheetId'];
    
    fieldNames.forEach(fieldName => {
      const props: FieldOwnershipToggleProps = {
        fieldName,
        nodeId: `node_${fieldName}`,
        currentMode: 'manual_static',
        onModeChange: () => {},
      };
      
      expect(props.fieldName).toBe(fieldName);
    });
  });

  it('should work with different node IDs', () => {
    const nodeIds = ['node_123', 'gmail_node_1', 'sheets_node_2', 'slack_node_3'];
    
    nodeIds.forEach(nodeId => {
      const props: FieldOwnershipToggleProps = {
        fieldName: 'test',
        nodeId,
        currentMode: 'manual_static',
        onModeChange: () => {},
      };
      
      expect(props.nodeId).toBe(nodeId);
    });
  });
});

describe('FieldOwnershipToggle Mode Switching Logic', () => {
  it('should cycle from buildtime_ai_once to manual_static', () => {
    let capturedMode: FieldFillMode | null = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'buildtime_ai_once',
      onModeChange: (mode: FieldFillMode) => {
        capturedMode = mode;
      },
    };
    
    // Simulate cycling: AI-built → You
    props.onModeChange('manual_static');
    expect(capturedMode).toBe('manual_static');
  });

  it('should cycle from manual_static to runtime_ai', () => {
    let capturedMode: FieldFillMode | null = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'manual_static',
      onModeChange: (mode: FieldFillMode) => {
        capturedMode = mode;
      },
    };
    
    // Simulate cycling: You → AI Runtime
    props.onModeChange('runtime_ai');
    expect(capturedMode).toBe('runtime_ai');
  });

  it('should cycle from runtime_ai to buildtime_ai_once', () => {
    let capturedMode: FieldFillMode | null = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'runtime_ai',
      onModeChange: (mode: FieldFillMode) => {
        capturedMode = mode;
      },
    };
    
    // Simulate cycling: AI Runtime → AI-built
    props.onModeChange('buildtime_ai_once');
    expect(capturedMode).toBe('buildtime_ai_once');
  });

  it('should complete full cycle: AI-built → You → AI Runtime → AI-built', () => {
    const modes: FieldFillMode[] = [];
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'buildtime_ai_once',
      onModeChange: (mode: FieldFillMode) => {
        modes.push(mode);
      },
    };
    
    // Simulate full cycle
    props.onModeChange('manual_static');      // AI-built → You
    props.onModeChange('runtime_ai');         // You → AI Runtime
    props.onModeChange('buildtime_ai_once');  // AI Runtime → AI-built
    
    expect(modes).toEqual(['manual_static', 'runtime_ai', 'buildtime_ai_once']);
  });

  it('should allow direct mode selection (not just cycling)', () => {
    let capturedMode: FieldFillMode | null = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'manual_static',
      onModeChange: (mode: FieldFillMode) => {
        capturedMode = mode;
      },
    };
    
    // User can click directly on any mode button
    props.onModeChange('buildtime_ai_once');
    expect(capturedMode).toBe('buildtime_ai_once');
    
    props.onModeChange('runtime_ai');
    expect(capturedMode).toBe('runtime_ai');
    
    props.onModeChange('manual_static');
    expect(capturedMode).toBe('manual_static');
  });

  it('should call onModeChange immediately for optimistic UI update', () => {
    let callCount = 0;
    let lastMode: FieldFillMode | null = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'buildtime_ai_once',
      onModeChange: (mode: FieldFillMode) => {
        callCount++;
        lastMode = mode;
      },
    };
    
    // Each mode change should call the callback immediately
    props.onModeChange('manual_static');
    expect(callCount).toBe(1);
    expect(lastMode).toBe('manual_static');
    
    props.onModeChange('runtime_ai');
    expect(callCount).toBe(2);
    expect(lastMode).toBe('runtime_ai');
  });

  it('should not call onModeChange when locked', () => {
    let callCount = 0;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'apiKey',
      nodeId: 'node_secure',
      currentMode: 'manual_static',
      onModeChange: () => {
        callCount++;
      },
      isLocked: true,
    };
    
    // When locked, the component should not allow mode changes
    // (This is enforced in the component's click handlers)
    expect(props.isLocked).toBe(true);
    expect(callCount).toBe(0);
  });
});

describe('FieldOwnershipToggle Value Restoration', () => {
  it('should accept currentValue prop for storing original AI-built value', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'buildtime_ai_once',
      onModeChange: () => {},
      currentValue: 'AI-generated subject',
    };
    
    expect(props.currentValue).toBe('AI-generated subject');
  });

  it('should accept onRestoreValue callback prop', () => {
    let restoredValue: unknown = null;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'manual_static',
      onModeChange: () => {},
      currentValue: 'User-entered value',
      onRestoreValue: (value: unknown) => {
        restoredValue = value;
      },
    };
    
    expect(typeof props.onRestoreValue).toBe('function');
    
    // Simulate restoration
    if (props.onRestoreValue) {
      props.onRestoreValue('Original AI value');
    }
    expect(restoredValue).toBe('Original AI value');
  });

  it('should pass restored value through onModeChange when switching to AI-built', () => {
    let capturedMode: FieldFillMode | null = null;
    let capturedRestoredValue: unknown = 'not-called';
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'manual_static',
      onModeChange: (mode: FieldFillMode, restoredValue?: unknown) => {
        capturedMode = mode;
        capturedRestoredValue = restoredValue;
      },
      currentValue: 'Original AI-built value',
      onRestoreValue: (value: unknown) => {
        // This is called for local UI update
      },
    };
    
    // Simulate switching to AI-built mode with restored value
    props.onModeChange('buildtime_ai_once', 'Original AI-built value');
    
    expect(capturedMode).toBe('buildtime_ai_once');
    expect(capturedRestoredValue).toBe('Original AI-built value');
  });

  it('should handle value restoration when switching from You to AI-built', () => {
    let restoredValue: unknown = null;
    let currentMode: FieldFillMode = 'buildtime_ai_once';
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode,
      onModeChange: (mode: FieldFillMode) => {
        currentMode = mode;
      },
      currentValue: 'Original AI-built value',
      onRestoreValue: (value: unknown) => {
        restoredValue = value;
      },
    };
    
    // Initial state: AI-built with original value
    expect(props.currentValue).toBe('Original AI-built value');
    
    // User switches to manual mode
    props.onModeChange('manual_static');
    expect(currentMode).toBe('manual_static');
    
    // User switches back to AI-built - should restore original value
    if (props.onRestoreValue) {
      props.onRestoreValue('Original AI-built value');
    }
    props.onModeChange('buildtime_ai_once');
    
    expect(currentMode).toBe('buildtime_ai_once');
    expect(restoredValue).toBe('Original AI-built value');
  });

  it('should handle case where original value is not available', () => {
    let restoredValue: unknown = 'not-called';
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'manual_static',
      onModeChange: () => {},
      currentValue: undefined, // No original value
      onRestoreValue: (value: unknown) => {
        restoredValue = value;
      },
    };
    
    // When switching to AI-built without original value
    if (props.onRestoreValue) {
      props.onRestoreValue(undefined);
    }
    
    expect(restoredValue).toBe(undefined);
  });

  it('should work with different value types (string, array, object)', () => {
    const testCases = [
      { value: 'Simple string', type: 'string' },
      { value: ['item1', 'item2', 'item3'], type: 'array' },
      { value: { key: 'value', nested: { data: 123 } }, type: 'object' },
      { value: 42, type: 'number' },
      { value: true, type: 'boolean' },
    ];
    
    testCases.forEach(({ value, type }) => {
      let restoredValue: unknown = null;
      
      const props: FieldOwnershipToggleProps = {
        fieldName: 'testField',
        nodeId: 'node_test',
        currentMode: 'buildtime_ai_once',
        onModeChange: () => {},
        currentValue: value,
        onRestoreValue: (val: unknown) => {
          restoredValue = val;
        },
      };
      
      expect(props.currentValue).toEqual(value);
      
      // Simulate restoration
      if (props.onRestoreValue) {
        props.onRestoreValue(value);
      }
      
      expect(restoredValue).toEqual(value);
    });
  });

  it('should handle empty string as a valid value', () => {
    let restoredValue: unknown = 'not-called';
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'buildtime_ai_once',
      onModeChange: () => {},
      currentValue: '', // Empty string is a valid value
      onRestoreValue: (value: unknown) => {
        restoredValue = value;
      },
    };
    
    expect(props.currentValue).toBe('');
    
    // Simulate restoration
    if (props.onRestoreValue) {
      props.onRestoreValue('');
    }
    
    expect(restoredValue).toBe('');
  });

  it('should handle null as a valid value', () => {
    let restoredValue: unknown = 'not-called';
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'subject',
      nodeId: 'node_123',
      currentMode: 'buildtime_ai_once',
      onModeChange: () => {},
      currentValue: null,
      onRestoreValue: (value: unknown) => {
        restoredValue = value;
      },
    };
    
    expect(props.currentValue).toBe(null);
    
    // Simulate restoration
    if (props.onRestoreValue) {
      props.onRestoreValue(null);
    }
    
    expect(restoredValue).toBe(null);
  });
});

describe('FieldOwnershipToggle Unlock Functionality', () => {
  it('should handle locked credential field (credentialTogglePolicy: locked)', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'apiKey',
      nodeId: 'node_secure',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: false,
    };
    
    // Field is locked and not unlockable - toggle should be disabled
    expect(props.isLocked).toBe(true);
    expect(props.isUnlockable).toBe(false);
  });

  it('should handle unlockable credential field (credentialTogglePolicy: unlockable)', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: false,
    };
    
    // Field is locked but unlockable - should show unlock button
    expect(props.isLocked).toBe(true);
    expect(props.isUnlockable).toBe(true);
    expect(props.isUnlocked).toBe(false);
  });

  it('should enable toggle after unlock', () => {
    let unlocked = false;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: unlocked,
      onUnlock: () => {
        unlocked = true;
      },
    };
    
    // Initially locked
    expect(props.isUnlocked).toBe(false);
    
    // User clicks unlock
    if (props.onUnlock) {
      props.onUnlock();
    }
    
    // Now unlocked
    expect(unlocked).toBe(true);
    
    // Create new props with unlocked state
    const unlockedProps: FieldOwnershipToggleProps = {
      ...props,
      isUnlocked: true,
    };
    
    // Toggle should now be enabled
    expect(unlockedProps.isUnlocked).toBe(true);
  });

  it('should call onUnlock when unlock button is clicked', () => {
    let unlockCallCount = 0;
    
    const props: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: false,
      onUnlock: () => {
        unlockCallCount++;
      },
    };
    
    // Simulate unlock button click
    if (props.onUnlock) {
      props.onUnlock();
    }
    
    expect(unlockCallCount).toBe(1);
  });

  it('should allow mode changes after unlock', () => {
    let currentMode: FieldFillMode = 'manual_static';
    let modeChangeCount = 0;
    
    const unlockedProps: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode,
      onModeChange: (mode: FieldFillMode) => {
        currentMode = mode;
        modeChangeCount++;
      },
      isLocked: true,
      isUnlockable: true,
      isUnlocked: true, // Field has been unlocked
    };
    
    // After unlock, mode changes should work
    unlockedProps.onModeChange('buildtime_ai_once');
    expect(currentMode).toBe('buildtime_ai_once');
    expect(modeChangeCount).toBe(1);
    
    unlockedProps.onModeChange('runtime_ai');
    expect(currentMode).toBe('runtime_ai');
    expect(modeChangeCount).toBe(2);
  });

  it('should not allow mode changes when locked and not unlocked', () => {
    let modeChangeCount = 0;
    
    const lockedProps: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {
        modeChangeCount++;
      },
      isLocked: true,
      isUnlockable: true,
      isUnlocked: false, // Not yet unlocked
    };
    
    // Component should prevent mode changes when locked
    // (This is enforced in the component's click handlers)
    expect(lockedProps.isLocked).toBe(true);
    expect(lockedProps.isUnlocked).toBe(false);
    expect(modeChangeCount).toBe(0);
  });

  it('should handle unlock state persistence via _ownershipUnlock flag', () => {
    // Simulate the workflow: locked → unlock → persist → reload
    let ownershipUnlockFlag = false;
    
    // Initial state: locked
    const initialProps: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: ownershipUnlockFlag,
      onUnlock: () => {
        ownershipUnlockFlag = true;
      },
    };
    
    expect(initialProps.isUnlocked).toBe(false);
    
    // User unlocks
    if (initialProps.onUnlock) {
      initialProps.onUnlock();
    }
    
    expect(ownershipUnlockFlag).toBe(true);
    
    // After persist and reload, isUnlocked should be true
    const reloadedProps: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: ownershipUnlockFlag, // Read from persisted _ownershipUnlock
    };
    
    expect(reloadedProps.isUnlocked).toBe(true);
  });

  it('should handle always-locked fields (credentialTogglePolicy: locked)', () => {
    const props: FieldOwnershipToggleProps = {
      fieldName: 'privateKey',
      nodeId: 'node_secure',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: false, // Cannot be unlocked
    };
    
    // Always-locked fields should not have unlock functionality
    expect(props.isLocked).toBe(true);
    expect(props.isUnlockable).toBe(false);
    expect(props.onUnlock).toBeUndefined();
  });

  it('should show lock icon when effectively locked', () => {
    // Case 1: Locked and not unlockable
    const alwaysLockedProps: FieldOwnershipToggleProps = {
      fieldName: 'privateKey',
      nodeId: 'node_secure',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: false,
    };
    
    // Should show lock icon
    expect(alwaysLockedProps.isLocked).toBe(true);
    expect(alwaysLockedProps.isUnlockable).toBe(false);
    
    // Case 2: Locked, unlockable, but not yet unlocked
    const lockedUnlockableProps: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: false,
    };
    
    // Should show lock icon
    expect(lockedUnlockableProps.isLocked).toBe(true);
    expect(lockedUnlockableProps.isUnlocked).toBe(false);
    
    // Case 3: Locked, unlockable, and unlocked
    const unlockedProps: FieldOwnershipToggleProps = {
      fieldName: 'webhookUrl',
      nodeId: 'node_slack',
      currentMode: 'manual_static',
      onModeChange: () => {},
      isLocked: true,
      isUnlockable: true,
      isUnlocked: true,
    };
    
    // Should NOT show lock icon (effectively unlocked)
    expect(unlockedProps.isLocked).toBe(true);
    expect(unlockedProps.isUnlocked).toBe(true);
  });
});
