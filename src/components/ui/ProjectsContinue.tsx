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

export default function ProjectsContinue() {
  const currentView = useCameraStore((s) => s.currentView);
  const moveTo = useCameraStore((s) => s.moveTo);
  const isDesktop = useIsDesktop();
  const [hovered, setHovered] = useState(false);

  const visible = currentView === "projects";

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9996,
        left: "50%",
        bottom: isDesktop
          ? "48px"
          : "max(24px, env(safe-area-inset-bottom, 0px) + 16px)",
        transform: visible
          ? `translate3d(-50%,0,0) scale(${hovered ? 1.03 : 1})`
          : "translate3d(-50%,14px,0) scale(1)",
        opacity: visible ? 1 : 0,
        transition:
          "opacity .5s ease, transform .4s cubic-bezier(.22,1,.36,1)",
        pointerEvents: visible ? "auto" : "none",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        role="button"
        onClick={() => moveTo("contact")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: "12px 26px 14px",
          borderRadius: 14,
          cursor: "pointer",
          userSelect: "none",
          background: "rgba(8, 10, 8, 0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${
            hovered ? "rgba(193,246,18,0.55)" : "rgba(193,246,18,0.22)"
          }`,
          boxShadow: hovered
            ? "0 0 22px rgba(193,246,18,0.28), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 0 14px rgba(193,246,18,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color .25s ease, box-shadow .25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              letterSpacing: 1.5,
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Contact ME
          </span>

          <div style={{ display: "flex", gap: 1 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  color: "#C1F612",
                  fontWeight: 700,
                  fontSize: 15,
                  animation: `chevronPulse 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                ›
              </span>
            ))}
          </div>
        </div>

    
        
      </div>

      <style jsx>{`
        @keyframes chevronPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: translateX(0);
          }
          50% {
            opacity: 1;
            transform: translateX(3px);
          }
        }

        @keyframes linePulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}