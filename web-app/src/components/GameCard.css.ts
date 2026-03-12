import { style } from '@vanilla-extract/css';

export const card = style({
  width: '100%',
  background: '#14142a',
  border: '1.5px solid #2a2a44',
  borderRadius: 18,
  padding: '2rem 1.75rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
  '@media': {
    '(min-width: 768px)': { padding: '2.5rem 2.25rem' },
  },
});

export const emojiDisplay = style({
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const emoji = style({
  fontSize: '3.5rem',
  lineHeight: 1,
  filter: 'drop-shadow(0 2px 8px rgba(var(--color-secondary-rgb), 0.4))',
  '@media': {
    '(min-width: 768px)': { fontSize: '4.25rem' },
  },
});

const hintBase = style({
  fontSize: '0.85rem',
  color: 'rgba(240, 240, 245, 0.45)',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 8,
  padding: '0.45rem 0.85rem',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(-4px)',
  transition: 'opacity 0.5s ease, transform 0.5s ease',
  pointerEvents: 'none',
});

export const hint = hintBase;

export const hintActive = style([hintBase, {
  opacity: 1,
  transform: 'translateY(0)',
  pointerEvents: 'auto',
}]);

export const inputRow = style({
  display: 'flex',
  gap: '0.6rem',
  width: '100%',
});

export const guessInput = style({
  flex: 1,
  padding: '0.65rem 1rem',
  borderRadius: 10,
  border: '1.5px solid #2a2a44',
  background: '#0d0d1a',
  color: '#f0f0f5',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.15s',
  ':focus': { borderColor: 'var(--color-secondary)' },
  ':disabled': { opacity: 0.5 },
});
