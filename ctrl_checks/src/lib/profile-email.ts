import type { AuthUser } from '@/lib/auth-context';

export function isGeneratedCognitoEmail(email?: string | null): boolean {
  return Boolean(email && /@cognito\.local$/i.test(email.trim()));
}

export function getAuthEmail(user?: AuthUser | null): string {
  return (
    user?.email ||
    (user?.user_metadata?.email as string | undefined) ||
    (user?.user_metadata?.preferred_username as string | undefined) ||
    ''
  ).trim();
}

export function resolveProfileEmail(savedEmail?: string | null, user?: AuthUser | null): string {
  const authEmail = getAuthEmail(user);
  const saved = (savedEmail || '').trim();

  if (authEmail && (!saved || isGeneratedCognitoEmail(saved))) {
    return authEmail;
  }

  return saved || authEmail;
}

