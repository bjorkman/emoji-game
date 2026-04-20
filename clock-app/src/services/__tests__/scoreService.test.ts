const mockInsert = jest.fn();
const mockSelect = jest.fn();
const mockSingle = jest.fn();

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({ insert: mockInsert })),
  },
}));

import { submitScore } from '../scoreService';
import { supabase } from '../../lib/supabase';

const mockedFrom = supabase.from as jest.MockedFunction<typeof supabase.from>;

describe('submitScore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockInsert.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ single: mockSingle });
  });

  const params = {
    playerId: 'p1',
    gameId: 'clock',
    score: 8,
    total: 10,
    duration: 42,
  };

  it('targets the scores table', async () => {
    mockSingle.mockResolvedValue({ data: { id: 'score-1' }, error: null });
    await submitScore(params);
    expect(mockedFrom).toHaveBeenCalledWith('scores');
  });

  it('sends the expected payload shape', async () => {
    mockSingle.mockResolvedValue({ data: { id: 'score-1' }, error: null });
    await submitScore(params);
    expect(mockInsert).toHaveBeenCalledWith({
      player_id: 'p1',
      game_id: 'clock',
      score: 8,
      total: 10,
      duration: 42,
    });
  });

  it('returns the inserted id on success', async () => {
    mockSingle.mockResolvedValue({ data: { id: 'score-1' }, error: null });
    await expect(submitScore(params)).resolves.toBe('score-1');
  });

  it('returns null on supabase error', async () => {
    mockSingle.mockResolvedValue({ data: null, error: { message: 'boom' } });
    await expect(submitScore(params)).resolves.toBeNull();
  });

  it('returns null when no row is returned', async () => {
    mockSingle.mockResolvedValue({ data: null, error: null });
    await expect(submitScore(params)).resolves.toBeNull();
  });
});
