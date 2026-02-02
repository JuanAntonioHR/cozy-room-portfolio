"use client";

import React from "react";

interface CarouselDotsProps {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({ count, selectedIndex, onSelect }) => {
  return (
    <div className="z-10 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={
            "h-2 w-2 rounded-full transition-transform " +
            (index === selectedIndex ? "scale-125 bg-white" : "bg-white/40 hover:bg-white/70")
          }
        />
      ))}
    </div>
  );
};
