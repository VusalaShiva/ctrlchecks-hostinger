# How to Create Your First Airtable Base

## You're Logged In! ✅

I can see you're logged in as: **VUSALA SHIVA KUMAR** (vusalashivakumar@gmail.com)

Since you don't see any bases, let's create your first one!

## Step-by-Step: Create Your First Base

### Method 1: From Airtable Home Page

1. **Go to Airtable Home**: https://airtable.com
   - You should see a welcome screen or empty workspace

2. **Look for one of these buttons**:
   - **"Add a base"** button (usually top-right or center)
   - **"Create a base"** button
   - **"New base"** button
   - **"+"** icon/button
   - **"Start from scratch"** option

3. **Click the button** to create a new base

4. **Choose an option**:
   - **"Start from scratch"** ← **RECOMMENDED for testing**
   - OR select a template (like "Content Calendar", "Project Tracker", etc.)

5. **Name your base**:
   - Enter a name like: **"Test Base"** or **"My First Base"**
   - Click "Create" or "Continue"

6. **Your base will open!** 🎉

### Method 2: From the Menu

1. **Click your profile icon** (top-right corner)
2. **Look for**:
   - "Create base" option
   - "New base" option
   - Or go back to home and use Method 1

### Method 3: Direct URL

1. **Go to**: https://airtable.com/create
2. **Follow the prompts** to create a base

## After Creating Your Base

### Step 1: Get Your Base ID

Once your base opens, look at the URL in your browser:

```
https://airtable.com/appXXXXXXXXXXXXX/...
```

The part after `/app` is your **Base ID**:
- Example: If URL is `https://airtable.com/app1234567890/...`
- Your Base ID is: `app1234567890`

**Copy this Base ID** - you'll need it for your workflow!

### Step 2: Check Your Table Name

1. Look at the **tabs at the top** of your base
2. Default name is usually: **"Table 1"**
3. **Note the exact name** (case-sensitive, including spaces)

### Step 3: Check Your Fields

1. Look at the **column headers** (top row)
2. Default field is usually: **"Name"**
3. You should see at least one column

## What You Should See

After creating a base, you should see:

```
┌─────────────────────────────────┐
│  Table 1                        │  ← Tab name (your table)
├─────────────────────────────────┤
│  Name                           │  ← Column header (your field)
├─────────────────────────────────┤
│  (empty rows)                   │  ← Empty is OK!
└─────────────────────────────────┘
```

## Quick Setup for Testing

### Minimal Setup (Recommended):

1. **Create base** → Name: "Test Base"
2. **Keep default table** → "Table 1"
3. **Keep default field** → "Name"
4. **That's it!** You're ready to test

### Optional: Add More Fields

If you want to test with more fields:

1. **Click the "+" button** next to column headers
2. **Add a field**:
   - Name: "Notes"
   - Type: "Long text"
3. **Click "Create field"**

## Update Your Workflow

Once you have your new base:

### 1. Update Base ID

In your workflow config, replace:
```json
{
  "baseId": "appLkNDICXNqxSDhG"  ← OLD (no access)
}
```

With your new Base ID:
```json
{
  "baseId": "appYOUR_NEW_BASE_ID"  ← NEW (your base)
}
```

### 2. Update API Token

Make sure your API token has access to the new base:

1. **Go to**: https://airtable.com/create/tokens
2. **Edit your existing token** (or create a new one)
3. **Under "Access"**, select your new base
4. **Scopes needed**:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
5. **Save the token**

### 3. Verify Table Name

- Default is usually **"Table 1"**
- Make sure it matches in your workflow config

## Complete Example

After creating your base:

1. **Base ID**: `appNEW1234567890` (from URL)
2. **Table Name**: `Table 1` (from tab)
3. **Fields**: `Name` (default field)

Your workflow config should be:
```json
{
  "apiKey": "AIRTABLE_PAT_REPLACE_ME",
  "baseId": "appNEW1234567890",
  "table": "Table 1",
  "resource": "Record",
  "operation": "list"
}
```

## Troubleshooting

### Can't Find "Create Base" Button?

1. **Try refreshing** the page
2. **Check if you're on the home page**: https://airtable.com
3. **Look for**:
   - Large "Create" or "Get started" button
   - "+" icon in the top navigation
   - "Add base" in a sidebar

### Still Don't See Anything?

1. **Check your account status**:
   - Go to: https://airtable.com/account
   - Verify your account is active

2. **Try a different browser**:
   - Chrome, Firefox, Safari, or Edge

3. **Clear browser cache** and try again

### Base Created But Can't See It?

1. **Check different workspaces** (if you have multiple)
2. **Look in the sidebar** for your base
3. **Search for the base name** in Airtable

## Next Steps

Once you create your base:

1. ✅ **Copy the Base ID** from the URL
2. ✅ **Note the table name** (usually "Table 1")
3. ✅ **Update your API token** to include the new base
4. ✅ **Update your workflow** with the new Base ID
5. ✅ **Test your workflow** - should work now!

## Quick Test Workflow

After creating your base, use this simple test:

```json
{
  "operation": "list",
  "maxRecords": 5
}
```

This should return an empty array `[]` if your table is empty - that's perfectly fine! It means the connection works.

## Need Help?

If you're still having trouble:
1. **Take a screenshot** of what you see on https://airtable.com
2. **Describe** what buttons/options you see
3. **Check** if there are any error messages

Good luck! Once you create your first base, everything else will be much easier! 🚀
