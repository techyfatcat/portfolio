"use client";

export default function Tunnel() {
  return (
    <group position={[0, -3, 0]}>

      {/* Floor */}
      <mesh receiveShadow position={[0, 0, -8]}>
        <boxGeometry args={[4, 0.2, 18]} />
        <meshStandardMaterial
          color="#202020"
roughness={0.8}
metalness={0.1}
        />
      </mesh>

      {/* Left Wall */}
      <mesh castShadow receiveShadow position={[-2, 2, -8]}>
        <boxGeometry args={[0.2, 4, 18]} />
        <meshStandardMaterial
          color="#202020"
roughness={0.8}
metalness={0.1}
        />
      </mesh>

      {/* Right Wall */}
      <mesh castShadow receiveShadow position={[2, 2, -8]}>
        <boxGeometry args={[0.2, 4, 18]} />
        <meshStandardMaterial
          color="#202020"
roughness={0.8}
metalness={0.1}
        />
      </mesh>

      {/* Ceiling */}
      <mesh castShadow receiveShadow position={[0, 4, -8]}>
        <boxGeometry args={[4, 0.2, 18]} />
        <meshStandardMaterial
          color="#202020"
roughness={0.8}
metalness={0.1}
        />
      </mesh>
<pointLight
  position={[0, 2.5, -3]}
  intensity={20}
  distance={12}
  color="#ffffff"
/>

<pointLight
  position={[0, 2.5, -10]}
  intensity={20}
  distance={12}
  color="#ffffff"
/>
    </group>
  );
}