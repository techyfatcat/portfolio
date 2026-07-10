import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        stadium: {
          green: "#2d5a27",
          "green-light": "#3a7a32",
          turf: "#4a8f3f",
          night: "#0a0a0f",
          floodlight: "#fffbeb",
          gold: "#f59e0b",
          "gold-glow": "#fbbf24",
        },
      },
      fontFamily: {
        // The main display font — bold, sporty
        display: ["var(--font-display)"],
        // Body / UI text
        body: ["var(--font-body)"],
        // Scoreboard / stats (monospaced feel)
        mono: ["var(--font-mono)"],
      },
      animation: {
        "floodlight-on": "floodlightOn 2s ease-out forwards",
        "ball-drop": "ballDrop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "crowd-cheer": "crowdCheer 0.5s ease-in-out infinite alternate",
      },
      keyframes: {
        floodlightOn: {
          "0%": { opacity: "0", filter: "brightness(0)" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        ballDrop: {
          "0%": { transform: "translateY(-200px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        crowdCheer: {
          "0%": { transform: "scaleY(0.95)" },
          "100%": { transform: "scaleY(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;