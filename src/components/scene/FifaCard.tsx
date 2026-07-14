"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import {
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import { useIsMobileRef } from "@/hooks/useIsMobile";

export interface FifaCardHandle {
  show: () => void;
  flip: () => void;
  reset: () => void;
}

const WIDTH = 2.6;
const HEIGHT = 3.6;

const FRONT_DURATION = 3000;
const BACK_DURATION = 5000;

const FifaCard = forwardRef<FifaCardHandle>((_, ref) => {
  const { camera } = useThree();

  // Root always faces camera
  const root = useRef<THREE.Group>(null);

  // Pivot only flips
  const pivot = useRef<THREE.Group>(null);

  const targetScale = useRef(0);

  const flipped = useRef(false);

  const targetRotation = useRef(0);

  const isMobileRef = useIsMobileRef();

  const autoFlipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const front = useLoader(
    THREE.TextureLoader,
    "/cards/front.png"
  );

  const back = useLoader(
    THREE.TextureLoader,
    "/cards/back.png"
  );

  front.colorSpace = THREE.SRGBColorSpace;
  back.colorSpace = THREE.SRGBColorSpace;

  const clearAutoFlip = () => {
    if (autoFlipTimer.current) {
      clearTimeout(autoFlipTimer.current);
      autoFlipTimer.current = null;
    }
  };

  const doFlip = () => {
    flipped.current = !flipped.current;

    targetRotation.current = flipped.current ? Math.PI : 0;
  };

  const scheduleAutoFlip = () => {
    clearAutoFlip();

    const duration = flipped.current ? BACK_DURATION : FRONT_DURATION;

    autoFlipTimer.current = setTimeout(() => {
      doFlip();
      scheduleAutoFlip();
    }, duration);
  };

  useImperativeHandle(ref, () => ({
    show() {
      targetScale.current = 1;

      if (isMobileRef.current) {
        flipped.current = false;
        targetRotation.current = 0;

        scheduleAutoFlip();
      }
    },

    flip() {
      // Manual flip stays available on desktop / on click.
      // On mobile, a manual flip resets the auto-loop timing
      // so it doesn't fight the next scheduled flip.
      clearAutoFlip();

      doFlip();

      if (isMobileRef.current) {
        scheduleAutoFlip();
      }
    },

    reset() {
      clearAutoFlip();

      targetScale.current = 0;

      targetRotation.current = 0;

      flipped.current = false;

      if (root.current)
        root.current.scale.setScalar(0);

      if (pivot.current)
        pivot.current.rotation.set(0, 0, 0);
    },
  }));

  useEffect(() => {
    return () => clearAutoFlip();
  }, []);

  useFrame(() => {
    if (!root.current || !pivot.current) return;

    // Card always faces camera
    root.current.lookAt(camera.position);

    const s = THREE.MathUtils.lerp(
      root.current.scale.x,
      targetScale.current,
      0.1
    );

    root.current.scale.setScalar(s);

    pivot.current.rotation.y =
      THREE.MathUtils.lerp(
        pivot.current.rotation.y,
        targetRotation.current,
        0.12
      );
  });

  return (
    <group
      ref={root}
      position={[0, 2.2, -0.2]}
      scale={0}
    >
      <group ref={pivot}>
        {/* FRONT */}

        <mesh position={[0, 0, 0.002]}>
          <planeGeometry
            args={[WIDTH, HEIGHT]}
          />

          <meshStandardMaterial
            map={front}
            transparent
            roughness={0.35}
            metalness={0.05}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* BACK */}

        <mesh
          rotation-y={Math.PI}
          position={[0, 0, -0.002]}
        >
          <planeGeometry
            args={[WIDTH, HEIGHT]}
          />

          <meshStandardMaterial
            map={back}
            transparent
            roughness={0.35}
            metalness={0.05}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
    </group>
  );
});

FifaCard.displayName = "FifaCard";

export default FifaCard;