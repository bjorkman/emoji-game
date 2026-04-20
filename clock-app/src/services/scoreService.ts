import { supabase } from '../lib/supabase';

export async function submitScore(params: {
  playerId: string;
  gameId: string;
  score: number;
  total: number;
  duration: number;
}): Promise<string | null> {
  const { data, error } = await supabase
    .from('scores')
    .insert({
      player_id:    params.playerId,
      game_id:      params.gameId,
      score:        params.score,
      total:        params.total,
      duration:     params.duration,
    })
    .select('id')
    .single();
  if (error) {
    return null;
  }
  return data?.id ?? null;
}
