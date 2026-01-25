"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, memo } from "react";
import * as THREE from "three";
import { Mesh } from "three";

function Room() {
  const { scene } = useGLTF("/models/VoxelRoomBlend.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child;

        mesh.material = new THREE.MeshStandardMaterial({
          map: (mesh.material as THREE.MeshStandardMaterial).map,
          roughness: 0.9,
          metalness: 0,
          envMapIntensity: 0,
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group>
      <primitive object={scene} scale={1} position={[0, -1, 0]} rotation={[0, 0.5 * Math.PI, 0]} />
    </group>
  );
}

export default memo(Room);

useGLTF.preload("/models/room-corner.glb");
