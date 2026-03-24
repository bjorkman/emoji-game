import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import {
  fetchGlobalLeaderboard,
  fetchFriendsLeaderboard,
  fetchChallengeLeaderboard,
  type LeaderboardEntry,
} from '../lib/db';
import { formatTime } from '../lib/format';
import { useTheme } from '../theme/ThemeContext';

type Tab = 'local' | 'global' | 'friends' | 'challenge';

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
    <View style={styles.container}>
      <Text style={styles.heading}>{gameTitle}</Text>
      <Text style={styles.subheading}>Leaderboard</Text>

      {!!playerId && (
        <View style={styles.tabs}>
          {(['local', 'global', 'friends'] as Tab[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, activeTab === t && { backgroundColor: theme.secondary }]}
              onPress={() => setActiveTab(t)}
              testID={`tab-${t}`}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
          {challengeId && (
            <TouchableOpacity
              style={[styles.tab, activeTab === 'challenge' && { backgroundColor: theme.secondary }]}
              onPress={() => setActiveTab('challenge')}
              testID="tab-challenge"
            >
              <Text style={[styles.tabText, activeTab === 'challenge' && styles.tabTextActive]}>
                Challenge
              </Text>
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
          return (
            <View style={[styles.row, isHighlight && { backgroundColor: theme.secondary + '20' }]} testID={isHighlight ? 'highlight-row' : undefined}>
              <Text style={[styles.cell, styles.rankCol, styles.rankText]}>{index + 1}</Text>
              <Text style={[styles.cell, styles.nameCol]} numberOfLines={1}>{item.nickname ?? 'Anonymous'}</Text>
              <View style={styles.scoreCol}>
                <Text style={styles.scoreVal}>{item.score}/{item.total}</Text>
                <Text style={styles.scorePct}>{pct}%</Text>
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
        <TouchableOpacity
          style={[styles.replayBtn, { backgroundColor: theme.secondary }]}
          onPress={onReplay}
          testID="replay-btn"
        >
          <Text style={styles.replayBtnText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d1a', paddingTop: 60 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#f0f0f5', textAlign: 'center' },
  subheading: { fontSize: 14, color: '#8888aa', textAlign: 'center', marginBottom: 20 },
  tabs: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 20, gap: 6 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#1a1a2e', alignItems: 'center' },
  tabText: { fontSize: 13, color: '#8888aa', fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  loader: { marginTop: 40 },
  empty: { fontSize: 15, color: '#555', textAlign: 'center', marginTop: 40 },
  tableHeader: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#1a1a2e' },
  headerCell: { fontSize: 12, color: '#555', fontWeight: '600' },
  list: { flex: 1, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#14142a' },
  cell: { fontSize: 14, color: '#f0f0f5' },
  rankCol: { width: 32 },
  rankText: { fontWeight: 'bold', color: '#8888aa' },
  nameCol: { flex: 1 },
  scoreCol: { width: 80, alignItems: 'flex-end' },
  scoreVal: { fontSize: 14, fontWeight: '600', color: '#f0f0f5' },
  scorePct: { fontSize: 11, color: '#8888aa' },
  timeCol: { width: 56, textAlign: 'right' },
  timeText: { color: '#8888aa' },
  rankNote: { fontSize: 13, color: '#8888aa', textAlign: 'center', marginTop: 8, paddingHorizontal: 16 },
  actions: { paddingHorizontal: 16, paddingVertical: 20 },
  replayBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  replayBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
