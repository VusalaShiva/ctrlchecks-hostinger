# Google Calendar Test Workflows

This directory contains test workflows for the Google Calendar node. These workflows help verify that the Google Calendar integration is working correctly.

## Prerequisites

1. **Google OAuth Connection**: Make sure you have connected your Google account in Settings → Connections
2. **Calendar Scope**: The OAuth connection should include the Calendar scope (automatically included)

## Test Workflows

### 1. `google_calendar_list_events_test.json`
**Purpose**: List upcoming events from your primary calendar

**What it tests**:
- List events operation
- Pagination
- Event filtering

**How to use**:
- Import the workflow
- Run it manually
- Check the log output to see how many events were found

**Expected result**: Returns a list of events from your primary calendar

---

### 2. `google_calendar_create_event_test.json`
**Purpose**: Create a new event with attendees and reminders

**What it tests**:
- Create event operation
- Event with attendees
- Custom reminders
- Event description and location

**How to use**:
- Import the workflow
- **Optional**: Update the `attendees` email in the config to a real email address
- Update the `start` and `end` dates to future dates
- Run the workflow
- Check your Google Calendar to see the created event

**Expected result**: A new event is created in your primary calendar

---

### 3. `google_calendar_quick_add_test.json`
**Purpose**: Create an event using natural language (Quick Add)

**What it tests**:
- Quick Add operation
- Natural language parsing

**How to use**:
- Import the workflow
- Modify the `text` field to test different natural language inputs
- Examples:
  - "Lunch with team tomorrow at 12pm"
  - "Meeting on March 20 at 2pm"
  - "Dentist appointment next Friday at 3pm"
- Run the workflow

**Expected result**: Google Calendar parses the text and creates an event

---

### 4. `google_calendar_list_calendars_test.json`
**Purpose**: List all calendars you have access to

**What it tests**:
- List calendars operation
- Calendar list access

**How to use**:
- Import the workflow
- Run it
- Check the log output to see all your calendars

**Expected result**: Returns a list of all calendars (primary + secondary calendars)

---

### 5. `google_calendar_create_calendar_test.json`
**Purpose**: Create a new secondary calendar

**What it tests**:
- Create calendar operation
- Calendar creation

**How to use**:
- Import the workflow
- Optionally change the calendar name in the `summary` field
- Run the workflow
- Check your Google Calendar to see the new calendar

**Expected result**: A new secondary calendar is created

---

### 6. `google_calendar_get_event_test.json`
**Purpose**: Get a specific event by ID

**What it tests**:
- Get event operation
- Event retrieval by ID

**How to use**:
1. First, run `google_calendar_list_events_test.json` to get an event ID
2. Copy an event ID from the results
3. Import this workflow
4. Replace `REPLACE_WITH_ACTUAL_EVENT_ID` in the config with the actual event ID
5. Run the workflow

**Expected result**: Returns the full details of the specified event

---

### 7. `google_calendar_comprehensive_test.json`
**Purpose**: Complete end-to-end test of multiple operations

**What it tests**:
- List calendars
- Create event
- List events
- Multiple operations in sequence

**How to use**:
- Import the workflow
- Update the dates in the create event node to future dates
- Run the workflow
- Check each step's output

**Expected result**: All operations complete successfully

---

### 8. `google_calendar_recurring_event_test.json`
**Purpose**: Create a recurring event (weekly meeting)

**What it tests**:
- Create event with recurrence rules
- RRULE format
- Recurring event creation

**How to use**:
- Import the workflow
- Update the start date to a future Monday
- Optionally modify the recurrence rule (e.g., change COUNT or BYDAY)
- Run the workflow
- Check your calendar to see the recurring event series

**Expected result**: A recurring event is created with multiple instances

**Recurrence Examples**:
- `RRULE:FREQ=WEEKLY;COUNT=10;BYDAY=MO` - Every Monday for 10 weeks
- `RRULE:FREQ=DAILY;COUNT=5` - Every day for 5 days
- `RRULE:FREQ=MONTHLY;COUNT=6;BYMONTHDAY=1` - First of month for 6 months

---

### 9. `google_calendar_all_day_event_test.json`
**Purpose**: Create an all-day event

**What it tests**:
- All-day event creation
- Date format (vs dateTime)

**How to use**:
- Import the workflow
- Update the date to a future date
- Run the workflow
- Check your calendar to see the all-day event

**Expected result**: An all-day event is created (no specific time)

---

## Common Configuration Notes

### Date/Time Formats

**For timed events**:
```json
{
  "dateTime": "2025-03-15T10:00:00-07:00",
  "timeZone": "America/Los_Angeles"
}
```

**For all-day events**:
```json
{
  "date": "2025-03-15"
}
```

### Event Data Structure

The `eventData` field accepts a JSON object with:
```json
{
  "description": "Event description",
  "location": "Event location",
  "attendees": [
    { "email": "user@example.com" }
  ],
  "reminders": {
    "useDefault": true
  },
  "recurrence": [
    "RRULE:FREQ=WEEKLY;COUNT=10"
  ],
  "colorId": "1",
  "transparency": "opaque",
  "visibility": "default"
}
```

### Calendar ID

- Use `"primary"` for your primary calendar
- Use a calendar ID (from list calendars) for secondary calendars

---

## Troubleshooting

### Error: "OAuth token not found"
- **Solution**: Connect your Google account in Settings → Connections

### Error: "calendarId is required"
- **Solution**: Make sure you've set `calendarId` to `"primary"` or a valid calendar ID

### Error: "start and end are required"
- **Solution**: Make sure both `start` and `end` fields are provided in the correct format

### Events not appearing
- **Solution**: Check that dates are in the future and timezone is correct

---

## Next Steps

After testing these workflows, you can:
1. Create custom workflows combining Google Calendar with other nodes
2. Use template variables to make events dynamic
3. Integrate with triggers (webhook, schedule, form) for automated calendar management
4. Combine with other Google services (Gmail, Sheets) for complete workflows

---

## Example: Dynamic Event Creation

You can use template variables to create dynamic events:

```json
{
  "summary": "Meeting with {{$json.name}}",
  "start": {
    "dateTime": "{{$json.meetingTime}}",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "{{$json.endTime}}",
    "timeZone": "UTC"
  },
  "eventData": {
    "description": "Meeting notes: {{$json.notes}}",
    "attendees": {{$json.attendees}}
  }
}
```

This allows you to create events based on data from previous nodes in your workflow.
