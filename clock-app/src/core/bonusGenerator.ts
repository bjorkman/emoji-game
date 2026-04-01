import { type Path, type LevelDef } from './types';

/**
 * Generate a single bonus level at the given number.
 * Bonus levels are always freeText, use the path's last generator config,
 * and increase in question count based on how far beyond the static levels they are.
 */
export function generateBonusLevel(path: Path, levelNumber: number): LevelDef {
  const lastLevel = path.levels[path.levels.length - 1];
  const bonusIndex = levelNumber - lastLevel.levelNumber;
  return {
    levelNumber,
    questionCount: 10 + bonusIndex * 2,
    inputMode: 'freeText',
    generator: lastLevel.generator,
  };
}

/**
 * Generate multiple bonus levels starting after the last static level.
 */
export function generateBonusLevels(
  path: Path,
  lastStaticLevelNumber: number,
  count: number,
): LevelDef[] {
  return Array.from({ length: count }, (_, i) =>
    generateBonusLevel(path, lastStaticLevelNumber + i + 1)
  );
}
