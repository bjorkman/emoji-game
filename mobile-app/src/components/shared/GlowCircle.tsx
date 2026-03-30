import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  emoji: string;
  size?: number;
  glowColor?: string;
}

export default function GlowCircle({
  emoji,
  size = 56,
  glowColor = '#ff6ec7',
}: Readonly<Props>) {
  const circleSize = size + 16;

  return (
    <View
      style={[
        styles.circle,
        {
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderColor: glowColor + '80',
          shadowColor: glowColor,
        },
      ]}
    >
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
});
