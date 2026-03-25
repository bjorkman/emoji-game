import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform, AppState } from 'react-native';
import { type NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { type RootStackParamList } from '../navigation/types';
import { updatePushToken } from './db';

// Show notifications even when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotifications(playerId: string): Promise<void> {
  if (!Device.isDevice) {
    console.log('[notifications] Push tokens only work on physical devices');
    return;
  }

  // Android notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('[notifications] Permission not granted');
    return;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const token = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  await updatePushToken(playerId, token.data);
}

export function setupNotificationHandlers(
  navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>,
): () => void {
  // Handle notification taps (foreground + background)
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data as Record<string, string> | undefined;
      if (!data?.type || !navigationRef.isReady()) return;

      switch (data.type) {
        case 'challenge':
          if (data.gameId) {
            navigationRef.navigate('Game', {
              gameId: data.gameId,
              challengeId: data.challengeId,
            });
          }
          break;
        case 'friend_request':
        case 'friend_accepted':
          navigationRef.navigate('Friends');
          break;
      }
    },
  );

  // Reset badge count when app comes to foreground
  const appStateSubscription = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      Notifications.setBadgeCountAsync(0);
    }
  });

  return () => {
    responseSubscription.remove();
    appStateSubscription.remove();
  };
}
