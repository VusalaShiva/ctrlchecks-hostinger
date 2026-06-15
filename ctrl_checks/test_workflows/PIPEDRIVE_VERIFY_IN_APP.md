# How to Verify Pipedrive Workflow Results in Pipedrive App

## 🎯 Overview

After running your workflow, you can verify the results directly in your Pipedrive account. This guide shows you where to find each resource type and how to verify the data matches your workflow outputs.

## 🔗 Access Your Pipedrive Account

1. **Go to**: [https://www.pipedrive.com](https://www.pipedrive.com)
2. **Log in** with your account credentials
3. You'll see your Pipedrive dashboard

## 📊 How to Verify Each Resource

### 1. ✅ Verify Pipelines

**From Your Workflow Output:**
- You got 2 pipelines: "Sales pipeline" (ID: 2) and "Onboarding pipeline" (ID: 3)

**In Pipedrive:**
1. Look at the **top navigation bar**
2. You'll see pipeline names as **tabs** (e.g., "Sales pipeline", "Onboarding pipeline")
3. Click on each pipeline to see its deals
4. **Verify**: The pipeline names match what you saw in the workflow output

**Alternative Method:**
- Go to **Settings** (gear icon) → **Pipelines**
- You'll see all pipelines listed with their IDs

---

### 2. ✅ Verify Deals

**From Your Workflow Output:**
- You got 1 deal: "[Sample] Tony Turner IT Infrastructure Security Deal" (ID: 1)
- Value: ₹30,000 (INR)
- Status: open
- Organization: "[Sample] MoveEr Tech Group"
- Person: "[Sample] Tony Turner"

**In Pipedrive:**
1. Click on **"Sales pipeline"** (or the pipeline where the deal is)
2. You'll see a **list of deals** in that pipeline
3. **Find the deal** by title: "[Sample] Tony Turner IT Infrastructure Security Deal"
4. **Click on the deal** to see full details
5. **Verify**:
   - Deal title matches
   - Value shows ₹30,000
   - Organization shows "[Sample] MoveEr Tech Group"
   - Person shows "[Sample] Tony Turner"
   - Status is "Open"

**Quick Search:**
- Use the **search bar** at the top
- Type: "Tony Turner" or "Infrastructure Security"
- The deal should appear in search results

---

### 3. ✅ Verify Persons (Contacts)

**From Your Workflow Output:**
- You got 2 persons:
  - "[Sample] Benjamin Leon" (ID: 1)
  - "[Sample] Tony Turner" (ID: 2)

**In Pipedrive:**
1. Click on **"Persons"** in the left sidebar (or top navigation)
2. You'll see a **list of all contacts**
3. **Find the persons**:
   - "[Sample] Benjamin Leon"
   - "[Sample] Tony Turner"
4. **Click on each person** to see full details
5. **Verify**:
   - Names match
   - Email addresses match (e.g., "tony.turner@moveer.com")
   - Phone numbers match
   - Organization associations match

**Quick Access:**
- Use the **search bar** → Type person name
- Or go to **Persons** → Filter by organization

---

### 4. ✅ Verify Organizations

**From Your Workflow Output:**
- You got 2 organizations:
  - "[Sample] MoveEr Tech Group" (ID: 1)
  - "[Sample] Leon Digital Systems" (ID: 2)

**In Pipedrive:**
1. Click on **"Organizations"** in the left sidebar
2. You'll see a **list of all organizations**
3. **Find the organizations**:
   - "[Sample] MoveEr Tech Group"
   - "[Sample] Leon Digital Systems"
4. **Click on each organization** to see full details
5. **Verify**:
   - Organization names match
   - Associated persons are listed
   - Deal counts match

**Quick Access:**
- Use the **search bar** → Type organization name
- Or go to **Organizations** → View all

---

### 5. ✅ Verify Activities

**From Your Workflow Output:**
- You got 2 activities:
  - "[Sample] Collaboration Platform Needs Discussion" (ID: 1) - Type: Call
  - "[[Sample] Infrastructure Security Planning Session" (ID: 2) - Type: Meeting

**In Pipedrive:**
1. Click on **"Activities"** in the left sidebar
2. You'll see a **calendar/list view** of activities
3. **Find the activities** by subject:
   - "[Sample] Collaboration Platform Needs Discussion"
   - "[[Sample] Infrastructure Security Planning Session"
4. **Click on each activity** to see details
5. **Verify**:
   - Subject matches
   - Type matches (Call/Meeting)
   - Due dates match
   - Associated person/organization matches

**Alternative Views:**
- **Calendar view**: See activities on specific dates
- **List view**: See all activities in a list
- **Filter**: Filter by type, person, organization, or date

---

### 6. ✅ Verify Notes

**From Your Workflow Output:**
- You got 1 note (ID: 1)
- Content: "[Sample] Assessing secure infrastructure solutions..."
- Associated with Deal: "[Sample] Tony Turner IT Infrastructure Security Deal"

**In Pipedrive:**
1. **Go to the deal**: "[Sample] Tony Turner IT Infrastructure Security Deal"
2. Scroll down to the **"Notes"** section
3. You'll see the note: "[Sample] Assessing secure infrastructure solutions..."
4. **Verify**:
   - Note content matches
   - Note is associated with the correct deal
   - Created date matches

**Alternative Method:**
- Go to **Activities** → Some notes may appear there
- Or go to the **Person/Organization** page → Check notes section

---

### 7. ✅ Verify Products

**From Your Workflow Output:**
- You got 0 products (empty array)

**In Pipedrive:**
1. Click on **"Products"** in the left sidebar
2. You'll see a **list of products** (if any exist)
3. **Verify**: If the list is empty, it matches your workflow output

**Note**: If you want to test products, you can create one using the workflow!

---

### 8. ✅ Verify Stages

**From Your Workflow Output:**
- You got 14 stages across 2 pipelines:
  - Sales pipeline stages: Qualified, Demo Scheduled, Demo Completed, Proposal Made, Negotiations, Contract Signed
  - Onboarding pipeline stages: Deal Won, Intro Booked, Intro Call Completed, Tech Discovery, Configuration, Training, Go-Live, Feedback

**In Pipedrive:**
1. Click on **"Sales pipeline"** tab
2. Look at the **column headers** - these are the stages
3. You'll see: Qualified, Demo Scheduled, Demo Completed, Proposal Made, Negotiations, Contract Signed
4. Click on **"Onboarding pipeline"** tab
5. You'll see: Deal Won, Intro Booked, Intro Call Completed, Tech Discovery, Configuration, Training, Go-Live, Feedback
6. **Verify**: Stage names match your workflow output

**Alternative Method:**
- Go to **Settings** → **Pipelines** → Click on a pipeline → See stages

---

### 9. ✅ Verify Search Results

**From Your Workflow Output:**
- You searched for "Sample" in deals
- Found 1 deal: "[Sample] Tony Turner IT Infrastructure Security Deal"

**In Pipedrive:**
1. Use the **search bar** at the top of Pipedrive
2. Type: **"Sample"**
3. Select **"Deals"** from the dropdown
4. You should see deals containing "Sample"
5. **Verify**: The deal "[Sample] Tony Turner IT Infrastructure Security Deal" appears

**Search Tips:**
- Search works across deals, persons, organizations
- Results show relevance score (like in your workflow output)

---

### 10. ✅ Verify Webhooks

**From Your Workflow Output:**
- You got 0 webhooks (empty array)

**In Pipedrive:**
1. Go to **Settings** (gear icon) → **Integrations** → **Webhooks**
2. You'll see a list of webhooks (if any exist)
3. **Verify**: If the list is empty, it matches your workflow output

**Note**: Webhooks are typically set up for automation, so you may not have any yet.

---

## 🔍 Quick Verification Checklist

After running your workflow, verify these in Pipedrive:

- [ ] **Pipelines**: Check pipeline names match (Sales pipeline, Onboarding pipeline)
- [ ] **Deals**: Find the deal by title, verify value, organization, person
- [ ] **Persons**: Find persons by name, verify email, phone, organization
- [ ] **Organizations**: Find organizations by name, verify associated persons
- [ ] **Activities**: Find activities by subject, verify type, date, associations
- [ ] **Notes**: Find notes on deals/persons, verify content
- [ ] **Stages**: Check pipeline columns match stage names
- [ ] **Search**: Use Pipedrive search to verify search results match

## 📱 Mobile App Verification

You can also verify on the **Pipedrive mobile app**:

1. **Download** Pipedrive app (iOS/Android)
2. **Log in** with the same account
3. **Navigate** to the same sections**:
   - Deals → Find your deal
   - Persons → Find your contacts
   - Organizations → Find your companies
   - Activities → Find your activities

## 🎯 Real-Time Verification

**Best Practice**: Run your workflow and immediately check Pipedrive to see:
- **New records** created (if using create operations)
- **Updated records** (if using update operations)
- **Data matches** between workflow output and Pipedrive UI

## 🔗 Direct Links to Resources

Once logged into Pipedrive, you can access:

- **Deals**: `https://yourcompany.pipedrive.com/deals`
- **Persons**: `https://yourcompany.pipedrive.com/persons`
- **Organizations**: `https://yourcompany.pipedrive.com/organizations`
- **Activities**: `https://yourcompany.pipedrive.com/activities`
- **Products**: `https://yourcompany.pipedrive.com/products`
- **Settings**: `https://yourcompany.pipedrive.com/settings`

(Replace `yourcompany` with your Pipedrive company subdomain)

## 💡 Pro Tips

1. **Use Search**: Pipedrive's search is powerful - use it to quickly find records
2. **Check IDs**: The IDs in your workflow output match the IDs in Pipedrive
3. **Verify Timestamps**: Check `add_time` and `update_time` match
4. **Check Associations**: Verify person-organization-deal relationships
5. **Filter Views**: Use filters in Pipedrive to match your workflow filters

## ✅ Success Indicators

If everything matches:
- ✅ **Workflow output** shows the same data as **Pipedrive UI**
- ✅ **Record IDs** match between workflow and Pipedrive
- ✅ **Field values** (names, emails, values) match
- ✅ **Relationships** (person-org-deal) are correct
- ✅ **Timestamps** are consistent

**Your Pipedrive node is working perfectly!** 🎉

## 🐛 Troubleshooting

### If data doesn't match:

1. **Check API Token**: Make sure you're using the correct token for your account
2. **Check Permissions**: Your API token needs access to the data
3. **Check Filters**: Workflow filters might exclude some records
4. **Check Timing**: Data might have been updated between workflow run and verification
5. **Check Account**: Make sure you're logged into the correct Pipedrive account

---

**Your comprehensive test workflow successfully retrieved data from all resources!** All operations are working correctly. 🚀
