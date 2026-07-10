"use client";

import { useMemo } from "react";
import * as THREE from "three";

type GoalProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
};

const POST_RADIUS = 0.06;
const GOAL_WIDTH = 7.32;
const GOAL_HEIGHT = 2.44;
const GOAL_DEPTH = 2.2;

function makeNetTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 1.4;

  const step = 16;
  for (let i = -size; i < size * 2; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - size, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1.5);
  return tex;
}

function Post({
  position,
  rotation,
  length,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  length: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[POST_RADIUS, POST_RADIUS, length, 16]} />
      <meshStandardMaterial color="#f4f6f8" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function Joint({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[POST_RADIUS * 1.05, 12, 12]} />
      <meshStandardMaterial color="#f4f6f8" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function NetPanel({
  position,
  rotation,
  args,
  texture,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number];
  texture: THREE.Texture;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={args} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        side={THREE.DoubleSide}
        roughness={0.9}
        color="#ffffff"
      />
    </mesh>
  );
}

export default function Goal({ position, rotation = [0, 0, 0] }: GoalProps) {
  const netTexture = useMemo(() => makeNetTexture(), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <Post position={[-GOAL_WIDTH / 2, GOAL_HEIGHT / 2, 0]} length={GOAL_HEIGHT} />
      <Post position={[GOAL_WIDTH / 2, GOAL_HEIGHT / 2, 0]} length={GOAL_HEIGHT} />
      <Post
        position={[0, GOAL_HEIGHT, 0]}
        rotation={[0, 0, Math.PI / 2]}
        length={GOAL_WIDTH}
      />

      {/* Back supports */}
      <Post position={[-GOAL_WIDTH / 2, GOAL_HEIGHT / 2, -GOAL_DEPTH]} length={GOAL_HEIGHT} />
      <Post position={[GOAL_WIDTH / 2, GOAL_HEIGHT / 2, -GOAL_DEPTH]} length={GOAL_HEIGHT} />
      <Post
        position={[0, GOAL_HEIGHT, -GOAL_DEPTH]}
        rotation={[0, 0, Math.PI / 2]}
        length={GOAL_WIDTH}
      />
      <Post
        position={[-GOAL_WIDTH / 2, GOAL_HEIGHT, -GOAL_DEPTH / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        length={GOAL_DEPTH}
      />
      <Post
        position={[GOAL_WIDTH / 2, GOAL_HEIGHT, -GOAL_DEPTH / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        length={GOAL_DEPTH}
      />

      {/* Joints to hide seams at the corners */}
      <Joint position={[-GOAL_WIDTH / 2, GOAL_HEIGHT, 0]} />
      <Joint position={[GOAL_WIDTH / 2, GOAL_HEIGHT, 0]} />
      <Joint position={[-GOAL_WIDTH / 2, GOAL_HEIGHT, -GOAL_DEPTH]} />
      <Joint position={[GOAL_WIDTH / 2, GOAL_HEIGHT, -GOAL_DEPTH]} />

      {/* Net — back panel */}
      <NetPanel
        position={[0, GOAL_HEIGHT / 2, -GOAL_DEPTH]}
        args={[GOAL_WIDTH, GOAL_HEIGHT]}
        texture={netTexture}
      />

      {/* Net — side panels */}
      {[-1, 1].map((side) => (
        <NetPanel
          key={side}
          position={[side * GOAL_WIDTH / 2, GOAL_HEIGHT / 2, -GOAL_DEPTH / 2]}
          rotation={[0, side * -Math.PI / 2, 0]}
          args={[GOAL_DEPTH, GOAL_HEIGHT]}
          texture={netTexture}
        />
      ))}

      {/* Net — top panel */}
      <NetPanel
        position={[0, GOAL_HEIGHT - 0.02, -GOAL_DEPTH / 2]}
        rotation={[-Math.PI / 2 + 0.35, 0, 0]}
        args={[GOAL_WIDTH, GOAL_DEPTH * 1.05]}
        texture={netTexture}
      />
    </group>
  );
}