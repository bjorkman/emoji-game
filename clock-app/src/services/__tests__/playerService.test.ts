const mockUpsert = jest.fn();
const mockSelect = jest.fn();
const mockIlike = jest.fn();
const mockLimit = jest.fn();

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: mockUpsert,
      select: mockSelect,
    })),
  },
}));

import { upsertPlayer, searchPlayersByNickname } from '../playerService';
import { supabase } from '../../lib/supabase';

const mockedFrom = supabase.from as jest.MockedFunction<typeof supabase.from>;

describe('upsertPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpsert.mockResolvedValue({ error: null });
  });

  it('targets the players table', async () => {
    await upsertPlayer('abc', 'Tester');
    expect(mockedFrom).toHaveBeenCalledWith('players');
  });

  it('passes id/nickname and conflict key', async () => {
    await upsertPlayer('abc', 'Tester');
    expect(mockUpsert).toHaveBeenCalledWith({ id: 'abc', nickname: 'Tester' }, { onConflict: 'id' });
  });

  it('resolves even on supabase error', async () => {
    mockUpsert.mockResolvedValue({ error: { message: 'boom' } });
    await expect(upsertPlayer('abc', 'Tester')).resolves.toBeUndefined();
  });
});

describe('searchPlayersByNickname', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelect.mockReturnValue({ ilike: mockIlike });
    mockIlike.mockReturnValue({ limit: mockLimit });
  });

  it('queries players table with ilike wildcard and limit 10', async () => {
    mockLimit.mockResolvedValue({ data: [], error: null });
    await searchPlayersByNickname('Test');
    expect(mockedFrom).toHaveBeenCalledWith('players');
    expect(mockSelect).toHaveBeenCalledWith('id, nickname');
    expect(mockIlike).toHaveBeenCalledWith('nickname', '%Test%');
    expect(mockLimit).toHaveBeenCalledWith(10);
  });

  it('returns the rows on success', async () => {
    const rows = [{ id: 'a', nickname: 'Amy' }];
    mockLimit.mockResolvedValue({ data: rows, error: null });
    const result = await searchPlayersByNickname('Amy');
    expect(result).toEqual(rows);
  });

  it('returns empty array on error', async () => {
    mockLimit.mockResolvedValue({ data: null, error: { message: 'boom' } });
    const result = await searchPlayersByNickname('Amy');
    expect(result).toEqual([]);
  });

  it('returns empty array when data is null and no error', async () => {
    mockLimit.mockResolvedValue({ data: null, error: null });
    const result = await searchPlayersByNickname('Amy');
    expect(result).toEqual([]);
  });
});
