import { LiquidButton, LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Howl } from "howler";
import { useEffect, useMemo, useCallback } from "react";
import { ExperienceInfoType } from "@/data/ExperienceInfo";
import { useStore } from "@/store";

interface BubbleCardProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  experience: ExperienceInfoType;
}

export default function BubbleCard({ isExpanded, onToggle, experience }: BubbleCardProps) {
  const isSoundEnabled = useStore((state) => state.isSoundEnabled);

  const openSound = useMemo(
    () =>
      new Howl({
        src: ["/sounds/bubble-card.mp3"],
      }),
    [],
  );

  const playCardSound = useCallback(() => {
    if (!isSoundEnabled) return;
    if (isExpanded) {
      openSound.rate(0.8);
      openSound.play();
    } else {
      openSound.rate(1);
      openSound.play();
    }
  }, [isSoundEnabled, isExpanded, openSound]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case " ":
          event.preventDefault();
          onToggle?.();
          playCardSound();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle, playCardSound]);

  return (
    <LiquidGlassCard
      onClick={() => {
        if (!isExpanded) {
          onToggle?.();
          playCardSound();
        }
      }}
      className={cn(
        "flex h-full flex-row items-start rounded-2xl border border-zinc-200/50 px-6 text-lg text-zinc-50 shadow-xl transition-all duration-300",
        !isExpanded && "cursor-pointer select-none",
      )}
    >
      <Image
        src={experience.image}
        alt={experience.company}
        width={120}
        height={120}
        className="z-10 rounded-xl"
      />
      <div className="flex h-full flex-1 justify-between">
        <div
          className={cn(
            "flex h-full flex-col justify-between overflow-hidden",
            isExpanded ? "scrollbar-none gap-2 overflow-y-auto pr-1" : "",
          )}
        >
          <div>
            <h2 className="text-2xl text-shadow-2xs text-shadow-teal-600">{experience.title}</h2>
            <div className="flex w-full flex-row justify-between">
              <h3 className="text-xs text-amber-300 text-shadow-2xs text-shadow-zinc-900/25">
                {experience.company}
              </h3>
              <p className="text-[10px]">{experience.date}</p>
            </div>
          </div>

          <p
            className={cn(
              "max-w-[55ch] text-xs whitespace-pre-line text-zinc-200 transition-all duration-300",
              isExpanded ? "leading-[1.6]" : "line-clamp-2",
            )}
          >
            {experience.description}
          </p>

          <div className={cn("flex flex-wrap gap-2", !isExpanded && "max-h-[28px]")}>
            {experience.skills.map((skill, index) => (
              <LiquidGlassCard
                key={index}
                className="flex w-fit flex-row items-center rounded-full border border-zinc-200/50 px-2 py-1 text-zinc-50 shadow-xl"
              >
                <p className="line-clamp-1 text-[10px] text-nowrap">{skill}</p>
              </LiquidGlassCard>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-end pl-4">
          <LiquidButton
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
              playCardSound();
            }}
            size="icon"
            variant="ghost"
            className={cn(
              "cursor-pointer overflow-hidden rounded-full bg-transparent text-zinc-300 transition-all hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70",
              isExpanded ? "size-14" : "size-0 opacity-0",
            )}
          >
            <X className={cn("transition-transform", isExpanded ? "size-7" : "size-0")} />
          </LiquidButton>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
