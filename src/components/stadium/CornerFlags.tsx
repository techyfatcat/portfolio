"use client";

function Flag({ position }: any) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[0.18, 1.4, 0]}>
        <planeGeometry args={[0.35, 0.25]} />
        <meshStandardMaterial
          color="#ff3030"
          side={2}
        />
      </mesh>
    </group>
  );
}

export default function CornerFlags() {
  return (
    <>
      <Flag position={[52.5, 0, 34]} />
      <Flag position={[-52.5, 0, 34]} />
      <Flag position={[52.5, 0, -34]} />
      <Flag position={[-52.5, 0, -34]} />
    </>
  );
}