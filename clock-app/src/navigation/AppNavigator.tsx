import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type RootStackParamList } from './types';
import WorldMapScreen from '../screens/WorldMapScreen';
import PathScreen from '../screens/PathScreen';
import LevelScreen from '../screens/LevelScreen';
import LevelResultScreen from '../screens/LevelResultScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0a1628' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="WorldMap" component={WorldMapScreen} />
      <Stack.Screen name="Path" component={PathScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="LevelResult" component={LevelResultScreen} />
    </Stack.Navigator>
  );
}
