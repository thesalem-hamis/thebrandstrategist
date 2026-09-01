# The Brand Strategist — Site + Admin Dashboard

A React + TypeScript + Vite site with a Supabase-backed admin dashboard, Paystack consultation bookings, and a public blog.

## Quick Start

```bash
npm install
cp .env.example .env   # then fill in your keys
npm run dev
```

Visit:
- `/` — marketing site
- `/book-a-session` — book a paid 1-on-1 (Paystack)
- `/contact` — Other Services inquiry form
- `/blog` — public journal
- `/dashboard/login` — admin login

## Environment Variables

Frontend (`.env`, exposed to the browser — never put secrets here):

| Key | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack → Settings → API Keys & Webhooks |

Supabase Edge Function secrets (server-only):

```bash
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_or_live_...
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set EMAIL_FROM="The Brand Strategist <bookings@yourdomain.com>"
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are auto-provided in Edge Functions.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL editor (creates `consultations`, `blog_posts`, `service_inquiries`, `site_settings`).
3. Create an admin user: **Authentication → Users → Add user** (email + password). This is who logs into `/dashboard/login`.
4. Deploy Edge Functions:

   ```bash
   supabase functions deploy verify-payment
   supabase functions deploy paystack-webhook
   ```

5. (Optional, but recommended) Configure the Paystack webhook in the Paystack dashboard pointing to:
   `https://<project>.supabase.co/functions/v1/paystack-webhook`

6. In the dashboard `/settings`, set the **Zoom meeting link** (the recurring personal-meeting URL) and the consultation fee.

## Resend (transactional email)

1. Create an account at [resend.com](https://resend.com) and verify a sending domain.
2. Generate an API key and `supabase secrets set RESEND_API_KEY=…`.
3. Set `EMAIL_FROM` to a `Name <address@yourdomain.com>` value matching your verified domain.

## Paystack

Use `pk_test_…` keys for development. Once the Supabase `verify-payment` and `paystack-webhook` functions are deployed and your Resend sender is configured, switch to live keys.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
