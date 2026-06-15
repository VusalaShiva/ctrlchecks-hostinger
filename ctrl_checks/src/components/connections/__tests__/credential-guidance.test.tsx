import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { CredentialFormRenderer } from '../CredentialFormRenderer';
import { CredentialGuidePanel } from '../CredentialGuidePanel';
import type { CredentialTypeDefinition } from '@/lib/api/connections';

vi.mock('@/components/ui/select', () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-value={value}>{children}</div>
  ),
  SelectTrigger: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <button id={id} type="button">{children}</button>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}));

const mysqlType: CredentialTypeDefinition = {
  id: 'mysql_connection',
  provider: 'mysql',
  displayName: 'MySQL',
  authType: 'basic_auth',
  inputFields: [
    { name: 'host', label: 'Host', type: 'text', required: true, placeholder: 'localhost' },
    { name: 'port', label: 'Port', type: 'number', required: true, defaultValue: 3306 },
    { name: 'database', label: 'Database', type: 'text', required: true },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true, secret: true },
  ],
  guide: {
    summary: 'Use this guide to collect MySQL connection details.',
    prerequisites: ['Access to your MySQL server details.'],
    steps: ['Open your database provider.', 'Copy each connection value.', 'Save and test the connection.'],
    fieldGuides: {
      host: { label: 'Host', description: 'Server host.', whereToFind: 'Database host or endpoint.' },
      port: { label: 'Port', description: 'Server port.', whereToFind: 'Database port, usually 3306.', example: '3306' },
      database: { label: 'Database', description: 'Database name.', whereToFind: 'Database/schema name.' },
      username: { label: 'Username', description: 'Database user.', whereToFind: 'Database user settings.' },
      password: { label: 'Password', description: 'Database password.', whereToFind: 'Database user password.' },
    },
    securityNotes: ['Use a least-privilege database user.'],
  },
  form: { layout: 'stacked', submitLabel: 'Save Connection' },
  maskFields: ['password'],
};

const oauthType: CredentialTypeDefinition = {
  id: 'google_oauth2',
  provider: 'google',
  displayName: 'Google OAuth2',
  authType: 'oauth2',
  inputFields: [],
  guide: {
    summary: 'Connect Google with OAuth.',
    prerequisites: ['A Google account you can approve.'],
    steps: ['Click Connect Google.', 'Approve the requested scopes.'],
    fieldGuides: {},
    securityNotes: ['Review scopes before approving.'],
  },
  form: { layout: 'stacked', oauthButtonLabel: 'Connect Google' },
  maskFields: [],
};

describe('credential guidance components', () => {
  it('renders MySQL side guide content for every required field', () => {
    const html = renderToString(<CredentialGuidePanel credentialType={mysqlType} activeFieldName="host" />);

    expect(html).toContain('Credential Guide');
    for (const label of ['Host', 'Port', 'Database', 'Username', 'Password']) {
      expect(html).toContain(label);
    }
    expect(html).toContain('Database host or endpoint.');
  });

  it('renders field description and notes when provided', () => {
    const typeWithNotes: CredentialTypeDefinition = {
      ...mysqlType,
      guide: {
        ...mysqlType.guide!,
        fieldGuides: {
          ...mysqlType.guide!.fieldGuides,
          host: {
            label: 'Host',
            description: 'Hostname or IP of your database server.',
            whereToFind: 'Check your hosting provider connection details.',
            notes: ['Use the private IP when inside a VPC.', 'Do not include the port here.'],
          },
        },
      },
    };
    const html = renderToString(<CredentialGuidePanel credentialType={typeWithNotes} />);
    expect(html).toContain('Hostname or IP of your database server.');
    expect(html).toContain('Use the private IP when inside a VPC.');
    expect(html).toContain('Do not include the port here.');
  });

  it('renders Common Issues section when troubleshooting is provided', () => {
    const typeWithTroubleshooting: CredentialTypeDefinition = {
      ...mysqlType,
      guide: {
        ...mysqlType.guide!,
        troubleshooting: [
          'If you get ECONNREFUSED, check the host and port are correct.',
          'Ensure the database user has SELECT permission.',
        ],
      },
    };
    const html = renderToString(<CredentialGuidePanel credentialType={typeWithTroubleshooting} />);
    expect(html).toContain('Common Issues');
    expect(html).toContain('ECONNREFUSED');
    expect(html).toContain('SELECT permission');
  });

  it('renders URLs in step text as anchor tags', () => {
    const typeWithUrlStep: CredentialTypeDefinition = {
      ...mysqlType,
      guide: {
        ...mysqlType.guide!,
        steps: ['Go to https://platform.openai.com/api-keys and sign in.'],
      },
    };
    const html = renderToString(<CredentialGuidePanel credentialType={typeWithUrlStep} />);
    expect(html).toContain('href="https://platform.openai.com/api-keys"');
  });

  it('does not render Common Issues section when troubleshooting is absent', () => {
    const html = renderToString(<CredentialGuidePanel credentialType={mysqlType} />);
    expect(html).not.toContain('Common Issues');
  });

  it('renders OAuth-only guide content without requiring form fields', () => {
    const html = renderToString(<CredentialGuidePanel credentialType={oauthType} />);

    expect(html).toContain('Connect Google with OAuth.');
    expect(html).toContain('Click Connect Google.');
    expect(html).toContain('Review scopes before approving.');
  });

  it('renders textarea credential fields as textareas', () => {
    const firebaseType: CredentialTypeDefinition = {
      ...mysqlType,
      id: 'firebase_credentials',
      provider: 'firebase',
      displayName: 'Firebase / Firestore',
      authType: 'api_key',
      inputFields: [
        {
          name: 'serviceAccountJson',
          label: 'Service Account JSON',
          type: 'textarea',
          required: false,
          secret: true,
        },
      ],
      guide: {
        ...mysqlType.guide!,
        fieldGuides: {
          serviceAccountJson: {
            label: 'Service Account JSON',
            description: 'Service account JSON.',
            whereToFind: 'Firebase service account settings.',
          },
        },
      },
    };

    const html = renderToString(
      <CredentialFormRenderer credentialType={firebaseType} onSubmit={async () => {}} />,
    );

    expect(html).toContain('<textarea');
    expect(html).toContain('Service Account JSON');
  });
});
