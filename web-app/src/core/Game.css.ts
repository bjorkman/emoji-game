import { style } from '@vanilla-extract/css';

export const app = style({
  width: '100%',
  maxWidth: 560,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  '@media': {
    '(min-width: 768px)': { maxWidth: 620, gap: '1.75rem' },
  },
});

export const header = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const cancelBtn = style({
  position: 'absolute',
  right: 0,
  cursor: 'pointer',
  background: 'transparent',
  border: '1.5px solid #2a2a44',
  borderRadius: 8,
  color: '#8888aa',
  fontSize: '1.1rem',
  lineHeight: 1,
  padding: '0.3rem 0.55rem',
  transition: 'border-color 0.15s, color 0.15s',
  ':hover': { borderColor: '#ef4444', color: '#ef4444' },
});

const titleBase = style({
  fontWeight: 800,
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-accent))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
});

export const title = style([titleBase, { fontSize: '2.8rem' }]);

export const titleSmall = style([titleBase, {
  fontSize: '1.6rem',
  '@media': {
    '(min-width: 768px)': { fontSize: '1.9rem' },
  },
}]);
