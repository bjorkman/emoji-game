import React from 'react';
import { render } from '@testing-library/react-native';
import FeedbackBanner from '../FeedbackBanner';

describe('FeedbackBanner', () => {
  it('renders nothing when feedback is null', () => {
    const { toJSON } = render(<FeedbackBanner feedback={null} correctAnswer="3:00" />);
    expect(toJSON()).toBeNull();
  });

  it('renders "Correct!" on correct feedback', () => {
    const { getByText } = render(<FeedbackBanner feedback="correct" correctAnswer="3:00" />);
    expect(getByText(/Correct!/)).toBeTruthy();
  });

  it('renders the correct answer on wrong feedback', () => {
    const { getByText } = render(<FeedbackBanner feedback="wrong" correctAnswer="3:00" />);
    expect(getByText('3:00')).toBeTruthy();
    expect(getByText(/The answer was/)).toBeTruthy();
  });
});
