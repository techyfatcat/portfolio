export type Project = {
  name: string;
  tagline: string;
  tech: string[];
  status?: string;
  link: string;
  description?: string; 
  image?: string; 
};

export const projects: Project[] = [
  {
    name: "Portfolio",
    tagline: "3D football-themed portfolio built with R3F and Three.js",
    tech: ["Next.js", "R3F", "Three.js", "Zustand"],
    status: "LIVE",
    link: "https://aaditsarhadi.in",
    description:
      "A fully custom 3D stadium built from Three.js primitives, with a cinematic intro camera sequence and interactive waypoints mapped to portfolio sections.",
    image: "/stadium.png",
  },
  {
    name: "Incog",
    tagline: "Community for placement prep with resources and tools",
    tech: ["Node.js", "MongoDB", "EJS", "React"],
    status: "COMPLETE",
    link: "https://incog-luceris.vercel.app/",
    description:
      "Companies section with tier-aware cards, group creation flow, and a threaded-comment community page.",
    image: "/incog.png",
  },

  {
    name: "InterviewScope",
    tagline: "AI-Powered platform for interview question preparation",
    tech: ["Node.js", "MongoDB", "EJS", "React"],
    status: "COMPLETE",
    link: "https://github.com/techyfatcat/InterviewScope",
    description:
      "Prepare for interviews through AI-powered mock sessions, analytics, and personalized learning recommendations.",
    image: "/interviewScope.png",
  },

];