import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FriendRow {
  id: string;       // friendship id
  friend_id: string;
  nickname: string;
  status: 'pending' | 'accepted';
  direction: 'outgoing' | 'incoming';
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
