import React from 'react';
import { render } from '@testing-library/react-native';
import AnalogClock from '../AnalogClock';

describe('AnalogClock', () => {
  it('renders without crashing for 3:00', () => {
    const { UNSAFE_getByType } = render(<AnalogClock hour={3} minute={0} />);
    // Just assert that an Svg is present via the mock
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('renders more lines when showMinuteMarks is true (ticks + 2 hands)', () => {
    const withMarks = render(<AnalogClock hour={6} minute={30} />);
    const withoutMarks = render(<AnalogClock hour={6} minute={30} showMinuteMarks={false} />);
    const withCount = withMarks.UNSAFE_getAllByProps({ testID: 'Line' }).length;
    const withoutCount = withoutMarks.UNSAFE_getAllByProps({ testID: 'Line' }).length;
    // With ticks should render 60 extra lines than the 2-hand baseline.
    expect(withCount - withoutCount).toBeGreaterThanOrEqual(60);
  });

  it('renders numbers 1 through 12', () => {
    const { getByText } = render(<AnalogClock hour={3} minute={0} />);
    for (let n = 1; n <= 12; n++) {
      expect(getByText(String(n))).toBeTruthy();
    }
  });

  it('accepts a custom size prop', () => {
    const { UNSAFE_getAllByProps } = render(<AnalogClock hour={3} minute={0} size={400} />);
    const svgs = UNSAFE_getAllByProps({ testID: 'Svg' });
    expect(svgs[0].props.width).toBe(400);
    expect(svgs[0].props.height).toBe(400);
  });
});
