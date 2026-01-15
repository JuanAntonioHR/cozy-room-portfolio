"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import EnvironmentController from "./EnvironmentController";
import CameraRig from "./CameraRig";
import Room from "./Room";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Bg from "./WindowBackground";
import WindowBackground from "./WindowBackground";

export default function Experience() {

  return (
    <div className="h-screen w-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 45 }}
        gl={{
          antialias: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        <Suspense fallback={null}>
          <EnvironmentController />
          <CameraRig />
          
          <Room />
          <EffectComposer>
            <Bloom intensity={0.2} luminanceThreshold={0.7} />
            <Vignette eskil={false} offset={0.2} darkness={0.4} />
          </EffectComposer>
        </Suspense>
        
        <WindowBackground />
      </Canvas>
    </div>
  );
}