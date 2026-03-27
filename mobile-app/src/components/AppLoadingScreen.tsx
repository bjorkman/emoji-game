import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/authStore';
import { preloadSounds } from '../lib/sounds';
import { useFonts, Fredoka_700Bold, Fredoka_600SemiBold, Fredoka_400Regular } from '../lib/fonts';
import Logo from './Logo';
import { BG_DEEP, NEON_PINK, TEXT_SECONDARY } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GRADIENT: [string, string, string] = ['#0a0a2e', '#1a0a3e', '#2a1050'];

const MIN_DISPLAY_MS = 2500;

const LOADING_MESSAGES = [
  'Warming up emoji muscles...',
  'Teaching emojis to dance...',
  'Consulting the emoji oracle...',
  'Calibrating the fun-o-meter...',
  'Doing emoji push-ups...',
  'Booting up Textopolis...',
  'Assembling the emoji jury...',
  'Rolling out the emoji red carpet...',
  'Syncing brain waves with emoji waves...',
  'Almost there, pinky promise...',
  'Polishing the trophy case...',
  'Stretching brain cells...',
  'Downloading good vibes...',
  'Asking emojis to hold still...',
  'Loading 10,000 emojis into a tiny phone...',
  'Convincing emojis to cooperate...',
  'Waking up the leaderboard...',
  'Shuffling the emoji deck...',
  'Translating emoji to English...',
  'Feeding the score hamsters...',
  'Turning on the neon lights...',
  'Tuning the victory trumpets...',
  'Charging the hint battery...',
  'Brewing a fresh batch of clues...',
  'Rehearsing victory dances...',
  'Defrosting frozen emojis...',
  'Polishing pixel confetti...',
  'Installing the fun update...',
  'Emoji council meeting in progress...',
  'Sprinkling extra sparkle...',
];

const BUBBLE_EMOJIS = ['😄', '🤔', '😎', '🎮', '✨', '🌟', '💫', '🎉'];

// ─── Floating bubble sub-component ───────────────────────────────────────────

interface BubbleProps {
  emoji: string;
  startX: number;
  startY: number;
  delay: number;
  size: number;
}

function FloatingBubble({ emoji, startX, startY, delay, size }: Readonly<BubbleProps>) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -(startY + 100),
            duration: 7000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.15, duration: 5400, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
          ]),
        ]),
        Animated.parallel([
          Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [translateY, opacity, delay, startY]);

  return (
    <Animated.Text
      style={[
        styles.bubble,
        {
          fontSize: size,
          left: startX,
          bottom: startY,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
}

// ─── App Loading Screen ───────────────────────────────────────────────────────

interface Props {
  onReady: () => void;
}

export default function AppLoadingScreen({ onReady }: Readonly<Props>) {
  const init = useAuthStore((s) => s.init);
  const [msgIndex, setMsgIndex] = useState(() => Math.floor(Math.random() * LOADING_MESSAGES.length));
  const msgOpacity = useRef(new Animated.Value(1)).current;
  useFonts({ Fredoka_700Bold, Fredoka_600SemiBold, Fredoka_400Regular });

  // Rotate loading messages with fade
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(msgOpacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        Animated.timing(msgOpacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [msgOpacity]);

  // Run init + sounds in parallel, then wait for min display time
  useEffect(() => {
    const start = Date.now();
    Promise.all([init(), preloadSounds()]).finally(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(onReady, remaining);
    });
  }, [init, onReady]);

  // Staggered bubble configs
  const bubbles = BUBBLE_EMOJIS.map((emoji, i) => ({
    emoji,
    startX: (SCREEN_WIDTH / BUBBLE_EMOJIS.length) * i + Math.random() * 20 - 10,
    startY: 60 + (i % 3) * 80,
    delay: i * 900,
    size: 20 + (i % 3) * 8,
  }));

  return (
    <LinearGradient colors={GRADIENT} style={styles.container}>
      {/* Floating bubbles */}
      {bubbles.map((b) => (
        <FloatingBubble key={b.emoji} {...b} />
      ))}

      {/* Logo */}
      <View style={styles.logoWrap}>
        <Logo size="large" />
      </View>

      {/* Loading message */}
      <Animated.Text style={[styles.message, { opacity: msgOpacity }]}>
        {LOADING_MESSAGES[msgIndex]}
      </Animated.Text>

      {/* Subtle progress dots */}
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[styles.dot, { backgroundColor: i === msgIndex % 3 ? NEON_PINK : '#ffffff30' }]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BG_DEEP,
  },
  bubble: {
    position: 'absolute',
  },
  logoWrap: {
    marginBottom: 56,
  },
  message: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    paddingHorizontal: 40,
    fontStyle: 'italic',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
