"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { HangingPotModel } from "./gltfjsx/HangingPotModel";
import gsap from "gsap";

interface HangingPlantProps {
  position: [number, number, number];
  scale?: number;
}

function HangingPlantInstance({ position, scale = 1 }: HangingPlantProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [isShaking, setIsShaking] = useState(false);

  const texture = useTexture("/textures/foliage/Foliage4.png", (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  });

  const foliageGeometry = useMemo(() => {
    const planeGeom = new THREE.PlaneGeometry(1, 1);
    planeGeom.translate(0, -0.5, 0);
    return planeGeom;
  }, []);

  useFrame((state) => {
    if (!isShaking && groupRef.current) {
      const targetRotationX = state.mouse.y * 0.03;
      const targetRotationZ = -state.mouse.x * 0.03;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotationZ,
        0.05,
      );
    }
  });

  const handlePointerDown = () => {
    if (isShaking) return;
    setIsShaking(true);

    gsap.to(groupRef.current.rotation, {
      x: "+=0.01",
      z: "+=0.01",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      onComplete: () => setIsShaking(false),
    });
  };

  return (
    <group position={position} scale={scale}>
      <group ref={groupRef} onPointerDown={handlePointerDown}>
        <HangingPotModel position={[0, 0, 0]} scale={1.2} />
        <mesh position={[0, 0.1, 0]} scale={1.1} castShadow receiveShadow>
          <primitive object={foliageGeometry} attach="geometry" />
          <meshStandardMaterial
            map={texture}
            alphaTest={0.5}
            transparent
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>
        <mesh
          position={[0, 0.1, 0]}
          scale={1.1}
          rotation={[0, Math.PI / 2, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={foliageGeometry} attach="geometry" />
          <meshStandardMaterial
            map={texture}
            alphaTest={0.5}
            transparent
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function HangingPlants() {
  const instances = [
    { position: [-1, 1.1, 0.5], scale: 0.8 },
    { position: [-1, 1.1, -0.5], scale: 1 },
  ];

  return (
    <group>
      {instances.map((props, i) => (
        <HangingPlantInstance
          key={i}
          position={props.position as [number, number, number]}
          scale={props.scale}
        />
      ))}
    </group>
  );
}
