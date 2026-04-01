import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type ContinentId, type StarRating } from '../core/types';

export type RootStackParamList = {
  WorldMap: undefined;
  Path: { continentId: ContinentId; pathId: string };
  Level: { continentId: ContinentId; pathId: string; levelNumber: number };
  LevelResult: {
    continentId: ContinentId;
    pathId: string;
    levelNumber: number;
    score: number;
    total: number;
    stars: StarRating;
    isNewBest: boolean;
  };
};

export type WorldMapScreenProps = NativeStackScreenProps<RootStackParamList, 'WorldMap'>;
export type PathScreenProps = NativeStackScreenProps<RootStackParamList, 'Path'>;
export type LevelScreenProps = NativeStackScreenProps<RootStackParamList, 'Level'>;
export type LevelResultScreenProps = NativeStackScreenProps<RootStackParamList, 'LevelResult'>;
