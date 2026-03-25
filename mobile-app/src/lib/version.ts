import Constants from 'expo-constants';

export const APP_VERSION: string = Constants.expoConfig?.version ?? '0.0.0';

type SemVer = [number, number, number];

export function parseVersion(str: string): SemVer {
  const parts = str.split('.').map(Number);
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

/** Returns -1 if a < b, 0 if equal, 1 if a > b */
export function compareVersions(a: string, b: string): -1 | 0 | 1 {
  const [aMaj, aMin, aPat] = parseVersion(a);
  const [bMaj, bMin, bPat] = parseVersion(b);

  if (aMaj !== bMaj) return aMaj < bMaj ? -1 : 1;
  if (aMin !== bMin) return aMin < bMin ? -1 : 1;
  if (aPat !== bPat) return aPat < bPat ? -1 : 1;
  return 0;
}
