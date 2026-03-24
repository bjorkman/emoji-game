# Expo Mobile Rewrite Plan

## Context
Discontinuing the web app and rewriting it as an Expo React Native app for iOS and Android. The existing web app has 5 emoji guessing games, Supabase backend (leaderboards, challenges, friends), and Zustand state management. A scaffold already exists in `mobile-app/` with dependencies installed but all `src/` folders empty.

## What You Need to Install

### Prerequisites

#### 1. Xcode (for iOS simulator)
- Install from Mac App Store (or `xcode-select --install` for CLI tools)
- Open Xcode once → accept license → install iOS simulator runtimes
- In Xcode: Settings → Platforms → download iOS 18.x simulator

#### 2. Android Studio + AVD Setup (for Android emulator)

**Install Android Studio:**
- Download from https://developer.android.com/studio
- Run the installer, choose "Standard" setup

**SDK Manager — install these components:**
1. Open Android Studio → Settings (⌘,) → Languages & Frameworks → Android SDK
2. **SDK Platforms tab:** check **Android 15 (API 35)** — this is what Expo SDK 55 targets
3. **SDK Tools tab:** check all of these:
   - Android SDK Build-Tools 35
   - Android SDK Command-line Tools (latest)
   - Android SDK Platform-Tools
   - Android Emulator
   - Google Play services (for testing Google Sign-In later if needed)
4. Click **Apply** → accept licenses → install

**Create an AVD (Android Virtual Device):**
1. Open Android Studio → Tools → Device Manager (or click the phone icon in the toolbar)
2. Click **Create Virtual Device**
3. Pick a device — **Pixel 8** is a good default
4. Select system image: **API 35** (download it if not already present)
5. Give it a name, click **Finish**
6. Hit the ▶ play button to launch the emulator and verify it works

**Environment variables** — add to your `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Then `source ~/.zshrc`.

#### 3. Watchman (recommended for file watching)
```bash
brew install watchman
```

#### 4. EAS CLI (for builds/submissions later)
```bash
npm install -g eas-cli
```

#### 5. Environment file
Create `mobile-app/.env` with:
```
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### Running the app
```bash
cd mobile-app
npx expo start        # starts Metro bundler
# Press 'i' for iOS simulator, 'a' for Android emulator
```

---

## Iteration Plan

### Iteration 1: Foundation — Types, Logic, Data, Theme System
**Goal:** Copy all portable files, set up theming, verify with tests.

**Files to create/copy:**
- `src/core/types.ts` — copy from web (verbatim)
- `src/core/gameLogic.ts` — copy from web (verbatim)
- `src/games/registry.ts` — copy from web (verbatim)
- `src/games/kpop/data.ts` + `config.ts` — copy (verbatim)
- `src/games/animals/data.ts` + `config.ts` — copy (verbatim)
- `src/games/movies/data.ts` + `config.ts` — copy (verbatim)
- `src/games/countries/data.ts` + `config.ts` — copy (verbatim)
- `src/games/capitals/data.ts` + `config.ts` — copy (verbatim)
- `src/theme/ThemeContext.tsx` — new: React Context replacing CSS vars

**Tests:**
- `gameLogic.test.ts` — shuffle correctness, isCorrect with accents/aliases/case
- `registry.test.ts` — all 5 games registered, configs have required fields
- `ThemeContext.test.tsx` — provider supplies theme, updates on game change

**Dev dependencies to add:** `jest`, `@testing-library/react-native`, `jest-expo`, `@types/jest`

---

### Iteration 2: State Management & Supabase
**Goal:** Zustand stores + Supabase client + data layer working.

**Files:**
- `src/lib/supabase.ts` — adapt env vars to `EXPO_PUBLIC_*`
- `src/lib/db.ts` — copy from web (verbatim — pure Supabase queries)
- `src/store/authStore.ts` — copy, minor tweak if needed
- `src/store/playerStore.ts` — adapt persist middleware to use AsyncStorage

