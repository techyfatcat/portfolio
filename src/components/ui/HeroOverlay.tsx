"use client";

import { useEffect, useRef, useState } from "react";
import { useIntroStore } from "@/store/useIntroStore";
import { useCameraStore } from "@/store/useCameraStore";

const sequence = [
  { text: "Welcome to Aadit's Portfolio" },
  { text: "Passionate Full Stack Developer" },
];

const HOLD_MS = 2000;
const FADE_MS = 600;

const DUST = Array.from({ length: 8 }, (_, i) => ({
  left: 8 + ((i * 37) % 84),
  delay: i * 1.3,
  duration: 14 + (i % 4) * 3,
  size: 2 + (i % 3),
}));

export default function HeroOverlay() {
  const introFinished = useIntroStore((state) => state.introFinished);
  
  const setHeroAnnouncementDone = useIntroStore((s) => s.setHeroAnnouncementDone);
  const enter = useCameraStore((s) => s.enter);
  const moveTo = useCameraStore((state) => state.moveTo);
  const currentView = useCameraStore((s) => s.currentView);

  const [phase, setPhase] = useState<"announcement" | "fading" | "hero">("announcement");
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);
  const chimeRef = useRef<HTMLAudioElement | null>(null);
  const hasChimed = useRef(false);

  const playSafely = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // kicks off the sequence once, plays the chime, fades the first message in
  useEffect(() => {
    if (!introFinished || currentView !== "hero" || phase !== "announcement") return;

    if (!hasChimed.current) {
      hasChimed.current = true;
      playSafely(chimeRef.current);
    }

    let cancelled = false;
    const fadeIn = setTimeout(() => {
      if (cancelled) return;
      setMsgVisible(true);
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(fadeIn);
    };
  }, [introFinished, currentView, phase]);

  // advances: hold -> fade out -> either next message, or move to hero phase
  useEffect(() => {
    if (!msgVisible || phase !== "announcement") return;

    const hold = setTimeout(() => {
      setMsgVisible(false);

      const next = setTimeout(() => {
        if (msgIndex < sequence.length - 1) {
          setMsgIndex((i) => i + 1);
          setMsgVisible(true);
          playSafely(dingRef.current);
        } else {
          setPhase("fading");
          const toHero = setTimeout(() => setPhase("hero"), FADE_MS);
          return () => clearTimeout(toHero);
        }
      }, FADE_MS);

      return () => clearTimeout(next);
    }, HOLD_MS);

    return () => clearTimeout(hold);
  }, [msgVisible, msgIndex, phase]);

  useEffect(() => {
    if (phase !== "hero") return;
    const content = setTimeout(() => setHeroVisible(true), 150);
    const button = setTimeout(() => {
      setButtonVisible(true);
      // The button appearing is the last visible step of the loading
      // sequence — this is the true "done" signal for the rest of the app.
      setHeroAnnouncementDone(true);
    }, 1400);
    return () => {
      clearTimeout(content);
      clearTimeout(button);
    };
  }, [phase, setHeroAnnouncementDone]);

  const showAnnouncementLayer = phase === "announcement" || phase === "fading";
  const active = introFinished && currentView === "hero";
  const currentMessage = sequence[msgIndex];

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9995,
        overflow: "hidden",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        opacity: active ? 1 : 0,
        transition: "opacity 700ms ease",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {/* ===================== ANNOUNCEMENT PHASE ===================== */}
      {showAnnouncementLayer && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#020305",
            opacity: phase === "fading" ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "50%",
              width: 900,
              height: 1200,
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(200,220,255,.10), transparent 60%)",
              animation: "spotlightPulse 5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "50%",
              width: 380,
              height: 700,
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.14), transparent 65%)",
              animation: "spotlightPulse 5s ease-in-out infinite .3s",
              pointerEvents: "none",
            }}
          />

          {DUST.map((d, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${d.left}%`,
                bottom: -20,
                width: d.size,
                height: d.size,
                borderRadius: "50%",
                background: "rgba(255,255,255,.4)",
                animation: `dustRise ${d.duration}s linear infinite`,
                animationDelay: `${d.delay}s`,
                pointerEvents: "none",
              }}
            />
          ))}

          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              pointerEvents: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              mixBlendMode: "overlay",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 50% 40%, transparent 30%, rgba(0,0,0,.75) 100%)",
            }}
          />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "9vh", background: "#000" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "9vh", background: "#000" }} />

          {/* single message, swapped via msgIndex — crossfades each time */}
          <div
            className="announcement-text"
            style={{
              position: "relative",
              zIndex: 3,
              textAlign: "center",
              opacity: msgVisible ? 1 : 0,
              filter: msgVisible ? "blur(0px)" : "blur(14px)",
              transform: msgVisible ? "scale(1)" : "scale(0.94)",
              transition: `opacity ${FADE_MS}ms ease, filter ${FADE_MS}ms ease, transform ${FADE_MS}ms cubic-bezier(.22,1,.36,1)`,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                fontSize: "clamp(32px, 5.5vw, 78px)",
                lineHeight: 1.15,
                letterSpacing: -1.5,
                color: "white",
                textShadow: "0 0 60px rgba(255,255,255,.15)",
              }}
            >
              {currentMessage.text}
            </h1>
          </div>
        </div>
      )}

      {/* ===================== HERO PHASE ===================== */}
      {phase === "hero" && (
        <div
          className="hero-phase"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "18vh",
            paddingRight: "120px",
            paddingBottom: "90px",
          }}
        >
          <div
            ref={glowRef}
            className="hero-glow"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 500,
              height: 500,
              marginLeft: -250,
              marginTop: -250,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,.05), transparent 70%)",
              pointerEvents: "none",
              willChange: "transform",
            }}
          />

          <div
            className="hero-watermark"
            style={{
              position: "absolute",
              right: "60px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "clamp(220px, 26vw, 420px)",
              fontWeight: 800,
              lineHeight: 1,
              color: "rgba(255,255,255,.025)",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            AS
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.035,
              pointerEvents: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              mixBlendMode: "overlay",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 70% 50%, transparent 40%, rgba(0,0,0,.35) 100%)",
            }}
          />

          <div
            className="hero-vertical-label"
            style={{
              position: "absolute",
              left: "48px",
              top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              writingMode: "vertical-rl",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "rgba(255,255,255,.32)",
              textTransform: "uppercase",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1s .3s ease",
            }}
          >
            Portfolio — 2026 · Based in India
          </div>

          <div
            className="hero-text-block"
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "right",
              color: "white",
              maxWidth: "600px",
            }}
          >
            <div
              className="hero-status-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                marginBottom: "20px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,15px,0)",
                transition:
                  "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,.5)",
                  textTransform: "uppercase",
                }}
              >
                Open to opportunities
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#3ddc84",
                  boxShadow: "0 0 8px rgba(61,220,132,.8)",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              />
            </div>

            <h1
              className="hero-name"
              style={{
                fontFamily: "inherit",
                fontWeight: 800,
                fontSize: "clamp(56px, 6.2vw, 84px)",
                lineHeight: 0.98,
                letterSpacing: "-2.5px",
                margin: 0,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,45px,0)",
                transition:
                  "opacity .9s .12s cubic-bezier(.22,1,.36,1), transform .9s .12s cubic-bezier(.22,1,.36,1)",
              }}
            >
              AADIT
              <br />
              SARHADI
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "24px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: heroVisible ? "80px" : "0px",
                  background: "rgba(255,255,255,.35)",
                  transition: "width 1s .3s cubic-bezier(.22,1,.36,1)",
                }}
              />
            </div>

            <p
              className="hero-role"
              style={{
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                margin: 0,
                marginBottom: "12px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,35px,0)",
                transition:
                  "opacity .8s .2s cubic-bezier(.22,1,.36,1), transform .8s .2s cubic-bezier(.22,1,.36,1)",
              }}
            >
              FULL STACK DEVELOPER
            </p>

            <p
              className="hero-tagline"
              style={{
                color: "rgba(255,255,255,0.62)",
                fontSize: "17px",
                fontWeight: 400,
                marginTop: "16px",
                marginBottom: "36px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,25px,0)",
                transition:
                  "opacity .8s .35s cubic-bezier(.22,1,.36,1), transform .8s .35s cubic-bezier(.22,1,.36,1)",
              }}
            >
              Building AI & Full Stack Applications
            </p>

            <div
              className="hero-cta-wrap"
              style={{
                opacity: buttonVisible ? 1 : 0,
                transform: buttonVisible ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
                transition:
                  "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <button
                className="hero-cta"
                onClick={() => {
                  playSafely(dingRef.current);
                  enter();
                  moveTo("about");
                }}
                style={{
                  pointerEvents: buttonVisible ? "auto" : "none",
                  padding: "16px 40px",
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.22)",
                  color: "white",
                  borderRadius: "999px",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: 600,
                  transition: "background .25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.08)";
                }}
              >
                Enter Stadium
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes spotlightPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes dustRise {
          0% { transform: translate3d(0,0,0); opacity: 0; }
          10% { opacity: .6; }
          90% { opacity: .3; }
          100% { transform: translate3d(0,-110vh,0); opacity: 0; }
        }

        /* ===================== RESPONSIVE ===================== */

        /* Tablet: pull the layout in from the fixed 120px edge padding */
        @media (max-width: 900px) {
          .hero-phase {
            padding-right: 60px !important;
            padding-left: 40px !important;
          }
          .hero-watermark {
            font-size: clamp(140px, 30vw, 260px) !important;
          }
        }

        /* Phones: stop right-anchoring the huge fixed-min type, hide the
           purely decorative watermark + vertical label, center everything */
        @media (max-width: 640px) {
          .announcement-text {
            padding: 0 24px !important;
          }

          .hero-phase {
            padding: 0 24px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .hero-watermark,
          .hero-vertical-label,
          .hero-glow {
            display: none !important;
          }
          .hero-text-block {
            text-align: center !important;
            max-width: 100% !important;
          }
          .hero-status-row {
            justify-content: center !important;
          }
          .hero-name {
            font-size: clamp(40px, 12vw, 64px) !important;
            letter-spacing: -1.5px !important;
          }
          .hero-role {
            font-size: 15px !important;
            letter-spacing: 2.5px !important;
          }
          .hero-tagline {
            font-size: 15px !important;
            margin-bottom: 28px !important;
          }
          .hero-cta-wrap {
            display: flex;
            justify-content: center;
          }
          .hero-cta {
            padding: 14px 32px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}