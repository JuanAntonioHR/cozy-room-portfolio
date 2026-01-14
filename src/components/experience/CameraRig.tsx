import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraRig() {
  const vec = new THREE.Vector3();

  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(5 + state.mouse.x * 0.8, 3 + state.mouse.y * 0.5, 5),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}