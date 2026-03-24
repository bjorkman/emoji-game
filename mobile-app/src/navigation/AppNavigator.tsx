import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import FriendsScreen from '../screens/FriendsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0d0d1a' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
    </Stack.Navigator>
  );
}
