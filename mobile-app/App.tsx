import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { useAuthStore } from './src/store/authStore';
import AppNavigator from './src/navigation/AppNavigator';
import { type RootStackParamList } from './src/navigation/types';
import { registerForPushNotifications, setupNotificationHandlers } from './src/lib/notifications';
import { preloadSounds } from './src/lib/sounds';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function App() {
  const init = useAuthStore((s) => s.init);
  const playerId = useAuthStore((s) => s.playerId);

  useEffect(() => {
    init();
    preloadSounds();
  }, [init]);

  // Register push token once authenticated
  useEffect(() => {
    if (playerId) {
      registerForPushNotifications(playerId);
    }
  }, [playerId]);

  // Set up notification tap handlers
  useEffect(() => {
    return setupNotificationHandlers(navigationRef);
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
