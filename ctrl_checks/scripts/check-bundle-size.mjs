/**
 * Bundle size gate — checks gzip sizes against per-category limits.
 *
 * Categories:
 *   entry   — index-*.js   fail > ENTRY_FAIL_KB  (100 KB gzip)
 *   lazy    — all other *.js chunks
 *              warn > LAZY_WARN_KB  (200 KB gzip)
 *              fail > LAZY_FAIL_KB  (300 KB gzip)
 *   vendor  — react-vendor, workflow-vendor, animation-vendor, ui-vendor (unchecked — stable)
 *
 * Usage: node scripts/check-bundle-size.mjs
 * Exit codes: 0 = pass, 1 = fail, 2 = dist not found
 */

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { gzipSync } from 'zlib';

const DIST = new URL('../dist/assets', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const ENTRY_FAIL_KB  = 100;  // entry chunk gzip limit
const LAZY_WARN_KB   = 200;  // lazy chunk gzip warn threshold
const LAZY_FAIL_KB   = 300;  // lazy chunk gzip fail threshold

// Vendor chunks are intentionally large and stable — excluded from checks.
const VENDOR_PATTERN = /^(react-vendor|workflow-vendor|animation-vendor|ui-vendor|node-catalog)/;

let files;
try {
  files = readdirSync(DIST).filter(f => f.endsWith('.js'));
} catch {
  console.error('dist/assets not found — run "npm run build" first');
  process.exit(2);
}

let warnings = 0;
let failures = 0;

const rows = [];

for (const file of files.sort()) {
  const raw = readFileSync(join(DIST, file));
  const gzipBytes = gzipSync(raw, { level: 9 }).length;
  const gzipKB = gzipBytes / 1024;

  const isVendor = VENDOR_PATTERN.test(file);
  const isEntry  = /^index-.*\.js$/.test(file);

  let status = '✅';
  let note = '';

  if (isVendor) {
    status = '⏩';
    note = 'vendor (skip)';
  } else if (isEntry) {
    if (gzipKB > ENTRY_FAIL_KB) {
      status = '❌';
      note = `entry FAIL — over ${ENTRY_FAIL_KB} KB gzip`;
      failures++;
    } else {
      note = 'entry';
    }
  } else {
    if (gzipKB > LAZY_FAIL_KB) {
      status = '❌';
      note = `lazy FAIL — over ${LAZY_FAIL_KB} KB gzip`;
      failures++;
    } else if (gzipKB > LAZY_WARN_KB) {
      status = '⚠️ ';
      note = `lazy WARN — over ${LAZY_WARN_KB} KB gzip`;
      warnings++;
    }
  }

  if (!isVendor || gzipKB > 150) {
    rows.push({ status, file, gzipKB: gzipKB.toFixed(1), note });
  }
}

// Print table sorted by size descending
rows.sort((a, b) => parseFloat(b.gzipKB) - parseFloat(a.gzipKB));
for (const r of rows) {
  console.log(`${r.status}  ${r.gzipKB.padStart(7)} KB gzip  ${r.file}  ${r.note}`);
}

console.log('');
if (failures > 0) {
  console.error(`Bundle size check FAILED — ${failures} chunk(s) over limit.`);
  console.error('Reduce the chunk or raise the limit in ctrl_checks/scripts/check-bundle-size.mjs');
  process.exit(1);
} else if (warnings > 0) {
  console.warn(`Bundle size check PASSED with ${warnings} warning(s) — consider splitting large lazy chunks.`);
} else {
  console.log('Bundle size check PASSED ✅');
}
