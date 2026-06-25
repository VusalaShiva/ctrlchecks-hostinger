/**
 * Export OpenAPI spec to public/openapi.json for serving as a static file.
 * Run as part of `npm run build`.
 */
import * as fs from 'fs';
import * as path from 'path';
import { openApiSpec } from '../src/api/docs';

const outDir = path.join(__dirname, '../public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'openapi.json');
fs.writeFileSync(outPath, JSON.stringify(openApiSpec, null, 2), 'utf-8');
console.log('✅ OpenAPI spec exported to public/openapi.json');
