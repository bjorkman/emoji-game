import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { useAuthStore } from './src/store/authStore';
import AppNavigator from './src/navigation/AppNavigator';
import UpdateGate from './src/components/UpdateGate';
import AppLoadingScreen from './src/components/AppLoadingScreen';
import { type RootStackParamList } from './src/navigation/types';
import { registerForPushNotifications, setupNotificationHandlers } from './src/lib/notifications';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function App() {
  const playerId = useAuthStore((s) => s.playerId);
  const [appReady, setAppReady] = useState(false);

  const handleReady = useCallback(() => setAppReady(true), []);

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

  if (!appReady) {
    return (
      <ThemeProvider>
        <AppLoadingScreen onReady={handleReady} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <UpdateGate>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </UpdateGate>
    </ThemeProvider>
  );
}
