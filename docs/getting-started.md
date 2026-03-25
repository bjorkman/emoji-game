# Getting Started

## Prerequisites

- Node.js (v18+)
- Yarn (`npm install -g yarn`)
- For iOS: macOS with Xcode installed (including Xcode Command Line Tools)
- For Android: Android Studio with an emulator configured
- Expo Go app on your physical device (optional, for testing on real hardware)

## Setup

1. Clone the repo and navigate to the project:
   ```bash
   git clone https://github.com/bjorkman/emoji-game.git
   cd emoji-game
   ```

2. Copy the environment file and fill in your Supabase credentials:
   ```bash
   cp .env.example mobile-app/.env
   ```
   Edit `mobile-app/.env` and set:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Install dependencies:
   ```bash
   cd mobile-app
   yarn install
   ```

## Running on iOS

1. Start the Expo dev server:
   ```bash
   cd mobile-app
   yarn ios
   ```
   This launches the iOS Simulator automatically.

2. Alternatively, start the dev server and scan the QR code with the Expo Go app on your iPhone:
   ```bash
   yarn start
   ```
   Press `i` to open in the iOS Simulator, or scan the QR code with your camera.

## Running on Android

1. Start an Android emulator from Android Studio (or connect a physical device with USB debugging enabled).

2. Run the app:
   ```bash
   cd mobile-app
   yarn android
   ```

3. Alternatively, start the dev server and scan the QR code with Expo Go on your Android device:
   ```bash
   yarn start
   ```
   Press `a` to open in the Android emulator, or scan the QR code with Expo Go.

## Running Tests

```bash
cd mobile-app
yarn test
```

## Linting & Formatting

```bash
cd mobile-app
yarn lint        # Check for issues
yarn lint:fix    # Auto-fix issues
yarn format      # Format with Prettier
```
