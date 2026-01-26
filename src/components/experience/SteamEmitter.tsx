"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function useBillboard<T extends THREE.Object3D>(ref: React.RefObject<T | null>) {
  useFrame(({ camera }) => {
    if (!ref.current) return;
    ref.current.quaternion.copy(camera.quaternion);
  });
}

function SteamParticle({
  texture,
  basePosition,
}: {
  texture: THREE.Texture;
  basePosition: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const life = useRef<number | null>(null);

  useBillboard(ref);

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (life.current === null) {
      life.current = Math.random();
    }

    life.current += delta * 0.25;

    if (life.current > 1) {
      life.current = 0;
      ref.current.position.set(
        basePosition[0] + (Math.random() - 0.5) * 0.1,
        basePosition[1],
        basePosition[2] + (Math.random() - 0.5) * 0.1,
      );
    }

    // Subir
    ref.current.position.y = basePosition[1] + life.current * 0.8;
    ref.current.position.x = Math.random() * 0.00001;

    // Fade
    const material = ref.current.material as THREE.MeshBasicMaterial;
    material.opacity = 1 - life.current;
  });

  return (
    <mesh ref={ref} position={basePosition}>
      <planeGeometry args={[0.09, 0.09]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

export function SteamEmitter({
  position,
  count = 6,
}: {
  position: [number, number, number];
  count?: number;
}) {
  const texture = useTexture("/textures/fx/steam.png", (tex) => {
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
  });

  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <SteamParticle key={i} texture={texture} basePosition={[0, 0, 0]} />
      ))}
    </group>
  );
}
