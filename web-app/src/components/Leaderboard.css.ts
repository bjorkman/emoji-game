import { globalStyle, style } from '@vanilla-extract/css';
import { btnSkip } from '../shared.css';

export const screen = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
  padding: '1rem 0',
});

export const heading = style({
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#f0f0f5',
  textAlign: 'center',
});

export const empty = style({
  color: '#8888aa',
  fontSize: '0.9rem',
});

export const tableWrap = style({
  width: '100%',
  overflowX: 'auto',
  borderRadius: 12,
  border: '1px solid #2a2a44',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.88rem',
});

globalStyle(`${table} th`, {
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

globalStyle(`${table} td`, {
  padding: '0.65rem 1rem',
  color: '#c0c0d8',
  borderBottom: '1px solid #1a1a2e',
});

globalStyle(`${table} tr:last-child td`, {
  borderBottom: 'none',
});

globalStyle(`${table} tbody tr:hover td`, {
  background: '#14142a',
});

export const highlight = style({});

globalStyle(`${highlight} td`, {
  background: 'rgba(var(--color-secondary-rgb), 0.07)',
  color: '#f0f0f5',
});

globalStyle(`${table} ${highlight}:hover td`, {
  background: 'rgba(var(--color-secondary-rgb), 0.12)',
});

export const rank = style({
  color: '#555577',
  fontVariantNumeric: 'tabular-nums',
  width: '2rem',
});

export const scoreVal = style({
  fontWeight: 600,
  color: '#f0f0f5',
  marginRight: '0.4rem',
});

export const scorePct = style({
  fontSize: '0.8rem',
  color: '#8888aa',
});

export const time = style({
  fontVariantNumeric: 'tabular-nums',
  color: '#8888aa',
  whiteSpace: 'nowrap',
});

export const rankNote = style({
  fontSize: '0.85rem',
  color: '#8888aa',
  textAlign: 'center',
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
});

export const chooseGame = style([btnSkip, {
  textDecoration: 'none',
  textAlign: 'center',
}]);

export const tabs = style({
  display: 'flex',
  gap: '0.25rem',
  background: '#0d0d1a',
  border: '1px solid #2a2a44',
  borderRadius: 10,
  padding: '0.25rem',
  width: '100%',
});

const baseTab = style({
  flex: 1,
  border: 'none',
  borderRadius: 7,
  cursor: 'pointer',
  fontSize: '0.82rem',
  fontWeight: 600,
  padding: '0.4rem 0',
  transition: 'background 0.15s, color 0.15s',
});

export const tab = style([baseTab, {
  background: 'transparent',
  color: '#555577',
  ':hover': { color: '#8888aa' },
}]);

export const tabActive = style([baseTab, {
  background: 'rgba(var(--color-secondary-rgb), 0.18)',
  color: '#f0f0f5',
}]);
