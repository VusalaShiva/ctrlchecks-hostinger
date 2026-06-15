# Quick Checklist: Adding a New Node

## ✅ Step-by-Step Checklist

### 1. Schema Definition (REQUIRED)

- [ ] **File**: `worker/src/services/nodes/node-library.ts`
- [ ] Create method: `private createYourNodeSchema(): NodeSchema`
- [ ] Define `type` (canonical name, lowercase with underscores)
- [ ] Define `label` (human-readable name)
- [ ] Define `category` (trigger/data/ai/communication/logic/transformation/utility)
- [ ] Define `description` (what the node does)
- [ ] Define `configSchema.required` (array of required field names)
- [ ] Define `configSchema.optional` (object with field definitions)
- [ ] Define `aiSelectionCriteria` (whenToUse, whenNotToUse, keywords, useCases)
- [ ] Define `commonPatterns` (example configurations)
- [ ] Define `validationRules` (field validators)
- [ ] Define `outputType` and `outputSchema` (what node produces)
- [ ] Add `schemaVersion` (e.g., '1.0.0')
- [ ] Add `keywords` and `providers` (for AI resolution)
- [ ] Call `this.registerSchema(this.createYourNodeSchema())` in `initializeSchemas()`

### 2. Execution Logic (REQUIRED)

- [ ] **File**: `worker/src/api/execute-workflow.ts`
- [ ] Add `case 'your_node_type':` in `executeNodeLegacy()` function
- [ ] Handle required fields validation
- [ ] Handle optional fields with defaults
- [ ] Handle credentials (if needed)
- [ ] Call external API/service (if needed)
- [ ] Return output matching `outputSchema`
- [ ] Handle errors gracefully
- [ ] Return `{ success: boolean, ...output }` format

### 3. Custom Override (OPTIONAL - Only if needed)

- [ ] **File**: `worker/src/core/registry/overrides/your-node-name.ts`
- [ ] Create override function: `export function overrideYourNode(...)`
- [ ] Modify `inputSchema` (if needed)
- [ ] Modify `outputSchema` (if needed)
- [ ] Add custom `execute` function (if needed)
- [ ] Add tags (if needed)
- [ ] Modify `outgoingPorts` (if branching node)
- [ ] Set `isBranching: true` (if multiple output ports)

- [ ] **File**: `worker/src/core/registry/unified-node-registry-overrides.ts`
- [ ] Import override function
- [ ] Add to `overridesByType` object

### 4. Testing

- [ ] Node appears in node library
- [ ] Node can be added to workflow
- [ ] Node executes successfully
- [ ] Templates resolve correctly (`{{$json.field}}`, `{{input.field}}`)
- [ ] Required fields validated
- [ ] Optional fields work with defaults
- [ ] Error handling works
- [ ] Output format matches schema
- [ ] AI can select node from prompts
- [ ] Credentials work (if applicable)

---

## 📝 Schema Template

```typescript
private createYourNodeSchema(): NodeSchema {
  return {
    type: 'your_node_type',           // ✅ Required: Canonical type
    label: 'Your Node Label',         // ✅ Required: Human-readable
    category: 'utility',               // ✅ Required: Category
    description: 'What this node does', // ✅ Required: Description
    
    configSchema: {
      required: ['field1'],            // ✅ Required fields
      optional: {
        field1: {                     // ✅ Field definition
          type: 'string',
          description: 'Field description',
          examples: ['example1', 'example2'],
        },
      },
    },
    
    aiSelectionCriteria: {             // ✅ AI generation support
      whenToUse: ['Use case 1'],
      whenNotToUse: ['Don\'t use case 1'],
      keywords: ['keyword1', 'keyword2'],
      useCases: ['Use case 1', 'Use case 2'],
    },
    
    commonPatterns: [                  // ✅ Example patterns
      {
        name: 'pattern_name',
        description: 'Pattern description',
        config: { field1: 'value' },
      },
    ],
    
    validationRules: [                 // ✅ Validation
      {
        field: 'field1',
        validator: (value) => typeof value === 'string',
        errorMessage: 'Field must be string',
      },
    ],
    
    outputType: 'object',              // ✅ Output type
    outputSchema: {                    // ✅ Output structure
      success: { type: 'boolean' },
      // ... other output fields
    },
    
    schemaVersion: '1.0.0',           // ✅ Version
    keywords: ['keyword1'],            // ✅ Keywords
    providers: ['provider1'],          // ✅ Providers (if applicable)
  };
}
```

---

## 🔧 Execution Template

```typescript
// In execute-workflow.ts, inside executeNodeLegacy():

case 'your_node_type': {
  try {
    // ✅ Get config (templates already resolved)
    const field1 = config.field1;
    const optionalField = config.optionalField || defaultValue;
    
    // ✅ Get credentials (if needed)
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
    
    // ✅ Execute node logic
    const result = await doSomething(field1, credential);
    
    // ✅ Return output matching outputSchema
    return {
      success: true,
      ...result,  // Match outputSchema structure
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Execution failed',
    };
  }
}
```

---

## 🎯 Common Node Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `trigger` | Workflow entry points | webhook, schedule, manual_trigger |
| `data` | Data operations | database_read, database_write, http_request |
| `ai` | AI/ML operations | ai_chat_model, ai_agent |
| `communication` | Messaging/notifications | google_gmail, slack_message |
| `logic` | Flow control | if_else, switch, javascript |
| `transformation` | Data transformation | map, filter, aggregate |
| `utility` | Utility functions | log_output, wait, set_variable |

---

## 🚨 Common Mistakes to Avoid

### ❌ DON'T:

1. **Hardcode node logic outside registry**
   ```typescript
   // ❌ WRONG - Don't do this
   if (node.type === 'your_node') {
     // logic here
   }
   ```

2. **Skip schema definition**
   ```typescript
   // ❌ WRONG - Node won't be registered
   // Missing: this.registerSchema(...)
   ```

3. **Forget template resolution**
   ```typescript
   // ❌ WRONG - Templates won't resolve
   const value = config.field;  // This is fine - templates auto-resolve!
   ```

4. **Return wrong output format**
   ```typescript
   // ❌ WRONG - Doesn't match outputSchema
   return { data: result };
   
   // ✅ CORRECT - Matches outputSchema
   return { success: true, ...result };
   ```

### ✅ DO:

1. **Define complete schema** - All fields, validation, AI criteria
2. **Use templates** - They auto-resolve: `{{$json.field}}`
3. **Match output schema** - Return what you defined in `outputSchema`
4. **Handle errors** - Always return `{ success: boolean, ... }`
5. **Test thoroughly** - Templates, validation, edge cases

---

## 📚 File Reference

| File | Purpose | Required? |
|------|---------|-----------|
| `node-library.ts` | Schema definition | ✅ **YES** |
| `execute-workflow.ts` | Execution logic | ✅ **YES** |
| `overrides/your-node.ts` | Custom behavior | ❌ Optional |
| `unified-node-registry-overrides.ts` | Override registration | ❌ Optional |

---

## 🎓 Learning Resources

- **Full Guide**: See `ADDING_NEW_NODES_GUIDE.md`
- **Schema Examples**: See `node-library.ts` (100+ examples)
- **Override Examples**: See `worker/src/core/registry/overrides/`
- **Execution Examples**: See `execute-workflow.ts`
- **Architecture**: See `.cursor/rules/permanent-core-architecture.mdc`

---

**Remember**: Start simple! Most nodes only need schema + execution. Add overrides only when you need special behavior.
