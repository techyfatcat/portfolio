"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { useIntroStore } from "@/store/useIntroStore";
import { useMusicStore } from "@/store/useMusicStore";

const STADIUM_AUDIO = "/audio/music/stadium-theme.mp3";

const ACTIVE = "#8FB996";
const LINE = "rgba(255,255,255,.08)";
const INACTIVE = "rgba(255,255,255,.18)";

type Player = {
  id: string;
  x: number;
  y: number;
  activateAt: number;
};

const PLAYERS: Player[] = [
  { id: "gk", x: 110, y: 270, activateAt: 5 },

  { id: "lb", x: 40, y: 215, activateAt: 15 },
  { id: "cb1", x: 85, y: 230, activateAt: 25 },
  { id: "cb2", x: 135, y: 230, activateAt: 35 },
  { id: "rb", x: 180, y: 215, activateAt: 45 },

  { id: "lm", x: 60, y: 145, activateAt: 55 },
  { id: "cm", x: 110, y: 135, activateAt: 63 },
  { id: "rm", x: 160, y: 145, activateAt: 71 },

  { id: "lw", x: 45, y: 55, activateAt: 80 },
  { id: "st", x: 110, y: 35, activateAt: 88 },
  { id: "rw", x: 175, y: 55, activateAt: 95 },
];

function stage(progress: number, complete: boolean) {
  if (complete || progress >= 99.5) return "Kickoff.";


  return "Entering Stadium...";
}

