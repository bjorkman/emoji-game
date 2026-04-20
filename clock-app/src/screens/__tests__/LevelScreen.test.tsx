jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../../lib/haptics', () => ({
  hapticCorrect: jest.fn(),
  hapticWrong: jest.fn(),
  hapticSuccess: jest.fn(),
  hapticSelection: jest.fn(),
}));

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LevelScreen from '../LevelScreen';
import { useProgressStore } from '../../store/progressStore';
import { getContinent } from '../../continents/registry';

function makeProps(levelNumber: number) {
  const navigate = jest.fn();
  const goBack = jest.fn();
  const replace = jest.fn();
  const firstPath = getContinent('analogLand').paths[0];
  return {
    navigate,
    goBack,
    replace,
    props: {
      navigation: { navigate, goBack, replace, setParams: jest.fn() },
      route: {
        params: { continentId: 'analogLand' as const, pathId: firstPath.id, levelNumber },
        key: 'Level',
        name: 'Level',
      },
    } as unknown as Parameters<typeof LevelScreen>[0],
  };
}

describe('LevelScreen', () => {
  beforeEach(() => {
    useProgressStore.setState({ bestStars: {} });
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => { jest.runOnlyPendingTimers(); });
    jest.useRealTimers();
  });

  it('renders the level title in the header', () => {
    const { props } = makeProps(1);
    const path = getContinent('analogLand').paths[0];
    const { getByText } = render(<LevelScreen {...props} />);
    expect(getByText(`${path.title} — Level 1`)).toBeTruthy();
  });

  it('renders a quit button', () => {
    const { props, goBack } = makeProps(1);
    const { getByText } = render(<LevelScreen {...props} />);
    fireEvent.press(getByText(/Quit/));
    expect(goBack).toHaveBeenCalled();
  });

  it('returns null when the level is outside of the static + bonus range', () => {
    const { props } = makeProps(0);
    const { toJSON } = render(<LevelScreen {...props} />);
    expect(toJSON()).toBeNull();
  });
});
