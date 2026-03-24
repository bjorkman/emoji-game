import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../lib/format';
import { useTheme } from '../theme/ThemeContext';

interface Props {
  current: number;
  total: number;
  score: number;
  elapsed: number;
}

export default function ProgressBar({ current, total, score, elapsed }: Readonly<Props>) {
  const { theme } = useTheme();
  const pct = Math.round((current / total) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoText}>Q {current}/{total}</Text>
        <Text style={styles.timer}>{formatTime(elapsed)}</Text>
        <Text style={styles.infoText}>Score: {score}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: theme.secondary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 16 },
  info: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#8888aa' },
  timer: { fontSize: 14, color: '#f0f0f5', fontWeight: '600' },
  track: { height: 6, backgroundColor: '#1a1a2e', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});
