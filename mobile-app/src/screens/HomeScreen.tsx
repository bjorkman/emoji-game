import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type HomeScreenProps } from '../navigation/types';
import REGISTRY from '../games/registry';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import { fetchChallenge } from '../services/challengeService';
import { formatTime } from '../lib/format';
import { type GameConfig } from '../core/types';
import { useTheme } from '../theme/ThemeContext';
import { getRecentScoreEmoji } from '../core/emojiCharacters';
import { FONT_REGULAR, FONT_SEMI, FONT_BOLD } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_SECONDARY, TEXT_MUTED, BG_DEEP } from '../theme/colors';
import Logo from '../components/Logo';
import { GradientButton, GradientCard, FloatingEmojis } from '../components/shared';

const HOME_FLOATS = ['🎮', '🎯', '🏆', '✨'];

// ─── Nickname Gate ──────────────────────────────────────────────────────────

function NicknameGate() {
  const { theme } = useTheme();
  const setNickname = usePlayerStore((s) => s.setNickname);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    if (value.trim()) setNickname(value);
  }, [value, setNickname]);

  return (
    <LinearGradient colors={theme.gradientBg} style={styles.nicknameGate}>
      <GradientCard glowColor={theme.glowColor} style={styles.nicknameCard}>
        <Text style={styles.nicknameEmoji}>👋</Text>
        <Text style={styles.nicknameHeading}>What's your name?</Text>
        <Text style={styles.nicknameSubtext}>We'll remember it for next time.</Text>

        <View style={styles.nicknameInputWrap}>
          <LinearGradient
            colors={theme.gradientAccent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputBorder}
          >
            <View style={styles.inputInner}>
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
            </View>
          </LinearGradient>
        </View>

        <GradientButton
          label="Let's play"
          onPress={handleSubmit}
          colors={theme.gradientAccent}
          disabled={!value.trim()}
          style={styles.nicknameBtn}
        />
      </GradientCard>
    </LinearGradient>
  );
}

// ─── Game Card ──────────────────────────────────────────────────────────────

function GameCardItem({ game, onPress }: Readonly<{ game: GameConfig; onPress: () => void }>) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <GradientCard
        colors={game.theme.gradientCard}
        glowColor={game.theme.glowColor}
        style={[
          styles.card,
          {
            borderLeftWidth: 3,
            borderLeftColor: game.theme.glowColor,
            shadowColor: game.theme.glowColor,
            shadowRadius: 8,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 0 },
          },
        ]}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>{game.title}</Text>
            <Text style={styles.cardTagline}>{game.tagline}</Text>
            <Text style={styles.cardMeta}>
              {game.questionCount ?? game.questions.length} questions
            </Text>
            <GradientButton
              label="Play"
              onPress={onPress}
              colors={game.theme.gradientAccent}
              small
              style={styles.cardPlayBtn}
            />
          </View>
          <Text style={styles.cardHost}>{game.theme.emojiHost}</Text>
        </View>
      </GradientCard>
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
        const emoji = getRecentScoreEmoji(pct);
        const date = new Date(entry.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        });
        return (
          <View key={entry.id} style={styles.scoreRow}>
            <Text style={styles.scoreEmoji}>{emoji}</Text>
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
  const { theme } = useTheme();
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
      <View style={styles.challengeHeadingRow}>
        <Text style={styles.sectionEmoji}>🥊</Text>
        <Text style={[styles.sectionHeading, { marginBottom: 0 }]}>Join a Challenge</Text>
      </View>
      <View style={styles.challengeRow}>
        <View style={styles.challengeInputWrap}>
          <LinearGradient
            colors={theme.gradientAccent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputBorder}
          >
            <View style={styles.inputInner}>
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
            </View>
          </LinearGradient>
        </View>
        <GradientButton
          label={loading ? '...' : 'Join'}
          onPress={handleJoin}
          colors={theme.gradientAccent}
          disabled={!code.trim() || loading}
          small
        />
      </View>
      {error ? <Text style={styles.challengeError}>{error}</Text> : null}
    </View>
  );
}

