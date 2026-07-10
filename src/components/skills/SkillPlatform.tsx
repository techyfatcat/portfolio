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

    // Idle float (position only — never rotate the outer group,
    // so the card and text never spin out of view)
    group.current.position.y =
      position[1] + Math.sin(t * 1.4 + position[0]) * 0.05;

    // Hover: card lifts toward camera and tilts slightly
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

    // Glow pulse on the card material
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
      {/* Bento card */}
      <RoundedBox ref={card} args={[1.4, 1, 0.16]} radius={0.09} smoothness={4}>
        <meshStandardMaterial
          color="#14161b"
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>

      {/* Accent bar along the bottom edge, reads as the "brand color" tag */}
      <mesh position={[0, -0.42, 0.09]}>
        <boxGeometry args={[1.1, 0.06, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Skill name — Billboard keeps it camera-facing always */}
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