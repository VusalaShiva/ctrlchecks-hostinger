import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { awsClient } from '@/integrations/aws/client';
import { useAuth } from '@/lib/auth';
import { ENDPOINTS } from '@/config/endpoints';

interface AuthStatus {
  googleConnected: boolean;
  linkedinConnected: boolean;
}

interface WorkflowAuthContextType {
  authStatus: AuthStatus | null;
  isLoading: boolean;
  /**
   * High-level health flag for auth/back-end checks.
   * true  => healthy
   * false => unhealthy, but UI should continue working (non-blocking)
   */
  backendHealthy: boolean;
  /**
   * Last non-fatal error message (for optional UI display).
   */
  lastError?: string | null;
  refreshAuthStatus: () => Promise<void>;
}

const WorkflowAuthContext = createContext<WorkflowAuthContextType | undefined>(undefined);

export function WorkflowAuthProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendHealthy, setBackendHealthy] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);
  // Simple debounce: only log a warning at most once every 60s
  const lastWarningRef = useRef<number | null>(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      if (!user) {
        setAuthStatus({ googleConnected: true, linkedinConnected: false });
        setIsLoading(false);
        setBackendHealthy(true);
        setLastError(null);
        return;
      }

      try {
        const { data: { session }, error: sessionError } = await awsClient.auth.getSession();
        if (sessionError || !session?.access_token) {
          setAuthStatus({ googleConnected: true, linkedinConnected: false });
          setIsLoading(false);
          setBackendHealthy(false);
          setLastError(sessionError?.message || 'No active session');
          return;
        }

        // Use the configured backend endpoint
        const apiUrl = `${ENDPOINTS.itemBackend}/api/auth/status`;
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        try {
          const response = await fetch(apiUrl, {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (response && response.ok) {
            try {
              const data = await response.json();
              setAuthStatus({
                googleConnected: true, // non-blocking: always allow workflow actions
                linkedinConnected: data.linkedinConnected || false,
              });
            } catch (parseError) {
              console.warn('Failed to parse auth status response:', parseError);
              setAuthStatus({ googleConnected: true, linkedinConnected: false });
            }
          } else {
            setAuthStatus({ googleConnected: true, linkedinConnected: false });
          }
        } catch (fetchError: any) {
          clearTimeout(timeoutId);
          if (fetchError.name === 'AbortError') {
            const now = Date.now();
            if (!lastWarningRef.current || now - lastWarningRef.current > 60000) {
              console.warn('Auth status check timed out (backend may be slow or unavailable)');
              lastWarningRef.current = now;
            }
            setLastError('Auth status check timed out');
          } else {
            const now = Date.now();
            if (!lastWarningRef.current || now - lastWarningRef.current > 60000) {
              console.warn('Failed to fetch auth status (backend may be unavailable):', fetchError.message);
              lastWarningRef.current = now;
            }
            setLastError(fetchError.message || 'Failed to fetch auth status');
          }
          setAuthStatus({ googleConnected: true, linkedinConnected: false });
          setBackendHealthy(false);
        }
      } catch (sessionError) {
        console.warn('Error getting session:', sessionError);
        setAuthStatus({ googleConnected: true, linkedinConnected: false });
        setBackendHealthy(false);
        setLastError((sessionError as Error)?.message || 'Error getting session');
      }
    } catch (error) {
      console.error('Unexpected error in checkAuthStatus:', error);
      setAuthStatus({ googleConnected: true, linkedinConnected: false });
      setBackendHealthy(false);
      setLastError((error as Error)?.message || 'Unexpected error in auth status check');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    checkAuthStatus();
    
    // Refresh status every 30 seconds
    const interval = setInterval(checkAuthStatus, 30000);
    
    // Refresh when window regains focus (e.g., after OAuth redirect)
    const handleFocus = () => {
      checkAuthStatus();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkAuthStatus]);

  return (
    <WorkflowAuthContext.Provider
      value={{
        authStatus,
        isLoading,
        backendHealthy,
        lastError,
        refreshAuthStatus: checkAuthStatus,
      }}
    >
      {children}
    </WorkflowAuthContext.Provider>
  );
}

export function useWorkflowAuth() {
  const context = useContext(WorkflowAuthContext);
  if (context === undefined) {
    throw new Error('useWorkflowAuth must be used within a WorkflowAuthProvider');
  }
  return context;
}
