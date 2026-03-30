import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type Question, DIFFICULTY_COLORS } from '../core/types';
import { useAuthStore } from '../store/authStore';
import { createChallenge, fetchChallenge, linkScoreToChallenge } from '../services/challengeService';
import { useTheme } from '../theme/ThemeContext';
import { hapticSuccess } from '../lib/haptics';
import { getScoreEmoji } from '../core/emojiCharacters';
import { FONT_REGULAR, FONT_SEMI, FONT_BOLD } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_MUTED, NEON_PURPLE } from '../theme/colors';
import { GradientButton, GradientCard, GlowCircle, ConfettiOverlay } from './shared';

interface Props {
  score: number;
  total: number;
  missed: Question[];
  grades: { min: number; label: string }[];
  gameId: string;
  remoteScoreId?: string;
  onNext: () => void;
}

export default function ResultScreen({ score, total, missed, grades, gameId, remoteScoreId, onNext }: Readonly<Props>) {
  const { theme } = useTheme();
  const pct = Math.round((score / total) * 100);
  const grade = grades.find(g => pct >= g.min) ?? grades.at(-1)!;
  const scoreEmoji = getScoreEmoji(pct);
  const { playerId } = useAuthStore();
  const [code, setCode] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const handleChallenge = useCallback(async () => {
    if (!playerId || creating) return;
    setCreating(true);
    const c = await createChallenge(gameId, playerId);
    if (c && remoteScoreId) {
      const challenge = await fetchChallenge(c);
      if (challenge) await linkScoreToChallenge(remoteScoreId, challenge.id);
    }
    setCode(c);
    if (c) hapticSuccess();
    setCreating(false);
  }, [playerId, gameId, remoteScoreId, creating]);

  const handleShare = useCallback(async () => {
    if (!code) return;
    await Share.share({
      message: `Challenge me in Emoji Game! Use code: ${code}`,
    });
  }, [code]);

  return (
    <LinearGradient colors={theme.gradientBg} style={styles.container}>
      {pct >= 80 && <ConfettiOverlay />}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Game Over!</Text>

        <GlowCircle emoji={scoreEmoji.emoji} size={80} glowColor={theme.glowColor} />
        <Text style={styles.reaction}>{scoreEmoji.reaction}</Text>

        <View style={styles.scoreBlock}>
          <Text
            style={[
              styles.scoreNumber,
              {
                color: theme.secondary,
                textShadowColor: theme.glowColor + '80',
              },
            ]}
          >
            {score}
          </Text>
          <Text style={styles.scoreDenom}>/ {total}</Text>
        </View>

        <Text style={styles.grade}>{grade.label}</Text>
        <Text style={styles.pct}>{pct}%</Text>

        <GradientButton
          label="View Leaderboard"
          onPress={onNext}
          colors={theme.gradientAccent}
          testID="leaderboard-btn"
          style={styles.fullWidth}
        />

        {playerId && !code && (
          <View style={styles.fullWidth}>
            {creating ? (
              <View style={styles.loadingWrap}>
                <ActivityIndicator size="small" color={theme.secondary} />
              </View>
            ) : (
              <GradientButton
                label="Challenge Friends"
                onPress={handleChallenge}
                borderOnly
                testID="challenge-btn"
                style={styles.challengeBtn}
              />
            )}
          </View>
        )}

        {code && (
          <GradientCard glowColor={theme.glowColor} style={styles.challengeWrap}>
            <Text style={styles.challengeHint}>Share this code with friends:</Text>
            <View style={styles.codeRow}>
              <Text style={styles.codeText}>{code}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={handleShare} testID="share-btn">
                <Text style={styles.copyBtnText}>📋 Share</Text>
              </TouchableOpacity>
            </View>
          </GradientCard>
        )}

        {missed.length > 0 && (
          <View style={styles.missedSection}>
            <Text style={styles.missedHeading}>Missed ({missed.length})</Text>
            <GradientCard colors={theme.gradientCard} style={styles.missedCard}>
              {missed.map(q => (
                <View key={q.id} style={styles.missedRow}>
                  <Text style={styles.missedPrefix}>🤷</Text>
                  <Text style={styles.missedEmojis}>{q.clues.join(' ')}</Text>
                  <Text style={styles.missedAnswer}>{q.answer}</Text>
                  <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[q.difficulty] + '20' }]}>
                    <Text style={[styles.diffText, { color: DIFFICULTY_COLORS[q.difficulty] }]}>
                      {q.difficulty}
                    </Text>
                  </View>
                </View>
              ))}
            </GradientCard>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40, alignItems: 'center' },
  heading: { fontSize: 28, fontFamily: FONT_BOLD, color: TEXT_PRIMARY, marginBottom: 24 },
  reaction: { fontSize: 16, fontFamily: FONT_SEMI, color: TEXT_MUTED, marginTop: 12, marginBottom: 8 },
  scoreBlock: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  scoreNumber: {
    fontSize: 64,
    fontFamily: FONT_BOLD,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  scoreDenom: { fontSize: 28, color: TEXT_MUTED, marginLeft: 4, fontFamily: FONT_REGULAR },
  grade: { fontSize: 28, textAlign: 'center', marginBottom: 4, fontFamily: FONT_BOLD },
  pct: { fontSize: 18, color: TEXT_MUTED, marginBottom: 32, fontFamily: FONT_REGULAR },
  fullWidth: { width: '100%', marginBottom: 12 },
  loadingWrap: { paddingVertical: 16, alignItems: 'center' },
  challengeBtn: { marginBottom: 0 },
  challengeWrap: { width: '100%', marginBottom: 24 },
  challengeHint: { fontSize: 13, color: TEXT_MUTED, marginBottom: 8, fontFamily: FONT_REGULAR },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codeText: { fontSize: 22, fontFamily: FONT_BOLD, color: TEXT_PRIMARY, letterSpacing: 2 },
  copyBtn: { backgroundColor: NEON_PURPLE + '33', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  copyBtnText: { color: TEXT_PRIMARY, fontFamily: FONT_SEMI },
  missedSection: { width: '100%', marginTop: 16 },
  missedHeading: { fontSize: 18, fontFamily: FONT_SEMI, color: TEXT_PRIMARY, marginBottom: 12 },
  missedCard: { padding: 8 },
  missedRow: { flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 4, gap: 8 },
  missedPrefix: { fontSize: 18 },
  missedEmojis: { fontSize: 20 },
  missedAnswer: { flex: 1, fontSize: 15, fontFamily: FONT_SEMI, color: TEXT_PRIMARY },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8 },
  diffText: { fontSize: 11, fontFamily: FONT_SEMI, textTransform: 'capitalize' },
});
