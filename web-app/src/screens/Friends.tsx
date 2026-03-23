import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
import {
  page, pageHeader, backLink, pageTitle,
  section, sectionHeading,
  searchRow, searchInput, searchBtn,
  playerList, playerItem, playerNickname, actionBtn, statusBadge,
  emptyNote, errorNote, friendsTable,
  challengeList, challengeCard, challengeCardHeader, challengeCode, challengeGameTag,
  challengeDate, challengeParticipants, participantRow, participantName, participantScore, challengePlayLink,
} from './Friends.css';
import { formatTime } from '../lib/format';

interface SearchResult {
  id: string;
  nickname: string;
}

export default function Friends() {
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

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
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
  const pending  = friends.filter(f => f.status === 'pending');

  return (
    <div className={page}>
      <div className={pageHeader}>
        <Link to="/" className={backLink}>← Home</Link>
        <h1 className={pageTitle}>Friends</h1>
      </div>

      {/* Search */}
      <section className={section}>
        <h2 className={sectionHeading}>Add a Friend</h2>
        <form className={searchRow} onSubmit={handleSearch}>
          <input
            className={searchInput}
            type="text"
            placeholder="Search by nickname…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={24}
            autoComplete="off"
          />
          <button className={searchBtn} type="submit" disabled={!query.trim() || searching}>
            {searching ? '…' : 'Search'}
          </button>
        </form>
        {searchError && <p className={errorNote}>{searchError}</p>}
        {results.length > 0 && (
          <ul className={playerList}>
            {results.map(p => (
              <li key={p.id} className={playerItem}>
                <span className={playerNickname}>{p.nickname}</span>
                {sentIds.has(p.id) ? (
                  <span className={statusBadge}>Sent</span>
                ) : (
                  <button className={actionBtn} onClick={() => handleSendRequest(p.id)}>
                    Add Friend
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Pending requests */}
      {pending.length > 0 && (
        <section className={section}>
          <h2 className={sectionHeading}>Pending Requests</h2>
          <ul className={playerList}>
            {pending.map(f => (
              <li key={f.id} className={playerItem}>
                <span className={playerNickname}>{f.nickname}</span>
                {f.direction === 'incoming' ? (
                  acceptedIds.has(f.id) ? (
                    <span className={statusBadge}>Accepted</span>
                  ) : (
                    <button className={actionBtn} onClick={() => handleAccept(f.id)}>
                      Accept
                    </button>
                  )
                ) : (
                  <span className={statusBadge}>Pending</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Friends list */}
      <section className={section}>
        <h2 className={sectionHeading}>Friends ({accepted.length})</h2>
        {accepted.length === 0 ? (
          <p className={emptyNote}>No friends yet. Search for players above.</p>
        ) : (
          <table className={friendsTable}>
            <thead>
              <tr>
                <th>Nickname</th>
              </tr>
            </thead>
            <tbody>
              {accepted.map(f => (
                <tr key={f.id}>
                  <td>{f.nickname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Challenges */}
      <section className={section}>
        <h2 className={sectionHeading}>My Challenges</h2>
        {challenges.length === 0 ? (
          <p className={emptyNote}>No challenges yet. Finish a game and hit "Challenge Friends".</p>
        ) : (
          <ul className={challengeList}>
            {challenges.map(c => (
              <li key={c.id} className={challengeCard}>
                <div className={challengeCardHeader}>
                  <span className={challengeGameTag}>{c.game_id.toUpperCase()}</span>
                  <span className={challengeCode}>{c.code}</span>
                  <span className={challengeDate}>
                    {new Date(c.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <Link
                    to={`/${c.game_id}?challenge=${c.id}`}
                    className={challengePlayLink}
                  >
                    Play →
                  </Link>
                </div>
                {c.participants.length > 0 && (
                  <ul className={challengeParticipants}>
                    {c.participants.map((p, i) => (
                      <li key={i} className={participantRow}>
                        <span className={participantName}>{p.nickname}</span>
                        <span className={participantScore}>
                          {p.score}/{p.total} · {formatTime(p.duration)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
