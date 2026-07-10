import { create } from "zustand";
import { CameraView } from "@/data/cameraViews";

type CameraStore = {
  entered: boolean;
  currentView: CameraView;

  enter: () => void;
  moveTo: (view: CameraView) => void;
};

export const useCameraStore = create<CameraStore>((set) => ({
  entered: false,

  currentView: "hero",

  enter: () =>
    set({
      entered: true,
    }),

  moveTo: (view) =>
    set({
      currentView: view,
    }),
}));