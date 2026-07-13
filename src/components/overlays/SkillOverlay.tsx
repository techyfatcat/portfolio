"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCameraStore } from "@/store/useCameraStore";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiThreedotjs,
  SiFramer,
  SiExpress,
  SiJsonwebtokens,
  SiSocketdotio,
  SiMongodb,
  SiMysql,
  SiGit,
  SiLinux,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Skill = {
  name: string;
  value: number;
};

type Category = {
  id: string;
  title: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", value: 95 },
      { name: "Next.js", value: 92 },
      { name: "JavaScript", value: 94 },
      { name: "Tailwind CSS", value: 96 },
      { name: "Three.js", value: 84 },
      { name: "Framer Motion", value: 88 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Express", value: 92 },
      { name: "REST API", value: 95 },
      { name: "JWT", value: 90 },
      { name: "Socket.IO", value: 86 },
    ],
  },
  {
    id: "database",
    title: "Database",
    skills: [
      { name: "MongoDB", value: 93 },
      { name: "MySQL", value: 87 },
    ],
  },
  {
    id: "tools",
    title: "Languages & Tools",
    skills: [
      { name: "Java", value: 95 },
      { name: "Git / GitHub", value: 96 },
      { name: "Linux", value: 86 },
    ],
  },
];


const ACCENT = "#8FB996"; // muted turf-green — tabs, borders, hover states
const NUMBER = "#C9A24B"; // worn-gold — reserved only for stat numbers
const BG = "#0D0F0B"; // warm near-black, not pure black
const PANEL_RADIUS = 12; // one radius language, used everywhere

const ICON_MAP: Record<string, IconType | null> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "JavaScript": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Three.js": SiThreedotjs,
  "Framer Motion": SiFramer,
  "Express": SiExpress,
  "REST API": null,
  "JWT": SiJsonwebtokens,
  "Socket.IO": SiSocketdotio,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "Java": null,
  "Git / GitHub": SiGit,
  "Linux": SiLinux,
};

