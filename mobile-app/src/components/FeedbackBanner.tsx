import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { type Feedback } from '../core/types';

interface Props {
  feedback: Feedback;
  correctAnswer: string;
}

export default function FeedbackBanner({ feedback, correctAnswer }: Readonly<Props>) {
  if (!feedback) return null;

  const isCorrect = feedback === 'correct';

  return (
    <View style={[styles.banner, isCorrect ? styles.correct : styles.wrong]}>
      {isCorrect ? (
        <Text style={styles.correctText}>Correct! 🎉</Text>
      ) : (
        <Text style={styles.wrongText}>
          The answer was <Text style={styles.bold}>{correctAnswer}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { marginHorizontal: 20, padding: 14, borderRadius: 12, marginBottom: 16, alignItems: 'center' },
  correct: { backgroundColor: 'rgba(34,197,94,0.15)' },
  wrong: { backgroundColor: 'rgba(239,68,68,0.15)' },
  correctText: { fontSize: 16, fontWeight: '600', color: '#22c55e' },
  wrongText: { fontSize: 16, color: '#ef4444' },
  bold: { fontWeight: 'bold' },
});
