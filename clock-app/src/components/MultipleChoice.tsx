import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { type Feedback } from '../core/types';
import { FONT_BOLD } from '../lib/fonts';
import { TEXT_PRIMARY, COLOR_CORRECT, COLOR_CORRECT_BG, COLOR_WRONG, COLOR_WRONG_BG, BG_CARD } from '../theme/colors';

interface Props {
  choices: string[];
  correctAnswer: string;
  feedback: Feedback;
  onSelect: (choice: string) => void;
}

export default function MultipleChoice({
  choices,
  correctAnswer,
  feedback,
  onSelect,
}: Readonly<Props>) {
  const handlePress = useCallback((choice: string) => {
    if (feedback) return;
    onSelect(choice);
  }, [feedback, onSelect]);

  return (
    <View style={styles.grid}>
      {choices.map((choice) => {
        const isCorrectChoice = choice === correctAnswer;
        const showCorrect = feedback && isCorrectChoice;
        const showWrong = feedback === 'wrong' && !isCorrectChoice;

        return (
          <TouchableOpacity
            key={choice}
            style={[
              styles.button,
              showCorrect && styles.correctButton,
              showWrong && styles.dimButton,
            ]}
            onPress={() => handlePress(choice)}
            disabled={feedback !== null}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.label,
                showCorrect && styles.correctLabel,
              ]}
            >
              {choice}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  button: {
    width: '45%',
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: BG_CARD,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a4a6e',
  },
  correctButton: {
    backgroundColor: COLOR_CORRECT_BG,
    borderColor: COLOR_CORRECT,
  },
  dimButton: {
    opacity: 0.4,
  },
  label: {
    fontSize: 22,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
  },
  correctLabel: {
    color: COLOR_CORRECT,
  },
});
