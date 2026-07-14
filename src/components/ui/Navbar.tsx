"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useCameraStore } from "@/store/useCameraStore";
import { CameraView } from "@/data/cameraViews";
import { useIntroStore } from "@/store/useIntroStore";
import { useMusicStore } from "@/store/useMusicStore";

const ACCENT = "#c1f612";
const MUSIC_HINT_KEY = "musicHintSeen";
const TARGET_VOLUME = 0.12;
const NAVBAR_HEIGHT = 58; 

const sections: { id: CameraView; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function HamburgerLine({ index, open }: { index: 0 | 1 | 2; open: boolean }) {
  const base: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: 2,
    borderRadius: 2,
    background: "white",
    transition: "transform .3s ease, opacity .2s ease, top .3s ease",
  };

  if (index === 0) {
    return (
      <span
        style={{
          ...base,
          top: open ? 6 : 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
      />
    );
  }
  if (index === 1) {
    return <span style={{ ...base, top: 6, opacity: open ? 0 : 1 }} />;
  }
  return (
    <span
      style={{
        ...base,
        top: open ? 6 : 12,
        transform: open ? "rotate(-45deg)" : "rotate(0deg)",
      }}
    />
  );
}

export default function Navbar() {
  const currentView = useCameraStore((s) => s.currentView);
  const moveTo = useCameraStore((s) => s.moveTo);
  const entered = useCameraStore((s) => s.entered);
  const enter = useCameraStore((s) => s.enter);
  const introFinished = useIntroStore((s) => s.introFinished);
  const heroAnnouncementDone = useIntroStore((s) => s.heroAnnouncementDone);

  const enabled = useMusicStore(
    s => s.enabled
);

const toggle = useMusicStore(
    s => s.toggle
);

  const handleNav = (id: CameraView) => {
    if (!entered) enter();
    moveTo(id);
  };

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const glowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [musicPlaying, setMusicPlaying] = useState(true);
  const [showMusicHint, setShowMusicHint] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cdControls = useAnimation();

  

  useEffect(() => {
    if (!introFinished) return;

    const id = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [introFinished]);

  useEffect(() => {
    if (!heroAnnouncementDone) return;

    cdControls.start({
      scale: [1, 1.35, 0.92, 1.08, 1],
      transition: { duration: 0.7, ease: "easeOut" },
    });
  }, [heroAnnouncementDone, cdControls]);

  useEffect(() => {
    if (!heroAnnouncementDone) return;

    const seen = localStorage.getItem(MUSIC_HINT_KEY);
    if (seen) return;

    const t = setTimeout(() => {
      setShowMusicHint(true);
    }, 800);

    return () => clearTimeout(t);
  }, [heroAnnouncementDone]);

  const positionGlow = (id: string) => {
    const el = itemRefs.current[id];
    const track = trackRef.current;
    if (!el || !track || !glowRef.current) return;
    const elRect = el.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const centerX = elRect.left - trackRect.left + elRect.width / 2;
    glowRef.current.style.transform = `translate3d(${centerX}px, 0, 0) translateX(-50%)`;
    glowRef.current.style.opacity = "1";
  };

  const resetGlow = () => {
    positionGlow(currentView);
  };

  const sharedGlass: React.CSSProperties = {
    background: "rgba(20,22,28,.45)",
    border: "1px solid rgba(255,255,255,.1)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 12px 40px rgba(0,0,0,.35)",
  };

  return (
    <div
      className="navbar-root"
      style={{
        position: "fixed",
        top: 24,
        left: 0,
        right: 0,
        height: NAVBAR_HEIGHT,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 28px",
        fontFamily: "Inter, sans-serif",

        opacity: introFinished ? 1 : 0,
        transform: introFinished ? "translate3d(0,0,0)" : "translate3d(0,-10px,0)",
        pointerEvents: introFinished ? "auto" : "none",
        transition: "opacity .6s ease, transform .6s ease",
      }}
    >
      <div
        className="navbar-badge"
        style={{
          position: "absolute",
          left: 28,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 18px",
          borderRadius: 999,
          ...sharedGlass,
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
            color: "#080a0f",
            flexShrink: 0,
          }}
        >
          AS
        </span>

        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 1.5,
            color: "white",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Aadit FC
        </span>

        <span style={{ width: 1, height: 16, background: "rgba(255,255,255,.15)" }} />

        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#3ddc84",
            boxShadow: "0 0 6px rgba(61,220,132,.8)",
            flexShrink: 0,
          }}
        />

        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: 1,
            color: "rgba(255,255,255,.75)",
            whiteSpace: "nowrap",
          }}
        >
          {formatClock(elapsed)}
        </span>
      </div>


      <button
        className="navbar-mobile-toggle"
        onClick={() => setMobileMenuOpen((o) => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        style={{
          display: "none",
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          ...sharedGlass,
        }}
      >
        <div style={{ width: 18, height: 14, position: "relative" }}>
          <HamburgerLine index={0} open={mobileMenuOpen} />
          <HamburgerLine index={1} open={mobileMenuOpen} />
          <HamburgerLine index={2} open={mobileMenuOpen} />
        </div>
      </button>

      <div
        ref={trackRef}
        className="navbar-pill"
        onMouseLeave={resetGlow}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 6,
          borderRadius: 999,
          ...sharedGlass,
        }}
      >
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: 90,
            height: 60,
            marginTop: -30,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)`,
            filter: "blur(14px)",
            pointerEvents: "none",
            opacity: 0,
            transition: "transform .35s cubic-bezier(.22,1,.36,1), opacity .3s ease",
            zIndex: 0,
          }}
        />

        {sections.map((section) => {
          const isActive = currentView === section.id;
          return (
            <button
              key={section.id}
              ref={(el) => {
                itemRefs.current[section.id] = el;
              }}
              className="navbar-tab"
              onClick={() => handleNav(section.id)}
              onMouseEnter={() => positionGlow(section.id)}
              style={{
                position: "relative",
                zIndex: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
                color: isActive ? "white" : "rgba(255,255,255,.5)",
                transition: "color .2s ease",
              }}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      <div
        className="navbar-cd-wrap"
        style={{
          position: "absolute",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <motion.div
          className="cd-toggle-btn"
          animate={cdControls}
          style={{
            position: "relative",
            width: 58,
            height: 58,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            ...sharedGlass,
          }}
          title={musicPlaying ? "Pause Music" : "Play Music"}
        >
          <div
            className="cd-disc"
            style={{
              position: "relative",
              width: 34,
              height: 34,
              borderRadius: "50%",
              animation: musicPlaying ? "spinCD 5s linear infinite" : "none",
              transition: "box-shadow .35s ease",
              background: `
                conic-gradient(from 0deg,
                  #ff9a9e 0deg,
                  #fad0c4 40deg,
                  #a1c4fd 80deg,
                  #c2e9fb 120deg,
                  #d4fc79 160deg,
                  #96e6a1 200deg,
                  #a1c4fd 240deg,
                  #fbc2eb 280deg,
                  #ff9a9e 320deg,
                  #ff9a9e 360deg
                )
              `,
              boxShadow: musicPlaying
                ? `0 0 16px rgba(193,246,18,.35), inset 0 0 6px rgba(255,255,255,.5)`
                : "inset 0 0 4px rgba(255,255,255,.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,.85) 0%, rgba(255,255,255,.25) 12%, rgba(255,255,255,0) 30%), radial-gradient(circle at center, rgba(180,180,180,.15) 0%, rgba(120,120,120,.35) 70%, rgba(80,80,80,.45) 100%)",
                mixBlendMode: "overlay",
              }}
            />
            {[10, 16, 22, 28].map((r) => (
              <div
                key={r}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: r,
                  height: r,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.18)",
                  pointerEvents: "none",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 48%, transparent 62%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#161616",
                border: "2px solid rgba(230,230,230,.9)",
                boxShadow: "0 0 3px rgba(0,0,0,.5)",
                zIndex: 2,
              }}
            />
          </div>

          <div className="cd-icon-overlay">
            {musicPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <rect x="5" y="4" width="5" height="16" rx="1" />
                <rect x="14" y="4" width="5" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M7 4v16l14-8L7 4z" />
              </svg>
            )}
          </div>
        </motion.div>


      </div>

      {/* Mobile dropdown menu — only ever rendered when open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.4)",
                zIndex: 10040,
              }}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 24 + NAVBAR_HEIGHT + 10,
                left: 16,
                zIndex: 10050,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: 10,
                borderRadius: 16,
                minWidth: 190,
                ...sharedGlass,
              }}
            >
              {sections.map((section) => {
                const isActive = currentView === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      handleNav(section.id);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      textAlign: "left",
                      background: isActive ? "rgba(255,255,255,.08)" : "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "12px 14px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: 0.3,
                      color: isActive ? "white" : "rgba(255,255,255,.6)",
                      transition: "background .2s ease, color .2s ease",
                    }}
                  >
                    {section.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spinCD{
          from{ transform:rotate(0deg); }
          to{ transform:rotate(360deg); }
        }

        .cd-toggle-btn {
          transition: box-shadow .3s ease;
        }
        .cd-toggle-btn:hover {
          box-shadow: 0 14px 30px rgba(0,0,0,.4);
        }
        .cd-toggle-btn:active {
          transform: scale(0.96);
        }

        .cd-icon-overlay {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(8,10,15,.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .25s ease;
          pointer-events: none;
          z-index: 3;
        }
        .cd-toggle-btn:hover .cd-icon-overlay {
          opacity: 1;
        }

        /* ===================== RESPONSIVE ===================== */

        @media (max-width: 768px) {
          .navbar-root {
            padding: 0 12px !important;
            top: 14px !important;
          }

          /* Badge + full pill disappear entirely; hamburger takes over */
          .navbar-badge,
          .navbar-pill {
            display: none !important;
          }
          .navbar-mobile-toggle {
            display: flex !important;
          }

          .navbar-cd-wrap {
            right: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .cd-toggle-btn {
            width: 46px !important;
            height: 46px !important;
          }
          .navbar-hint {
            right: 0 !important;
            top: 60px !important;
            transform: none !important;
            width: min(260px, calc(100vw - 24px)) !important;
          }
        }
      `}</style>
    </div>
  );
}