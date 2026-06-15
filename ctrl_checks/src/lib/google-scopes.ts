export const GOOGLE_IDENTITY_SCOPES = [
  'openid',
  'email',
  'profile',
].join(' ');

export const INTEGRATION_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/bigquery',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/contacts',
].join(' ');

export const GOOGLE_CONNECTOR_SCOPES = `${GOOGLE_IDENTITY_SCOPES} ${INTEGRATION_SCOPES}`;
