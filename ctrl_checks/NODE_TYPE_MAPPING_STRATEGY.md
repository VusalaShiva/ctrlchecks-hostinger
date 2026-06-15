# Node Type Mapping Strategy

## Overview

This document describes the mapping strategy between backend pipeline node types and frontend React Flow node types.

## Architecture

### Backend Node Schema
- **Location**: `worker/src/core/contracts/types.ts`
- **Format**: 
  ```typescript
  {
    id: string;
    type: string;  // e.g., "manual_trigger", "set_variable"
    data: {
      type: string;  // Actual node type
      label?: string;
      category?: string;
      config?: Record<string, unknown>;
    }
  }
  ```

### Frontend Node Schema
- **Location**: `ctrl_checks/src/stores/workflowStore.ts`
- **Format**:
  ```typescript
  {
    id: string;
    type: string;  // React Flow component type: "custom", "form", "manual_trigger", "set_variable"
    data: {
      type: string;  // Actual node type (from backend)
      label: string;
      category: NodeCategory;
      icon: string;
      config: Record<string, unknown>;
    }
  }
  ```

## Mapping Strategy

### 1. Node Type Mapping

**Strategy**: Most nodes use `'custom'` component with actual type in `data.type`

**Special Cases**:
- `form` → `'form'` (uses `FormTriggerNode` component)
- `manual_trigger` → `'manual_trigger'` (registered in nodeTypes map)
- `set_variable` → `'set_variable'` (registered in nodeTypes map)

**Default**: All other nodes → `'custom'` (uses `WorkflowNode` component)

### 2. Component Registration

**Location**: `ctrl_checks/src/components/workflow/WorkflowCanvas.tsx`

```typescript
const nodeTypes = {
  custom: WorkflowNode,           // Default for most nodes
  form: FormTriggerNode,          // Special form component
  manual_trigger: WorkflowNode,   // Registered explicitly
  set_variable: WorkflowNode,     // Registered explicitly
};
```

**Rule**: If a node type needs special rendering, register it explicitly. Otherwise, use `'custom'`.

### 3. Handle ID Normalization

**Backend Format**:
- `sourceOutput` → Frontend `sourceHandle`
- `targetInput` → Frontend `targetHandle`

**Standard Handle IDs**:
- Input: `"input"` (Position.Top)
- Output: `"output"` (Position.Bottom)

**Special Cases**:
- `if_else`: `"true"`, `"false"` (Position.Bottom)
- `switch`: Dynamic case values (Position.Bottom)
- `ai_agent`: `"userInput"`, `"chat_model"`, `"memory"`, `"tool"` (inputs), `"output"` (output)

### 4. Edge Connection Schema

**Backend Format**:
```typescript
{
  source: string;
  target: string;
  sourceOutput?: string;  // Backend format
  targetInput?: string;   // Backend format
}
```

**Frontend Format**:
```typescript
{
  source: string;
  target: string;
  sourceHandle?: string;  // Frontend format
  targetHandle?: string;  // Frontend format
}
```

**Normalization**: `normalizeBackendEdge()` converts `sourceOutput` → `sourceHandle`, `targetInput` → `targetHandle`

## Normalization Layer

### Location
`ctrl_checks/src/lib/node-type-normalizer.ts`

### Functions

1. **`normalizeBackendNode(backendNode)`**
   - Maps backend node type to frontend React Flow component type
   - Ensures proper structure with `data.type` containing actual type
   - Fills in missing label, category, icon from NODE_TYPES registry

2. **`normalizeBackendEdge(backendEdge)`**
   - Converts `sourceOutput` → `sourceHandle`
   - Converts `targetInput` → `targetHandle`
   - Preserves other edge properties

3. **`normalizeBackendWorkflow(backendWorkflow)`**
   - Normalizes entire workflow (nodes + edges)
   - Returns frontend-compatible format

4. **`validateNodeTypesRegistered(nodes)`**
   - Validates all node types are registered in React Flow nodeTypes map
   - Returns missing types and warnings

## Integration Points

### 1. Workflow Loading
**File**: `ctrl_checks/src/pages/WorkflowBuilder.tsx`
**Function**: `loadWorkflow()`
```typescript
// Step 1: Normalize backend format
const normalizedBackend = normalizeBackendWorkflow({ nodes, edges });
// Step 2: Validate and fix
const normalized = validateAndFixWorkflow(normalizedBackend);
```

### 2. Workflow Import
**File**: `ctrl_checks/src/pages/WorkflowBuilder.tsx`
**Function**: `handleImportWorkflow()`
```typescript
// Step 1: Normalize backend format
const normalizedBackend = normalizeBackendWorkflow(workflowData);
// Step 2: Validate and fix
const normalized = validateAndFixWorkflow(normalizedBackend);
```

### 3. AI Workflow Generation
**File**: `ctrl_checks/src/components/workflow/AutonomousAgentWizard.tsx`
**Function**: Multiple locations where workflows are received
```typescript
// Normalize before setting nodes/edges
const normalizedBackend = normalizeBackendWorkflow({ nodes, edges });
setNodes(normalizedBackend.nodes);
setEdges(normalizedBackend.edges);
```

## Patch Summary

### Files Modified

1. **`ctrl_checks/src/lib/node-type-normalizer.ts`** (NEW)
   - Node type mapping
   - Handle ID normalization
   - Edge schema normalization
   - Validation functions

2. **`ctrl_checks/src/components/workflow/WorkflowCanvas.tsx`**
   - Added `manual_trigger` and `set_variable` to nodeTypes map

3. **`ctrl_checks/src/pages/WorkflowBuilder.tsx`**
   - Integrated normalization in `loadWorkflow()`
   - Integrated normalization in `handleImportWorkflow()`

4. **`ctrl_checks/src/components/workflow/AutonomousAgentWizard.tsx`**
   - Integrated normalization where workflows are received from backend

## Verification Checklist

- [x] Node type mapping defined
- [x] Handle ID normalization implemented
- [x] Edge schema normalization implemented
- [x] Component registration updated
- [x] Integration points identified
- [x] Validation functions created

## Example Mappings

### Example 1: Manual Trigger
```typescript
// Backend
{ type: "manual_trigger", data: { type: "manual_trigger" } }

// Frontend (after normalization)
{ type: "manual_trigger", data: { type: "manual_trigger", label: "Manual Trigger", ... } }
```

### Example 2: Set Variable
```typescript
// Backend
{ type: "set_variable", data: { type: "set_variable" } }

// Frontend (after normalization)
{ type: "set_variable", data: { type: "set_variable", label: "Set Variable", ... } }
```

### Example 3: Generic Node
```typescript
// Backend
{ type: "google_sheets", data: { type: "google_sheets" } }

// Frontend (after normalization)
{ type: "custom", data: { type: "google_sheets", label: "Google Sheets", ... } }
```

### Example 4: Edge Normalization
```typescript
// Backend
{ source: "node1", target: "node2", sourceOutput: "output", targetInput: "input" }

// Frontend (after normalization)
{ source: "node1", target: "node2", sourceHandle: "output", targetHandle: "input" }
```
