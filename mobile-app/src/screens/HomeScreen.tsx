import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';
import { type HomeScreenProps } from '../navigation/types';
import REGISTRY from '../games/registry';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import { fetchChallenge } from '../lib/db';
import { formatTime } from '../lib/format';
import { type GameConfig } from '../core/types';

// ─── Nickname Gate ──────────────────────────────────────────────────────────

function NicknameGate() {
  const setNickname = usePlayerStore((s) => s.setNickname);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    if (value.trim()) setNickname(value);
  }, [value, setNickname]);

  return (
    <View style={styles.nicknameGate}>
      <View style={styles.nicknameCard}>
        <Text style={styles.nicknameHeading}>What's your name?</Text>
        <Text style={styles.nicknameSubtext}>We'll remember it for next time.</Text>
        <TextInput
          style={styles.nicknameInput}
          placeholder="Enter a nickname..."
          placeholderTextColor="#555"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
          maxLength={24}
          autoFocus
          autoCorrect={false}
          returnKeyType="go"
        />
        <TouchableOpacity
          style={[styles.nicknameBtn, !value.trim() && styles.btnDisabled]}
          onPress={handleSubmit}
          disabled={!value.trim()}
        >
          <Text style={styles.btnText}>Let's play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Game Card ──────────────────────────────────────────────────────────────

function GameCardItem({ game, onPress }: Readonly<{ game: GameConfig; onPress: () => void }>) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.cardTitle}>{game.title}</Text>
      <Text style={styles.cardTagline}>{game.tagline}</Text>
      <Text style={styles.cardMeta}>
        {game.questionCount ?? game.questions.length} questions
      </Text>
      <Text style={styles.cardCta}>Play</Text>
    </TouchableOpacity>
  );
}

// ─── Scores List ────────────────────────────────────────────────────────────

function ScoresList() {
  const highScores = usePlayerStore((s) => s.highScores);
  if (highScores.length === 0) return null;

  const recent = highScores.slice(0, 10);

  return (
    <View style={styles.scoresSection}>
      <Text style={styles.sectionHeading}>Recent Scores</Text>
      {recent.map((entry) => {
        const pct = Math.round((entry.score / entry.total) * 100);
        const date = new Date(entry.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        });
        return (
          <View key={entry.id} style={styles.scoreRow}>
            <View style={styles.scoreLeft}>
              <Text style={styles.scoreGame}>{entry.gameTitle}</Text>
              <Text style={styles.scoreMeta}>{date} · {formatTime(entry.duration)}</Text>
            </View>
            <View style={styles.scoreRight}>
              <Text style={styles.scoreValue}>{entry.score}/{entry.total}</Text>
              <Text style={styles.scorePct}>{pct}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

// ─── Challenge Join ─────────────────────────────────────────────────────────

function ChallengeJoin({ navigation }: Readonly<{ navigation: HomeScreenProps['navigation'] }>) {
  const playerId = useAuthStore((s) => s.playerId);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = useCallback(async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setError('');
    setLoading(true);
    const challenge = await fetchChallenge(trimmed);
    setLoading(false);
    if (!challenge) {
      setError('Challenge not found. Check the code and try again.');
      return;
    }
    navigation.navigate('Game', { gameId: challenge.game_id, challengeId: challenge.id });
  }, [code, navigation]);

  if (!playerId) return null;

  return (
    <View style={styles.challengeSection}>
      <Text style={styles.sectionHeading}>Join a Challenge</Text>
      <View style={styles.challengeRow}>
        <TextInput
          style={styles.challengeInput}
          placeholder="Enter code (e.g. KPOP-XK7P)"
          placeholderTextColor="#555"
          value={code}
          onChangeText={setCode}
          onSubmitEditing={handleJoin}
          maxLength={12}
          autoCorrect={false}
          autoCapitalize="characters"
          returnKeyType="go"
        />
        <TouchableOpacity
          style={[styles.challengeBtn, (!code.trim() || loading) && styles.btnDisabled]}
          onPress={handleJoin}
          disabled={!code.trim() || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnText}>Join</Text>
          )}
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.challengeError}>{error}</Text> : null}
    </View>
  );
}

