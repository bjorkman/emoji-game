import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { upsertPlayer } from '../lib/db';
import { useAuthStore } from './authStore';

export interface HighScore {
  id: string;
  gameId: string;
  gameTitle: string;
  nickname: string;
  score: number;
  total: number;
  duration?: number; // seconds
  date: string;      // ISO string
}

interface PlayerStore {
  nickname: string | null;
  setNickname: (name: string) => void;
  highScores: HighScore[];
  addScore: (entry: Omit<HighScore, 'date'>) => void; // caller provides id
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      nickname: null,
      setNickname: (name) => {
        const trimmed = name.trim();
        set({ nickname: trimmed });
        // Sync to Supabase if we have an auth session
        const { playerId } = useAuthStore.getState();
        if (playerId && trimmed) {
          upsertPlayer(playerId, trimmed).catch(() => {/* silent — local store is source of truth */});
        }
      },
      highScores: [],
      addScore: (entry) =>
        set((state) => ({
          highScores: [
            { ...entry, date: new Date().toISOString() },
            ...state.highScores,
          ],
        })),
    }),
    { name: 'emoji-game-player' }
  )
);
