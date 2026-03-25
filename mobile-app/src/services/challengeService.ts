import { supabase } from '../lib/supabase';
import { type LeaderboardEntry } from './scoreService';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChallengeWithParticipants {
  id: string;
  code: string;
  game_id: string;
  created_at: string;
  participants: { nickname: string; score: number; total: number; duration: number | null }[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateCode(gameId: string): string {
  const prefix = gameId.toUpperCase().slice(0, 5);
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
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

// ─── Challenges ───────────────────────────────────────────────────────────────

export async function createChallenge(gameId: string, playerId: string): Promise<string | null> {
  // Try a few times in case of code collision
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode(gameId);
    const { data, error } = await supabase
      .from('challenges')
      .insert({ code, game_id: gameId, created_by: playerId })
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

export async function fetchChallenge(code: string): Promise<{ id: string; game_id: string } | null> {
  const { data, error } = await supabase
    .from('challenges')
    .select('id, game_id')
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
