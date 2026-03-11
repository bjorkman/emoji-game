import { useParams, Navigate } from 'react-router-dom';
import REGISTRY from '../games/registry';
import Game from '../core/Game';

export default function GameRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const config = gameId ? REGISTRY[gameId] : undefined;
  if (!config) return <Navigate to="/" replace />;
  return <Game config={config} />;
}
