"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntroStore } from "@/store/useIntroStore";


type PlayerSpot = { id: string; x: number; y: number; activateAt: number };

const FORMATION: PlayerSpot[] = [

  { id: "gk", x: 50, y: 92, activateAt: 5 },

  { id: "lb", x: 18, y: 72, activateAt: 15 },
  { id: "cb1", x: 38, y: 78, activateAt: 25 },
  { id: "cb2", x: 62, y: 78, activateAt: 35 },
  { id: "rb", x: 82, y: 72, activateAt: 45 },

  { id: "lm", x: 30, y: 48, activateAt: 55 },
  { id: "cm", x: 50, y: 42, activateAt: 63 },
  { id: "rm", x: 70, y: 48, activateAt: 71 },

  { id: "lw", x: 20, y: 16, activateAt: 80 },
  { id: "st", x: 50, y: 10, activateAt: 88 },
  { id: "rw", x: 80, y: 16, activateAt: 95 },
];

const PITCH_LINE = "rgba(255,255,255,.08)";
const INACTIVE = "rgba(255,255,255,.15)";
const ACTIVE = "#8FB996";

function stageForProgress(progress: number, scored: boolean) {
  if (scored || progress >= 95) return "Kickoff.";

  return "Entering the Stadium...";
}

export default function LoadingScreen() {
  const assetsReady = useIntroStore((s) => s.assetsReady);
  const loadProgress = useIntroStore((s) => s.loadProgress);

  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [minDurationPassed, setMinDurationPassed] = useState(false);
  const [scored, setScored] = useState(false);

  const targetProgress = useRef(0);


  useEffect(() => {
    useIntroStore.getState().setLoadingFinished(false);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => setMinDurationPassed(true), 2600);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    targetProgress.current = loadProgress;
  }, [loadProgress]);


  useEffect(() => {
    let frame: number;
    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      setDisplayProgress((current) => {
        const target = targetProgress.current;
        const diff = target - current;

        if (Math.abs(diff) < 0.05) return target;

        const ease = 1 - Math.pow(0.0025, dt / 1000);
        return current + diff * ease;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);


  useEffect(() => {
    if (!assetsReady) return;
    if (!minDurationPassed) return;
    if (displayProgress < 99.8) return;

    setScored(true);

    const hold = setTimeout(() => {
      setFading(true);

      const hide = setTimeout(() => {
        useIntroStore.getState().setLoadingFinished(true);
        setVisible(false);
      }, 700);

      return () => clearTimeout(hide);
    }, 450);

    return () => clearTimeout(hold);
  }, [assetsReady, minDurationPassed, displayProgress]);

  const progress = Math.min(100, Math.max(0, displayProgress));
  const stage = useMemo(() => stageForProgress(progress, scored), [progress, scored]);

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
        background: "#060606",
        opacity: fading ? 0 : 1,
        transform: fading ? "scale(1.03)" : "scale(1)",
        filter: fading ? "blur(6px)" : "blur(0px)",
        transition: "opacity .8s ease, transform .8s ease, filter .8s ease",
        pointerEvents: "none",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, #0a0a0a 0%, #060606 45%, #030303 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143,185,150,.10), transparent 70%)",
          opacity: 0.6 + progress / 500,
          filter: "blur(120px)",
          transition: "opacity .6s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 75%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
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
            fontSize: 12,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,.45)",
            marginBottom: 20,
          }}
        >
          Matchday
        </div>

        <div style={{ height: 56, display: "flex", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                margin: 0,
                fontSize: 36,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1,
                textAlign: "center",
                color: stage === "Kickoff." ? ACTIVE : "white",
              }}
            >
              {stage}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div
          style={{
            position: "relative",
            width: 220,
            height: 300,
            marginTop: 36,
          }}
        >
          {/* pitch outline + halfway line + center circle */}
          <svg
            width="220"
            height="300"
            viewBox="0 0 220 300"
            style={{ position: "absolute", inset: 0 }}
          >
            <rect
              x="1"
              y="1"
              width="218"
              height="298"
              rx="6"
              fill="none"
              stroke={PITCH_LINE}
              strokeWidth="1.5"
            />
            <line
              x1="1"
              y1="150"
              x2="219"
              y2="150"
              stroke={PITCH_LINE}
              strokeWidth="1.5"
            />
            <circle
              cx="110"
              cy="150"
              r="28"
              fill="none"
              stroke={PITCH_LINE}
              strokeWidth="1.5"
            />
            <circle cx="110" cy="150" r="2" fill={PITCH_LINE} />
          </svg>

          {/* players */}
          {FORMATION.map((p) => {
            const active = progress >= p.activateAt;
            return (
              <motion.div
                key={p.id}
                initial={false}
                animate={
                  active
                    ? { opacity: 1, scale: [0, 1.25, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  background: active ? ACTIVE : INACTIVE,
                  boxShadow: active
                    ? "0 0 10px rgba(143,185,150,.85)"
                    : "none",
                  transition: "background .3s ease, box-shadow .3s ease",
                }}
              />
            );
          })}
        </div>

        {/* ---------------- Halfway-line progress ---------------- */}
        <div
          style={{
            position: "relative",
            width: 220,
            marginTop: 30,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 1,
              background: PITCH_LINE,
            }}
          >
            {/* center circle marker on the track */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: `1px solid ${PITCH_LINE}`,
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* the ball, travelling left to right */}
           
          </div>
        </div>
      </div>
    </div>
  );
}