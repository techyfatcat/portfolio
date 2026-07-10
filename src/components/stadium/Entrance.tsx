"use client";

import { useMemo } from "react";
import * as THREE from "three";

type Props = {
  position?: [number, number, number];
  label?: string;
};

const GLASS_COLOR = "#8fd3ff";

function makeSignageTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0a0b0e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "700 64px Arial";
  ctx.fillStyle = "#eef3f8";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "18px";
  ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function Entrance({
  position = [0, 0, -68],
  label = "STADIUM",
}: Props) {
  const signage = useMemo(() => makeSignageTexture(label), [label]);

  const podiumHeight = 1.2;
  const buildingHeight = 9;
  const buildingWidth = 20;
  const buildingDepth = 9;

  // vertical mullion columns across the glass front
  const mullionCount = 11;
  const mullionSpacing = (buildingWidth - 2) / (mullionCount - 1);

  return (
    <group position={position}>
      {/* Podium / concourse plinth */}
      <mesh position={[0, podiumHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[buildingWidth + 4, podiumHeight, buildingDepth + 6]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.85} />
      </mesh>
      {/* podium edge accent strip */}
      <mesh position={[0, podiumHeight + 0.02, buildingDepth / 2 + 3]}>
        <boxGeometry args={[buildingWidth + 3.6, 0.05, 0.15]} />
        <meshStandardMaterial
          color="#c1f612"
          emissive="#c1f612"
          emissiveIntensity={0.5}
        />
      </mesh>

      <group position={[0, podiumHeight, 0]}>
        {/* Main building mass */}
        <mesh position={[0, buildingHeight / 2, -1]} castShadow receiveShadow>
          <boxGeometry args={[buildingWidth, buildingHeight, buildingDepth]} />
          <meshStandardMaterial color="#181a20" metalness={0.3} roughness={0.75} />
        </mesh>

        {/* Curtain wall glass, recessed into the front face */}
        <mesh position={[0, buildingHeight / 2 + 0.5, buildingDepth / 2 - 0.94]}>
          <planeGeometry args={[buildingWidth - 2, buildingHeight - 2]} />
          <meshPhysicalMaterial
            color={GLASS_COLOR}
            transparent
            opacity={0.22}
            roughness={0.05}
            transmission={0.85}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Mullion grid — vertical */}
        {Array.from({ length: mullionCount }).map((_, i) => (
          <mesh
            key={`v-${i}`}
            position={[
              -buildingWidth / 2 + 1 + i * mullionSpacing,
              buildingHeight / 2 + 0.5,
              buildingDepth / 2 - 0.9,
            ]}
          >
            <boxGeometry args={[0.06, buildingHeight - 2, 0.06]} />
            <meshStandardMaterial color="#0c0d10" roughness={0.6} metalness={0.4} />
          </mesh>
        ))}
        {/* Mullion grid — horizontal bands */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <mesh
            key={`h-${i}`}
            position={[0, 1.5 + t * (buildingHeight - 2), buildingDepth / 2 - 0.9]}
          >
            <boxGeometry args={[buildingWidth - 2, 0.05, 0.06]} />
            <meshStandardMaterial color="#0c0d10" roughness={0.6} metalness={0.4} />
          </mesh>
        ))}

        {/* Entrance doors, dark recessed frame at ground level */}
        <mesh position={[0, 1.4, buildingDepth / 2 - 0.8]}>
          <boxGeometry args={[5.5, 2.8, 0.15]} />
          <meshStandardMaterial color="#05060a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.4, buildingDepth / 2 - 0.72]}>
          <planeGeometry args={[5.2, 2.5]} />
          <meshPhysicalMaterial
            color={GLASS_COLOR}
            transparent
            opacity={0.3}
            transmission={0.7}
            roughness={0.05}
          />
        </mesh>

        {/* Signage band */}
        <mesh position={[0, buildingHeight + 0.55, 0]}>
          <boxGeometry args={[buildingWidth * 0.85, 1.1, 0.15]} />
          <meshStandardMaterial
            map={signage}
            emissiveMap={signage}
            emissive="#ffffff"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>

        {/* Canopy overhang */}
        <mesh position={[0, buildingHeight - 0.3, buildingDepth / 2 + 1.8]} castShadow>
          <boxGeometry args={[buildingWidth - 3, 0.35, 3.6]} />
          <meshStandardMaterial color="#0d0e12" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* canopy support rods */}
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[side * (buildingWidth / 2 - 3), buildingHeight - 1.8, buildingDepth / 2 + 0.3]}
            rotation={[0.5, 0, 0]}
          >
            <cylinderGeometry args={[0.04, 0.04, 3.2, 8]} />
            <meshStandardMaterial color="#3a3f47" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Corner pylons with vertical accent light */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * (buildingWidth / 2 + 0.6), 0, buildingDepth / 2]}>
            <mesh position={[0, buildingHeight / 2, 0]} castShadow>
              <boxGeometry args={[0.6, buildingHeight, 0.6]} />
              <meshStandardMaterial color="#202329" roughness={0.7} />
            </mesh>
            <mesh position={[0, buildingHeight / 2, 0.32]}>
              <boxGeometry args={[0.08, buildingHeight - 0.6, 0.02]} />
              <meshStandardMaterial
                color="#c1f612"
                emissive="#c1f612"
                emissiveIntensity={0.6}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* Ground uplights along the base */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[-buildingWidth / 2 + 2 + i * ((buildingWidth - 4) / 5), 0.02, buildingDepth / 2 - 0.3]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.12, 16]} />
            <meshStandardMaterial
              color="#ffe9b0"
              emissive="#ffe9b0"
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}