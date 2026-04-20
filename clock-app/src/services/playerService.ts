import { supabase } from '../lib/supabase';

export async function upsertPlayer(id: string, nickname: string): Promise<void> {
  await supabase
    .from('players')
    .upsert({ id, nickname }, { onConflict: 'id' });
}

export async function searchPlayersByNickname(query: string): Promise<{ id: string; nickname: string }[]> {
  const { data, error } = await supabase
    .from('players')
    .select('id, nickname')
    .ilike('nickname', `%${query}%`)
    .limit(10);
  if (error) {
    return [];
  }
  return data ?? [];
}
