import React from 'react';
import { render } from '@testing-library/react-native';
import DigitalClock from '../DigitalClock';

describe('DigitalClock', () => {
  it('renders 24-hour mode with zero-padded hour', () => {
    const { getByText } = render(<DigitalClock hour={3} minute={5} mode="digital24" />);
    expect(getByText('03:05')).toBeTruthy();
  });

  it('renders 24-hour mode at midnight', () => {
    const { getByText } = render(<DigitalClock hour={0} minute={0} mode="digital24" />);
    expect(getByText('00:00')).toBeTruthy();
  });

  it('renders 24-hour mode at 23:59', () => {
    const { getByText } = render(<DigitalClock hour={23} minute={59} mode="digital24" />);
    expect(getByText('23:59')).toBeTruthy();
  });

  it('renders 12-hour mode with AM suffix before noon', () => {
    const { getByText } = render(<DigitalClock hour={3} minute={5} mode="digital12" />);
    expect(getByText('3:05')).toBeTruthy();
    expect(getByText('AM')).toBeTruthy();
  });

  it('renders 12-hour mode with PM suffix after noon', () => {
    const { getByText } = render(<DigitalClock hour={15} minute={45} mode="digital12" />);
    expect(getByText('3:45')).toBeTruthy();
    expect(getByText('PM')).toBeTruthy();
  });

  it('renders 12 AM for midnight in 12-hour mode', () => {
    const { getByText } = render(<DigitalClock hour={0} minute={0} mode="digital12" />);
    expect(getByText('12:00')).toBeTruthy();
    expect(getByText('AM')).toBeTruthy();
  });

  it('renders 12 PM for noon in 12-hour mode', () => {
    const { getByText } = render(<DigitalClock hour={12} minute={0} mode="digital12" />);
    expect(getByText('12:00')).toBeTruthy();
    expect(getByText('PM')).toBeTruthy();
  });
});
