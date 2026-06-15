/**
 * Zero-dependency Prometheus text-format metrics for workflow-crud-service.
 * No prom-client required — emits valid Prometheus exposition format.
 */

const SERVICE = 'workflow-crud-service';

type Labels = Record<string, string>;

function serialiseLabels(labels: Labels): string {
  const entries = Object.entries(labels).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length === 0) return '';
  const body = entries
    .map(([k, v]) => `${k}="${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`)
    .join(',');
  return `{${body}}`;
}

interface MetricEntry { labels: Labels; value: number; }
interface MetricDef { name: string; help: string; type: 'counter' | 'gauge'; entries: Map<string, MetricEntry>; }

const registry: MetricDef[] = [];

function defineCounter(name: string, help: string) {
  const def: MetricDef = { name, help, type: 'counter', entries: new Map() };
  registry.push(def);
  return {
    inc(labels: Labels = {}, by = 1): void {
      const k = serialiseLabels(labels);
      const e = def.entries.get(k);
      if (e) e.value += by;
      else def.entries.set(k, { labels, value: by });
    },
  };
}

function defineGauge(name: string, help: string) {
  const def: MetricDef = { name, help, type: 'gauge', entries: new Map() };
  registry.push(def);
  return {
    set(value: number, labels: Labels = {}): void {
      const k = serialiseLabels(labels);
      def.entries.set(k, { labels, value });
    },
  };
}

// ── Counters ──────────────────────────────────────────────────────────────────

export const httpRequests = defineCounter(
  'workflow_crud_http_requests_total',
  'Total HTTP requests handled by workflow-crud-service.',
);

export const workflowOps = defineCounter(
  'workflow_crud_operations_total',
  'Total workflow CRUD operations by operation and status.',
);

// ── Gauges ────────────────────────────────────────────────────────────────────

export const activeRequests = defineGauge(
  'workflow_crud_active_requests',
  'Number of requests currently in-flight.',
);

// ── Renderer + handler ────────────────────────────────────────────────────────

export function renderMetrics(): string {
  const lines: string[] = [];

  lines.push('# HELP process_uptime_seconds Time in seconds since the process started.');
  lines.push('# TYPE process_uptime_seconds gauge');
  lines.push(`process_uptime_seconds{service="${SERVICE}"} ${process.uptime().toFixed(3)}`);

  for (const def of registry) {
    lines.push(`# HELP ${def.name} ${def.help}`);
    lines.push(`# TYPE ${def.name} ${def.type}`);
    if (def.entries.size === 0) {
      lines.push(`${def.name}{service="${SERVICE}"} 0`);
    } else {
      for (const { labels, value } of def.entries.values()) {
        const lStr = serialiseLabels({ ...labels, service: SERVICE });
        lines.push(`${def.name}${lStr} ${value}`);
      }
    }
  }

  return lines.join('\n') + '\n';
}

export function metricsHandler(_req: unknown, res: { setHeader(k: string, v: string): void; send(b: string): void }): void {
  res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.send(renderMetrics());
}