// ─── Home Screen ────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const nickname = usePlayerStore((s) => s.nickname);
  const setNickname = usePlayerStore((s) => s.setNickname);
  const playerId = useAuthStore((s) => s.playerId);
  const games = Object.values(REGISTRY);

  if (!nickname?.trim()) return <NicknameGate />;

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <Text style={styles.logo}>Emoji Games</Text>
        <View style={styles.playerRow}>
          <Text style={styles.playerName}>Playing as {nickname}</Text>
          <TouchableOpacity onPress={() => setNickname('')}>
            <Text style={styles.changeBtn}>change</Text>
          </TouchableOpacity>
          {playerId && (
            <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
              <Text style={styles.friendsLink}>Friends</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.grid}>
        {games.map((game) => (
          <GameCardItem
            key={game.id}
            game={game}
            onPress={() => navigation.navigate('Game', { gameId: game.id })}
          />
        ))}
      </View>

      <ChallengeJoin navigation={navigation} />
      <ScoresList />
    </ScrollView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Page
  page: { flex: 1, backgroundColor: '#0d0d1a' },
  pageContent: { paddingBottom: 40 },

  // Header
  header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 24 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#f0f0f5' },
  playerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  playerName: { fontSize: 14, color: '#8888aa' },
  changeBtn: { fontSize: 14, color: '#a78bfa', textDecorationLine: 'underline' },
  friendsLink: { fontSize: 14, color: '#38bdf8', fontWeight: '600' },

  // Grid
  grid: { paddingHorizontal: 16, gap: 12 },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a40',
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#f0f0f5', marginBottom: 4 },
  cardTagline: { fontSize: 14, color: '#8888aa', marginBottom: 8 },
  cardMeta: { fontSize: 12, color: '#555' },
  cardCta: { fontSize: 14, fontWeight: '600', color: '#a78bfa', marginTop: 12 },

  // Nickname Gate
  nicknameGate: { flex: 1, backgroundColor: '#0d0d1a', justifyContent: 'center', paddingHorizontal: 32 },
  nicknameCard: { backgroundColor: '#1a1a2e', borderRadius: 20, padding: 32, alignItems: 'center' },
  nicknameHeading: { fontSize: 24, fontWeight: 'bold', color: '#f0f0f5', marginBottom: 8 },
  nicknameSubtext: { fontSize: 14, color: '#8888aa', marginBottom: 24 },
  nicknameInput: {
    width: '100%',
    backgroundColor: '#0d0d1a',
    borderRadius: 12,
    padding: 14,
    color: '#f0f0f5',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2a2a40',
    marginBottom: 16,
  },
  nicknameBtn: {
    width: '100%',
    backgroundColor: '#a78bfa',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  // Buttons
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnDisabled: { opacity: 0.4 },

  // Challenge
  challengeSection: { paddingHorizontal: 20, marginTop: 32 },
  sectionHeading: { fontSize: 18, fontWeight: 'bold', color: '#f0f0f5', marginBottom: 12 },
  challengeRow: { flexDirection: 'row', gap: 8 },
  challengeInput: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    color: '#f0f0f5',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2a2a40',
  },
  challengeBtn: {
    backgroundColor: '#a78bfa',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeError: { color: '#f87171', fontSize: 13, marginTop: 8 },

  // Scores
  scoresSection: { paddingHorizontal: 20, marginTop: 32 },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  scoreLeft: {},
  scoreRight: { alignItems: 'flex-end' },
  scoreGame: { fontSize: 14, fontWeight: '600', color: '#f0f0f5' },
  scoreMeta: { fontSize: 12, color: '#555', marginTop: 2 },
  scoreValue: { fontSize: 16, fontWeight: 'bold', color: '#f0f0f5' },
  scorePct: { fontSize: 12, color: '#8888aa' },
});
