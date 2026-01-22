import { useGLTF } from "@react-three/drei";
import Bookshelf from "./Bookshelf";

export default function Decorations() {
  return <Bookshelf />;
}

useGLTF.preload("/models/VoxelBooks.glb");
