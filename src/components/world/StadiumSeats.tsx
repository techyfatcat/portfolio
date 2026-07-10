"use client";

export default function StadiumSeats() {
  const rows = 7;
  const seatsPerRow = 90;

  const seatWidth = 0.35;
  const seatHeight = 0.22;
  const seatDepth = 0.35;

  const firstRadius = 7.2;
  const rowGap = 1.3;

  return (
    <group position={[0, -2.1, 0]}>
      {Array.from({ length: rows }).map((_, row) => {
        const radius = firstRadius + row * rowGap;
        const y = row * 0.42;

        return Array.from({ length: seatsPerRow }).map((_, i) => {
          const angle = (i / seatsPerRow) * Math.PI * 2;

          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <mesh
              key={`${row}-${i}`}
              position={[x, y, z]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry
                args={[
                  seatWidth,
                  seatHeight,
                  seatDepth,
                ]}
              />
              <meshStandardMaterial
                color="#0f172a"
                roughness={0.8}
              />
            </mesh>
          );
        });
      })}
    </group>
  );
}