import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import ProgressDots from '../ProgressDots';

describe('ProgressDots', () => {
  it('renders `total` dots', () => {
    const { UNSAFE_queryAllByType } = render(<ProgressDots current={1} total={5} />);
    // outer View + N dots -> expect 1 + 5
    const views = UNSAFE_queryAllByType(View);
    expect(views.length).toBe(6);
  });

  it('renders only a single root view when total is 0', () => {
    const { UNSAFE_queryAllByType } = render(<ProgressDots current={0} total={0} />);
    const views = UNSAFE_queryAllByType(View);
    expect(views.length).toBe(1);
  });

  it('renders one dot per total, regardless of current', () => {
    const { UNSAFE_queryAllByType } = render(<ProgressDots current={10} total={3} />);
    const views = UNSAFE_queryAllByType(View);
    expect(views.length).toBe(4);
  });
});
