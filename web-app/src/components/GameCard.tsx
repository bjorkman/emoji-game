import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { type Question, type Difficulty, type Feedback } from '../core/types';
import { card, emojiDisplay, emoji, hint, hintActive, inputRow, guessInput } from './GameCard.css';
import { btnSubmit, btnSkip, DIFFICULTY_CLASS } from '../shared.css';

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

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

export default function GameCard({ question, inputValue, onInputChange, onSubmit, onSkip, feedback, placeholder }: Readonly<Props>) {
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
    <div className={card}>
      <div className={DIFFICULTY_CLASS[question.difficulty]}>
        {DIFFICULTY_LABELS[question.difficulty]}
      </div>

      <div className={emojiDisplay}>
        {question.clues.map((clue, i) => (
          <span key={'question-' + i} className={emoji}>{clue}</span>
        ))}
      </div>

      {question.hint && (
        <div className={hintVisible ? hintActive : hint} aria-live="polite">
          💡 {question.hint}
        </div>
      )}

      <div className={inputRow}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={!!feedback}
          className={guessInput}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={onSubmit}
          disabled={!!feedback || !inputValue.trim()}
          className={btnSubmit}
        >
          Submit
        </button>
      </div>

      <button
        onClick={onSkip}
        disabled={!!feedback}
        className={btnSkip}
      >
        Skip
      </button>
    </div>
  );
}
