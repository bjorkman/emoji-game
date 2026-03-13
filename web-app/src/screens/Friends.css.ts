import { globalStyle, style } from '@vanilla-extract/css';

export const page = style({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem 0',
});

export const pageHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const backLink = style({
  fontSize: '0.9rem',
  color: '#8888aa',
  textDecoration: 'none',
  ':hover': { color: '#f0f0f5' },
});

export const pageTitle = style({
  fontSize: '1.4rem',
  fontWeight: 800,
  color: '#f0f0f5',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const sectionHeading = style({
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#8888aa',
});

export const searchRow = style({
  display: 'flex',
  gap: '0.5rem',
});

export const searchInput = style({
  flex: 1,
  padding: '0.65rem 1rem',
  borderRadius: 10,
  border: '1.5px solid #2a2a44',
  background: '#0d0d1a',
  color: '#f0f0f5',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.15s',
  ':focus': { borderColor: 'var(--color-secondary)' },
});

export const searchBtn = style({
  cursor: 'pointer',
  border: 'none',
  borderRadius: 10,
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: 700,
  padding: '0.65rem 1.2rem',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.15s',
  ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
  selectors: {
    '&:not(:disabled):hover': { opacity: 0.88 },
  },
});

export const playerList = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const playerItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#14142a',
  border: '1px solid #2a2a44',
  borderRadius: 10,
  padding: '0.65rem 1rem',
});

export const playerNickname = style({
  fontWeight: 600,
  color: '#f0f0f5',
  fontSize: '0.9rem',
});

export const actionBtn = style({
  background: 'rgba(var(--color-secondary-rgb), 0.15)',
  border: '1px solid rgba(var(--color-secondary-rgb), 0.3)',
  borderRadius: 6,
  color: '#c0c0d8',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: 600,
  padding: '0.3rem 0.75rem',
  ':hover': { background: 'rgba(var(--color-secondary-rgb), 0.25)' },
  ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
});

export const statusBadge = style({
  fontSize: '0.75rem',
  color: '#555577',
  padding: '0.2rem 0.5rem',
  border: '1px solid #2a2a44',
  borderRadius: 5,
});

export const emptyNote = style({
  fontSize: '0.85rem',
  color: '#555577',
});

export const errorNote = style({
  fontSize: '0.82rem',
  color: '#f87171',
});

export const friendsTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.88rem',
  borderRadius: 12,
  overflow: 'hidden',
  border: '1px solid #2a2a44',
});

globalStyle(`${friendsTable} th`, {
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

globalStyle(`${friendsTable} td`, {
  padding: '0.65rem 1rem',
  color: '#c0c0d8',
  borderBottom: '1px solid #1a1a2e',
});

globalStyle(`${friendsTable} tr:last-child td`, {
  borderBottom: 'none',
});

// ─── Challenge cards ──────────────────────────────────────────────────────────

export const challengeList = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const challengeCard = style({
  background: '#14142a',
  border: '1px solid #2a2a44',
  borderRadius: 12,
  padding: '0.9rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const challengeCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  flexWrap: 'wrap',
});

export const challengeGameTag = style({
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.07em',
  color: 'var(--color-secondary)',
  background: 'rgba(var(--color-secondary-rgb), 0.12)',
  borderRadius: 5,
  padding: '0.15rem 0.45rem',
});

export const challengeCode = style({
  fontFamily: 'monospace',
  fontWeight: 700,
  fontSize: '0.95rem',
  letterSpacing: '0.06em',
  color: '#f0f0f5',
  flex: 1,
});

export const challengeDate = style({
  fontSize: '0.78rem',
  color: '#555577',
});

export const challengePlayLink = style({
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#a0a0cc',
  textDecoration: 'none',
  padding: '0.2rem 0.55rem',
  border: '1px solid #2a2a44',
  borderRadius: 6,
  ':hover': { borderColor: '#4a4a66', color: '#f0f0f5' },
});

export const challengeParticipants = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  borderTop: '1px solid #1a1a2e',
  paddingTop: '0.6rem',
});

export const participantRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.85rem',
});

export const participantName = style({
  color: '#c0c0d8',
});

export const participantScore = style({
  color: '#8888aa',
  fontVariantNumeric: 'tabular-nums',
});
