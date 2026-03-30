import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { BG_CARD } from '../../theme/colors';

interface Props {
  bgColor?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function SpeechBubble({
  bgColor = BG_CARD,
  style,
  children,
}: Readonly<Props>) {
  return (
    <View style={[styles.bubble, { backgroundColor: bgColor }, style]}>
      {children}
      <View
        style={[styles.triangle, { borderTopColor: bgColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
