"use client";

export default function Scoreboard() {
  return (
    <group position={[0, 15, -58]}>

      <mesh>

        <boxGeometry args={[16, 8, 1]} />

        <meshStandardMaterial color="black" />

      </mesh>

    </group>
  );
}