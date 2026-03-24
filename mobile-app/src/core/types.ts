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
}

export interface Theme {
  primary: string;
  secondary: string;
  secondaryRgb: string; // e.g. "167, 139, 250" — for use in rgba()
  accent: string;
  splashBg: string;
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
  splashCards: { name: string; img: string }[];
}
