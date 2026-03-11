# Emoji Game — Claude Notes

## Project Overview

A multi-game emoji guessing platform. All application code lives in `web-app/`. Adding a new game requires only a new folder under `src/games/` — no core code changes.

## Repo Structure

```
emoji-game/
├── CLAUDE.md
├── README.md
└── web-app/                          ← Main application (work here)
    ├── src/
    │   ├── main.tsx                  ← React entry point, imports global.css
    │   ├── App.tsx                   ← Router only (BrowserRouter + Routes)
    │   ├── global.css                ← Reset, body, #root, CSS var defaults
    │   ├── shared.module.css         ← Shared: btn variants + difficulty badge
    │   ├── core/
    │   │   ├── types.ts              ← Question, Theme, GameConfig, Difficulty, Feedback
    │   │   ├── gameLogic.ts          ← shuffle(), isCorrect() — pure, no React
    │   │   ├── Game.tsx              ← Generic state machine, applies theme vars to :root
    │   │   └── Game.module.css       ← App shell, header, title, cancel button
    │   ├── components/               ← Generic, config-driven UI
    │   │   ├── GameCard.tsx / .module.css
    │   │   ├── FeedbackBanner.tsx / .module.css
    │   │   ├── ProgressBar.tsx / .module.css
    │   │   ├── ResultScreen.tsx / .module.css
    │   │   └── SplashScreen.tsx / .module.css
    │   ├── games/
    │   │   ├── registry.ts           ← Maps gameId → GameConfig
    │   │   ├── kpop/
    │   │   │   ├── config.ts         ← K-pop GameConfig (theme, splash cards, grades)
    │   │   │   └── data.ts           ← 25 K-pop questions
    │   │   └── capitals/
    │   │       ├── config.ts         ← Capitals GameConfig
    │   │       └── data.ts           ← 25 world capital questions
    │   └── screens/
    │       ├── Home.tsx / .module.css  ← Game picker at "/"
    │       └── GameRoute.tsx         ← Looks up config from registry, renders <Game>
    ├── public/groups/                ← K-pop group images (used by kpop splashCards)
    ├── index.html
    ├── vite.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── package.json
```

## Tech Stack

- **Framework**: React 19 with TypeScript (TSX throughout)
- **Build Tool**: Vite 7
- **Router**: react-router-dom v7 (BrowserRouter)
- **Package Manager**: yarn (v1.22)
- **Styling**: CSS Modules, dark theme, CSS custom properties for theming — no CSS framework

## Dev Commands

All run from `web-app/`:

```bash
yarn dev          # Start dev server with HMR (localhost:5173)
yarn build        # Production build → dist/
yarn lint         # ESLint
yarn preview      # Preview production build
```

## Routes

| URL | Renders |
|-----|---------|
| `/` | `<Home>` — game picker |
| `/kpop` | K-pop emoji game |
| `/capitals` | World capitals game |
| `/:gameId` | Any registered game (unknown ID → redirect to `/`) |

## Architecture

### Adding a new game

1. Create `src/games/<id>/data.ts` — array of `Question[]`
2. Create `src/games/<id>/config.ts` — `GameConfig` object
3. Register it in `src/games/registry.ts`

That's it. No other files need to change.

### Game State Machine (`core/Game.tsx`)

Three phases managed via `useState<'start' | 'playing' | 'result'>`:

| Phase | Renders |
|-------|---------|
| `'start'` | `<SplashScreen>` |
| `'playing'` | `<ProgressBar>` + `<FeedbackBanner>` + `<GameCard>` |
| `'result'` | `<ResultScreen>` |

### Answer Validation (`core/gameLogic.ts` → `isCorrect`)
- Accent-insensitive (NFD normalize + strip combining chars), case-insensitive, whitespace-trimmed
- Matches against `question.answer` and all entries in `question.aliases`
- Correct: advances after 1 s delay
- Wrong/skip: shows correct answer, advances after 2 s delay

### Data Shape (`core/types.ts`)
```ts
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Feedback = 'correct' | 'wrong' | null;

export interface Question {
  id: number;
  answer: string;
  clues: string[];      // emoji strings shown as the puzzle
  difficulty: Difficulty;
  aliases: string[];
}
```

### Theming

Each game's `GameConfig.theme` provides 5 CSS custom property values. `Game.tsx` writes them to `document.documentElement` on mount:

| CSS var | Role |
|---------|------|
| `--color-primary` | Gradient start (title, play button) |
| `--color-secondary` | Gradient mid, button fill, focus ring |
| `--color-secondary-rgb` | `"r, g, b"` for use in `rgba()` |
| `--color-accent` | Gradient end |
| `--color-splash-bg` | Splash screen background + vignette |

### Scoring & Grades
Defined per-game in `config.grades` — an array of `{ min: number; label: string }` sorted descending by `min`. `ResultScreen` uses `grades.find(g => pct >= g.min)`.

## Styling Conventions

- Dark navy backgrounds: `#0d0d1a`, `#14142a`
- Light text: `#f0f0f5`
- **CSS Modules** — one `*.module.css` per component; all class names are camelCase
- Accent colors via CSS custom properties (`--color-primary/secondary/accent`)
- Global reset/body/`#root` rules in `src/global.css`
- Shared button + difficulty-badge styles in `src/shared.module.css`
- Responsive: mobile-first base styles, `@media (min-width: 480px/768px)` for larger screens

## State Management

- No external state libraries — `useState` and `useCallback` only
- All game state lives in `core/Game.tsx`, passed down as props
- `useRef<HTMLInputElement>` in `GameCard.tsx` for input auto-focus

## Key Conventions

- TSX throughout; `strict: true` TypeScript
- Each component defines a local `interface Props`
- `useCallback` on all handlers to avoid re-renders
- Decorative elements use `aria-hidden="true"`
