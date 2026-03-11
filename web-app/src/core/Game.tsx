import { useState, useCallback, useEffect, useRef } from 'react';
import { type GameConfig, type Question, type Feedback } from './types';
import { shuffle, isCorrect } from './gameLogic';
import { usePlayerStore } from '../store/playerStore';
import GameCard from '../components/GameCard';
import FeedbackBanner from '../components/FeedbackBanner';
import ProgressBar from '../components/ProgressBar';
import ResultScreen from '../components/ResultScreen';
import SplashScreen from '../components/SplashScreen';
import styles from './Game.module.css';

type Phase = 'start' | 'playing' | 'result';

interface Props {
  config: GameConfig;
}

export default function Game({ config }: Props) {
  const [phase, setPhase] = useState<Phase>('start');
  const [deck, setDeck] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);

  // Ref mirrors score state so setTimeout closures always see the latest value
  const scoreRef = useRef(0);

  const { nickname, addScore } = usePlayerStore();

  useEffect(() => {
    const root = document.documentElement;
    const { primary, secondary, secondaryRgb, accent, splashBg } = config.theme;
    root.style.setProperty('--color-primary',       primary);
    root.style.setProperty('--color-secondary',     secondary);
    root.style.setProperty('--color-secondary-rgb', secondaryRgb);
    root.style.setProperty('--color-accent',        accent);
    root.style.setProperty('--color-splash-bg',     splashBg);
  }, [config.theme]);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    setScore(0);
    setDeck(shuffle(config.questions));
    setCurrentIndex(0);
    setMissed([]);
    setInputValue('');
    setFeedback(null);
    setPhase('playing');
  }, [config.questions]);

  const advance = useCallback((wasCorrect: boolean, question: Question) => {
    if (!wasCorrect) setMissed(prev => [...prev, question]);
    const nextIndex = currentIndex + 1;
    const delay = wasCorrect ? 1000 : 2000;
    if (nextIndex >= deck.length) {
      setTimeout(() => {
        addScore({
          gameId:    config.id,
          gameTitle: config.title,
          nickname:  nickname ?? 'Anonymous',
          score:     scoreRef.current,
          total:     deck.length,
        });
        setPhase('result');
        setFeedback(null);
      }, delay);
    } else {
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setInputValue('');
        setFeedback(null);
      }, delay);
    }
  }, [currentIndex, deck.length, config.id, config.title, nickname, addScore]);

  const handleSubmit = useCallback(() => {
    if (feedback) return;
    const question = deck[currentIndex];
    const correct = isCorrect(inputValue, question);
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    advance(correct, question);
  }, [feedback, deck, currentIndex, inputValue, advance]);

  const handleSkip = useCallback(() => {
    if (feedback) return;
    const question = deck[currentIndex];
    setFeedback('wrong');
    advance(false, question);
  }, [feedback, deck, currentIndex, advance]);

  const cancelGame = useCallback(() => {
    setFeedback(null);
    setPhase('start');
  }, []);

  if (phase === 'start') {
    return (
      <SplashScreen
        title={config.title}
        eyebrow={config.eyebrow}
        tagline={config.tagline}
        instructions={config.instructions}
        cards={config.splashCards}
        onPlay={startGame}
      />
    );
  }

  if (phase === 'result') {
    return (
      <div className={styles.app}>
        <ResultScreen
          score={score}
          total={config.questions.length}
          missed={missed}
          grades={config.grades}
          onReplay={startGame}
        />
      </div>
    );
  }

  const currentQuestion = deck[currentIndex];

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${styles.titleSmall}`}>{config.title}</h1>
        <button className={styles.cancelBtn} onClick={cancelGame} aria-label="Quit game">✕</button>
      </div>
      <ProgressBar
        current={currentIndex + 1}
        total={deck.length}
        score={score}
      />
      <FeedbackBanner feedback={feedback} correctAnswer={currentQuestion.answer} />
      <GameCard
        question={currentQuestion}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
        feedback={feedback}
        placeholder={config.inputPlaceholder}
      />
    </div>
  );
}
