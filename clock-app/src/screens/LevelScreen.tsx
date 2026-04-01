import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type LevelScreenProps } from '../navigation/types';
import { type StarRating, type LevelDef } from '../core/types';
import { getContinent } from '../continents/registry';
import { generateBonusLevel } from '../core/bonusGenerator';
import DigitalClock from '../components/DigitalClock';
import { useProgressStore } from '../store/progressStore';
import LevelEngine from '../core/LevelEngine';
import AnalogClock from '../components/AnalogClock';
import MultipleChoice from '../components/MultipleChoice';
import TimeInput from '../components/TimeInput';
import ProgressDots from '../components/ProgressDots';
import FeedbackBanner from '../components/FeedbackBanner';
import { FONT_SEMI } from '../lib/fonts';
import { TEXT_SECONDARY, GRADIENT_BG_DEFAULT } from '../theme/colors';

export default function LevelScreen({ navigation, route }: Readonly<LevelScreenProps>) {
  const { continentId, pathId, levelNumber } = route.params;
  const recordStars = useProgressStore((s) => s.recordStars);
  const getBestStars = useProgressStore((s) => s.getBestStars);

  const continent = getContinent(continentId);
  const path = continent.paths.find((p) => p.id === pathId);

  // Look up level in static data first, then generate bonus level if not found
  const levelDef = useMemo((): LevelDef | undefined => {
    if (!path) return undefined;
    const staticLevel = path.levels.find((l) => l.levelNumber === levelNumber);
    if (staticLevel) return staticLevel;
    // Bonus level — generate it directly
    const lastStaticLevel = path.levels[path.levels.length - 1].levelNumber;
    if (levelNumber > lastStaticLevel) {
      return generateBonusLevel(path, levelNumber);
    }
    return undefined;
  }, [path, levelNumber]);

  const handleFinish = useCallback((score: number, total: number, stars: StarRating) => {
    const previousBest = getBestStars(continentId, pathId, levelNumber);
    recordStars(continentId, pathId, levelNumber, stars);

    navigation.replace('LevelResult', {
      continentId,
      pathId,
      levelNumber,
      score,
      total,
      stars,
      isNewBest: stars > previousBest,
    });
  }, [continentId, pathId, levelNumber, recordStars, getBestStars, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!path || !levelDef) return null;

  return (
    <LinearGradient colors={GRADIENT_BG_DEFAULT} style={styles.container}>
      {/* Header with cancel */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>{'\u{2190}'} Quit</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {path.title} — Level {levelNumber}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <LevelEngine
        levelDef={levelDef}
        onFinish={handleFinish}
        renderPlaying={({ question, onAnswer, onSkip, feedback, current, total, score }) => (
          <View style={styles.gameContent}>
            {/* Progress */}
            <ProgressDots current={current} total={total} />
            <Text style={styles.scoreText}>{score}/{current - (feedback ? 0 : 1)}</Text>

            {/* Clock display */}
            <View style={styles.clockContainer}>
              {question.displayMode === 'analog' ? (
                <AnalogClock hour={question.hour} minute={question.minute} size={260} />
              ) : (
                <DigitalClock
                  hour={question.hour}
                  minute={question.minute}
                  mode={question.displayMode}
                  size={260}
                />
              )}
            </View>

            {/* Feedback */}
            <FeedbackBanner feedback={feedback} correctAnswer={question.correctAnswer} />

            {/* Input */}
            {levelDef.inputMode === 'multipleChoice' && question.choices ? (
              <MultipleChoice
                choices={question.choices}
                correctAnswer={question.correctAnswer}
                feedback={feedback}
                onSelect={onAnswer}
              />
            ) : (
              <TimeInput
                feedback={feedback}
                onSubmit={onAnswer}
                onSkip={onSkip}
              />
            )}
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 8,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: FONT_SEMI,
    color: TEXT_SECONDARY,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: FONT_SEMI,
    color: TEXT_SECONDARY,
  },
  headerSpacer: {
    width: 50,
  },
  gameContent: {
    flex: 1,
    paddingTop: 8,
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONT_SEMI,
    color: TEXT_SECONDARY,
    marginBottom: 8,
  },
  clockContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
