import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store";

const vec = new THREE.Vector3();

export default function CameraRig() {
  const focus = useStore((state) => state.focus);

  return useFrame((state) => {
    const targetPos = vec.set(
      1.5 + (focus === "idle" ? state.mouse.x * 0.05 : 0),
      0.2 + (focus === "idle" ? state.mouse.y * 0.05 : 0),
      1.5,
    );

    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}
