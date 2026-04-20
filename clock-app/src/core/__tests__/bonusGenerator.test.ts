import { generateBonusLevel, generateBonusLevels } from '../bonusGenerator';
import { type Path, type LevelDef } from '../types';

const makeLevel = (levelNumber: number): LevelDef => ({
  levelNumber,
  questionCount: 5,
  inputMode: 'multipleChoice',
  generator: { type: 'wholeHours', displayMode: 'analog' },
});

const makePath = (lastLevel: number): Path => ({
  id: 'test-path',
  continentId: 'analogLand',
  title: 'Test Path',
  description: 'A path for tests',
  emoji: '\u{1F570}',
  bossEmoji: '\u{1F989}',
  levels: Array.from({ length: lastLevel }, (_, i) => makeLevel(i + 1)),
});

describe('generateBonusLevel', () => {
  it('uses the given level number', () => {
    const path = makePath(5);
    const bonus = generateBonusLevel(path, 6);
    expect(bonus.levelNumber).toBe(6);
  });

  it('uses freeText input mode', () => {
    const path = makePath(5);
    expect(generateBonusLevel(path, 6).inputMode).toBe('freeText');
  });

  it('inherits the generator config from the last static level', () => {
    const path = makePath(5);
    const bonus = generateBonusLevel(path, 6);
    expect(bonus.generator).toEqual(path.levels[path.levels.length - 1].generator);
  });

  it('scales question count with distance past the last static level', () => {
    const path = makePath(5);
    expect(generateBonusLevel(path, 6).questionCount).toBe(12);
    expect(generateBonusLevel(path, 7).questionCount).toBe(14);
    expect(generateBonusLevel(path, 10).questionCount).toBe(20);
  });
});

describe('generateBonusLevels', () => {
  it('generates the requested number of bonus levels', () => {
    const path = makePath(5);
    expect(generateBonusLevels(path, 5, 3)).toHaveLength(3);
  });

  it('numbers them sequentially after the last static level', () => {
    const path = makePath(5);
    const bonuses = generateBonusLevels(path, 5, 3);
    expect(bonuses.map((b) => b.levelNumber)).toEqual([6, 7, 8]);
  });

  it('returns empty array when count is 0', () => {
    const path = makePath(5);
    expect(generateBonusLevels(path, 5, 0)).toEqual([]);
  });
});
