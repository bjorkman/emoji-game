import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { type Feedback } from '../core/types';
import { FONT_BOLD, FONT_SEMI } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_MUTED, BG_CARD, BORDER_DEFAULT, CLOCK_GOLD } from '../theme/colors';

interface Props {
  feedback: Feedback;
  onSubmit: (value: string) => void;
  onSkip: () => void;
}

export default function TimeInput({ feedback, onSubmit, onSkip }: Readonly<Props>) {
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Auto-focus when feedback clears (new question)
  useEffect(() => {
    if (!feedback) {
      setValue('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [feedback]);

  const handleChange = useCallback((text: string) => {
    // Allow digits, colon, dot, space, and AM/PM letters
    let cleaned = text.replace(/[^0-9.:aAmMpP ]/g, '');
    // Auto-insert colon after 1-2 digits if user hasn't typed one (only for numeric prefix)
    const numericPrefix = cleaned.match(/^[0-9]+/)?.[0] ?? '';
    const rest = cleaned.slice(numericPrefix.length);
    if (!numericPrefix.includes(':') && !numericPrefix.includes('.') && numericPrefix.length > 2) {
      cleaned = numericPrefix.slice(0, -2) + ':' + numericPrefix.slice(-2) + rest;
    }
    setValue(cleaned);
  }, []);

  const handleSubmit = useCallback(() => {
    if (feedback || !value.trim()) return;
    onSubmit(value);
  }, [feedback, value, onSubmit]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        placeholder="Type the time (e.g. 3:00 PM)"
        placeholderTextColor={TEXT_MUTED}
        keyboardType="default"
        autoCorrect={false}
        autoCapitalize="characters"
        editable={!feedback}
        maxLength={8}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={feedback !== null || !value.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.submitLabel}>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onSkip}
          disabled={feedback !== null}
          activeOpacity={0.8}
        >
          <Text style={styles.skipLabel}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 12,
  },
  input: {
    backgroundColor: BG_CARD,
    borderWidth: 2,
    borderColor: BORDER_DEFAULT,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 24,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  submitButton: {
    flex: 2,
    backgroundColor: CLOCK_GOLD,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitLabel: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: '#1e293b',
  },
  skipButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  skipLabel: {
    fontSize: 16,
    fontFamily: FONT_SEMI,
    color: TEXT_MUTED,
  },
});
