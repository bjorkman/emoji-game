jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
    })),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({ data: { user: { id: 'test-id' } }, error: null }),
    },
  },
}));

import { usePlayerStore } from '../playerStore';

describe('playerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({
      nickname: null,
      highScores: [],
    });
  });

  it('starts with null nickname', () => {
    expect(usePlayerStore.getState().nickname).toBeNull();
  });

  it('sets nickname', () => {
    usePlayerStore.getState().setNickname('TestPlayer');
    expect(usePlayerStore.getState().nickname).toBe('TestPlayer');
  });

  it('trims nickname whitespace', () => {
    usePlayerStore.getState().setNickname('  SpaceName  ');
    expect(usePlayerStore.getState().nickname).toBe('SpaceName');
  });

  it('starts with empty highScores', () => {
    expect(usePlayerStore.getState().highScores).toEqual([]);
  });

  it('adds a score with date', () => {
    usePlayerStore.getState().addScore({
      id: 'score-1',
      gameId: 'kpop',
      gameTitle: 'K-Pop',
      nickname: 'Tester',
      score: 20,
      total: 25,
      duration: 60,
    });

    const scores = usePlayerStore.getState().highScores;
    expect(scores).toHaveLength(1);
    expect(scores[0].score).toBe(20);
    expect(scores[0].gameId).toBe('kpop');
    expect(scores[0].date).toBeDefined();
  });

  it('prepends new scores (most recent first)', () => {
    const { addScore } = usePlayerStore.getState();
    addScore({ id: 'a', gameId: 'kpop', gameTitle: 'K-Pop', nickname: 'P', score: 10, total: 25, duration: 60 });
    addScore({ id: 'b', gameId: 'kpop', gameTitle: 'K-Pop', nickname: 'P', score: 20, total: 25, duration: 45 });

    const scores = usePlayerStore.getState().highScores;
    expect(scores[0].id).toBe('b');
    expect(scores[1].id).toBe('a');
  });

  it('caps highScores at 50 entries', () => {
    const { addScore } = usePlayerStore.getState();
    for (let i = 0; i < 55; i++) {
      addScore({ id: `s-${i}`, gameId: 'kpop', gameTitle: 'K-Pop', nickname: 'P', score: i, total: 25, duration: 60 });
    }
    expect(usePlayerStore.getState().highScores).toHaveLength(50);
  });
});
