/**
 * Role-based access control utilities
 * Provides functions to check user roles and permissions
 */

import { awsClient } from '@/integrations/aws/client';
import type { Database } from '@/integrations/aws/types';

type AppRole = Database['public']['Enums']['app_role'];

export interface UserRole {
  userId: string;
  role: AppRole;
}

// --- In-flight deduplication + short-lived result cache ---
// Collapses concurrent calls (e.g. from multiple components mounting simultaneously)
// into a single network round-trip, and caches the result for 60 seconds.
const _inflight = new Map<string, Promise<unknown>>();
const _roleResultCache = new Map<string, { value: unknown; expiry: number }>();
const ROLE_CACHE_TTL_MS = 60_000;

function cachedAsync<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = _roleResultCache.get(key) as { value: T; expiry: number } | undefined;
  if (hit && Date.now() < hit.expiry) return Promise.resolve(hit.value);

  const inflight = _inflight.get(key) as Promise<T> | undefined;
  if (inflight) return inflight;

  const p = fn()
    .then(value => {
      _roleResultCache.set(key, { value, expiry: Date.now() + ROLE_CACHE_TTL_MS });
      _inflight.delete(key);
      return value;
    })
    .catch(err => {
      _inflight.delete(key);
      throw err;
    });

  _inflight.set(key, p);
  return p;
}

async function _fetchHasRole(userId: string, role: AppRole): Promise<boolean> {
  const { data, error } = await awsClient.rpc('has_role', { _user_id: userId, _role: role });
  if (error) {
    if (error.code !== '42883') console.error('Error checking role:', error);
    return false;
  }
  return data === true;
}

/**
 * Check if current user has a specific role
 */
export async function hasRole(role: AppRole): Promise<boolean> {
  try {
    const { data: { user }, error: userError } = await awsClient.auth.getUser();
    if (userError || !user) return false;
    return cachedAsync(`hasRole:${user.id}:${role}`, () => _fetchHasRole(user.id, role));
  } catch (error) {
    console.warn('Role check failed (migration may not be applied):', error);
    return false;
  }
}

/**
 * Check if current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole('admin');
}

/**
 * Check if current user is a moderator
 */
export async function isModerator(): Promise<boolean> {
  return hasRole('moderator');
}

async function _fetchUserRole(userId: string): Promise<AppRole | null> {
  const { data, error } = await awsClient.from('user_roles').select('role').eq('user_id', userId);

  if (error) {
    const is406Error = error.code === 'PGRST116' || error.message?.includes('406') || (error as any).status === 406;
    if (is406Error) {
      console.warn('user_roles 406 error (RLS policy may need to be applied):', error);
      return null;
    }
    console.error('Error getting user role:', error);
    return null;
  }

  if (!data || data.length === 0) return null;

  const rolePriority: Record<AppRole, number> = { admin: 3, moderator: 2, user: 1 };
  const sortedRoles = data.map(item => item.role).sort((a, b) => rolePriority[b] - rolePriority[a]);
  return sortedRoles[0] || null;
}

/**
 * Get current user's role
 * Returns the highest priority role if user has multiple roles
 * Priority: admin > moderator > user
 */
export async function getUserRole(): Promise<AppRole | null> {
  try {
    const { data: { user } } = await awsClient.auth.getUser();
    if (!user) return null;
    return cachedAsync(`getUserRole:${user.id}`, () => _fetchUserRole(user.id));
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}

/**
 * Require admin role - throws error if not admin
 * Use in API routes or protected components
 */
export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Admin access required');
  }
}

/**
 * Check if user can access admin portal
 */
export async function canAccessAdminPortal(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'admin' || role === 'moderator';
}

/**
 * Permission matrix helper
 */
export const Permissions = {
  // Template permissions
  templates: {
    view: async () => true, // All authenticated users can view active templates
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  
  // Workflow permissions
  workflows: {
    viewOwn: async () => true, // Users can view their own workflows
    viewAll: isAdmin, // Admins can view all workflows
    create: async () => true, // All users can create workflows
    updateOwn: async () => true, // Users can update their own workflows
    updateAll: isAdmin, // Admins can update any workflow
    deleteOwn: async () => true, // Users can delete their own workflows
    deleteAll: isAdmin, // Admins can delete any workflow
  },
  
  // Admin portal access
  adminPortal: canAccessAdminPortal,
};

