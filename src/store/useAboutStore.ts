import { create } from "zustand";

type AboutState = {
  hasEngaged: boolean;
  setEngaged: (value: boolean) => void;
};

export const useAboutStore = create<AboutState>((set) => ({
  hasEngaged: false,
  setEngaged: (value) => set({ hasEngaged: value }),
}));