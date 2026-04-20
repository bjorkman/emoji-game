import { calculateStars } from '../types';

describe('calculateStars', () => {
  it('returns 3 for a perfect score', () => {
    expect(calculateStars(10, 10)).toBe(3);
    expect(calculateStars(5, 5)).toBe(3);
  });

  it('returns 2 when off by one', () => {
    expect(calculateStars(9, 10)).toBe(2);
    expect(calculateStars(4, 5)).toBe(2);
  });

  it('returns 1 when off by two or three', () => {
    expect(calculateStars(8, 10)).toBe(1);
    expect(calculateStars(7, 10)).toBe(1);
  });

  it('returns 0 when off by four or more', () => {
    expect(calculateStars(6, 10)).toBe(0);
    expect(calculateStars(0, 10)).toBe(0);
  });

  it('handles a 5-question level: boundaries', () => {
    expect(calculateStars(5, 5)).toBe(3);
    expect(calculateStars(4, 5)).toBe(2);
    expect(calculateStars(3, 5)).toBe(1);
    expect(calculateStars(2, 5)).toBe(1);
    expect(calculateStars(1, 5)).toBe(0);
    expect(calculateStars(0, 5)).toBe(0);
  });
});
