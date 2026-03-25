import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, StyleSheet, ActivityIndicator } from 'react-native';
import { type Question, DIFFICULTY_COLORS } from '../core/types';
import { useAuthStore } from '../store/authStore';
import { createChallenge, fetchChallenge, linkScoreToChallenge } from '../services/challengeService';
import { useTheme } from '../theme/ThemeContext';
import { hapticSuccess } from '../lib/haptics';

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Game Over!</Text>

      <View style={styles.scoreBlock}>
        <Text style={[styles.scoreNumber, { color: theme.secondary }]}>{score}</Text>
        <Text style={styles.scoreDenom}>/ {total}</Text>
      </View>

      <Text style={styles.grade}>{grade.label}</Text>
      <Text style={styles.pct}>{pct}%</Text>

      <TouchableOpacity
        style={[styles.primaryBtn, { backgroundColor: theme.secondary }]}
        onPress={onNext}
        testID="leaderboard-btn"
      >
        <Text style={styles.primaryBtnText}>View Leaderboard</Text>
      </TouchableOpacity>

      {playerId && !code && (
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={handleChallenge}
          disabled={creating}
          testID="challenge-btn"
        >
          {creating ? (
            <ActivityIndicator size="small" color="#a78bfa" />
          ) : (
            <Text style={styles.secondaryBtnText}>Challenge Friends</Text>
          )}
        </TouchableOpacity>
      )}

      {code && (
        <View style={styles.challengeWrap}>
          <Text style={styles.challengeHint}>Share this code with friends:</Text>
          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{code}</Text>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare} testID="share-btn">
              <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {missed.length > 0 && (
        <View style={styles.missedSection}>
          <Text style={styles.missedHeading}>Missed ({missed.length})</Text>
          {missed.map(q => (
            <View key={q.id} style={styles.missedRow}>
              <Text style={styles.missedEmojis}>{q.clues.join(' ')}</Text>
              <Text style={styles.missedAnswer}>{q.answer}</Text>
              <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[q.difficulty] + '20' }]}>
                <Text style={[styles.diffText, { color: DIFFICULTY_COLORS[q.difficulty] }]}>
                  {q.difficulty}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d1a' },
  content: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40, alignItems: 'center' },
  heading: { fontSize: 28, fontWeight: 'bold', color: '#f0f0f5', marginBottom: 24 },
  scoreBlock: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  scoreNumber: { fontSize: 64, fontWeight: 'bold' },
  scoreDenom: { fontSize: 28, color: '#8888aa', marginLeft: 4 },
  grade: { fontSize: 28, textAlign: 'center', marginBottom: 4 },
  pct: { fontSize: 18, color: '#8888aa', marginBottom: 32 },
  primaryBtn: { width: '100%', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secondaryBtn: { width: '100%', paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: '#2a2a40', alignItems: 'center', marginBottom: 12 },
  secondaryBtnText: { color: '#a78bfa', fontSize: 16, fontWeight: '600' },
  challengeWrap: { width: '100%', backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 24 },
  challengeHint: { fontSize: 13, color: '#8888aa', marginBottom: 8 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codeText: { fontSize: 20, fontWeight: 'bold', color: '#f0f0f5', letterSpacing: 2 },
  shareBtn: { backgroundColor: '#a78bfa', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  shareBtnText: { color: '#fff', fontWeight: '600' },
  missedSection: { width: '100%', marginTop: 16 },
  missedHeading: { fontSize: 18, fontWeight: '600', color: '#f0f0f5', marginBottom: 12 },
  missedRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a2e', borderRadius: 12, padding: 12, marginBottom: 8, gap: 10 },
  missedEmojis: { fontSize: 20 },
  missedAnswer: { flex: 1, fontSize: 15, fontWeight: '600', color: '#f0f0f5' },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8 },
  diffText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
});
