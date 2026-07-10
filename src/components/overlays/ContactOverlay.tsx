"use client";

import { motion } from "framer-motion";
import { useCameraStore } from "@/store/useCameraStore";
import { FileText, Code2, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type { ReactNode } from "react";

type ExitLink = {
  label: string;
  gate: string;
  href: string;
  icon: ReactNode;
};

const LINKS: ExitLink[] = [
  {
    label: "Download Résumé",
    gate: "EXIT GATE 01",
    href: "/resume.pdf",
    icon: <FileText size={22} strokeWidth={1.75} />,
  },
  {
    label: "Explore GitHub",
    gate: "EXIT GATE 02",
    href: "https://github.com/techyfatcat",
    icon: <FaGithub size={22} />,
  },
  {
    label: "Connect on LinkedIn",
    gate: "EXIT GATE 03",
    href: "https://linkedin.com/in/theaaditsarhadi",
    icon: <FaLinkedin size={22} />,
  },
  {
    label: "View LeetCode",
    gate: "EXIT GATE 04",
    href: "https://leetcode.com/aaditsarhadi",
    icon: <Code2 size={22} strokeWidth={1.75} />,
  },
];

const ACCENT = "#8FB996";
const BG = "#080A08";
const PANEL_RADIUS = 18;

export default function ContactOverlay() {
  const currentView = useCameraStore((s) => s.currentView);
  const moveTo = useCameraStore((s) => s.moveTo);

  if (currentView !== "contact") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .45 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "clamp(90px,10vh,130px)",
        paddingBottom: 40,
        pointerEvents: "none",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div
        style={{
          width: "94%",
          maxWidth: 920,
          borderRadius: PANEL_RADIUS,
          overflow: "hidden",
          position: "relative",
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
            padding: "50px 40px 20px",
            textAlign: "center",
          }}
        >

          <div
            style={{
              color: ACCENT,
              letterSpacing: 4,
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 18,
            }}
          >
            FULL TIME
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem,4vw,3rem)",
              margin: 0,
              fontWeight: 800,
            }}
          >
            Thanks for visiting.
          </h1>

          <p
            style={{
              marginTop: 18,
              color: "rgba(255,255,255,.55)",
              maxWidth: 560,
              marginInline: "auto",
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            Whether you're a recruiter, developer or fellow football fan,
            I'd love to stay connected. The tunnel doors are always open.
          </p>

         

        </div>

        <div
          style={{
            padding: "20px 36px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: .15 + i * .08,
                duration: .45,
              }}
              className="tunnelGate"
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "22px 28px",
                borderRadius: 14,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.02)",
            }}              
            >
              {/* Left glowing strip */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: ACCENT,
                  boxShadow: `0 0 18px ${ACCENT}`,
                }}
              />

              {/* Left */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,.04)",
                    color: ACCENT,
                  }}
                >
                  {link.icon}
                </div>

                <div>
                  <div
                    style={{
                      color: "rgba(255,255,255,.35)",
                      fontSize: 11,
                      letterSpacing: 2,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {link.gate}
                  </div>

                  <div
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {link.label}
                  </div>
                </div>
              </div>

              {/* Right Arrow */}

              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: .2 }}
                style={{
                  color: "rgba(255,255,255,.5)",
                }}
              >
                <ArrowUpRight
                  size={26}
                  strokeWidth={2}
                />
              </motion.div>
            </motion.a>
          ))}

        </div>

        <div
          style={{
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,.35)",
              fontSize: 13,
              letterSpacing: 1,
            }}
          >
            See you at the next match.
          </span>

          <button
            onClick={() => moveTo("hero")}
            style={{
              padding: "14px 30px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.03)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: ".25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.background =
                "rgba(143,185,150,.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,.12)";
              e.currentTarget.style.background =
                "rgba(255,255,255,.03)";
            }}
          >
            ← Return to Kickoff
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

        .tunnelGate:hover{
          transform:translateY(-4px);
          border-color:${ACCENT};
          background:rgba(143,185,150,.06);
          box-shadow:0 18px 40px rgba(0,0,0,.35);
        }

        .tunnelGate:hover svg{
          color:${ACCENT};
        }

        .tunnelGate::after{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.05),
            transparent
          );
          transform:translateX(-100%);
          transition:transform .7s ease;
        }

        .tunnelGate:hover::after{
          transform:translateX(100%);
        }
      `}</style>
    </motion.div>
  );
}