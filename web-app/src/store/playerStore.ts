import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      setNickname: (name) => set({ nickname: name.trim() }),
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
