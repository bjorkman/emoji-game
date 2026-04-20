import React, { useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const EMOJIS = ['🎉', '✨', '🌟', '💫', '🥳', '🎊', '⭐', '💥', '🔥', '🏆'];
const PARTICLE_COUNT = 20;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ParticleProps {
  emoji: string;
  startX: number;
  delay: number;
}

function Particle({ emoji, startX, delay }: ParticleProps) {
  const translateY = useRef(new Animated.Value(-40)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const drift = (Math.random() - 0.5) * 80;
    const direction = Math.random() > 0.5 ? 1 : -1;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT + 40,
        duration: 3000,
        delay,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: drift,
        duration: 3000,
        delay,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        delay: delay + 2000,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 360 * direction,
        duration: 3000,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, translateY, translateX, opacity, rotate]);

  const rotateInterp = rotate.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <Animated.Text
      style={[
        styles.particle,
        {
          left: startX,
          transform: [
            { translateY },
            { translateX },
            { rotate: rotateInterp },
          ],
          opacity,
        },
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
