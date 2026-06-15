import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

let _client: SESClient | null = null;

export function getSesClient(): SESClient {
  // Read env at call time so tests can override process.env without module reload.
  const region = process.env.SES_REGION?.trim() || process.env.AWS_REGION || 'us-east-1';
  if (!_client) {
    _client = new SESClient({ region });
  }
  return _client;
}

/** Reset cached SES client — for test isolation only. */
export function _resetSesClient(): void {
  _client = null;
}

export function getFromEmail(): string {
  return process.env.SES_FROM_EMAIL?.trim() || '';
}

export async function sendRaw(to: string, subject: string, html: string): Promise<void> {
  const fromEmail = getFromEmail();
  if (!fromEmail) {
    console.warn('[notification-service] SES_FROM_EMAIL not configured — skipping send');
    return;
  }
  const client = getSesClient();
  await client.send(
    new SendEmailCommand({
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: { Html: { Data: html, Charset: 'UTF-8' } },
      },
      Source: fromEmail,
    }),
  );
}
