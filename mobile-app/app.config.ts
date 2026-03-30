import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_ENV === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? 'Emoji Games (Dev)' : 'Emoji Games',
  slug: 'mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  plugins: ['expo-notifications', 'expo-tracking-transparency'],
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      UIBackgroundModes: ['remote-notification'],
      NSUserTrackingUsageDescription:
        'This allows us to show you relevant ads. You can play without allowing tracking.',
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  runtimeVersion: {
    policy: 'fingerprint',
  },
  updates: {
    url: 'https://u.expo.dev/79bee6b4-9913-4dd7-a3e1-1082d2b4214d',
    enabled: !IS_DEV,
    checkAutomatically: 'ON_LOAD',
    fallbackToCacheTimeout: 5000,
  },
  extra: {
    eas: {
      projectId: '79bee6b4-9913-4dd7-a3e1-1082d2b4214d',
    },
  },
});
