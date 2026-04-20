import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnalogClock from './AnalogClock';
import { useAuthStore } from '../store/authStore';
import { preloadSounds, playTick } from '../lib/sounds';
import { FONT_BOLD, FONT_SEMI } from '../lib/fonts';
import { BG_DEEP, BG_MID, CLOCK_GOLD, TEXT_SECONDARY } from '../theme/colors';

const MIN_DISPLAY_MS = 5000;
const START_TOTAL_MINUTES = 10 * 60 + 10;

const GRADIENT: [string, string] = [BG_DEEP, BG_MID];

interface Props {
  onReady: () => void;
}

export default function AppSplashScreen({ onReady }: Readonly<Props>) {
  const [totalMinutes, setTotalMinutes] = useState(START_TOTAL_MINUTES);
  const pulse = useRef(new Animated.Value(1)).current;

  const hour = Math.floor(totalMinutes / 60) % 12;
  const minute = totalMinutes % 60;

  // Pulse the title in/out subtly
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.85, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  // Advance clock + play tick sound once per second
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalMinutes((m) => m + 1);
      playTick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Kick off init + sound preload, gate onReady behind MIN_DISPLAY_MS
  useEffect(() => {
    const start = Date.now();
    Promise.all([useAuthStore.getState().init(), preloadSounds()]).finally(() => {
      const remaining = Math.max(0, MIN_DISPLAY_MS - (Date.now() - start));
      setTimeout(onReady, remaining);
    });
  }, [onReady]);

  return (
    <LinearGradient colors={GRADIENT} style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: pulse }]}>Clock Quest</Animated.Text>
      <View style={styles.clockWrap}>
        <AnalogClock hour={hour} minute={minute} size={240} />
      </View>
      <Text style={styles.subtitle}>Learn to read the clock</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BG_DEEP,
  },
  title: {
    fontFamily: FONT_BOLD,
    fontSize: 42,
    color: CLOCK_GOLD,
    marginBottom: 40,
    letterSpacing: 1,
  },
  clockWrap: {
    marginBottom: 40,
  },
  subtitle: {
    fontFamily: FONT_SEMI,
    fontSize: 16,
    color: TEXT_SECONDARY,
  },
});
