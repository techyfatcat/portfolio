"use client";

import { ContactShadows } from "@react-three/drei";

import FootballField from "../scene/FootballField";
import Stadium from "./Stadium";
import StadiumSeats from "./StadiumSeats";
import Tunnel from "./Tunnel";

export default function StadiumScene() {
  return (
    <group>
      {/* Football Field */}
      <FootballField position={[0, -2.9, 0]} />

      {/* Stadium */}
      <Stadium />

      {/* Generated Seats */}
      <StadiumSeats />

      {/* Player Tunnel */}
      <Tunnel />

      {/* Ground Shadow */}
      <ContactShadows
        position={[0, -2.95, 0]}
        opacity={0.45}
        blur={2.5}
        scale={120}
      />
    </group>
  );
}