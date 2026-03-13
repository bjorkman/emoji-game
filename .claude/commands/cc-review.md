Review the current uncommitted changes in this repository.

Run `git diff` and `git diff --staged` to see what has changed. If there are no uncommitted changes, review the latest commit with `git diff HEAD~1 HEAD`.

Check for:
- TypeScript issues: missing types, unsafe `any`, violations of strict mode
- Supabase queries in `web-app/src/lib/db.ts`: are RLS assumptions correct? Any data exposure risk?
- React correctness: useCallback/useEffect dependency arrays, state mutation, unnecessary re-renders
- vanilla-extract patterns: are new styles consistent with existing `.css.ts` files?
- Logic bugs or edge cases in the changed code
- Anything inconsistent with the conventions in CLAUDE.md

Be direct and concise. Only flag real problems. If everything looks clean, say so briefly.
