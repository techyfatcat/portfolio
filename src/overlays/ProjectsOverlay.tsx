"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCameraStore } from "@/store/useCameraStore";
import { useProjectModalStore } from "@/store/useProjectModalStore";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type Project = {
  name: string;
  tagline: string;
  tech: string[];
  status?: string;
  link: string;
  image?: string;
};

type Props = {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
};

const ACCENT = "#8FB996";
const BG = "#080A08";
const PANEL_RADIUS = 18;

export default function ProjectsOverlay({ projects, onSelectProject }: Props) {
  const currentView = useCameraStore((s) => s.currentView);
  const moveTo = useCameraStore((s) => s.moveTo);
  const openProject = useProjectModalStore((s) => s.open);

  const breakpoint = useBreakpoint();

  if (breakpoint !== "mobile") return null;
  if (currentView !== "projects") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "clamp(90px,14vh,120px) clamp(10px,3vw,24px) clamp(10px,2vh,24px)",
        pointerEvents: "none",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          maxHeight: "calc(100dvh - clamp(100px,16vh,144px))",
          borderRadius: PANEL_RADIUS,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          background: `
            radial-gradient(circle at top,
            rgba(143,185,150,.08),
            transparent 35%),
            linear-gradient(180deg,
            #11140F 0%,
            ${BG} 25%,
            #060706 100%)
          `,
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,.6)",
          pointerEvents: "auto",
        }}
      >
        {/* Tunnel light */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 320,
            background:
              "radial-gradient(circle, rgba(143,185,150,.14), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: "clamp(20px,3.5vh,32px) clamp(20px,4vw,36px) clamp(8px,1.5vh,14px)",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.4rem,3.4vw,2rem)",
              margin: 0,
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Projects.
          </h1>
        </div>

        {/* Project cards */}
        <div
          style={{
            padding: "clamp(10px,1.5vh,16px) clamp(20px,3.5vw,32px) clamp(4px,1vh,8px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px,1.6vh,14px)",
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          {projects.map((project, i) => {
            const tech = project.tech ?? [];
            const tagline = project.tagline ?? "";

            return (
              <motion.button
                // Falls back to index if two projects ever share a name/link,
                // so adding projects can never produce a duplicate-key bug.
                key={project.link || `${project.name}-${i}`}
                onClick={() =>
                  onSelectProject ? onSelectProject(project) : openProject(project)
                }
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="tunnelGate"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0, // never let cards get squashed as the list grows
                  textAlign: "left",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "rgba(255,255,255,.02)",
                  cursor: "pointer",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                {project.image && (
                  <div
                    style={{
                      width: "100%",
                      background: "#050608",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 12,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 150,
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: "clamp(14px,2.2vh,18px) clamp(16px,3vw,20px)",
                    gap: 12,
                  }}
                >
                  {/* flex: 1 + minWidth: 0 is the pairing that actually lets
                      this column shrink to the space left by the arrow icon
                      instead of ballooning to fit its own text content —
                      without both, long names/taglines can push past the
                      card edge and get silently clipped. */}
                  <div style={{ flex: "1 1 0%", minWidth: 0, width: "100%" }}>
                    <div
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "clamp(15px,2.2vw,17px)",
                        lineHeight: 1.3,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {project.name}
                    </div>

                    {tagline && (
                      <div
                        style={{
                          color: "rgba(255,255,255,.5)",
                          fontSize: 12.5,
                          marginTop: 4,
                          lineHeight: 1.4,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "anywhere",
                          wordBreak: "break-word",
                        }}
                      >
                        {tagline}
                      </div>
                    )}

                    {tech.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          marginTop: 10,
                          width: "100%",
                        }}
                      >
                        {/* Every tag renders — no hardcoded cap that quietly
                            drops tags once a project has more than N. */}
                        {tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 10.5,
                              color: ACCENT,
                              background: "rgba(143,185,150,.1)",
                              border: "1px solid rgba(143,185,150,.25)",
                              borderRadius: 999,
                              padding: "3px 9px",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ArrowUpRight
                    size={20}
                    strokeWidth={2}
                    style={{
                      color: "rgba(255,255,255,.5)",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "clamp(14px,2.5vh,24px) 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(8px,1.5vh,14px)",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => moveTo("contact")}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.03)",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: ".25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.background = "rgba(143,185,150,.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
              e.currentTarget.style.background = "rgba(255,255,255,.03)";
            }}
          >
            Contact
          </button>
        </div>
      </div>

      <style>{`
        .tunnelGate{
          transition:
            transform .25s ease,
            border-color .25s ease,
            background .25s ease,
            box-shadow .25s ease;
        }

        .tunnelGate:active{
          transform: scale(0.98);
          border-color:${ACCENT};
          background:rgba(143,185,150,.06);
          box-shadow:0 14px 32px rgba(0,0,0,.35);
        }
      `}</style>
    </motion.div>
  );
}