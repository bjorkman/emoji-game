# Emoji Games

A multi-game emoji guessing platform. Identify answers from emoji clues across different categories.

## Games

| Game | Path | Description |
|------|------|-------------|
| **KMOJI** | `/kpop` | Identify K-pop groups from emoji clues |
| **CAPOJI** | `/capitals` | Name the capital city from country flag emojis |

## Features

- Nickname + high score tracking (stored locally in the browser)
- Per-game theming via CSS custom properties
- Mobile-first, responsive layout
- Three difficulty tiers per game (easy / medium / hard)
- Fisher-Yates shuffled deck on each playthrough

## Tech stack

- React 19 + TypeScript
- Vite 7
- React Router v7
- Zustand (nickname + scores)
- CSS Modules

## Dev setup

```bash
cd web-app
yarn install
yarn dev       # http://localhost:5173
yarn build
```

## Adding a new game

1. Create `web-app/src/games/<id>/data.ts` — a `Question[]` array
2. Create `web-app/src/games/<id>/config.ts` — a `GameConfig` object (theme, instructions, grades, splash cards)
3. Add it to `web-app/src/games/registry.ts`

The game is then available at `/<id>` with no other changes needed.
