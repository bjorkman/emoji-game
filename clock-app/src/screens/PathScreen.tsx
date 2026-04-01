import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type PathScreenProps } from '../navigation/types';
import { type LevelDef } from '../core/types';
import { getContinent } from '../continents/registry';
import { generateBonusLevels } from '../core/bonusGenerator';
import { useProgressStore } from '../store/progressStore';
import LevelCard from '../components/LevelCard';
import { FONT_BOLD, FONT_SEMI, FONT_REGULAR } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_SECONDARY, TEXT_MUTED, CLOCK_GOLD, GRADIENT_BG_DEFAULT } from '../theme/colors';

export default function PathScreen({ navigation, route }: Readonly<PathScreenProps>) {
  const { continentId, pathId } = route.params;
  const getBestStars = useProgressStore((s) => s.getBestStars);
  const isPathComplete = useProgressStore((s) => s.isPathComplete);
  const pathComplete = isPathComplete(continentId, pathId);

  const continent = getContinent(continentId);
  const currentPathIndex = continent.paths.findIndex((p) => p.id === pathId);
  const currentPath = continent.paths[currentPathIndex];

  const handleLevelPress = useCallback((levelNumber: number) => {
    navigation.navigate('Level', { continentId, pathId, levelNumber });
  }, [navigation, continentId, pathId]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePathSwitch = useCallback((newPathId: string) => {
    navigation.setParams({ pathId: newPathId });
  }, [navigation]);

  // Generate bonus levels after path is complete
  const bonusLevels = useMemo((): LevelDef[] => {
    if (!pathComplete || !currentPath) return [];
    const lastStaticLevel = currentPath.levels[currentPath.levels.length - 1].levelNumber;
    return generateBonusLevels(currentPath, lastStaticLevel, 3);
  }, [pathComplete, currentPath]);

  if (!currentPath) return null;

  return (
    <LinearGradient colors={GRADIENT_BG_DEFAULT} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Back button */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>{'\u{2190}'} Back to Map</Text>
        </TouchableOpacity>

        {/* Path header */}
        <View style={styles.header}>
          <Text style={styles.pathEmoji}>{currentPath.emoji}</Text>
          <Text style={styles.pathTitle}>{currentPath.title}</Text>
          <Text style={styles.pathDescription}>{currentPath.description}</Text>
        </View>

        {/* Levels */}
        <View style={styles.levels}>
          {currentPath.levels.map((level) => (
            <LevelCard
              key={level.levelNumber}
              levelNumber={level.levelNumber}
              inputMode={level.inputMode}
              bestStars={getBestStars(continentId, pathId, level.levelNumber)}
              onPress={() => handleLevelPress(level.levelNumber)}
            />
          ))}
        </View>

        {/* Boss preview */}
        <View style={[styles.bossPreview, pathComplete && styles.bossUnlocked]}>
          <Text style={styles.bossEmoji}>{currentPath.bossEmoji}</Text>
          <Text style={pathComplete ? styles.bossTextUnlocked : styles.bossText}>
            {pathComplete ? 'Boss Collected!' : 'Get 3 stars on every level to unlock!'}
          </Text>
        </View>

        {/* Bonus levels (neverending) */}
        {bonusLevels.length > 0 && (
          <View style={styles.bonusSection}>
            <Text style={styles.bonusSectionTitle}>{'\u{267E}'} Bonus Levels</Text>
            <View style={styles.levels}>
              {bonusLevels.map((level) => (
                <LevelCard
                  key={level.levelNumber}
                  levelNumber={level.levelNumber}
                  inputMode={level.inputMode}
                  bestStars={getBestStars(continentId, pathId, level.levelNumber)}
                  onPress={() => handleLevelPress(level.levelNumber)}
                  isBonus
                />
              ))}
            </View>
          </View>
        )}

        {/* Path navigation */}
        <View style={styles.pathNav}>
          <Text style={styles.pathNavTitle}>All Paths</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pathChips}>
              {continent.paths.map((path) => (
                <TouchableOpacity
                  key={path.id}
                  style={[
                    styles.pathChip,
                    path.id === pathId && styles.pathChipActive,
                  ]}
                  onPress={() => handlePathSwitch(path.id)}
                >
                  <Text style={styles.pathChipEmoji}>{path.emoji}</Text>
                  <Text style={[
                    styles.pathChipText,
                    path.id === pathId && styles.pathChipTextActive,
                  ]}>
                    {path.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    fontFamily: FONT_SEMI,
    color: TEXT_SECONDARY,
  },
  header: {
    alignItems: 'center',
    gap: 4,
  },
  pathEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  pathTitle: {
    fontSize: 28,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
  },
  pathDescription: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },
  levels: {
    gap: 12,
  },
  bossPreview: {
    alignItems: 'center',
    opacity: 0.4,
    gap: 8,
    paddingVertical: 20,
  },
  bossUnlocked: {
    opacity: 1,
  },
  bossEmoji: {
    fontSize: 48,
  },
  bossText: {
    fontSize: 14,
    fontFamily: FONT_SEMI,
    color: TEXT_MUTED,
  },
  bossTextUnlocked: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    color: CLOCK_GOLD,
  },
  bonusSection: {
    gap: 12,
  },
  bonusSectionTitle: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: CLOCK_GOLD,
    textAlign: 'center',
  },
  pathNav: {
    gap: 8,
    marginTop: 8,
  },
  pathNavTitle: {
    fontSize: 14,
    fontFamily: FONT_SEMI,
    color: TEXT_MUTED,
  },
  pathChips: {
    flexDirection: 'row',
    gap: 8,
  },
  pathChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a4a6e',
  },
  pathChipActive: {
    borderColor: CLOCK_GOLD,
    backgroundColor: CLOCK_GOLD + '15',
  },
  pathChipEmoji: {
    fontSize: 16,
  },
  pathChipText: {
    fontSize: 13,
    fontFamily: FONT_SEMI,
    color: TEXT_MUTED,
  },
  pathChipTextActive: {
    color: CLOCK_GOLD,
  },
});
