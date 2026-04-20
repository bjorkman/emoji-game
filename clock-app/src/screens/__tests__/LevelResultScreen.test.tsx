jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LevelResultScreen from '../LevelResultScreen';
import { useProgressStore } from '../../store/progressStore';
import { getContinent } from '../../continents/registry';
import { type StarRating } from '../../core/types';

function makeProps(stars: StarRating, isNewBest = false) {
  const navigate = jest.fn();
  const replace = jest.fn();
  const firstPath = getContinent('analogLand').paths[0];
  return {
    navigate,
    replace,
    props: {
      navigation: { navigate, replace, goBack: jest.fn(), setParams: jest.fn() },
      route: {
        params: {
          continentId: 'analogLand' as const,
          pathId: firstPath.id,
          levelNumber: 1,
          score: stars === 3 ? 5 : 3,
          total: 5,
          stars,
          isNewBest,
        },
        key: 'LevelResult',
        name: 'LevelResult',
      },
    } as unknown as Parameters<typeof LevelResultScreen>[0],
  };
}

describe('LevelResultScreen', () => {
  beforeEach(() => {
    useProgressStore.setState({ bestStars: {} });
  });

  it('renders the score', () => {
    const { props } = makeProps(2);
    const { getByText } = render(<LevelResultScreen {...props} />);
    expect(getByText('3 / 5')).toBeTruthy();
  });

  it('renders a 3-star message', () => {
    const { props } = makeProps(3);
    const { getByText } = render(<LevelResultScreen {...props} />);
    expect(getByText('Perfect score! Amazing!')).toBeTruthy();
  });

  it('renders New Best when isNewBest is true', () => {
    const { props } = makeProps(2, true);
    const { getByText } = render(<LevelResultScreen {...props} />);
    expect(getByText(/New Best!/)).toBeTruthy();
  });

  it('omits New Best when isNewBest is false', () => {
    const { props } = makeProps(2);
    const { queryByText } = render(<LevelResultScreen {...props} />);
    expect(queryByText(/New Best!/)).toBeNull();
  });

  it('navigates back to Path when Back to Path pressed', () => {
    const { props, navigate } = makeProps(2);
    const { getByText } = render(<LevelResultScreen {...props} />);
    fireEvent.press(getByText('Back to Path'));
    expect(navigate).toHaveBeenCalledWith('Path', expect.objectContaining({
      continentId: 'analogLand',
    }));
  });

  it('replaces to the same level when Try Again pressed', () => {
    const { props, replace } = makeProps(1);
    const { getByText } = render(<LevelResultScreen {...props} />);
    fireEvent.press(getByText('Try Again'));
    expect(replace).toHaveBeenCalledWith('Level', expect.objectContaining({
      levelNumber: 1,
    }));
  });

  it('shows Next Level when there is a next level and score > 0', () => {
    const { props, replace } = makeProps(2);
    const { getByText } = render(<LevelResultScreen {...props} />);
    fireEvent.press(getByText('Next Level'));
    expect(replace).toHaveBeenCalledWith('Level', expect.objectContaining({
      levelNumber: 2,
    }));
  });
});
