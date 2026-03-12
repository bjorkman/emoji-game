import { globalStyle, style } from '@vanilla-extract/css';

export const screen = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem 0',
});

export const finalScore = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.2rem',
});

export const scoreNumber = style({
  fontSize: '4rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const scoreDenom = style({
  fontSize: '1.5rem',
  color: '#8888aa',
});

export const gradeMessage = style({
  fontSize: '1.2rem',
  color: '#c0c0d8',
});

export const missedSection = style({
  width: '100%',
  textAlign: 'left',
});

globalStyle(`${missedSection} h3`, {
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#8888aa',
  marginBottom: '0.75rem',
});

export const missedList = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const missedItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  background: '#14142a',
  border: '1px solid #2a2a44',
  borderRadius: 10,
  padding: '0.6rem 1rem',
});

export const missedEmojis = style({
  fontSize: '1.4rem',
  minWidth: '3rem',
});

export const missedName = style({
  flex: 1,
  fontWeight: 600,
});
