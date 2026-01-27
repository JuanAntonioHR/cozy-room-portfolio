"use client";

import * as THREE from "three";
import { JSX, useRef, useState, useEffect } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    SW_Screen: THREE.Mesh;
    SW_L_Joy: THREE.Mesh;
    SW_R_Joy: THREE.Mesh;
  };
  materials: {
    palette: THREE.MeshStandardMaterial;
  };
};

export function VoxelSWModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/VoxelSW.glb") as unknown as GLTFResult;

  const [hovered, setHovered] = useState(false);

  const leftJoyRef = useRef<THREE.Mesh>(null!);
  const rightJoyRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    gsap.killTweensOf([leftJoyRef.current.position, leftJoyRef.current.rotation]);
    gsap.killTweensOf([rightJoyRef.current.position, rightJoyRef.current.rotation]);

    if (hovered) {
      gsap.to([leftJoyRef.current.position, rightJoyRef.current.position], {
        y: 0.03,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to([groupRef.current.scale], {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to([leftJoyRef.current.position], {
        x: -0.1146,
        y: 0.0054,
        duration: 0.4,
        ease: "elastic.out(1, 0.75)",
      });
      gsap.to([rightJoyRef.current.position], {
        x: 0.1246,
        y: 0.0034,
        duration: 0.4,
        ease: "elastic.out(1, 0.75)",
      });
      gsap.to([groupRef.current.scale], {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      position={[-0.85, -0.36, -0.39]}
      rotation={[0, 1.3, 0]}
      scale={1.3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        ref={groupRef}
        castShadow
        receiveShadow
        geometry={nodes.SW_Screen.geometry}
        material={materials.palette}
      >
        <mesh
          ref={leftJoyRef}
          castShadow
          receiveShadow
          geometry={nodes.SW_L_Joy.geometry}
          material={materials.palette}
          position={[-0.1146, 0.0054, 0.0001]}
        >
          <Outlines visible={hovered} thickness={3} color="white" />
        </mesh>
        <mesh
          ref={rightJoyRef}
          castShadow
          receiveShadow
          geometry={nodes.SW_R_Joy.geometry}
          material={materials.palette}
          position={[0.1246, 0.0034, 0.0001]}
        >
          <Outlines visible={hovered} thickness={3} color="white" />
        </mesh>

        <Outlines visible={hovered} thickness={3} color="white" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/VoxelSW.glb");
