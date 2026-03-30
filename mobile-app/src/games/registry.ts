import { type GameConfig } from '../core/types';
import kpopConfig from './kpop/config';
import capitalsConfig from './capitals/config';
import animalsConfig from './animals/config';
import moviesConfig from './movies/config';
import countriesConfig from './countries/config';
import memesConfig from './memes/config';
import animeConfig from './anime/config';
import fastfoodConfig from './fastfood/config';
import soccerConfig from './soccer/config';
import sanrioConfig from './sanrio/config';
import zodiacConfig from './zodiac/config';

const REGISTRY: Record<string, GameConfig> = {
  kpop:      kpopConfig,
  animals:   animalsConfig,
  movies:    moviesConfig,
  countries: countriesConfig,
  capitals:  capitalsConfig,
  memes:     memesConfig,
  anime:     animeConfig,
  fastfood:  fastfoodConfig,
  soccer:    soccerConfig,
  sanrio:    sanrioConfig,
  zodiac:    zodiacConfig,
};

export default REGISTRY;
