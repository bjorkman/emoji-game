import { useState } from 'react';
import { Link } from 'react-router-dom';
import REGISTRY from '../games/registry';
import { usePlayerStore } from '../store/playerStore';
import {
  page, header, logo, playerRow, playerName, changeBtn,
  grid, card, cardTitle, cardTagline, cardMeta, cardCta,
  nicknameGate, nicknameCard, nicknameHeading, nicknameSubtext, nicknameForm, nicknameInput, nicknameBtn,
  scoresSection, scoresHeading, scoresTableWrap, scoresTable, scoreValue, scorePct, scoreDate,
} from './Home.css';

function NicknameGate() {
  const setNickname = usePlayerStore((s) => s.setNickname);
  const [value, setValue] = useState('');

  return (
    <div className={nicknameGate}>
      <div className={nicknameCard}>
        <h2 className={nicknameHeading}>What's your name?</h2>
        <p className={nicknameSubtext}>We'll remember it for next time.</p>
        <form className={nicknameForm} onSubmit={(e) => { e.preventDefault(); if (value.trim()) setNickname(value); }}>
          <input
            className={nicknameInput}
            type="text"
            placeholder="Enter a nickname…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={24}
            autoFocus
            autoComplete="off"
          />
          <button
            className={nicknameBtn}
            type="submit"
            disabled={!value.trim()}
          >
            Let's play →
          </button>
        </form>
      </div>
    </div>
  );
}

function formatTime(seconds?: number): string {
  if (seconds == null) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function ScoresTable() {
  const highScores = usePlayerStore((s) => s.highScores);
  if (highScores.length === 0) return null;

  const recent = highScores.slice(0, 10);

  return (
    <section className={scoresSection}>
      <h2 className={scoresHeading}>Recent Scores</h2>
      <div className={scoresTableWrap}>
        <table className={scoresTable}>
          <thead>
            <tr>
              <th>Player</th>
              <th>Game</th>
              <th>Score</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((entry) => {
              const pct = Math.round((entry.score / entry.total) * 100);
              const date = new Date(entry.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });
              return (
                <tr key={entry.id}>
                  <td>{entry.nickname}</td>
                  <td>{entry.gameTitle}</td>
                  <td>
                    <span className={scoreValue}>{entry.score}/{entry.total}</span>
                    <span className={scorePct}>{pct}%</span>
                  </td>
                  <td className={scoreDate}>{formatTime(entry.duration)}</td>
                  <td className={scoreDate}>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Home() {
  const { nickname, setNickname } = usePlayerStore();
  const games = Object.values(REGISTRY);

  if (!nickname?.trim()) return <NicknameGate />;

  return (
    <div className={page}>
      <header className={header}>
        <h1 className={logo}>🎮 Emoji Games</h1>
        <div className={playerRow}>
          <span className={playerName}>Playing as {nickname}</span>
          <button
            className={changeBtn}
            onClick={() => setNickname('')}
          >
            change
          </button>
        </div>
      </header>

      <div className={grid}>
        {games.map((game) => (
          <Link key={game.id} to={`/${game.id}`} className={card}>
            <div className={cardTitle}>{game.title}</div>
            <div className={cardTagline}>{game.tagline}</div>
            <div className={cardMeta}>{game.questions.length} questions · 3 difficulties</div>
            <div className={cardCta}>Play →</div>
          </Link>
        ))}
      </div>

      <ScoresTable />
    </div>
  );
}
