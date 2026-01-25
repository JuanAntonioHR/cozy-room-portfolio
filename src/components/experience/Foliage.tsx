"use client";

import { useTexture, Instances, Instance } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const FOLIAGE_TYPES = [
  { id: 0, texture: "/textures/foliage/Foliage0.png", planes: 2 },
  { id: 1, texture: "/textures/foliage/Foliage1.png", planes: 4 },
  { id: 2, texture: "/textures/foliage/Foliage2.png", planes: 2 },
  { id: 3, texture: "/textures/foliage/Foliage3.png", planes: 2 },
];

export interface FoliageInstance {
  type: number;
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}

interface FoliageProps {
  instances: FoliageInstance[];
}

export default function Foliage({ instances }: FoliageProps) {
  const textures = useTexture(FOLIAGE_TYPES.map((t) => t.texture));

  useMemo(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });
  }, [textures]);

  const geometries = useMemo(() => {
    const planeGeom = new THREE.PlaneGeometry(1, 1);
    planeGeom.translate(0, 0.5, 0);

    const createCross = (count: number) => {
      const parts: THREE.BufferGeometry[] = [];
      for (let i = 0; i < count; i++) {
        const g = planeGeom.clone();
        g.rotateY((Math.PI / count) * i);
        parts.push(g);
      }
      return mergeGeometries(parts);
    };

    return {
      cross2: createCross(2),
      cross4: createCross(4),
    };
  }, []);

  return (
    <group>
      {FOLIAGE_TYPES.map((type, idx) => {
        const typeInstances = instances.filter((inst) => inst.type === type.id);
        const geometry = type.planes === 2 ? geometries.cross2 : geometries.cross4;
        const texture = textures[idx];

        return (
          <Instances key={type.id} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial
              map={texture}
              alphaTest={0.5}
              transparent={true}
              side={THREE.DoubleSide}
              roughness={0.8}
              metalness={0}
            />
            {typeInstances.map((inst, i) => (
              <Instance
                key={i}
                position={inst.position}
                scale={inst.scale || 1}
                rotation={[0, inst.rotationY || 0, 0]}
              />
            ))}
          </Instances>
        );
      })}
    </group>
  );
}
