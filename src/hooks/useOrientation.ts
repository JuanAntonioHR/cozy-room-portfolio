"use client";

import { useState, useEffect } from "react";

export function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch based
    const checkMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      // Also check screen size as a fallback/additional check
      const isSmallScreen = window.innerWidth <= 1024;
      setIsMobile(hasTouch && isSmallScreen);
    };

    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Initial checks
    checkMobile();
    checkOrientation();

    // Listeners
    const handleResize = () => {
      checkOrientation();
      // Recalculate mobile status on resize in case of window mode changes in devtools
      checkMobile();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return { isPortrait, isMobile };
}
