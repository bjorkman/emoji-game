import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import REGISTRY from '../games/registry';
import Game from '../core/Game';

export default function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchParams] = useSearchParams();
  const config = gameId ? REGISTRY[gameId] : undefined;
  if (!config) return <Navigate to="/" replace />;
  const challengeId = searchParams.get('challenge') ?? undefined;
  return <Game config={config} challengeId={challengeId} />;
}
