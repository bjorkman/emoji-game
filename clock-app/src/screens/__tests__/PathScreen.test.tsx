jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PathScreen from '../PathScreen';
import { useProgressStore } from '../../store/progressStore';
import { getContinent } from '../../continents/registry';

function makeProps(pathId: string) {
  const navigate = jest.fn();
  const goBack = jest.fn();
  return {
    navigate,
    goBack,
    props: {
      navigation: { navigate, goBack, setParams: jest.fn(), replace: jest.fn() },
      route: {
        params: { continentId: 'analogLand' as const, pathId },
        key: 'Path',
        name: 'Path',
      },
    } as unknown as Parameters<typeof PathScreen>[0],
  };
}

describe('PathScreen', () => {
  beforeEach(() => {
    useProgressStore.setState({ bestStars: {} });
  });

  const firstPathId = getContinent('analogLand').paths[0].id;
  const path = getContinent('analogLand').paths[0];

  it('renders the path title and description', () => {
    const { props } = makeProps(firstPathId);
    const { getAllByText, getByText } = render(<PathScreen {...props} />);
    // Title appears in the header and the path chip.
    expect(getAllByText(path.title).length).toBeGreaterThan(0);
    expect(getByText(path.description)).toBeTruthy();
  });

  it('renders a LevelCard for each static level', () => {
    const { props } = makeProps(firstPathId);
    const { getAllByText } = render(<PathScreen {...props} />);
    for (const level of path.levels) {
      expect(getAllByText(`Level ${level.levelNumber}`).length).toBeGreaterThan(0);
    }
  });

  it('navigates to Level when a level card is pressed', () => {
    const { props, navigate } = makeProps(firstPathId);
    const { getAllByText } = render(<PathScreen {...props} />);
    fireEvent.press(getAllByText(`Level ${path.levels[0].levelNumber}`)[0]);
    expect(navigate).toHaveBeenCalledWith(
      'Level',
      expect.objectContaining({
        continentId: 'analogLand',
        pathId: firstPathId,
        levelNumber: path.levels[0].levelNumber,
      }),
    );
  });

  it('shows locked boss message until path is complete', () => {
    const { props } = makeProps(firstPathId);
    const { getByText } = render(<PathScreen {...props} />);
    expect(getByText(/Get 3 stars on every level/)).toBeTruthy();
  });

  it('shows bonus levels once path is complete', () => {
    const state: Record<string, 3> = {};
    for (const l of path.levels) {
      state[`analogLand:${firstPathId}:${l.levelNumber}`] = 3;
    }
    useProgressStore.setState({ bestStars: state });

    const { props } = makeProps(firstPathId);
    const { getByText } = render(<PathScreen {...props} />);
    expect(getByText(/Bonus Levels/)).toBeTruthy();
    expect(getByText(/Boss Collected/)).toBeTruthy();
  });

  it('goes back when Back to Map pressed', () => {
    const { props, goBack } = makeProps(firstPathId);
    const { getByText } = render(<PathScreen {...props} />);
    fireEvent.press(getByText(/Back to Map/));
    expect(goBack).toHaveBeenCalled();
  });
});
