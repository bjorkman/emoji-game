import { useState, useCallback, useEffect, useRef } from 'react';
import { type ClockQuestion, type LevelDef, type Feedback, type StarRating, calculateStars } from './types';
import { generateLevelQuestions, isTimeCorrect } from './clockLogic';
import { hapticCorrect, hapticWrong, hapticSuccess } from '../lib/haptics';
import { playCorrect, playWrong } from '../lib/sounds';

interface Props {
  levelDef: LevelDef;
  onFinish: (score: number, total: number, stars: StarRating) => void;
  renderPlaying: (props: {
    question: ClockQuestion;
    onAnswer: (answer: string) => void;
    onSkip: () => void;
    feedback: Feedback;
    current: number;
    total: number;
    score: number;
  }) => React.ReactNode;
}

export default function LevelEngine({
  levelDef,
  onFinish,
  renderPlaying,
}: Readonly<Props>) {
  const [deck, setDeck] = useState<ClockQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const scoreRef = useRef(0);
  const processingRef = useRef(false);

  // Generate questions on mount
  useEffect(() => {
    const questions = generateLevelQuestions(
      levelDef.generator,
      levelDef.inputMode,
      levelDef.questionCount,
    );
    setDeck(questions);
    setCurrentIndex(0);
    setScore(0);
    scoreRef.current = 0;
    setFeedback(null);
    processingRef.current = false;
  }, [levelDef]);

  const advance = useCallback((wasCorrect: boolean) => {
    const nextIndex = currentIndex + 1;
    const delay = wasCorrect ? 1000 : 2000;

    if (nextIndex >= deck.length) {
      setTimeout(() => {
        hapticSuccess();
        const stars = calculateStars(scoreRef.current, deck.length);
        onFinish(scoreRef.current, deck.length, stars);
      }, delay);
    } else {
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setFeedback(null);
        processingRef.current = false;
      }, delay);
    }
  }, [currentIndex, deck.length, onFinish]);

  const handleAnswer = useCallback((answer: string) => {
    if (feedback || processingRef.current || deck.length === 0) return;
    processingRef.current = true;

    const question = deck[currentIndex];
    // For multiple choice, check exact match against correctAnswer
    const correct = question.choices
      ? answer === question.correctAnswer
      : isTimeCorrect(answer, question);

    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      hapticCorrect();
      playCorrect();
      scoreRef.current += 1;
      setScore(scoreRef.current);
    } else {
      hapticWrong();
      playWrong();
    }
    advance(correct);
  }, [feedback, deck, currentIndex, advance]);

  const handleSkip = useCallback(() => {
    if (feedback || processingRef.current || deck.length === 0) return;
    processingRef.current = true;
    setFeedback('wrong');
    hapticWrong();
    playWrong();
    advance(false);
  }, [feedback, deck.length, advance]);

  if (deck.length === 0) return null;

  const currentQuestion = deck[currentIndex];

  return renderPlaying({
    question: currentQuestion,
    onAnswer: handleAnswer,
    onSkip: handleSkip,
    feedback,
    current: currentIndex + 1,
    total: deck.length,
    score,
  });
}
