import { shuffle, isCorrect } from '../gameLogic';
import { type Question } from '../types';

const makeQuestion = (answer: string, aliases: string[] = []): Question => ({
  id: 1,
  answer,
  clues: ['🎵'],
  difficulty: 'easy',
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
