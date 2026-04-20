jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WorldMapScreen from '../WorldMapScreen';
import { useProgressStore } from '../../store/progressStore';
import { getContinent } from '../../continents/registry';

function makeProps() {
  const navigate = jest.fn();
  return {
    navigate,
    props: {
      navigation: {
        navigate,
        goBack: jest.fn(),
        setParams: jest.fn(),
        replace: jest.fn(),
      },
      route: { params: undefined, key: 'WorldMap', name: 'WorldMap' },
    } as unknown as Parameters<typeof WorldMapScreen>[0],
  };
}

describe('WorldMapScreen', () => {
  beforeEach(() => {
    useProgressStore.setState({ bestStars: {} });
  });

  it('renders the header', () => {
    const { props } = makeProps();
    const { getByText } = render(<WorldMapScreen {...props} />);
    expect(getByText(/Clock Quest/)).toBeTruthy();
    expect(getByText('Choose your adventure')).toBeTruthy();
  });

  it('renders every continent by title', () => {
    const { props } = makeProps();
    const { getByText } = render(<WorldMapScreen {...props} />);
    expect(getByText('Analog Land')).toBeTruthy();
    // digital24 / digital12 start locked but still render their titles
    expect(getByText(getContinent('digital24').title)).toBeTruthy();
    expect(getByText(getContinent('digital12').title)).toBeTruthy();
  });

  it('locks non-prerequisite continents initially', () => {
    const { props } = makeProps();
    const { getAllByText } = render(<WorldMapScreen {...props} />);
    // Both digital24 and digital12 start locked.
    expect(getAllByText(/Complete the previous continent/).length).toBeGreaterThanOrEqual(1);
  });

  it('navigates to Path when an unlocked continent is pressed', () => {
    const { props, navigate } = makeProps();
    const { getByText } = render(<WorldMapScreen {...props} />);
    fireEvent.press(getByText('Analog Land'));
    expect(navigate).toHaveBeenCalledWith('Path', expect.objectContaining({
      continentId: 'analogLand',
    }));
  });

  it('unlocks the next continent once the prerequisite is complete', () => {
    const analog = getContinent('analogLand');
    const state: Record<string, 3> = {};
    for (const p of analog.paths) {
      for (const l of p.levels) {
        state[`analogLand:${p.id}:${l.levelNumber}`] = 3;
      }
    }
    useProgressStore.setState({ bestStars: state });

    const { props } = makeProps();
    const { queryByText } = render(<WorldMapScreen {...props} />);
    // digital24 should now be unlocked; digital12 should still be locked
    // Both share the same "Complete the previous continent" copy when locked.
    // With one prerequisite complete we expect only one locked continent left.
    const locks = queryByText(/Complete the previous continent/);
    expect(locks).toBeTruthy();
  });
});
