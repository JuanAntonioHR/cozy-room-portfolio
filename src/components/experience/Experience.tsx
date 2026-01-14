"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import EnvironmentController from "./EnvironmentController";
import CameraRig from "./CameraRig";
import Room from "./Room";

export default function Experience() {

  return (
    <div className="h-screen w-full relative">
      <Canvas shadows camera={{ position: [5, 3, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <EnvironmentController />
          <CameraRig />
          
          <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          
          <Room />
        </Suspense>
      </Canvas>
    </div>
  );
}