// ─── Home Screen ────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const { theme } = useTheme();
  const nickname = usePlayerStore((s) => s.nickname);
  const setNickname = usePlayerStore((s) => s.setNickname);
  const playerId = useAuthStore((s) => s.playerId);
  const games = Object.values(REGISTRY);

  if (!nickname?.trim()) return <NicknameGate />;

  return (
    <View style={styles.page}>
      <LinearGradient colors={theme.gradientBg} style={StyleSheet.absoluteFill} />
      <FloatingEmojis emojis={HOME_FLOATS} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <Logo size="medium" />
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
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Page
  page: { flex: 1 },
  scroll: { flex: 1 },
  pageContent: { paddingBottom: 40 },

  // Header
  header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 24 },
  playerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  playerName: { fontSize: 14, color: TEXT_MUTED, fontFamily: FONT_REGULAR },
  changeBtn: { fontSize: 14, color: '#a78bfa', textDecorationLine: 'underline', fontFamily: FONT_REGULAR },
  friendsLink: { fontSize: 14, color: '#38bdf8', fontFamily: FONT_SEMI },

  // Grid
  grid: { paddingHorizontal: 16, gap: 12 },
  card: { padding: 16 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardLeft: { flex: 1 },
  cardTitle: { fontSize: 20, fontFamily: FONT_BOLD, color: TEXT_PRIMARY, marginBottom: 4 },
  cardTagline: { fontSize: 14, color: TEXT_MUTED, marginBottom: 8, fontFamily: FONT_REGULAR },
  cardMeta: { fontSize: 12, color: TEXT_SECONDARY, fontFamily: FONT_REGULAR },
  cardPlayBtn: { marginTop: 10, alignSelf: 'flex-start' },
  cardHost: { fontSize: 40, marginLeft: 12 },

  // Nickname Gate
  nicknameGate: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  nicknameCard: { alignItems: 'center', padding: 32 },
  nicknameEmoji: { fontSize: 48, marginBottom: 12 },
  nicknameHeading: { fontSize: 24, fontFamily: FONT_BOLD, color: TEXT_PRIMARY, marginBottom: 8 },
  nicknameSubtext: { fontSize: 14, color: TEXT_MUTED, marginBottom: 24, fontFamily: FONT_REGULAR },
  nicknameInputWrap: { width: '100%', marginBottom: 16 },
  nicknameInput: {
    padding: 14,
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
  },
  nicknameBtn: { width: '100%' },

  // Shared input styles
  inputBorder: { borderRadius: 14, padding: 2 },
  inputInner: { backgroundColor: BG_DEEP, borderRadius: 12 },

  // Buttons
  btnDisabled: { opacity: 0.4 },

  // Challenge
  challengeSection: { paddingHorizontal: 20, marginTop: 32 },
  sectionHeading: { fontSize: 18, fontFamily: FONT_BOLD, color: TEXT_PRIMARY, marginBottom: 12 },
  sectionEmoji: { fontSize: 20 },
  challengeHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  challengeRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  challengeInputWrap: { flex: 1 },
  challengeInput: {
    padding: 14,
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
  },
  challengeError: { color: '#f87171', fontSize: 13, marginTop: 8, fontFamily: FONT_REGULAR },

  // Scores
  scoresSection: { paddingHorizontal: 20, marginTop: 32 },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 90, 0.4)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  scoreEmoji: { fontSize: 20, marginRight: 10 },
  scoreLeft: { flex: 1 },
  scoreRight: { alignItems: 'flex-end' },
  scoreGame: { fontSize: 14, fontFamily: FONT_SEMI, color: TEXT_PRIMARY },
  scoreMeta: { fontSize: 12, color: TEXT_MUTED, marginTop: 2, fontFamily: FONT_REGULAR },
  scoreValue: { fontSize: 16, fontFamily: FONT_BOLD, color: TEXT_PRIMARY },
  scorePct: { fontSize: 12, color: TEXT_MUTED, fontFamily: FONT_REGULAR },
});
