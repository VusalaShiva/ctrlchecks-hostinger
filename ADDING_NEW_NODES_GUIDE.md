# Complete Guide: Adding New Nodes to the System

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Quick Start: Adding a Simple Node](#quick-start-adding-a-simple-node)
3. [Step-by-Step Process](#step-by-step-process)
4. [File Locations & Responsibilities](#file-locations--responsibilities)
5. [Schema Structure](#schema-structure)
6. [Execution Patterns](#execution-patterns)
7. [Advanced: Custom Overrides](#advanced-custom-overrides)
8. [Testing Checklist](#testing-checklist)
9. [Common Patterns & Examples](#common-patterns--examples)

---

## Architecture Overview

### Core Principle: Single Source of Truth

**ALL node behavior MUST be defined in the UnifiedNodeRegistry.**
- ✅ **CORRECT**: Define node in `node-library.ts` → Auto-registered in `UnifiedNodeRegistry`
- ❌ **FORBIDDEN**: Hardcoded `if (node.type === ...)` logic anywhere else

### System Flow

```
1. Node Schema Definition (node-library.ts)
   ↓
2. Auto-conversion to UnifiedNodeDefinition (unified-node-registry.ts)
   ↓
3. Optional Override (unified-node-registry-overrides.ts)
   ↓
4. Dynamic Execution (dynamic-node-executor.ts)
   ↓
5. Legacy Executor (execute-workflow.ts) - if needed
```

---

## Quick Start: Adding a Simple Node

### Minimum Required Steps

1. **Add schema to `node-library.ts`**
2. **Add execution logic to `execute-workflow.ts`** (legacy executor)
3. **Test the node**

### Universal Node Intelligence Requirement

Every new node field must either provide explicit `fieldIntelligence` metadata or be safe with the registry's conservative inference. A node is not production-ready when fields only define `type`, `description`, and `required`.

For each input field, document:

- Runtime behavior when the field is missing or empty
- Backend default, including real defaults like `0`, `''`, `[]`, and `{}`
- Whether the field is required, conditionally required, recommended, optional, or advanced
- Whether empty/wrong values can break execution or produce bad output
- Safe defaults the AI may recommend for common use cases
- Validation hints that should appear before execution

Use explicit `fieldIntelligence` for high-impact fields such as limits, max lengths, URLs, IDs, operation selectors, filters, conditions, prompts, message bodies, model settings, and credentials. AI guidance, workflow validation, field ownership help, and runtime AI input resolution all read this metadata from `UnifiedNodeRegistry`.

That's it! The system will automatically:
- Register the node in UnifiedNodeRegistry
- Enable template resolution
- Enable validation
- Enable AI workflow generation

---

## Step-by-Step Process

### Step 1: Define Node Schema in `node-library.ts`

**Location**: `worker/src/services/nodes/node-library.ts`

**Method**: Add a private method `createYourNodeSchema()` and call it in `initializeSchemas()`

#### Example: Adding a "Slack Message" Node

```typescript
// In node-library.ts, add this method:

private createSlackMessageSchema(): NodeSchema {
  return {
    type: 'slack_message',  // ✅ Canonical type (use underscores, lowercase)
    label: 'Slack Message',
    category: 'communication',
    description: 'Send a message to a Slack channel or user',
    
    // ✅ CRITICAL: Define all input fields
    configSchema: {
      required: ['channel', 'message'],  // Required fields
      optional: {
        channel: {
          type: 'string',
          description: 'Slack channel ID or name (e.g., #general or C123456)',
          examples: ['#general', 'C123456', '{{$json.channel}}'],
        },
        message: {
          type: 'string',
          description: 'Message text to send',
          examples: ['Hello from workflow!', '{{$json.message}}'],
        },
        threadTs: {
          type: 'string',
          description: 'Thread timestamp to reply in thread',
          required: false,
        },
        username: {
          type: 'string',
          description: 'Bot username (optional)',
        },
        iconEmoji: {
          type: 'string',
          description: 'Bot icon emoji (e.g., :robot_face:)',
        },
      },
    },
    
    // ✅ AI Selection Criteria (for workflow generation)
    aiSelectionCriteria: {
      whenToUse: [
        'User wants to send notifications to Slack',
        'Team communication needed',
        'Alert/notification requirements',
      ],
      whenNotToUse: [
        'Email notifications needed',
        'SMS messaging required',
        'No Slack integration available',
      ],
      keywords: ['slack', 'message', 'notification', 'team', 'channel'],
      useCases: ['Team notifications', 'Alert systems', 'Status updates'],
    },
    
    // ✅ Common Patterns (pre-configured examples)
    commonPatterns: [
      {
        name: 'send_to_channel',
        description: 'Send message to a channel',
        config: { channel: '#general', message: 'Hello!' },
      },
      {
        name: 'send_with_template',
        description: 'Send message with template variables',
        config: { channel: '{{$json.channel}}', message: '{{$json.message}}' },
      },
    ],
    
    // ✅ Validation Rules
    validationRules: [
      {
        field: 'channel',
        validator: (value) => typeof value === 'string' && value.length > 0,
        errorMessage: 'Channel must be a non-empty string',
      },
      {
        field: 'message',
        validator: (value) => typeof value === 'string' && value.length > 0,
        errorMessage: 'Message must be a non-empty string',
      },
    ],
    
    // ✅ Output Schema (what the node produces)
    outputType: 'object',
    outputSchema: {
      success: { type: 'boolean' },
      channel: { type: 'string' },
      timestamp: { type: 'string' },
      messageTs: { type: 'string' },
    },
    
    // ✅ Schema Version (for backward compatibility)
    schemaVersion: '1.0.0',
    
    // ✅ Keywords for AI resolution
    keywords: ['slack', 'message', 'notification'],
    
    // ✅ Provider (for credential auto-detection)
    providers: ['slack'],
  };
}

// Then in initializeSchemas() method, add:
private initializeSchemas(): void {
  // ... existing schemas ...
  
  // Add your new schema
  this.registerSchema(this.createSlackMessageSchema());
}
```

---

### Step 2: Add Execution Logic

**Location**: `worker/src/api/execute-workflow.ts`

**Method**: Add a case in `executeNodeLegacy()` function

#### Example: Slack Message Execution

```typescript
// In execute-workflow.ts, inside executeNodeLegacy() function:

export async function executeNodeLegacy(
  node: WorkflowNode,
  input: unknown,
  nodeOutputs: LRUNodeOutputsCache,
  supabase: SupabaseClient,
  workflowId: string,
  userId?: string,
  currentUserId?: string
): Promise<unknown> {
  const normalizedType = normalizeNodeType(node);
  const type = normalizedType || node.data?.type || node.type;
  const config = node.data?.config || {};
  const inputObj = extractInputObject(input);

  // ... existing cases ...

  // ✅ Add your new case
  case 'slack_message': {
    try {
      // Get credentials from Supabase
      const { data: credential } = await supabase
        .from('credentials')
        .select('*')
        .eq('workflow_id', workflowId)
        .eq('node_id', node.id)
        .eq('provider', 'slack')
        .single();

      if (!credential) {
        return {
          success: false,
          error: 'Slack credentials not found. Please connect a Slack account.',
        };
      }

      // Extract config values (templates already resolved by system)
      const channel = config.channel || inputObj?.channel;
      const message = config.message || inputObj?.message;
      const threadTs = config.threadTs;

      if (!channel || !message) {
        return {
          success: false,
          error: 'Channel and message are required',
        };
      }

      // Call Slack API
      const { WebClient } = require('@slack/web-api');
      const client = new WebClient(credential.access_token);
      
      const result = await client.chat.postMessage({
        channel: channel,
        text: message,
        thread_ts: threadTs,
        username: config.username,
        icon_emoji: config.iconEmoji,
      });

      // ✅ Return output matching outputSchema
      return {
        success: true,
        channel: result.channel,
        timestamp: result.ts,
        messageTs: result.ts,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send Slack message',
      };
    }
  }

  // ... rest of cases ...
}
```

---

### Step 3: (Optional) Add Custom Override

**Only needed if**: Node requires special behavior beyond standard execution

**Location**: `worker/src/core/registry/overrides/your-node-name.ts`

#### When to Use Overrides

- ✅ Complex template resolution
- ✅ Special input/output handling
- ✅ Multi-step operations
- ✅ Custom credential resolution
- ✅ Branching logic (multiple output ports)

#### Example: Custom Override for Slack

```typescript
// Create: worker/src/core/registry/overrides/slack-message.ts

import type { UnifiedNodeDefinition, NodeExecutionContext, NodeExecutionResult } from '../../types/unified-node-contract';
import type { NodeSchema } from '../../../services/nodes/node-library';
import { executeViaLegacyExecutor } from '../unified-node-registry-legacy-adapter';

export function overrideSlackMessage(def: UnifiedNodeDefinition, schema: NodeSchema): UnifiedNodeDefinition {
  return {
    ...def,
    // Add custom tags
    tags: [...(def.tags || []), 'communication', 'notification'],
    
    // Custom execute function (if needed)
    execute: async (context: NodeExecutionContext): Promise<NodeExecutionResult> => {
      // Custom logic here, or delegate to legacy executor
      return await executeViaLegacyExecutor({ context, schema });
    },
  };
}
```

**Then register in**: `worker/src/core/registry/unified-node-registry-overrides.ts`

```typescript
import { overrideSlackMessage } from './overrides/slack-message';

const overridesByType: Record<string, OverrideFn> = {
  // ... existing overrides ...
  slack_message: overrideSlackMessage,  // ✅ Add your override
};
```

---

## File Locations & Responsibilities

### Required Files (Minimum)

| File | Purpose | Required? |
|------|---------|-----------|
| `worker/src/services/nodes/node-library.ts` | Node schema definition | ✅ **REQUIRED** |
| `worker/src/api/execute-workflow.ts` | Execution logic | ✅ **REQUIRED** |

### Optional Files (Advanced)

| File | Purpose | When to Use |
|------|---------|-------------|
| `worker/src/core/registry/overrides/your-node.ts` | Custom behavior override | Complex nodes only |
| `worker/src/core/registry/unified-node-registry-overrides.ts` | Override registration | If using overrides |
| `worker/src/shared/your-node-executor.ts` | Shared executor logic | Reusable across nodes |

### Auto-Generated/Handled Files

These are **automatically handled** by the system:
- ✅ `worker/src/core/registry/unified-node-registry.ts` - Auto-registers from node-library
- ✅ `worker/src/core/execution/dynamic-node-executor.ts` - Uses registry automatically
- ✅ Template resolution - Automatic for all nodes
- ✅ Validation - Automatic from schema
- ✅ AI workflow generation - Automatic from schema

---

## Schema Structure

### Complete NodeSchema Interface

```typescript
interface NodeSchema {
  // ✅ CORE IDENTITY
  type: string;                    // Canonical type (e.g., 'slack_message')
  label: string;                   // Human-readable name
  category: string;                // 'trigger' | 'data' | 'ai' | 'communication' | 'logic' | 'transformation' | 'utility'
  description: string;             // What the node does
  
  // ✅ INPUT SCHEMA
  configSchema: {
    required: string[];             // Required field names
    optional: Record<string, ConfigField>;  // Optional fields with definitions
  };
  
  // ✅ AI GENERATION SUPPORT
  aiSelectionCriteria: {
    whenToUse: string[];           // When AI should select this node
    whenNotToUse: string[];        // When NOT to use
    keywords: string[];             // Search keywords
    useCases: string[];             // Common use cases
  };
  
  // ✅ PATTERNS & EXAMPLES
  commonPatterns: Array<{
    name: string;
    description: string;
    config: Record<string, any>;   // Example configuration
  }>;
  
  // ✅ VALIDATION
  validationRules: Array<{
    field: string;
    validator: (value: any) => boolean | string;  // Return true if valid, or error message
    errorMessage: string;
  }>;
  
  // ✅ OUTPUT DEFINITION
  outputType?: string;             // 'string' | 'number' | 'boolean' | 'array' | 'object'
  outputSchema?: Record<string, any>;  // JSON schema for output
  
  // ✅ METADATA
  schemaVersion?: string;          // Version for migrations (e.g., '1.0.0')
  capabilities?: string[];          // Capability tags (e.g., ['email.send'])
  providers?: string[];            // Provider names (e.g., ['slack', 'google'])
  keywords?: string[];             // Additional keywords
  nodeCapability?: NodeCapability;  // Data type capabilities
}
```

### ConfigField Structure

```typescript
interface ConfigField {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'expression';
  description: string;
  default?: any;                   // Default value
  examples?: any[];                 // Example values
  validation?: (value: any) => boolean | string;  // Custom validator
  options?: Array<{ label: string; value: string }>;  // For select/radio UI
  requiredIf?: { field: string; equals: any };  // Conditional requirement
}
```

---

## Execution Patterns

### Pattern 1: Standard Execution (Most Common)

**Use when**: Node has straightforward execution logic

```typescript
// In execute-workflow.ts
case 'your_node_type': {
  const result = await doSomething(config);
  return result;
}
```

### Pattern 2: Credential-Based Execution

**Use when**: Node requires OAuth/API credentials

```typescript
case 'your_node_type': {
  // Get credentials
  const { data: credential } = await supabase
    .from('credentials')
    .select('*')
    .eq('workflow_id', workflowId)
    .eq('node_id', node.id)
    .eq('provider', 'your_provider')
    .single();

  if (!credential) {
    return { success: false, error: 'Credentials not found' };
  }

  // Use credential to call API
  const result = await callExternalAPI(credential, config);
  return result;
}
```

### Pattern 3: Database Operations

**Use when**: Node interacts with databases

```typescript
case 'your_database_node': {
  const { executeDatabaseNode } = await import('../services/database/database-node-handler');
  return await executeDatabaseNode(type, {
    nodeId: node.id,
    config,
    supabase,
    // ... other context
  });
}
```

### Pattern 4: Template Resolution

**Templates are automatically resolved**, but you can access resolved values:

```typescript
// Templates like {{$json.field}} are already resolved in config
// Just use config.field directly
const value = config.field;  // Already resolved!
```

---

## Advanced: Custom Overrides

### When to Create an Override

Create an override file (`worker/src/core/registry/overrides/your-node.ts`) when:

1. **Complex Template Resolution**: Need special handling for templates
2. **Multi-Step Operations**: Node performs multiple API calls
3. **Branching Logic**: Node has multiple output ports (e.g., if_else)
4. **Custom Input Processing**: Need to transform inputs before execution
5. **Special Output Formatting**: Need to format output differently

### Override Structure

```typescript
import type { UnifiedNodeDefinition, NodeExecutionContext, NodeExecutionResult } from '../../types/unified-node-contract';
import type { NodeSchema } from '../../../services/nodes/node-library';
import { executeViaLegacyExecutor } from '../unified-node-registry-legacy-adapter';

export function overrideYourNode(def: UnifiedNodeDefinition, schema: NodeSchema): UnifiedNodeDefinition {
  return {
    ...def,
    
    // ✅ Modify input schema
    inputSchema: {
      ...def.inputSchema,
      // Add or modify fields
    },
    
    // ✅ Modify output schema
    outputSchema: {
      ...def.outputSchema,
      // Add or modify output ports
    },
    
    // ✅ Custom execution
    execute: async (context: NodeExecutionContext): Promise<NodeExecutionResult> => {
      // Custom logic here
      // Or delegate: return await executeViaLegacyExecutor({ context, schema });
    },
    
    // ✅ Add tags
    tags: [...(def.tags || []), 'custom-tag'],
    
    // ✅ Modify outgoing ports (for branching)
    outgoingPorts: ['default', 'success', 'error'],
    isBranching: true,
  };
}
```

### Example: Gmail Override (Complex)

See: `worker/src/core/registry/overrides/google-gmail.ts`

This override:
- Handles recipient resolution
- Processes templates in subject/body
- Manages multiple recipients
- Formats output with success/failure counts

---

## Testing Checklist

### ✅ Basic Functionality

- [ ] Node appears in node library
- [ ] Node can be added to workflow
- [ ] Node executes without errors
- [ ] Node returns correct output format

### ✅ Template Resolution

- [ ] Templates like `{{$json.field}}` resolve correctly
- [ ] Templates like `{{input.field}}` resolve correctly
- [ ] Templates in nested fields work
- [ ] Array templates work (if applicable)

### ✅ Validation

- [ ] Required fields are validated
- [ ] Field type validation works
- [ ] Custom validation rules work
- [ ] Error messages are clear

### ✅ Credentials (if applicable)

- [ ] Credential detection works
- [ ] Missing credentials show helpful error
- [ ] Credential resolution works

### ✅ AI Generation

- [ ] AI can select node from prompts
- [ ] AI generates correct config
- [ ] Common patterns are recognized

### ✅ Edge Cases

- [ ] Empty/null inputs handled
- [ ] Invalid config handled gracefully
- [ ] API errors handled (if external API)
- [ ] Timeout handling (if applicable)

---

## Common Patterns & Examples

### Pattern 1: HTTP API Integration

```typescript
// Schema
{
  type: 'http_request',
  configSchema: {
    required: ['url', 'method'],
    optional: {
      url: { type: 'string' },
      method: { type: 'string', default: 'GET' },
      headers: { type: 'object' },
      body: { type: 'object' },
    },
  },
}

// Execution
case 'http_request': {
  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: JSON.stringify(config.body),
  });
  return await response.json();
}
```

### Pattern 2: Database Query

```typescript
// Schema
{
  type: 'database_query',
  configSchema: {
    required: ['query'],
    optional: {
      query: { type: 'string' },
      database: { type: 'string' },
    },
  },
}

// Execution
case 'database_query': {
  const { executeDatabaseNode } = await import('../services/database/database-node-handler');
  return await executeDatabaseNode('postgres', { config, ... });
}
```

### Pattern 3: Conditional Branching

```typescript
// Schema
{
  type: 'if_else',
  // ... schema ...
}

// Override (required for branching)
export function overrideIfElse(def: UnifiedNodeDefinition, schema: NodeSchema) {
  return {
    ...def,
    outgoingPorts: ['default', 'true', 'false'],
    isBranching: true,
    execute: async (context) => {
      const condition = evaluateCondition(context.config.conditions);
      return {
        success: true,
        output: condition,
        branch: condition ? 'true' : 'false',  // ✅ Branch selection
      };
    },
  };
}
```

### Pattern 4: Array Processing

```typescript
// Schema
{
  type: 'process_array',
  configSchema: {
    required: ['operation'],
    optional: {
      operation: { type: 'string' },  // 'map', 'filter', 'reduce'
      function: { type: 'expression' },
    },
  },
  nodeCapability: {
    inputType: ['array', 'object'],
    outputType: 'array',
    acceptsArray: true,
    producesArray: true,
  },
}

// Execution
case 'process_array': {
  const inputArray = Array.isArray(inputObj) ? inputObj : [inputObj];
  const result = inputArray.map(item => processItem(item, config.function));
  return result;
}
```

---

## Summary: Quick Reference

### Minimum Steps to Add a Node

1. ✅ Add schema method in `node-library.ts`
2. ✅ Call `this.registerSchema()` in `initializeSchemas()`
3. ✅ Add execution case in `execute-workflow.ts`
4. ✅ Test the node

### Files to Modify

| File | What to Add |
|------|-------------|
| `node-library.ts` | `createYourNodeSchema()` method + registration |
| `execute-workflow.ts` | `case 'your_node_type':` in `executeNodeLegacy()` |
| `overrides/your-node.ts` | (Optional) Custom override function |
| `unified-node-registry-overrides.ts` | (Optional) Override registration |

### Key Principles

1. **Single Source of Truth**: All behavior in `node-library.ts` → `UnifiedNodeRegistry`
2. **No Hardcoded Logic**: Never add `if (node.type === ...)` outside registry
3. **Template Resolution**: Automatic for all nodes
4. **Validation**: Automatic from schema
5. **AI Generation**: Automatic from `aiSelectionCriteria`

---

## Need Help?

- **Schema Examples**: See `node-library.ts` for 100+ examples
- **Override Examples**: See `worker/src/core/registry/overrides/` directory
- **Execution Examples**: See `execute-workflow.ts` for all node types
- **Architecture Rules**: See `.cursor/rules/permanent-core-architecture.mdc`

---

**Remember**: The system is designed to automatically handle most complexity. Start simple, add overrides only when needed!
