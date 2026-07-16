"use client";

import { Billboard, RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface SkillPlatformProps {
  name: string;
  color: string;
  position: [number, number, number];
}

export default function SkillPlatform({
  name,
  color,
  position,
}: SkillPlatformProps) {
  const group = useRef<THREE.Group>(null);
  const card = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!group.current || !card.current) return;

    const t = state.clock.elapsedTime;

    group.current.position.y =
      position[1] + Math.sin(t * 1.4 + position[0]) * 0.05;

    const targetZ = hovered ? position[2] + 0.4 : position[2];
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.12
    );

    const targetRotX = hovered ? -state.pointer.y * 0.2 : 0;
    const targetRotY = hovered ? state.pointer.x * 0.2 : 0;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      0.1
    );

    const targetScale = hovered ? 1.08 : 1;
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.15)
    );

    const mat = card.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      hovered ? 1.4 : 0.5,
      0.12
    );
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox ref={card} args={[1.4, 1, 0.16]} radius={0.09} smoothness={4}>
        <meshStandardMaterial
          color="#14161b"
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>

      <mesh position={[0, -0.42, 0.09]}>
        <boxGeometry args={[1.1, 0.06, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      <Billboard position={[0, 0.05, 0.1]}>
        <Text
          fontSize={0.19}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          textAlign="center"
          outlineWidth={0.008}
          outlineColor="black"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}