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

export default function Experience() {
  return (
    <Suspense>
      <EnvironmentController />
      <EnviromentChanger />
      <CameraRig />
      <Room />
      <HangingPlants />
      <WindowBackground />
      <EffectsWrapper />
      <SteamEmitter position={[-0.85, -0.3, -0.8]} />
      <Godray />
      <PerformanceWatcher />
    </Suspense>
  );
}

function EffectsWrapper() {
  const isEffectsEnabled = useStore((state) => state.isEffectsEnabled);
  return isEffectsEnabled ? <Effects /> : null;
}
