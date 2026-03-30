import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type Question, type Difficulty, type Feedback, DIFFICULTY_COLORS } from '../core/types';
import { useTheme } from '../theme/ThemeContext';
import { hapticSelection } from '../lib/haptics';
import { FONT_REGULAR, FONT_SEMI } from '../lib/fonts';
import { BG_DEEP, TEXT_PRIMARY } from '../theme/colors';
import { GradientButton, GlowCircle, SpeechBubble } from './shared';

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
      <GlowCircle emoji={theme.emojiHost} size={64} glowColor={theme.glowColor} />

      <View style={styles.difficultyWrap}>
        <LinearGradient
          colors={[DIFFICULTY_COLORS[question.difficulty] + '30', DIFFICULTY_COLORS[question.difficulty] + '10']}
          style={styles.difficultyBadge}
        >
          <Text style={[styles.difficultyText, { color: DIFFICULTY_COLORS[question.difficulty] }]}>
            {DIFFICULTY_LABELS[question.difficulty]}
          </Text>
        </LinearGradient>
      </View>

      <SpeechBubble bgColor={theme.gradientCard[0] + 'dd'} style={styles.speechBubble}>
        <View style={styles.emojiDisplay}>
          {question.clues.map((clue, i) => (
            <Text key={'clue-' + i} style={styles.emoji}>{clue}</Text>
          ))}
        </View>
      </SpeechBubble>

      {question.hint && (
        <View style={[styles.hint, hintVisible && styles.hintVisible]}>
          <Text style={styles.hintText}>💡 {question.hint}</Text>
        </View>
      )}

      <View style={styles.inputWrap}>
        <LinearGradient
          colors={theme.gradientAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputBorder}
        >
          <View style={styles.inputInner}>
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
          </View>
        </LinearGradient>
      </View>

      <View style={styles.buttonRow}>
        <GradientButton
          label="Submit"
          onPress={() => { hapticSelection(); onSubmit(); }}
          colors={theme.gradientAccent}
          disabled={!!feedback || !inputValue.trim()}
          testID="submit-btn"
          style={styles.submitBtn}
        />
        <GradientButton
          label="Skip"
          onPress={() => { hapticSelection(); onSkip(); }}
          borderOnly
          disabled={!!feedback}
          testID="skip-btn"
          style={styles.skipBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: 20, flex: 1, alignItems: 'center' },
  difficultyWrap: { alignSelf: 'center', marginTop: 12, marginBottom: 16 },
  difficultyBadge: { paddingHorizontal: 16, paddingVertical: 4, borderRadius: 12 },
  difficultyText: { fontSize: 13, fontFamily: FONT_SEMI },
  speechBubble: { width: '100%', marginBottom: 24 },
  emojiDisplay: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8 },
  emoji: { fontSize: 48 },
  hint: { opacity: 0, alignItems: 'center', marginBottom: 16 },
  hintVisible: { opacity: 1 },
  hintText: { fontSize: 14, color: '#f59e0b', textAlign: 'center', fontFamily: FONT_REGULAR },
  inputWrap: { width: '100%', marginBottom: 16 },
  inputBorder: { borderRadius: 16, padding: 2 },
  inputInner: { backgroundColor: BG_DEEP, borderRadius: 14 },
  input: {
    padding: 16,
    color: TEXT_PRIMARY,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FONT_REGULAR,
  },
  buttonRow: { flexDirection: 'row', gap: 12, justifyContent: 'center', width: '100%' },
  submitBtn: { flex: 1 },
  skipBtn: { flex: 0, paddingHorizontal: 24 },
});
