import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { type FriendsScreenProps } from '../navigation/types';
import { useAuthStore } from '../store/authStore';
import {
  searchPlayersByNickname,
  sendFriendRequest,
  acceptFriendRequest,
  fetchFriends,
  fetchMyChallenges,
  type FriendRow,
  type ChallengeWithParticipants,
} from '../lib/db';
import { formatTime } from '../lib/format';

interface SearchResult {
  id: string;
  nickname: string;
}

export default function FriendsScreen({ navigation }: Readonly<FriendsScreenProps>) {
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
    setAcceptedIds(prev => new Set([...prev, friendshipId]));
    await loadFriends();
  }, [loadFriends]);

  const accepted = friends.filter(f => f.status === 'accepted');
  const pending = friends.filter(f => f.status === 'pending');

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Friends</Text>
      </View>

      {/* Search */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Add a Friend</Text>
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
          <TouchableOpacity
            style={[styles.searchBtn, (!query.trim() || searching) && styles.btnDisabled]}
            onPress={handleSearch}
            disabled={!query.trim() || searching}
            testID="search-btn"
          >
            {searching ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>
        {searchError ? <Text style={styles.errorNote}>{searchError}</Text> : null}
        {results.map(p => (
          <View key={p.id} style={styles.playerRow}>
            <Text style={styles.playerNickname}>{p.nickname}</Text>
            {sentIds.has(p.id) ? (
              <View style={styles.statusBadge}><Text style={styles.statusText}>Sent</Text></View>
            ) : (
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleSendRequest(p.id)} testID={`add-${p.id}`}>
                <Text style={styles.actionBtnText}>Add Friend</Text>
              </TouchableOpacity>
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
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleAccept(f.id)} testID={`accept-${f.id}`}>
                  <Text style={styles.actionBtnText}>Accept</Text>
                </TouchableOpacity>
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
          <Text style={styles.emptyNote}>No friends yet. Search for players above.</Text>
        ) : (
          accepted.map(f => (
            <View key={f.id} style={styles.friendRow}>
              <Text style={styles.friendNickname}>{f.nickname}</Text>
            </View>
          ))
        )}
      </View>

      {/* Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>My Challenges</Text>
        {challenges.length === 0 ? (
          <Text style={styles.emptyNote}>No challenges yet. Finish a game and hit "Challenge Friends".</Text>
        ) : (
          challenges.map(c => (
            <View key={c.id} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.gameTag}>
                  <Text style={styles.gameTagText}>{c.game_id.toUpperCase()}</Text>
                </View>
                <Text style={styles.challengeCode}>{c.code}</Text>
                <Text style={styles.challengeDate}>
                  {new Date(c.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.playLink}
                onPress={() => navigation.navigate('Game', { gameId: c.game_id, challengeId: c.id })}
              >
                <Text style={styles.playLinkText}>Play</Text>
              </TouchableOpacity>
              {c.participants.length > 0 && (
                <View style={styles.participants}>
                  {c.participants.map((p) => (
                    <View key={`${p.nickname}-${p.score}`} style={styles.participantRow}>
                      <Text style={styles.participantName}>{p.nickname}</Text>
                      <Text style={styles.participantScore}>
                        {p.score}/{p.total} · {formatTime(p.duration)}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0d0d1a' },
  pageContent: { paddingBottom: 40 },
  header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 24 },
  backLink: { fontSize: 14, color: '#8888aa', marginBottom: 8 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#f0f0f5' },

  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionHeading: { fontSize: 18, fontWeight: '600', color: '#f0f0f5', marginBottom: 12 },

  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  searchInput: {
    flex: 1, backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14,
    color: '#f0f0f5', fontSize: 16, borderWidth: 1, borderColor: '#2a2a40',
  },
  searchBtn: { backgroundColor: '#a78bfa', borderRadius: 12, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnDisabled: { opacity: 0.4 },
  errorNote: { color: '#f87171', fontSize: 13, marginTop: 4 },

  playerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginBottom: 8,
  },
  playerNickname: { fontSize: 15, color: '#f0f0f5', fontWeight: '500' },
  actionBtn: { backgroundColor: '#a78bfa', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  statusBadge: { backgroundColor: '#2a2a40', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { color: '#8888aa', fontSize: 13 },

  emptyNote: { fontSize: 14, color: '#555' },

  friendRow: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginBottom: 8 },
  friendNickname: { fontSize: 15, color: '#f0f0f5' },

  challengeCard: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 12 },
  challengeHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  gameTag: { backgroundColor: '#2a2a40', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  gameTagText: { fontSize: 11, fontWeight: '700', color: '#8888aa' },
  challengeCode: { fontSize: 15, fontWeight: 'bold', color: '#f0f0f5', letterSpacing: 1 },
  challengeDate: { fontSize: 12, color: '#555', marginLeft: 'auto' },
  playLink: { marginBottom: 8 },
  playLinkText: { color: '#a78bfa', fontWeight: '600', fontSize: 14 },
  participants: { borderTopWidth: 1, borderTopColor: '#2a2a40', paddingTop: 8 },
  participantRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  participantName: { fontSize: 13, color: '#c0c0d0' },
  participantScore: { fontSize: 13, color: '#8888aa' },
});
