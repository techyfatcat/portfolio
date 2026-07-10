"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { PITCH_LENGTH, PITCH_WIDTH, TOUCHLINE_MARGIN } from "@components/lib/stadiumLayout";

export default function Pitch() {
  const { gl } = useThree();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 3072;
    canvas.height = 2048;

    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    const stripeCount = 14;
    const stripeWidth = W / stripeCount;
    for (let i = 0; i < stripeCount; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#2d7a32" : "#357f3b";
      ctx.fillRect(i * stripeWidth, 0, stripeWidth, H);
    }

    const scaleX = W / PITCH_LENGTH;
    const scaleY = H / PITCH_WIDTH;
    const pad = TOUCHLINE_MARGIN * scaleX; // now sourced from shared constant

    ctx.strokeStyle = "#f5f5f5";
    ctx.lineWidth = 0.12 * scaleX;
    ctx.lineCap = "square";

    const left = pad;
    const right = W - pad;
    const top = pad;
    const bottom = H - pad;
    const midX = W / 2;
    const midY = H / 2;

    ctx.strokeRect(left, top, right - left, bottom - top);

    ctx.beginPath();
    ctx.moveTo(midX, top);
    ctx.lineTo(midX, bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(midX, midY, 9.15 * scaleX, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(midX, midY, 0.3 * scaleX, 0, Math.PI * 2);
    ctx.fillStyle = "#f5f5f5";
    ctx.fill();

    const drawEnd = (x0: number, dir: 1 | -1) => {
      const penDepth = 16.5 * scaleX;
      const penWidth = 40.3 * scaleY;
      const goalDepth = 5.5 * scaleX;
      const goalWidth = 18.3 * scaleY;
      const penSpotDist = 11 * scaleX;

      ctx.strokeRect(x0, midY - penWidth / 2, dir * penDepth, penWidth);
      ctx.strokeRect(x0, midY - goalWidth / 2, dir * goalDepth, goalWidth);

      ctx.beginPath();
      ctx.arc(x0 + dir * penSpotDist, midY, 0.3 * scaleX, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        x0 + dir * penSpotDist,
        midY,
        9.15 * scaleX,
        dir === 1 ? -0.9 : Math.PI - 0.9,
        dir === 1 ? 0.9 : Math.PI + 0.9
      );
      ctx.stroke();
    };

    drawEnd(left, 1);
    drawEnd(right, -1);

    const cornerR = 1 * scaleX;
    [
      [left, top, 0, Math.PI / 2],
      [right, top, Math.PI / 2, Math.PI],
      [right, bottom, Math.PI, Math.PI * 1.5],
      [left, bottom, Math.PI * 1.5, Math.PI * 2],
    ].forEach(([x, y, a0, a1]) => {
      ctx.beginPath();
      ctx.arc(x, y, cornerR, a0, a1);
      ctx.stroke();
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;

    return tex;
  }, [gl]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[PITCH_LENGTH, PITCH_WIDTH, 1, 1]} />
      <meshStandardMaterial map={texture} roughness={0.85} metalness={0} />
    </mesh>
  );
}