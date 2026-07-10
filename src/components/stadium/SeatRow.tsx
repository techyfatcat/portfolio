"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number]; // matches the tier's mesh position
  length: number;
  seatSpacing?: number;
  colorPalette?: string[];
};

export default function SeatRow({
  position,
  length,
  seatSpacing = 0.55,
  colorPalette = ["#dc2626", "#1e293b", "#1e293b", "#1e293b", "#1e293b"],
}: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = useMemo(() => Math.max(1, Math.floor(length / seatSpacing)), [length, seatSpacing]);

  useMemo(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = -length / 2 + i * seatSpacing + seatSpacing / 2;
      dummy.position.set(x, position[1] + 0.55, position[2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(
        i,
        new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)])
      );
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count, length, position, seatSpacing]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
      <boxGeometry args={[0.5, 0.5, 0.45]} />
      <meshStandardMaterial roughness={0.7} />
    </instancedMesh>
  );
}