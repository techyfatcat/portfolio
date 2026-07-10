"use client";

import { OrbitControls } from "@react-three/drei";

export default function Orbit() {
  return (
    <OrbitControls
      makeDefault
      maxPolarAngle={Math.PI / 2.2}
      minDistance={5}
      maxDistance={30}
    />
  );
}