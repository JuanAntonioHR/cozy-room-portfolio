"use client";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function Room() {
  // 1. Load your GLB file
  // Replace '/models/room-corner.glb' with your actual path in the /public folder
  const { scene } = useGLTF("/models/VoxelRoomBlend.glb");

  // 2. Optimization: Ensure all meshes cast/receive shadows
  scene.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return (
    <group>
      {/* Rendering the main room model */}
      <primitive object={scene} scale={1} position={[0, -1, 0]} rotation={[0, 0.5 * Math.PI, 0]} />
      
      {/* If your consoles are separate GLB files, we would import them similarly 
          or place them as children here. */}
    </group>
  );
}

// Pre-loading the model improves performance and prevents "pops" when loading
useGLTF.preload("/models/room-corner.glb");