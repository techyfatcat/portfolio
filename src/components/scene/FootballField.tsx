import * as THREE from "three";
import { useMemo } from "react";
import GrassMaterial from "../materials/GrassMaterial";

type Props = {
  position?: [number, number, number];
};

// FIFA standard senior pitch (meters)
const PITCH_LENGTH = 105;
const PITCH_WIDTH = 68;
const LINE_WIDTH = 0.12;
const LINE_HEIGHT = 0.015; // slight thickness so it catches light like real paint
const LINE_Y = 0.011;
const LINE_COLOR = "#e9e6da"; // chalky off-white, not pure white

const PENALTY_AREA_DEPTH = 16.5;
const PENALTY_AREA_WIDTH = 40.32;
const SIX_YARD_DEPTH = 5.5;
const SIX_YARD_WIDTH = 18.32;
const PENALTY_SPOT_DIST = 11;
const CENTER_CIRCLE_R = 9.15;
const CORNER_ARC_R = 1;

function useLineMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: LINE_COLOR,
        roughness: 0.85,
        metalness: 0,
      }),
    []
  );
}

function Stripe({
  length,
  x,
  z,
  rotationY = 0,
  material,
}: {
  length: number;
  x: number;
  z: number;
  rotationY?: number;
  material: THREE.Material;
}) {
  return (
    <mesh
      position={[x, LINE_Y, z]}
      rotation={[-Math.PI / 2, 0, rotationY]}
      receiveShadow
      castShadow
    >
      <planeGeometry args={[length, LINE_WIDTH]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Arc({
  radius,
  x,
  z,
  thetaStart = 0,
  thetaLength = Math.PI * 2,
  material,
}: {
  radius: number;
  x: number;
  z: number;
  thetaStart?: number;
  thetaLength?: number;
  material: THREE.Material;
}) {
  const geo = useMemo(
    () =>
      new THREE.RingGeometry(
        radius - LINE_WIDTH / 2,
        radius + LINE_WIDTH / 2,
        64,
        1,
        thetaStart,
        thetaLength
      ),
    [radius, thetaStart, thetaLength]
  );

  return (
    <mesh
      position={[x, LINE_Y, z]}
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={geo}
      receiveShadow
      castShadow
    >
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Spot({ x, z, material }: { x: number; z: number; material: THREE.Material }) {
  return (
    <mesh position={[x, LINE_Y, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <circleGeometry args={[0.11, 16]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function FootballField({ position = [0, 0, 0] }: Props) {
  const lineMat = useLineMaterial();

  const halfL = PITCH_LENGTH / 2;
  const halfW = PITCH_WIDTH / 2;

  return (
    <group position={position}>
      {/* Grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 200, 200]} />
        <GrassMaterial />
      </mesh>

      {/* Perimeter (touchlines + goal lines) */}
      <Stripe length={PITCH_LENGTH} x={0} z={-halfW} material={lineMat} />
      <Stripe length={PITCH_LENGTH} x={0} z={halfW} material={lineMat} />
      <Stripe length={PITCH_WIDTH} x={-halfL} z={0} rotationY={Math.PI / 2} material={lineMat} />
      <Stripe length={PITCH_WIDTH} x={halfL} z={0} rotationY={Math.PI / 2} material={lineMat} />

      {/* Halfway line */}
      <Stripe length={PITCH_WIDTH} x={0} z={0} rotationY={Math.PI / 2} material={lineMat} />

      {/* Center circle + spot */}
      <Arc radius={CENTER_CIRCLE_R} x={0} z={0} material={lineMat} />
      <Spot x={0} z={0} material={lineMat} />

      {/* Penalty areas (both ends) */}
      {[-1, 1].map((side) => {
        const goalLineX = side * halfL;
        const dir = -side; // boxes extend inward from goal line

        return (
          <group key={side}>
            {/* Penalty box */}
            <Stripe
              length={PENALTY_AREA_WIDTH}
              x={goalLineX + dir * PENALTY_AREA_DEPTH}
              z={0}
              rotationY={Math.PI / 2}
              material={lineMat}
            />
            <Stripe
              length={PENALTY_AREA_DEPTH}
              x={goalLineX + (dir * PENALTY_AREA_DEPTH) / 2}
              z={-PENALTY_AREA_WIDTH / 2}
              material={lineMat}
            />
            <Stripe
              length={PENALTY_AREA_DEPTH}
              x={goalLineX + (dir * PENALTY_AREA_DEPTH) / 2}
              z={PENALTY_AREA_WIDTH / 2}
              material={lineMat}
            />

            {/* Six-yard box */}
            <Stripe
              length={SIX_YARD_WIDTH}
              x={goalLineX + dir * SIX_YARD_DEPTH}
              z={0}
              rotationY={Math.PI / 2}
              material={lineMat}
            />
            <Stripe
              length={SIX_YARD_DEPTH}
              x={goalLineX + (dir * SIX_YARD_DEPTH) / 2}
              z={-SIX_YARD_WIDTH / 2}
              material={lineMat}
            />
            <Stripe
              length={SIX_YARD_DEPTH}
              x={goalLineX + (dir * SIX_YARD_DEPTH) / 2}
              z={SIX_YARD_WIDTH / 2}
              material={lineMat}
            />

            {/* Penalty spot */}
            <Spot x={goalLineX + dir * PENALTY_SPOT_DIST} z={0} material={lineMat} />

            {/* Penalty arc — only the portion outside the box */}
            <Arc
              radius={CENTER_CIRCLE_R}
              x={goalLineX + dir * PENALTY_SPOT_DIST}
              z={0}
              thetaStart={
                side === 1 ? Math.PI / 2 + 0.9 : -Math.PI / 2 + 0.9
              }
              thetaLength={Math.PI - 1.8}
              material={lineMat}
            />

            {/* Corner arcs */}
            {[-1, 1].map((corner) => (
              <Arc
                key={corner}
                radius={CORNER_ARC_R}
                x={goalLineX}
                z={corner * halfW}
                thetaStart={0}
                thetaLength={Math.PI / 2}
                material={lineMat}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}