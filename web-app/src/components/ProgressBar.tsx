import { container, info, timer, track, fill } from './ProgressBar.css';
import { formatTime } from '../lib/format';

interface Props {
  current: number;
  total: number;
  score: number;
  elapsed: number;
}

export default function ProgressBar({ current, total, score, elapsed }: Readonly<Props>) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={container}>
      <div className={info}>
        <span>Question {current} / {total}</span>
        <span className={timer}>⏱ {formatTime(elapsed)}</span>
        <span>Score: {score}</span>
      </div>
      <div className={track}>
        <div className={fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
