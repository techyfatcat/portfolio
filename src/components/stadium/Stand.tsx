"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { STAND_TIERS, STAND_TIER_HEIGHT, STAND_TIER_DEPTH} from "@components/lib/stadiumLayout";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
};

const TIERS = STAND_TIERS;
const TIER_HEIGHT = STAND_TIER_HEIGHT;
const TIER_DEPTH = STAND_TIER_DEPTH;

const COLOR_A = new THREE.Color("#232838");
const COLOR_B = new THREE.Color("#1a1e2b");

function buildStandGeometry(length: number) {
  const geometries: THREE.BufferGeometry[] = [];

  for (let i = 0; i < TIERS; i++) {
    const geo = new THREE.BoxGeometry(length, TIER_HEIGHT, TIER_DEPTH);
    geo.translate(0, i * TIER_HEIGHT, -i * TIER_DEPTH);

    // bake alternating tier color as vertex colors, so no extra material/texture needed
    const color = i % 2 === 0 ? COLOR_A : COLOR_B;
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    for (let v = 0; v < count; v++) {
      colors[v * 3] = color.r;
      colors[v * 3 + 1] = color.g;
      colors[v * 3 + 2] = color.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    geometries.push(geo);
  }

  return mergeGeometries(geometries, false);
}

function makeSeatRowTexture() {
  const w = 512;
  const h = 64;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#1e2230";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  for (let x = 4; x < w; x += 10) {
    ctx.fillRect(x, 8, 5, h - 16);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

export default function Stand({ position, rotation, length }: Props) {
  const geometry = useMemo(() => buildStandGeometry(length), [length]);
  const seatTexture = useMemo(() => makeSeatRowTexture(), []);

  // repeat the seat-row texture to roughly match seat spacing across the length
  const repeatX = useMemo(() => Math.max(1, Math.round(length / 1.4)), [length]);

  return (
    <group position={position} rotation={rotation}>
      {/* Single merged mesh, one draw call for the whole stepped stand */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial vertexColors roughness={0.9} />
      </mesh>

      {/* One cheap textured plane along the front face for a seat-row hint,
          no geometry cost, just a repeating texture */}
      <mesh position={[0, TIER_HEIGHT / 2, TIER_DEPTH / 2 - 0.02]} receiveShadow>
        <planeGeometry args={[length, TIER_HEIGHT]} />
        <meshStandardMaterial
          map={(() => {
            seatTexture.repeat.set(repeatX, 1);
            return seatTexture;
          })()}
          roughness={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}