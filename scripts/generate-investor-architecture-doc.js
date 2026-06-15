const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} = require("docx");

const rootDir = path.resolve(__dirname, "..");
const docsDir = path.join(rootDir, "docs");
const assetsDir = path.join(docsDir, "investor-architecture", "assets");
const markdownPath = path.join(docsDir, "INVESTOR_ARCHITECTURE_REPORT.md");
const docxPath = path.join(docsDir, "CtrlChecks_Investor_Architecture_Report.docx");

const REPORT_DATE = "2026-05-04";
const TITLE = "CtrlChecks AI Workflow OS";
const SUBTITLE = "Investor Architecture Report";

const palette = {
  navy: "#13293d",
  blue: "#2f6f9f",
  teal: "#2a9d8f",
  green: "#4f9d69",
  amber: "#d49a2a",
  red: "#c8553d",
  ink: "#1f2933",
  muted: "#607080",
  line: "#aeb8c2",
  bg: "#f7fafc",
  panel: "#ffffff",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(text, maxChars = 20) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function box({ x, y, w, h, title, body, fill = palette.panel, stroke = palette.blue, titleColor = palette.ink }) {
  const titleLines = wrapText(title, 22);
  const bodyLines = body ? wrapText(body, 30) : [];
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  let ty = y + 25;
  for (const line of titleLines) {
    svg += `<text x="${x + w / 2}" y="${ty}" text-anchor="middle" font-size="15" font-weight="700" fill="${titleColor}">${escapeXml(line)}</text>`;
    ty += 18;
  }
  ty += 4;
  for (const line of bodyLines.slice(0, 3)) {
    svg += `<text x="${x + w / 2}" y="${ty}" text-anchor="middle" font-size="12" fill="${palette.muted}">${escapeXml(line)}</text>`;
    ty += 15;
  }
  return svg;
}

function arrow({ x1, y1, x2, y2, label }) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  let svg = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette.line}" stroke-width="2.4" marker-end="url(#arrow)"/>`;
  if (label) {
    svg += `<rect x="${midX - 46}" y="${midY - 18}" width="92" height="20" rx="10" fill="${palette.bg}" stroke="${palette.line}" stroke-width="1"/>`;
    svg += `<text x="${midX}" y="${midY - 4}" text-anchor="middle" font-size="11" fill="${palette.muted}">${escapeXml(label)}</text>`;
  }
  return svg;
}

