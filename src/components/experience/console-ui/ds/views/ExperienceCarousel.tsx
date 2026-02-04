"use client";

import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { BubbleCarousel } from "../components/BubbleCarousel";
import BubbleCard from "../components/BubbleCard";
import ComingSoonCard from "../components/ComingSoonCard";
import { experienceInfo } from "@/data/ExperienceInfo";

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
          ...experienceInfo.map((experience, index) => (
            <BubbleCard key={index} experience={experience} />
          )),
          <ComingSoonCard key="coming-soon" />,
        ]}
      />
    </BubbleBackground>
  );
}

export default Carrousel;
