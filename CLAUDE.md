# Emoji Game — Claude Notes

## Project Overview

A multi-game emoji guessing platform built with React Native and Expo, with a Supabase backend for global leaderboards, challenges, and friends. All application code lives in `mobile-app/`. Adding a new game requires only a new folder under `src/games/` — no core code changes.

## Repo Structure

```
emoji-game/
├── CLAUDE.md
├── .env.example                          ← Supabase env var template
├── supabase/
│   └── migrations/                       ← SQL migrations (run in Supabase dashboard)
└── mobile-app/                           ← Main application (work here)
    ├── App.tsx                           ← Entry point; providers + auth init
    ├── index.ts                          ← Expo registerRootComponent
    ├── app.json                          ← Expo config (splash, icons, orientation)
    ├── babel.config.js
    ├── tsconfig.json                     ← Extends expo/tsconfig.base, strict: true
    ├── assets/                           ← App icons, splash screen images
    └── src/
        ├── core/
        │   ├── types.ts                  ← Question, Theme, GameConfig, Difficulty, Feedback
        │   ├── gameLogic.ts              ← shuffle(), isCorrect() — pure, no React
        │   └── Game.tsx                  ← Generic state machine (render props pattern)
        ├── navigation/
        │   ├── AppNavigator.tsx          ← Native Stack Navigator (Home, Game, Friends)
        │   └── types.ts                  ← RootStackParamList
        ├── screens/
        │   ├── HomeScreen.tsx            ← Game picker, nickname gate, challenge join
        │   ├── GameScreen.tsx            ← Wraps Game; passes render* props for UI
        │   └── FriendsScreen.tsx         ← Friends list, pending requests, challenge history
        ├── components/
        │   ├── GameCard.tsx              ← Emoji clues, text input, submit/skip
        │   ├── SplashScreen.tsx          ← Intro + instructions (LinearGradient)
        │   ├── ProgressBar.tsx
        │   ├── FeedbackBanner.tsx
        │   ├── ResultScreen.tsx          ← Score, grade, challenge button, missed answers
        │   └── Leaderboard.tsx           ← Tabs: Local / Global / Friends / Challenge
        ├── games/
        │   ├── registry.ts              ← Maps gameId → GameConfig
        │   └── kpop/ animals/ movies/ countries/ capitals/
        │       ├── config.ts            ← GameConfig (theme, instructions, grades, splash cards)
        │       └── data.ts              ← Question[]
        ├── store/
        │   ├── authStore.ts             ← Zustand: playerId via Supabase anonymous auth
        │   └── playerStore.ts           ← Zustand + AsyncStorage persist: nickname, highScores
        ├── lib/
        │   ├── supabase.ts              ← Supabase client (reads EXPO_PUBLIC_* env vars)
        │   ├── db.ts                    ← All data access: scores, leaderboards, challenges, friends
        │   └── format.ts               ← formatTime() utility
        └── theme/
            └── ThemeContext.tsx          ← React Context for dynamic theme colors
```

## Tech Stack

- **Framework**: React Native 0.83 + Expo ~55, React 19, TypeScript
- **Navigation**: @react-navigation/native-stack v7
- **Package Manager**: yarn (v1.22)
- **Styling**: React Native `StyleSheet.create()` + `ThemeContext` for per-game colors
- **Gradients**: expo-linear-gradient
- **State**: Zustand (`authStore` for Supabase session, `playerStore` for local nickname/scores via AsyncStorage)
- **Backend**: Supabase — anonymous auth, Postgres DB with RLS
- **Testing**: Jest with jest-expo preset, @testing-library/react-native

## Dev Commands

All run from `mobile-app/`:

```bash
yarn start        # Expo dev server
yarn ios          # Run on iOS simulator
yarn android      # Run on Android emulator
yarn test         # Jest tests
yarn lint         # ESLint (eslint-config-expo)
yarn lint:fix     # ESLint with auto-fix
yarn format       # Prettier formatting
```

Requires env vars (in `.env` or Expo config):
```
EXPO_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

## Navigation

| Screen | Route | Params |
|--------|-------|--------|
| `HomeScreen` | `Home` | — |
| `GameScreen` | `Game` | `gameId`, `challengeId?` |
| `FriendsScreen` | `Friends` | — |

Native stack navigator with dark theme (`#0d0d1a`), slide-from-right animation.

## Architecture

### Adding a new game

1. Create `src/games/<id>/data.ts` — array of `Question[]`
2. Create `src/games/<id>/config.ts` — `GameConfig` object
3. Register it in `src/games/registry.ts`

No other files need to change.

### Game State Machine (`core/Game.tsx`)

Four phases: `start` → `playing` → `result` → `leaderboard`

Game.tsx owns the state machine and timer. It does **not** import UI components directly — instead, `GameScreen.tsx` passes render functions (`renderSplash`, `renderPlaying`, `renderResult`, `renderLeaderboard`) that receive the relevant state and callbacks. This decouples game logic from presentation.

On game end, `Game.tsx` calls `addScore()` (local) and `submitScore()` (Supabase) in parallel. If a `challengeId` is present, the score is tagged with it.

### Theming (`theme/ThemeContext.tsx`)

Each game's `GameConfig.theme` provides color values (primary, secondary, secondaryRgb, accent, splashBg). On game start, `Game.tsx` calls `setTheme()` to update the React Context. Components read colors via `useTheme()` and apply them inline.

### Supabase Auth

`authStore.ts` calls `supabase.auth.signInAnonymously()` once on app load (via `App.tsx`). The session is persisted by Supabase in AsyncStorage. `playerId` = Supabase `user.id` (UUID). When a nickname is set, `playerStore.setNickname` also upserts a row in the `players` table.

### Challenge Flow

1. Player A finishes → clicks **Challenge Friends** in ResultScreen
2. `createChallenge(gameId, playerId)` inserts a row, returns a short code (`KPOP-XK7P`)
3. Player A's score is retroactively linked via `linkScoreToChallenge`
4. Player B enters the code on HomeScreen → navigates to Game with `challengeId`
5. Player B's score is submitted with `challenge_id` set
6. Both see the **Challenge** leaderboard tab
7. Challenge history visible on FriendsScreen

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

## Styling Conventions

- `StyleSheet.create()` per component — no external CSS, no component library
- Dark navy backgrounds: `#0d0d1a`, `#1a1a2e`; light text: `#f0f0f5`, muted: `#8888aa`
- Accent colors via ThemeContext (`theme.primary`, `theme.secondary`, `theme.accent`)
- Gradients via `expo-linear-gradient`
- All UI built with View, Text, TextInput, TouchableOpacity, ScrollView

## Key Conventions

- TSX throughout; `strict: true` TypeScript
- Each component defines a local `interface Props`
- `useCallback` on all handlers
- Tests colocated in `__tests__/` directories alongside source
- Never include `Co-Authored-By` in commit messages