function diagramSvg(title, width, height, bodySvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${palette.line}"/>
    </marker>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#d7dde3" flood-opacity="0.9"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="${palette.bg}"/>
  <text x="34" y="42" font-size="24" font-weight="800" fill="${palette.navy}">${escapeXml(title)}</text>
  <g filter="url(#shadow)">
  ${bodySvg}
  </g>
</svg>`;
}

const diagrams = [
  {
    id: "01-system-context",
    title: "System Context",
    width: 1200,
    height: 640,
    svg: () => diagramSvg(
      "System Context: CtrlChecks Platform Boundaries",
      1200,
      640,
      [
        box({ x: 60, y: 150, w: 210, h: 110, title: "Browser SPA", body: "React, Vite, workflow canvas", stroke: palette.teal }),
        box({ x: 380, y: 130, w: 250, h: 150, title: "Worker API", body: "Express runtime, AI, execution authority", stroke: palette.blue }),
        box({ x: 770, y: 70, w: 230, h: 100, title: "Supabase", body: "Auth, Postgres, storage", stroke: palette.green }),
        box({ x: 770, y: 220, w: 230, h: 100, title: "Google Gemini", body: "Generation, chat, analysis", stroke: palette.amber }),
        box({ x: 770, y: 370, w: 230, h: 100, title: "Third-party APIs", body: "Google, Slack, CRM, DB, payments", stroke: palette.red }),
        box({ x: 380, y: 400, w: 250, h: 105, title: "Realtime + Queues", body: "WebSocket, Redis, Kafka path", stroke: palette.teal }),
        arrow({ x1: 270, y1: 205, x2: 380, y2: 205, label: "REST/WS" }),
        arrow({ x1: 630, y1: 180, x2: 770, y2: 125, label: "data" }),
        arrow({ x1: 630, y1: 210, x2: 770, y2: 270, label: "LLM" }),
        arrow({ x1: 630, y1: 245, x2: 770, y2: 420, label: "actions" }),
        arrow({ x1: 505, y1: 280, x2: 505, y2: 400, label: "events" }),
      ].join("\n")
    ),
  },
  {
    id: "02-monorepo-structure",
    title: "Repository Structure",
    width: 1200,
    height: 640,
    svg: () => diagramSvg(
      "Monorepo Structure: Product, Runtime, Documentation, Infrastructure",
      1200,
      640,
      [
        box({ x: 70, y: 130, w: 230, h: 120, title: "ctrl_checks/", body: "React frontend, pages, canvas, stores", stroke: palette.teal }),
        box({ x: 360, y: 130, w: 250, h: 120, title: "worker/", body: "Express API, registry, AI, execution", stroke: palette.blue }),
        box({ x: 670, y: 130, w: 220, h: 120, title: "docs/", body: "Investor, client, setup, operations", stroke: palette.green }),
        box({ x: 950, y: 130, w: 190, h: 120, title: "infra/", body: "Docker, Nginx, HPA", stroke: palette.amber }),
        box({ x: 210, y: 370, w: 230, h: 110, title: "scripts/", body: "Migrations, generation, validation tools", stroke: palette.red }),
        box({ x: 510, y: 370, w: 230, h: 110, title: "training/", body: "Workflow examples and datasets", stroke: palette.teal }),
        box({ x: 810, y: 370, w: 230, h: 110, title: "infrastructure/", body: "Terraform and cloud modules", stroke: palette.blue }),
        arrow({ x1: 300, y1: 190, x2: 360, y2: 190 }),
        arrow({ x1: 610, y1: 190, x2: 670, y2: 190 }),
        arrow({ x1: 890, y1: 190, x2: 950, y2: 190 }),
        arrow({ x1: 475, y1: 250, x2: 340, y2: 370 }),
        arrow({ x1: 500, y1: 250, x2: 625, y2: 370 }),
        arrow({ x1: 775, y1: 250, x2: 925, y2: 370 }),
      ].join("\n")
    ),
  },
  {
    id: "03-runtime-topology",
    title: "Runtime Topology",
    width: 1200,
    height: 680,
    svg: () => diagramSvg(
      "Runtime Topology: Request Paths and Dependencies",
      1200,
      680,
      [
        box({ x: 70, y: 145, w: 190, h: 100, title: "User", body: "Builder, dashboard, triggers", stroke: palette.teal }),
        box({ x: 340, y: 90, w: 240, h: 100, title: "Frontend", body: "Auth state, canvas, API clients", stroke: palette.teal }),
        box({ x: 340, y: 260, w: 240, h: 110, title: "Worker API", body: "Routes, middleware, services", stroke: palette.blue }),
        box({ x: 680, y: 70, w: 220, h: 95, title: "Supabase Client", body: "User auth and app data", stroke: palette.green }),
        box({ x: 680, y: 235, w: 220, h: 95, title: "Service Role Data", body: "Workflow persistence and logs", stroke: palette.green }),
        box({ x: 680, y: 400, w: 220, h: 95, title: "LLM + Integrations", body: "Gemini and connector APIs", stroke: palette.amber }),
        box({ x: 965, y: 235, w: 170, h: 95, title: "Queue Layer", body: "Redis/Kafka optional", stroke: palette.red }),
        arrow({ x1: 260, y1: 195, x2: 340, y2: 140, label: "UI" }),
        arrow({ x1: 460, y1: 190, x2: 460, y2: 260, label: "API calls" }),
        arrow({ x1: 580, y1: 132, x2: 680, y2: 118, label: "auth" }),
        arrow({ x1: 580, y1: 315, x2: 680, y2: 282, label: "server data" }),
        arrow({ x1: 580, y1: 335, x2: 680, y2: 448, label: "AI/actions" }),
        arrow({ x1: 900, y1: 282, x2: 965, y2: 282, label: "jobs" }),
      ].join("\n")
    ),
  },
  {
    id: "04-lifecycle-stages",
    title: "12-Stage Lifecycle",
    width: 1300,
    height: 760,
    svg: () => {
      const labels = [
        "Frontend boot",
        "Auth + session",
        "Prompt or canvas",
        "API request",
        "AI generation",
        "Graph orchestration",
        "Human review",
        "Save workflow",
        "Credentials",
        "Trigger/run",
        "Node execution",
        "Logs + results",
      ];
      const items = labels.map((label, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 60 + col * 300;
        const y = 120 + row * 165;
        const color = [palette.teal, palette.blue, palette.green, palette.amber][col];
        let svg = box({ x, y, w: 230, h: 90, title: `${i + 1}. ${label}`, body: row === 0 ? "Entry and intent" : row === 1 ? "Build and validate" : "Execute and observe", stroke: color });
        if (i < labels.length - 1) {
          const nextCol = (i + 1) % 4;
          const x2 = nextCol === 0 ? 60 : x + 300;
          const y2 = nextCol === 0 ? y + 165 : y;
          svg += nextCol === 0
            ? arrow({ x1: x + 115, y1: y + 90, x2: x2 + 115, y2: y2 })
            : arrow({ x1: x + 230, y1: y + 45, x2, y2: y + 45 });
        }
        return svg;
      });
      return diagramSvg("End-to-End Lifecycle: From User Intent to Monitored Result", 1300, 760, items.join("\n"));
    },
  },
  {
    id: "05-ai-generation-pipeline",
    title: "AI Generation Pipeline",
    width: 1300,
    height: 760,
    svg: () => {
      const labels = [
        "Intent",
        "Capability selection",
        "Structural prompt",
        "Node selection",
        "Edge reasoning",
        "Validation",
        "Property population",
        "Credential discovery",
        "Field ownership + manifest",
      ];
      const items = labels.map((label, i) => {
        const x = 70 + (i % 3) * 395;
        const y = 120 + Math.floor(i / 3) * 175;
        let svg = box({ x, y, w: 300, h: 105, title: `${i + 1}. ${label}`, body: "Gemini-assisted with registry guardrails", stroke: i % 2 ? palette.blue : palette.teal });
        if (i < labels.length - 1) {
          const nextX = 70 + ((i + 1) % 3) * 395;
          const nextY = 120 + Math.floor((i + 1) / 3) * 175;
          svg += (i + 1) % 3 === 0
            ? arrow({ x1: x + 150, y1: y + 105, x2: nextX + 150, y2: nextY })
            : arrow({ x1: x + 300, y1: y + 52, x2: nextX, y2: y + 52 });
        }
        return svg;
      });
      return diagramSvg("AI Workflow Generation Pipeline: Prompt to Executable DAG", 1300, 760, items.join("\n"));
    },
  },
  {
    id: "06-graph-orchestration",
    title: "Graph Orchestration",
    width: 1200,
    height: 660,
    svg: () => diagramSvg(
      "Graph Orchestration: Registry-Grounded DAG Correctness",
      1200,
      660,
      [
        box({ x: 70, y: 140, w: 220, h: 105, title: "Selected Nodes", body: "AI or manual builder output", stroke: palette.teal }),
        box({ x: 385, y: 80, w: 250, h: 105, title: "Unified Node Registry", body: "Node contracts, schemas, credentials", stroke: palette.green }),
        box({ x: 385, y: 250, w: 250, h: 105, title: "Graph Orchestrator", body: "Initialize, inject, remove, reconcile", stroke: palette.blue }),
        box({ x: 730, y: 80, w: 250, h: 105, title: "Execution Order", body: "Topological order and branch rules", stroke: palette.amber }),
        box({ x: 730, y: 250, w: 250, h: 105, title: "Edge Reconciliation", body: "Ports, switch cases, merges", stroke: palette.red }),
        box({ x: 510, y: 440, w: 260, h: 105, title: "Validated Workflow DAG", body: "Single trigger, acyclic, executable", stroke: palette.teal }),
        arrow({ x1: 290, y1: 192, x2: 385, y2: 132 }),
        arrow({ x1: 290, y1: 192, x2: 385, y2: 302 }),
        arrow({ x1: 635, y1: 132, x2: 730, y2: 132 }),
        arrow({ x1: 635, y1: 302, x2: 730, y2: 302 }),
        arrow({ x1: 855, y1: 185, x2: 855, y2: 250 }),
        arrow({ x1: 510, y1: 355, x2: 610, y2: 440 }),
        arrow({ x1: 830, y1: 355, x2: 700, y2: 440 }),
      ].join("\n")
    ),
  },
  {
    id: "07-execution-flow",
    title: "Execution Flow",
    width: 1300,
    height: 690,
    svg: () => diagramSvg(
      "Execution Flow: Deterministic Node Runtime",
      1300,
      690,
      [
        box({ x: 55, y: 150, w: 210, h: 95, title: "Run Request", body: "Manual, schedule, webhook, form, chat", stroke: palette.teal }),
        box({ x: 325, y: 150, w: 210, h: 95, title: "Load Workflow", body: "Workflow JSON and user context", stroke: palette.green }),
        box({ x: 595, y: 150, w: 210, h: 95, title: "Execution Lock", body: "Avoid duplicate concurrent runs", stroke: palette.amber }),
        box({ x: 865, y: 150, w: 210, h: 95, title: "Execution Engine", body: "Plan, resolve templates, route branches", stroke: palette.blue }),
        box({ x: 325, y: 390, w: 210, h: 95, title: "Dynamic Executor", body: "Registry execute or legacy adapter", stroke: palette.red }),
        box({ x: 595, y: 390, w: 210, h: 95, title: "External Effects", body: "APIs, databases, AI nodes", stroke: palette.teal }),
        box({ x: 865, y: 390, w: 210, h: 95, title: "Logs + Results", body: "Outputs, status, duration, errors", stroke: palette.green }),
        arrow({ x1: 265, y1: 198, x2: 325, y2: 198 }),
        arrow({ x1: 535, y1: 198, x2: 595, y2: 198 }),
        arrow({ x1: 805, y1: 198, x2: 865, y2: 198 }),
        arrow({ x1: 970, y1: 245, x2: 430, y2: 390, label: "per node" }),
        arrow({ x1: 535, y1: 438, x2: 595, y2: 438 }),
        arrow({ x1: 805, y1: 438, x2: 865, y2: 438 }),
      ].join("\n")
    ),
  },
  {
    id: "08-credential-data-flow",
    title: "Credential and Data Flow",
    width: 1200,
    height: 660,
    svg: () => diagramSvg(
      "Credential and Data Flow: Secure Runtime Injection",
      1200,
      660,
      [
        box({ x: 70, y: 125, w: 220, h: 100, title: "User Auth", body: "Browser session and profile", stroke: palette.teal }),
        box({ x: 370, y: 125, w: 230, h: 100, title: "OAuth / API Setup", body: "Connection metadata only in UI", stroke: palette.amber }),
        box({ x: 700, y: 125, w: 230, h: 100, title: "Credential Vault", body: "Encrypted tokens and keys", stroke: palette.red }),
        box({ x: 370, y: 345, w: 230, h: 100, title: "Registry Requirement", body: "Which node needs which credential", stroke: palette.green }),
        box({ x: 700, y: 345, w: 230, h: 100, title: "Runtime Injection", body: "Decrypted just in time for node call", stroke: palette.blue }),
        box({ x: 980, y: 345, w: 160, h: 100, title: "External API", body: "Provider call", stroke: palette.teal }),
        arrow({ x1: 290, y1: 175, x2: 370, y2: 175 }),
        arrow({ x1: 600, y1: 175, x2: 700, y2: 175 }),
        arrow({ x1: 485, y1: 225, x2: 485, y2: 345 }),
        arrow({ x1: 600, y1: 395, x2: 700, y2: 395 }),
        arrow({ x1: 815, y1: 225, x2: 815, y2: 345 }),
        arrow({ x1: 930, y1: 395, x2: 980, y2: 395 }),
      ].join("\n")
    ),
  },
  {
    id: "09-distributed-execution",
    title: "Distributed Execution",
    width: 1200,
    height: 660,
    svg: () => diagramSvg(
      "Distributed Execution: Queue-Backed Scale Path",
      1200,
      660,
      [
        box({ x: 75, y: 160, w: 210, h: 100, title: "Client / Trigger", body: "Starts long or high-volume run", stroke: palette.teal }),
        box({ x: 360, y: 160, w: 220, h: 100, title: "Distributed API", body: "Enqueue execution job", stroke: palette.blue }),
        box({ x: 660, y: 80, w: 220, h: 95, title: "Redis / Kafka", body: "Queue, pub/sub, dead letters", stroke: palette.amber }),
        box({ x: 660, y: 260, w: 220, h: 95, title: "Worker Replicas", body: "Consume jobs and run nodes", stroke: palette.green }),
        box({ x: 965, y: 160, w: 170, h: 100, title: "Status API", body: "Poll or stream progress", stroke: palette.red }),
        box({ x: 660, y: 440, w: 220, h: 95, title: "Persistence", body: "Execution status and logs", stroke: palette.teal }),
        arrow({ x1: 285, y1: 210, x2: 360, y2: 210 }),
        arrow({ x1: 580, y1: 210, x2: 660, y2: 128 }),
        arrow({ x1: 770, y1: 175, x2: 770, y2: 260 }),
        arrow({ x1: 880, y1: 308, x2: 965, y2: 210 }),
        arrow({ x1: 770, y1: 355, x2: 770, y2: 440 }),
        arrow({ x1: 965, y1: 210, x2: 880, y2: 488 }),
      ].join("\n")
    ),
  },
  {
    id: "10-observability-controls",
    title: "Observability and Control Points",
    width: 1200,
    height: 660,
    svg: () => diagramSvg(
      "Observability and Investor Control Points",
      1200,
      660,
      [
        box({ x: 80, y: 140, w: 210, h: 95, title: "Workflow Events", body: "Creation, save, execution, trigger", stroke: palette.teal }),
        box({ x: 360, y: 140, w: 210, h: 95, title: "Structured Logs", body: "Correlation IDs, status, timing", stroke: palette.blue }),
        box({ x: 640, y: 140, w: 210, h: 95, title: "Usage Metrics", body: "AI calls, runs, retries, latency", stroke: palette.green }),
        box({ x: 920, y: 140, w: 210, h: 95, title: "Cost Controls", body: "AI credits, execution caps, overage", stroke: palette.amber }),
        box({ x: 220, y: 380, w: 220, h: 100, title: "Risk Controls", body: "Rate limits, retry budgets, circuit breakers", stroke: palette.red }),
        box({ x: 510, y: 380, w: 220, h: 100, title: "Investor Dashboard", body: "COGS, margin, usage, reliability", stroke: palette.teal }),
        box({ x: 800, y: 380, w: 220, h: 100, title: "Roadmap Gates", body: "Scale, compliance, enterprise readiness", stroke: palette.blue }),
        arrow({ x1: 290, y1: 188, x2: 360, y2: 188 }),
        arrow({ x1: 570, y1: 188, x2: 640, y2: 188 }),
        arrow({ x1: 850, y1: 188, x2: 920, y2: 188 }),
        arrow({ x1: 745, y1: 235, x2: 620, y2: 380 }),
        arrow({ x1: 1025, y1: 235, x2: 910, y2: 380 }),
        arrow({ x1: 440, y1: 430, x2: 510, y2: 430 }),
        arrow({ x1: 730, y1: 430, x2: 800, y2: 430 }),
      ].join("\n")
    ),
  },
];

const evidenceRows = [
  ["Frontend", "ctrl_checks/", "React 18, Vite, workflow canvas, dashboard, auth UI"],
  ["Worker API", "worker/src/index.ts", "Express bootstrap, route mounting, CORS, middleware, health"],
  ["AI generation", "worker/src/api/generate-workflow.ts", "Primary prompt-to-workflow API"],
  ["Pipeline", "worker/src/services/ai/pipeline/workflow-generation-pipeline.ts", "Intent, selection, validation, population, manifest"],
  ["Execution", "worker/src/api/execute-workflow.ts", "Manual and trigger execution path"],
  ["Registry/orchestration", "worker/src/core/", "Unified node registry, graph orchestrator, execution core"],
  ["Infrastructure", "infra/, infrastructure/", "Docker, Nginx, HPA, Terraform/cloud setup"],
];

const lifecycleRows = [
  ["1", "Frontend boot and auth", "React app loads user session and workflow shell."],
  ["2", "API boundary", "Frontend resolves worker endpoints and direct Supabase client paths."],
  ["3", "Worker bootstrap", "Express loads env, middleware, registries, and routes."],
  ["4", "Registry/schema load", "Node contracts, defaults, credentials, and execution behavior become available."],
  ["5", "Request handling", "API route authenticates, validates, and delegates to service layers."],
  ["6", "AI planning/generation", "Gemini-assisted stages convert intent into a registry-backed workflow."],
  ["7", "Graph orchestration", "The graph orchestrator builds and validates the DAG."],
  ["8", "Persistence", "Workflow JSON, metadata, and versions are stored."],
  ["9", "Credentials/configuration", "Required inputs and OAuth/API credentials are resolved."],
  ["10", "Execution", "Workflow runs node-by-node with branches, merges, and side effects."],
  ["11", "Observability", "Logs, durations, outputs, errors, and usage are captured."],
  ["12", "Monitoring/results", "Users and admins review execution status and business outputs."],
];

const generationRows = [
  ["Intent", "Extract trigger, actions, data flows, and constraints from the prompt."],
  ["Capability selection", "Map actions to registry-backed capability choices."],
  ["Structural prompt", "Produce a plain-language build blueprint."],
  ["Node selection", "Choose node types from the node catalog."],
  ["Edge reasoning", "Create execution order and branch-aware connections."],
  ["Validation", "Check structural and semantic correctness."],
  ["Property population", "Fill build-time fields such as subjects, messages, conditions, and cases."],
  ["Credential discovery", "Identify required credentials without blocking generation."],
  ["Field ownership + manifest", "Record which fields are user-owned, AI-built, or runtime-owned, then seal the build metadata."],
];

const roadmapRows = [
  ["Cost observability", "Use captured AI usage and execution counts to build COGS dashboards."],
  ["Rate limits and quotas", "Protect expensive AI generation and high-volume execution endpoints."],
  ["Circuit breakers", "Reduce retry storms against unstable external APIs."],
  ["Distributed sessions", "Move in-memory session surfaces to durable/shared state for horizontal scaling."],
  ["Enterprise audit", "Expand governance, security review, and SLA monitoring for larger customers."],
];

const sections = [
  {
    heading: "Executive Architecture Summary",
    paragraphs: [
      "CtrlChecks is an AI-native workflow automation platform. Users can build automations manually on a visual canvas or describe an automation in natural language and let the backend generate an executable workflow graph.",
      "The backend worker is the architectural authority. It owns workflow generation, node contracts, graph validation, execution, credentials, and server-side AI calls. The frontend is primarily the interaction and visualization layer.",
      "The core architectural moat is the combination of a unified node registry, a graph orchestrator, and a staged AI generation pipeline. This keeps AI-generated workflows closer to executable DAGs instead of fragile prompt-only JSON.",
    ],
    diagram: "01-system-context",
  },
  {
    heading: "Repository Architecture",
    paragraphs: [
      "The monorepo separates product UI, backend runtime, documentation, and infrastructure assets. This split lets investor, client, engineering, and deployment materials evolve without changing runtime code.",
      "The current investor document uses the repo's architecture docs and verified runtime entrypoints as source material. It avoids environment values and does not expose secrets.",
    ],
    diagram: "02-monorepo-structure",
    table: {
      headers: ["Area", "Path", "Responsibility"],
      rows: evidenceRows,
    },
  },
  {
    heading: "Runtime Topology",
    paragraphs: [
      "The browser talks to the worker for workflow intelligence, execution, node definitions, and AI-assisted operations. It can also use Supabase directly for user-facing auth and data surfaces where the publishable client is appropriate.",
      "The worker calls Supabase with privileged server-side access for persistence, calls Gemini for AI tasks, and calls third-party APIs during node execution.",
    ],
    diagram: "03-runtime-topology",
  },
  {
    heading: "End-to-End Lifecycle",
    paragraphs: [
      "The platform lifecycle starts with either natural-language intent or manual graph editing. The flow then moves through generation, graph validation, save/configure, credential binding, execution, and observability.",
      "This lifecycle matters for investors because the product is not only a prompt UI. It includes runtime infrastructure, credential systems, workflow persistence, and execution feedback loops.",
    ],
    diagram: "04-lifecycle-stages",
    table: {
      headers: ["Stage", "Name", "Investor-readable purpose"],
      rows: lifecycleRows,
    },
  },
  {
    heading: "AI Workflow Generation Pipeline",
    paragraphs: [
      "The generation pipeline converts a user prompt into an executable workflow through staged reasoning and validation. Gemini helps with interpretation and configuration, while the registry and graph orchestrator keep the output grounded in supported node contracts.",
      "The pipeline is designed to support graceful degradation. If an AI step is weak or incomplete, deterministic registry-backed logic and validation still constrain the workflow before it reaches execution.",
    ],
    diagram: "05-ai-generation-pipeline",
    table: {
      headers: ["Stage", "Responsibility"],
      rows: generationRows,
    },
  },
  {
    heading: "Graph Orchestration and DAG Correctness",
    paragraphs: [
      "CtrlChecks treats workflow structure as a deterministic graph problem. The unified graph orchestrator initializes workflows, reconciles edges, handles branches and merges, and validates that the workflow remains executable.",
      "This is one of the most important architecture advantages: AI can propose a plan, but graph correctness is enforced by system contracts rather than by trusting raw model output.",
    ],
    diagram: "06-graph-orchestration",
  },
  {
    heading: "Execution Architecture",
    paragraphs: [
      "Execution starts from a manual run, schedule, webhook, form trigger, or chat trigger. The worker loads the workflow, obtains execution context, applies locks, resolves inputs and templates, and executes nodes in graph order.",
      "AI nodes call model providers at runtime. Non-AI nodes generally call external APIs, databases, or internal utility operations. Every run produces outputs, timing, and status for review.",
    ],
    diagram: "07-execution-flow",
  },
  {
    heading: "Data, Security, and Credential Architecture",
    paragraphs: [
      "Supabase provides auth and persistence surfaces. Credentials and OAuth tokens are represented as reusable connections and injected into node execution only when needed.",
      "The investor-safe summary is simple: the frontend should not expose private server credentials, the worker performs privileged operations, and runtime credentials should be handled as vault-managed secrets rather than static UI data.",
    ],
    diagram: "08-credential-data-flow",
  },
  {
    heading: "Deployment and Scaling Architecture",
    paragraphs: [
      "The repo includes a scale path with multiple worker replicas, Nginx, Redis, Kafka, and Kubernetes HPA configuration. The product can run synchronously for normal workflows and route longer or higher-volume workloads through distributed execution paths.",
      "The current architecture has the right components for scale, but investor planning should still reserve work for production-grade rate limits, shared session state, tracing, and operational dashboards.",
    ],
    diagram: "09-distributed-execution",
  },
  {
    heading: "Observability and Investor Control Points",
    paragraphs: [
      "Investor control points are the metrics that connect architecture to unit economics: workflow builds, AI usage, execution counts, retries, latency, failures, and per-customer cost.",
      "The platform already has logging and AI usage primitives. The next maturity step is turning those into enforceable quotas, COGS reporting, and enterprise reliability dashboards.",
    ],
    diagram: "10-observability-controls",
    table: {
      headers: ["Next area", "Why it matters"],
      rows: roadmapRows,
    },
  },
  {
    heading: "Investor Conclusion",
    paragraphs: [
      "CtrlChecks is best understood as an automation runtime with AI-native workflow authoring, not a lightweight chatbot wrapper. The architecture already separates user experience, AI generation, graph correctness, credentials, and execution.",
      "The strongest investor story is that CtrlChecks can use AI for speed while preserving deterministic runtime guarantees through registry and graph validation. The major remaining investment areas are operational hardening, cost observability, distributed reliability, and enterprise controls.",
    ],
  },
];

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function buildMarkdown() {
  const lines = [
    `# ${TITLE}: ${SUBTITLE}`,
    "",
    `Date: ${REPORT_DATE}`,
    "Version: 1.0",
    "Prepared for: Investor architecture review",
    "Scope: Current monorepo architecture, frontend, worker, data, AI generation, execution, and scaling path.",
    "",
    "## Document Safety Note",
    "",
    "This report intentionally describes environment variables and secret categories generically. It does not include private keys, database URLs, service-role tokens, payment secrets, or values from local environment files.",
    "",
  ];

  for (const section of sections) {
    lines.push(`## ${section.heading}`, "");
    for (const paragraph of section.paragraphs) {
      lines.push(paragraph, "");
    }
    if (section.diagram) {
      lines.push(`![${section.heading}](investor-architecture/assets/${section.diagram}.png)`, "");
    }
    if (section.table) {
      lines.push(markdownTable(section.table.headers, section.table.rows), "");
    }
  }

  lines.push(
    "## Source Files Verified",
    "",
    markdownTable(["Claim area", "Repo evidence"], [
      ["Worker entrypoint", "`worker/src/index.ts`"],
      ["Primary generation API", "`worker/src/api/generate-workflow.ts`"],
      ["AI generation pipeline", "`worker/src/services/ai/pipeline/workflow-generation-pipeline.ts`"],
      ["Workflow execution", "`worker/src/api/execute-workflow.ts`"],
      ["Registry and orchestration", "`worker/src/core/registry/`, `worker/src/core/orchestration/`, `worker/src/core/execution/`"],
      ["Infrastructure scale path", "`infra/docker-compose.yml`, `infra/k8s-hpa.yaml`, `infrastructure/terraform/`"],
    ]),
    ""
  );

  return lines.join("\n");
}

