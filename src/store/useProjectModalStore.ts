import { create } from "zustand";
import type { Project } from "@/data/projects";

type ProjectModalState = {
  activeProject: Project | null;
  open: (project: Project) => void;
  close: () => void;
};

export const useProjectModalStore = create<ProjectModalState>((set) => ({
  activeProject: null,
  open: (project) => set({ activeProject: project }),
  close: () => set({ activeProject: null }),
}));