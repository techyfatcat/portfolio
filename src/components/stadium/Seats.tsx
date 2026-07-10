"use client";

import SeatRow from "./SeatRow";

const LENGTH = 105;
const WIDTH = 68;
const CLEARANCE = 12;
const TIERS = 10;
const TIER_HEIGHT = 1.1;
const TIER_DEPTH = 1.5;

function StandSeats({
  basePosition,
  rotationY,
  length,
}: {
  basePosition: [number, number, number];
  rotationY: number;
  length: number;
}) {
  // Rotate each tier's local offset into world space to match Stand.tsx's group rotation
  const cos = Math.cos(rotationY);
  const sin = Math.sin(rotationY);

  return (
    <>
      {Array.from({ length: TIERS }).map((_, i) => {
        const localY = i * TIER_HEIGHT;
        const localZ = -i * TIER_DEPTH;
        // rotate (0, localZ) around Y by rotationY
        const worldX = basePosition[0] + sin * localZ;
        const worldZ = basePosition[2] + cos * localZ;
        return (
          <SeatRow
            key={i}
            position={[worldX, basePosition[1] + localY, worldZ]}
            length={length}
          />
        );
      })}
    </>
  );
}

export default function Seats() {
  const offsetZ = 35 + CLEARANCE;
  const offsetX = 54 + CLEARANCE;

  return (
    <group>
      <StandSeats basePosition={[0, 0, offsetZ]} rotationY={0} length={LENGTH + 30} />
      <StandSeats basePosition={[0, 0, -offsetZ]} rotationY={Math.PI} length={LENGTH + 30} />
      <StandSeats basePosition={[offsetX, 0, 0]} rotationY={-Math.PI / 2} length={WIDTH + 30} />
      <StandSeats basePosition={[-offsetX, 0, 0]} rotationY={Math.PI / 2} length={WIDTH + 30} />
    </group>
  );
}