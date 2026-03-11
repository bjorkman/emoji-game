import { type GameConfig } from '../core/types';
import kpopConfig from './kpop/config';
import capitalsConfig from './capitals/config';
import animalsConfig from './animals/config';

const REGISTRY: Record<string, GameConfig> = {
  kpop:     kpopConfig,
  capitals: capitalsConfig,
  animals:  animalsConfig,
};

export default REGISTRY;
