/**
 * Template API Client
 * User-facing template operations
 */

import { ENDPOINTS } from '@/config/endpoints';
import { awsClient } from '@/integrations/aws/client';

// Template type - using any to avoid complex type inference issues
type Template = any;

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string | null;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | null;
  estimated_setup_time: number | null;
  tags: string[] | null;
  version: number;
  is_featured: boolean;
  use_count: number;
  preview_image: string | null;
}

/**
 * Get all active templates (for users)
 */
export async function getActiveTemplates(): Promise<Template[]> {
  const response = await fetch(`${ENDPOINTS.itemBackend}/api/templates`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch templates' }));
    throw new Error(error.error || 'Failed to fetch templates');
  }
  const data = await response.json();
  return (data.templates || []) as Template[];
}

/**
 * Get template by ID
 */
export async function getTemplateById(templateId: string): Promise<Template | null> {
  const response = await fetch(`${ENDPOINTS.itemBackend}/api/templates/${templateId}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch template' }));
    throw new Error(error.error || 'Failed to fetch template');
  }
  const data = await response.json();
  return data.template || null;
}

/**
 * Copy template to user workflow
 */
export async function copyTemplate(templateId: string, workflowName?: string): Promise<{ workflow: any; message: string }> {
  try {
    const { data: { session }, error: sessionError } = await awsClient.auth.getSession();

    if (sessionError || !session) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `${ENDPOINTS.itemBackend}/copy-template`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          templateId,
          workflowName: workflowName || undefined,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to copy template' }));
      throw new Error(error.error || 'Failed to copy template');
    }

    return response.json();
  } catch (error) {
    console.error('Error copying template:', error);
    throw error;
  }
}

/**
 * Get templates by category
 */
export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  const params = new URLSearchParams({ category });
  const response = await fetch(`${ENDPOINTS.itemBackend}/api/templates?${params}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch templates' }));
    throw new Error(error.error || 'Failed to fetch templates');
  }
  const data = await response.json();
  return data.templates || [];
}

/**
 * Search templates
 */
export async function searchTemplates(query: string): Promise<Template[]> {
  const params = new URLSearchParams({ search: query });
  const response = await fetch(`${ENDPOINTS.itemBackend}/api/templates?${params}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to search templates' }));
    throw new Error(error.error || 'Failed to search templates');
  }
  const data = await response.json();
  return data.templates || [];
}

