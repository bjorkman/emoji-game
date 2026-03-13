import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import {
  fetchGlobalLeaderboard,
  fetchFriendsLeaderboard,
  fetchChallengeLeaderboard,
  type LeaderboardEntry,
} from '../lib/db';
import { btnReplay } from '../shared.css';
import {
  screen, heading, empty, tableWrap, table, highlight,
  rank, scoreVal, scorePct, time, rankNote, actions, chooseGame,
  tabs, tab, tabActive,
} from './Leaderboard.css';

type Tab = 'local' | 'global' | 'friends' | 'challenge';

function formatTime(seconds?: number | null): string {
  if (seconds == null) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface Props {
  gameId: string;
  gameTitle: string;
  latestId: string;
  challengeId?: string;
  onReplay: () => void;
}

interface RemoteRow {
  id: string;
  player_id: string;
  nickname: string;
  score: number;
  total: number;
  duration: number | null;
}

export default function Leaderboard({ gameId, gameTitle, latestId, challengeId, onReplay }: Readonly<Props>) {
  const highScores = usePlayerStore((s) => s.highScores);
  const { playerId } = useAuthStore();

  const defaultTab: Tab = challengeId ? 'challenge' : 'local';
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [remoteRows, setRemoteRows] = useState<RemoteRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'local') return;
    if (!playerId) return;

    setLoading(true);
    let fetch: Promise<LeaderboardEntry[]>;
    if (activeTab === 'global') {
      fetch = fetchGlobalLeaderboard(gameId);
    } else if (activeTab === 'friends') {
      fetch = fetchFriendsLeaderboard(gameId, playerId);
    } else if (activeTab === 'challenge' && challengeId) {
      fetch = fetchChallengeLeaderboard(challengeId);
    } else {
      setLoading(false);
      return;
    }

    fetch.then((rows) => {
      setRemoteRows(rows);
      setLoading(false);
    });
  }, [activeTab, gameId, playerId, challengeId]);

  // Local tab data
  const sorted = highScores
    .filter((s) => s.gameId === gameId)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.duration ?? Infinity) - (b.duration ?? Infinity);
    });
  const top10 = sorted.slice(0, 10);
  const playerRank = sorted.findIndex((s) => s.id === latestId) + 1;
  const inTop10 = playerRank >= 1 && playerRank <= 10;

  const showTabs = !!playerId;

  function renderTable(rows: { id: string; player_id?: string; nickname?: string; score: number; total: number; duration?: number | null }[], currentId?: string) {
    if (rows.length === 0) {
      return <p className={empty}>{loading ? 'Loading…' : 'No scores yet.'}</p>;
    }
    return (
      <div className={tableWrap}>
        <table className={table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry, i) => (
              <tr key={entry.id} className={entry.id === currentId ? highlight : undefined}>
                <td className={rank}>{i + 1}</td>
                <td>{'nickname' in entry ? entry.nickname : (entry as any).nickname}</td>
                <td>
                  <span className={scoreVal}>{entry.score}/{entry.total}</span>
                  <span className={scorePct}>{Math.round((entry.score / entry.total) * 100)}%</span>
                </td>
                <td className={time}>{formatTime(entry.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={screen}>
      <h2 className={heading}>{gameTitle} — Leaderboard</h2>

      {showTabs && (
        <div className={tabs}>
          <button className={activeTab === 'local' ? tabActive : tab} onClick={() => setActiveTab('local')}>Local</button>
          <button className={activeTab === 'global' ? tabActive : tab} onClick={() => setActiveTab('global')}>Global</button>
          <button className={activeTab === 'friends' ? tabActive : tab} onClick={() => setActiveTab('friends')}>Friends</button>
          {challengeId && (
            <button className={activeTab === 'challenge' ? tabActive : tab} onClick={() => setActiveTab('challenge')}>Challenge</button>
          )}
        </div>
      )}

      {activeTab === 'local' && (
        <>
          {renderTable(top10.map(e => ({ id: e.id, nickname: e.nickname, score: e.score, total: e.total, duration: e.duration })), latestId)}
          {!inTop10 && playerRank > 0 && (
            <p className={rankNote}>You ranked #{playerRank} this time — keep going!</p>
          )}
        </>
      )}

      {activeTab !== 'local' && renderTable(remoteRows, undefined)}

      <div className={actions}>
        <button className={btnReplay} onClick={onReplay}>
          Play Again
        </button>
        <Link to="/" className={chooseGame}>
          Choose Game
        </Link>
      </div>
    </div>
  );
}
