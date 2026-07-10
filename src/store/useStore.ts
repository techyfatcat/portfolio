import { create } from "zustand";

export type Scene =
  | "loading"
  | "intro"
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "timeline"
  | "contact";

interface StoreState {
  
  currentScene: Scene;
  setScene: (scene: Scene) => void;

  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;

  loadProgress: number;
  setLoadProgress: (progress: number) => void;

  hasPlayedIntro: boolean;
  setHasPlayedIntro: (played: boolean) => void;

  activeProject: number | null;
  setActiveProject: (index: number | null) => void;

  audioEnabled: boolean;
  toggleAudio: () => void;

  isCameraMoving: boolean;
  setCameraMoving: (moving: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentScene: "loading",
  setScene: (scene) => set({ currentScene: scene }),

  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),

  loadProgress: 0,
  setLoadProgress: (progress) => set({ loadProgress: progress }),

  hasPlayedIntro: false,
  setHasPlayedIntro: (played) => set({ hasPlayedIntro: played }),

  activeProject: null,
  setActiveProject: (index) => set({ activeProject: index }),

  audioEnabled: true,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

  isCameraMoving: false,
  setCameraMoving: (moving) => set({ isCameraMoving: moving }),
}));