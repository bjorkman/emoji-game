import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type ContinentId } from '../core/types';
import { type WorldMapScreenProps } from '../navigation/types';
import { getAllContinents } from '../continents/registry';
import { useProgressStore } from '../store/progressStore';
import { FONT_BOLD, FONT_SEMI, FONT_REGULAR } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_SECONDARY, BG_CARD, BORDER_DEFAULT, CLOCK_GOLD, GRADIENT_BG_DEFAULT } from '../theme/colors';

const UNLOCK_REQUIREMENTS: Record<ContinentId, ContinentId | null> = {
  analogLand: null,
  digital24: 'analogLand',
  digital12: 'digital24',
};

function useIsContinentUnlocked(continentId: ContinentId): boolean {
  const isContinentComplete = useProgressStore((s) => s.isContinentComplete);
  const prerequisite = UNLOCK_REQUIREMENTS[continentId];
  if (!prerequisite) return true;
  return isContinentComplete(prerequisite);
}

export default function WorldMapScreen({ navigation }: Readonly<WorldMapScreenProps>) {
  const continents = getAllContinents();

  const handleContinentPress = useCallback((continentId: ContinentId, firstPathId: string) => {
    navigation.navigate('Path', { continentId, pathId: firstPathId });
  }, [navigation]);

  return (
    <LinearGradient colors={GRADIENT_BG_DEFAULT} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>{'\u{1F570}'} Clock Quest</Text>
          <Text style={styles.subtitle}>Choose your adventure</Text>
        </View>

        {/* Continent cards */}
        {continents.map((continent) => (
          <ContinentCard
            key={continent.id}
            continent={continent}
            onPress={handleContinentPress}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

interface ContinentCardProps {
  continent: ReturnType<typeof getAllContinents>[number];
  onPress: (id: ContinentId, firstPathId: string) => void;
}

function ContinentCard({ continent, onPress }: Readonly<ContinentCardProps>) {
  const unlocked = useIsContinentUnlocked(continent.id);

  if (!unlocked) {
    return (
      <View style={[styles.continentCard, styles.lockedCard]}>
        <Text style={styles.continentEmoji}>{continent.emoji}</Text>
        <View style={styles.continentInfo}>
          <Text style={[styles.continentTitle, styles.lockedText]}>{continent.title}</Text>
          <Text style={[styles.continentSubtitle, styles.lockedText]}>
            Complete the previous continent to unlock!
          </Text>
        </View>
        <Text style={styles.lockIcon}>{'\u{1F512}'}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.continentCard}
      onPress={() => onPress(continent.id, continent.paths[0].id)}
      activeOpacity={0.8}
    >
      <Text style={styles.continentEmoji}>{continent.emoji}</Text>
      <View style={styles.continentInfo}>
        <Text style={styles.continentTitle}>{continent.title}</Text>
        <Text style={styles.continentSubtitle}>{continent.subtitle}</Text>
        <Text style={styles.continentPaths}>
          {continent.paths.length} paths
        </Text>
      </View>
      <Text style={styles.arrow}>{'\u{203A}'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontFamily: FONT_BOLD,
    color: CLOCK_GOLD,
    textShadowColor: CLOCK_GOLD + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: TEXT_SECONDARY,
    marginTop: 4,
  },
  continentCard: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  lockedCard: {
    opacity: 0.5,
  },
  continentEmoji: {
    fontSize: 40,
  },
  continentInfo: {
    flex: 1,
    gap: 2,
  },
  continentTitle: {
    fontSize: 20,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
  },
  continentSubtitle: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: TEXT_SECONDARY,
  },
  continentPaths: {
    fontSize: 12,
    fontFamily: FONT_SEMI,
    color: CLOCK_GOLD,
    marginTop: 4,
  },
  arrow: {
    fontSize: 28,
    color: TEXT_SECONDARY,
  },
  lockIcon: {
    fontSize: 20,
  },
  lockedText: {
    opacity: 0.7,
  },
});
