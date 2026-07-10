"use client";

export default function LowerStand(props: any) {
  return (
    <group {...props}>

      <mesh
        receiveShadow
        castShadow
        position={[0, 2, 0]}
      >
        <boxGeometry args={[70, 4, 12]} />
        <meshStandardMaterial color="#2b2b2b" />
      </mesh>

      <mesh
        receiveShadow
        castShadow
        position={[0, 5, -4]}
        rotation={[-0.5, 0, 0]}
      >
        <boxGeometry args={[70, 8, 2]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>

    </group>
  );
}