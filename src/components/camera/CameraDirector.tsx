"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { cameraViews } from "@/data/cameraViews";
import { useCameraStore } from "@/store/useCameraStore";
import { useUIStore } from "@/store/useUIStore";
import { useCardStore } from "@/store/useCardStore";

function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
) {
  return THREE.MathUtils.lerp(
    current,
    target,
    1 - Math.exp(-lambda * dt)
  );
}

export default function CameraDirector() {
  const { camera } = useThree();

  const entered = useCameraStore((s) => s.entered);
  const currentView = useCameraStore((s) => s.currentView);

  const setSection = useUIStore((s) => s.setSection);

  const look = useMemo(() => new THREE.Vector3(), []);

  const arrived = useRef(false);

  useFrame((_, delta) => {
    if (!entered) return;

    const dt = Math.min(delta, 1 / 60);

    const view = cameraViews[currentView];

    // -----------------------------
    // Camera Movement
    // -----------------------------

    camera.position.x = damp(
      camera.position.x,
      view.position.x,
      2.6,
      dt
    );

    camera.position.y = damp(
      camera.position.y,
      view.position.y,
      2.6,
      dt
    );

    camera.position.z = damp(
      camera.position.z,
      view.position.z,
      2.6,
      dt
    );

    // -----------------------------
    // Camera Look Target
    // -----------------------------

    look.x = damp(
      look.x,
      view.target.x,
      4,
      dt
    );

    look.y = damp(
      look.y,
      view.target.y,
      4,
      dt
    );

    look.z = damp(
      look.z,
      view.target.z,
      4,
      dt
    );

    camera.lookAt(look);

    // -----------------------------
    // Detect arrival
    // -----------------------------

    const distance = camera.position.distanceTo(
      view.position
    );

    if (distance < 0.15 && !arrived.current) {
      arrived.current = true;

      setSection(currentView);

      if (currentView === "about") {
        useCardStore.getState().setVisible(true);
      }
    }

    if (distance > 0.4) {
      arrived.current = false;

      if (currentView !== "about") {
        useCardStore.getState().reset();
      }
    }
  });

  return null;
}