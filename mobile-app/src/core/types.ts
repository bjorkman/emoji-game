export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: '#22c55e',
  medium: '#f59e0b',
  hard: '#ef4444',
};
export type Feedback = 'correct' | 'wrong' | null;

export interface Question {
  id: number;
  answer: string;
  clues: string[];
  difficulty: Difficulty;
  aliases: string[];
  hint?: string;
  retired?: boolean;
}

export interface Theme {
  primary: string;
  secondary: string;
  secondaryRgb: string; // e.g. "167, 139, 250" — for use in rgba()
  accent: string;
  splashBg: string;
  // Gradient system (Emoji Movie redesign)
  gradientBg: [string, string, string];      // 3-stop full-screen background
  gradientCard: [string, string];            // 2-stop card/surface background
  gradientAccent: [string, string, string];  // 3-stop CTA/button background
  glowColor: string;                         // neon glow for borders & shadows
  emojiHost: string;                         // puzzled emoji character for this game
}

export interface GameConfig {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  inputPlaceholder: string;
  instructions: [string, string][];
  grades: { min: number; label: string }[];
  theme: Theme;
  questions: Question[];
  questionCount?: number;
  splashCards: { name: string; img: string }[];
}
