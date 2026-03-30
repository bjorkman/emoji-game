# Database Deploy Guide

This project uses Supabase with SQL migrations in `supabase/migrations/`.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed (`brew install supabase/tap/supabase`)
- Logged in via `supabase login`

## Fresh Reset (current situation)

We consolidated all migrations into a single file (`20250101000000_initial.sql`). To deploy against a fresh database:

1. **Reset the remote database** in the Supabase Dashboard:
   - Go to Project Settings > General > Danger Zone > "Reset database"
   - This wipes all data and migration history

2. **Push the clean migration:**

   ```bash
   # Dev
   npm run db:push:dev

   # Prod
   npm run db:push:prod
   ```

   These commands link to the correct project and run `supabase db push`, which applies all pending migrations in order.

3. **Verify** in the Supabase Dashboard SQL editor:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';
   ```
   You should see: `players`, `scores`, `challenges`, `friendships`, `app_config`.

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
- After a full DB reset, all anonymous auth sessions are invalidated. Users will get new anonymous IDs on next app launch.
- The `app_config` table is seeded by the initial migration with `min_version: '1.0.0'` and `latest_version: '1.0.0'`. Update these values in the Dashboard or via a new migration when releasing new app versions.