**Tests:**
- `playerStore.test.ts` — nickname set/get, addScore, highScores per game
- `authStore.test.ts` — mock Supabase auth, verify playerId set
- `db.test.ts` — mock Supabase client, verify query shapes for key functions

---

### Iteration 3: Navigation & App Shell
**Goal:** React Navigation stack with Home and Game routes.

**Files:**
- `src/navigation/AppNavigator.tsx` — stack navigator (Home, Game, Friends)
- `src/navigation/types.ts` — navigation param types
- Update `App.tsx` — wrap with NavigationContainer + ThemeProvider + auth init

**Tests:**
- `AppNavigator.test.tsx` — renders Home by default, can navigate to game

---

### Iteration 4: Home Screen
**Goal:** Game picker grid, nickname gate, challenge join.

**Files:**
- `src/screens/HomeScreen.tsx` — game cards grid, nickname input, challenge code input, recent scores

**Tests:**
- `HomeScreen.test.tsx` — renders all 5 games, nickname prompt when unset, challenge join navigates

---

### Iteration 5: Core Game Engine
**Goal:** The game state machine — start → playing → result → leaderboard.

**Files:**
- `src/core/Game.tsx` — full rewrite: state machine with RN components, timer, scoring
- `src/screens/GameScreen.tsx` — reads nav params, loads config, renders `<Game>`

**Tests:**
- `Game.test.tsx` — transitions through all 4 phases, timer counts, score tallied

---

### Iteration 6: Game UI Components
**Goal:** All in-game components.

**Files:**
- `src/components/SplashScreen.tsx` — game intro with animated emoji cards
- `src/components/GameCard.tsx` — emoji clues, TextInput, submit/skip, hint timer
- `src/components/ProgressBar.tsx` — question counter, timer, score, fill bar
- `src/components/FeedbackBanner.tsx` — correct/wrong overlay

**Tests:**
- `GameCard.test.tsx` — input submission, skip, hint appears after delay
- `ProgressBar.test.tsx` — displays correct values
- `FeedbackBanner.test.tsx` — shows correct/wrong state
- `SplashScreen.test.tsx` — renders title, play button triggers callback

---

### Iteration 7: Result Screen & Challenge Flow
**Goal:** Post-game results, grade, missed answers, challenge creation.

**Files:**
- `src/components/ResultScreen.tsx` — score, grade badge, missed list, "Challenge Friends" (uses Share API instead of clipboard)

**Tests:**
- `ResultScreen.test.tsx` — correct grade displayed, missed questions shown, challenge creation flow

---

### Iteration 8: Leaderboard
**Goal:** Tabbed leaderboard with local/global/friends/challenge tabs.

**Files:**
- `src/components/Leaderboard.tsx` — FlatList-based, tab switching, data fetching

**Tests:**
- `Leaderboard.test.tsx` — tab switching, renders scores, highlights current player

---

### Iteration 9: Friends Screen
**Goal:** Friend search, requests, list, challenge history.

**Files:**
- `src/screens/FriendsScreen.tsx` — search, pending requests, friends list, challenge history

**Tests:**
- `FriendsScreen.test.tsx` — search flow, accept/reject, challenge history renders

---

## Key Architecture Decisions

| Concern | Web | Mobile |
|---------|-----|--------|
| Navigation | react-router-dom | @react-navigation/native-stack |
| Theming | CSS custom properties on `:root` | React Context + StyleSheet |
| Styling | vanilla-extract `.css.ts` | React Native StyleSheet.create |
| Storage | localStorage | AsyncStorage |
| Clipboard | navigator.clipboard | expo-clipboard |
| Gradients | CSS gradients | expo-linear-gradient |
| UUID | crypto.randomUUID() | expo-crypto |

## Verification
After each iteration:
1. Run `yarn test` — all tests pass
2. Run `npx expo start` — app launches in simulator
3. Manual smoke test of the new functionality
