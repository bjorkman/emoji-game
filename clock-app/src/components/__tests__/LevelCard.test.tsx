import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LevelCard from '../LevelCard';

describe('LevelCard', () => {
  it('renders the level title and multiple-choice label', () => {
    const { getByText } = render(
      <LevelCard levelNumber={3} inputMode="multipleChoice" bestStars={0} onPress={jest.fn()} />,
    );
    expect(getByText('Level 3')).toBeTruthy();
    expect(getByText('Multiple Choice')).toBeTruthy();
  });

  it('shows the free-text mode label when inputMode is freeText', () => {
    const { getByText } = render(
      <LevelCard levelNumber={3} inputMode="freeText" bestStars={0} onPress={jest.fn()} />,
    );
    expect(getByText('Type the Time')).toBeTruthy();
  });

  it('shows the level number badge for non-bonus levels', () => {
    const { getByText } = render(
      <LevelCard levelNumber={4} inputMode="multipleChoice" bestStars={0} onPress={jest.fn()} />,
    );
    expect(getByText('4')).toBeTruthy();
  });

  it('shows the infinity badge for bonus levels', () => {
    const { getByText } = render(
      <LevelCard levelNumber={9} inputMode="freeText" bestStars={0} onPress={jest.fn()} isBonus />,
    );
    expect(getByText('\u{267E}')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <LevelCard levelNumber={1} inputMode="multipleChoice" bestStars={2} onPress={onPress} />,
    );
    fireEvent.press(getByText('Level 1'));
    expect(onPress).toHaveBeenCalled();
  });
});
