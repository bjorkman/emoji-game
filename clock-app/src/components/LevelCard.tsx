import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { type StarRating } from '../core/types';
import StarDisplay from './StarDisplay';
import { FONT_BOLD, FONT_SEMI } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_SECONDARY, BG_CARD, BORDER_DEFAULT, CLOCK_GOLD } from '../theme/colors';

interface Props {
  levelNumber: number;
  inputMode: 'multipleChoice' | 'freeText';
  bestStars: StarRating;
  onPress: () => void;
  isBonus?: boolean;
}

export default function LevelCard({ levelNumber, inputMode, bestStars, onPress, isBonus }: Readonly<Props>) {
  const modeLabel = inputMode === 'multipleChoice' ? 'Multiple Choice' : 'Type the Time';

  return (
    <TouchableOpacity style={[styles.card, isBonus && styles.bonusCard]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={[styles.levelBadge, isBonus && styles.bonusBadge]}>
          <Text style={[styles.levelNumber, isBonus && styles.bonusNumber]}>
            {isBonus ? '\u{267E}' : levelNumber}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Level {levelNumber}</Text>
          <Text style={styles.mode}>{modeLabel}</Text>
        </View>
      </View>
      <StarDisplay stars={bestStars} size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CLOCK_GOLD + '20',
    borderWidth: 2,
    borderColor: CLOCK_GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: CLOCK_GOLD,
  },
  info: {
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
  },
  mode: {
    fontSize: 12,
    fontFamily: FONT_SEMI,
    color: TEXT_SECONDARY,
  },
  bonusCard: {
    borderColor: CLOCK_GOLD + '40',
  },
  bonusBadge: {
    backgroundColor: CLOCK_GOLD + '30',
    borderColor: CLOCK_GOLD + '80',
  },
  bonusNumber: {
    fontSize: 16,
  },
});
