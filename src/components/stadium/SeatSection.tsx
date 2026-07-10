"use client";

import SeatRow from "./SeatRow";

export default function SeatSection({
  rows = 12,
  rowSeats = 40,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  rows?: number;
  rowSeats?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: rows }).map((_, i) => (
        <SeatRow
          key={i}
          count={rowSeats}
          position={[
            0,
            i * 0.35,
            -i * 0.65,
          ]}
        />
      ))}
    </group>
  );
}