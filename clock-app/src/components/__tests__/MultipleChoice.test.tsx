import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MultipleChoice from '../MultipleChoice';

describe('MultipleChoice', () => {
  const choices = ['1:00', '2:00', '3:00', '4:00'];

  it('renders every choice', () => {
    const { getByText } = render(
      <MultipleChoice
        choices={choices}
        correctAnswer="3:00"
        feedback={null}
        onSelect={jest.fn()}
      />,
    );
    for (const c of choices) {
      expect(getByText(c)).toBeTruthy();
    }
  });

  it('calls onSelect when a choice is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <MultipleChoice
        choices={choices}
        correctAnswer="3:00"
        feedback={null}
        onSelect={onSelect}
      />,
    );
    fireEvent.press(getByText('2:00'));
    expect(onSelect).toHaveBeenCalledWith('2:00');
  });

  it('does not call onSelect while feedback is shown', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <MultipleChoice
        choices={choices}
        correctAnswer="3:00"
        feedback="wrong"
        onSelect={onSelect}
      />,
    );
    fireEvent.press(getByText('2:00'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
