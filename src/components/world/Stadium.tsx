"use client";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Stadium() {
  const { scene } = useGLTF("/models/stadium.glb");

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.geometry.computeVertexNormals();

      child.material = new THREE.MeshStandardMaterial({
        color: "#6c6c6c",
        roughness: 0.82,
        metalness: 0.08,
        envMapIntensity: 0.8,
      });
    }
  });

  return (
    <primitive
      object={scene}
      scale={[0.4, 0.28, 0.4]}
      position={[0, -3, 0]}
    />
  );
}

useGLTF.preload("/models/stadium.glb");