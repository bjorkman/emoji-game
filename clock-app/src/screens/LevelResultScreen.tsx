import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type LevelResultScreenProps } from '../navigation/types';
import { getContinent } from '../continents/registry';
import { useProgressStore } from '../store/progressStore';
import StarDisplay from '../components/StarDisplay';
import { GradientButton, ConfettiOverlay } from '../components/shared';
import { FONT_BOLD, FONT_SEMI } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_SECONDARY, CLOCK_GOLD, GRADIENT_BG_DEFAULT } from '../theme/colors';

const MESSAGES: Record<number, string> = {
  0: 'Keep practicing, you\'ll get there!',
  1: 'Good start! Try again for more stars!',
  2: 'Almost perfect! One more try?',
  3: 'Perfect score! Amazing!',
};

export default function LevelResultScreen({ navigation, route }: Readonly<LevelResultScreenProps>) {
  const { continentId, pathId, levelNumber, score, total, stars, isNewBest } = route.params;

  const continent = getContinent(continentId);
  const path = continent.paths.find((p) => p.id === pathId);
  const isPathComplete = useProgressStore((s) => s.isPathComplete);
  const pathDone = isPathComplete(continentId, pathId);

  // In static levels, check if next level exists; after path completion, bonus levels are infinite
  const hasNextStaticLevel = path?.levels.some((l) => l.levelNumber === levelNumber + 1);
  const hasNextLevel = hasNextStaticLevel || pathDone;

  const handleRetry = useCallback(() => {
    navigation.replace('Level', { continentId, pathId, levelNumber });
  }, [navigation, continentId, pathId, levelNumber]);

  const handleNext = useCallback(() => {
    navigation.replace('Level', { continentId, pathId, levelNumber: levelNumber + 1 });
  }, [navigation, continentId, pathId, levelNumber]);

  const handleBackToPath = useCallback(() => {
    navigation.navigate('Path', { continentId, pathId });
  }, [navigation, continentId, pathId]);

  return (
    <LinearGradient colors={GRADIENT_BG_DEFAULT} style={styles.container}>
      {stars === 3 && <ConfettiOverlay />}

      <View style={styles.content}>
        {/* Stars */}
        <StarDisplay stars={stars} size={56} />

        {/* Score */}
        <Text style={styles.score}>{score} / {total}</Text>

        {/* Message */}
        <Text style={styles.message}>{MESSAGES[stars]}</Text>

        {isNewBest && (
          <Text style={styles.newBest}>{'\u{2B50}'} New Best!</Text>
        )}

        {/* Buttons */}
        <View style={styles.buttons}>
          {stars < 3 && (
            <GradientButton label="Try Again" onPress={handleRetry} />
          )}
          {hasNextLevel && stars > 0 && (
            <GradientButton
              label="Next Level"
              onPress={handleNext}
              colors={['#34d399', '#10b981', '#059669']}
            />
          )}
          {stars === 3 && !hasNextLevel && (
            <GradientButton label="Play Again" onPress={handleRetry} />
          )}
          <GradientButton
            label="Back to Path"
            onPress={handleBackToPath}
            borderOnly
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 20,
  },
  score: {
    fontSize: 48,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
  },
  message: {
    fontSize: 18,
    fontFamily: FONT_SEMI,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },
  newBest: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    color: CLOCK_GOLD,
  },
  buttons: {
    width: '100%',
    gap: 12,
    marginTop: 20,
  },
});
