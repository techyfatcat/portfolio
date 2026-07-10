"use client";

export default function FloodLights() {
  return (
    <>
      <pointLight
        position={[-30, 25, 30]}
        intensity={450}
        distance={120}
      />

      <pointLight
        position={[30, 25, 30]}
        intensity={450}
        distance={120}
      />

      <pointLight
        position={[-30, 25, -30]}
        intensity={450}
        distance={120}
      />

      <pointLight
        position={[30, 25, -30]}
        intensity={450}
        distance={120}
      />
    </>
  );
}