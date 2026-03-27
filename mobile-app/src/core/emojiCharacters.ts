// Emoji character constants used throughout the Emoji Movie-inspired redesign.

// ─── Score result emojis ─────────────────────────────────────────────────────
// Maps score percentage ranges to emoji characters and reaction text.

export interface ScoreEmoji {
  min: number;
  emoji: string;
  reaction: string;
}

export const SCORE_EMOJIS: ScoreEmoji[] = [
  { min: 100, emoji: '🤩', reaction: 'PERFECT!' },
  { min: 90,  emoji: '🥳', reaction: 'Almost perfect!' },
  { min: 80,  emoji: '😎', reaction: 'Super impressive!' },
  { min: 70,  emoji: '😃', reaction: 'Great job!' },
  { min: 60,  emoji: '🙂', reaction: 'Not bad at all!' },
  { min: 50,  emoji: '😐', reaction: 'Room to improve!' },
  { min: 40,  emoji: '😅', reaction: 'Keep practicing!' },
  { min: 30,  emoji: '😬', reaction: 'Tough round!' },
  { min: 20,  emoji: '😰', reaction: "Don't give up!" },
  { min: 0,   emoji: '🫠', reaction: 'We all start somewhere!' },
];

/** Returns the score emoji entry for a given percentage (0-100). */
export function getScoreEmoji(percentage: number): ScoreEmoji {
  return (
    SCORE_EMOJIS.find((e) => percentage >= e.min) ??
    SCORE_EMOJIS[SCORE_EMOJIS.length - 1]
  );
}

// ─── Puzzled emoji hosts ──────────────────────────────────────────────────────
// Backup pool — use GameConfig.theme.emojiHost for the per-game fixed host.

export const PUZZLED_EMOJIS = ['🤔', '🧐', '🤨', '🫤', '😮', '🤓', '🙃', '🤯'];

// ─── Friendship emojis ───────────────────────────────────────────────────────

export const FRIEND_EMOJIS = ['💛', '🤗', '😊', '👋', '🫶', '💜', '🧡', '💚'];

/** Picks a deterministic friendship emoji for a given nickname string. */
export function getFriendEmoji(nickname: string): string {
  const index =
    nickname.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    FRIEND_EMOJIS.length;
  return FRIEND_EMOJIS[index];
}

// ─── Challenge / battle emojis ───────────────────────────────────────────────

export const CHALLENGE_EMOJIS = {
  preparing: ['😤', '💪', '🔥', '⚡'] as const,
  winner: '👑',
  loser: '😤',
  tie: '🤝',
  vs: '⚔️',
};

// ─── Per-game floating decoration emojis ─────────────────────────────────────
// Used as large, low-opacity background decorations on splash and home screens.

export const FLOATING_EMOJIS: Record<string, string[]> = {
  kpop:     ['🎵', '🎤', '🎶', '💜', '🌟', '🎭'],
  animals:  ['🐾', '🦁', '🐘', '🦋', '🐙', '🌿'],
  movies:   ['🎬', '🍿', '🎥', '📽️', '🌟', '🎭'],
  countries:['🌍', '🗺️', '✈️', '🏔️', '🌊', '🏛️'],
  capitals: ['🌍', '🏙️', '🗼', '🏛️', '⛩️', '🗽'],
};

// ─── Recent score row emojis ──────────────────────────────────────────────────
// Decorates each score entry on the HomeScreen based on percentage.

export function getRecentScoreEmoji(percentage: number): string {
  if (percentage === 100) return '🏆';
  if (percentage >= 80) return '🌟';
  if (percentage >= 60) return '👍';
  if (percentage >= 40) return '😅';
  return '💪';
}
