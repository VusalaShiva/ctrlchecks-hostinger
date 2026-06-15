export interface EmailTemplate {
  subject: string;
  html: string;
}

export type TemplateId = 'execution_completed' | 'execution_failed' | 'welcome';

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function frontendUrl(): string {
  return process.env.FRONTEND_URL?.trim() || 'https://app.ctrlchecks.ai';
}

export function renderTemplate(
  templateId: TemplateId,
  data: Record<string, string>,
): EmailTemplate {
  switch (templateId) {
    case 'execution_completed': {
      const name = esc(data.workflowName ?? '');
      const execId = esc(data.executionId ?? '');
      return {
        subject: `✅ Workflow "${name}" completed`,
        html: `
          <h2>Workflow completed successfully</h2>
          <p><strong>Workflow:</strong> ${name}</p>
          <p><strong>Execution ID:</strong> ${execId}</p>
          <p><a href="${frontendUrl()}">View results in CtrlChecks →</a></p>
        `.trim(),
      };
    }
    case 'execution_failed': {
      const name = esc(data.workflowName ?? '');
      const err = esc((data.error ?? '').slice(0, 500));
      return {
        subject: `❌ Workflow "${name}" failed`,
        html: `
          <h2>Workflow execution failed</h2>
          <p><strong>Workflow:</strong> ${name}</p>
          <p><strong>Error:</strong> ${err}</p>
          <p><a href="${frontendUrl()}">Investigate in CtrlChecks →</a></p>
        `.trim(),
      };
    }
    case 'welcome': {
      const name = esc(data.name ?? '');
      return {
        subject: 'Welcome to CtrlChecks!',
        html: `
          <h2>Welcome, ${name}!</h2>
          <p>You can start building AI-powered workflows right away.</p>
          <p><a href="${frontendUrl()}">Open CtrlChecks →</a></p>
        `.trim(),
      };
    }
  }
}

/** Returns true for templates that require EXECUTION_EMAIL_NOTIFICATIONS=true. */
export function requiresNotificationsFlag(templateId: TemplateId): boolean {
  return templateId === 'execution_completed' || templateId === 'execution_failed';
}
