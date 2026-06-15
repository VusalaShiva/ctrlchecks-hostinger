import { createContext, useContext } from "react";

/** Minimal user shape — compatible with AWS Cognito User fields used in this codebase */
export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
  /** Kept for compatibility — always undefined with Cognito */
  banned_until?: string;
}

/** Minimal session shape */
export interface AuthSession {
  access_token: string;
  expires_at?: number;
  user: AuthUser;
}

export interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string, role?: "user" | "admin") => Promise<{ error: Error | null }>;
  confirmSignUp: (email: string, code: string) => Promise<{ error: Error | null }>;
  resendSignUpCode: (email: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGitHub: () => Promise<{ error: Error | null }>;
  signInWithFacebook: () => Promise<{ error: Error | null }>;
  refreshSession: () => Promise<AuthSession | null>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
