import { useCallback, useEffect, useRef } from "react";

type UseIdleHintProps = {
  delay?: number;
  enabled?: boolean;
  onIdle: () => void;
};

export function useIdleHint({
  delay = 6000,
  enabled = true,
  onIdle,
}: UseIdleHintProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const runningRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!runningRef.current) {
        runningRef.current = true;
        onIdle();
        setTimeout(() => {
          runningRef.current = false;
        }, 1000);
      }
    }, delay);
  }, [enabled, delay, onIdle]);

  useEffect(() => {
    if (!enabled) return;

    resetTimer();

    const onInteract = () => resetTimer();

    window.addEventListener("pointerdown", onInteract);
    window.addEventListener("keydown", onInteract);
    window.addEventListener("wheel", onInteract);

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("wheel", onInteract);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, resetTimer]);

  return { resetTimer };
}
