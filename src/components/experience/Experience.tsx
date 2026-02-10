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
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function Experience() {
  const isEffectsEnabled = useStore((state) => state.isEffectsEnabled);

  const { progress } = useProgress();
  const setIsLoading = useStore((s) => s.setIsLoading);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
    }
  }, [progress, setIsLoading]);

  return (
    <Suspense>
      <EnvironmentController />
      <EnviromentChanger />
      <CameraRig />
      <Room />
      <HangingPlants />
      <WindowBackground />
      {isEffectsEnabled && <Effects />}
      <SteamEmitter position={[-0.85, -0.3, -0.8]} />
      <Godray />
    </Suspense>
  );
}
