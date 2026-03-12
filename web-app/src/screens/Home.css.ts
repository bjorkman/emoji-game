import { globalStyle, style } from '@vanilla-extract/css';

export const page = style({
  width: '100%',
  maxWidth: 560,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  '@media': {
    '(min-width: 768px)': { maxWidth: 680 },
  },
});

export const header = style({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const logo = style({
  fontSize: '2rem',
  fontWeight: 800,
  color: '#f0f0f5',
  '@media': {
    '(min-width: 768px)': { fontSize: '2.4rem' },
  },
});

export const playerRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
});

export const playerName = style({
  fontSize: '0.9rem',
  color: '#8888aa',
});

export const changeBtn = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.8rem',
  color: '#555577',
  padding: 0,
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  ':hover': { color: '#8888aa' },
});

export const grid = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '@media': {
    '(min-width: 480px)': { display: 'grid', gridTemplateColumns: '1fr 1fr' },
  },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  background: '#14142a',
  border: '1.5px solid #2a2a44',
  borderRadius: 16,
  padding: '1.5rem 1.75rem',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'border-color 0.15s, transform 0.15s',
  ':hover': { borderColor: '#4a4a66', transform: 'translateY(-2px)' },
});

export const cardTitle = style({
  fontSize: '1.4rem',
  fontWeight: 800,
  color: '#f0f0f5',
});

export const cardTagline = style({
  fontSize: '0.9rem',
  color: '#8888aa',
});

export const cardMeta = style({
  fontSize: '0.8rem',
  color: '#555577',
  marginTop: '0.25rem',
});

export const cardCta = style({
  marginTop: '0.75rem',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#a0a0cc',
});

export const nicknameGate = style({
  width: '100%',
  maxWidth: 420,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const nicknameCard = style({
  width: '100%',
  background: '#14142a',
  border: '1.5px solid #2a2a44',
  borderRadius: 18,
  padding: '2.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const nicknameHeading = style({
  fontSize: '1.5rem',
  fontWeight: 800,
  color: '#f0f0f5',
});

export const nicknameSubtext = style({
  fontSize: '0.9rem',
  color: '#8888aa',
  marginBottom: '0.5rem',
});

export const nicknameForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginTop: '0.5rem',
});

export const nicknameInput = style({
  padding: '0.75rem 1rem',
  borderRadius: 10,
  border: '1.5px solid #2a2a44',
  background: '#0d0d1a',
  color: '#f0f0f5',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.15s',
  ':focus': { borderColor: '#a78bfa' },
});

export const nicknameBtn = style({
  cursor: 'pointer',
  border: 'none',
  borderRadius: 10,
  background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
  color: '#0d0d1a',
  fontSize: '1rem',
  fontWeight: 700,
  padding: '0.75rem 1.4rem',
  transition: 'opacity 0.15s',
  ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
  selectors: {
    '&:not(:disabled):hover': { opacity: 0.88 },
  },
});

export const scoresSection = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const scoresHeading = style({
  fontSize: '0.85rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#8888aa',
});

export const scoresTableWrap = style({
  overflowX: 'auto',
  borderRadius: 12,
  border: '1px solid #2a2a44',
});

export const scoresTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.88rem',
});

globalStyle(`${scoresTable} th`, {
  textAlign: 'left',
  padding: '0.6rem 1rem',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#555577',
  background: '#0d0d1a',
  borderBottom: '1px solid #2a2a44',
});

globalStyle(`${scoresTable} td`, {
  padding: '0.65rem 1rem',
  color: '#c0c0d8',
  borderBottom: '1px solid #1a1a2e',
});

globalStyle(`${scoresTable} tr:last-child td`, {
  borderBottom: 'none',
});

globalStyle(`${scoresTable} tbody tr:hover td`, {
  background: '#14142a',
});

export const scoreValue = style({
  fontWeight: 600,
  color: '#f0f0f5',
  marginRight: '0.4rem',
});

export const scorePct = style({
  fontSize: '0.8rem',
  color: '#8888aa',
});

export const scoreDate = style({
  color: '#555577',
  whiteSpace: 'nowrap',
});
