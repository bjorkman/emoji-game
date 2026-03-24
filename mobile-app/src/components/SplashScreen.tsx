import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { type GameConfig } from '../core/types';

interface Props {
  config: GameConfig;
  onPlay: () => void;
  onChooseGame: () => void;
}

export default function SplashScreen({ config, onPlay, onChooseGame }: Readonly<Props>) {
  const { theme } = useTheme();
  const { title, eyebrow, tagline, instructions } = config;

  return (
    <LinearGradient
      colors={[theme.splashBg, '#0d0d1a']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>

        <Text style={[styles.title, { color: theme.secondary }]}>{title}</Text>
        <Text style={styles.tagline}>{tagline}</Text>

        <View style={styles.instructions}>
          {instructions.map(([icon, text]) => (
            <View key={text} style={styles.instructionRow}>
              <Text style={styles.instructionIcon}>{icon}</Text>
              <Text style={styles.instructionText}>{text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.playBtn, { backgroundColor: theme.secondary }]}
          onPress={onPlay}
          activeOpacity={0.8}
          testID="play-btn"
        >
          <Text style={styles.playBtnText}>Play Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onChooseGame} style={styles.chooseBtn}>
          <Text style={styles.chooseBtnText}>Choose Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, paddingVertical: 60 },
  eyebrow: { fontSize: 14, color: '#8888aa', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  tagline: { fontSize: 16, color: '#8888aa', textAlign: 'center', marginBottom: 32 },
  instructions: { width: '100%', marginBottom: 40 },
  instructionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingHorizontal: 8 },
  instructionIcon: { fontSize: 20, marginRight: 12, width: 28 },
  instructionText: { fontSize: 15, color: '#c0c0d0', flex: 1 },
  playBtn: { width: '100%', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  playBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  chooseBtn: { paddingVertical: 12 },
  chooseBtnText: { color: '#8888aa', fontSize: 15 },
});
