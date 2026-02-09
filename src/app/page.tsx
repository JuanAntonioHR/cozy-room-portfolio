"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useStore } from "@/store";
import { LiquidButton } from "@/components/kokonutui/liquid-glass-card";
import { Volume2, VolumeX, DoorOpen, Pause, Play, WandSparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Howl } from "howler";
import { useEffect, useRef } from "react";
import { AudioConsentDialog } from "@/components/AudioConsentDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Experience = dynamic(() => import("@/components/experience/Experience"), {
  ssr: false,
});

export default function Home() {
  const setFocus = useStore((state) => state.setFocus);
  const focus = useStore((state) => state.focus);

  const isEffectsEnabled = useStore((state) => state.isEffectsEnabled);
  const toggleEffects = useStore((state) => state.toggleEffects);

  const isMusicEnabled = useStore((state) => state.isMusicEnabled);
  const isSoundEnabled = useStore((state) => state.isSoundEnabled);
  const toggleMusic = useStore((state) => state.toggleMusic);
  const toggleSound = useStore((state) => state.toggleSound);

  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sounds/Deep-Relaxation.ogg", "/sounds/Deep-Relaxation.mp3"],
      loop: true,
      volume: 0,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isMusicEnabled) {
      if (!sound.playing()) {
        sound.play();
      }
      sound.fade(sound.volume(), 0.5, 1000);
    } else {
      sound.fade(sound.volume(), 0, 1000);
      setTimeout(() => {
        if (!isMusicEnabled) {
          sound.pause();
        }
      }, 1000);
    }
  }, [isMusicEnabled]);

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

      <AudioConsentDialog />

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

      <div className="absolute bottom-8 left-8 z-50 flex flex-col gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <LiquidButton
              onClick={toggleEffects}
              aria-label={
                isEffectsEnabled
                  ? "Disable post-processing effects"
                  : "Enable post-processing effects"
              }
              variant="ghost"
              size="icon"
              className={
                "size-20 cursor-pointer rounded-full bg-transparent text-zinc-300 " +
                "transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
              }
            >
              <WandSparkles className="size-9" />
            </LiquidButton>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>
              {isEffectsEnabled
                ? "Disable post-processing effects"
                : "Enable post-processing effects"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="absolute right-8 bottom-8 z-50 flex flex-col gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <LiquidButton
              onClick={toggleSound}
              aria-label={isSoundEnabled ? "Mute interface sounds" : "Unmute interface sounds"}
              variant="ghost"
              size="icon"
              className={
                "size-20 cursor-pointer rounded-full bg-transparent text-zinc-300 " +
                "transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
              }
            >
              {isSoundEnabled ? <Volume2 className="size-9" /> : <VolumeX className="size-9" />}
            </LiquidButton>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isSoundEnabled ? "Disable interface sounds" : "Enable interface sounds"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <LiquidButton
              onClick={toggleMusic}
              aria-label={isMusicEnabled ? "Pause ambient music" : "Play ambient music"}
              variant="ghost"
              size="icon"
              className={
                "size-20 cursor-pointer rounded-full bg-transparent text-zinc-300 " +
                "transition-colors hover:bg-zinc-200/70 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
              }
            >
              <div className="relative">
                {isMusicEnabled ? <Pause className="size-9" /> : <Play className="size-9" />}
              </div>
            </LiquidButton>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isMusicEnabled ? "Pause ambient music" : "Play ambient music"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </main>
  );
}
