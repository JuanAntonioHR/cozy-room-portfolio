import { Html } from "@react-three/drei";
import ProjectsCarousel from "./views/ProjectsCarousel";

export default function ConsoleSWContent() {
  return (
    <group>
      <Html transform position={[0.005, 0, 0.001]} rotation={[0, 0, 0]} scale={0.01}>
        <div className={`h-[512px] w-[640px]`}>
          <ProjectsCarousel />
        </div>
      </Html>
    </group>
  );
}
