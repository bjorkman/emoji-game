import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HighScore {
  id: string;
  gameId: string;
  gameTitle: string;
  nickname: string;
  score: number;
  total: number;
  date: string; // ISO string
}

interface PlayerStore {
  nickname: string | null;
  setNickname: (name: string) => void;
  highScores: HighScore[];
  addScore: (entry: Omit<HighScore, 'id' | 'date'>) => void;
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
            { ...entry, id: crypto.randomUUID(), date: new Date().toISOString() },
            ...state.highScores,
          ],
        })),
    }),
    { name: 'emoji-game-player' }
  )
);
