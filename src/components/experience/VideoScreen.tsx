"use client";

import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const WHITE = new THREE.Color("#ffffff");

export function VideoScreen() {
  const [isOn, setIsOn] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const texture = useVideoTexture("/videos/M_Gameplay.mp4", {
    muted: true,
    loop: true,
    start: false,
    playsInline: true,
    crossOrigin: "anonymous",
  });
  const textureRef = useRef(texture);

  useEffect(() => {
    textureRef.current = texture;
    if (texture.image instanceof HTMLVideoElement) {
      videoRef.current = texture.image;
    }
  }, [texture]);

  const playVideoSafely = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();

      if (video.readyState >= 2) {
        textureRef.current.needsUpdate = true;
        materialRef.current!.needsUpdate = true;
      } else {
        video.onloadeddata = () => {
          textureRef.current.needsUpdate = true;
          materialRef.current!.needsUpdate = true;
        };
      }
    } catch (e) {
      console.warn("Video play blocked", e);
    }
  };

  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;
    meshRef.current.scale.set(0, 0, 0);
    materialRef.current.emissiveIntensity = 0;
  }, []);

  const toggleVideo = useCallback(() => {
    if (!meshRef.current || !materialRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const turningOn = !isOn;
    setIsOn(turningOn);

    if (turningOn) {
      materialRef.current.map = texture;
      materialRef.current.emissiveMap = texture;
      materialRef.current.needsUpdate = true;

      const tl = gsap.timeline({
        onComplete: () => {
          playVideoSafely();
        },
      });

      tl.to(meshRef.current.scale, {
        x: 1,
        y: 0.01,
        z: 1,
        duration: 0.2,
      }).to(meshRef.current.scale, {
        y: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
      materialRef.current.emissiveIntensity = 0.8;
    } else {
      const tl = gsap.timeline({
        onStart: () => video.pause(),
        onComplete: () => {
          materialRef.current!.map = null;
          materialRef.current!.emissiveMap = null;
        },
      });

      tl.to(materialRef.current, {
        emissiveIntensity: 4,
        duration: 0.1,
      })
        .to(meshRef.current.scale, {
          y: 0.01,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(meshRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.1,
        })
        .to(materialRef.current, {
          emissiveIntensity: 0,
          duration: 0.1,
        });
    }
  }, [isOn, texture]);

  return (
    <group position={[-0.79, -0.131, 0.089]} rotation={[0, Math.PI / 2, 0]} scale={0.28}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          toggleVideo();
        }}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
      </mesh>

      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          emissive={WHITE}
          emissiveIntensity={0}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}
