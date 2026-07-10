"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const PANEL_HEIGHT = 1.1;
const PANEL_SEGMENT_LENGTH = 6.5; // real LED board panels are modular, ~6m units
const PANEL_GAP = 0.04;
const BEZEL = 0.04;

function makeLedTexture(
  gl: THREE.WebGLRenderer,
  sponsors: string[],
  pxPerMeter = 40
) {
  const width = 1536;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Base panel — near black, not pure black, matches real LED "off" state
  ctx.fillStyle = "#050506";
  ctx.fillRect(0, 0, width, height);

  const segW = width / sponsors.length;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  sponsors.forEach((text, i) => {
    const cx = segW * i + segW / 2;
    ctx.font = "700 120px Arial";
    ctx.fillStyle = "#eef6ff";
    ctx.fillText(text, cx, height / 2);

    // thin divider between sponsor segments
    if (i > 0) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(segW * i - 2, 0, 4, height);
    }
  });

  // LED pixel grid overlay — subtle dark grid lines so lit areas
  // read as individual diodes, not a flat printed sign
  const cellSize = 6;
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "#000000";
  for (let x = 0; x < width; x += cellSize) {
    ctx.fillRect(x, 0, 1, height);
  }
  for (let y = 0; y < height; y += cellSize) {
    ctx.fillRect(0, y, width, 1);
  }
  ctx.globalCompositeOperation = "source-over";

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = gl.capabilities.getMaxAnisotropy();
  tex.wrapS = THREE.ClampToEdgeWrapping;
  return tex;
}

function LedPanel({
  position,
  rotation,
  length,
  sponsors,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  sponsors: string[];
}) {
  const { gl } = useThree();

  // split the run into modular panels with visible seams
  const panels = useMemo(() => {
    const count = Math.max(1, Math.round(length / PANEL_SEGMENT_LENGTH));
    const segLen = length / count;
    return Array.from({ length: count }, (_, i) => ({
      x: -length / 2 + segLen * i + segLen / 2,
      len: segLen - PANEL_GAP,
    }));
  }, [length]);

  const texture = useMemo(
    () => makeLedTexture(gl, sponsors),
    [gl, sponsors]
  );

  return (
    <group position={position} rotation={rotation}>
      {panels.map((p, i) => (
        <group key={i} position={[p.x, 0, 0]}>
          {/* dark bezel frame behind the LED face, gives depth/thickness */}
          <mesh receiveShadow castShadow>
            <boxGeometry args={[p.len + BEZEL * 2, PANEL_HEIGHT + BEZEL * 2, 0.2]} />
            <meshStandardMaterial color="#0a0a0b" roughness={0.6} metalness={0.2} />
          </mesh>

          {/* LED face — emissive only where texture is lit, not flat glow */}
          {/* LED face — emissive only where texture is lit, not flat glow */}
          <mesh position={[0, 0, 0.105]}>
            <planeGeometry args={[p.len, PANEL_HEIGHT]} />
            <meshStandardMaterial
              map={texture}
              emissiveMap={texture}
              emissive="#ffffff"
              emissiveIntensity={1.4}
              toneMapped={false}
              roughness={0.4}
              metalness={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          

          {/* mounting legs — small detail that sells "installed structure" */}
          <mesh position={[-p.len / 2 + 0.15, -PANEL_HEIGHT / 2 - 0.18, 0]} castShadow>
            <boxGeometry args={[0.06, 0.36, 0.06]} />
            <meshStandardMaterial color="#1a1a1c" roughness={0.7} />
          </mesh>
          <mesh position={[p.len / 2 - 0.15, -PANEL_HEIGHT / 2 - 0.18, 0]} castShadow>
            <boxGeometry args={[0.06, 0.36, 0.06]} />
            <meshStandardMaterial color="#1a1a1c" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function AdvertisingBoards({
  sponsors = ["AADIT FC", "STADIUM", "MATCHDAY", "PORTFOLIO"],
}: {
  sponsors?: string[];
}) {
  return (
    <>
      <LedPanel position={[0, 0.6, 35]} rotation={[0, 0, 0]} length={106} sponsors={sponsors} />
      <LedPanel position={[0, 0.6, -35]} rotation={[0, Math.PI, 0]} length={106} sponsors={sponsors} />
      <LedPanel position={[54, 0.6, 0]} rotation={[0, Math.PI / 2, 0]} length={68} sponsors={sponsors} />
      <LedPanel position={[-54, 0.6, 0]} rotation={[0, -Math.PI / 2, 0]} length={68} sponsors={sponsors} />
    </>
  );
}