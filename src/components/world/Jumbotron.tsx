"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useProjectModalStore } from "@/store/useProjectModalStore";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type Project = {
  name: string;
  tagline: string;
  tech: string[];
  status?: string;
  link: string;
  image?: string; 
};

type Vec3 = [number, number, number];

type Props = {
  position?: Vec3;
  rotation?: Vec3;
  width?: number;
  height?: number;
  projects: Project[];
  cycleSeconds?: number;
  onSelectProject?: (project: Project) => void;
  tabletPosition?: Vec3;
  mobilePosition?: Vec3;
  tabletScale?: number; 
  mobileScale?: number; 
};

const SCREEN_BG = "#050608";
const WHITE = "#eef3f8";
const DIM = "#5a6270";

const imageCache = new Map<string, HTMLImageElement>();

function loadImage(src: string, onLoaded: () => void): HTMLImageElement | null {
  const cached = imageCache.get(src);
  if (cached) {
    if (cached.complete) return cached;
    cached.addEventListener("load", onLoaded, { once: true });
    return null;
  }

  const img = new Image();

  img.src = src;
  imageCache.set(src, img);
  img.addEventListener("load", onLoaded, { once: true });
  img.addEventListener("error", () => {
    console.warn(`Jumbotron: failed to load preview image "${src}"`);
  });
  return null;
}

function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number
) {
  const imgRatio = img.width / img.height;
  const boxRatio = boxW / boxH;

  let drawW = boxW;
  let drawH = boxH;

  if (imgRatio > boxRatio) {
    drawH = boxW / imgRatio;
  } else {
    drawW = boxH * imgRatio;
  }

  const dx = boxX + (boxW - drawW) / 2;
  const dy = boxY + (boxH - drawH) / 2;

  ctx.drawImage(img, dx, dy, drawW, drawH);
}

function drawScoreboard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  project: Project,
  previewImg: HTMLImageElement | null,
  isMobile: boolean
) {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = SCREEN_BG;
  ctx.fillRect(0, 0, w, h);

  const pad = w * 0.045;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const nameSize = isMobile ? 0.115 : 0.1;
  const taglineSize = isMobile ? 0.058 : 0.05;

  ctx.font = `800 ${h * nameSize}px Arial`;
  ctx.fillStyle = WHITE;
  ctx.fillText(project.name, w / 2, h * 0.14);

  ctx.font = `500 ${h * taglineSize}px Arial`;
  ctx.fillStyle = "#9aa4b2";
  ctx.fillText(project.tagline, w / 2, h * 0.24);

  ctx.strokeStyle = "#1a1e26";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, h * 0.3);
  ctx.lineTo(w - pad, h * 0.3);
  ctx.stroke();


  if (previewImg) {
    const imageTop = h * 0.34;
    const imageBottom = h * 0.84;
    drawImageContain(
      ctx,
      previewImg,
      pad,
      imageTop,
      w - pad * 2,
      imageBottom - imageTop
    );
  }

  ctx.strokeStyle = "#1a1e26";
  ctx.beginPath();
  ctx.moveTo(pad, h * 0.88);
  ctx.lineTo(w - pad, h * 0.88);
  ctx.stroke();

  ctx.font = `600 ${h * (isMobile ? 0.05 : 0.042)}px Arial`;

  ctx.textAlign = "left";
  ctx.fillStyle = DIM;
  ctx.fillText("← Previous", pad, h * 0.94);

  ctx.textAlign = "center";
  ctx.fillStyle = "#9aa4b2";
  ctx.fillText("TAP TO VIEW", w / 2, h * 0.94);

  ctx.textAlign = "right";
  ctx.fillStyle = DIM;
  ctx.fillText("Next →", w - pad, h * 0.94);

  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "#000000";
  const cell = Math.max(3, Math.floor(w / 300));
  for (let x = 0; x < w; x += cell) ctx.fillRect(x, 0, 1, h);
  for (let y = 0; y < h; y += cell) ctx.fillRect(0, y, w, 1);
  ctx.globalCompositeOperation = "source-over";
}

