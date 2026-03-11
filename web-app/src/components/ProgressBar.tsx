import styles from './ProgressBar.module.css';

interface Props {
  current: number;
  total: number;
  score: number;
}

export default function ProgressBar({ current, total, score }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>Question {current} / {total}</span>
        <span>Score: {score}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
