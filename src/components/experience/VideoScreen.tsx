"use client";

import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

export function VideoScreen() {
  const texture = useVideoTexture("/videos/M_Gameplay.mp4", {
    unsuspend: "canplay",
    muted: true,
    loop: true,
    start: true,
  });

  return (
    <mesh position={[-0.79, -0.131, 0.089]} rotation={[0, Math.PI / 2, 0]} scale={0.28}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        map-generateMipmaps={false}
        map-minFilter={THREE.LinearFilter}
        map-magFilter={THREE.LinearFilter}
        emissive={new THREE.Color("#ffffff")}
        emissiveMap={texture}
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </mesh>
  );
}
