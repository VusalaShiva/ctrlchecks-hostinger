/**
 * Generates batched PostgreSQL INSERTs for public.templates (500 by default).
 * Node types and linear DAG shape match existing seeds (27_insert_templates_directly.sql)
 * and worker unified-node-registry / node-type-pattern-registry coverage.
 *
 * Run from repo root:
 *   npx --yes tsx ctrl_checks/scripts/generate-workflow-templates-sql.ts
 *
 * Outputs: ctrl_checks/sql_migrations/templates_refresh/NN_seed_templates_batch_*.sql
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const TOTAL = 500;
const PER_FILE = 50;
const OUT_DIR = join(__dirname, '..', 'sql_migrations', 'templates_refresh');

const TRIGGERS = ['manual_trigger', 'schedule', 'webhook', 'form', 'interval'] as const;

/** Action / transform nodes rotating in templates (registry-backed types used in existing SQL). */
const MIDDLE_POOL = [
  'http_request',
  'google_sheets',
  'google_gmail',
  'google_drive',
  'google_calendar',
  'postgresql',
  'mysql',
  'mongodb',
  'airtable',
  'notion',
  'hubspot',
  'clickup',
  'slack_message',
  'telegram',
  'email',
  'outlook',
  'twitter',
  'linkedin',
  'ai_service',
  'ollama',
  'openai_gpt',
  'ai_agent',
  'ai_chat_model',
  'set_variable',
  'javascript',
  'json_parser',
  'csv',
  'filter',
  'text_formatter',
  'function',
] as const;

const VERTICALS = [
  'E-commerce',
  'Healthcare',
  'Finance & Accounting',
  'HR & People',
  'DevOps & SRE',
  'Marketing',
  'Customer Support',
  'Education',
  'Real Estate',
  'Legal Ops',
  'Manufacturing',
  'Nonprofit',
  'Media & Publishing',
  'Logistics',
  'Hospitality',
  'SaaS Product',
  'IT Service Desk',
  'Sales Ops',
  'Data Analytics',
  'Security & GRC',
  'Construction',
  'Agriculture',
  'Energy',
  'Telecom',
  'Gov & Public Sector',
];

const ACTIONS = [
  'Automate',
  'Sync',
  'Notify stakeholders about',
  'Archive',
  'Transform',
  'Validate',
  'Schedule',
  'Extract metrics from',
  'Monitor',
  'Route',
  'Enrich',
  'Deduplicate',
  'Score',
  'Tag and classify',
  'Summarize',
  'Back up',
  'Reconcile',
  'Publish',
  'Triage',
  'Aggregate',
  'Watermark',
  'Redact',
  'Parse',
  'Normalize',
  'Handshake',
];

const OBJECTS = [
  'new leads',
  'ticket updates',
  'CSV uploads',
  'form responses',
  'webhook payloads',
  'daily KPIs',
  'calendar holds',
  'inventory deltas',
  'invoice lines',
  'contract PDFs',
  'survey results',
  'experiment logs',
  'feature flags',
  'release notes',
  'on-call incidents',
  'vendor bills',
  'subscription renewals',
  'expense receipts',
  'candidate applications',
  'patient intake forms',
  'sensor readings',
  'shipment events',
  'social mentions',
  'help-center articles',
  'warehouse scans',
  'policy attestations',
  'loan applications',
  'grant submissions',
  'court filings',
  'asset depreciations',
  'course enrollments',
  'room bookings',
  'prescription refills',
  'IoT heartbeats',
  'API error bursts',
  'schema migrations',
  'backup manifests',
  'compliance exports',
  'security findings',
  'partner SLAs',
  'board packets',
  'NPS feedback',
];

const CATEGORY_FOR_VERTICAL: Record<string, string> = {
  'E-commerce': 'Commerce & Retail',
  Healthcare: 'Healthcare',
  'Finance & Accounting': 'Finance',
  'HR & People': 'HR',
  'DevOps & SRE': 'Developer Tools',
  Marketing: 'Marketing & Growth',
  'Customer Support': 'Support',
  Education: 'Education',
  'Real Estate': 'Real Estate',
  'Legal Ops': 'Legal',
  Manufacturing: 'Operations',
  Nonprofit: 'Nonprofit',
  'Media & Publishing': 'Media',
  Logistics: 'Logistics',
  Hospitality: 'Hospitality',
  'SaaS Product': 'Product',
  'IT Service Desk': 'IT',
  'Sales Ops': 'CRM & Sales',
  'Data Analytics': 'Data & BI',
  'Security & GRC': 'Security',
  Construction: 'Construction',
  Agriculture: 'Agriculture',
  Energy: 'Energy',
  Telecom: 'Telecom',
  'Gov & Public Sector': 'Public Sector',
};

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'] as const;

