import gsap from "gsap";
import * as THREE from "three";

import type { BallHandle } from "@/components/scene/Ball";

interface AboutTimelineProps {
  ball: React.RefObject<BallHandle | null>;
  card: React.RefObject<HTMLDivElement | null>;
}

export function playAboutTimeline({
  ball,
  card,
}: AboutTimelineProps) {
  if (!ball.current?.group) return;
  if (!card.current) return;

  const ballGroup = ball.current.group;
  const cardElement = card.current;

  gsap.killTweensOf(ballGroup.position);
  gsap.killTweensOf(ballGroup.scale);
  gsap.killTweensOf(cardElement);

  gsap.set(cardElement, {
    opacity: 0,
    y: 80,
    scale: 0.8,
  });

  const tl = gsap.timeline();

  tl.to(ballGroup.scale, {
    x: 1.4,
    y: 1.4,
    z: 1.4,
    duration: 0.45,
    ease: "power2.out",
  })

    .to(
      ballGroup.position,
      {
        z: -0.25,
        duration: 0.35,
        ease: "power2.out",
      },
      "<"
    )

    .to(
      cardElement,
      {
        opacity: 1,
        y: 0,
        scale: 1.05,
        duration: 0.55,
        ease: "back.out(1.7)",
      },
      "-=0.1"
    )

    .to(cardElement, {
      scale: 1,
      duration: 0.2,
    })

    .to(ballGroup.position, {
      x: 1.8,
      y: -0.65,
      duration: 0.7,
      ease: "power3.inOut",
    })

    .to(ballGroup.scale, {
      x: 0.9,
      y: 0.9,
      z: 0.9,
      duration: 0.7,
      ease: "power3.inOut",
    }, "<");

  return tl;
}