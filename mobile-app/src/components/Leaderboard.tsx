import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import { fetchGlobalLeaderboard, fetchFriendsLeaderboard, type LeaderboardEntry } from '../services/scoreService';
import { fetchChallengeLeaderboard } from '../services/challengeService';
import { formatTime } from '../lib/format';
import { useTheme } from '../theme/ThemeContext';
import { FONT_REGULAR, FONT_SEMI, FONT_BOLD } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_MUTED } from '../theme/colors';
import { GradientButton } from './shared';

type Tab = 'local' | 'global' | 'friends' | 'challenge';

const MEDAL_EMOJIS = ['🥇', '🥈', '🥉'];
const MEDAL_GLOWS = ['#fbbf24', '#94a3b8', '#d97706'];

interface Props {
  gameId: string;
  gameTitle: string;
  latestId: string;
  challengeId?: string;
  onReplay: () => void;
}

interface Row {
  id: string;
  nickname?: string;
  score: number;
  total: number;
  duration?: number | null;
}

export default function Leaderboard({ gameId, gameTitle, latestId, challengeId, onReplay }: Readonly<Props>) {
  const { theme } = useTheme();
  const highScores = usePlayerStore((s) => s.highScores);
  const { playerId } = useAuthStore();

  const defaultTab: Tab = challengeId ? 'challenge' : 'local';
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [remoteRows, setRemoteRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'local') return;
    if (!playerId) return;

    let cancelled = false;
    setLoading(true);
    let fetchPromise: Promise<LeaderboardEntry[]>;
    if (activeTab === 'global') {
      fetchPromise = fetchGlobalLeaderboard(gameId);
    } else if (activeTab === 'friends') {
      fetchPromise = fetchFriendsLeaderboard(gameId, playerId);
    } else if (activeTab === 'challenge' && challengeId) {
      fetchPromise = fetchChallengeLeaderboard(challengeId);
    } else {
      setLoading(false);
      return;
    }

    fetchPromise.then((rows) => {
      if (!cancelled) {
        setRemoteRows(rows);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [activeTab, gameId, playerId, challengeId]);

  const sorted = useMemo(() =>
    highScores
      .filter((s) => s.gameId === gameId)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (a.duration ?? Infinity) - (b.duration ?? Infinity);
      }),
    [highScores, gameId]
  );
  const top10 = sorted.slice(0, 10);
  const playerRank = sorted.findIndex((s) => s.id === latestId) + 1;
  const inTop10 = playerRank >= 1 && playerRank <= 10;

  const rows: Row[] = activeTab === 'local'
    ? top10.map(e => ({ id: e.id, nickname: e.nickname, score: e.score, total: e.total, duration: e.duration }))
    : remoteRows;

  const highlightId = activeTab === 'local' ? latestId : undefined;

  return (
    <LinearGradient colors={theme.gradientBg} style={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.trophy}>🏆</Text>
        <View>
          <Text
            style={[
              styles.heading,
              { textShadowColor: theme.glowColor + '60' },
            ]}
          >
            {gameTitle}
          </Text>
          <Text style={styles.subheading}>Leaderboard</Text>
        </View>
      </View>

      {!!playerId && (
        <View style={styles.tabs}>
          {(['local', 'global', 'friends'] as Tab[]).map((t) => {
            const isActive = activeTab === t;
            return (
              <TouchableOpacity
                key={t}
                style={styles.tab}
                onPress={() => setActiveTab(t)}
                testID={`tab-${t}`}
              >
                {isActive ? (
                  <LinearGradient
                    colors={theme.gradientAccent}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tabGradient}
                  >
                    <Text style={[styles.tabText, styles.tabTextActive]}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.tabInactive, { borderColor: theme.glowColor + '40' }]}>
                    <Text style={styles.tabText}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
          {challengeId && (
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setActiveTab('challenge')}
              testID="tab-challenge"
            >
              {activeTab === 'challenge' ? (
                <LinearGradient
                  colors={theme.gradientAccent}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={[styles.tabText, styles.tabTextActive]}>Challenge</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.tabInactive, { borderColor: theme.glowColor + '40' }]}>
                  <Text style={styles.tabText}>Challenge</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      {loading && (
        <ActivityIndicator size="large" color={theme.secondary} style={styles.loader} />
      )}
      {!loading && rows.length === 0 && (
        <Text style={styles.empty}>No scores yet.</Text>
      )}
      {!loading && rows.length > 0 && (
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.rankCol]}>#</Text>
          <Text style={[styles.headerCell, styles.nameCol]}>Player</Text>
          <Text style={[styles.headerCell, styles.scoreCol]}>Score</Text>
          <Text style={[styles.headerCell, styles.timeCol]}>Time</Text>
        </View>
      )}

      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const pct = Math.round((item.score / item.total) * 100);
          const isHighlight = item.id === highlightId;
          const medal = index < 3 ? MEDAL_EMOJIS[index] : null;
          const medalGlow = index < 3 ? MEDAL_GLOWS[index] : null;
          return (
            <View
              style={[
                styles.row,
                isHighlight && {
                  borderColor: theme.glowColor + '60',
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: theme.secondary + '15',
                },
                medalGlow && {
                  shadowColor: medalGlow,
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 0 },
                },
              ]}
              testID={isHighlight ? 'highlight-row' : undefined}
            >
              <Text style={[styles.cell, styles.rankCol, styles.rankText]}>
                {medal ?? (index + 1)}
              </Text>
              <Text style={[styles.cell, styles.nameCol]} numberOfLines={1}>{item.nickname ?? 'Anonymous'}</Text>
              <View style={styles.scoreCol}>
                <Text style={styles.scoreVal}>{item.score}/{item.total}</Text>
                <Text style={styles.scorePctText}>{pct}%</Text>
              </View>
              <Text style={[styles.cell, styles.timeCol, styles.timeText]}>{formatTime(item.duration)}</Text>
            </View>
          );
        }}
        style={styles.list}
      />

      {activeTab === 'local' && !inTop10 && playerRank > 0 && (
        <Text style={styles.rankNote}>You ranked #{playerRank} — keep going!</Text>
      )}

      <View style={styles.actions}>
        <GradientButton
          label="Play Again"
          onPress={onReplay}
          colors={theme.gradientAccent}
          testID="replay-btn"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 4 },
  trophy: { fontSize: 28 },
  heading: {
    fontSize: 24,
    fontFamily: FONT_BOLD,
    color: TEXT_PRIMARY,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  subheading: { fontSize: 14, color: TEXT_MUTED, textAlign: 'center', marginBottom: 20, fontFamily: FONT_SEMI },
  tabs: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 20, gap: 6 },
  tab: { flex: 1 },
  tabGradient: { paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabInactive: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1 },
  tabText: { fontSize: 13, color: TEXT_MUTED, fontFamily: FONT_SEMI },
  tabTextActive: { color: TEXT_PRIMARY },
  loader: { marginTop: 40 },
  empty: { fontSize: 15, color: '#555', textAlign: 'center', marginTop: 40, fontFamily: FONT_REGULAR },
  tableHeader: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#1a1a2e' },
  headerCell: { fontSize: 12, color: '#555', fontFamily: FONT_SEMI },
  list: { flex: 1, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#14142a' },
  cell: { fontSize: 14, color: TEXT_PRIMARY, fontFamily: FONT_REGULAR },
  rankCol: { width: 32 },
  rankText: { fontFamily: FONT_BOLD, color: TEXT_MUTED },
  nameCol: { flex: 1 },
  scoreCol: { width: 80, alignItems: 'flex-end' },
  scoreVal: { fontSize: 14, fontFamily: FONT_SEMI, color: TEXT_PRIMARY },
  scorePctText: { fontSize: 11, color: TEXT_MUTED, fontFamily: FONT_REGULAR },
  timeCol: { width: 56, textAlign: 'right' },
  timeText: { color: TEXT_MUTED, fontFamily: FONT_REGULAR },
  rankNote: { fontSize: 13, color: TEXT_MUTED, textAlign: 'center', marginTop: 8, paddingHorizontal: 16, fontFamily: FONT_REGULAR },
  actions: { paddingHorizontal: 16, paddingVertical: 20 },
});
