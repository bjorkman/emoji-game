import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NEON_PINK, NEON_BLUE } from '../theme/colors';
import { FONT_BOLD, FONT_SEMI } from '../lib/fonts';

interface Props {
  size?: 'large' | 'medium';
}

export default function Logo({ size = 'medium' }: Readonly<Props>) {
  const isLarge = size === 'large';

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleRow}>
        <Text style={[styles.decorLeft, isLarge && styles.decorLeftLarge]}>🎮</Text>
        <Text style={[styles.emojiText, isLarge && styles.emojiTextLarge]}>
          Emoji
        </Text>
        <Text style={[styles.decorStar, isLarge && styles.decorStarLarge]}>✨</Text>
      </View>
      <Text style={[styles.gamesText, isLarge && styles.gamesTextLarge]}>
        Games
      </Text>
      <Text style={[styles.decorTrophy, isLarge && styles.decorTrophyLarge]}>🏆</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  decorLeft: { fontSize: 16, marginTop: 2 },
  decorLeftLarge: { fontSize: 24 },

  decorStar: { fontSize: 14, marginTop: -4 },
  decorStarLarge: { fontSize: 20 },

  decorTrophy: { fontSize: 12, marginTop: 2, opacity: 0.8 },
  decorTrophyLarge: { fontSize: 18 },

  emojiText: {
    fontFamily: FONT_BOLD,
    fontSize: 28,
    color: NEON_PINK,
    textShadowColor: '#ff6ec780',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  emojiTextLarge: { fontSize: 48 },

  gamesText: {
    fontFamily: FONT_SEMI,
    fontSize: 18,
    color: NEON_BLUE,
    marginTop: -2,
    letterSpacing: 2,
    textShadowColor: '#38bdf860',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  gamesTextLarge: { fontSize: 30, marginTop: -4 },
});
