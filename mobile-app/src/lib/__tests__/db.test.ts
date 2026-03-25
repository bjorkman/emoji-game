const mockSingle = jest.fn();
const mockLimit = jest.fn(() => ({ single: mockSingle }));
const mockIlike = jest.fn(() => ({ limit: mockLimit }));
const mockEqWithSingle = jest.fn(() => ({ single: mockSingle }));
const mockOrder2 = jest.fn(() => ({ limit: mockLimit }));
const mockOrder = jest.fn(() => ({ order: mockOrder2 }));
const mockSelect = jest.fn(() => ({
  eq: mockEqWithSingle,
  ilike: mockIlike,
  order: mockOrder,
}));
const mockInsertSelect = jest.fn(() => ({ single: mockSingle }));
const mockInsert = jest.fn(() => ({ select: mockInsertSelect }));
const mockUpdate = jest.fn(() => ({ eq: jest.fn().mockResolvedValue({ error: null }) }));
const mockUpsert = jest.fn().mockResolvedValue({ error: null });

jest.mock('../supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
      upsert: mockUpsert,
    })),
  },
}));

import { supabase } from '../supabase';
import { upsertPlayer, searchPlayersByNickname } from '../../services/playerService';
import { submitScore } from '../../services/scoreService';
import { fetchChallenge } from '../../services/challengeService';

describe('db', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('upsertPlayer', () => {
    it('calls supabase.from("players").upsert with id and nickname', async () => {
      await upsertPlayer('player-1', 'TestUser');
      expect(supabase.from).toHaveBeenCalledWith('players');
      expect(mockUpsert).toHaveBeenCalledWith(
        { id: 'player-1', nickname: 'TestUser' },
        { onConflict: 'id' }
      );
    });
  });

  describe('searchPlayersByNickname', () => {
    it('returns matching players', async () => {
      const mockData = [{ id: 'p1', nickname: 'Alice' }];
      mockLimit.mockResolvedValueOnce({ data: mockData, error: null });

      const result = await searchPlayersByNickname('ali');
      expect(supabase.from).toHaveBeenCalledWith('players');
      expect(result).toEqual(mockData);
    });

    it('returns empty array on error', async () => {
      mockLimit.mockResolvedValueOnce({ data: null, error: { message: 'fail' } });

      const result = await searchPlayersByNickname('test');
      expect(result).toEqual([]);
    });
  });

  describe('submitScore', () => {
    it('inserts a score row and returns the id', async () => {
      mockSingle.mockResolvedValueOnce({ data: { id: 'score-abc' }, error: null });

      const result = await submitScore({
        playerId: 'p1',
        gameId: 'kpop',
        gameTitle: 'K-Pop',
        score: 20,
        total: 25,
      });
      expect(supabase.from).toHaveBeenCalledWith('scores');
      expect(result).toBe('score-abc');
    });
  });

  describe('fetchChallenge', () => {
    it('looks up challenge by uppercase code', async () => {
      mockSingle.mockResolvedValueOnce({ data: { id: 'ch-1', game_id: 'kpop' }, error: null });

      const result = await fetchChallenge('kpop-ab12');
      expect(supabase.from).toHaveBeenCalledWith('challenges');
      expect(result).toEqual({ id: 'ch-1', game_id: 'kpop' });
    });

    it('returns null on error', async () => {
      mockSingle.mockResolvedValueOnce({ data: null, error: { message: 'not found' } });

      const result = await fetchChallenge('INVALID');
      expect(result).toBeNull();
    });
  });
});
