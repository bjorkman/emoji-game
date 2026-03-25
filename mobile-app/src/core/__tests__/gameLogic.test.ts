import {
  shuffle,
  seededShuffle,
  selectBalancedSubset,
  isCorrect,
} from '../gameLogic';
import { type Question } from '../types';

const makeQuestion = (
  answer: string,
  aliases: string[] = [],
  difficulty: Question['difficulty'] = 'easy',
  id: number = 1,
): Question => ({
  id,
  answer,
  clues: ['🎵'],
  difficulty,
  aliases,
});

describe('shuffle', () => {
  it('returns an array of the same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
  });

  it('contains all original elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });

  it('returns empty array for empty input', () => {
    expect(shuffle([])).toEqual([]);
  });
});

describe('seededShuffle', () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('is deterministic — same seed produces same result', () => {
    const a = seededShuffle(input, 42);
    const b = seededShuffle(input, 42);
    expect(a).toEqual(b);
  });

  it('different seeds produce different results', () => {
    const a = seededShuffle(input, 42);
    const b = seededShuffle(input, 99);
    expect(a).not.toEqual(b);
  });

  it('contains all original elements', () => {
    const result = seededShuffle(input, 42);
    expect(result.sort((a, b) => a - b)).toEqual(input);
  });

  it('does not mutate the original array', () => {
    const copy = [...input];
    seededShuffle(input, 42);
    expect(input).toEqual(copy);
  });

  it('returns empty array for empty input', () => {
    expect(seededShuffle([], 42)).toEqual([]);
  });

  it('handles single-element array', () => {
    expect(seededShuffle([1], 42)).toEqual([1]);
  });
});

describe('selectBalancedSubset', () => {
  const pool: Question[] = [
    ...Array.from({ length: 10 }, (_, i) => makeQuestion(`easy-${i}`, [], 'easy', i)),
    ...Array.from({ length: 15 }, (_, i) => makeQuestion(`med-${i}`, [], 'medium', 100 + i)),
    ...Array.from({ length: 10 }, (_, i) => makeQuestion(`hard-${i}`, [], 'hard', 200 + i)),
  ];

  it('returns the requested number of questions', () => {
    const result = selectBalancedSubset(pool, 10, 42);
    expect(result).toHaveLength(10);
  });

  it('is deterministic — same seed produces same result', () => {
    const a = selectBalancedSubset(pool, 10, 42);
    const b = selectBalancedSubset(pool, 10, 42);
    expect(a).toEqual(b);
  });

  it('different seeds produce different results', () => {
    const a = selectBalancedSubset(pool, 10, 42);
    const b = selectBalancedSubset(pool, 10, 99);
    const aIds = a.map(q => q.id);
    const bIds = b.map(q => q.id);
    expect(aIds).not.toEqual(bIds);
  });

  it('includes a mix of difficulties', () => {
    const result = selectBalancedSubset(pool, 10, 42);
    const counts = { easy: 0, medium: 0, hard: 0 };
    for (const q of result) counts[q.difficulty]++;
    expect(counts.easy).toBeGreaterThan(0);
    expect(counts.medium).toBeGreaterThan(0);
    expect(counts.hard).toBeGreaterThan(0);
  });

  it('returns all questions when count >= pool size', () => {
    const result = selectBalancedSubset(pool, 100, 42);
    expect(result).toHaveLength(pool.length);
  });

  it('handles pool with missing difficulty group', () => {
    const easyOnly = Array.from({ length: 20 }, (_, i) =>
      makeQuestion(`e-${i}`, [], 'easy', i),
    );
    const result = selectBalancedSubset(easyOnly, 10, 42);
    expect(result).toHaveLength(10);
  });

  it('has no duplicate questions', () => {
    const result = selectBalancedSubset(pool, 10, 42);
    const ids = result.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('isCorrect', () => {
  it('matches exact answer', () => {
    const q = makeQuestion('BLACKPINK');
    expect(isCorrect('BLACKPINK', q)).toBe(true);
  });

  it('is case-insensitive', () => {
    const q = makeQuestion('BLACKPINK');
    expect(isCorrect('blackpink', q)).toBe(true);
    expect(isCorrect('BlackPink', q)).toBe(true);
  });

  it('trims whitespace', () => {
    const q = makeQuestion('BLACKPINK');
    expect(isCorrect('  BLACKPINK  ', q)).toBe(true);
  });

  it('matches aliases', () => {
    const q = makeQuestion('BLACKPINK', ['black pink', 'bp']);
    expect(isCorrect('black pink', q)).toBe(true);
    expect(isCorrect('BP', q)).toBe(true);
  });

  it('is accent-insensitive', () => {
    const q = makeQuestion('Brasília', ['brasilia']);
    expect(isCorrect('Brasilia', q)).toBe(true);
    expect(isCorrect('brasília', q)).toBe(true);
  });

  it('rejects empty input', () => {
    const q = makeQuestion('BLACKPINK');
    expect(isCorrect('', q)).toBe(false);
    expect(isCorrect('   ', q)).toBe(false);
  });

  it('rejects wrong answer', () => {
    const q = makeQuestion('BLACKPINK');
    expect(isCorrect('TWICE', q)).toBe(false);
  });
});
