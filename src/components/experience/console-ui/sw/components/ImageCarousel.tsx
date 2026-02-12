"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%]"
              style={{ aspectRatio: "1920 / 877" }}
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
        {/* Left Control */}
        <button
          onClick={scrollPrev}
          className="pointer-events-auto h-full w-24 bg-linear-to-r from-black/60 to-transparent transition-opacity group-hover:opacity-100 hover:opacity-100 md:opacity-0"
        >
          <div className="flex h-full items-center justify-start pl-2">
            <ChevronLeft className="size-7 text-white" />
          </div>
        </button>

        {/* Right Control */}
        <button
          onClick={scrollNext}
          className="pointer-events-auto h-full w-24 bg-linear-to-l from-black/60 to-transparent transition-opacity group-hover:opacity-100 hover:opacity-100 md:opacity-0"
        >
          <div className="flex h-full items-center justify-end pr-2">
            <ChevronRight className="size-7 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
