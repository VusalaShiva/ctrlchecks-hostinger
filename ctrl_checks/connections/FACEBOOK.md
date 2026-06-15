# Facebook connection (CtrlChecks)

## What the app does

1. User clicks **Connect** → `supabase.auth.signInWithOAuth({ provider: 'facebook', ... })`.
2. Browser opens Meta’s OAuth dialog. Query parameters look like:
   - `client_id` — Facebook **App ID** (must match Supabase Facebook provider).
   - `redirect_uri` — **`https://<project-ref>.supabase.co/auth/v1/callback`** (Supabase exchanges the code).
   - `redirect_to` — your app return URL, e.g. **`https://www.ctrlchecks.ai/auth/facebook/callback`**.
   - `scope` — typically `email` and `public_profile` (and any extras you configure).

Code paths: `ConnectionsPanel.tsx`, `Profile.tsx`, `ProfileSettingsModal.tsx`, `FacebookConnectionStatus.tsx`, and `pages/auth/facebook/Callback.tsx`.

## Where to configure secrets (never commit these)

| Item | Where it lives |
|------|----------------|
| Facebook App ID | Supabase → Authentication → Providers → Facebook |
| Facebook App Secret | Same |
| Supabase callback URL | Facebook app → **Facebook Login** → **Settings** → Valid OAuth Redirect URIs |
| App return URL | Supabase → Authentication → URL Configuration → **Redirect URLs** |

Required redirect URIs in **Facebook**:

- `https://<your-project-ref>.supabase.co/auth/v1/callback`
- `https://www.ctrlchecks.ai/auth/facebook/callback` (and `http://localhost:<port>/auth/facebook/callback` for local dev)

## Error: “It looks like this app isn’t available” / “needs at least one supported permission”

This usually means the Meta app is on **Facebook Login for Business** (or a **Business**-type app) where **`email` and `public_profile` alone are not enough**: Meta expects a **configuration** that includes at least one **supported** permission from their business login model, and often a **`config_id`** on the authorize URL.

Official overview: [Facebook Login for Business](https://developers.facebook.com/documentation/facebook-login/facebook-login-for-business).

### Supabase scope gotcha (important)

Supabase Auth (GoTrue) builds Facebook scopes by **splitting the `scopes` query parameter on commas only**. If the client sends `email public_profile` (spaces), the server treats that as **one** invalid permission. The app uses **comma-separated** scopes and omits `email` in that string because GoTrue **prepends `email` automatically**.

### Fix path A — Login for Business (common for Business apps)

1. Meta Developer Console → your app → **Facebook Login for Business** → **Configurations** → open your configuration.
2. Complete the **Permissions** step: add **at least one** permission from Meta’s supported list for that product (for example `pages_show_list` if you use Pages — subject to App Review / advanced access). Saving only `email` / `public_profile` in the wizard is often **not** enough for this error.
3. Copy the **Configuration ID**.
4. In **ctrl_checks** `.env` / hosting env:
   - `VITE_META_FACEBOOK_CONFIG_ID=<configuration id>`
   - `VITE_META_FACEBOOK_EXTRA_SCOPES=pages_show_list` (comma‑separate if multiple; must align with what you enabled in the configuration and in Supabase provider scopes).
5. **Supabase → Authentication → Providers → Facebook:** open Facebook by clicking its row. You only need **Client ID** and **Secret** here. Many Supabase versions **do not** show a separate **Scopes** field for Facebook—that is normal; scopes are sent from the app via `signInWithOAuth` (`getFacebookOAuthScopeString()` and `VITE_META_FACEBOOK_EXTRA_SCOPES`).
6. Restart dev server / **redeploy** (Vite bakes env at build time).

### Verify the request chain

1. Click **Connect**, then **before** the Facebook page loads, check the **first** URL (Supabase):  
   `https://<project-ref>.supabase.co/auth/v1/authorize?provider=facebook&...`  
   It must include `config_id=<your id>` if you set `VITE_META_FACEBOOK_CONFIG_ID`. If it does **not**, the env var is missing or the app was not rebuilt.
2. On the **Facebook** `facebook.com/dialog/oauth?...` URL, confirm `config_id` appears. If it appears on Supabase but not on Facebook, report to Supabase; if it never appears on Supabase, fix env/build first.
3. Confirm `scope` / permissions on the Facebook URL include your extra scope (e.g. `pages_show_list`), not a single blob like `email%20public_profile` only.

Community discussion of the same error: [Meta Developer Community thread](https://developers.facebook.com/community/threads/975037754451521/), [Stack Overflow](https://stackoverflow.com/questions/75601813/it-looks-like-this-app-isnt-available-facebook-app-login-error).

### Fix path B — Standard consumer “Facebook Login”

If you only need basic login and do **not** need Business login:

- Prefer an app/use case that uses classic **Facebook Login** for consumers (not forced into Login for Business), **or** use Meta’s documented rollback window if you recently switched products (see Meta docs above).
- Ensure **Facebook Login** is added as a product and **Authenticate and request data from users** (or equivalent use case) is completed in the dashboard.

### Other checks

- **Development mode**: only developers/testers/roles added in the app can complete login.
- **Live mode**: `public_profile` / `email` may require **Advanced access** and policy URLs completed.
- **Supabase Facebook panel**: usually only **App ID / Secret**; no scopes UI is required if your dashboard does not show it.

## Scopes: Meta + env (not Supabase UI)

If you need Page-related permissions, enable them in **Meta** (configuration + app permissions) and set **`VITE_META_FACEBOOK_EXTRA_SCOPES`** in the frontend env (comma-separated). App Review may apply for advanced access.

After a successful callback, tokens are persisted via the worker (`POST /api/social-tokens`) from `Callback.tsx`.
