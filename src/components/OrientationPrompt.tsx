"use client";

import { useOrientation } from "@/hooks/useOrientation";
import { AnimatePresence, motion } from "motion/react";
import { X, Smartphone } from "lucide-react";
import { useState } from "react";
import { LiquidButton } from "@/components/kokonutui/liquid-glass-card";

export function OrientationPrompt() {
  const { isPortrait, isMobile } = useOrientation();
  const [isDismissed, setIsDismissed] = useState(false);

  const showPrompt = isMobile && isPortrait && !isDismissed;

  if (!isPortrait && isDismissed) {
    setIsDismissed(false);
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-zinc-950/90 p-8 text-center backdrop-blur-md"
        >
          <div className="absolute top-8 right-8">
            <LiquidButton
              onClick={() => setIsDismissed(true)}
              variant="ghost"
              size="icon"
              className="size-12 cursor-pointer rounded-full bg-zinc-800/50 text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              <X className="size-6" />
            </LiquidButton>
          </div>

          <div className="relative mb-8">
            <motion.div
              animate={{
                rotate: [0, -90, -90, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
              }}
              className="relative z-10"
            >
              <Smartphone className="size-24 text-zinc-100" strokeWidth={1.5} />
            </motion.div>

            <div className="absolute inset-0 z-0 rounded-full bg-zinc-100/10 blur-3xl" />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="retro mb-4 text-3xl font-bold tracking-tight text-zinc-100">
              Rotate Device
            </h2>
            <p className="max-w-xs text-lg text-zinc-400">
              For the best experience, please view this portfolio in landscape mode.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
