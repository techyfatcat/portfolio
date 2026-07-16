import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Aadit Sarhadi | Full Stack Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #050505 0%, #111111 55%, #1a1a1a 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Orange Glow Top Right */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            right: -150,
            top: -150,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.22)",
          }}
        />

        {/* Orange Glow Bottom Left */}
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            left: -120,
            bottom: -120,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.12)",
          }}
        />

        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Orange Border */}
        <div
          style={{
            position: "absolute",
            inset: 22,
            border: "2px solid rgba(249,115,22,.35)",
            borderRadius: 28,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "90px",
            width: "100%",
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: "#f97316",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            PORTFOLIO
          </div>

          <div
            style={{
              color: "white",
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.05,
            }}
          >
            Aadit
          </div>

          <div
            style={{
              color: "white",
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.05,
            }}
          >
            Sarhadi
          </div>

          <div
            style={{
              marginTop: 22,
              color: "#f97316",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Full Stack Developer
          </div>

          <div
            style={{
              marginTop: 12,
              color: "#d4d4d4",
              fontSize: 26,
              maxWidth: 720,
            }}
          >
            Building modern web applications, developer tools and AI-powered
            software with React, Next.js, Node.js & Java.
          </div>

          {/* Tech Pills */}
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 40,
            }}
          >
            {["React", "Next.js", "Node.js", "Java"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 24px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "white",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              position: "absolute",
              left: 90,
              right: 90,
              bottom: 70,
              color: "#b3b3b3",
              fontSize: 22,
            }}
          >
            <div>github.com/techyfatcat</div>

            <div
              style={{
                color: "#f97316",
                fontWeight: 700,
              }}
            >
              aaditsarhadi.in
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}