import { style } from '@vanilla-extract/css';

const btnBase = style({
  cursor: 'pointer',
  border: 'none',
  borderRadius: 10,
  fontSize: '1rem',
  fontWeight: 600,
  padding: '0.65rem 1.4rem',
  transition: 'opacity 0.15s, transform 0.1s',
  ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
  selectors: {
    '&:not(:disabled):hover': { opacity: 0.88 },
    '&:not(:disabled):active': { transform: 'scale(0.97)' },
  },
});

export const btnSubmit = style([btnBase, {
  background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))',
  color: '#0d0d1a',
}]);

export const btnSkip = style([btnBase, {
  background: 'transparent',
  border: '1.5px solid #444466',
  color: '#8888aa',
  fontSize: '0.9rem',
  padding: '0.45rem 1rem',
  marginTop: '0.5rem',
}]);

export const btnReplay = style([btnSubmit, {
  marginTop: '1rem',
  fontSize: '1.1rem',
  padding: '0.8rem 2.2rem',
}]);

const difficultyBadge = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: '0.25rem 0.75rem',
  borderRadius: 99,
  alignSelf: 'flex-start',
});

export const difficultyEasy   = style([difficultyBadge, { background: '#14532d', color: '#86efac' }]);
export const difficultyMedium = style([difficultyBadge, { background: '#78350f', color: '#fde68a' }]);
export const difficultyHard   = style([difficultyBadge, { background: '#4c0519', color: '#fca5a5' }]);
