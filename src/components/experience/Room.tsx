"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, memo } from "react";
import * as THREE from "three";
import { Mesh } from "three";
import Foliage, { FoliageInstance } from "./Foliage";
import { VoxelChuModel } from "./gltfjsx/VoxelChuModel";

function Room() {
  const { scene } = useGLTF("/models/VoxelRoomBlend.glb");

  const foliageInstances: FoliageInstance[] = [
    { type: 3, position: [-1.21, 0.74, 1.04], scale: 0.2 },
    { type: 2, position: [-1.23, 0.75, 0.9], scale: 0.2 },

    { type: 0, position: [-1.2, 0.14, 0.91], scale: 0.25 },
    // Bookshelf
    { type: 2, position: [-0.8, 1.08, -1.15], scale: 0.3 },
    { type: 2, position: [0.22, 1.08, -1.15], scale: 0.3 },

    { type: 0, position: [-1, 0.41, -1.15], scale: 0.3 },
    { type: 3, position: [-0.24, 0.4, -1.14], scale: 0.25 },
    { type: 3, position: [0.25, 0.4, -1.14], scale: 0.25 },
    { type: 0, position: [0.72, 0.4, -1.15], scale: 0.3 },
    { type: 0, position: [0.96, 0.4, -1.15], scale: 0.25 },

    { type: 2, position: [0.18, -0.53, -1.15], scale: 0.25 },
    // Floor
    { type: 1, position: [-1.1, -0.8, 1.19] },
    { type: 1, position: [1.4, -0.8, -1.18] },
  ];

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
      <Foliage instances={foliageInstances} />
      <VoxelChuModel />
    </group>
  );
}

export default memo(Room);

useGLTF.preload("/models/VoxelRoomBlend.glb");
