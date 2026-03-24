import REGISTRY from '../registry';
import { type GameConfig } from '../../core/types';

describe('Game Registry', () => {
  const gameIds = ['kpop', 'animals', 'movies', 'countries', 'capitals'];

  it('has all 5 games registered', () => {
    expect(Object.keys(REGISTRY).sort()).toEqual(gameIds.sort());
  });

  it.each(gameIds)('%s has a valid GameConfig', (gameId) => {
    const config: GameConfig = REGISTRY[gameId];

    expect(config.id).toBe(gameId);
    expect(config.title).toBeTruthy();
    expect(config.eyebrow).toBeTruthy();
    expect(config.tagline).toBeTruthy();
    expect(config.inputPlaceholder).toBeTruthy();
    expect(config.instructions.length).toBeGreaterThan(0);
    expect(config.grades.length).toBeGreaterThan(0);
  });

  it.each(gameIds)('%s has a valid theme', (gameId) => {
    const { theme } = REGISTRY[gameId];

    expect(theme.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(theme.secondary).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(theme.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(theme.splashBg).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(theme.secondaryRgb).toMatch(/^\d+,\s*\d+,\s*\d+$/);
  });

  it.each(gameIds)('%s has at least 20 questions', (gameId) => {
    expect(REGISTRY[gameId].questions.length).toBeGreaterThanOrEqual(20);
  });

  it.each(gameIds)('%s questions have required fields', (gameId) => {
    for (const q of REGISTRY[gameId].questions) {
      expect(q.id).toBeDefined();
      expect(q.answer).toBeTruthy();
      expect(q.clues.length).toBeGreaterThan(0);
      expect(['easy', 'medium', 'hard']).toContain(q.difficulty);
      expect(Array.isArray(q.aliases)).toBe(true);
    }
  });

  it.each(gameIds)('%s grades are sorted descending by min', (gameId) => {
    const { grades } = REGISTRY[gameId];
    for (let i = 1; i < grades.length; i++) {
      expect(grades[i - 1].min).toBeGreaterThan(grades[i].min);
    }
  });
});
