import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { type Question, type Difficulty, type Feedback } from '../core/types';
import styles from './GameCard.module.css';
import shared from '../shared.module.css';

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  easy:   shared.difficultyEasy,
  medium: shared.difficultyMedium,
  hard:   shared.difficultyHard,
};

const HINT_DELAY_MS = 5000;

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
  const [hintQuestionId, setHintQuestionId] = useState<number | null>(null);
  const hintVisible = hintQuestionId === question.id;

  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, question]);

  // Start hint timer on each new question; visibility resets automatically when question changes
  useEffect(() => {
    if (!question.hint) return;
    const timer = setTimeout(() => setHintQuestionId(question.id), HINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [question]);

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

      {question.hint && (
        <div className={`${styles.hint} ${hintVisible ? styles.hintVisible : ''}`} aria-live="polite">
          💡 {question.hint}
        </div>
      )}

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
