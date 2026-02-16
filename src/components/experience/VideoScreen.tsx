"use client";

import { useVideoTexture, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const WHITE = new THREE.Color("#ffffff");

export function VideoScreen() {
  const [isOn, setIsOn] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const texture = useVideoTexture("/videos/M_Gameplay.mp4", {
    unsuspend: "canplay",
    muted: true,
    loop: true,
    start: false,
    playsInline: true,
  });

  const video = texture.image as HTMLVideoElement;

  useEffect(() => {
    if (meshRef.current && materialRef.current) {
      if (!isOn) {
        meshRef.current.scale.set(0, 0, 0);
        materialRef.current.emissiveIntensity = 0;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideo = useCallback(() => {
    if (!meshRef.current || !materialRef.current) return;

    const newIsOn = !isOn;
    setIsOn(newIsOn);

    if (newIsOn) {
      const tl = gsap.timeline();

      tl.to(meshRef.current.scale, {
        x: 1,
        y: 0.01,
        z: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      tl.to(
        meshRef.current.scale,
        {
          y: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        "+=0.1",
      );

      tl.to(
        materialRef.current,
        {
          emissiveIntensity: 3,
          duration: 0.1,
          repeat: 1,
          yoyo: true,
          onComplete: () => {
            gsap.to(materialRef.current, { emissiveIntensity: 0.8, duration: 0.5 });
            video.play();
          },
        },
        "<",
      );
    } else {
      const tl = gsap.timeline();

      tl.to(materialRef.current, {
        emissiveIntensity: 5,
        duration: 0.1,
      });

      tl.to(meshRef.current.scale, {
        y: 0.01,
        duration: 0.2,
        ease: "power2.in",
        onStart: () => video.pause(),
      });

      tl.to(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.1,
        ease: "power2.in",
      });

      tl.to(
        materialRef.current,
        {
          emissiveIntensity: 0,
          duration: 0.1,
        },
        "<",
      );
    }
  }, [isOn, video]);

  return (
    <group position={[-0.79, -0.131, 0.089]} rotation={[0, Math.PI / 2, 0]} scale={0.28}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          toggleVideo();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          map-generateMipmaps={false}
          map-minFilter={THREE.LinearFilter}
          map-magFilter={THREE.LinearFilter}
          emissive={WHITE}
          emissiveMap={texture}
          emissiveIntensity={0.8}
          toneMapped={false}
          transparent={true}
        />
      </mesh>
    </group>
  );
}
