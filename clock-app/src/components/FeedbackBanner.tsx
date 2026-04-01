import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { type Feedback } from '../core/types';
import { FONT_SEMI, FONT_BOLD } from '../lib/fonts';
import { COLOR_CORRECT, COLOR_CORRECT_BG, COLOR_WRONG, COLOR_WRONG_BG } from '../theme/colors';

interface Props {
  feedback: Feedback;
  correctAnswer: string;
}

export default function FeedbackBanner({ feedback, correctAnswer }: Readonly<Props>) {
  if (!feedback) return null;

  const isCorrect = feedback === 'correct';

  return (
    <View
      style={[
        styles.banner,
        isCorrect ? styles.correct : styles.wrong,
        {
          borderColor: isCorrect ? COLOR_CORRECT + '60' : COLOR_WRONG + '60',
          shadowColor: isCorrect ? COLOR_CORRECT : COLOR_WRONG,
        },
      ]}
    >
      {isCorrect ? (
        <Text style={styles.correctText}>Correct! {'\u{1F389}'}</Text>
      ) : (
        <Text style={styles.wrongText}>
          The answer was <Text style={styles.bold}>{correctAnswer}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  correct: { backgroundColor: COLOR_CORRECT_BG },
  wrong: { backgroundColor: COLOR_WRONG_BG },
  correctText: { fontSize: 16, fontFamily: FONT_SEMI, color: COLOR_CORRECT },
  wrongText: { fontSize: 16, color: COLOR_WRONG, fontFamily: FONT_SEMI },
  bold: { fontFamily: FONT_BOLD },
});
