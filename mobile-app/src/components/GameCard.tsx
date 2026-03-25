import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { type Question, type Difficulty, type Feedback, DIFFICULTY_COLORS } from '../core/types';
import { useTheme } from '../theme/ThemeContext';
import { hapticSelection } from '../lib/haptics';

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

const HINT_DELAY_MS = 5000;

interface Props {
  question: Question;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  feedback: Feedback;
  placeholder: string;
}

export default function GameCard({ question, inputValue, onInputChange, onSubmit, onSkip, feedback, placeholder }: Readonly<Props>) {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [hintQuestionId, setHintQuestionId] = useState<number | null>(null);
  const hintVisible = hintQuestionId === question.id;

  // Auto-focus input on new question
  useEffect(() => {
    if (!feedback) {
      // Small delay to allow re-render before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [feedback, question]);

  // Hint timer
  useEffect(() => {
    if (!question.hint) return;
    const timer = setTimeout(() => setHintQuestionId(question.id), HINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [question]);

  return (
    <View style={styles.card}>
      <View style={[styles.difficultyBadge, { backgroundColor: DIFFICULTY_COLORS[question.difficulty] + '20' }]}>
        <Text style={[styles.difficultyText, { color: DIFFICULTY_COLORS[question.difficulty] }]}>
          {DIFFICULTY_LABELS[question.difficulty]}
        </Text>
      </View>

      <View style={styles.emojiDisplay}>
        {question.clues.map((clue, i) => (
          <Text key={'clue-' + i} style={styles.emoji}>{clue}</Text>
        ))}
      </View>

      {question.hint && (
        <View style={[styles.hint, hintVisible && styles.hintVisible]}>
          <Text style={styles.hintText}>💡 {question.hint}</Text>
        </View>
      )}

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={inputValue}
        onChangeText={onInputChange}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#555"
        editable={!feedback}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="go"
        testID="game-input"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: theme.secondary }, (!!feedback || !inputValue.trim()) && styles.btnDisabled]}
          onPress={() => { hapticSelection(); onSubmit(); }}
          disabled={!!feedback || !inputValue.trim()}
          testID="submit-btn"
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.skipBtn, !!feedback && styles.btnDisabled]}
          onPress={() => { hapticSelection(); onSkip(); }}
          disabled={!!feedback}
          testID="skip-btn"
        >
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: 20, flex: 1 },
  difficultyBadge: { alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 12, marginBottom: 16 },
  difficultyText: { fontSize: 13, fontWeight: '600' },
  emojiDisplay: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  emoji: { fontSize: 48 },
  hint: { opacity: 0, alignItems: 'center', marginBottom: 16 },
  hintVisible: { opacity: 1 },
  hintText: { fontSize: 14, color: '#f59e0b', textAlign: 'center' },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 16,
    color: '#f0f0f5',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#2a2a40',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonRow: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  submitBtn: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32, flex: 1, alignItems: 'center' },
  skipBtn: { backgroundColor: '#2a2a40', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnDisabled: { opacity: 0.4 },
});
