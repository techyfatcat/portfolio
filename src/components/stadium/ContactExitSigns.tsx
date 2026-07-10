"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FiFileText, FiCode } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  FileText,
  Code2,
  ArrowUpRight,
} from "lucide-react";

type ExitLink = {
  label: string;
  gate: string;
  href: string;
  icon: ReactNode;
};

const LINKS: ExitLink[] = [
  {
    label: "RÉSUMÉ",
    gate: "GATE 01",
    href: "/resume.pdf",
    icon: <FileText size={26} strokeWidth={1.75} />,
  },
  {
    label: "GITHUB",
    gate: "GATE 02",
    href: "https://github.com/techyfatcat", // <-- update if needed
    icon: <FaGithub size={26} strokeWidth={1.75} />,
  },
  {
    label: "LINKEDIN",
    gate: "GATE 03",
    href: "https://linkedin.com/in/yourname", // <-- update
    icon: <FaLinkedin size={26} strokeWidth={1.75} />,
  },
  {
    label: "LEETCODE",
    gate: "GATE 04",
    href: "https://leetcode.com/u/aaditsarhadi/", // <-- update if needed
    icon: <Code2 size={26} strokeWidth={1.75} />,
  },
];

export default function ContactExitSigns() {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 120);
      timeout = setTimeout(cycle, 4000 + Math.random() * 5000);
    };

    timeout = setTimeout(cycle, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="exit-tunnel">
      <div className="conduit" aria-hidden="true" />

      <div className={`header-sign ${flicker ? "flicker" : ""}`}>
        <span className="header-eyebrow">
          FULL TIME · THANK YOU FOR STAYING TILL THE FINAL WHISTLE
        </span>

        <h2 className="header-title">THANKS FOR COMING</h2>

        <p className="header-sub">
          Mind the step on your way out — let's stay in touch.
        </p>
      </div>

      <div className="sign-row">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sign-panel"
          >
            <span className="drop-cable" aria-hidden="true" />
            <span className="gate-tag">{link.gate}</span>
            <span className="pictogram">{link.icon}</span>
            <span className="sign-label">{link.label}</span>

            <span className="sign-arrow">
              <ArrowUpRight size={18} strokeWidth={2} />
            </span>
          </a>
        ))}
      </div>

      <style jsx>{`
        .exit-tunnel {
          position: relative;
          width: 100%;
          padding: 6rem 1.5rem 5rem;
          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(0, 166, 81, 0.06),
              transparent 60%
            ),
            linear-gradient(
              180deg,
              #0a0b0d 0%,
              #16181c 55%,
              #0a0b0d 100%
            );
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }

        .conduit {
          position: absolute;
          top: 3.2rem;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(
            90deg,
            #1a1e26,
            #2a2f38 50%,
            #1a1e26
          );
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.03),
            0 3px 8px rgba(0, 0, 0, 0.5);
        }

        .header-sign {
          position: relative;
          z-index: 1;
          background: #0d1712;
          border: 2px solid #00a651;
          border-radius: 4px;
          padding: 1.75rem 2.5rem;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(0, 166, 81, 0.15),
            0 0 32px rgba(0, 166, 81, 0.25),
            inset 0 0 24px rgba(0, 166, 81, 0.08);
          margin-bottom: 4.5rem;
          max-width: 640px;
        }

        .header-sign.flicker {
          opacity: 0.35;
          box-shadow: none;
        }

        .header-eyebrow {
          display: block;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5a9e78;
          margin-bottom: 0.75rem;
        }

        .header-title {
          font-family: "Oswald", "Arial Narrow", sans-serif;
          font-weight: 600;
          font-size: clamp(2rem, 5vw, 3.25rem);
          letter-spacing: 0.03em;
          color: #eef3f4;
          text-shadow: 0 0 18px rgba(0, 166, 81, 0.5);
          margin: 0 0 0.6rem;
        }

        .header-sub {
          font-family: system-ui, sans-serif;
          font-size: 0.9rem;
          color: #9aa4b2;
          margin: 0;
        }

        .sign-row {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.25rem;
          max-width: 1000px;
        }

        .sign-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          width: 168px;
          padding: 1.75rem 1rem 1.4rem;
          background: #0d1712;
          border: 1.5px solid #1f4a34;
          border-radius: 4px;
          text-decoration: none;
          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
          box-shadow: inset 0 0 16px rgba(0, 166, 81, 0.05);
        }

        .drop-cable {
          position: absolute;
          top: -2.6rem;
          left: 50%;
          width: 2px;
          height: 2.6rem;
          background: #2a2f38;
          transform: translateX(-50%);
        }

        .gate-tag {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: #4d5561;
        }

        .pictogram {
          color: #3ddc84;
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .sign-label {
          font-family: "Oswald", "Arial Narrow", sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          color: #eef3f4;
        }

        .sign-arrow {
          position: absolute;
          right: 0.7rem;
          bottom: 0.7rem;
          color: #4d5561;
          transition:
            transform 0.25s ease,
            color 0.25s ease;
        }

        .sign-panel:hover {
          border-color: #ffb020;
          box-shadow:
            0 0 0 1px rgba(255, 176, 32, 0.2),
            0 0 26px rgba(255, 176, 32, 0.2),
            inset 0 0 16px rgba(255, 176, 32, 0.08);
          transform: translateY(-2px);
        }

        .sign-panel:hover .pictogram {
          color: #ffb020;
          transform: scale(1.06);
        }

        .sign-panel:hover .sign-arrow {
          color: #ffb020;
          transform: translate(3px, -3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .header-sign.flicker {
            opacity: 1;
          }

          .sign-panel,
          .pictogram,
          .sign-arrow {
            transition: none;
          }
        }

        @media (max-width: 480px) {
          .sign-row {
            gap: 1.25rem;
          }

          .sign-panel {
            width: 130px;
            padding: 1.4rem 0.75rem 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}