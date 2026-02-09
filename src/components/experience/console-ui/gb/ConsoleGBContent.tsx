import { Html } from "@react-three/drei";
import AboutMe from "./views/AboutMe";

export default function ConsoleGBContent() {
  return (
    <group onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
      <Html transform position={[0, 0.035, 0.02]} rotation={[0, 0, 0]} scale={0.0045}>
        <div className={`h-[480px] w-[480px] overflow-hidden`}>
          <AboutMe />
        </div>
      </Html>
    </group>
  );
}
