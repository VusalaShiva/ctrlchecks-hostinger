
/**
 * Centralized configuration for API endpoints.
 * Strictly uses environment variables - no fallbacks in production.
 */

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

const getEnvVar = (key: string, required: boolean = false, devDefault?: string): string => {
    const value = import.meta.env[key];
    
    if (!value) {
        if (required && !isDevelopment) {
            throw new Error(`❌ Required environment variable ${key} is missing. Please set it in your .env file.`);
        }
        
        if (isDevelopment && devDefault) {
            console.warn(`⚠️  Environment variable ${key} is missing. Using development default: ${devDefault}`);
            return devDefault;
        }
        
        if (required) {
            console.error(`❌ Required environment variable ${key} is missing`);
        } else {
            console.warn(`⚠️  Environment variable ${key} is missing`);
        }
        
        return '';
    }
    
    return value;
};

const ensureProtocol = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `http://${url}`;
};

// Get API URL - prioritize environment variable, only use localhost if explicitly in local dev AND env var not set
const getApiUrl = (): string => {
    // First, try to get from environment variable (highest priority)
    const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_PUBLIC_BASE_URL;
    
    if (envUrl) {
        return ensureProtocol(envUrl);
    }
    
    // Only use localhost fallback if:
    // 1. We're in development mode
    // 2. AND the env var is truly not set (not just empty string)
    // 3. AND we're running on localhost (not production domain)
    if (isDevelopment && window.location.hostname === 'localhost') {
        console.warn('⚠️  VITE_API_URL not set. Using localhost:3001 for local development.');
        return 'http://localhost:3001';
    }
    
    // Production or env var should be set
    if (!isDevelopment) {
        console.error('❌ VITE_API_URL is required in production but not set!');
    }
    
    return '';
};

export const ENDPOINTS = {
    // Chichu Chatbot & Worker Service
    // REQUIRED: VITE_API_URL or VITE_PUBLIC_BASE_URL must be set
    // Development fallback: http://localhost:3001 (only if running on localhost)
    itemBackend: getApiUrl(),

    // ✅ MIGRATED: Text/Image/Audio Processors now use main API (Gemini-based)
    // No longer need separate Ollama endpoint - all AI operations use Gemini via main API
    processorBackend: getApiUrl(), // Use main API endpoint

    // ✅ MIGRATED: Ollama removed - all AI operations use Gemini
    // Keeping for backward compatibility but pointing to main API
    ollamaBase: getApiUrl(), // Use main API endpoint

    // Backend access mode
    useDirectBackend: import.meta.env.VITE_USE_DIRECT_BACKEND === 'true' || isDevelopment
};

// Log configuration on load for easier debugging (only in development)
if (isDevelopment) {
    console.log('🔍 Environment Debug:', {
        DEV: import.meta.env.DEV,
        MODE: import.meta.env.MODE,
        VITE_API_URL: import.meta.env.VITE_API_URL,
        isDevelopment
    });
    console.log('App Configuration:', ENDPOINTS);
}
