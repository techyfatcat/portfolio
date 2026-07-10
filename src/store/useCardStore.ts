import { create } from "zustand";

interface CardState {
  visible: boolean;
  flipped: boolean;
  setVisible: (v: boolean) => void;
  flip: () => void;
  reset: () => void;
}

export const useCardStore = create<CardState>((set) => ({
  visible: false,
  flipped: false,
  setVisible: (v) => set({ visible: v }),
  flip: () => set((s) => ({ flipped: !s.flipped })),
  reset: () => set({ visible: false, flipped: false }),
}));