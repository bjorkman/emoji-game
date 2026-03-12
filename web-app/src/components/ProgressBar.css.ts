import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const info = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.85rem',
  color: '#8888aa',
});

export const timer = style({
  fontVariantNumeric: 'tabular-nums',
});

export const track = style({
  width: '100%',
  height: 8,
  background: '#1e1e33',
  borderRadius: 99,
  overflow: 'hidden',
});

export const fill = style({
  height: '100%',
  background: 'linear-gradient(90deg, var(--color-secondary), var(--color-accent))',
  borderRadius: 99,
  transition: 'width 0.4s ease',
});
