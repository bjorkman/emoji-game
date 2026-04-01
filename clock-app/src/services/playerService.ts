import { supabase } from '../lib/supabase';

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
