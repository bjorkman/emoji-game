import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const splash = style({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: 'var(--color-splash-bg)',
});

export const splashTicker = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  justifyContent: 'center',
  padding: '1.5rem 0',
  opacity: 0.45,
  pointerEvents: 'none',
});

const scrollLeft = keyframes({
  from: { transform: 'translateX(0)' },
  to:   { transform: 'translateX(-50%)' },
});

const scrollRight = keyframes({
  from: { transform: 'translateX(-50%)' },
  to:   { transform: 'translateX(0)' },
});

const tickerRowBase = style({
  display: 'flex',
  gap: '1rem',
  width: 'max-content',
});

export const tickerRowLeft  = style([tickerRowBase, { animation: `${scrollLeft}  28s linear infinite` }]);
export const tickerRowRight = style([tickerRowBase, { animation: `${scrollRight} 32s linear infinite` }]);

export const idolCard = style({
  flexShrink: 0,
  width: 150,
  height: 210,
  borderRadius: 16,
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.12)',
});

export const idolCardImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top center',
  display: 'block',
});

export const idolCardOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.75) 100%)',
});

export const idolCardName = style({
  position: 'absolute',
  bottom: '0.6rem',
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: '0.68rem',
  fontWeight: 800,
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
});

export const splashVignette = style({
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, var(--color-splash-bg) 100%)',
  pointerEvents: 'none',
});

export const splashHero = style({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  textAlign: 'center',
  background: 'rgba(13, 13, 30, 0.72)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 28,
  padding: '2.75rem 2.5rem 2.5rem',
  maxWidth: 480,
  width: '90%',
  boxShadow: [
    '0 0 0 1px rgba(var(--color-secondary-rgb), 0.1)',
    '0 25px 70px rgba(0,0,0,0.55)',
    '0 0 80px rgba(var(--color-secondary-rgb), 0.08)',
  ].join(', '),
});

export const splashEyebrow = style({
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#8888bb',
  background: 'rgba(var(--color-secondary-rgb), 0.08)',
  border: '1px solid rgba(var(--color-secondary-rgb), 0.18)',
  borderRadius: 99,
  padding: '0.3rem 1rem',
});

export const splashTitleBlock = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.3rem',
});

export const splashTitle = style({
  fontSize: 'clamp(3.5rem, 14vw, 6rem)',
  fontWeight: 900,
  letterSpacing: '-0.03em',
  lineHeight: 1,
  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 45%, var(--color-accent) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 0 30px rgba(var(--color-secondary-rgb), 0.45))',
});

export const splashTagline = style({
  fontSize: '0.95rem',
  fontStyle: 'italic',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#9090b8',
});

export const splashInstructions = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
  textAlign: 'left',
});

globalStyle(`${splashInstructions} li`, {
  fontSize: '0.9rem',
  color: '#b0b0cc',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.45rem 0.75rem',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.03)',
});

export const instIcon = style({
  fontSize: '1rem',
  flexShrink: 0,
});

export const btnPlay = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: 99,
  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)',
  color: '#fff',
  fontSize: '1.05rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '0.9rem 2.75rem',
  marginTop: '0.25rem',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  boxShadow: '0 0 32px rgba(var(--color-secondary-rgb), 0.4)',
  ':hover': {
    transform: 'translateY(-3px) scale(1.04)',
    boxShadow: '0 0 55px rgba(var(--color-secondary-rgb), 0.65)',
  },
  ':active': { transform: 'scale(0.97)' },
});

export const btnPlayArrow = style({
  fontStyle: 'normal',
  fontSize: '1.1rem',
  transition: 'transform 0.2s ease',
  selectors: {
    [`${btnPlay}:hover &`]: { transform: 'translateX(4px)' },
  },
});

export const btnChoose = style({
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: 99,
  background: 'transparent',
  color: '#8888bb',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  padding: '0.55rem 1.5rem',
  transition: 'color 0.2s ease, border-color 0.2s ease',
  ':hover': { color: '#f0f0f5', borderColor: 'rgba(255, 255, 255, 0.3)' },
});
