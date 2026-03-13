# Emoji Game — Claude Notes

## Project Overview

A multi-game emoji guessing platform with a Supabase backend for global leaderboards, challenges, and friends. All application code lives in `web-app/`. Adding a new game requires only a new folder under `src/games/` — no core code changes.

## Repo Structure

```
emoji-game/
├── CLAUDE.md
├── .env.example                          ← Supabase env var template
├── supabase/
│   └── migrations/                       ← SQL migrations (run in Supabase dashboard)
└── web-app/                              ← Main application (work here)
    ├── src/
    │   ├── main.tsx                      ← Entry point; bootstraps Supabase auth
    │   ├── App.tsx                       ← Router only (BrowserRouter + Routes)
    │   ├── global.css                    ← Reset, body, #root, CSS var defaults
    │   ├── shared.css.ts                 ← Shared: btn variants + difficulty badge
    │   ├── core/
    │   │   ├── types.ts                  ← Question, Theme, GameConfig, Difficulty, Feedback
    │   │   ├── gameLogic.ts              ← shuffle(), isCorrect() — pure, no React
    │   │   ├── Game.tsx                  ← Generic state machine, applies theme vars to :root
    │   │   └── Game.css.ts
    │   ├── lib/
    │   │   ├── supabase.ts               ← Supabase client (reads VITE_SUPABASE_* env vars)
    │   │   └── db.ts                     ← All data access: scores, leaderboards, challenges, friends
    │   ├── store/
    │   │   ├── authStore.ts              ← Zustand store for Supabase anonymous session (playerId)
    │   │   └── playerStore.ts            ← Zustand + localStorage: nickname, local highScores
    │   ├── components/
    │   │   ├── GameCard.tsx / .css.ts
    │   │   ├── FeedbackBanner.tsx / .css.ts
    │   │   ├── ProgressBar.tsx / .css.ts
    │   │   ├── ResultScreen.tsx / .css.ts  ← Score, grade, challenge button, missed answers
    │   │   ├── Leaderboard.tsx / .css.ts   ← Local / Global / Friends / Challenge tabs
    │   │   └── SplashScreen.tsx / .css.ts
    │   ├── games/
    │   │   ├── registry.ts               ← Maps gameId → GameConfig
    │   │   └── kpop/ animals/ movies/ countries/ capitals/
    │   │       ├── config.ts             ← GameConfig (theme, splash cards, grades)
    │   │       └── data.ts               ← Question[]
    │   └── screens/
    │       ├── Home.tsx / .css.ts        ← Game picker, challenge code join, recent scores
    │       ├── GameRoute.tsx             ← Looks up config, reads ?challenge= param
    │       └── Friends.tsx / .css.ts     ← Friends list, pending requests, challenge history
    ├── public/groups/                    ← K-pop group images
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Tech Stack

- **Framework**: React 19 with TypeScript (TSX throughout)
- **Build Tool**: Vite 7
- **Router**: react-router-dom v7 (BrowserRouter)
- **Package Manager**: yarn (v1.22)
- **Styling**: vanilla-extract (`*.css.ts` files), dark theme, CSS custom properties for theming
- **State**: Zustand (`authStore` for Supabase session, `playerStore` for local nickname/scores)
- **Backend**: Supabase — anonymous auth, Postgres DB with RLS

## Dev Commands

All run from `web-app/`:

```bash
yarn dev          # Start dev server with HMR (localhost:5173)
yarn build        # Production build → dist/
yarn lint         # ESLint
yarn preview      # Preview production build
```

Requires `web-app/.env.local` with:
```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Routes

| URL | Renders |
|-----|---------|
| `/` | `<Home>` — game picker + challenge join |
| `/friends` | `<Friends>` — friends list + challenge history |
| `/:gameId` | Any registered game (unknown ID → redirect to `/`) |
| `/:gameId?challenge=<id>` | Game pre-linked to a challenge; score is tagged on submit |

## Architecture

### Adding a new game

