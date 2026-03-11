import { type Feedback } from '../core/types';
import styles from './FeedbackBanner.module.css';

interface Props {
  feedback: Feedback;
  correctAnswer: string;
}

export default function FeedbackBanner({ feedback, correctAnswer }: Props) {
  if (!feedback) return null;

  const variantClass = feedback === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong;

  return (
    <div className={`${styles.feedbackBanner} ${variantClass}`}>
      {feedback === 'correct' ? (
        <span>Correct! 🎉</span>
      ) : (
        <span>The answer was <strong>{correctAnswer}</strong></span>
      )}
    </div>
  );
}
