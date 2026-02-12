"use client";

import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@/store";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export function GlobalLoader() {
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);

  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center gap-4 text-zinc-200">
            <span className="text-xs tracking-widest uppercase opacity-70">Loading</span>

            <div className="h-1 w-48 overflow-hidden rounded-full bg-zinc-700">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            </div>

            <span className="w-12 text-center font-mono text-xs opacity-60">
              {Math.floor(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
