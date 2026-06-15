import type { AuthSession, AuthUser } from "@/lib/auth-context";

export function isValidAuthSession(
  session: AuthSession | null | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): session is AuthSession {
  if (!session?.access_token || !session.user?.id) return false;
  if (typeof session.expires_at === "number" && session.expires_at <= nowSeconds) return false;
  return true;
}

export function normalizeAuthState(
  session: AuthSession | null | undefined,
): { session: AuthSession | null; user: AuthUser | null } {
  if (!isValidAuthSession(session)) return { session: null, user: null };
  return { session, user: session.user };
}

export function getPublicAuthRedirectPath(
  input: { loading: boolean; session: AuthSession | null | undefined },
  fallbackPath = "/dashboard",
): string | null {
  if (input.loading) return null;
  return isValidAuthSession(input.session) ? fallbackPath : null;
}

export function isAlreadySignedInAuthError(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : typeof (error as { message?: unknown })?.message === "string"
          ? String((error as { message: unknown }).message)
          : "";

  return /already\s+(a\s+)?signed\s+in|already\s+signed-in|signed\s+in\s+user/i.test(message);
}