function titleForIndex(i: number): { title: string; vertical: string } {
  const vertical = VERTICALS[i % VERTICALS.length];
  // Coprime-style mixing so action/object vary across all 500 rows (not only after 625).
  const action = ACTIONS[(i * 11) % ACTIONS.length];
  const obj = OBJECTS[(i * 17) % OBJECTS.length];
  return { title: `${vertical}: ${action} ${obj}`, vertical };
}

function humanLabel(nodeType: string, step: number): string {
  return `${nodeType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} (${step})`;
}

function buildLinearGraph(globalIndex: number): {
  nodes: unknown[];
  edges: unknown[];
} {
  const trig = TRIGGERS[globalIndex % TRIGGERS.length];
  const a = MIDDLE_POOL[(globalIndex * 13) % MIDDLE_POOL.length];
  let b = MIDDLE_POOL[(globalIndex * 37) % MIDDLE_POOL.length];
  if (a === b) {
    b = MIDDLE_POOL[(MIDDLE_POOL.indexOf(b as (typeof MIDDLE_POOL)[number]) + 1) % MIDDLE_POOL.length];
  }

  const types = [trig, a, b, 'log_output'];
  const nodes = types.map((t, idx) => {
    const id = `n${idx + 1}`;
    const x = 100 + idx * 260;
    return {
      id,
      type: 'custom',
      position: { x, y: 200 },
      data: {
        type: t,
        label: humanLabel(t, idx + 1),
      },
    };
  });

  const edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `e${i + 1}`,
      source: `n${i + 1}`,
      target: `n${i + 2}`,
      sourceHandle: 'output',
      targetHandle: 'input',
    });
  }

  return { nodes, edges };
}

function escapeSqlLiteral(s: string): string {
  return s.replace(/'/g, "''");
}

function tagsFor(vertical: string, types: string[]): string {
  const base = CATEGORY_FOR_VERTICAL[vertical] ?? 'General';
  const extra = [...new Set(types)].slice(0, 6);
  const all = [base, ...extra.map((t) => t.replace(/_/g, '-'))];
  return all.map((t) => `'${escapeSqlLiteral(t)}'`).join(', ');
}

function descriptionFor(title: string, types: string[]): string {
  const chain = types.join(' → ');
  return `Starter workflow: ${title}. Linear flow (${chain}). Configure credentials and fields per node; extend in the canvas.`;
}

const CREATED_BY_SQL = `COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))`;

function insertStatement(globalIndex: number): string {
  const { title, vertical } = titleForIndex(globalIndex);
  const category = CATEGORY_FOR_VERTICAL[vertical] ?? 'General';
  const { nodes, edges } = buildLinearGraph(globalIndex);
  const types = (nodes as { data: { type: string } }[]).map((n) => n.data.type);
  const diff = DIFFICULTIES[globalIndex % 3];
  const est = 5 + (globalIndex % 25);
  const featured = globalIndex % 23 === 0;

  const nodesJson = JSON.stringify(nodes);
  const edgesJson = JSON.stringify(edges);
  const desc = descriptionFor(title, types);

  return `-- Template #${globalIndex + 1}
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  '${escapeSqlLiteral(title)}',
  '${escapeSqlLiteral(desc)}',
  '${escapeSqlLiteral(category)}',
  '${nodesJson.replace(/'/g, "''")}'::jsonb,
  '${edgesJson.replace(/'/g, "''")}'::jsonb,
  '${diff}',
  ${est},
  ARRAY[${tagsFor(vertical, types)}],
  true,
  ${featured},
  ${CREATED_BY_SQL}
);
`;
}

function main(): void {
  mkdirSync(OUT_DIR, { recursive: true });
  const batches = Math.ceil(TOTAL / PER_FILE);

  for (let b = 0; b < batches; b++) {
    const start = b * PER_FILE;
    const end = Math.min(start + PER_FILE, TOTAL);
    const parts: string[] = [];
    parts.push(`-- =============================================================================`);
    parts.push(`-- Registry-aligned template seed batch ${b + 1} of ${batches}`);
    parts.push(`-- Templates ${start + 1}–${end} of ${TOTAL}`);
    parts.push(`-- Generated by ctrl_checks/scripts/generate-workflow-templates-sql.ts`);
    parts.push(`-- Run 00_delete_all_templates.sql first if replacing the full catalog.`);
    parts.push(`-- =============================================================================`);
    parts.push('');
    parts.push('BEGIN;');
    parts.push('');

    for (let i = start; i < end; i++) {
      parts.push(insertStatement(i));
      parts.push('');
    }

    parts.push('COMMIT;');
    parts.push('');

    const num = String(b + 1).padStart(2, '0');
    const path = join(OUT_DIR, `${num}_seed_templates_batch_${b + 1}_of_${batches}.sql`);
    writeFileSync(path, parts.join('\n'), 'utf8');
    console.log('Wrote', path);
  }
}

main();
