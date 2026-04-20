import { getContinent, getAllContinents } from '../registry';

describe('continents registry', () => {
  it('returns all three continents from getAllContinents', () => {
    const all = getAllContinents();
    expect(all.map((c) => c.id)).toEqual(['analogLand', 'digital24', 'digital12']);
  });

  it('getContinent returns the continent with matching id', () => {
    expect(getContinent('analogLand').id).toBe('analogLand');
    expect(getContinent('digital24').id).toBe('digital24');
    expect(getContinent('digital12').id).toBe('digital12');
  });

  it('every continent has a non-empty paths list', () => {
    for (const c of getAllContinents()) {
      expect(c.paths.length).toBeGreaterThan(0);
    }
  });

  it('every path has at least one level', () => {
    for (const c of getAllContinents()) {
      for (const p of c.paths) {
        expect(p.levels.length).toBeGreaterThan(0);
      }
    }
  });

  it('every level has a valid generator config and input mode', () => {
    const validTypes = new Set([
      'wholeHours', 'halfHours', 'quarterHours', 'fiveMinutes', 'anyMinute', 'mixedReview',
    ]);
    for (const c of getAllContinents()) {
      for (const p of c.paths) {
        for (const l of p.levels) {
          expect(validTypes.has(l.generator.type)).toBe(true);
          expect(['multipleChoice', 'freeText']).toContain(l.inputMode);
          expect(l.questionCount).toBeGreaterThan(0);
        }
      }
    }
  });
});
