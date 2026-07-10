"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  ROOF_INNER_HALF_X,
  ROOF_INNER_HALF_Z,
  ROOF_CORNER_RADIUS,
  ROOF_HEIGHT,
} from "@components/lib/stadiumLayout";

type Props = {
  innerHalfX?: number;
  innerHalfZ?: number;
  cornerRadius?: number;
  roofHeight?: number;
  spacing?: number;
};

function perimeterPoints(halfX: number, halfZ: number, radius: number, spacing: number) {
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

  const perimeterLen = shape
    .getPoints(200)
    .reduce((acc, p, i, arr) => (i === 0 ? 0 : acc + p.distanceTo(arr[i - 1])), 0);

  const count = Math.max(6, Math.round(perimeterLen / spacing));
  return shape.getSpacedPoints(count);
}

export default function RoofSupports({
  innerHalfX = ROOF_INNER_HALF_X,
  innerHalfZ = ROOF_INNER_HALF_Z,
  cornerRadius = ROOF_CORNER_RADIUS,
  roofHeight = ROOF_HEIGHT,
  spacing = 24,
}: Props) {
  const geometry = useMemo(() => {
    const pts = perimeterPoints(innerHalfX, innerHalfZ, cornerRadius, spacing);
    const geometries: THREE.BufferGeometry[] = [];

    pts.forEach((p) => {
      const angle = Math.atan2(p.y, p.x);
      const geo = new THREE.CylinderGeometry(0.28, 0.35, roofHeight, 6);
      const m = new THREE.Matrix4()
        .makeRotationFromEuler(new THREE.Euler(0, -angle, 0.14))
        .setPosition(p.x, roofHeight / 2, p.y);
      geo.applyMatrix4(m);
      geometries.push(geo);
    });

    return mergeGeometries(geometries, false);
  }, [innerHalfX, innerHalfZ, cornerRadius, roofHeight, spacing]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color="#6b7280" metalness={0.75} roughness={0.35} />
    </mesh>
  );
}