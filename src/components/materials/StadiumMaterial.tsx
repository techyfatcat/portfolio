"use client";

import * as THREE from "three";

export default function StadiumMaterial() {
  return (
    <meshStandardMaterial
      color="#777777"
      roughness={0.92}
      metalness={0.05}
      envMapIntensity={0.3}
    />
  );
}