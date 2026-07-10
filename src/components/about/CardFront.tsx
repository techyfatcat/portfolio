"use client";

import Image from "next/image";

export default function CardFront() {
  return (
    <div className="card-face card-front">

      {/* Background Glow */}
      <div className="card-bg" />

      {/* Rating */}
      <div className="card-rating">
        <span className="rating-number">99</span>
      </div>

      {/* Player Photo */}

      <div className="player-image-wrapper">
        <Image
          src="/images/aadit.png"
          alt="Aadit"
          fill
          priority
          className="player-image"
        />
      </div>

      {/* Bottom */}

      <div className="card-bottom">

        <h2 className="player-name">
          AADIT
        </h2>

        <div className="player-country">
          🇮🇳 INDIA
        </div>

      </div>

    </div>
  );
}