function monogram(name: string) {
  return name
    .split(/[\s./]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function SkillsOverlay() {
  const currentView = useCameraStore((s) => s.currentView);
  const moveTo = useCameraStore((s) => s.moveTo);
  const [active, setActive] = useState(0);
  const current = categories[active];

  if (currentView !== "skills") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="skillsOverlayRoot"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pointerEvents: "none",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="skillsPanel" style={{ pointerEvents: "auto" }}>
        <div className="skillsLeft">
          <div
            className="skillsHeaderRule"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderTop: `2px solid ${ACCENT}`,
              borderBottom: "1px solid rgba(255,255,255,.06)",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ACCENT,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                color: "rgba(255,255,255,.45)",
              }}
            >
              Live stats
            </span>
          </div>

          <div className="skillsLeftBody">
            <h1 className="skillsTitle">Technical skills</h1>
            <p className="skillsSubtitle">
              Core technologies powering modern web, backend and AI applications.
            </p>

            <div className="skillsTabs">
              {categories.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(index)}
                  className="skillsTabBtn"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: active === index ? 600 : 400,
                    color: active === index ? "white" : "rgba(255,255,255,.4)",
                    borderBottom:
                      active === index
                        ? `2px solid ${ACCENT}`
                        : "2px solid transparent",
                    transition: "color .2s ease, border-color .2s ease",
                  }}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div key={current.id} className="skillsStatList">
              {current.skills.map((skill) => (
                <div key={skill.name} className="skillsStatRow">
                  <span className="skillsStatName">{skill.name}</span>
                  <div className="skillsStatRight">
                    <div className="skillsBarTrack">
                      <div
                        className="skillsBarFill"
                        style={{
                          width: `${skill.value}%`,
                          background: ACCENT,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                    <span
                      className="skillsStatValue"
                      style={{ color: NUMBER }}
                    >
                      {skill.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skillsRight">
          <div className="skillsRightHeader">
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                color: "rgba(255,255,255,.35)",
              }}
            >
              Tech stack
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: ACCENT,
              }}
            >
              {current.title}
            </span>
          </div>

          <div key={current.id} className="skillsIconGrid">
            {current.skills.map((skill) => {
              const Icon = ICON_MAP[skill.name];

              return (
                <div
                  key={skill.name}
                  className="skillIconCell"
                  style={{
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid transparent",
                    background: "transparent",
                    transition:
                      "background .2s ease, border-color .2s ease, transform .2s ease",
                  }}
                >
                  {Icon ? (
                    <Icon size={26} color="rgba(255,255,255,.7)" className="skillIconGlyph" />
                  ) : (
                    <span className="skillIconMonogram">
                      {monogram(skill.name)}
                    </span>
                  )}
                  <span className="skillIconLabel">{skill.name}</span>
                </div>
              );
            })}
          </div>

          <div className="skillsFooter">
            <button
              onClick={() => moveTo("projects")}
              className="skillsProjectsBtn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.14)",
                color: "white",
                borderRadius: PANEL_RADIUS,
                cursor: "pointer",
                fontWeight: 500,
                letterSpacing: 0.3,
                transition: "background .2s ease, border-color .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.09)";
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
              }}
            >
              Projects
              
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes statFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .skillIconCell:hover {
          background: rgba(143, 185, 150, 0.06);
          border-color: ${ACCENT};
          transform: translateY(-2px);
        }
        .skillIconCell:hover svg,
        .skillIconCell:hover span {
          color: ${ACCENT};
        }

        /* ---------- root / panel ---------- */
        .skillsOverlayRoot {
          padding-top: clamp(84px, 12vh, 148px);
          padding-bottom: 24px;
          padding-left: 12px;
          padding-right: 12px;
          box-sizing: border-box;
        }
        .skillsPanel {
          width: 92%;
          max-width: 1500px;
          height: 76vh;
          max-height: 820px;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          overflow: hidden;
          border-radius: ${PANEL_RADIUS}px;
          background: ${BG};
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 20px 60px rgba(0,0,0,.5);
        }
        .skillsLeft, .skillsRight {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .skillsRight {
          background: rgba(255,255,255,.015);
          border-left: 1px solid rgba(255,255,255,.06);
        }

        /* ---------- left column ---------- */
        .skillsHeaderRule {
          padding: 18px clamp(20px, 4vw, 40px);
        }
        .skillsLeftBody {
          padding: clamp(20px, 3vw, 36px) clamp(24px, 5vw, 64px) clamp(18px, 3vw, 28px);
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .skillsTitle {
          margin: 0;
          color: white;
          font-weight: 700;
          font-size: clamp(24px, 3.4vw, 38px);
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }
        .skillsSubtitle {
          color: rgba(255,255,255,.45);
          font-size: clamp(12px, 1.6vw, 13px);
          margin-top: 8px;
          margin-bottom: clamp(16px, 3vw, 24px);
          flex-shrink: 0;
        }
        .skillsTabs {
          display: flex;
          gap: clamp(14px, 3vw, 32px);
          border-bottom: 1px solid rgba(255,255,255,.06);
          margin-bottom: 20px;
          flex-shrink: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .skillsTabs::-webkit-scrollbar { display: none; }
        .skillsTabBtn {
          padding: 0 0 14px;
          font-size: clamp(12px, 1.8vw, 14px);
          white-space: nowrap;
        }
        .skillsStatList {
          animation: statFadeIn .25s ease;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow-y: auto;
        }
        .skillsStatRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
          flex-shrink: 0;
          gap: 12px;
        }
        .skillsStatName {
          color: rgba(255,255,255,.85);
          font-size: clamp(12px, 1.8vw, 14px);
          font-weight: 400;
        }
        .skillsStatRight {
          display: flex;
          align-items: center;
          gap: clamp(8px, 2vw, 16px);
        }
        .skillsBarTrack {
          width: clamp(64px, 14vw, 120px);
          height: 2px;
          background: rgba(255,255,255,.08);
        }
        .skillsBarFill {
          height: 100%;
        }
        .skillsStatValue {
          font-size: clamp(12px, 1.8vw, 14px);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          width: 28px;
          text-align: right;
        }

        /* ---------- right column ---------- */
        .skillsRightHeader {
          padding: 18px clamp(18px, 3vw, 32px);
          border-bottom: 1px solid rgba(255,255,255,.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .skillsIconGrid {
          flex: 1;
          min-height: 0;
          padding: clamp(16px, 3vw, 32px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(10px, 2vw, 20px);
          align-content: start;
          overflow-y: auto;
          animation: statFadeIn .25s ease;
        }
        .skillIconCell {
          padding: 8px;
          border-radius: ${PANEL_RADIUS}px;
          gap: 10px;
        }
        .skillIconMonogram {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,.7);
        }
        .skillIconLabel {
          font-size: clamp(9px, 1.6vw, 11px);
          font-weight: 400;
          color: rgba(255,255,255,.5);
          text-align: center;
          line-height: 1.2;
        }
        .skillsFooter {
          flex-shrink: 0;
          padding: 18px clamp(18px, 3vw, 32px);
          border-top: 1px solid rgba(255,255,255,.06);
          display: flex;
          justify-content: flex-end;
        }
        .skillsProjectsBtn {
          padding: 13px clamp(18px, 3vw, 26px);
          font-size: clamp(13px, 1.8vw, 14px);
        }

        /* ---------- tablet ---------- */
        @media (max-width: 1024px) {
          .skillsPanel {
            grid-template-columns: 1fr 0.85fr;
            height: 80vh;
          }
          .skillsIconGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ---------- mobile: stack panels, allow scroll ---------- */
        @media (max-width: 760px) {
          .skillsOverlayRoot {
            align-items: flex-start;
            padding-left: 8px;
            padding-right: 8px;
          }
          .skillsPanel {
            width: 100%;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            height: auto;
            max-height: 86vh;
            overflow-y: auto;
          }
          .skillsRight {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,.06);
          }
          .skillsIconGrid {
            grid-template-columns: repeat(3, 1fr);
            overflow-y: visible;
          }
          .skillsStatList {
            overflow-y: visible;
          }
          .skillsTitle {
            font-size: clamp(22px, 6vw, 28px);
          }
          .skillsFooter {
            justify-content: center;
          }
          .skillsProjectsBtn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 420px) {
          .skillsIconGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .skillsTabs {
            gap: 14px;
          }
        }
      `}</style>
    </motion.div>
  );
}