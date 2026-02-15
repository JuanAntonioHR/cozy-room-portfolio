"use client";
import { useEffect } from "react";
import { useStore } from "@/store";

export function PerformanceBootstrap() {
  const disableEffects = useStore((s) => s.disableEffectsByPerformance);

  useEffect(() => {
    const isLowEndDevice =
      navigator.hardwareConcurrency <= 4 || /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isLowEndDevice) {
      disableEffects();
    }
  }, [disableEffects]);

  return null;
}
