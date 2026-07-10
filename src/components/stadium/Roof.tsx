"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  ROOF_INNER_HALF_X,
  ROOF_INNER_HALF_Z,
  ROOF_OUTER_HALF_X,
  ROOF_OUTER_HALF_Z,
  ROOF_CORNER_RADIUS,
  ROOF_HEIGHT,
} from "@components/lib/stadiumLayout";

type Props = {
  innerHalfX?: number;
  innerHalfZ?: number;
  outerHalfX?: number;
  outerHalfZ?: number;
  cornerRadius?: number;
  height?: number;
};

function roundedRectShape(halfX: number, halfZ: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = halfX;
  const z = halfZ;
  const r = Math.min(radius, halfX, halfZ);

  shape.moveTo(-x + r, -z);
  shape.lineTo(x - r, -z);
  shape.absarc(x - r, -z + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x, z - r);
  shape.absarc(x - r, z - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-x + r, z);
  shape.absarc(-x + r, z - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-x, -z + r);
  shape.absarc(-x + r, -z + r, r, Math.PI, Math.PI * 1.5, false);

  return shape;
}

export default function Roof({
  innerHalfX = ROOF_INNER_HALF_X,
  innerHalfZ = ROOF_INNER_HALF_Z,
  outerHalfX = ROOF_OUTER_HALF_X,
  outerHalfZ = ROOF_OUTER_HALF_Z,
  cornerRadius = ROOF_CORNER_RADIUS,
  height = ROOF_HEIGHT,
}: Props) {
  const geometry = useMemo(() => {
    const outer = roundedRectShape(outerHalfX, outerHalfZ, cornerRadius + 12);
    const inner = roundedRectShape(innerHalfX, innerHalfZ, cornerRadius);
    outer.holes.push(inner as unknown as THREE.Path);
    return new THREE.ShapeGeometry(outer, 12);
  }, [innerHalfX, innerHalfZ, outerHalfX, outerHalfZ, cornerRadius]);

  return (
    <mesh
      position={[0, height, 0]}
      geometry={geometry}
      rotation={[-Math.PI / 2 + 0.035, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#12151a"
        metalness={0.4}
        roughness={0.55}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}