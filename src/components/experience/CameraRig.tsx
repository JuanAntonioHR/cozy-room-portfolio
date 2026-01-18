import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";

const vec = new THREE.Vector3();

export default function CameraRig() {
  const { debugCamera } = useControls("Camera Rig", {
    debugCamera: false
  });

  return useFrame((state) => {
    state.camera.position.lerp(
      debugCamera ?
      vec.set(1.5 + state.mouse.x * 0.1, 0.2 + state.mouse.y * 0.1, 1.5) :
      vec.set(4 + state.mouse.x * 0.1, 2 + state.mouse.y * 0.1, 4),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}