function textRun(text, options = {}) {
  return new TextRun({ text, font: "Aptos", ...options });
}

function para(text, options = {}) {
  return new Paragraph({
    spacing: { after: options.after ?? 150, before: options.before ?? 0 },
    alignment: options.alignment,
    children: [textRun(text, options.run || {})],
  });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 260, after: 130 },
    children: [textRun(text, { bold: true, color: palette.navy.replace("#", "") })],
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [textRun(text)],
  });
}

function makeTable(headers, rows) {
  const cellMargins = { top: 110, bottom: 110, left: 110, right: 110 };
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((header) =>
      new TableCell({
        margins: cellMargins,
        shading: { type: ShadingType.CLEAR, fill: "E8F1F6" },
        children: [new Paragraph({ children: [textRun(header, { bold: true, color: "13293D" })] })],
      })
    ),
  });

  const bodyRows = rows.map(
    (row) =>
      new TableRow({
        children: row.map((value) =>
          new TableCell({
            margins: cellMargins,
            children: [new Paragraph({ children: [textRun(String(value))] })],
          })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "D8E0E6" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "D8E0E6" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "D8E0E6" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "D8E0E6" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "D8E0E6" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "D8E0E6" },
    },
    rows: [headerRow, ...bodyRows],
  });
}

function imageParagraph(diagramId) {
  const file = path.join(assetsDir, `${diagramId}.png`);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 180 },
    children: [
      new ImageRun({
        data: fs.readFileSync(file),
        transformation: { width: 640, height: 360 },
      }),
    ],
  });
}

