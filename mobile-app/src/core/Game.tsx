import { useState, useCallback, useEffect, useRef } from 'react';
import { type GameConfig, type Question, type Feedback } from './types';
import { seededShuffle, selectBalancedSubset, isCorrect } from './gameLogic';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import { submitScore } from '../lib/db';
import { useTheme } from '../theme/ThemeContext';
import * as Crypto from 'expo-crypto';

export type Phase = 'start' | 'playing' | 'result' | 'leaderboard';

interface Props {
  config: GameConfig;
  challengeId?: string;
  onGoHome: () => void;
  // Sub-component renderers — injected so Game doesn't import UI components directly
  renderSplash: (props: {
    config: GameConfig;
    onPlay: () => void;
    onChooseGame: () => void;
  }) => React.ReactNode;
  renderPlaying: (props: {
    config: GameConfig;
    question: Question;
    inputValue: string;
    onInputChange: (v: string) => void;
    onSubmit: () => void;
    onSkip: () => void;
    feedback: Feedback;
    current: number;
    total: number;
    score: number;
    elapsed: number;
    onCancel: () => void;
  }) => React.ReactNode;
  renderResult: (props: {
    score: number;
    total: number;
    missed: Question[];
    grades: GameConfig['grades'];
    gameId: string;
    remoteScoreId?: string;
    onNext: () => void;
  }) => React.ReactNode;
  renderLeaderboard: (props: {
    gameId: string;
    gameTitle: string;
    latestId: string;
    challengeId?: string;
    onReplay: () => void;
  }) => React.ReactNode;
}

export default function Game({
  config,
  challengeId,
  onGoHome,
  renderSplash,
  renderPlaying,
  renderResult,
  renderLeaderboard,
}: Readonly<Props>) {
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
  const scoreRef = useRef(0);
  const elapsedRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gameSeedRef = useRef<number | null>(null);

  const { setTheme } = useTheme();
  const { nickname, addScore } = usePlayerStore();
  const { playerId } = useAuthStore();

  // Apply theme on mount / config change
  useEffect(() => {
    setTheme(config.theme);
  }, [config.theme, setTheme]);

  // Cleanup timer on unmount
  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  function stopTimer() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  const startGame = useCallback(() => {
    stopTimer();
    scoreRef.current = 0;
    elapsedRef.current = 0;
    setScore(0);
    setElapsed(0);
    const seed = Math.floor(Math.random() * 0x100000000);
    gameSeedRef.current = seed;
    if (config.questionCount) {
      setDeck(selectBalancedSubset(config.questions, config.questionCount, seed));
    } else {
      setDeck(seededShuffle(config.questions, seed));
    }
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
  }, [config.questions, config.questionCount]);

  const advance = useCallback((wasCorrect: boolean, question: Question) => {
    if (!wasCorrect) setMissed(prev => [...prev, question]);
    const nextIndex = currentIndex + 1;
    const delay = wasCorrect ? 1000 : 2000;

    if (nextIndex >= deck.length) {
      setTimeout(() => {
        stopTimer();
        const id = Crypto.randomUUID();
        setLatestScoreId(id);
        addScore({
          id,
          gameId: config.id,
          gameTitle: config.title,
          nickname: nickname ?? 'Anonymous',
          score: scoreRef.current,
          total: deck.length,
          duration: elapsedRef.current,
        });

        setPhase('result');
        setFeedback(null);

        if (playerId) {
          submitScore({
            playerId,
            gameId: config.id,
            gameTitle: config.title,
            score: scoreRef.current,
            total: deck.length,
            duration: elapsedRef.current,
            challengeId,
          }).then(rid => {
            if (rid) setRemoteScoreId(rid);
          });
        }
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
    return renderSplash({ config, onPlay: startGame, onChooseGame: onGoHome });
  }

  if (phase === 'result') {
    return renderResult({
      score,
      total: deck.length,
      missed,
      grades: config.grades,
      gameId: config.id,
      remoteScoreId,
      onNext: () => setPhase('leaderboard'),
    });
  }

  if (phase === 'leaderboard') {
    return renderLeaderboard({
      gameId: config.id,
      gameTitle: config.title,
      latestId: latestScoreId,
      challengeId,
      onReplay: startGame,
    });
  }

  const currentQuestion = deck[currentIndex];

  return renderPlaying({
    config,
    question: currentQuestion,
    inputValue,
    onInputChange: setInputValue,
    onSubmit: handleSubmit,
    onSkip: handleSkip,
    feedback,
    current: currentIndex + 1,
    total: deck.length,
    score,
    elapsed,
    onCancel: cancelGame,
  });
}
