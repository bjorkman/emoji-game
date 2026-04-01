import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { useAuthStore } from './src/store/authStore';
import AppNavigator from './src/navigation/AppNavigator';
import { preloadSounds } from './src/lib/sounds';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from './src/lib/fonts';
import { BG_DEEP, BG_MID, CLOCK_GOLD, TEXT_PRIMARY } from './src/theme/colors';

const navTheme = {
  dark: true,
  colors: {
    primary: CLOCK_GOLD,
    background: BG_DEEP,
    card: BG_DEEP,
    text: TEXT_PRIMARY,
    border: BG_MID,
    notification: CLOCK_GOLD,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: '700' as const },
    heavy: { fontFamily: 'System', fontWeight: '900' as const },
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  useEffect(() => {
    useAuthStore.getState().init();
    preloadSounds();
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: BG_DEEP,
  },
});
