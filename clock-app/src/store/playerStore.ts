import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { upsertPlayer } from '../services/playerService';
import { useAuthStore } from './authStore';

interface PlayerStore {
  nickname: string | null;
  setNickname: (name: string) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      nickname: null,
      setNickname: (name) => {
        const trimmed = name.trim();
        set({ nickname: trimmed });
        const { playerId } = useAuthStore.getState();
        if (playerId && trimmed) {
          upsertPlayer(playerId, trimmed).catch(() => {});
        }
      },
    }),
    {
      name: 'clock-quest-player',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
