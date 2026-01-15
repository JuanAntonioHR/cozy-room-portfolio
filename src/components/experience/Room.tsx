"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { Mesh } from "three";

export default function Room() {
  const { scene } = useGLTF("/models/VoxelRoomBlend.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child

        mesh.material = new THREE.MeshStandardMaterial({
          map: (mesh.material as THREE.MeshStandardMaterial).map,
          roughness: 1,
          metalness: 0,
        })

        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
  }, [scene])

  //TODO: Check if this is necessary
  scene.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return (
    <group>
      <primitive object={scene} scale={1} position={[0, -1, 0]} rotation={[0, 0.5 * Math.PI, 0]} />
      
    </group>
  );
}

useGLTF.preload("/models/room-corner.glb");