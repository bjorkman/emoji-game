import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { type FriendsScreenProps } from '../navigation/types';
import { useAuthStore } from '../store/authStore';
import { searchPlayersByNickname } from '../services/playerService';
import { sendFriendRequest, acceptFriendRequest, fetchFriends, type FriendRow } from '../services/friendService';
import { fetchMyChallenges, type ChallengeWithParticipants } from '../services/challengeService';
import { formatTime } from '../lib/format';
import { hapticCorrect } from '../lib/haptics';
import { getFriendEmoji, CHALLENGE_EMOJIS } from '../core/emojiCharacters';
import { FONT_REGULAR, FONT_SEMI, FONT_BOLD } from '../lib/fonts';
import { TEXT_PRIMARY, TEXT_SECONDARY, TEXT_MUTED } from '../theme/colors';
import { GradientButton, GradientCard } from '../components/shared';

interface SearchResult {
  id: string;
  nickname: string;
}

export default function FriendsScreen({ navigation }: Readonly<FriendsScreenProps>) {
  const { theme } = useTheme();
  const { playerId } = useAuthStore();
  const [friends, setFriends] = useState<FriendRow[]>([]);
  const [challenges, setChallenges] = useState<ChallengeWithParticipants[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());

  const loadFriends = useCallback(async () => {
    if (!playerId) return;
    const rows = await fetchFriends(playerId);
    setFriends(rows);
  }, [playerId]);

  useEffect(() => { loadFriends(); }, [loadFriends]);

  useEffect(() => {
    if (!playerId) return;
    fetchMyChallenges(playerId).then(setChallenges);
  }, [playerId]);

  const handleSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    setSearchError('');
    const found = await searchPlayersByNickname(q);
    const friendIds = new Set(friends.map(f => f.friend_id));
    const filtered = found.filter(p => p.id !== playerId && !friendIds.has(p.id));
    setResults(filtered);
    if (filtered.length === 0) setSearchError('No players found.');
    setSearching(false);
  }, [query, friends, playerId]);

  const handleSendRequest = useCallback(async (addresseeId: string) => {
    if (!playerId) return;
    await sendFriendRequest(playerId, addresseeId);
    setSentIds(prev => new Set([...prev, addresseeId]));
  }, [playerId]);

  const handleAccept = useCallback(async (friendshipId: string) => {
    await acceptFriendRequest(friendshipId);
    hapticCorrect();
    setAcceptedIds(prev => new Set([...prev, friendshipId]));
    await loadFriends();
  }, [loadFriends]);

  const accepted = friends.filter(f => f.status === 'accepted');
  const pending = friends.filter(f => f.status === 'pending');

  return (
    <View style={styles.page}>
      <LinearGradient colors={theme.gradientBg} style={StyleSheet.absoluteFill} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Friends</Text>
      </View>

      {/* Search */}
      <View style={styles.section}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionEmoji}>🤝</Text>
          <Text style={styles.sectionHeading}>Add a Friend</Text>
        </View>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by nickname..."
            placeholderTextColor="#555"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            maxLength={24}
            autoCorrect={false}
            returnKeyType="search"
            testID="search-input"
          />
          <GradientButton
            label={searching ? '...' : 'Search'}
            onPress={handleSearch}
            colors={theme.gradientAccent}
            disabled={!query.trim() || searching}
            small
            testID="search-btn"
          />
        </View>
        {searchError ? <Text style={styles.errorNote}>{searchError}</Text> : null}
        {results.map(p => (
          <View key={p.id} style={styles.playerRow}>
            <Text style={styles.playerNickname}>{p.nickname}</Text>
            {sentIds.has(p.id) ? (
              <View style={styles.statusBadge}><Text style={styles.statusText}>Sent</Text></View>
            ) : (
              <GradientButton
                label="Add Friend"
                onPress={() => handleSendRequest(p.id)}
                colors={theme.gradientAccent}
                small
                testID={`add-${p.id}`}
              />
            )}
          </View>
        ))}
      </View>

      {/* Pending Requests */}
      {pending.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Pending Requests</Text>
          {pending.map(f => (
            <View key={f.id} style={styles.playerRow}>
              <Text style={styles.playerNickname}>{f.nickname}</Text>
              {f.direction === 'incoming' && acceptedIds.has(f.id) && (
                <View style={styles.statusBadge}><Text style={styles.statusText}>Accepted</Text></View>
              )}
              {f.direction === 'incoming' && !acceptedIds.has(f.id) && (
                <GradientButton
                  label="Accept"
                  onPress={() => handleAccept(f.id)}
                  colors={theme.gradientAccent}
                  small
                  testID={`accept-${f.id}`}
                />
              )}
              {f.direction !== 'incoming' && (
                <View style={styles.statusBadge}><Text style={styles.statusText}>Pending</Text></View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Friends List */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Friends ({accepted.length})</Text>
        {accepted.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>😢</Text>
            <Text style={styles.emptyNote}>No friends yet. Search for players above.</Text>
          </View>
        ) : (
          accepted.map(f => (
            <View key={f.id} style={styles.friendRow}>
              <Text style={styles.friendEmoji}>{getFriendEmoji(f.nickname)}</Text>
              <Text style={styles.friendNickname}>{f.nickname}</Text>
            </View>
          ))
        )}
      </View>

      {/* Challenges */}
      <View style={styles.section}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionEmoji}>⚔️</Text>
          <Text style={styles.sectionHeading}>My Challenges</Text>
        </View>
        {challenges.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🤷</Text>
            <Text style={styles.emptyNote}>No challenges yet. Finish a game and hit "Challenge Friends".</Text>
          </View>
        ) : (
          challenges.map(c => (
            <GradientCard key={c.id} colors={theme.gradientCard} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.gameTag}>
                  <Text style={styles.gameTagText}>{c.game_id.toUpperCase()}</Text>
                </View>
                <Text style={styles.challengeCode}>{c.code}</Text>
                <Text style={styles.challengeDate}>
                  {new Date(c.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </Text>
              </View>
              <GradientButton
                label="Play"
                onPress={() => navigation.navigate('Game', { gameId: c.game_id, challengeId: c.id })}
                colors={theme.gradientAccent}
                small
                style={styles.playLink}
              />
              {c.participants.length > 0 && (
                <View style={styles.participants}>
                  {c.participants.map((p, idx) => (
                    <React.Fragment key={`${p.nickname}-${p.score}`}>
                      {idx > 0 && (
                        <Text style={styles.vsText}>{CHALLENGE_EMOJIS.vs}</Text>
                      )}
                      <View style={styles.participantRow}>
                        <Text style={styles.participantName}>{p.nickname}</Text>
                        <Text style={styles.participantScore}>
                          {p.score}/{p.total} · {formatTime(p.duration)}
                        </Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              )}
            </GradientCard>
          ))
        )}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  scroll: { flex: 1 },
  pageContent: { paddingBottom: 40 },
  header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 24 },
  backLink: { fontSize: 14, color: TEXT_MUTED, marginBottom: 8, fontFamily: FONT_REGULAR },
  pageTitle: { fontSize: 28, fontFamily: FONT_BOLD, color: TEXT_PRIMARY },

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionEmoji: { fontSize: 20 },
  sectionHeading: { fontSize: 18, fontFamily: FONT_SEMI, color: TEXT_PRIMARY, marginBottom: 12 },

  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'center' },
  searchInput: {
    flex: 1, backgroundColor: 'rgba(30, 30, 90, 0.5)', borderRadius: 12, padding: 14,
    color: TEXT_PRIMARY, fontSize: 16, borderWidth: 1, borderColor: '#303066',
    fontFamily: FONT_REGULAR,
  },
  errorNote: { color: '#f87171', fontSize: 13, marginTop: 4, fontFamily: FONT_REGULAR },

  playerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 90, 0.4)', borderRadius: 12, padding: 14, marginBottom: 8,
  },
  playerNickname: { fontSize: 15, color: TEXT_PRIMARY, fontFamily: FONT_SEMI },
  statusBadge: { backgroundColor: '#2a2a40', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { color: TEXT_MUTED, fontSize: 13, fontFamily: FONT_REGULAR },

  emptyState: { alignItems: 'center', paddingVertical: 16 },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyNote: { fontSize: 14, color: TEXT_MUTED, textAlign: 'center', fontFamily: FONT_REGULAR },

  friendRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(30, 30, 90, 0.4)', borderRadius: 12, padding: 14, marginBottom: 8,
  },
  friendEmoji: { fontSize: 20 },
  friendNickname: { fontSize: 15, color: TEXT_PRIMARY, fontFamily: FONT_SEMI },

  challengeCard: { marginBottom: 12 },
  challengeHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  gameTag: { backgroundColor: '#2a2a40', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  gameTagText: { fontSize: 11, fontFamily: FONT_BOLD, color: TEXT_MUTED },
  challengeCode: { fontSize: 15, fontFamily: FONT_BOLD, color: TEXT_PRIMARY, letterSpacing: 1 },
  challengeDate: { fontSize: 12, color: TEXT_MUTED, marginLeft: 'auto', fontFamily: FONT_REGULAR },
  playLink: { marginBottom: 8, alignSelf: 'flex-start' },
  vsText: { fontSize: 16, textAlign: 'center', marginVertical: 4 },
  participants: { borderTopWidth: 1, borderTopColor: '#303066', paddingTop: 8 },
  participantRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  participantName: { fontSize: 13, color: TEXT_SECONDARY, fontFamily: FONT_SEMI },
  participantScore: { fontSize: 13, color: TEXT_MUTED, fontFamily: FONT_REGULAR },
});
