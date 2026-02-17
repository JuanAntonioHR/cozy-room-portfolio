import { Html } from "@react-three/drei";
import ExperienceCarousel from "./views/ExperienceCarousel";

export default function Console3DSContent({ visible }: { visible: boolean }) {
  return (
    <group>
      <Html
        transform
        position={[0.001, 0.032, -0.0455]}
        rotation={[-0.45, 0, 0]}
        scale={0.01}
        zIndexRange={[visible ? 10 : -10, 0]}
        style={{
          pointerEvents: visible ? "auto" : "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className={`h-[360px] w-[640px]`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <ExperienceCarousel />
        </div>
      </Html>
    </group>
  );
}
