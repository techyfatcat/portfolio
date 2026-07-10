"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function IntroCamera() {
  const { camera } = useThree();

  const progress = useRef(0);

  useFrame((_, delta) => {
    progress.current += delta * 0.12;

    const t = Math.min(progress.current, 1);

    const start = new THREE.Vector3(0, 2.5, -26);
    const end = new THREE.Vector3(0, 6, 32);

    camera.position.lerpVectors(start, end, t);

    camera.lookAt(0, 0, 0);
  });

  return null;
}