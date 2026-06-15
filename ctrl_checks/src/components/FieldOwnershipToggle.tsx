import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FieldFillMode } from '@/lib/fillMode';
import { useState, useEffect } from 'react';

export interface FieldOwnershipToggleProps {
  /** The field name (e.g., "subject", "body", "recipients") */
  fieldName: string;
  
  /** The node ID this field belongs to */
  nodeId: string;
  
  /** Current fill mode: "manual_static" | "buildtime_ai_once" | "runtime_ai" */
  currentMode: FieldFillMode;
  
  /** Callback when user changes the mode - receives the new mode and optionally the restored value */
  onModeChange: (newMode: FieldFillMode, restoredValue?: unknown) => void;
  
  /** Current field value */
  currentValue?: unknown;
  
  /** Callback to restore original AI-built value (for local UI update) */
  onRestoreValue?: (originalValue: unknown) => void;
  
  /** Whether the field is locked (credential-owned with credentialTogglePolicy: 'locked') */
  isLocked?: boolean;
  
  /** Whether the field is unlockable (credentialTogglePolicy: 'unlockable') */
  isUnlockable?: boolean;
  
  /** Whether the field has been unlocked by the user (from config._ownershipUnlock) */
  isUnlocked?: boolean;
  
  /** Callback when user unlocks the field */
  onUnlock?: () => void;
  
  /** Optional className for styling */
  className?: string;
}

/**
 * FieldOwnershipToggle Component
 * 
 * Displays a three-state toggle for field ownership:
 * - "You" (manual_static): User manually provides the value
 * - "AI-built" (buildtime_ai_once): AI populated the value once during workflow generation
 * - "AI Runtime" (runtime_ai): AI resolves the value at runtime from previous node outputs
 * 
 * Value Restoration:
 * - Stores the original AI-built value when component mounts or when mode is buildtime_ai_once
 * - Restores the original value when switching from "You" back to "AI-built"
 * - Handles cases where original value is not available (uses empty/default)
 * 
 * Credential-Owned Fields:
 * - Fields with credentialTogglePolicy: 'locked' are always locked (toggle disabled)
 * - Fields with credentialTogglePolicy: 'unlockable' can be unlocked by the user
 * - When locked and not unlocked, the toggle is disabled and shows a lock icon
 * - User can click unlock button to enable the toggle (sets _ownershipUnlock flag)
 * 
 * Requirements Coverage: 4.2, 4.3, 4.5, 4.7, 5.6
 */
export function FieldOwnershipToggle({
  fieldName,
  nodeId,
  currentMode,
  onModeChange,
  currentValue,
  onRestoreValue,
  isLocked = false,
  isUnlockable = false,
  isUnlocked = false,
  onUnlock,
  className,
}: FieldOwnershipToggleProps) {
  // Store the original AI-built value for restoration
  const [originalAiBuiltValue, setOriginalAiBuiltValue] = useState<unknown>(undefined);
  const [hasStoredOriginal, setHasStoredOriginal] = useState(false);

  // Store the original AI-built value when the component mounts with buildtime_ai_once mode
  // or when the mode changes to buildtime_ai_once
  useEffect(() => {
    if (currentMode === 'buildtime_ai_once' && !hasStoredOriginal && currentValue !== undefined) {
      setOriginalAiBuiltValue(currentValue);
      setHasStoredOriginal(true);
    }
  }, [currentMode, currentValue, hasStoredOriginal]);

  /**
   * Cycle through modes in order: buildtime_ai_once → manual_static → runtime_ai → buildtime_ai_once
   * This implements the requirement: AI-built → You → AI Runtime → AI-built
   */
  const handleToggleClick = () => {
    // Check if field is locked and not unlocked
    const effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
    if (effectivelyLocked) return;
    
    let nextMode: FieldFillMode;
    
    switch (currentMode) {
      case 'buildtime_ai_once':
        nextMode = 'manual_static';
        break;
      case 'manual_static':
        nextMode = 'runtime_ai';
        break;
      case 'runtime_ai':
        nextMode = 'buildtime_ai_once';
        break;
      default:
        nextMode = 'manual_static';
    }
    
    // Call callback with new mode (optimistic UI update)
    onModeChange(nextMode);
  };

  const handleModeClick = (mode: FieldFillMode) => {
    // Check if field is locked and not unlocked
    const effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);
    if (effectivelyLocked) return;
    
    // When switching from any mode to AI-built, restore the original value if available
    if (mode === 'buildtime_ai_once' && currentMode !== 'buildtime_ai_once') {
      // Restore original AI-built value if we have it
      if (hasStoredOriginal && onRestoreValue) {
        onRestoreValue(originalAiBuiltValue);
      }
      // Pass the restored value to onModeChange so it can be sent to attach-inputs
      onModeChange(mode, hasStoredOriginal ? originalAiBuiltValue : undefined);
    } else {
      // For other mode changes, just update the mode
      onModeChange(mode);
    }
  };

  const handleUnlockClick = () => {
    if (onUnlock) {
      onUnlock();
    }
  };

  // Determine if toggle should be disabled
  const effectivelyLocked = isLocked && !(isUnlockable && isUnlocked);

  return (
    <div className={cn('flex min-w-0 max-w-full flex-wrap items-center gap-2', className)}>
      {/* Lock indicator for credential-owned fields */}
      {effectivelyLocked && (
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span className="text-[10px]">Locked</span>
        </div>
      )}

      {/* Unlock button for unlockable credential-owned fields */}
      {isUnlockable && !isUnlocked && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-6 px-2 text-[11px]"
          onClick={handleUnlockClick}
          aria-label={`Unlock ${fieldName} field`}
        >
          Unlock
        </Button>
      )}

      {/* Three-state toggle buttons */}
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          size="sm"
          variant={currentMode === 'manual_static' ? 'default' : 'outline'}
          className="h-6 px-2 text-[11px]"
          onClick={() => handleModeClick('manual_static')}
          disabled={effectivelyLocked}
          aria-label={`Set ${fieldName} to manual mode`}
        >
          You
        </Button>
        
        <Button
          type="button"
          size="sm"
          variant={currentMode === 'buildtime_ai_once' ? 'default' : 'outline'}
          className="h-6 px-2 text-[11px]"
          onClick={() => handleModeClick('buildtime_ai_once')}
          disabled={effectivelyLocked}
          aria-label={`Set ${fieldName} to AI-built mode`}
        >
          AI-built
        </Button>
        
        <Button
          type="button"
          size="sm"
          variant={currentMode === 'runtime_ai' ? 'default' : 'outline'}
          className="h-6 px-2 text-[11px]"
          onClick={() => handleModeClick('runtime_ai')}
          disabled={effectivelyLocked}
          aria-label={`Set ${fieldName} to AI Runtime mode`}
        >
          AI Runtime
        </Button>
      </div>

      {/* Mode hint text */}
      <div className="min-w-0 flex-1 text-[10px] text-muted-foreground">
        {currentMode === 'manual_static' && (
          <span className="block truncate">You provide the value</span>
        )}
        {currentMode === 'buildtime_ai_once' && (
          <span className="block truncate text-sky-500/80">AI filled once when workflow was built</span>
        )}
        {currentMode === 'runtime_ai' && (
          <span className="block truncate text-amber-500/80">AI resolves from previous node output at runtime</span>
        )}
      </div>
    </div>
  );
}
