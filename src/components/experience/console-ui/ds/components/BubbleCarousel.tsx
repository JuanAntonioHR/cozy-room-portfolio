"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { CarouselButton } from "./CarouselButton";
import { CarouselDots } from "./CarouselDots";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import BubbleHeader from "./BubbleHeader";

interface BubbleCarouselProps {
  items: React.ReactNode[];
}

export const BubbleCarousel: React.FC<BubbleCarouselProps> = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const syncIndex = () => onSelect(emblaApi);

    emblaApi.on("select", syncIndex);
    emblaApi.on("reInit", syncIndex);

    React.startTransition(() => {
      syncIndex();
    });

    return () => {
      emblaApi.off("select", syncIndex);
      emblaApi.off("reInit", syncIndex);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="flex h-full w-full flex-col justify-between py-4">
      <BubbleHeader />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={index} className="flex flex-[0_0_80%] justify-center px-4">
              <div className="flex h-40 w-full items-center justify-center rounded-xl bg-zinc-800 text-white">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between px-8">
        <CarouselButton direction="prev" onClick={() => emblaApi?.scrollPrev()}>
          <ArrowBigLeft className="size-7" />
        </CarouselButton>

        <CarouselDots
          count={items.length}
          selectedIndex={selectedIndex}
          onSelect={(index) => emblaApi?.scrollTo(index)}
        />

        <CarouselButton direction="next" onClick={() => emblaApi?.scrollNext()}>
          <ArrowBigRight className="size-7" />
        </CarouselButton>
      </div>
    </div>
  );
};
