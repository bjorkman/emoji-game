import { type Question } from './types';

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '');
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mulberry32 — deterministic 32-bit PRNG. Returns a function that yields floats in [0, 1). */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates shuffle using a seeded PRNG — same seed always produces the same result. */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Select a difficulty-balanced subset of questions using a seeded PRNG. */
export function selectBalancedSubset(
  questions: Question[],
  count: number,
  seed: number,
): Question[] {
  if (count >= questions.length) return seededShuffle(questions, seed);

  const groups: Record<string, Question[]> = {};
  for (const q of questions) {
    (groups[q.difficulty] ??= []).push(q);
  }

  // Target ratio: 30% easy, 40% medium, 30% hard
  const targets: { difficulty: string; seedOffset: number; target: number }[] = [
    { difficulty: 'easy', seedOffset: 1, target: Math.round(count * 0.3) },
    { difficulty: 'medium', seedOffset: 2, target: count - 2 * Math.round(count * 0.3) },
    { difficulty: 'hard', seedOffset: 3, target: Math.round(count * 0.3) },
  ];

  const picked: Question[] = [];
  let remaining = count;

  for (const { difficulty, seedOffset, target } of targets) {
    const pool = groups[difficulty] ?? [];
    const shuffled = seededShuffle(pool, seed + seedOffset);
    const take = Math.min(target, shuffled.length, remaining);
    picked.push(...shuffled.slice(0, take));
    remaining -= take;
  }

  // If any group was too small, fill from leftover questions
  if (remaining > 0) {
    const pickedIds = new Set(picked.map(q => q.id));
    const leftovers = questions.filter(q => !pickedIds.has(q.id));
    const shuffledLeftovers = seededShuffle(leftovers, seed + 7);
    picked.push(...shuffledLeftovers.slice(0, remaining));
  }

  return seededShuffle(picked, seed + 13);
}

export function isCorrect(input: string, question: Question): boolean {
  const n = normalize(input);
  if (!n) return false;
  return [question.answer, ...question.aliases].map(normalize).includes(n);
}
