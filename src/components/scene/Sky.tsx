"use client";

import { Sky } from "@react-three/drei";

export default function SceneSky() {
  return (
    <Sky
      distance={450000}
      turbidity={8}
      rayleigh={0.4}
      mieCoefficient={0.005}
      mieDirectionalG={0.8}
      sunPosition={[-1, -0.5, -1]}
    />
  );
}