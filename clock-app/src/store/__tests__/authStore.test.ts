const mockGetSession = jest.fn();
const mockSignInAnonymously = jest.fn();

jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      get getSession() { return mockGetSession; },
      get signInAnonymously() { return mockSignInAnonymously; },
    },
  },
}));

import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ playerId: null, isReady: false });
    jest.clearAllMocks();
  });

  it('starts with null playerId and not ready', () => {
    const state = useAuthStore.getState();
    expect(state.playerId).toBeNull();
    expect(state.isReady).toBe(false);
  });

  it('uses existing session if available', async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: 'existing-user-123' } } },
    });

    await useAuthStore.getState().init();

    const state = useAuthStore.getState();
    expect(state.playerId).toBe('existing-user-123');
    expect(state.isReady).toBe(true);
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
  });

  it('signs in anonymously when no session exists', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockSignInAnonymously.mockResolvedValue({
      data: { user: { id: 'anon-user-456' } },
      error: null,
    });

    await useAuthStore.getState().init();

    const state = useAuthStore.getState();
    expect(state.playerId).toBe('anon-user-456');
    expect(state.isReady).toBe(true);
  });

  it('handles sign-in failure gracefully', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockSignInAnonymously.mockResolvedValue({
      data: { user: null },
      error: { message: 'Network error' },
    });

    await useAuthStore.getState().init();

    const state = useAuthStore.getState();
    expect(state.playerId).toBeNull();
    expect(state.isReady).toBe(true);
  });
});
