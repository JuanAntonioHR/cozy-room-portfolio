"use client";

import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { BubbleCarousel } from "../components/BubbleCarousel";

function Carrousel() {
  return (
    <BubbleBackground
      colors={{
        first: "27,87,132",
        second: "30,96,145",
        third: "26,117,159",
        fourth: "22,138,173",
        fifth: "52,160,164",
        sixth: "82,182,154",
      }}
      interactive
    >
      <BubbleCarousel
        items={[
          <LiquidGlassCard key="1">Card 1</LiquidGlassCard>,
          <LiquidGlassCard key="2">Card 2</LiquidGlassCard>,
          <LiquidGlassCard key="3">Card 3</LiquidGlassCard>,
        ]}
      />
    </BubbleBackground>
  );
}

export default Carrousel;