1. Create `src/games/<id>/data.ts` — array of `Question[]`
2. Create `src/games/<id>/config.ts` — `GameConfig` object
3. Register it in `src/games/registry.ts`

No other files need to change.

### Game State Machine (`core/Game.tsx`)

Four phases:

| Phase | Renders |
|-------|---------|
| `'start'` | `<SplashScreen>` |
| `'playing'` | `<ProgressBar>` + `<FeedbackBanner>` + `<GameCard>` |
| `'result'` | `<ResultScreen>` — score, grade, challenge button, missed answers |
| `'leaderboard'` | `<Leaderboard>` — tabbed: Local / Global / Friends (/ Challenge) |

On game end, `Game.tsx` calls `addScore()` (local) and `submitScore()` (Supabase) in parallel. If a `challengeId` prop is present (from `?challenge=` param), the score is tagged with it.

### Supabase Auth

`authStore.ts` calls `supabase.auth.signInAnonymously()` once on app load (via `main.tsx`). The session is persisted by Supabase in localStorage. `playerId` = Supabase `user.id` (UUID). When a nickname is set, `playerStore.setNickname` also upserts a row in the `players` table.

### Challenge Flow

1. Player A finishes → clicks **Challenge Friends** in ResultScreen
2. `createChallenge(gameId, playerId)` inserts a row, returns a short code (`KPOP-XK7P`)
3. Player A's score is retroactively linked to the challenge via `linkScoreToChallenge`
4. Player B enters the code on Home → navigates to `/:gameId?challenge=<id>`
5. Player B's score is submitted with `challenge_id` set
6. Both see the **Challenge** leaderboard tab on the Leaderboard screen
7. Challenge history (with participant scores) is visible on `/friends`

### Database Tables

| Table | Purpose |
|-------|---------|
| `players` | One row per anon user — id (= auth.users.id), nickname |
| `scores` | Every game result — player_id, game_id, score, total, duration, challenge_id |
| `challenges` | Share codes — code, game_id, created_by |
| `friendships` | requester_id, addressee_id, status ('pending' \| 'accepted') |

All tables have RLS enabled. Users can read global scores/challenges, write only their own rows.

### Answer Validation (`core/gameLogic.ts` → `isCorrect`)
- Accent-insensitive (NFD normalize + strip combining chars), case-insensitive, whitespace-trimmed
- Matches against `question.answer` and all entries in `question.aliases`
- Correct: advances after 1 s delay; Wrong/skip: shows answer, advances after 2 s delay

### Data Shape (`core/types.ts`)
```ts
export interface Question {
  id: number;
  answer: string;
  clues: string[];      // emoji strings shown as the puzzle
  difficulty: Difficulty;
  aliases: string[];
  hint?: string;        // shown after 5 s
}
```

### Theming

Each game's `GameConfig.theme` provides 5 CSS custom property values written to `document.documentElement`:

| CSS var | Role |
|---------|------|
| `--color-primary` | Gradient start |
| `--color-secondary` | Gradient mid, button fill, focus ring |
| `--color-secondary-rgb` | `"r, g, b"` for use in `rgba()` |
| `--color-accent` | Gradient end |
| `--color-splash-bg` | Splash screen background |

## Styling Conventions

- **vanilla-extract** — one `*.css.ts` per component; all class names are camelCase
- Dark navy backgrounds: `#0d0d1a`, `#14142a`; light text: `#f0f0f5`, muted: `#8888aa`
- Accent colors via CSS custom properties (`--color-primary/secondary/accent`)
- Global reset in `src/global.css`; shared buttons/badges in `src/shared.css.ts`
- Responsive: mobile-first, `@media (min-width: 480px/768px)` for larger screens

## Key Conventions

- TSX throughout; `strict: true` TypeScript
- Each component defines a local `interface Props`
- `useCallback` on all handlers
- Decorative elements use `aria-hidden="true"`
- Never include `Co-Authored-By` in commit messages
