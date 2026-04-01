import React from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  colors?: [string, string];
  glowColor?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function GradientCard({
  colors = ['#1a2744', '#1e3a5f'],
  glowColor,
  style,
  children,
}: Readonly<Props>) {
  return (
    <LinearGradient
      colors={colors}
      style={[
        styles.card,
        glowColor && {
          borderColor: glowColor + '60',
          shadowColor: glowColor,
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a4a6e',
  },
});
