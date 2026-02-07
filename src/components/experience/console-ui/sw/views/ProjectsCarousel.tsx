import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import DragFreeLiquidCarousel from "../components/DragFreeLiquidCarousel";

export default function ProjectsCarousel() {
  return (
    <BubbleBackground
      colors={{
        first: "1,42,74",
        second: "1,58,99",
        third: "1,73,124",
        fourth: "1,79,134",
        fifth: "42,111,151",
        sixth: "44,125,160",
      }}
      interactive
    >
      <DragFreeLiquidCarousel />
    </BubbleBackground>
  );
}
