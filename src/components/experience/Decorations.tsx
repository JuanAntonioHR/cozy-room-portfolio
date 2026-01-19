import { PivotControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Decorations() {
    const { scene } = useGLTF("/models/VoxelChu.glb");
    
    useEffect(() => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
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
        <PivotControls scale={.5}>
            <primitive object={scene} position={[0, 0, 0]} castShadow receiveShadow />
        </PivotControls>
    );
}

useGLTF.preload('/models/VoxelChu.glb');