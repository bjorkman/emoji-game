import { useState, useCallback } from 'react';
import { type Question, type Difficulty } from '../core/types';
import { useAuthStore } from '../store/authStore';
import { createChallenge, linkScoreToChallenge } from '../lib/db';
import { screen, finalScore, scoreNumber, scoreDenom, gradeMessage, missedSection, missedList, missedItem, missedEmojis, missedName, challengeWrap, challengeCode, challengeCopyBtn, challengeHint } from './ResultScreen.css';
import { btnReplay, btnSkip, difficultyEasy, difficultyMedium, difficultyHard } from '../shared.css';

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
  gameId: string;
  remoteScoreId?: string;
  onNext: () => void;
}

export default function ResultScreen({ score, total, missed, grades, gameId, remoteScoreId, onNext }: Readonly<Props>) {
  const pct = Math.round((score / total) * 100);
  const grade = grades.find(g => pct >= g.min)?.label ?? '';
  const { playerId } = useAuthStore();
  const [code, setCode] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleChallenge = useCallback(async () => {
    if (!playerId || creating) return;
    setCreating(true);
    const c = await createChallenge(gameId, playerId);
    if (c && remoteScoreId) {
      // Fetch the challenge id so we can link the creator's score to it
      const { fetchChallenge } = await import('../lib/db');
      const challenge = await fetchChallenge(c);
      if (challenge) await linkScoreToChallenge(remoteScoreId, challenge.id);
    }
    setCode(c);
    setCreating(false);
  }, [playerId, gameId, remoteScoreId, creating]);

  const handleCopy = useCallback(async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
  }, [code]);

  return (
    <div className={screen}>
      <h2>Game Over!</h2>
      <div className={finalScore}>
        <span className={scoreNumber}>{score}</span>
        <span className={scoreDenom}>/ {total}</span>
      </div>
      <p className={gradeMessage}>{grade}</p>

      <button className={btnReplay} onClick={onNext}>
        View Leaderboard →
      </button>

      {playerId && !code && (
        <button className={btnSkip} onClick={handleChallenge} disabled={creating}>
          {creating ? 'Creating…' : 'Challenge Friends'}
        </button>
      )}

      {code && (
        <div className={challengeWrap}>
          <span className={challengeHint}>Share this code with friends:</span>
          <div className={challengeCode}>
            <span>{code}</span>
            <button className={challengeCopyBtn} onClick={handleCopy}>
              {copying ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
}
