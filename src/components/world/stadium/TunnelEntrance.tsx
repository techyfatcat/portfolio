"use client";

export default function TunnelEntrance() {
  return (
    <group position={[0, 0, 52]}>

      <mesh position={[0, 2, 0]}>

        <boxGeometry args={[8, 4, 10]} />

        <meshStandardMaterial color="#1a1a1a" />

      </mesh>

    </group>
  );
}