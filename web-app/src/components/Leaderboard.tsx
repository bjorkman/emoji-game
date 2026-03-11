import { usePlayerStore } from '../store/playerStore';
import shared from '../shared.module.css';
import styles from './Leaderboard.module.css';

function formatTime(seconds?: number): string {
  if (seconds == null) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface Props {
  gameId: string;
  gameTitle: string;
  latestId: string;
  onReplay: () => void;
}

export default function Leaderboard({ gameId, gameTitle, latestId, onReplay }: Props) {
  const highScores = usePlayerStore((s) => s.highScores);

  const sorted = highScores
    .filter((s) => s.gameId === gameId)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.duration ?? Infinity) - (b.duration ?? Infinity);
    });

  const top10 = sorted.slice(0, 10);
  const playerRank = sorted.findIndex((s) => s.id === latestId) + 1; // 1-based, 0 = not found
  const inTop10 = playerRank >= 1 && playerRank <= 10;

  return (
    <div className={styles.screen}>
      <h2 className={styles.heading}>{gameTitle} — Leaderboard</h2>

      {top10.length === 0 ? (
        <p className={styles.empty}>No scores yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={entry.id === latestId ? styles.highlight : undefined}
                >
                  <td className={styles.rank}>{i + 1}</td>
                  <td>{entry.nickname}</td>
                  <td>
                    <span className={styles.scoreVal}>{entry.score}/{entry.total}</span>
                    <span className={styles.scorePct}>
                      {Math.round((entry.score / entry.total) * 100)}%
                    </span>
                  </td>
                  <td className={styles.time}>{formatTime(entry.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!inTop10 && playerRank > 0 && (
        <p className={styles.rankNote}>You ranked #{playerRank} this time — keep going!</p>
      )}

      <button
        className={`${shared.btn} ${shared.btnSubmit} ${shared.btnReplay}`}
        onClick={onReplay}
      >
        Play Again
      </button>
    </div>
  );
}
