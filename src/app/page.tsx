"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useStore } from "@/store";
import { LiquidButton } from "@/components/kokonutui/liquid-glass-card";
import { DoorOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const Experience = dynamic(() => import("@/components/experience/Experience"), {
  ssr: false,
});

export default function Home() {
  const setFocus = useStore((state) => state.setFocus);
  const focus = useStore((state) => state.focus);

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
      <AnimatePresence>
        {focus !== "idle" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 20,
              mass: 3,
            }}
            className="absolute top-8 left-8 z-50"
          >
            <LiquidButton
              onClick={() => setFocus("idle")}
              aria-label="Back to room"
              variant="ghost"
              size="icon"
              className={
                "size-20 cursor-pointer rounded-full bg-transparent text-zinc-300 " +
                "transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
              }
            >
              <DoorOpen className="size-9" />
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
