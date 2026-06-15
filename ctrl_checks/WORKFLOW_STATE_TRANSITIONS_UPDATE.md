# Workflow Generation State Transitions Update

## Overview

Updated the workflow generation state machine to include new confirmation states and fix state transitions.

## New States Added

1. **STATE_WORKFLOW_BUILT** - Workflow has been built but not yet sent for confirmation
2. **STATE_WAITING_CONFIRMATION** - Workflow sent to user and waiting for confirmation
3. **STATE_CONFIRMED** - User has confirmed the workflow
4. **STATE_REJECTED** - User has rejected the workflow (terminal state)

## Updated State Transitions

### New Transitions

- `STATE_5_WORKFLOW_BUILDING` → `STATE_WORKFLOW_BUILT` (replaces direct transition to STATE_6)
- `STATE_WORKFLOW_BUILT` → `STATE_WAITING_CONFIRMATION`
- `STATE_WAITING_CONFIRMATION` → `STATE_CONFIRMED`
- `STATE_WAITING_CONFIRMATION` → `STATE_REJECTED`
- `STATE_CONFIRMED` → `STATE_6_WORKFLOW_VALIDATION`

### Removed Transitions

- `STATE_5_WORKFLOW_BUILDING` → `STATE_6_WORKFLOW_VALIDATION` (now goes through confirmation states)

## Updated Methods

### New Methods

1. **`markWaitingForConfirmation()`** - Transitions from `STATE_WORKFLOW_BUILT` to `STATE_WAITING_CONFIRMATION`
2. **`confirmWorkflow()`** - Transitions from `STATE_WAITING_CONFIRMATION` to `STATE_CONFIRMED`
3. **`rejectWorkflow()`** - Transitions from `STATE_WAITING_CONFIRMATION` to `STATE_REJECTED`
4. **`moveToValidationFromConfirmed()`** - Transitions from `STATE_CONFIRMED` to `STATE_6_WORKFLOW_VALIDATION`

### Updated Methods

1. **`setWorkflowBlueprint()`** - Now returns `{ success: boolean; error?: string }` and transitions to `STATE_WORKFLOW_BUILT` instead of `STATE_6_WORKFLOW_VALIDATION`
2. **`moveToValidation()`** - Updated to handle the new confirmation flow automatically for backward compatibility
3. **`isTerminalState()`** - Now includes `STATE_REJECTED` as a terminal state

## Complete Flow

### Successful Flow
```
STATE_5_WORKFLOW_BUILDING
  ↓ (setWorkflowBlueprint)
STATE_WORKFLOW_BUILT
  ↓ (markWaitingForConfirmation)
STATE_WAITING_CONFIRMATION
  ↓ (confirmWorkflow)
STATE_CONFIRMED
  ↓ (moveToValidationFromConfirmed)
STATE_6_WORKFLOW_VALIDATION
  ↓ (markWorkflowReady)
STATE_7_WORKFLOW_READY
```

### Rejected Flow
```
STATE_5_WORKFLOW_BUILDING
  ↓ (setWorkflowBlueprint)
STATE_WORKFLOW_BUILT
  ↓ (markWaitingForConfirmation)
STATE_WAITING_CONFIRMATION
  ↓ (rejectWorkflow)
STATE_REJECTED (terminal)
```

## Backward Compatibility

The `moveToValidation()` method has been updated to automatically handle the new confirmation flow when called from `STATE_5_WORKFLOW_BUILDING`. This ensures existing code continues to work without modification.

## Testing

Comprehensive tests have been added in `ctrl_checks/src/lib/__tests__/workflow-generation-state.test.ts` covering:

- All new state transitions
- Invalid transition prevention
- Complete successful flow
- Rejection flow
- Backward compatibility with `moveToValidation()`

## Migration Notes

- Code that directly transitions from `STATE_5_WORKFLOW_BUILDING` to `STATE_6_WORKFLOW_VALIDATION` should be updated to use the new confirmation flow
- The `moveToValidation()` method can still be used for backward compatibility
- All state transitions are validated and invalid transitions will return errors
