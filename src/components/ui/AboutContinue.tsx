"use client";

import { useEffect, useState } from "react";
import { useCameraStore } from "@/store/useCameraStore";

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const update = () => setIsDesktop(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

export default function AboutContinue() {
  const currentView = useCameraStore((s) => s.currentView);
  const moveTo = useCameraStore((s) => s.moveTo);

  const isDesktop = useIsDesktop();
  const visible = currentView === "about";

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9996,
        fontFamily: "Inter, sans-serif",
        ...(isDesktop
          ? {
              top: "50%",
              right: "clamp(24px, 5vw, 72px)",
              transform: visible
                ? "translate3d(0,-50%,0)"
                : "translate3d(0,calc(-50% + 12px),0)",
            }
          : {
              bottom: "max(24px, env(safe-area-inset-bottom, 0px) + 16px)",
              left: "50%",
              right: "auto",
              transform: visible
                ? "translate3d(-50%,0,0)"
                : "translate3d(-50%,12px,0)",
            }),

        opacity: visible ? 1 : 0,
        transition: "opacity .5s ease, transform .5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <button
        onClick={() => moveTo("skills")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "clamp(10px, 1.4vw, 14px) clamp(20px, 3vw, 30px)",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.18)",
          color: "white",
          borderRadius: "999px",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          fontSize: "clamp(13px, 1.4vw, 15px)",
          fontWeight: 600,
          whiteSpace: "nowrap",
          transition: "background .25s ease, border-color .25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,.14)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,.06)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,.18)";
        }}
      >
        Continue to Skills
      </button>
    </div>
  );
}