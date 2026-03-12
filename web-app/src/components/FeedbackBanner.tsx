import { type Feedback } from '../core/types';
import { feedbackCorrect, feedbackWrong } from './FeedbackBanner.css';

interface Props {
  feedback: Feedback;
  correctAnswer: string;
}

export default function FeedbackBanner({ feedback, correctAnswer }: Readonly<Props>) {
  if (!feedback) return null;

  return (
    <div className={feedback === 'correct' ? feedbackCorrect : feedbackWrong}>
      {feedback === 'correct' ? (
        <span>Correct! 🎉</span>
      ) : (
        <span>The answer was <strong>{correctAnswer}</strong></span>
      )}
    </div>
  );
}
