
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function EnvironmentController() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null!)
  useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, 'yellow')

  const ambientLightValue = useControls("Ambient Light", {
    intensity: { value: 2, min: 0, max: 5, step: 0.1 },
    color: "#fffef1",
  });
  const {x, y, z, color, intensity} = useControls("Directional Light", {
    x: { value: -6.1, min: -10, max: 10, step: 0.1 },
    y: { value: 4.9, min: -10, max: 10, step: 0.1 },
    z: { value: 1.9, min: -10, max: 10, step: 0.1 },
    color: "#ffd8a8",
    intensity: { value: 9.7, min: 0, max: 10, step: 0.1 }
  });

  return (
    <>
      <ambientLight
        intensity={ambientLightValue.intensity}
        color={ambientLightValue.color}
      />
      <directionalLight
        ref={dirLightRef}
        position={[x, y, z]}
        intensity={intensity}
        color={color}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
}