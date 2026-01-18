import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { PivotControls, useGLTF } from "@react-three/drei";

export default function Decorations() {
    const voxelChu = useLoader(GLTFLoader, '/models/VoxelChu.glb');

    return (
        <PivotControls scale={.5}>
            <primitive object={voxelChu.scene} position={[0, 0, 0]} />
        </PivotControls>
    );
}

useGLTF.preload('/models/VoxelChu.glb');