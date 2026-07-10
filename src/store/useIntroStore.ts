import { create } from "zustand";

interface IntroState {
  assetsReady: boolean;
  introFinished: boolean;
  loadingFinished: boolean;
  loadProgress: number;
  heroAnnouncementDone: boolean;


  setAssetsReady: (v: boolean) => void;
  setIntroFinished: (v: boolean) => void;
  setLoadingFinished: (v: boolean) => void;
  setLoadProgress: (v: number) => void;
  setHeroAnnouncementDone: (done: boolean) => void;
}

export const useIntroStore = create<IntroState>((set) => ({
  assetsReady: false,
  introFinished: false,
  loadingFinished: false,
  loadProgress: 0,
  heroAnnouncementDone: false,

  setHeroAnnouncementDone: (done) => set({ heroAnnouncementDone: done }),

  setAssetsReady: (v) =>
    set({
      assetsReady: v,
    }),

  setIntroFinished: (v) =>
    set({
      introFinished: v,
    }),

  setLoadingFinished: (v) =>
    set({
      loadingFinished: v,
    }),

  setLoadProgress: (v) =>
    set({
      loadProgress: v,
    }),
}));