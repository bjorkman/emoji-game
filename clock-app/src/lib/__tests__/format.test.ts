import { formatTime } from '../format';

describe('formatTime', () => {
  it('formats zero seconds as 0:00', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('pads seconds with a leading zero', () => {
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(65)).toBe('1:05');
  });

  it('does not pad minutes', () => {
    expect(formatTime(59)).toBe('0:59');
    expect(formatTime(60)).toBe('1:00');
  });

  it('handles values over an hour', () => {
    expect(formatTime(3665)).toBe('61:05');
  });
});
