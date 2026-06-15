# CtrlChecks — third-party connections

Reference for OAuth and API connections used by the **ctrl_checks** app.  
**Do not commit real secrets**; store them in Supabase Dashboard, Meta/Google/GitHub developer consoles, and local `.env` only.

## Production site URL pattern

Replace `{origin}` with your deployed origin (for example `https://www.ctrlchecks.ai`).

| Integration | User-facing callback route | How auth starts | Token storage (typical) |
|-------------|----------------------------|-----------------|-------------------------|
| **Google** | `{origin}/auth/google/callback` | `supabase.auth.signInWithOAuth` → `google` | `google_oauth_tokens` |
| **LinkedIn** | `{origin}/auth/linkedin/callback` | `signInWithOAuth` → `linkedin_oidc` | `linkedin_oauth_tokens` |
| **GitHub** | `{origin}/auth/github/callback` | `signInWithOAuth` → `github` | `social_tokens` (`provider=github`) |
| **Facebook** | `{origin}/auth/facebook/callback` | `signInWithOAuth` → `facebook` | `social_tokens` (`provider=facebook`) |
| **Notion** | `{origin}/auth/notion/callback` | Worker `GET /api/oauth/notion/authorize` | `notion_oauth_tokens` |
| **Twitter / X** | `{origin}/auth/twitter/callback` | Worker `GET /api/oauth/twitter/authorize` | `twitter_oauth_tokens` |
| **Zoho** | (no browser OAuth route) | Worker `POST /api/connections/zoho/connect` (manual tokens) | `zoho_oauth_tokens` |

## Supabase Auth (shared)

For providers that use Supabase OAuth (**Google, LinkedIn, GitHub, Facebook**), Meta/Facebook sends the user back to **Supabase first**:

`https://<project-ref>.supabase.co/auth/v1/callback`

That URL must appear in the third-party app’s **valid OAuth redirect URIs** (Facebook Login settings, Google console, etc.).  
Your app’s **Redirect URLs** in Supabase (Authentication → URL Configuration) must include every `{origin}/auth/.../callback` you use in production and local dev.

## Environment variables (frontend)

| Variable | Used for |
|----------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_API_URL` / backend URL helper | Worker API (Notion, Twitter, Zoho, token save) |
| `VITE_META_FACEBOOK_CONFIG_ID` | Optional; Login for Business **configuration id** (see `FACEBOOK.md`) |
| `VITE_META_FACEBOOK_EXTRA_SCOPES` | Optional; comma-separated extra scopes (e.g. `pages_show_list`) — often required with Login for Business |

## Per-provider notes

- **[FACEBOOK.md](./FACEBOOK.md)** — redirect parameters, Supabase + Meta checklist, and the “supported permission” error.

Other providers: follow the same pattern — whitelist Supabase callback + app callback, and mirror redirect URLs in Supabase’s allow list.
