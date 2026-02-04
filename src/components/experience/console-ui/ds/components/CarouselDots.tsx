"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CarouselDotsProps {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  selectedIndex,
  onSelect,
  disabled,
}) => {
  return (
    <div className="z-10 my-auto flex gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          disabled={disabled}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            index === selectedIndex ? "scale-125 bg-white" : "bg-white/40 hover:bg-white/70",
            disabled && "cursor-not-allowed opacity-50",
          )}
        />
      ))}
    </div>
  );
};
