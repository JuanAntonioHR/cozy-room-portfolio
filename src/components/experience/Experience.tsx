"use client";
import { Suspense } from "react";
import EnvironmentController from "./EnvironmentController";
import CameraRig from "./CameraRig";
import Room from "./Room";
import WindowBackground from "./WindowBackground";
import Effects from "./Effects";
import { Godray } from "./Godray";
import HangingPlants from "./HangingPlant";
import { SteamEmitter } from "./SteamEmitter";

export default function Experience() {
  return (
    <Suspense>
      <EnvironmentController />
      <CameraRig />
      <Room />
      <HangingPlants />
      <WindowBackground />
      <Effects />
      <SteamEmitter position={[-0.85, -0.3, -0.8]} />
      <Godray
        settings={{
          position: [-0.6, -0.6, -0.6],
          rotation: [-0.44, 0.21, -1.47],
          color: "#ffcc80",
          topRadius: 0.8,
          bottomRadius: 0.8,
          height: 2.5,
          timeSpeed: 0.1,
          noiseScale: 5,
          smoothBottom: 0.4,
          smoothTop: 0.66,
          fresnelPower: 3,
        }}
      />
    </Suspense>
  );
}
