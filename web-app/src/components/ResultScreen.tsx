import { type Question, type Difficulty } from '../core/types';
import { screen, finalScore, scoreNumber, scoreDenom, gradeMessage, missedSection, missedList, missedItem, missedEmojis, missedName } from './ResultScreen.css';
import { btnReplay, difficultyEasy, difficultyMedium, difficultyHard } from '../shared.css';

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  easy:   difficultyEasy,
  medium: difficultyMedium,
  hard:   difficultyHard,
};

interface Props {
  score: number;
  total: number;
  missed: Question[];
  grades: { min: number; label: string }[];
  onNext: () => void;
}

export default function ResultScreen({ score, total, missed, grades, onNext }: Readonly<Props>) {
  const pct = Math.round((score / total) * 100);
  const grade = grades.find(g => pct >= g.min)?.label ?? '';

  return (
    <div className={screen}>
      <h2>Game Over!</h2>
      <div className={finalScore}>
        <span className={scoreNumber}>{score}</span>
        <span className={scoreDenom}>/ {total}</span>
      </div>
      <p className={gradeMessage}>{grade}</p>

      {missed.length > 0 && (
        <div className={missedSection}>
          <h3>Missed</h3>
          <ul className={missedList}>
            {missed.map(q => (
              <li key={q.id} className={missedItem}>
                <span className={missedEmojis}>{q.clues.join(' ')}</span>
                <span className={missedName}>{q.answer}</span>
                <span className={DIFFICULTY_CLASS[q.difficulty]}>{q.difficulty}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className={btnReplay} onClick={onNext}>
        View Leaderboard →
      </button>
    </div>
  );
}
