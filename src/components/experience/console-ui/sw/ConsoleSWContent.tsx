import { Html } from "@react-three/drei";
import ProjectsCarousel from "./views/ProjectsCarousel";

export default function ConsoleSWContent({ visible }: { visible: boolean }) {
  return (
    <group>
      <Html
        transform
        position={[0.005, 0, 0.001]}
        rotation={[0, 0, 0]}
        scale={0.01}
        zIndexRange={[visible ? 10 : -10, 0]}
        style={{
          pointerEvents: visible ? "auto" : "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className={`h-[512px] w-[640px]`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <ProjectsCarousel />
        </div>
      </Html>
    </group>
  );
}
