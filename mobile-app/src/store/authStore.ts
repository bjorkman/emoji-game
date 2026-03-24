import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthStore {
  playerId: string | null;
  isReady: boolean;
  init: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  playerId: null,
  isReady: false,

  init: async () => {
    // Check for existing session first
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      set({ playerId: session.user.id, isReady: true });
      return;
    }

    // No session — sign in anonymously
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('[auth] Anonymous sign-in failed:', error.message);
      set({ isReady: true }); // still mark ready so app doesn't hang
      return;
    }
    set({ playerId: data.user?.id ?? null, isReady: true });
  },
}));
