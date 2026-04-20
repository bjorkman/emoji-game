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
      signInAnonymously: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-id' } },
        error: null,
      }),
    },
  },
}));

jest.mock('../../services/playerService', () => ({
  upsertPlayer: jest.fn().mockResolvedValue(undefined),
}));

import { usePlayerStore } from '../playerStore';
import { useAuthStore } from '../authStore';
import { upsertPlayer } from '../../services/playerService';

const mockedUpsert = upsertPlayer as jest.MockedFunction<typeof upsertPlayer>;

describe('playerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({ nickname: null });
    useAuthStore.setState({ playerId: null, isReady: false });
    jest.clearAllMocks();
  });

  it('starts with null nickname', () => {
    expect(usePlayerStore.getState().nickname).toBeNull();
  });

  it('sets nickname and trims whitespace', () => {
    usePlayerStore.getState().setNickname('  Tester  ');
    expect(usePlayerStore.getState().nickname).toBe('Tester');
  });

  it('upserts to Supabase when playerId is set', () => {
    useAuthStore.setState({ playerId: 'player-1', isReady: true });
    usePlayerStore.getState().setNickname('Tester');
    expect(mockedUpsert).toHaveBeenCalledWith('player-1', 'Tester');
  });

  it('does not call upsert when no playerId', () => {
    usePlayerStore.getState().setNickname('Tester');
    expect(mockedUpsert).not.toHaveBeenCalled();
  });

  it('does not call upsert when nickname is empty after trim', () => {
    useAuthStore.setState({ playerId: 'player-1', isReady: true });
    usePlayerStore.getState().setNickname('   ');
    expect(mockedUpsert).not.toHaveBeenCalled();
    expect(usePlayerStore.getState().nickname).toBe('');
  });
});
