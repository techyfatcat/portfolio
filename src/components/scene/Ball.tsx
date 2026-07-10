"use client";

import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface BallHandle {
  show: () => void;
  kick: () => void;
  reset: () => void;
}

interface BallProps {
  onClick?: () => void;
}

const Ball = forwardRef<BallHandle, BallProps>(
  ({ onClick }, ref) => {
    const { scene } = useGLTF("/models/football.glb");

    const group = useRef<THREE.Group>(null);

    const [hovered, setHovered] = useState(false);

    const targetScale = useRef(1);

    const targetPosition = useRef(
      new THREE.Vector3(0, 0, 0)
    );

    const hitRadius = useRef(0.55);

    const target = useMemo(
      () => new THREE.Vector3(),
      []
    );

    const kickProgress = useRef(0);
    const kicking = useRef(false);

    useLayoutEffect(() => {
      const box = new THREE.Box3().setFromObject(scene);

      const size = new THREE.Vector3();

      box.getSize(size);

      const maxDim = Math.max(
        size.x,
        size.y,
        size.z
      );

      const scale = 0.45 / maxDim;

      scene.scale.setScalar(scale);

      box.setFromObject(scene);

      const center = new THREE.Vector3();

      box.getCenter(center);

      scene.position.sub(center);

      hitRadius.current =
        (maxDim * scale) / 2 + 0.18;

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }, [scene]);

    const triggerKick = () => {
      if (kicking.current) return;

      kicking.current = true;
      kickProgress.current = 0;

      onClick?.();
    };

    useImperativeHandle(ref, () => ({
      show() {
        targetScale.current = 1.8;

        targetPosition.current.set(
          -2.1,
          0.35,
          0
        );
      },

      kick() {
        triggerKick();
      },

      reset() {
        targetScale.current = 1;

        targetPosition.current.set(
          0,
          0,
          0
        );

        kicking.current = false;
        kickProgress.current = 0;
      },
    }));

    useFrame((state, delta) => {
      if (!group.current) return;

      target.set(
        targetScale.current,
        targetScale.current,
        targetScale.current
      );

      group.current.scale.lerp(target, 0.1);

      group.current.position.lerp(
        targetPosition.current,
        0.1
      );

      const baseY = targetPosition.current.y;

      const float =
        Math.sin(
          state.clock.elapsedTime * 2.2
        ) * 0.03;

      group.current.position.y = baseY + float;

      group.current.rotation.y += 0.01;

      if (kicking.current) {
        kickProgress.current += delta * 3.2;

        const t = Math.min(
          kickProgress.current,
          1
        );

        const ease = Math.sin(t * Math.PI);

        group.current.position.z =
          ease * 0.55;

        group.current.position.y =
          baseY +
          float +
          ease * 0.08;

        group.current.rotation.x += 0.28;
        group.current.rotation.z += 0.18;

        group.current.scale.set(
          targetScale.current *
            (1 - ease * 0.08),
          targetScale.current *
            (1 + ease * 0.08),
          targetScale.current *
            (1 - ease * 0.08)
        );

        if (t >= 1) {
          kicking.current = false;

          group.current.position.z = 0;

          group.current.scale.setScalar(
            targetScale.current
          );
        }
      } else {
        group.current.position.z =
          THREE.MathUtils.lerp(
            group.current.position.z,
            0,
            0.18
          );
      }
    });

    return (
      <group ref={group}>
        <primitive object={scene} />

        <mesh
          onPointerDown={(e) => {
            e.stopPropagation();
            triggerKick();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();

            setHovered(true);

            document.body.style.cursor =
              "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);

            document.body.style.cursor =
              "default";
          }}
        >
          <sphereGeometry
            args={[
              hitRadius.current,
              24,
              24,
            ]}
          />

          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  }
);

Ball.displayName = "Ball";

export default Ball;

useGLTF.preload("/models/football.glb");