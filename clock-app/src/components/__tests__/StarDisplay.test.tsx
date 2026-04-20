import React from 'react';
import { render } from '@testing-library/react-native';
import StarDisplay from '../StarDisplay';

const FILLED = '\u2B50';
const EMPTY = '\u2606';

describe('StarDisplay', () => {
  it('renders 3 empty stars for 0 rating', () => {
    const { queryAllByText } = render(<StarDisplay stars={0} />);
    expect(queryAllByText(EMPTY).length).toBe(3);
    expect(queryAllByText(FILLED).length).toBe(0);
  });

  it('renders 1 filled and 2 empty for 1 star', () => {
    const { queryAllByText } = render(<StarDisplay stars={1} />);
    expect(queryAllByText(FILLED).length).toBe(1);
    expect(queryAllByText(EMPTY).length).toBe(2);
  });

  it('renders 2 filled and 1 empty for 2 stars', () => {
    const { queryAllByText } = render(<StarDisplay stars={2} />);
    expect(queryAllByText(FILLED).length).toBe(2);
    expect(queryAllByText(EMPTY).length).toBe(1);
  });

  it('renders 3 filled stars for 3', () => {
    const { queryAllByText } = render(<StarDisplay stars={3} />);
    expect(queryAllByText(FILLED).length).toBe(3);
    expect(queryAllByText(EMPTY).length).toBe(0);
  });

  it('applies the given font size', () => {
    const { getAllByText } = render(<StarDisplay stars={3} size={80} />);
    const star = getAllByText(FILLED)[0];
    const flat = Array.isArray(star.props.style)
      ? star.props.style.flat().find((s: { fontSize?: number }) => s?.fontSize)
      : star.props.style;
    expect(flat.fontSize).toBe(80);
  });
});
