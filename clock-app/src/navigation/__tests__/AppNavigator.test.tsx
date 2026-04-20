jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
    })),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-player' } },
        error: null,
      }),
    },
  },
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';

describe('AppNavigator', () => {
  it('renders WorldMap as the initial route', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>,
    );
    expect(getByText('Choose your adventure')).toBeTruthy();
  });

  it('renders Analog Land continent on start', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>,
    );
    expect(getByText('Analog Land')).toBeTruthy();
  });
});
