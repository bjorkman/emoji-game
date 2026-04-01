import { type ContinentId, type Continent } from '../core/types';
import { analogLand } from './analogLand/config';
import { digital24 } from './digital24/config';
import { digital12 } from './digital12/config';

const continents: Record<ContinentId, Continent> = {
  analogLand,
  digital24,
  digital12,
};

export function getContinent(id: ContinentId): Continent {
  return continents[id];
}

export function getAllContinents(): Continent[] {
  return Object.values(continents);
}
