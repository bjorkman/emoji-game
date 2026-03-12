import { type GameConfig } from '../core/types';
import kpopConfig from './kpop/config';
import capitalsConfig from './capitals/config';
import animalsConfig from './animals/config';
import moviesConfig from './movies/config';
import countriesConfig from './countries/config';

const REGISTRY: Record<string, GameConfig> = {
  kpop:      kpopConfig,
  animals:   animalsConfig,
  movies:    moviesConfig,
  countries: countriesConfig,
  capitals:  capitalsConfig,
};

export default REGISTRY;
