import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_BOLD } from '../lib/fonts';
import { toHour12 } from '../core/clockLogic';

interface Props {
  hour: number;
  minute: number;
  mode: 'digital24' | 'digital12';
  size?: number;
}

const DISPLAY_BG = '#0f172a';
const DISPLAY_BORDER = '#334155';
const DIGIT_COLOR = '#22d3ee';
const PERIOD_COLOR = '#67e8f9';

export default function DigitalClock({
  hour,
  minute,
  mode,
  size = 260,
}: Readonly<Props>) {
  const mm = minute.toString().padStart(2, '0');
  let displayText: string;
  let periodText: string | null = null;

  if (mode === 'digital24') {
    displayText = `${hour.toString().padStart(2, '0')}:${mm}`;
  } else {
    const { h12, period } = toHour12(hour);
    displayText = `${h12}:${mm}`;
    periodText = period;
  }

  const fontSize = size * 0.28;
  const periodFontSize = size * 0.12;

  return (
    <View style={[styles.container, { width: size, height: size * 0.65 }]}>
      <View style={styles.display}>
        <View style={styles.timeRow}>
          <Text style={[styles.time, { fontSize }]}>{displayText}</Text>
          {periodText && (
            <Text style={[styles.period, { fontSize: periodFontSize }]}>{periodText}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    backgroundColor: DISPLAY_BG,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: DISPLAY_BORDER,
    paddingHorizontal: 32,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  time: {
    fontFamily: FONT_BOLD,
    color: DIGIT_COLOR,
    letterSpacing: 4,
  },
  period: {
    fontFamily: FONT_BOLD,
    color: PERIOD_COLOR,
  },
});
