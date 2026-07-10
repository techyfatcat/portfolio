"use client";

import { Text } from "@react-three/drei";

const radius = 62;
const height = 6;

const labels = [
  "AADIT SARHADI",
  "FULL STACK ENGINEER",
  "OPEN TO WORK",
  "AI DEVELOPER",
];

export default function LEDRibbon() {
  return (
    <group>
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i / 48) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group
            key={i}
            position={[x, height, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            {/* LED Panel */}
            <mesh>
              <planeGeometry args={[6, 1.2]} />
              <meshStandardMaterial
                color="#0057ff"
                emissive="#0057ff"
                emissiveIntensity={2}
              />
            </mesh>

            {/* Text */}
            <Text
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.02]}
            >
              {labels[i % labels.length]}
            </Text>
          </group>
        );
      })}
    </group>
  );
}