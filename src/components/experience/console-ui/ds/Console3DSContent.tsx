import { Html } from "@react-three/drei";
import ExperienceCarousel from "./views/ExperienceCarousel";

export default function Console3DSContent() {
  return (
    <group onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
      <Html transform position={[0.001, 0.032, -0.0455]} rotation={[-0.45, 0, 0]} scale={0.01}>
        <div className={`h-[360px] w-[640px]`}>
          <ExperienceCarousel />
        </div>
      </Html>
    </group>
  );
}
