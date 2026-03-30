# Deployment Guide

This guide covers all deployment types for the Emoji Game project.

## Prerequisites

- [Expo CLI](https://docs.expo.dev/get-started/installation/) and [EAS CLI](https://docs.expo.dev/build/setup/) installed globally
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed globally
- Logged in to both: `eas login` and `supabase login`
- Environment variables set (see `.env.example`)

---

## 1. Mobile App — App Store Release

Use this for **native changes**: new dependencies, Expo SDK upgrades, permission changes, icon/splash updates.

### Build

```bash
cd mobile-app

# Preview build (internal testing)
eas build --profile preview --platform ios
eas build --profile preview --platform android

# Production build (app store submission)
eas build --profile production --platform ios
eas build --profile production --platform android
```

### Submit to Stores

```bash
# iOS — submits to App Store Connect
eas submit --platform ios

# Android — submits to Google Play Console
eas submit --platform android
```

### Version Bumps

1. Update `version` in `mobile-app/app.config.ts`
2. Update `latest_version` in the Supabase `app_config` table:
   ```sql
   UPDATE app_config SET value = '1.1.0' WHERE key = 'latest_version';
   ```
3. If this is a **required** update (old versions should be blocked), also update:
   ```sql
   UPDATE app_config SET value = '1.1.0' WHERE key = 'min_version';
   ```

### Development Build

For local development with the Expo dev client:

```bash
cd mobile-app
eas build --profile development --platform ios
# Install on simulator/device, then:
yarn start
```

---

## 2. Database — Supabase Migrations

### Writing a Migration

Create a new SQL file in `supabase/migrations/` with a timestamp prefix:

```
supabase/migrations/YYYYMMDDHHMMSS_description.sql
```

The naming convention uses ascending timestamps to ensure correct ordering. Example:

```
20250101000004_add_game_stats.sql
```

### Pushing to Dev

```bash
# From the repo root
yarn db:push:dev
```

This links to the dev Supabase project and runs all pending migrations.

### Pushing to Production

```bash
# From the repo root
yarn db:push:prod
```

### Manual Changes via Dashboard

For one-off data updates (like version bumps), use the Supabase Dashboard SQL Editor:

1. Go to your project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Open **SQL Editor**
3. Run your query

### Important Notes

- Migrations are **forward-only** — never edit an already-pushed migration file
- Always test migrations against dev before pushing to prod
- RLS is enabled on all tables — remember to add policies for new tables
- The `app_config` table controls version gating (`min_version`, `latest_version`)

---

## 3. Edge Functions — Supabase Functions

The project has one edge function: `send-notification` (handles push notifications for friend requests, challenge scores).

### Deploy a Function

```bash
# Deploy a specific function
supabase functions deploy send-notification --project-ref <PROJECT_REF>

# For dev
supabase functions deploy send-notification --project-ref imppamlsbedfzputamjf

# For prod
supabase functions deploy send-notification --project-ref bnsbcbsjkpwqeqtgtchf
```

### Test Locally

```bash
supabase start              # Start local Supabase
supabase functions serve    # Serve functions locally
```

### Adding a New Function

1. Create `supabase/functions/<name>/index.ts`
2. Deploy with `supabase functions deploy <name> --project-ref <REF>`
3. Set up any required database webhooks in the Supabase Dashboard under **Database > Webhooks**

---

## 4. Environment Configuration

### Mobile App Environments

Controlled by the `APP_ENV` variable, set automatically by EAS build profiles:

| Profile | `APP_ENV` | Supabase Target |
|---------|-----------|-----------------|
| `development` | `development` | Dev project |
| `preview` | `production` | Prod project |
| `production` | `production` | Prod project |

Env files in `mobile-app/`:
- `.env.development` — dev Supabase URL and anon key
- `.env.production` — prod Supabase URL and anon key

### Supabase Project Refs

| Environment | Project Ref |
|-------------|-------------|
| Dev | `imppamlsbedfzputamjf` |
| Prod | `bnsbcbsjkpwqeqtgtchf` |

---

## Deployment Checklist

### Routine JS-only Update (new questions, UI fix, logic change)

> **Note:** OTA updates are not yet configured. Until EAS Update is set up, all changes require an app store release (see "App Store Release" above).

### Database Schema Change

1. [ ] Write migration SQL in `supabase/migrations/`
2. [ ] Test locally with `supabase start` and `supabase db reset`
3. [ ] Push to dev: `yarn db:push:dev`
4. [ ] Verify in dev dashboard
5. [ ] Push to prod: `yarn db:push:prod`
6. [ ] If the app depends on the new schema, deploy the app update **after** the migration

### Full Release (native + DB changes)

1. [ ] Push any required database migrations to prod first
2. [ ] Deploy any updated edge functions
3. [ ] Bump `version` in `app.config.ts`
4. [ ] Build: `eas build --profile production --platform all`
5. [ ] Submit: `eas submit --platform ios` and `eas submit --platform android`
6. [ ] After store approval, update `app_config.latest_version` in Supabase
7. [ ] If this is a required update, also update `app_config.min_version`
