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
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      set({ playerId: session.user.id, isReady: true });
      return;
    }

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('[auth] Anonymous sign-in failed:', error.message);
      set({ isReady: true });
      return;
    }
    set({ playerId: data.user?.id ?? null, isReady: true });
  },
}));
