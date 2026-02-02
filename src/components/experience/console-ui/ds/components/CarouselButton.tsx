"use client";

import React from "react";
import { type HTMLMotionProps } from "motion/react";
import { LiquidButton } from "@/components/kokonutui/liquid-glass-card";

interface CarouselButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  direction: "prev" | "next";
  children?: React.ReactNode;
}

export const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  children,
  className = "",
  ...props
}) => {
  return (
    <LiquidButton
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={
        "size-14 cursor-pointer rounded-full bg-transparent text-zinc-300 " +
        "transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70 " +
        className
      }
      size="icon"
      variant="ghost"
      {...props}
    >
      {children}
    </LiquidButton>
  );
};
