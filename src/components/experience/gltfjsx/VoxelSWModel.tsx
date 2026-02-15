"use client";

import * as THREE from "three";
import { JSX, useRef, useState, useEffect } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import gsap from "gsap";
import { useStore } from "@/store";
import ConsoleSWContent from "../console-ui/sw/ConsoleSWContent";
import TitleLabelThree from "../console-ui/components/TitelLabelThree";
import { useIdleHint } from "@/hooks/useIdleHint";

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

  const setFocus = useStore((state) => state.setFocus);
  const focus = useStore((state) => state.focus);

  const groupRef = useRef<THREE.Group>(null!);
  const leftJoyRef = useRef<THREE.Mesh>(null!);
  const rightJoyRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const idleShake = () => {
    if (!groupRef.current) return;
    if (focus !== "idle" || hovered) return;

    gsap
      .timeline()
      .to(groupRef.current.rotation, {
        y: "+=0.2",
        duration: 0.08,
        ease: "power1.inOut",
      })
      .to(groupRef.current.rotation, {
        y: "-=0.4",
        duration: 0.12,
        ease: "power1.inOut",
      })
      .to(groupRef.current.rotation, {
        y: "+=0.2",
        duration: 0.08,
        ease: "power1.inOut",
      });
  };

  useEffect(() => {
    if (focus === "sw") {
      gsap.to(groupRef.current.position, {
        x: 1.33,
        y: 0.178,
        z: 1.33,
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: 1.96 * Math.PI,
        y: 0.25 * Math.PI,
        z: 0.028 * Math.PI,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(groupRef.current.position, {
        x: -0.85,
        y: -0.36,
        z: -0.39,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 1.3,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (hovered && focus === "idle") {
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
        y: 0.0054,
        duration: 0.4,
        ease: "elastic.out(1, 0.75)",
      });
      gsap.to([rightJoyRef.current.position], {
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
  }, [hovered, focus]);

  useIdleHint({
    delay: 6000,
    enabled: focus === "idle",
    onIdle: idleShake,
  });

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
      onClick={(e) => {
        e.stopPropagation();
        if (focus === "idle") {
          setFocus("sw");
        }
      }}
      onPointerMissed={() => {
        if (focus === "sw") {
          setFocus("idle");
        }
      }}
    >
      <mesh
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
          <Outlines visible={hovered && focus === "idle"} thickness={3} color="white" />
        </mesh>
        <mesh
          ref={rightJoyRef}
          castShadow
          receiveShadow
          geometry={nodes.SW_R_Joy.geometry}
          material={materials.palette}
          position={[0.1246, 0.0034, 0.0001]}
        >
          <Outlines visible={hovered && focus === "idle"} thickness={3} color="white" />
        </mesh>
        {focus === "sw" && <ConsoleSWContent />}
        <Outlines visible={hovered && focus === "idle"} thickness={3} color="white" />
      </mesh>
      {hovered && focus === "idle" && (
        <TitleLabelThree title="Projects" position={[-0.11, 0.21, 0]} />
      )}
    </group>
  );
}

useGLTF.preload("/models/VoxelSW.glb");
