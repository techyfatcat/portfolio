"use client";

export default function CardBack() {
  return (
    <div className="card-face card-back">
      <div className="card-back-content">

        <section className="about-section">
          <h3>ABOUT</h3>

          <div className="section-divider" />

          <p>
            I'm Aadit Sarhadi, a Computer Science student passionate
            about building scalable full-stack applications and
            AI-powered products. I enjoy solving challenging problems,
            creating polished user experiences, and constantly learning
            new technologies.
          </p>
        </section>

        <section className="about-section">
          <h3>EDUCATION</h3>

          <div className="section-divider" />

          <div className="info-row">
            <span>University</span>
            <span>Chitkara University</span>
          </div>

          <div className="info-row">
            <span>Degree</span>
            <span>B.E. Computer Science</span>
          </div>

          <div className="info-row">
            <span>Batch</span>
            <span>2024 — 2028</span>
          </div>
        </section>

        <section className="about-section">
          <h3>INTERESTS</h3>

          <div className="section-divider" />

          <div className="interest-grid">
            <span>⚽ Football</span>
            <span>🤖 AI</span>
            <span>💻 Full Stack</span>
            <span>☕ Java</span>
            <span>🧠 System Design</span>
            <span>🌍 Open Source</span>
          </div>
        </section>

        <div className="flip-hint">
          ⚽ Kick the ball to flip back
        </div>

      </div>
    </div>
  );
}