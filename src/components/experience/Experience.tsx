"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import EnvironmentController from "./EnvironmentController";
import CameraRig from "./CameraRig";
import Room from "./Room";
import WindowBackground from "./WindowBackground";
import Effects from "./Effects";

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
          <WindowBackground />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}