import { type GameConfig } from '../core/types';
import kpopConfig from './kpop/config';
import capitalsConfig from './capitals/config';

const REGISTRY: Record<string, GameConfig> = {
  kpop:     kpopConfig,
  capitals: capitalsConfig,
};

export default REGISTRY;
