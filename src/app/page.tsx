"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useStore } from "@/store";
import { LiquidButton } from "@/components/kokonutui/liquid-glass-card";
import { Volume2, VolumeX, DoorOpen, Pause, Play, WandSparkles, Music4 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Howl, Howler } from "howler";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GlobalLoader } from "@/components/GlobalLoader";
import { OrientationPrompt } from "@/components/OrientationPrompt";
import { HydrationWatcher } from "@/components/HydrationWatcher";
import { useKeyPress } from "@/hooks/useKeyPress";

const Experience = dynamic(() => import("@/components/experience/Experience"), {
  ssr: false,
});

export default function Home() {
  const isEscapePressed = useKeyPress("Escape");

  const setFocus = useStore((state) => state.setFocus);
  const focus = useStore((state) => state.focus);

  const isEffectsEnabled = useStore((state) => state.isEffectsEnabled);
  const toggleEffects = useStore((state) => state.toggleEffects);

  const isSoundEnabled = useStore((state) => state.isSoundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);

  const musicRef = useRef<Howl | null>(null);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  useEffect(() => {
    musicRef.current = new Howl({
      src: ["/sounds/Deep-Relaxation.ogg", "/sounds/Deep-Relaxation.mp3"],
      loop: true,
      volume: 0,
    });

    return () => {
      musicRef.current?.unload();
    };
  }, []);

  const [tempIcon, setTempIcon] = useState<"play" | "pause" | null>(null);

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    if (Howler.ctx.state === "suspended") {
      Howler.ctx.resume();
    }

    setTempIcon(isMusicEnabled ? "pause" : "play");

    setTimeout(() => setTempIcon(null), 700);

    if (isMusicEnabled) {
      music.fade(music.volume(), 0, 500);
      setTimeout(() => music.pause(), 500);
      setIsMusicEnabled(false);
    } else {
      if (!music.playing()) music.play();
      music.fade(music.volume(), 0.7, 1000);
      setIsMusicEnabled(true);
    }
  };

  useEffect(() => {
    if (isEscapePressed) {
      setFocus("idle");
    }
  }, [isEscapePressed, setFocus]);

  return (
    <main className="h-screen w-screen">
      <HydrationWatcher />
      <GlobalLoader />
      <Canvas
        shadows="soft"
        camera={{ position: [0, 0, 0], fov: 45 }}
        gl={{
          antialias: false,
        }}
      >
        <Experience />
      </Canvas>

      <OrientationPrompt />

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
            <Tooltip>
              <TooltipTrigger asChild>
                <LiquidButton
                  onClick={() => setFocus("idle")}
                  aria-label="Back"
                  variant="ghost"
                  size="icon"
                  className={
                    "size-20 cursor-pointer rounded-full bg-transparent text-zinc-300 " +
                    "transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
                  }
                >
                  <DoorOpen className="size-9" />
                </LiquidButton>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Back</p>
              </TooltipContent>
            </Tooltip>
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
              variant="ghost"
              size="icon"
              className="size-20 rounded-full bg-transparent text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
            >
              <motion.div
                transition={{
                  type: "spring",
                  stiffness: 600,
                  damping: 15,
                }}
                className="relative flex items-center justify-center"
              >
                <AnimatePresence mode="popLayout">
                  {tempIcon ? (
                    <motion.div
                      key="action"
                      initial={{
                        scale: 0,
                        rotate: -45,
                        opacity: 0,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        scale: [0, 1.3, 1],
                        rotate: [20, -10, 0],
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        scale: 0.5,
                        opacity: 0,
                        filter: "blur(6px)",
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="absolute drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    >
                      {tempIcon === "play" ? (
                        <Play className="size-9" />
                      ) : (
                        <Pause className="size-9" />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="music"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      }}
                      className="absolute"
                    >
                      <Music4 className="size-9" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
