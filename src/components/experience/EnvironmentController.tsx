import { useControls } from "leva";
import { Environment, Sparkles, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type EnvironmentPreset =
  | "night"
  | "city"
  | "dawn"
  | "forest"
  | "park"
  | "studio"
  | "warehouse"
  | "apartment"
  | "lobby"
  | "sunset";

export default function EnvironmentController() {
  const isDev = process.env.NODE_ENV === "development";
  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const spotLightRef = useRef<THREE.SpotLight>(null!);

  useHelper(isDev ? dirLightRef : null, THREE.DirectionalLightHelper, 1, "yellow");
  useHelper(isDev ? spotLightRef : null, THREE.SpotLightHelper);

  const enviromentControls = useControls("Environment", {
    intensity: { value: 1, min: 0, max: 1, step: 0.01 },
    preset: {
      value: "sunset" as EnvironmentPreset,
      options: [
        "city",
        "dawn",
        "forest",
        "night",
        "park",
        "studio",
        "warehouse",
        "apartment",
        "lobby",
        "sunset",
      ],
    },
  });
  const { x, y, z, color, intensity } = useControls("Directional Light", {
    x: { value: -6.1, min: -10, max: 10, step: 0.1 },
    y: { value: 4.9, min: -10, max: 10, step: 0.1 },
    z: { value: 1.9, min: -10, max: 10, step: 0.1 },
    color: "#ffd2a6",
    intensity: { value: 5.5, min: 0, max: 10, step: 0.1 },
  });
  const { xp, yp, zp, scale } = useControls("Particles", {
    xp: { value: -4.7, min: -10, max: 10, step: 0.1 },
    yp: { value: 0.3, min: -10, max: 10, step: 0.1 },
    zp: { value: -1.6, min: -10, max: 10, step: 0.1 },
    scale: { value: 1.3, min: 0.1, max: 5, step: 0.1 },
  });

  return (
    <>
      <Environment
        preset={enviromentControls.preset as EnvironmentPreset}
        background={false}
        environmentIntensity={enviromentControls.intensity}
      />
      <directionalLight
        ref={dirLightRef}
        position={[x, y, z]}
        intensity={intensity}
        color={color}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={4}
      />
      <Sparkles
        count={15}
        scale={[scale, scale, scale]}
        position={[xp, yp, zp]}
        size={3}
        speed={0.2}
        opacity={0.4}
        color="#ffd8a8"
      />
    </>
  );
}
