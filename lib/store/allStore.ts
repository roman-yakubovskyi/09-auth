import { create } from 'zustand';

type CounterStore = {
  count: number;
  increment: () => void;
};

export const useCounterStore = create<CounterStore>()(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));

type AllStore = {
  count: number;
  lang: string;
  increment: () => void;
  setLang: (lang: string) => void;
};

export const useStore = create<AllStore>()(set => ({
  count: 0,
  lang: 'en',
  increment: () => set(state => ({ count: state.count + 1 })),
  setLang: (lang: string) => set({ lang }),
}));
