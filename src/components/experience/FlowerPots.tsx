import { useGLTF, Merged } from "@react-three/drei";

export default function FlowerPots() {
  const { nodes } = useGLTF("/models/VoxelBooks.glb");
  return <Merged meshes={nodes}>{(instances) => <instances.Book_0 position={[0, 0, 0]} />}</Merged>;
}

useGLTF.preload("/models/VoxelBooks.glb");
