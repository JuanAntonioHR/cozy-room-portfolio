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
import EnviromentChanger from "./EnvironmentChanger";
import { useStore } from "@/store";
import { PerformanceWatcher } from "./PerformanceWatcher";
import { VoxelGBModel } from "./gltfjsx/VoxelGBModel";
import { Voxel3dsModel } from "./gltfjsx/Voxel3dsModel";
import { VoxelSWModel } from "./gltfjsx/VoxelSWModel";
import { Stats } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <Suspense>
      <Stats />
      <EnvironmentController />
      <EnviromentChanger />
      <CameraRig />
      {/* <OrbitControls /> */}
      <Room />
      <HangingPlants />
      <WindowBackground />
      <SteamEmitter position={[-0.85, -0.3, -0.8]} />
      <Godray />
      <EffectsWrapper />
      <PerformanceWatcher />
    </Suspense>
  );
}

function EffectsWrapper() {
  const isEffectsEnabled = useStore((state) => state.isEffectsEnabled);
  return isEffectsEnabled ? <Effects /> : null;
}
