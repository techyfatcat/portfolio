"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import { useMemo } from "react";
import { ASSETS } from "@/lib/assets";

export default function GrassMaterial() {
  const color = useLoader(TextureLoader, ASSETS.textures.grass.color);
  const normal = useLoader(TextureLoader, ASSETS.textures.grass.normal);
  const roughness = useLoader(
    TextureLoader,
    ASSETS.textures.grass.roughness
  );
  const ao = useLoader(TextureLoader, ASSETS.textures.grass.ao);

  useMemo(() => {
    [color, normal, roughness, ao].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;

      // Increase for denser grass
      texture.repeat.set(25, 25);
    });
  }, [color, normal, roughness, ao]);

  return (
    <meshStandardMaterial
      map={color}
      normalMap={normal}
      roughnessMap={roughness}
      aoMap={ao}
      roughness={1}
      metalness={0}
    />
  );
}