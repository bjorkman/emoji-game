import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { type GameConfig } from '../core/types';
import { FLOATING_EMOJIS } from '../core/emojiCharacters';
import { FONT_REGULAR, FONT_SEMI, FONT_BOLD } from '../lib/fonts';
import { TEXT_MUTED, TEXT_SECONDARY, BG_CARD, BG_CARD_TRANSLUCENT_HEAVY } from '../theme/colors';
import { GradientButton, GlowCircle, SpeechBubble, FloatingEmojis } from './shared';

interface Props {
  config: GameConfig;
  onPlay: () => void;
  onChooseGame: () => void;
}

export default function SplashScreen({ config, onPlay, onChooseGame }: Readonly<Props>) {
  const { theme } = useTheme();
  const { title, eyebrow, tagline, instructions } = config;
  const floats = FLOATING_EMOJIS[config.id] ?? [];

  return (
    <LinearGradient
      colors={theme.gradientBg}
      style={styles.container}
    >
      <FloatingEmojis emojis={floats} />
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <GlowCircle emoji={theme.emojiHost} size={56} glowColor={theme.glowColor} />

        <Text style={styles.eyebrow}>{eyebrow}</Text>

        <Text
          style={[
            styles.title,
            {
              color: theme.secondary,
              textShadowColor: theme.glowColor + '80',
            },
          ]}
        >
          {title}
        </Text>

        <SpeechBubble bgColor={BG_CARD + 'cc'} style={styles.speechBubble}>
          <Text style={styles.tagline}>{tagline}</Text>
        </SpeechBubble>

        <View style={styles.instructions}>
          {instructions.map(([icon, text]) => (
            <View key={text} style={styles.instructionRow}>
              <Text style={styles.instructionIcon}>{icon}</Text>
              <Text style={styles.instructionText}>{text}</Text>
            </View>
          ))}
        </View>

        <GradientButton
          label="Play Now"
          onPress={onPlay}
          colors={theme.gradientAccent}
          testID="play-btn"
          style={styles.playBtn}
        />

        <TouchableOpacity onPress={onChooseGame} style={styles.chooseBtn}>
          <Text style={styles.chooseBtnText}>Choose Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  eyebrow: {
    fontSize: 14,
    color: TEXT_MUTED,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 16,
    fontFamily: FONT_SEMI,
  },
  title: {
    fontSize: 42,
    fontFamily: FONT_BOLD,
    textAlign: 'center',
    marginBottom: 8,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  speechBubble: { marginBottom: 32 },
  tagline: {
    fontSize: 16,
    color: TEXT_MUTED,
    textAlign: 'center',
    fontFamily: FONT_REGULAR,
  },
  instructions: { width: '100%', marginBottom: 40 },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: BG_CARD_TRANSLUCENT_HEAVY,
    borderRadius: 10,
  },
  instructionIcon: { fontSize: 20, marginRight: 12, width: 28 },
  instructionText: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    flex: 1,
    fontFamily: FONT_SEMI,
  },
  playBtn: { width: '100%', marginBottom: 16 },
  chooseBtn: { paddingVertical: 12 },
  chooseBtnText: {
    color: TEXT_MUTED,
    fontSize: 15,
    fontFamily: FONT_REGULAR,
  },
});
