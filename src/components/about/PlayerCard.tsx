"use client";

import {
  forwardRef,
  useEffect,
  useRef,
} from "react";

import "./PlayerCard.css";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

interface Props {
  flipped?: boolean;
}

const PlayerCard = forwardRef<HTMLDivElement, Props>(
  ({ flipped = false }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);

    function setRefs(node: HTMLDivElement | null) {
      cardRef.current = node;

      if (!ref) return;

      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    }

    useEffect(() => {
      const card = cardRef.current;

      if (!card) return;

      const handleMove = (e: MouseEvent) => {
        if (flipped) return;

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = -(y - 0.5) * 12;

        card.style.setProperty("--rotateX", `${rotateX}deg`);
        card.style.setProperty("--rotateY", `${rotateY}deg`);
      };

      const reset = () => {
        card.style.setProperty("--rotateX", "0deg");
        card.style.setProperty("--rotateY", "0deg");
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", reset);

      return () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", reset);
      };
    }, [flipped]);

    return (
      <div className="player-card-scene">
        <div
          ref={setRefs}
          className={`player-card ${
            flipped ? "flipped" : ""
          }`}
        >
          <CardFront />

          <CardBack />
        </div>
      </div>
    );
  }
);

PlayerCard.displayName = "PlayerCard";

export default PlayerCard;