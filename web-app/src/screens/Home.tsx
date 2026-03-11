import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import REGISTRY from '../games/registry';
import { usePlayerStore } from '../store/playerStore';
import styles from './Home.module.css';

function NicknameGate() {
  const setNickname = usePlayerStore((s) => s.setNickname);
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim()) setNickname(value);
  }

  return (
    <div className={styles.nicknameGate}>
      <div className={styles.nicknameCard}>
        <h2 className={styles.nicknameHeading}>What's your name?</h2>
        <p className={styles.nicknameSubtext}>We'll remember it for next time.</p>
        <form className={styles.nicknameForm} onSubmit={handleSubmit}>
          <input
            className={styles.nicknameInput}
            type="text"
            placeholder="Enter a nickname…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={24}
            autoFocus
            autoComplete="off"
          />
          <button
            className={styles.nicknameBtn}
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

function ScoresTable() {
  const highScores = usePlayerStore((s) => s.highScores);
  if (highScores.length === 0) return null;

  const recent = highScores.slice(0, 10);

  return (
    <section className={styles.scoresSection}>
      <h2 className={styles.scoresHeading}>Recent Scores</h2>
      <div className={styles.scoresTableWrap}>
        <table className={styles.scoresTable}>
          <thead>
            <tr>
              <th>Player</th>
              <th>Game</th>
              <th>Score</th>
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
                    <span className={styles.scoreValue}>{entry.score}/{entry.total}</span>
                    <span className={styles.scorePct}>{pct}%</span>
                  </td>
                  <td className={styles.scoreDate}>{date}</td>
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
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🎮 Emoji Games</h1>
        <div className={styles.playerRow}>
          <span className={styles.playerName}>Playing as {nickname}</span>
          <button
            className={styles.changeBtn}
            onClick={() => setNickname('')}
          >
            change
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {games.map((game) => (
          <Link key={game.id} to={`/${game.id}`} className={styles.card}>
            <div className={styles.cardTitle}>{game.title}</div>
            <div className={styles.cardTagline}>{game.tagline}</div>
            <div className={styles.cardMeta}>{game.questions.length} questions · 3 difficulties</div>
            <div className={styles.cardCta}>Play →</div>
          </Link>
        ))}
      </div>

      <ScoresTable />
    </div>
  );
}
