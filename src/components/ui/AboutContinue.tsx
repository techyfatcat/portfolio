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
              left: "62%",
top: "70%",
transform: visible
  ? "translateY(-50%)"
  : "translateY(calc(-50% + 12px))",
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
      <div
  onClick={() => moveTo("skills")}
  style={{
    marginTop: 22,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    userSelect: "none",
  }}
>
  <span
    style={{
      fontFamily: "var(--font-display)",
      fontSize: 22,
      letterSpacing: 2,
      color: "white",
      textTransform: "uppercase",
      lineHeight: 1,
    }}
  >
    Continue
  </span>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#c1f612",
      fontWeight: 700,
      fontSize: 15,
    }}
  >
    <span>to Skills</span>

    <span
      style={{
        fontSize: 18,
        transition: "transform .25s ease",
      }}
    >
      →
    </span>
  </div>

  <div
    style={{
      width: 70,
      height: 2,
      borderRadius: 999,
      background:
        "linear-gradient(90deg, transparent, #c1f612, transparent)",
      marginTop: 4,
    }}
  />
</div>
    </div>
  );
}