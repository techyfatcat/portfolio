"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function PostEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.35}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  );
}