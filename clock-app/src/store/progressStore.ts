import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type StarRating, type ContinentId } from '../core/types';
import { getContinent } from '../continents/registry';

function makeKey(continentId: string, pathId: string, levelNumber: number): string {
  return `${continentId}:${pathId}:${levelNumber}`;
}

interface ProgressStore {
  bestStars: Record<string, StarRating>;
  recordStars: (continentId: string, pathId: string, levelNumber: number, stars: StarRating) => void;
  getBestStars: (continentId: string, pathId: string, levelNumber: number) => StarRating;
  isPathComplete: (continentId: ContinentId, pathId: string) => boolean;
  isContinentComplete: (continentId: ContinentId) => boolean;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      bestStars: {},

      recordStars: (continentId, pathId, levelNumber, stars) => {
        const key = makeKey(continentId, pathId, levelNumber);
        const current = get().bestStars[key] ?? 0;
        if (stars > current) {
          set((state) => ({
            bestStars: { ...state.bestStars, [key]: stars },
          }));
        }
      },

      getBestStars: (continentId, pathId, levelNumber) => {
        const key = makeKey(continentId, pathId, levelNumber);
        return get().bestStars[key] ?? 0;
      },

      isPathComplete: (continentId, pathId) => {
        const continent = getContinent(continentId);
        const path = continent.paths.find((p) => p.id === pathId);
        if (!path) return false;
        const stars = get().bestStars;
        return path.levels.every(
          (level) => (stars[makeKey(continentId, pathId, level.levelNumber)] ?? 0) >= 3
        );
      },

      isContinentComplete: (continentId) => {
        const continent = getContinent(continentId);
        const stars = get().bestStars;
        return continent.paths.every((path) =>
          path.levels.every(
            (level) => (stars[makeKey(continentId, path.id, level.levelNumber)] ?? 0) >= 3
          )
        );
      },
    }),
    {
      name: 'clock-quest-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
