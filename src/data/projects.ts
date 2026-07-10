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
    name: "STADIUM",
    tagline: "3D football-themed portfolio built with R3F and Three.js",
    tech: ["Next.js", "R3F", "Three.js", "Zustand"],
    status: "LIVE",
    link: "https://github.com/yourname/stadium",
    description:
      "A fully custom 3D stadium built from Three.js primitives, with a cinematic intro camera sequence and interactive waypoints mapped to portfolio sections.",
    image: "/stadium.png",
  },
  {
    name: "INCOG",
    tagline: "Full-stack exam prep platform with tiered company tracking",
    tech: ["Node.js", "MongoDB", "EJS", "React"],
    status: "COMPLETE",
    link: "https://github.com/yourname/incog",
    description:
      "Companies section with tier-aware cards, group creation flow, and a threaded-comment community page.",
    image: "/incog.png",
  },
];