"use client";

import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useIntroStore } from "@/store/useIntroStore";

export default function AssetGate() {
  const { active, progress } = useProgress();
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    useIntroStore.getState().setLoadProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (active || progress !== 100) return;

    gl.compile(scene, camera);

    let frames = 4;

    function waitFrames() {
      if (frames-- > 0) {
        requestAnimationFrame(waitFrames);
      } else {
        useIntroStore.getState().setAssetsReady(true);
      }
    }

    requestAnimationFrame(waitFrames);
  }, [active, progress, gl, scene, camera]);

  return null;
}