"use client";

import { useEffect, useRef } from "react";

import Ball, { BallHandle } from "./Ball";
import FifaCard, { FifaCardHandle } from "./FifaCard";

import { useCameraStore } from "@/store/useCameraStore";

export default function AboutScene() {
  const entered = useCameraStore((s) => s.entered);
  const currentView = useCameraStore((s) => s.currentView);

  const ball = useRef<BallHandle>(null);
  const card = useRef<FifaCardHandle>(null);

  const visible = entered && currentView === "about";

  useEffect(() => {
    if (!visible) {
      ball.current?.reset();
      card.current?.reset();
      return;
    }

    const timer = setTimeout(() => {
      ball.current?.show();
      card.current?.show();
    }, 300);

    return () => clearTimeout(timer);
  }, [visible]);

  const handleKick = () => {
    ball.current?.kick();
    setTimeout(() => {
      card.current?.flip();
    }, 220);
  };

  return (
    <group visible={visible}>
      <Ball ref={ball} onClick={handleKick} />
      <FifaCard ref={card} />
    </group>
  );
}