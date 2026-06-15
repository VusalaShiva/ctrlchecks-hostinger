/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LANDING_DEMO_VIDEO_URL?: string;
  /** Meta Facebook Login for Business configuration ID (optional). */
  readonly VITE_META_FACEBOOK_CONFIG_ID?: string;
  /** Comma-separated extra Facebook scopes (e.g. pages_show_list). Often required for Login for Business. */
  readonly VITE_META_FACEBOOK_EXTRA_SCOPES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
