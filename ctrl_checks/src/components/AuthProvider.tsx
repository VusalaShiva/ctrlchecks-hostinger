import { useEffect, useState, ReactNode, useCallback } from "react";
import { awsClient } from "@/integrations/aws/client";
import { AuthContext, AuthUser, AuthSession } from "@/lib/auth-context";
import { isAlreadySignedInAuthError, normalizeAuthState } from "@/lib/auth-session";

function mergeSession(prev: AuthSession | null, next: AuthSession | null): AuthSession | null {
  if (!next) return null;
  if (prev && prev.access_token === next.access_token) return prev;
  return next;
}

function mergeUser(prev: AuthUser | null, next: AuthUser | null): AuthUser | null {
  if (!next) return null;
  if (prev && prev.id === next.id) {
    return {
      ...prev,
      ...next,
      email: next.email || prev.email,
      user_metadata: {
        ...(prev.user_metadata || {}),
        ...(next.user_metadata || {}),
      },
    };
  }
  return next;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  const applySession = useCallback((nextSession: AuthSession | null | undefined) => {
    const normalized = normalizeAuthState(nextSession);
    setSession((prev) => mergeSession(prev, normalized.session));
    setUser((prev) => mergeUser(prev, normalized.user));
    setLoading(false);
    return normalized.session;
  }, []);

  const refreshSession = useCallback(async () => {
    const { data } = await awsClient.auth.getSession();
    return applySession(data.session as AuthSession | null);
  }, [applySession]);

  useEffect(() => {
    let mounted = true;

    awsClient.auth.getSession()
      .then(({ data }) => {
        if (mounted) applySession(data.session as AuthSession | null);
      })
      .catch(() => {
        if (mounted) applySession(null);
      });

    const { data: { subscription } } = awsClient.auth.onAuthStateChange(
      (_event: string, nextSession: AuthSession | null) => {
        if (mounted) applySession(nextSession);
      }
    );
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const syncUserRole = async (role: "user" | "admin") => {
    const { data } = await awsClient.auth.getUser();
    if (!data.user) return;

    const { error } = await awsClient
      .from('user_roles')
      .upsert({ user_id: data.user.id, role }, { onConflict: 'user_id,role' });

    if (error) {
      console.warn('[Auth] Failed to sync user role:', error.message || error);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string, role: "user" | "admin" = "user") => {
    const { error } = await awsClient.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });
    if (error) return { error: new Error(error.message) };
    window.localStorage.setItem(`ctrlchecks:signup-role:${email.toLowerCase()}`, role);
    return { error: null };
  };

  const confirmSignUp = async (email: string, code: string) => {
    const { error } = await (awsClient.auth as any).confirmSignUp({ email, code });
    if (error) return { error: new Error(error.message) };
    return { error: null };
  };

  const resendSignUpCode = async (email: string) => {
    const { error } = await (awsClient.auth as any).resendSignUpCode({ email });
    if (error) return { error: new Error(error.message) };
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await awsClient.auth.signInWithPassword({ email, password });
    if (error) {
      if (isAlreadySignedInAuthError(error.message)) {
        const existingSession = await refreshSession();
        if (existingSession?.user) return { error: null };
      }
      return { error: new Error(error.message) };
    }
    if (!data.user) return { error: new Error("Sign-in failed — no user returned") };
    applySession(data.session as AuthSession | null);

    const pendingRoleKey = `ctrlchecks:signup-role:${email.toLowerCase()}`;
    const pendingRole = window.localStorage.getItem(pendingRoleKey);
    if (pendingRole === 'admin' || pendingRole === 'user') {
      await syncUserRole(pendingRole);
      window.localStorage.removeItem(pendingRoleKey);
    }

    return { error: null };
  };

  const signInWithGoogle = async () => {
    const { error } = await awsClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/google/callback` },
    });
    if (error && isAlreadySignedInAuthError(error.message)) {
      const existingSession = await refreshSession();
      if (existingSession?.user) return { error: null };
    }
    return { error: error ? new Error(error.message) : null };
  };

  const signInWithGitHub = async () => {
    // GitHub does not support OIDC — Cognito cannot federate it directly.
    // The worker handles the full OAuth exchange and creates/finds the Cognito user.
    const apiUrl   = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const returnTo = encodeURIComponent(window.location.origin + '/dashboard');
    window.location.href = `${apiUrl}/api/oauth/github/start-login?redirect_to=${returnTo}`;
    return { error: null };
  };

  const signInWithFacebook = async () => {
    const { error } = await awsClient.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: `${window.location.origin}/auth/facebook/callback` },
    });
    if (error && isAlreadySignedInAuthError(error.message)) {
      const existingSession = await refreshSession();
      if (existingSession?.user) return { error: null };
    }
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await awsClient.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signUp, confirmSignUp, resendSignUpCode, signIn, signInWithGoogle, signInWithGitHub, signInWithFacebook, refreshSession, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
