"use client";

import { ReactNode, CSSProperties } from "react";

interface GlassPanelProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function GlassPanel({ children, style }: GlassPanelProps) {
  return (
    <div
      style={{
        width: 430,
        minHeight: 520,
        padding: 36,
        borderRadius: 24,
        background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.04))",
        border: "1px solid rgba(255,255,255,.12)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 0 60px rgba(0,0,0,.35), 0 0 24px rgba(77,163,255,.08)",
        color: "white",
        ...style,
      }}
    >
      {children}
    </div>
  );
}