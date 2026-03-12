import { keyframes, style } from '@vanilla-extract/css';

const popIn = keyframes({
  from: { transform: 'scale(0.95)', opacity: 0 },
  to:   { transform: 'scale(1)',    opacity: 1 },
});

const bannerBase = style({
  width: '100%',
  padding: '0.75rem 1.25rem',
  borderRadius: 10,
  fontSize: '1rem',
  fontWeight: 600,
  textAlign: 'center',
  animation: `${popIn} 0.2s ease`,
});

export const feedbackCorrect = style([bannerBase, {
  background: '#14532d',
  color: '#86efac',
  border: '1.5px solid #22c55e',
}]);

export const feedbackWrong = style([bannerBase, {
  background: '#4c0519',
  color: '#fca5a5',
  border: '1.5px solid #ef4444',
}]);
