import { create } from 'zustand';

export interface RatesData {
  city: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silverPerGram: number;
  silverPerKg: number;
  timestamp: string;
  source: string;
}

interface RatesStore {
  rates: RatesData | null;
  loading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  isFallback: boolean;
  setRates: (rates: RatesData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastFetchTime: (time: number) => void;
  setIsFallback: (isFallback: boolean) => void;
  fetchRates: () => Promise<void>;
}

export const useGoldSilverRatesStore = create<RatesStore>((set, get) => ({
  rates: null,
  loading: false,
  error: null,
  lastFetchTime: null,
  isFallback: false,

  setRates: (rates) => set({ rates }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setLastFetchTime: (time) => set({ lastFetchTime: time }),
  setIsFallback: (isFallback) => set({ isFallback }),

  fetchRates: async () => {
    const state = get();
    const now = Date.now();

    // Prevent too frequent fetches
    if (state.lastFetchTime && (now - state.lastFetchTime) < 60000) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch('/_functions/fetch-gold-silver-rates');
      const result = await response.json();

      if (result.success && result.data) {
        set({
          rates: result.data,
          loading: false,
          lastFetchTime: now,
          isFallback: result.fallback || false,
        });
      } else {
        set({
          error: 'Failed to fetch rates',
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      });
    }
  },
}));
