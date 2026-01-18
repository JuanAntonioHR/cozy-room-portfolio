"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, memo } from "react";
import * as THREE from "three";
import { Mesh } from "three";
import Decorations from "./Decorations";

function Room() {
  const { scene } = useGLTF("/models/VoxelRoomBlend.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child;

        mesh.material = new THREE.MeshStandardMaterial({
          map: (mesh.material as THREE.MeshStandardMaterial).map,
          roughness: 1,
          metalness: 0,
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group>
      <primitive
        object={scene}
        scale={1}
        position={[0, -1, 0]}
        rotation={[0, 0.5 * Math.PI, 0]}
      />
      <Decorations />
    </group>
  );
}

export default memo(Room);

useGLTF.preload("/models/room-corner.glb");