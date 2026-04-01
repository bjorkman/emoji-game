import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const EMOJIS = ['🎉', '✨', '🌟', '💫', '🥳', '🎊', '⭐', '💥', '🔥', '🏆'];
const PARTICLE_COUNT = 20;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ParticleProps {
  emoji: string;
  startX: number;
  delay: number;
}

function Particle({ emoji, startX, delay }: ParticleProps) {
  const translateY = useSharedValue(-40);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    const drift = (Math.random() - 0.5) * 80;
    translateY.value = withDelay(
      delay,
      withTiming(SCREEN_HEIGHT + 40, { duration: 3000, easing: Easing.in(Easing.quad) }),
    );
    translateX.value = withDelay(
      delay,
      withTiming(drift, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
    );
    opacity.value = withDelay(
      delay + 2000,
      withTiming(0, { duration: 1000 }),
    );
    rotate.value = withDelay(
      delay,
      withTiming(360 * (Math.random() > 0.5 ? 1 : -1), { duration: 3000 }),
    );
  }, [delay, translateY, translateX, opacity, rotate]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.Text
      style={[
        styles.particle,
        { left: startX },
        animStyle,
      ]}
    >
      {emoji}
    </Animated.Text>
  );
}

export default function ConfettiOverlay() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    emoji: EMOJIS[i % EMOJIS.length],
    startX: Math.random() * SCREEN_WIDTH,
    delay: i * 150,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <Particle key={`confetti-${i}`} {...p} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    top: -40,
    fontSize: 24,
    zIndex: 100,
  },
});
