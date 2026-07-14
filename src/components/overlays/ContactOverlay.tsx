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
    label: "Download Resume",
    gate: "EXIT GATE 01",
    href: "https://res.cloudinary.com/eglidyow/image/upload/v1783916570/resume.pdf",
    icon: <FileText size={18} strokeWidth={1.75} />,
  },
  {
    label: "Explore GitHub",
    gate: "EXIT GATE 02",
    href: "https://github.com/techyfatcat",
    icon: <FaGithub size={18} />,
  },
  {
    label: "Connect on LinkedIn",
    gate: "EXIT GATE 03",
    href: "https://linkedin.com/in/theaaditsarhadi",
    icon: <FaLinkedin size={18} />,
  },
  {
    label: "View LeetCode",
    gate: "EXIT GATE 04",
    href: "https://leetcode.com/aaditsarhadi",
    icon: <Code2 size={18} strokeWidth={1.75} />,
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
        padding: "clamp(90px,14vh,120px) clamp(10px,3vw,24px) clamp(10px,2vh,24px)",
        pointerEvents: "none",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div
        className="contactPanel"
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
          className="contactHeader"
          style={{
            padding: "clamp(20px,3.5vh,32px) clamp(20px,4vw,36px) clamp(8px,1.5vh,14px)",
            textAlign: "center",
            flexShrink: 0,
          }}
        >

          <div
            style={{
              color: ACCENT,
              letterSpacing: 3,
              fontWeight: 700,
              fontSize: 11,
              marginBottom: "clamp(8px,1.5vh,14px)",
            }}
          >
            FULL TIME
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.4rem,3.4vw,2rem)",
              margin: 0,
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Thanks for visiting.
          </h1>

          <p
            className="contactDesc"
            style={{
              marginTop: "clamp(8px,1.5vh,14px)",
              color: "rgba(255,255,255,.55)",
              maxWidth: 520,
              marginInline: "auto",
              lineHeight: 1.55,
              fontSize: 13,
            }}
          >
            Whether you're a recruiter, developer or fellow football fan,
            I'd love to stay connected. The tunnel doors are always open.
          </p>

        </div>

        <div
          className="contactLinks"
          style={{
            padding: "clamp(10px,1.5vh,16px) clamp(20px,3.5vw,32px) clamp(4px,1vh,8px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px,1.4vh,12px)",
            overflowY: "auto",
            minHeight: 0,
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
                delay: .1 + i * .06,
                duration: .4,
              }}
              className="tunnelGate"
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(12px,2vh,16px) clamp(14px,2.5vw,20px)",
                borderRadius: 12,
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
                  width: 3,
                  background: ACCENT,
                  boxShadow: `0 0 14px ${ACCENT}`,
                }}
              />

              {/* Left */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(10px,2vw,16px)",
                  zIndex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  className="contactIconBox"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,.04)",
                    color: ACCENT,
                    flexShrink: 0,
                  }}
                >
                  {link.icon}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    className="contactGateLabel"
                    style={{
                      color: "rgba(255,255,255,.35)",
                      fontSize: 10,
                      letterSpacing: 1.5,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {link.gate}
                  </div>

                  <div
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "clamp(14px,2vw,16px)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                  flexShrink: 0,
                  marginLeft: 8,
                }}
              >
                <ArrowUpRight
                  size={20}
                  strokeWidth={2}
                />
              </motion.div>
            </motion.a>
          ))}

        </div>

        <div
          className="contactFooter"
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
            onClick={() => moveTo("hero")}
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
          transform:translateY(-3px);
          border-color:${ACCENT};
          background:rgba(143,185,150,.06);
          box-shadow:0 14px 32px rgba(0,0,0,.35);
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

        .contactLinks{
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,.15) transparent;
        }
        .contactLinks::-webkit-scrollbar{
          width: 4px;
        }
        .contactLinks::-webkit-scrollbar-thumb{
          background: rgba(255,255,255,.15);
          border-radius: 4px;
        }

        /* Small screens / narrow phones */
        @media (max-width: 480px){
          .contactGateLabel{
            display: none;
          }
          .contactIconBox{
            width: 36px !important;
            height: 36px !important;
          }
          .contactFooterNote{
            font-size: 10px !important;
          }
        }

        /* Short viewports (landscape phones, small laptops) */
        @media (max-height: 780px){
          .contactDesc{
            display: none;
          }
          .contactHeader{
            padding-top: clamp(14px,2.5vh,20px) !important;
            padding-bottom: 6px !important;
          }
          .contactFooter{
            padding-top: clamp(8px,1.5vh,14px) !important;
            padding-bottom: clamp(10px,2vh,16px) !important;
          }
        }

        @media (max-height: 560px){
          .contactGateLabel{
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}