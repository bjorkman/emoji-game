# App Store Deployment Checklist

Step-by-step guide for everything you need to do manually (outside of code) to get Emoji Games on the App Store.

---

## 1. Apple Developer Account

1. Go to [developer.apple.com/programs/enroll](https://developer.apple.com/programs/enroll)
2. Sign in with your personal Apple ID
3. Choose **Individual** enrollment ($99/year)
4. Complete identity verification — approval takes 24-48 hours
5. Once approved, you'll have access to App Store Connect and developer tools

## 2. Enable GitHub Pages

1. Ensure `docs/privacy-policy.html` and `docs/support.html` are on the `main` branch
2. Go to [github.com/bjorkman/emoji-game](https://github.com/bjorkman/emoji-game) → **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/docs`
4. Click **Save**
5. Wait ~1 minute, then verify:
   - Privacy policy: `https://bjorkman.github.io/emoji-game/privacy-policy.html`
   - Support: `https://bjorkman.github.io/emoji-game/support.html`

## 3. App Store Connect — Create Listing

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform:** iOS
   - **Name:** Emoji Games
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** (select from dropdown — must match `ios.bundleIdentifier` in app.config.ts)
   - **SKU:** emoji-games-001

## 4. App Store Connect — App Information

1. **App Information** tab:
   - Privacy Policy URL: `https://bjorkman.github.io/emoji-game/privacy-policy.html`
   - Category: **Games** → Subcategory: **Trivia**
2. **Pricing and Availability**:
   - Price: **Free**
   - Availability: All territories (or select specific ones)

## 5. App Store Connect — App Privacy

1. Go to **App Privacy** tab → **Get Started**
2. Data types collected:
   - **Identifiers** → Device ID: ✅ (anonymous Supabase auth)
     - Used for: App Functionality
     - Linked to user: No
     - Tracking: No
   - **Gameplay Content** → (scores, game results)
     - Used for: App Functionality
     - Linked to user: No (anonymous)
     - Tracking: No
3. When you add ads later, return here and add:
   - **Identifiers** → Device ID → Tracking: Yes (if using personalized ads)
   - **Usage Data** → Advertising Data

## 6. App Store Connect — Age Rating

1. Fill out the **Age Rating** questionnaire
2. For the current version (no ads):
   - All answers: None / No / Infrequent
   - Expected rating: 4+
3. When ads are added:
   - Update to reflect ad content frequency

## 7. App Store Connect — Screenshots & Metadata

1. **Screenshots** (required sizes):
   - 6.7" display (iPhone 15 Pro Max): 1290 × 2796 px
   - 6.1" display (iPhone 15 Pro): 1179 × 2556 px
   - Tip: use Simulator → File → Save Screen to capture
2. **App description** (suggestion):
   > Decode emoji clues to guess movies, animals, countries, K-pop groups, and more! Challenge your friends with share codes and compete on global leaderboards. Free to play, no account required.
3. **Keywords** (100 char max, comma-separated):
   > emoji,quiz,trivia,guess,movies,animals,kpop,countries,challenge,leaderboard
4. **Support URL:** `https://bjorkman.github.io/emoji-game/support.html`
5. **Marketing URL:** (optional — can be your GitHub Pages root)

## 8. Build & Submit

1. Build with EAS: `eas build --platform ios --profile production`
2. Submit to App Store: `eas submit --platform ios`
3. Or upload via Xcode / Transporter
4. In App Store Connect, select the build and click **Submit for Review**
5. Review typically takes 24-48 hours

## 9. Google AdMob Setup (When Ready for Ads)

1. Go to [admob.google.com](https://admob.google.com) → Sign up
2. **Add your app:**
   - Platform: iOS
   - App name: Emoji Games
   - App Store listing: (add after app is published)
3. **Create ad units** (pick what fits your game):
   - **Banner** — small ad at bottom of screen (least intrusive)
   - **Interstitial** — full-screen ad between games (higher revenue)
   - **Rewarded** — user watches ad for a bonus (best user experience)
4. Note your **App ID** (ca-app-pub-XXXXX~YYYYY) and **Ad Unit IDs**
5. Add App ID to `app.config.ts` in the `react-native-google-mobile-ads` plugin config
6. Replace test ad unit IDs in code with your real ones
7. Update the privacy policy if the data practices change
8. Update the App Privacy section in App Store Connect (see step 5)
9. Submit an app update for review
