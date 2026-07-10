"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useIntroStore } from "@/store/useIntroStore";
import { useCameraStore } from "@/store/useCameraStore";

const INTRO_DURATION = 0.7;

function easeInOutCubic(x: number) {
  return x < 0.5
    ? 4 * x * x * x
    : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

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

export default function SceneManager() {
  const { camera } = useThree();

  const setIntroFinished = useIntroStore(
    (state) => state.setIntroFinished
  );

  const loadingFinished = useIntroStore(
    (state) => state.loadingFinished
  );

  const entered = useCameraStore((state) => state.entered);

  const elapsed = useRef(0);
  const introFinished = useRef(false);

  // Camera path
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-18, 24, 62),
          new THREE.Vector3(-8, 18, 42),
          new THREE.Vector3(4, 12, 26),
          new THREE.Vector3(12, 8, 18),
        ],
        false,
        "centripetal",
        0.65
      ),
    []
  );

  const lookTarget = useMemo(
    () => new THREE.Vector3(0, 1.2, 0),
    []
  );

  const currentLook = useMemo(
    () => new THREE.Vector3(0, 1.2, 0),
    []
  );

  const targetPosition = useMemo(
    () => new THREE.Vector3(),
    []
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 60);

    // Intro already completed
    if (introFinished.current) {
      return;
    }

    // Wait until loading screen has completely disappeared
    if (!loadingFinished) return;

    elapsed.current += dt;

    const raw = Math.min(
      elapsed.current / INTRO_DURATION,
      1
    );

    const progress = easeInOutCubic(raw);

    // Camera movement
    curve.getPointAt(progress, targetPosition);
    camera.position.copy(targetPosition);

    // Smooth lookAt
    currentLook.x = damp(
      currentLook.x,
      lookTarget.x,
      10,
      dt
    );

    currentLook.y = damp(
      currentLook.y,
      lookTarget.y,
      10,
      dt
    );

    currentLook.z = damp(
      currentLook.z,
      lookTarget.z,
      10,
      dt
    );

    camera.lookAt(currentLook);

    // Finish intro
    if (raw >= 1) {
      introFinished.current = true;
      setIntroFinished(true);
    }
  });

  return null;
}