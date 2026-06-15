# How to View Pipedrive Node Outputs in ctrlchecks

## 📊 Where to See Your Results

After running a Pipedrive workflow, you can see the outputs in several places:

### 1. **Execution Logs (Node-by-Node)** ✅ (You're already here!)

This is the **main place** to see outputs. After running your workflow:

1. **Scroll down** in the execution results page
2. Look for **"Execution Logs (Node-by-Node)"** section
3. Click on each node to expand and see:
   - **📥 INPUT** - What data came into the node
   - **📤 OUTPUT** - What data the node produced
   - **Data Changes** - What fields were added/modified

### 2. **Node #2: List Pipelines** - Your Success! ✅

You can see your pipelines were successfully retrieved:

```json
{
  "data": [
    {
      "id": 2,
      "name": "Sales pipeline",
      "active": true,
      ...
    },
    {
      "id": 3,
      "name": "Onboarding pipeline",
      "active": true,
      ...
    }
  ],
  "success": true
}
```

**This means your Pipedrive connection is working!** 🎉

### 3. **Final Output** (Bottom of Page)

At the very bottom, you'll see:
```
Final Output
"Found  deals in Pipedrive"
```

This is from your `log_output` node showing the count.

## 🔍 Understanding the Output Structure

### Successful Pipedrive Response

When a Pipedrive operation succeeds, you get:

```json
{
  "data": [...],        // The actual data (array or object)
  "success": true,      // Indicates success
  "_trigger": "manual"   // Your workflow trigger
}
```

### For List Operations

The `data` field contains an **array** of items:
- **List Pipelines**: Array of pipeline objects
- **List Deals**: Array of deal objects
- **List Persons**: Array of person objects
- etc.

### For Get/Create/Update Operations

The `data` field contains a **single object**:
- **Get Deal**: Single deal object
- **Create Deal**: The newly created deal object
- **Update Deal**: The updated deal object

## 📝 Example: How to Access Data in Next Nodes

If you want to use the pipeline data in a subsequent node:

### Accessing Array Items

If `data` is an array (like from "List Pipelines"):

```javascript
// In a JavaScript node or template:
{{data[0].name}}           // First pipeline name: "Sales pipeline"
{{data[0].id}}            // First pipeline ID: 2
{{data.length}}            // Number of pipelines: 2
```

### Accessing Object Properties

If `data` is an object (like from "Get Deal"):

```javascript
{{data.title}}            // Deal title
{{data.value}}            // Deal value
{{data.id}}               // Deal ID
```

## 🐛 Current Issue: Error in Node #3

You're seeing an error in Node #3 (List Deals):
```
"template.includes is not a function"
```

**This is a bug I just fixed!** The issue was with how number fields (like `limit: 10`) were being processed.

**Solution**: I've updated the code to handle number values correctly. After you restart your server, this error should be gone.

## ✅ What's Working

1. ✅ **Node #1**: Manual trigger - Working
2. ✅ **Node #2**: List Pipelines - **SUCCESS!** You got 2 pipelines back
3. ❌ **Node #3**: List Deals - Error (will be fixed after restart)
4. ✅ **Node #4**: Log Output - Working (shows the error message)

## 🚀 Next Steps

1. **Restart your worker/server** to load the fix
2. **Run the workflow again**
3. **Check Node #3** - It should now successfully list deals
4. **View the outputs** in the Execution Logs section

## 📍 Quick Reference: Where to Look

| What You Want to See | Where to Look |
|---------------------|---------------|
| **Node outputs** | Execution Logs → Click on node → See 📤 OUTPUT |
| **Input data** | Execution Logs → Click on node → See 📥 INPUT |
| **Data flow** | Execution Logs → See arrows between nodes |
| **Final result** | Bottom of page → "Final Output" |
| **Errors** | Execution Logs → Look for `_error` field |

## 💡 Pro Tip

The **Execution Logs (Node-by-Node)** section is your best friend! It shows:
- ✅ What each node received
- ✅ What each node produced
- ✅ How data flows between nodes
- ✅ Any errors that occurred

**Just expand each node** to see its input and output data!
