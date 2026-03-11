import styles from './ProgressBar.module.css';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface Props {
  current: number;
  total: number;
  score: number;
  elapsed: number;
}

export default function ProgressBar({ current, total, score, elapsed }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>Question {current} / {total}</span>
        <span className={styles.timer}>⏱ {formatTime(elapsed)}</span>
        <span>Score: {score}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