export default function LoadingScreen() {
  const assetsReady = useIntroStore((s) => s.assetsReady);
  const loadProgress = useIntroStore((s) => s.loadProgress);

  const setEnabled = useMusicStore(
    s => s.setEnabled
);

  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const [displayProgress, setDisplayProgress] = useState(0);

  const [loadingFinished, setLoadingFinished] =
    useState(false);

  const [showMusicPrompt, setShowMusicPrompt] =
    useState(false);


  const targetProgress = useRef(0);

  const mounted = useRef(true);

    useEffect(() => {
    useIntroStore.getState().setLoadingFinished(false);

    return () => {
      mounted.current = false;
    };
  }, []);

    useEffect(() => {
    targetProgress.current = loadProgress;
  }, [loadProgress]);

  useEffect(() => {
    let frame = 0;

    const animate = () => {
      setDisplayProgress((current) => {
        const diff = targetProgress.current - current;

        if (Math.abs(diff) < 0.05)
          return targetProgress.current;

        return current + diff * 0.08;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

    useEffect(() => {
    if (!assetsReady) return;

    if (displayProgress < 99.5) return;

    if (loadingFinished) return;

    setLoadingFinished(true);

    setTimeout(() => {
      if (!mounted.current) return;

      setShowMusicPrompt(true);
    }, 350);
  }, [assetsReady, displayProgress, loadingFinished]);

    

  function finishLoading() {
    setShowMusicPrompt(false);

    setTimeout(() => {
      setFading(true);

      setTimeout(() => {
        useIntroStore
          .getState()
          .setLoadingFinished(true);

        setVisible(false);
      }, 700);

    }, 350);
  }

    const progress = Math.min(
    100,
    Math.max(0, displayProgress)
  );

  const title = useMemo(
    () => stage(progress, loadingFinished),
    [progress, loadingFinished]
  );

  if (!visible) return null;


    return (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#050608",
      opacity: fading ? 0 : 1,
      transform: fading ? "scale(1.03)" : "scale(1)",
      filter: fading ? "blur(6px)" : "blur(0px)",
      transition:
        "opacity .8s ease, transform .8s ease, filter .8s ease",
      fontFamily: "Inter, sans-serif",
    }}
  >
    

    {/* Background */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at center, rgba(143,185,150,.08), transparent 65%)",
        filter: "blur(120px)",
      }}
    />

    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        opacity: .3,
      }}
    />

    <div
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >

      <div
        style={{
          letterSpacing: 6,
          textTransform: "uppercase",
          fontSize: 12,
          color: "rgba(255,255,255,.45)",
          marginBottom: 18,
        }}
      >
        MATCHDAY
      </div>

      <AnimatePresence mode="wait">
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: .35 }}
          style={{
            margin: 0,
            fontSize: 38,
            fontWeight: 800,
            color:
              title === "Kickoff."
                ? ACTIVE
                : "white",
          }}
        >
          {title}
        </motion.h1>
      </AnimatePresence>

      {/* ---------- Pitch ---------- */}

      <motion.svg
        width={220}
        height={300}
        viewBox="0 0 220 300"
        style={{
          marginTop: 42,
          overflow: "visible",
        }}
      >

        {/* Outline */}

        <rect
          x="1"
          y="1"
          width="218"
          height="298"
          rx="6"
          fill="none"
          stroke={LINE}
          strokeWidth="1.4"
        />

        {/* Half */}

        <line
          x1="1"
          y1="150"
          x2="219"
          y2="150"
          stroke={LINE}
        />

        {/* Center */}

        <circle
          cx="110"
          cy="150"
          r="28"
          fill="none"
          stroke={LINE}
        />

        <circle
          cx="110"
          cy="150"
          r="2"
          fill={LINE}
        />

        {/* Top Penalty */}

        <rect
          x="55"
          y="1"
          width="110"
          height="45"
          fill="none"
          stroke={LINE}
        />

        <rect
          x="80"
          y="1"
          width="60"
          height="18"
          fill="none"
          stroke={LINE}
        />

        {/* Bottom Penalty */}

        <rect
          x="55"
          y="254"
          width="110"
          height="45"
          fill="none"
          stroke={LINE}
        />

        <rect
          x="80"
          y="281"
          width="60"
          height="18"
          fill="none"
          stroke={LINE}
        />

        {/* ---------- PLAYERS ---------- */}

        {PLAYERS.map((player) => {

          const active =
            progress >= player.activateAt;

          return (

            <motion.circle
              key={player.id}
              cx={player.x}
              cy={player.y}
              r={5}

              initial={false}

              animate={{
                scale: active
                  ? [0, 1.35, 1]
                  : 1,

                fill: active
                  ? ACTIVE
                  : INACTIVE,
              }}

              transition={{
                duration: .45,
              }}

              style={{
                transformOrigin: `${player.x}px ${player.y}px`,
                filter: active
                  ? "drop-shadow(0 0 6px rgba(143,185,150,.8))"
                  : "none",
              }}
            />

          );

        })}

      </motion.svg>

      {/* ---------- Progress ---------- */}

      <div
        style={{
          width: 220,
          marginTop: 34,
        }}
      >

        <div
          style={{
            height: 2,
            borderRadius: 999,
            overflow: "hidden",
            background:
              "rgba(255,255,255,.08)",
          }}
        >

          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              ease: "easeOut",
            }}
            style={{
              height: "100%",
              background: ACTIVE,
            }}
          />

        </div>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            justifyContent:
              "space-between",
            color:
              "rgba(255,255,255,.45)",
            fontSize: 12,
          }}
        >

          <span>Loading Assets</span>

          <span>
            {Math.round(progress)}%
          </span>

        </div>

      </div>

      {/* ---------- Music Prompt ---------- */}

      <AnimatePresence>

        {showMusicPrompt && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            style={{
              marginTop: 34,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >

            <span
              style={{
                color:
                  "rgba(255,255,255,.6)",
                fontSize: 13,
              }}
            >
              Enter the stadium with music?
            </span>

            <div
              style={{
                display: "flex",
                gap: 12,
              }}
            >

              <button
                onClick={() => {
                  setEnabled(true);
                  finishLoading();
                }}
                style={{
                  border: `1px solid ${ACTIVE}`,
                  padding:
                    "10px 22px",
                  borderRadius: 999,
                  background:
                    "rgba(143,185,150,.1)",
                  color: ACTIVE,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Yes
              </button>

              <button
                onClick={() => {
                  setEnabled(false);
                  finishLoading();
                }}
                style={{
                  border:
                    "1px solid rgba(255,255,255,.15)",
                  padding:
                    "10px 22px",
                  borderRadius: 999,
                  background:
                    "transparent",
                  color:
                    "rgba(255,255,255,.7)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                No
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  </div>
);

}