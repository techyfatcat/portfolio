"use client";

export default function Seat({
  position = [0, 0, 0],
  color = "#1d4ed8",
}: {
  position?: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <boxGeometry args={[0.48, 0.08, 0.48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
        />
      </mesh>

      {/* Backrest */}
      <mesh castShadow receiveShadow position={[0, 0.38, -0.18]}>
        <boxGeometry args={[0.48, 0.42, 0.08]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}