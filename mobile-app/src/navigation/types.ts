import { type NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Game: { gameId: string; challengeId?: string };
  Friends: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type GameScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;
export type FriendsScreenProps = NativeStackScreenProps<RootStackParamList, 'Friends'>;
