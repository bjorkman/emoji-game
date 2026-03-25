// Supabase Edge Function: send-notification
// Triggered by database webhooks on friendships and scores tables.
// Sends push notifications via the Expo Push API.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  sound?: string;
}

async function getPlayer(id: string): Promise<{ nickname: string; push_token: string | null } | null> {
  const { data, error } = await supabase
    .from('players')
    .select('nickname, push_token')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

async function sendPush(message: ExpoPushMessage): Promise<void> {
  const res = await fetch(EXPO_PUSH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  if (!res.ok) {
    console.error('[send-notification] Expo push failed:', await res.text());
  }
}

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { type, record, old_record } = payload;

    // ─── Friend request received ──────────────────────────────────────
    if (type === 'INSERT' && record?.requester_id && record?.addressee_id && record?.status === 'pending') {
      const sender = await getPlayer(record.requester_id);
      const recipient = await getPlayer(record.addressee_id);

      if (recipient?.push_token && sender) {
        await sendPush({
          to: recipient.push_token,
          title: 'New Friend Request',
          body: `${sender.nickname ?? 'Someone'} sent you a friend request!`,
          data: { type: 'friend_request' },
          sound: 'default',
        });
      }
    }

    // ─── Friend request accepted ──────────────────────────────────────
    if (type === 'UPDATE' && old_record?.status === 'pending' && record?.status === 'accepted') {
      const accepter = await getPlayer(record.addressee_id);
      const requester = await getPlayer(record.requester_id);

      if (requester?.push_token && accepter) {
        await sendPush({
          to: requester.push_token,
          title: 'Friend Request Accepted',
          body: `${accepter.nickname ?? 'Someone'} accepted your friend request!`,
          data: { type: 'friend_accepted' },
          sound: 'default',
        });
      }
    }

    // ─── Challenge score submitted ────────────────────────────────────
    if (type === 'INSERT' && record?.challenge_id && record?.player_id) {
      // Look up the challenge to find the creator
      const { data: challenge } = await supabase
        .from('challenges')
        .select('created_by, game_id')
        .eq('id', record.challenge_id)
        .single();

      if (challenge && challenge.created_by !== record.player_id) {
        const scorer = await getPlayer(record.player_id);
        const creator = await getPlayer(challenge.created_by);

        if (creator?.push_token && scorer) {
          await sendPush({
            to: creator.push_token,
            title: 'Challenge Update',
            body: `${scorer.nickname ?? 'Someone'} scored ${record.score}/${record.total} on your challenge!`,
            data: {
              type: 'challenge',
              gameId: challenge.game_id,
              challengeId: record.challenge_id,
            },
            sound: 'default',
          });
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[send-notification] Error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
