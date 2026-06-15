/**
 * Enriches worker field-guidance JSON with generateFieldGuide() preview + audit flags.
 *
 * Usage (from ctrl_checks):
 *   npx tsx scripts/enrich-field-guidance-inventory.ts ../worker/tmp/field-guidance-inventory.json
 *   npx tsx scripts/enrich-field-guidance-inventory.ts ../worker/tmp/field-guidance-inventory.json ../worker/tmp/field-guidance-audit-enriched.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateFieldGuide } from '../src/components/workflow/guideGenerator';

type UnifiedField = {
  nodeType: string;
  fieldName: string;
  fieldType: string;
  helpCategory?: string;
  docsUrl?: string;
  exampleValue?: string;
  credentialQuestionCategory?: boolean;
  willAskCredentialQuestion?: boolean;
};

type InventoryFile = {
  unifiedFields: UnifiedField[];
  [k: string]: unknown;
};

function humanLabel(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function looksSensitive(fieldName: string): boolean {
  const f = fieldName.toLowerCase();
  return (
    f.includes('api') ||
    f.includes('token') ||
    f.includes('secret') ||
    f.includes('password') ||
    f.includes('key') ||
    f.includes('credential') ||
    f.includes('webhook') ||
    f.includes('auth')
  );
}

function main() {
  const inPath = process.argv[2];
  const outPath = process.argv[3];
  if (!inPath) {
    console.error('Usage: npx tsx scripts/enrich-field-guidance-inventory.ts <input.json> [output.json]');
    process.exit(1);
  }
  const absIn = path.isAbsolute(inPath) ? inPath : path.join(process.cwd(), inPath);
  const raw = JSON.parse(fs.readFileSync(absIn, 'utf8')) as InventoryFile;
  const rows = raw.unifiedFields || [];

  const enriched = rows.map((row) => {
    const fieldLabel = humanLabel(row.fieldName);
    const hc = row.helpCategory;
    const registryMeta =
      hc && hc !== 'none'
        ? { helpCategory: hc, docsUrl: row.docsUrl, exampleValue: row.exampleValue }
        : undefined;

    const guide = generateFieldGuide(
      row.nodeType,
      row.fieldName,
      fieldLabel,
      row.fieldType || 'string',
      undefined,
      registryMeta
    );

    const guideSource =
      hc && hc !== 'none' ? 'registry_category_or_override' : 'heuristic_or_generic';

    const needsRegistryCategory =
      (!hc || hc === 'none') &&
      (row.fieldType === 'string' || row.fieldType === 'password') &&
      looksSensitive(row.fieldName);

    const credCat = !!row.credentialQuestionCategory;
    const wizardAsks = !!row.willAskCredentialQuestion;
    const credentialAlignmentGap =
      (credCat && !wizardAsks) || (!credCat && wizardAsks && looksSensitive(row.fieldName));

    let guidanceStatus: string = 'ok';
    if (needsRegistryCategory) guidanceStatus = 'needs_registry_help_category';
    else if (credentialAlignmentGap) guidanceStatus = 'credential_wizard_vs_registry_review';
    else if (!guide.steps?.length) guidanceStatus = 'empty_guide';

    return {
      ...row,
      fieldLabel,
      guidePreview: {
        title: guide.title,
        url: guide.url,
        stepCount: guide.steps?.length ?? 0,
        firstSteps: (guide.steps || []).slice(0, 4),
        example: guide.example,
        securityWarning: guide.securityWarning,
      },
      guideSource,
      guidanceStatus,
      auditFlags: {
        needsRegistryCategory,
        credentialAlignmentGap,
      },
    };
  });

  const summary = {
    total: enriched.length,
    byStatus: {} as Record<string, number>,
    needsCategoryCount: enriched.filter((r) => r.auditFlags.needsRegistryCategory).length,
    credentialGapCount: enriched.filter((r) => r.auditFlags.credentialAlignmentGap).length,
  };
  for (const r of enriched) {
    summary.byStatus[r.guidanceStatus] = (summary.byStatus[r.guidanceStatus] || 0) + 1;
  }

  const output = {
    ...raw,
    enrichedAt: new Date().toISOString(),
    sourceInventory: absIn,
    guideEnrichmentSummary: summary,
    enrichedFields: enriched,
  };

  if (outPath) {
    const absOut = path.isAbsolute(outPath) ? outPath : path.join(process.cwd(), outPath);
    fs.mkdirSync(path.dirname(absOut), { recursive: true });
    fs.writeFileSync(absOut, JSON.stringify(output, null, 2), 'utf8');
    console.log(`Wrote enriched audit (${enriched.length} rows) to ${absOut}`);
  } else {
    console.log(JSON.stringify({ guideEnrichmentSummary: summary, sample: enriched.slice(0, 5) }, null, 2));
  }
}

main();
