console.log('[supabase] module loading...');

let createClient: typeof import('@supabase/supabase-js').createClient;
try {
  createClient = require('@supabase/supabase-js').createClient;
  console.log('[supabase] createClient imported OK');
} catch (e) {
  console.error('[supabase] FAILED to import @supabase/supabase-js:', e);
  throw e;
}

let AsyncStorage: typeof import('@react-native-async-storage/async-storage').default;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
  console.log('[supabase] AsyncStorage imported OK');
} catch (e) {
  console.error('[supabase] FAILED to import AsyncStorage:', e);
  throw e;
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
console.log('[supabase] URL defined:', !!supabaseUrl, 'KEY defined:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Make sure your .env file exists in clock-app/ and restart Expo with --clear.',
  );
}

let supabase: ReturnType<typeof createClient>;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  console.log('[supabase] client created OK');
} catch (e) {
  console.error('[supabase] FAILED to create client:', e);
  throw e;
}

export { supabase };
