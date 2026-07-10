"use client";

type Props = {
  position?: [number, number, number];
  steps?: number;
  width?: number;
};

export default function Stairs({
  position = [0, 0, -60],
  steps = 8,
  width = 8,
}: Props) {
  const stepHeight = 0.15;
  const stepDepth = 0.6;

  return (
    <group position={position}>
      {Array.from({ length: steps }).map((_, i) => {
        const y = i * stepHeight;
        const z = -i * stepDepth; // ascends toward the entrance (negative z)
        return (
          <group key={i}>
            {/* tread */}
            <mesh position={[0, y, z]} receiveShadow castShadow>
              <boxGeometry args={[width, stepHeight, stepDepth]} />
              <meshStandardMaterial color="#4a4e56" roughness={0.85} />
            </mesh>
            {/* riser face */}
            <mesh position={[0, y - stepHeight / 2 + 0.02, z + stepDepth / 2 - 0.02]}>
              <boxGeometry args={[width, stepHeight - 0.03, 0.04]} />
              <meshStandardMaterial color="#33363c" roughness={0.8} />
            </mesh>
            {/* nosing highlight strip, subtle wear-edge realism */}
            <mesh position={[0, y + stepHeight / 2 + 0.005, z + stepDepth / 2 - 0.03]}>
              <boxGeometry args={[width, 0.01, 0.06]} />
              <meshStandardMaterial color="#6a6e76" roughness={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* Stringer side walls, closes off the open sides of the staircase */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * (width / 2 + 0.08), (steps * stepHeight) / 2, -((steps - 1) * stepDepth) / 2]}
          castShadow
        >
          <boxGeometry
            args={[0.16, steps * stepHeight + 0.3, steps * stepDepth + stepDepth]}
          />
          <meshStandardMaterial color="#22252b" roughness={0.75} />
        </mesh>
      ))}

      {/* Handrails */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[
              side * (width / 2 + 0.05),
              steps * stepHeight * 0.5 + 0.55,
              -((steps - 1) * stepDepth) / 2,
            ]}
            rotation={[Math.atan2(steps * stepHeight, steps * stepDepth), 0, 0]}
          >
            <cylinderGeometry
              args={[0.035, 0.035, Math.hypot(steps * stepHeight, steps * stepDepth), 8]}
            />
            <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.35} />
          </mesh>
          {Array.from({ length: steps }).map((_, i) => (
            <mesh
              key={i}
              position={[side * (width / 2 + 0.05), i * stepHeight + 0.28, -i * stepDepth]}
            >
              <cylinderGeometry args={[0.02, 0.02, 0.55, 6]} />
              <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}