import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FloatingItem {
  emoji: string;
  left: number;   // percentage 0-100
  top: number;    // percentage 0-100
  size: number;
  opacity: number;
  delay: number;
}

interface Props {
  emojis: string[];
}

const POSITIONS: Omit<FloatingItem, 'emoji'>[] = [
  { left: 8,  top: 10, size: 36, opacity: 0.18, delay: 0 },
  { left: 78, top: 8,  size: 30, opacity: 0.15, delay: 400 },
  { left: 20, top: 45, size: 28, opacity: 0.2,  delay: 800 },
  { left: 70, top: 50, size: 34, opacity: 0.16, delay: 200 },
  { left: 45, top: 80, size: 32, opacity: 0.22, delay: 600 },
  { left: 85, top: 75, size: 26, opacity: 0.17, delay: 1000 },
];

function FloatingEmoji({ emoji, left, top, size, opacity, delay }: FloatingItem) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(-14, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Text
      style={[
        styles.emoji,
        { left: `${left}%`, top: `${top}%`, fontSize: size, opacity },
        animStyle,
      ]}
    >
      {emoji}
    </Animated.Text>
  );
}

export default function FloatingEmojis({ emojis }: Readonly<Props>) {
  if (!emojis || emojis.length === 0) return null;

  const items: FloatingItem[] = emojis.slice(0, POSITIONS.length).map((e, i) => ({
    emoji: e,
    ...POSITIONS[i],
  }));

  return (
    <>
      {items.map((item, i) => (
        <FloatingEmoji key={`float-${i}`} {...item} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute',
  },
});
