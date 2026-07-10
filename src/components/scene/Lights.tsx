"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />

      <directionalLight
    position={[20,35,20]}
    intensity={1.5}
    castShadow
/>
    </>
  );
}