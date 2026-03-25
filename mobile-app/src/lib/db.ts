import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  id: string;
  player_id: string;
  nickname: string;
  score: number;
  total: number;
  duration: number | null;
  created_at: string;
}

export interface FriendRow {
  id: string;       // friendship id
  friend_id: string;
  nickname: string;
  status: 'pending' | 'accepted';
  direction: 'outgoing' | 'incoming';
}

// ─── Players ─────────────────────────────────────────────────────────────────

export async function upsertPlayer(id: string, nickname: string): Promise<void> {
  const { error } = await supabase
    .from('players')
    .upsert({ id, nickname }, { onConflict: 'id' });
  if (error) console.error('[db] upsertPlayer:', error.message);
}

export async function searchPlayersByNickname(query: string): Promise<{ id: string; nickname: string }[]> {
  const { data, error } = await supabase
    .from('players')
    .select('id, nickname')
    .ilike('nickname', `%${query}%`)
    .limit(10);
  if (error) {
    console.error('[db] searchPlayersByNickname:', error.message);
    return [];
  }
  return data ?? [];
}

function mapLeaderboardRow(row: any): LeaderboardEntry {
  return {
    id:         row.id,
    player_id:  row.player_id,
    nickname:   row.players?.nickname ?? 'Anonymous',
    score:      row.score,
    total:      row.total,
    duration:   row.duration,
    created_at: row.created_at,
  };
}

// ─── Scores ──────────────────────────────────────────────────────────────────

export async function submitScore(params: {
  playerId: string;
  gameId: string;
  gameTitle: string;
  score: number;
  total: number;
  duration?: number;
  challengeId?: string;
  tournamentId?: string;
}): Promise<string | null> {
  const { data, error } = await supabase
    .from('scores')
    .insert({
      player_id:     params.playerId,
      game_id:       params.gameId,
      game_title:    params.gameTitle,
      score:         params.score,
      total:         params.total,
      duration:      params.duration ?? null,
      challenge_id:  params.challengeId ?? null,
      tournament_id: params.tournamentId ?? null,
    })
    .select('id')
    .single();
  if (error) {
    console.error('[db] submitScore:', error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function fetchGlobalLeaderboard(gameId: string): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('id, player_id, players(nickname), score, total, duration, created_at')
    .eq('game_id', gameId)
    .order('score', { ascending: false })
    .order('duration', { ascending: true, nullsFirst: false })
    .limit(20);

  if (error) {
    console.error('[db] fetchGlobalLeaderboard:', error.message);
    return [];
  }
  return (data ?? []).map(mapLeaderboardRow);
}

export async function fetchFriendsLeaderboard(gameId: string, playerId: string): Promise<LeaderboardEntry[]> {
  // Get accepted friend ids
  const { data: friendships, error: fErr } = await supabase
    .from('friendships')
    .select('requester_id, addressee_id')
    .eq('status', 'accepted')
    .or(`requester_id.eq.${playerId},addressee_id.eq.${playerId}`);

  if (fErr) {
    console.error('[db] fetchFriendsLeaderboard (friendships):', fErr.message);
    return [];
  }

  const friendIds = (friendships ?? []).map((f: any) =>
    f.requester_id === playerId ? f.addressee_id : f.requester_id
  );
  const allIds = [playerId, ...friendIds];

  const { data, error } = await supabase
    .from('scores')
    .select('id, player_id, players(nickname), score, total, duration, created_at')
    .eq('game_id', gameId)
    .in('player_id', allIds)
    .order('score', { ascending: false })
    .order('duration', { ascending: true, nullsFirst: false })
    .limit(20);

  if (error) {
    console.error('[db] fetchFriendsLeaderboard (scores):', error.message);
    return [];
  }
  return (data ?? []).map(mapLeaderboardRow);
}

// ─── Challenges ───────────────────────────────────────────────────────────────

function generateCode(gameId: string): string {
  const prefix = gameId.toUpperCase().slice(0, 5);
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}

export async function createChallenge(gameId: string, playerId: string, seed?: number): Promise<string | null> {
  // Try a few times in case of code collision
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode(gameId);
    const { data, error } = await supabase
      .from('challenges')
      .insert({ code, game_id: gameId, created_by: playerId, seed: seed ?? null })
      .select('code')
      .single();
    if (!error) return data?.code ?? null;
    if (!error.message.includes('unique')) {
      console.error('[db] createChallenge:', error.message);
      return null;
    }
  }
  return null;
}

export async function fetchChallenge(code: string): Promise<{ id: string; game_id: string; seed: number | null } | null> {
  const { data, error } = await supabase
    .from('challenges')
    .select('id, game_id, seed')
    .eq('code', code.toUpperCase())
    .single();
  if (error) {
    console.error('[db] fetchChallenge:', error.message);
    return null;
  }
  return data;
}

export async function linkScoreToChallenge(scoreId: string, challengeId: string): Promise<void> {
  const { error } = await supabase
    .from('scores')
    .update({ challenge_id: challengeId })
    .eq('id', scoreId);
  if (error) console.error('[db] linkScoreToChallenge:', error.message);
}

export interface ChallengeWithParticipants {
  id: string;
  code: string;
  game_id: string;
  created_at: string;
  participants: { nickname: string; score: number; total: number; duration: number | null }[];
}

export async function fetchMyChallenges(playerId: string): Promise<ChallengeWithParticipants[]> {
  // Challenge IDs the player participated in (as non-creator)
  const { data: scoreRows } = await supabase
    .from('scores')
    .select('challenge_id')
    .eq('player_id', playerId)
    .not('challenge_id', 'is', null);

  const participatedIds = (scoreRows ?? [])
    .map((s: any) => s.challenge_id as string)
    .filter(Boolean);

  // Fetch challenges created by player OR participated in
  let query = supabase
    .from('challenges')
    .select('id, code, game_id, created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  if (participatedIds.length > 0) {
    query = query.or(`created_by.eq.${playerId},id.in.(${participatedIds.join(',')})`);
  } else {
    query = query.eq('created_by', playerId);
  }

  const { data: challenges, error } = await query;
  if (error) {
    console.error('[db] fetchMyChallenges (challenges):', error.message);
    return [];
  }
  if (!challenges || challenges.length === 0) return [];

  // Fetch all scores for these challenges with nicknames in one query
  const challengeIds = challenges.map((c: any) => c.id);
  const { data: scores, error: sErr } = await supabase
    .from('scores')
    .select('challenge_id, players(nickname), score, total, duration')
    .in('challenge_id', challengeIds)
    .order('score', { ascending: false });

  if (sErr) console.error('[db] fetchMyChallenges (scores):', sErr.message);

  const scoresByChallenge = new Map<string, any[]>();
  for (const s of scores ?? []) {
    const list = scoresByChallenge.get(s.challenge_id) ?? [];
    list.push(s);
    scoresByChallenge.set(s.challenge_id, list);
  }

  return challenges.map((c: any) => ({
    id:           c.id,
    code:         c.code,
    game_id:      c.game_id,
    created_at:   c.created_at,
    participants: (scoresByChallenge.get(c.id) ?? []).map((s: any) => ({
      nickname: s.players?.nickname ?? 'Anonymous',
      score:    s.score,
      total:    s.total,
      duration: s.duration,
    })),
  }));
}

export async function fetchChallengeLeaderboard(challengeId: string): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('id, player_id, players(nickname), score, total, duration, created_at')
    .eq('challenge_id', challengeId)
    .order('score', { ascending: false })
    .order('duration', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('[db] fetchChallengeLeaderboard:', error.message);
    return [];
  }
  return (data ?? []).map(mapLeaderboardRow);
}

