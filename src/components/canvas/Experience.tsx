"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

import Lights from "@/components/scene/Lights";
import SceneEnvironment from "@/components/scene/Environment";
import Ball from "@/components/scene/Ball";
import FloodLights from "@/components/scene/FloodLights";
import StadiumEnvironment from "@/components/environment/StadiumEnvironment";
import PostEffects from "@/components/effects/PostEffects";
import { Stadium } from "@/components/stadium";
import SceneManager from "@/components/scene/SceneManager";
import CameraDirector from "@/components/camera/CameraDirector"
import AssetGate from "@/components/AssetGate";
import LoadingScreen from "@/components/LoadingScreen";
import AboutScene from "@/components/scene/AboutScene";
import SkillsScene from "@/components/skills/SkillsScene";
import SkillsOverlay from "../overlays/SkillOverlay";
import ContactOverlay from "../overlays/ContactOverlay";
import ProjectsOverlay from "@/overlays/ProjectsOverlay";
import { projects } from "@/data/projects"; // adjust to wherever your Jumbotron's `projects` prop currently comes from



export default function Experience() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <LoadingScreen />
<Canvas
  shadows={false}
  dpr={[1, 1.5]}
  camera={{
  position: [-18, 24, 62],
  fov: 35,
}}
  gl={{
    antialias: true,
    powerPreference: "high-performance",
  }}
  onCreated={({ gl, scene, camera }) => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;

    scene.background = new THREE.Color("#05070d");
    // scene.fog = new THREE.Fog("#05070d", 35, 90);

    // compile shaders once
    requestAnimationFrame(() => {
      gl.compile(scene, camera);
    });
  }}
>
        {/* Runs every resize, outside Suspense so it's active immediately
            (before assets finish loading) and never gates on AssetGate. */}
        

        <Suspense fallback={null}>
          <AssetGate />

          <SceneManager />
          <CameraDirector />
          <Lights />
          <FloodLights />
         
          
          <Stadium />
          <Ball />
         <AboutScene />
         
          <Preload all />
        </Suspense>
      </Canvas>
        <SkillsOverlay />
        <ContactOverlay />
        <ProjectsOverlay projects={projects} />
    </div>
  );
}