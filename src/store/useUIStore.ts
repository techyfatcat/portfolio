import { create } from "zustand";

type Section = "hero" | "about" | "skills" | "projects" | "resume" | "contact";

type UIStore = {
  activeSection: Section;
  setSection: (section: Section) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  activeSection: "hero",

  setSection: (section) =>
    set({
      activeSection: section,
    }),
}));