// ─── Tournaments ──────────────────────────────────────────────────────────────

export interface Tournament {
  id: string;
  title: string;
  game_id: string;
  seed: number;
  starts_at: string;
  ends_at: string;
}

export async function fetchActiveTournaments(): Promise<Tournament[]> {
  const { data, error } = await supabase
    .from('tournaments')
    .select('id, title, game_id, seed, starts_at, ends_at')
    .lte('starts_at', new Date().toISOString())
    .gte('ends_at', new Date().toISOString())
    .order('ends_at', { ascending: true });

  if (error) {
    console.error('[db] fetchActiveTournaments:', error.message);
    return [];
  }
  return data ?? [];
}

export async function fetchTournamentLeaderboard(tournamentId: string): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('id, player_id, players(nickname), score, total, duration, created_at')
    .eq('tournament_id', tournamentId)
    .order('score', { ascending: false })
    .order('duration', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('[db] fetchTournamentLeaderboard:', error.message);
    return [];
  }
  return (data ?? []).map(mapLeaderboardRow);
}

export async function hasPlayedTournament(tournamentId: string, playerId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('scores')
    .select('id', { count: 'exact', head: true })
    .eq('tournament_id', tournamentId)
    .eq('player_id', playerId);

  if (error) {
    console.error('[db] hasPlayedTournament:', error.message);
    return false;
  }
  return (count ?? 0) > 0;
}

// ─── Friendships ──────────────────────────────────────────────────────────────

export async function sendFriendRequest(requesterId: string, addresseeId: string): Promise<boolean> {
  const { error } = await supabase
    .from('friendships')
    .insert({ requester_id: requesterId, addressee_id: addresseeId });
  if (error) {
    console.error('[db] sendFriendRequest:', error.message);
    return false;
  }
  return true;
}

export async function acceptFriendRequest(friendshipId: string): Promise<boolean> {
  const { error } = await supabase
    .from('friendships')
    .update({ status: 'accepted' })
    .eq('id', friendshipId);
  if (error) {
    console.error('[db] acceptFriendRequest:', error.message);
    return false;
  }
  return true;
}

export async function fetchFriends(playerId: string): Promise<FriendRow[]> {
  const { data, error } = await supabase
    .from('friendships')
    .select('id, requester_id, addressee_id, status, requester:players!friendships_requester_id_fkey(nickname), addressee:players!friendships_addressee_id_fkey(nickname)')
    .or(`requester_id.eq.${playerId},addressee_id.eq.${playerId}`);

  if (error) {
    console.error('[db] fetchFriends:', error.message);
    return [];
  }

  return (data ?? []).map((f: any) => {
    const isRequester = f.requester_id === playerId;
    return {
      id:        f.id,
      friend_id: isRequester ? f.addressee_id : f.requester_id,
      nickname:  isRequester ? f.addressee?.nickname : f.requester?.nickname,
      status:    f.status,
      direction: isRequester ? 'outgoing' : 'incoming',
    };
  });
}
