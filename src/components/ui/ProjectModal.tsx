"use client";

import { useProjectModalStore } from "@/store/useProjectModalStore";

export default function ProjectModal() {
  const project = useProjectModalStore((s) => s.activeProject);
  const close = useProjectModalStore((s) => s.close);

  if (!project) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(3,4,5,.72)",
        backdropFilter: "blur(6px)",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 88vw)",
          background: "#0a0c10",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 16,
          padding: "40px",
          color: "white",
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: 3,
            color: "#c1f612",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {project.status ?? "Project"}
        </p>

        <h2
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: 36,
            fontWeight: 400,
            margin: 0,
            marginBottom: 16,
          }}
        >
          {project.name}
        </h2>

        <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.6, marginBottom: 24 }}>
          {project.description ?? project.tagline}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,.06)",
                color: "rgba(255,255,255,.7)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

      <div style={{ display: "flex", gap: 12 }}>
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "12px 24px",
      borderRadius: 999,
      background: "white",
      color: "black",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: 14,
    }}
  >
    View project →
  </a>

  <button
    onClick={close}
    style={{
      padding: "12px 24px",
      borderRadius: 999,
      background: "transparent",
      border: "1px solid rgba(255,255,255,.2)",
      color: "white",
      cursor: "pointer",
      fontSize: 14,
    }}
  >
    Close
  </button>
</div>
      </div>
      </div>
  );
}