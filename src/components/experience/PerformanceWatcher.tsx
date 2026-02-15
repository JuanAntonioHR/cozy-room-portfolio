"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useStore } from "@/store";

export function PerformanceWatcher() {
  const disableEffects = useStore((s) => s.disableEffectsByPerformance);

  const frames = useRef(0);
  const last = useRef(0);

  useFrame(() => {
    if (last.current === 0) last.current = performance.now();

    frames.current++;
    const now = performance.now();

    if (now - last.current > 1000) {
      const fps = frames.current;
      frames.current = 0;
      last.current = now;

      if (fps < 30) {
        disableEffects();
      }
    }
  });

  return null;
}
