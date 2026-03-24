import React from 'react';
import { render } from '@testing-library/react-native';
import FeedbackBanner from '../FeedbackBanner';

describe('FeedbackBanner', () => {
  it('renders nothing when feedback is null', () => {
    const { toJSON } = render(<FeedbackBanner feedback={null} correctAnswer="CAT" />);
    expect(toJSON()).toBeNull();
  });

  it('shows correct message', () => {
    const { getByText } = render(<FeedbackBanner feedback="correct" correctAnswer="CAT" />);
    expect(getByText('Correct! 🎉')).toBeTruthy();
  });

  it('shows wrong message with correct answer', () => {
    const { getByText } = render(<FeedbackBanner feedback="wrong" correctAnswer="CAT" />);
    expect(getByText('CAT')).toBeTruthy();
  });
});
