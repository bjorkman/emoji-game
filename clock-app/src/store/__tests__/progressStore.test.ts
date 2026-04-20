jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { useProgressStore } from '../progressStore';
import { getContinent } from '../../continents/registry';

describe('progressStore', () => {
  beforeEach(() => {
    useProgressStore.setState({ bestStars: {} });
  });

  it('returns 0 stars for unplayed levels', () => {
    expect(useProgressStore.getState().getBestStars('analogLand', 'unknown', 1)).toBe(0);
  });

  it('records stars and persists the best-so-far', () => {
    useProgressStore.getState().recordStars('analogLand', 'p', 1, 2);
    expect(useProgressStore.getState().getBestStars('analogLand', 'p', 1)).toBe(2);
  });

  it('does not overwrite a higher score with a lower one', () => {
    useProgressStore.getState().recordStars('analogLand', 'p', 1, 3);
    useProgressStore.getState().recordStars('analogLand', 'p', 1, 1);
    expect(useProgressStore.getState().getBestStars('analogLand', 'p', 1)).toBe(3);
  });

  it('keys bestStars independently per level/path/continent', () => {
    useProgressStore.getState().recordStars('analogLand', 'p1', 1, 2);
    useProgressStore.getState().recordStars('analogLand', 'p2', 1, 3);
    expect(useProgressStore.getState().getBestStars('analogLand', 'p1', 1)).toBe(2);
    expect(useProgressStore.getState().getBestStars('analogLand', 'p2', 1)).toBe(3);
  });

  it('isPathComplete returns false until every level has 3 stars', () => {
    const continent = getContinent('analogLand');
    const path = continent.paths[0];
    expect(useProgressStore.getState().isPathComplete('analogLand', path.id)).toBe(false);

    for (const level of path.levels) {
      useProgressStore.getState().recordStars('analogLand', path.id, level.levelNumber, 2);
    }
    expect(useProgressStore.getState().isPathComplete('analogLand', path.id)).toBe(false);

    for (const level of path.levels) {
      useProgressStore.getState().recordStars('analogLand', path.id, level.levelNumber, 3);
    }
    expect(useProgressStore.getState().isPathComplete('analogLand', path.id)).toBe(true);
  });

  it('isPathComplete returns false for an unknown path', () => {
    expect(useProgressStore.getState().isPathComplete('analogLand', 'nope')).toBe(false);
  });

  it('isContinentComplete requires every level on every path to be 3-star', () => {
    const continent = getContinent('analogLand');
    expect(useProgressStore.getState().isContinentComplete('analogLand')).toBe(false);

    for (const path of continent.paths) {
      for (const level of path.levels) {
        useProgressStore.getState().recordStars('analogLand', path.id, level.levelNumber, 3);
      }
    }
    expect(useProgressStore.getState().isContinentComplete('analogLand')).toBe(true);
  });
});
