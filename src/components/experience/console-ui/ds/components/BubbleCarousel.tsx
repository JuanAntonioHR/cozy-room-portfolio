"use client";

import {
  cloneElement,
  isValidElement,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { CarouselButton } from "./CarouselButton";
import { CarouselDots } from "./CarouselDots";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import BubbleHeader from "./BubbleHeader";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Howl } from "howler";

interface BubbleCarouselProps {
  items: React.ReactNode[];
}

interface BubbleCardProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const BubbleCarousel: React.FC<BubbleCarouselProps> = ({ items }) => {
  const buttonSound = useMemo(
    () =>
      new Howl({
        src: ["/sounds/bubble-press.mp3"],
        volume: 0.8,
      }),
    [],
  );

  const playButtonSound = () => {
    const randomPitch = 0.9 + Math.random() * 0.3; // 0.9 – 1.2
    buttonSound.rate(randomPitch);
    buttonSound.play();
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: () => true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const syncIndex = () => onSelect(emblaApi);

    emblaApi.on("select", syncIndex);
    emblaApi.on("reInit", syncIndex);

    startTransition(() => {
      syncIndex();
    });

    return () => {
      emblaApi.off("select", syncIndex);
      emblaApi.off("reInit", syncIndex);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({ watchDrag: !isExpanded });
    }
  }, [emblaApi, isExpanded]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const springConfig = { type: "spring", stiffness: 1000, damping: 20, mass: 2 } as const;

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden">
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 0 : "auto",
          opacity: isExpanded ? 0 : 1,
          marginTop: isExpanded ? 0 : 16,
        }}
        transition={springConfig}
        className="flex items-end justify-between pr-8"
      >
        <BubbleHeader />
      </motion.div>

      <div
        ref={emblaRef}
        className={cn(
          "transition-all duration-500",
          !isExpanded && "cursor-grab active:cursor-grabbing",
        )}
      >
        <div className="flex">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-[0_0_100%] justify-center"
              animate={{
                paddingLeft: isExpanded ? 40 : 80,
                paddingRight: isExpanded ? 40 : 80,
              }}
              transition={springConfig}
            >
              <motion.div
                className="w-full"
                animate={{ height: isExpanded ? 276 : 176 }}
                transition={springConfig}
              >
                {isValidElement<BubbleCardProps>(item)
                  ? cloneElement(item, {
                      isExpanded,
                      onToggle: toggleExpand,
                    })
                  : item}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 0 : "auto", opacity: isExpanded ? 0 : 1 }}
        transition={springConfig}
      >
        <div className="flex items-start justify-between px-8 pb-4">
          <CarouselButton
            direction="prev"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={isExpanded}
            onMouseUp={() => playButtonSound()}
          >
            <ArrowBigLeft className="size-7" />
          </CarouselButton>

          <CarouselDots
            count={items.length}
            selectedIndex={selectedIndex}
            onSelect={(index) => emblaApi?.scrollTo(index)}
            disabled={isExpanded}
          />

          <CarouselButton
            direction="next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={isExpanded}
            onMouseUp={() => playButtonSound()}
          >
            <ArrowBigRight className="size-7" />
          </CarouselButton>
        </div>
      </motion.div>
    </div>
  );
};
