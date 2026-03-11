import { type Question, type Difficulty } from '../core/types';
import styles from './ResultScreen.module.css';
import shared from '../shared.module.css';

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  easy:   shared.difficultyEasy,
  medium: shared.difficultyMedium,
  hard:   shared.difficultyHard,
};

interface Props {
  score: number;
  total: number;
  missed: Question[];
  grades: { min: number; label: string }[];
  onNext: () => void;
}

export default function ResultScreen({ score, total, missed, grades, onNext }: Props) {
  const pct = Math.round((score / total) * 100);
  const grade = grades.find(g => pct >= g.min)?.label ?? '';

  return (
    <div className={styles.screen}>
      <h2>Game Over!</h2>
      <div className={styles.finalScore}>
        <span className={styles.scoreNumber}>{score}</span>
        <span className={styles.scoreDenom}>/ {total}</span>
      </div>
      <p className={styles.gradeMessage}>{grade}</p>

      {missed.length > 0 && (
        <div className={styles.missedSection}>
          <h3>Missed</h3>
          <ul className={styles.missedList}>
            {missed.map(q => (
              <li key={q.id} className={styles.missedItem}>
                <span className={styles.missedEmojis}>{q.clues.join(' ')}</span>
                <span className={styles.missedName}>{q.answer}</span>
                <span className={`${shared.difficultyBadge} ${DIFFICULTY_CLASS[q.difficulty]}`}>{q.difficulty}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className={`${shared.btn} ${shared.btnSubmit} ${shared.btnReplay}`} onClick={onNext}>
        View Leaderboard →
      </button>
    </div>
  );
}