export default function Jumbotron({
  position = [0, 26, -47],
  rotation = [-0.22, Math.PI, 0],
  width = 24,
  height = 13.5,
  projects,
  cycleSeconds = 6,
  onSelectProject,
  tabletPosition,
  mobilePosition,
  tabletScale = 0.82,
  mobileScale = 0.6,
}: Props) {
  const { gl } = useThree();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";

  const openProject = useProjectModalStore((s) => s.open);

  const scale = isMobile ? mobileScale : isTablet ? tabletScale : 1;
  const effectiveWidth = width * scale;
  const effectiveHeight = height * scale;

  const effectivePosition: Vec3 = isMobile
    ? mobilePosition ?? position
    : isTablet
    ? tabletPosition ?? position
    : position;

  const canvasRes = isMobile
    ? { w: 1024, h: 576 }
    : isTablet
    ? { w: 1280, h: 720 }
    : { w: 1600, h: 900 };

  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = canvasRes.w;
    c.height = canvasRes.h;
    return c;
  }, [canvasRes.w, canvasRes.h]);

  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [canvas, gl]);

  const redraw = () => {
    const ctx = canvas.getContext("2d");
    const project = projects[index];
    if (!ctx || !project) return;

    let previewImg: HTMLImageElement | null = null;
    if (project.image) {
      previewImg = loadImage(project.image, redraw);
      if (previewImg && !previewImg.complete) previewImg = null;
    }

    drawScoreboard(ctx, canvas.width, canvas.height, project, previewImg, isMobile);
    texture.needsUpdate = true;
  };

  useEffect(() => {
    redraw();
  }, [index, canvas, isMobile]);

  useEffect(() => {
    if (projects.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, cycleSeconds * 1000);
    return () => clearInterval(id);
  }, [projects.length, cycleSeconds]);

  const project = projects[index];


  if (isMobile) return null;


  const leftZone = isTablet ? 0.35 : 0.3;
  const rightZone = isTablet ? 0.65 : 0.7;
  const navRowTop = isTablet ? 0.82 : 0.88;

  return (
    <group position={effectivePosition}>
      <group rotation={rotation}>
        <mesh position={[0, 0, -0.4]} castShadow>
          <boxGeometry args={[effectiveWidth + 1, effectiveHeight + 1, 0.6]} />
          <meshStandardMaterial color="#15181d" roughness={0.7} metalness={0.2} />
        </mesh>

        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[effectiveWidth + 0.3, effectiveHeight + 0.3, 0.3]} />
          <meshStandardMaterial color="#0a0b0e" roughness={0.6} metalness={0.15} />
        </mesh>

        <mesh
          position={[0, 0, 0.16]}
          onClick={(e) => {
            e.stopPropagation();
            if (!project) return;

            const u = e.uv?.x ?? 0.5;
            const v = e.uv ? 1 - e.uv.y : 0.5;

            if (v > navRowTop) {
              if (u < leftZone) {
                setIndex((i) => (i - 1 + projects.length) % projects.length);
                return;
              }
              if (u > rightZone) {
                setIndex((i) => (i + 1) % projects.length);
                return;
              }
            }

            onSelectProject ? onSelectProject(project) : openProject(project);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <planeGeometry args={[effectiveWidth, effectiveHeight]} />
          <meshStandardMaterial
            map={texture}
            emissiveMap={texture}
            emissive="#ffffff"
            emissiveIntensity={hovered ? 1.8 : 1.4}
            toneMapped={false}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[
              side * (effectiveWidth / 2 - 1.5 * scale),
              -effectiveHeight / 2 - 2.5 * scale,
              -0.65,
            ]}
            castShadow
          >
            <boxGeometry args={[0.5 * scale, 5 * scale, 0.5 * scale]} />
            <meshStandardMaterial color="#15181d" roughness={0.7} metalness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}