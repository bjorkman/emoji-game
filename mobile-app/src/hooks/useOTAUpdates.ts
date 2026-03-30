import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import * as Updates from 'expo-updates';

export function useOTAUpdates() {
  const [isReady, setIsReady] = useState(false);
  const checking = useRef(false);

  const checkForUpdate = useCallback(async () => {
    if (__DEV__ || !Updates.isEnabled || checking.current) return;
    checking.current = true;
    try {
      const result = await Updates.checkForUpdateAsync();
      if (result.isAvailable) {
        await Updates.fetchUpdateAsync();
        setIsReady(true);
      }
    } catch {
      // OTA errors never block the app
    } finally {
      checking.current = false;
    }
  }, []);

  const applyUpdate = useCallback(async () => {
    try {
      await Updates.reloadAsync();
    } catch {
      // ignore
    }
  }, []);

  // Check when app comes to foreground
  useEffect(() => {
    if (__DEV__ || !Updates.isEnabled) return;

    const handleAppState = (next: AppStateStatus) => {
      if (next === 'active') {
        checkForUpdate();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppState);
    return () => subscription.remove();
  }, [checkForUpdate]);

  return { isReady, applyUpdate };
}
