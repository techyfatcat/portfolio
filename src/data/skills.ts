export interface Skill {
  id: number;
  name: string;
  color: string;
  position: [number, number, number];
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "Java",
    color: "#f89820",
    position: [-5, 0, -3],
  },
  {
    id: 2,
    name: "React",
    color: "#61DAFB",
    position: [-2.5, 0, -5],
  },
  {
    id: 3,
    name: "Next.js",
    color: "#ffffff",
    position: [0, 0, -5.5],
  },
  {
    id: 4,
    name: "JavaScript",
    color: "#F7DF1E",
    position: [2.5, 0, -5],
  },
  {
    id: 5,
    name: "Tailwind CSS",
    color: "#38BDF8",
    position: [5, 0, -3],
  },
  {
    id: 6,
    name: "Express",
    color: "#dddddd",
    position: [-6, 0, 0],
  },
  {
    id: 7,
    name: "MongoDB",
    color: "#4DB33D",
    position: [6, 0, 0],
  },
  {
    id: 8,
    name: "MySQL",
    color: "#00758F",
    position: [-5, 0, 3],
  },
  {
    id: 9,
    name: "Git / GitHub",
    color: "#F1502F",
    position: [-2.5, 0, 5],
  },
  {
    id: 10,
    name: "Socket.IO",
    color: "#ffffff",
    position: [0, 0, 5.8],
  },
  {
    id: 11,
    name: "Three.js",
    color: "#ffffff",
    position: [2.5, 0, 5],
  },
  {
    id: 12,
    name: "Framer Motion",
    color: "#A259FF",
    position: [5, 0, 3],
  },
  {
    id: 13,
    name: "REST API",
    color: "#5CDB95",
    position: [-2.5, 0, 8],
  },
  {
    id: 14,
    name: "JWT",
    color: "#FF9800",
    position: [2.5, 0, 8],
  },
  {
    id: 15,
    name: "Linux",
    color: "#FCC624",
    position: [0, 0, 10],
  },
];