function buildDocx() {
  const children = [];
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 900, after: 180 },
      children: [textRun(TITLE, { bold: true, size: 44, color: palette.navy.replace("#", "") })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 420 },
      children: [textRun(SUBTITLE, { bold: true, size: 34, color: palette.blue.replace("#", "") })],
    }),
    para(`Date: ${REPORT_DATE}`, { alignment: AlignmentType.CENTER, run: { size: 22 } }),
    para("Prepared for: Investor architecture review", { alignment: AlignmentType.CENTER, run: { size: 22 } }),
    para("Scope: Current monorepo architecture, AI workflow generation, execution, data, security, and scaling path.", {
      alignment: AlignmentType.CENTER,
      run: { size: 20, color: palette.muted.replace("#", "") },
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  children.push(
    heading("Document Safety Note", HeadingLevel.HEADING_1),
    para("This report intentionally describes environment variables and secret categories generically. It does not include private keys, database URLs, service-role tokens, payment secrets, or values from local environment files.")
  );

  for (const section of sections) {
    children.push(heading(section.heading, HeadingLevel.HEADING_1));
    for (const paragraph of section.paragraphs) {
      children.push(para(paragraph));
    }
    if (section.diagram) {
      children.push(imageParagraph(section.diagram));
    }
    if (section.table) {
      children.push(makeTable(section.table.headers, section.table.rows));
      children.push(new Paragraph({ spacing: { after: 160 }, children: [] }));
    }
  }

  children.push(
    heading("Source Files Verified", HeadingLevel.HEADING_1),
    para("The report was built from current repository architecture material and verified against the implementation entrypoints below."),
    makeTable(["Claim area", "Repo evidence"], [
      ["Worker entrypoint", "worker/src/index.ts"],
      ["Primary generation API", "worker/src/api/generate-workflow.ts"],
      ["AI generation pipeline", "worker/src/services/ai/pipeline/workflow-generation-pipeline.ts"],
      ["Workflow execution", "worker/src/api/execute-workflow.ts"],
      ["Registry and orchestration", "worker/src/core/registry/, worker/src/core/orchestration/, worker/src/core/execution/"],
      ["Infrastructure scale path", "infra/docker-compose.yml, infra/k8s-hpa.yaml, infrastructure/terraform/"],
    ])
  );

  const doc = new Document({
    creator: "CtrlChecks",
    title: `${TITLE}: ${SUBTITLE}`,
    description: "Investor-ready architecture report for CtrlChecks AI Workflow OS.",
    styles: {
      default: {
        document: {
          run: { font: "Aptos", size: 22, color: palette.ink.replace("#", "") },
          paragraph: { spacing: { line: 276 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 900, right: 720, bottom: 900, left: 720 },
          },
        },
        children,
      },
    ],
  });

  return doc;
}

async function renderDiagrams() {
  ensureDir(assetsDir);
  for (const diagram of diagrams) {
    const svg = diagram.svg();
    const svgPath = path.join(assetsDir, `${diagram.id}.svg`);
    const pngPath = path.join(assetsDir, `${diagram.id}.png`);
    fs.writeFileSync(svgPath, svg, "utf8");
    await sharp(Buffer.from(svg)).png().toFile(pngPath);
  }
}

async function main() {
  ensureDir(docsDir);
  ensureDir(assetsDir);

  await renderDiagrams();
  fs.writeFileSync(markdownPath, buildMarkdown(), "utf8");

  const doc = buildDocx();
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);

  console.log(`Created ${path.relative(rootDir, markdownPath)}`);
  console.log(`Created ${path.relative(rootDir, docxPath)}`);
  console.log(`Created ${diagrams.length} diagram PNG files in ${path.relative(rootDir, assetsDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
