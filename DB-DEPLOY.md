# Database Deploy Guide

This project uses Supabase with SQL migrations in `supabase/migrations/`.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed (`brew install supabase/tap/supabase`)
- Logged in via `supabase login`

## Adding Future Migrations

Create a new timestamped migration file:

```bash
supabase migration new <description>
# Creates supabase/migrations/<timestamp>_<description>.sql
```

Write your SQL, then push:

```bash
# Dev first
npm run db:push:dev

# Then prod after verifying
npm run db:push:prod
```

## Project References

| Environment | Project Ref |
|-------------|-------------|
| Dev | `imppamlsbedfzputamjf` |
| Prod | `bnsbcbsjkpwqeqtgtchf` |

## Notes

- Migrations run in filename order. Always use timestamps as prefixes.
- `supabase db push` only applies migrations that haven't been applied yet (tracked in `supabase_migrations.schema_migrations`).
- The `app_config` table is seeded by the initial migration with `min_version: '1.0.0'` and `latest_version: '1.0.0'`. Update these values in the Dashboard or via a new migration when releasing new app versions.

---

## DANGER ZONE: Full Database Reset

This wipes **all data** and migration history, then re-applies all local migrations from scratch. All anonymous auth sessions will be invalidated — users will get new anonymous IDs on next app launch.

```bash
# Dev
supabase link --project-ref imppamlsbedfzputamjf
supabase db reset --linked

# Prod (after verifying on dev)
supabase link --project-ref bnsbcbsjkpwqeqtgtchf
supabase db reset --linked
```

Verify in the Supabase Dashboard SQL editor:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

You should see: `players`, `scores`, `challenges`, `friendships`, `app_config`.
