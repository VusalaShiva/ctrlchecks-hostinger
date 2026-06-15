/**
 * Centralized utility to get backend API URL
 * Always prioritizes environment variable over hardcoded localhost
 */

/**
 * Get the backend API URL from environment variables
 * Only falls back to localhost if explicitly in local development
 */
export function getBackendUrl(): string {
  // First priority: VITE_API_URL
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Second priority: VITE_PUBLIC_BASE_URL
  if (import.meta.env.VITE_PUBLIC_BASE_URL) {
    return import.meta.env.VITE_PUBLIC_BASE_URL;
  }
  
  // Only use localhost fallback if:
  // 1. We're in development mode
  // 2. AND we're running on localhost (not a production domain)
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.warn('⚠️  VITE_API_URL not set. Using localhost:3001 for local development only.');
    return 'http://localhost:3001';
  }
  
  // Production should have env var set
  console.error('❌ VITE_API_URL is required but not set! Please set it in your .env file.');
  throw new Error('VITE_API_URL environment variable is required but not set. Please set it in your .env file.');
}
