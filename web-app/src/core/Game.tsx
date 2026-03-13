import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { type GameConfig, type Question, type Feedback } from './types';
import { shuffle, isCorrect } from './gameLogic';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import { submitScore } from '../lib/db';
import GameCard from '../components/GameCard';
import FeedbackBanner from '../components/FeedbackBanner';
import ProgressBar from '../components/ProgressBar';
import ResultScreen from '../components/ResultScreen';
import Leaderboard from '../components/Leaderboard';
import SplashScreen from '../components/SplashScreen';
import { app, header, cancelBtn, titleSmall } from './Game.css';

type Phase = 'start' | 'playing' | 'result' | 'leaderboard';

interface Props {
  config: GameConfig;
  challengeId?: string; // set when joining via challenge code
}

export default function Game({ config, challengeId }: Readonly<Props>) {
  const [phase, setPhase] = useState<Phase>('start');
  const [deck, setDeck] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [elapsed, setElapsed] = useState(0);
  const [latestScoreId, setLatestScoreId] = useState('');
  const [remoteScoreId, setRemoteScoreId] = useState<string | undefined>(undefined);

  // Refs mirror state so setTimeout closures always read the latest value
  const scoreRef   = useRef(0);
  const elapsedRef = useRef(0);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const { nickname, addScore } = usePlayerStore();
  const { playerId } = useAuthStore();

  useEffect(() => {
    const root = document.documentElement;
    const { primary, secondary, secondaryRgb, accent, splashBg } = config.theme;
    root.style.setProperty('--color-primary',       primary);
    root.style.setProperty('--color-secondary',     secondary);
    root.style.setProperty('--color-secondary-rgb', secondaryRgb);
    root.style.setProperty('--color-accent',        accent);
    root.style.setProperty('--color-splash-bg',     splashBg);
  }, [config.theme]);

  // Clean up timer on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function stopTimer() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  const startGame = useCallback(() => {
    stopTimer();
    scoreRef.current   = 0;
    elapsedRef.current = 0;
    setScore(0);
    setElapsed(0);
    setDeck(shuffle(config.questions));
    setCurrentIndex(0);
    setMissed([]);
    setInputValue('');
    setFeedback(null);
    setRemoteScoreId(undefined);
    setPhase('playing');
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
    }, 1000);
  }, [config.questions]);

  const advance = useCallback((wasCorrect: boolean, question: Question) => {
    if (!wasCorrect) setMissed(prev => [...prev, question]);
    const nextIndex = currentIndex + 1;
    const delay = wasCorrect ? 1000 : 2000;
    if (nextIndex >= deck.length) {
      setTimeout(async () => {
        stopTimer();
        const id = crypto.randomUUID();
        setLatestScoreId(id);
        addScore({
          id,
          gameId:    config.id,
          gameTitle: config.title,
          nickname:  nickname ?? 'Anonymous',
          score:     scoreRef.current,
          total:     deck.length,
          duration:  elapsedRef.current,
        });

        // Submit to Supabase in the background
        if (playerId) {
          const rid = await submitScore({
            playerId,
            gameId:      config.id,
            gameTitle:   config.title,
            score:       scoreRef.current,
            total:       deck.length,
            duration:    elapsedRef.current,
            challengeId,
          });
          if (rid) setRemoteScoreId(rid);
        }

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
  }, [currentIndex, deck.length, config.id, config.title, nickname, addScore, playerId, challengeId]);

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
    stopTimer();
    setElapsed(0);
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
        onChooseGame={() => navigate('/')}
      />
    );
  }

  if (phase === 'result') {
    return (
      <div className={app}>
        <ResultScreen
          score={score}
          total={config.questions.length}
          missed={missed}
          grades={config.grades}
          gameId={config.id}
          remoteScoreId={remoteScoreId}
          onNext={() => setPhase('leaderboard')}
        />
      </div>
    );
  }

  if (phase === 'leaderboard') {
    return (
      <div className={app}>
        <Leaderboard
          gameId={config.id}
          gameTitle={config.title}
          latestId={latestScoreId}
          challengeId={challengeId}
          onReplay={startGame}
        />
      </div>
    );
  }

  const currentQuestion = deck[currentIndex];

  return (
    <div className={app}>
      <div className={header}>
        <h1 className={titleSmall}>{config.title}</h1>
        <button className={cancelBtn} onClick={cancelGame} aria-label="Quit game">✕</button>
      </div>
      <ProgressBar
        current={currentIndex + 1}
        total={deck.length}
        score={score}
        elapsed={elapsed}
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
