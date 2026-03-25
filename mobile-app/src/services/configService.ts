import { supabase } from '../lib/supabase';
import { APP_VERSION, compareVersions } from '../lib/version';

export type VersionStatus = 'ok' | 'update_available' | 'update_required';

export interface VersionCheckResult {
  status: VersionStatus;
  latest: string;
}

export async function checkAppVersion(): Promise<VersionCheckResult> {
  const { data, error } = await supabase
    .from('app_config')
    .select('key, value')
    .in('key', ['min_version', 'latest_version']);

  if (error || !data) {
    // Fail open — don't block app if we can't reach the server
    return { status: 'ok', latest: APP_VERSION };
  }

  const configMap = new Map(data.map((row) => [row.key, row.value]));
  const minVersion = configMap.get('min_version') ?? '0.0.0';
  const latestVersion = configMap.get('latest_version') ?? APP_VERSION;

  if (compareVersions(APP_VERSION, minVersion) < 0) {
    return { status: 'update_required', latest: latestVersion };
  }

  if (compareVersions(APP_VERSION, latestVersion) < 0) {
    return { status: 'update_available', latest: latestVersion };
  }

  return { status: 'ok', latest: latestVersion };
}
