import type { DocsSearchIndexItem } from '../search-index';

export const schedulewiseSearchIndex = [
  {
    "type": "node",
    "title": "ScheduleWise",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise",
    "text": "ScheduleWise ScheduleWise appointment scheduling — retrieve, create, update, and delete appointments via the ScheduleWise REST API Use this node when a workflow needs schedulewise behavior with schema-driven inputs from the CtrlChecks node registry. Triggers"
  },
  {
    "type": "operation",
    "title": "ScheduleWise: Configure",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Configure with the ScheduleWise node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "ScheduleWise: Operation",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Operation operation operation field"
  },
  {
    "type": "field",
    "title": "ScheduleWise: Credential Id",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Credential Id credentialId Credential ID reference to stored ScheduleWise credentials"
  },
  {
    "type": "field",
    "title": "ScheduleWise: Date From",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Date From dateFrom Start date filter for getSchedules (ISO 8601, e.g. \"2024-01-01\"). Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Date To",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Date To dateTo End date filter for getSchedules (ISO 8601). Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Patient Id",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Patient Id patientId Patient identifier. Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Staff Id",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Staff Id staffId Staff member identifier. Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Appointment Id",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Appointment Id appointmentId Appointment identifier (required for updateAppointment and deleteAppointment). Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Start Date Time",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Start Date Time startDateTime Appointment start date/time (ISO 8601). Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: End Date Time",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure End Date Time endDateTime Appointment end date/time (ISO 8601). Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Service Type",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Service Type serviceType Type of service for the appointment. Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Notes",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Notes notes Additional notes for the appointment. Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Status",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Status status Appointment status (for updateAppointment). Supports {{ }} expressions."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Limit",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Limit limit Maximum number of results to return for getSchedules."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Hard Delete",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Hard Delete hardDelete When true, permanently deletes the appointment (appends ?hardDelete=true). Default is soft delete."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Timeout Sec",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Timeout Sec timeoutSec HTTP request timeout in seconds. Default: 30."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Retries",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Retries retries Number of retry attempts on 5xx or network errors (exponential backoff). Default: 0."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Output Format",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Output Format outputFormat Output format: \"json\" (default) or \"raw\" (unparsed response body)."
  },
  {
    "type": "field",
    "title": "ScheduleWise: Mock Mode",
    "slug": "schedulewise",
    "category": "Triggers",
    "href": "/docs/nodes/schedulewise#operation-configure",
    "text": "ScheduleWise Configuration Configure Mock Mode mockMode When true, returns synthetic data without calling the ScheduleWise API. Useful for testing."
  }
] satisfies DocsSearchIndexItem[];
