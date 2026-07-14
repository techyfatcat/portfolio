"use client";

import { create } from "zustand";

interface MusicState {
  enabled: boolean;
  playing: boolean;

  setEnabled: (value: boolean) => void;
  setPlaying: (value: boolean) => void;
  toggle: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  enabled: false,
  playing: false,

  setEnabled: (value) =>
    set({
      enabled: value,
    }),

  setPlaying: (value) =>
    set({
      playing: value,
    }),

  toggle: () =>
    set((state) => ({
      enabled: !state.enabled,
    })),
}));