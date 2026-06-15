/**
 * templates-repo.ts — read-only access to the public templates table.
 * Mirrors the filter logic in worker/src/api/templates.ts.
 *
 * Filters applied:
 *   is_active = true          (always)
 *   category  = $category     (when provided)
 *   search    = %term%        (name OR description ILIKE, post-query)
 *
 * Order: is_featured DESC, created_at DESC
 */

import { queryDb } from './db';

export interface TemplateRow {
  id: string;
  name: string;
  description: string | null;
  category: string;
  nodes: unknown[];
  edges: unknown[];
  difficulty: string | null;
  estimated_setup_time: number | null;
  tags: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  preview_image: string | null;
  created_at: string;
  updated_at: string | null;
}

function normalizeSearch(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

/**
 * List public (is_active) templates, optionally filtered by category.
 * In-process search filter mirrors the worker's behaviour.
 */
export async function listTemplates(options: {
  category?: string;
  search?: string;
}): Promise<TemplateRow[]> {
  const { category, search } = options;
  const normCategory = normalizeSearch(category);
  const normSearch = normalizeSearch(search);

  const params: unknown[] = [];
  const conditions: string[] = ['is_active = true'];

  if (normCategory) {
    params.push(normCategory);
    conditions.push(`category = $${params.length}`);
  }

  const where = conditions.join(' AND ');
  const rows = await queryDb<TemplateRow>(
    `SELECT * FROM templates WHERE ${where}
     ORDER BY is_featured DESC, created_at DESC`,
    params,
  );

  if (!normSearch) return rows;

  return rows.filter((t) => {
    const name = String(t.name ?? '').toLowerCase();
    const desc = String(t.description ?? '').toLowerCase();
    return name.includes(normSearch) || desc.includes(normSearch);
  });
}

/**
 * Get a single active template by id.
 * Returns null if not found or not active.
 */
export async function getTemplateById(templateId: string): Promise<TemplateRow | null> {
  const rows = await queryDb<TemplateRow>(
    `SELECT * FROM templates WHERE id = $1 AND is_active = true LIMIT 1`,
    [templateId],
  );
  return rows[0] ?? null;
}
