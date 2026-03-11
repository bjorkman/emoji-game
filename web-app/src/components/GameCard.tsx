import { useEffect, useRef, type KeyboardEvent } from 'react';
import { type Question, type Difficulty, type Feedback } from '../core/types';
import styles from './GameCard.module.css';
import shared from '../shared.module.css';

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  easy:   shared.difficultyEasy,
  medium: shared.difficultyMedium,
  hard:   shared.difficultyHard,
};

interface Props {
  question: Question;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  feedback: Feedback;
  placeholder: string;
}

export default function GameCard({ question, inputValue, onInputChange, onSubmit, onSkip, feedback, placeholder }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, question]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') onSubmit();
  }

  return (
    <div className={styles.card}>
      <div className={`${shared.difficultyBadge} ${DIFFICULTY_CLASS[question.difficulty]}`}>
        {DIFFICULTY_LABELS[question.difficulty]}
      </div>

      <div className={styles.emojiDisplay}>
        {question.clues.map((clue, i) => (
          <span key={i} className={styles.emoji}>{clue}</span>
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={!!feedback}
          className={styles.guessInput}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={onSubmit}
          disabled={!!feedback || !inputValue.trim()}
          className={`${shared.btn} ${shared.btnSubmit}`}
        >
          Submit
        </button>
      </div>

      <button
        onClick={onSkip}
        disabled={!!feedback}
        className={`${shared.btn} ${shared.btnSkip}`}
      >
        Skip
      </button>
    </div>
  );
}
