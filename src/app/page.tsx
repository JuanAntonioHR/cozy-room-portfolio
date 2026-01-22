"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const Experience = dynamic(() => import("@/components/experience/Experience"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Canvas
        shadows="soft"
        camera={{ position: [0, 0, 0], fov: 45 }}
        gl={{
          antialias: false,
        }}
      >
        <Experience />
      </Canvas>
    </main>
  );
}
