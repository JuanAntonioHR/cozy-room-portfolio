
import { useControls } from "leva";
import { Sparkles, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function EnvironmentController() {
  const isDev = process.env.NODE_ENV === 'development';
  const dirLightRef = useRef<THREE.DirectionalLight>(null!)
  
  // Only use helper in development
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, 'yellow')
  }

  const ambientLightValue = useControls("Ambient Light", {
    intensity: { value: 0.4, min: 0, max: 5, step: 0.1 },
    color: "#fffef1",
  });
  const {x, y, z, color, intensity} = useControls("Directional Light", {
    x: { value: -6.1, min: -10, max: 10, step: 0.1 },
    y: { value: 4.9, min: -10, max: 10, step: 0.1 },
    z: { value: 1.9, min: -10, max: 10, step: 0.1 },
    color: "#ffcc80",
    intensity: { value: 9.7, min: 0, max: 10, step: 0.1 }
  });
  const { xp, yp, zp, scale } = useControls("Particles", {
    xp: { value: -4.7, min: -10, max: 10, step: 0.1 },
    yp: { value: 0.3, min: -10, max: 10, step: 0.1 },
    zp: { value: -1.6, min: -10, max: 10, step: 0.1 },
    scale: { value: 1.3, min: 0.1, max: 5, step: 0.1 }
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