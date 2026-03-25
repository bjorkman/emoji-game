# Emoji Games

A multi-game emoji guessing platform built with React Native and Expo. Identify answers from emoji clues across different categories, compete on global leaderboards, and challenge your friends.

## Games

| Game | ID | Description |
|------|-----|-------------|
| **KMOJI** | `kpop` | Identify K-pop groups from emoji clues |
| **ANIMOJI** | `animals` | Name the animal from emoji clues |
| **FILMOJI** | `movies` | Guess the movie from emoji clues |
| **FLAGOJI** | `countries` | Identify the country from flag emojis |
| **CAPOJI** | `capitals` | Name the capital city from country flag emojis |

## Features

- Five emoji guessing games with three difficulty tiers each
- Global and friends leaderboards via Supabase
- Challenge friends with shareable codes
- Friends system with requests and challenge history
- Per-game theming with dynamic colors
- Nickname and high-score tracking (local + cloud)
- Accent-insensitive answer validation

## Tech Stack

- **Framework**: React Native 0.83 + Expo ~55, React 19, TypeScript
- **Navigation**: @react-navigation/native-stack v7
- **State**: Zustand (auth session + local scores via AsyncStorage)
- **Backend**: Supabase (anonymous auth, Postgres with RLS)
- **Styling**: React Native StyleSheet + ThemeContext for per-game colors
- **Testing**: Jest with jest-expo, @testing-library/react-native
- **Package Manager**: yarn

## Dev Setup

All commands run from `mobile-app/`:

```bash
cd mobile-app
yarn install
yarn start        # Expo dev server
yarn ios          # Run on iOS simulator
yarn android      # Run on Android emulator
yarn test         # Jest tests
yarn lint         # ESLint
yarn format       # Prettier
```

Copy `.env.example` to `mobile-app/.env` and fill in your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

See [docs/getting-started.md](docs/getting-started.md) for detailed setup instructions.

## Adding a New Game

1. Create `mobile-app/src/games/<id>/data.ts` — a `Question[]` array
2. Create `mobile-app/src/games/<id>/config.ts` — a `GameConfig` object (theme, instructions, grades, splash cards)
3. Register it in `mobile-app/src/games/registry.ts`

No other files need to change.
