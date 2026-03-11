import { type GameConfig } from '../core/types';
import kpopConfig from './kpop/config';
import capitalsConfig from './capitals/config';
import animalsConfig from './animals/config';
import moviesConfig from './movies/config';

const REGISTRY: Record<string, GameConfig> = {
  kpop:     kpopConfig,
  capitals: capitalsConfig,
  animals:  animalsConfig,
  movies:   moviesConfig,
};

export default REGISTRY;
