import { supabase } from '../lib/supabase';

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

// ─── Scores ───────────────────────────────────────────────────────────────────

export async function submitScore(params: {
  playerId: string;
  gameId: string;
  gameTitle: string;
  score: number;
  total: number;
  duration?: number;
  challengeId?: string;
}): Promise<string | null> {
  const { data, error } = await supabase
    .from('scores')
    .insert({
      player_id:    params.playerId,
      game_id:      params.gameId,
      game_title:   params.gameTitle,
      score:        params.score,
      total:        params.total,
      duration:     params.duration ?? null,
      challenge_id: params.challengeId ?? null,
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
