"use client";

import { Environment } from "@react-three/drei";
import { ASSETS } from "@/lib/assets";

export default function StadiumEnvironment() {
  return (
    <Environment
      files={ASSETS.hdri.night}
      background
    />
  );
}