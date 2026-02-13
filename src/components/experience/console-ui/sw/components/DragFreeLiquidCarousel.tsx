"use client";

import { useMemo, useState } from "react";
import LiquidHeader from "./LiquidHeader";
import useEmblaCarousel from "embla-carousel-react";
import LiquidCard from "./LiquidCard";
import { LiquidButton } from "@/components/kokonutui/liquid-glass-card";
import { AnimatePresence, motion } from "motion/react";
import { ProjectsInfo, ProjectInterface } from "@/data/ProjectsInfo";
import CustomModal from "./CustomModal";
import { Howl } from "howler";
import { useStore } from "@/store";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";
import useEmblaCarouselWheelGestures from "embla-carousel-wheel-gestures";

export default function DragFreeLiquidCarousel() {
  const isSoundEnabled = useStore((state) => state.isSoundEnabled);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const bubbleSound = useMemo(
    () =>
      new Howl({
        src: ["/sounds/bubble-card.mp3"],
        volume: 0.8,
      }),
    [],
  );

  const [emblaRef] = useEmblaCarousel(
    {
      dragFree: true,
      active: !isOpen,
    },
    [useEmblaCarouselWheelGestures()],
  );

  const handleProjectClick = (project: ProjectInterface) => {
    setSelectedProject(project);
    setIsOpen(true);
    if (!isSoundEnabled) return;
    bubbleSound.rate(1);
    bubbleSound.play();
  };

  const handleClose = () => {
    if (!isOpen) return;
    setIsClosing(true);
    setIsOpen(false);
    if (!isSoundEnabled) return;
    bubbleSound.rate(0.8);
    bubbleSound.play();
  };

  const currentTitle = isOpen ? selectedProject?.title : hoveredTitle || "Projects";

  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-6 py-8">
      <LiquidHeader />
      <div ref={emblaRef} className="mt-auto cursor-grab px-8 active:cursor-grabbing">
        <div className="flex gap-3 pr-8">
          {ProjectsInfo.map((project, index) => (
            <div key={index} className="flex w-full flex-[0_0_30%] justify-center">
              <LiquidCard
                title={project.title}
                image={project.images[0]}
                onClick={() => handleProjectClick(project)}
                isVisible={!isOpen}
                onMouseEnter={() => setHoveredTitle(project.title)}
                onMouseLeave={() => setHoveredTitle(null)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="z-10 flex w-full flex-row items-center justify-between px-8">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentTitle}
            initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xl text-zinc-50"
          >
            {currentTitle}
          </motion.h1>
        </AnimatePresence>
        <div className="flex h-14 flex-row items-center gap-5">
          <AnimatePresence mode="wait">
            {isOpen && selectedProject?.url && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 1000, damping: 20 }}
              >
                <LiquidButton
                  variant="ghost"
                  size="icon"
                  className="size-14 rounded-full bg-transparent text-zinc-50 transition-all hover:bg-zinc-200/70 hover:text-zinc-800"
                  onClick={() => {
                    if (isOpen && selectedProject?.url) {
                      window.open(selectedProject.url, "_blank");
                    }
                  }}
                >
                  <ExternalLink className="size-7" />
                </LiquidButton>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isOpen && selectedProject?.github && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 1000, damping: 20 }}
              >
                <LiquidButton
                  variant="ghost"
                  size="icon"
                  className="size-14 rounded-full bg-transparent text-zinc-50 transition-all hover:bg-zinc-200/70 hover:text-zinc-800"
                  onClick={() => {
                    if (isOpen && selectedProject?.github) {
                      window.open(selectedProject.github, "_blank");
                    }
                  }}
                >
                  <SiGithub className="size-7" />
                </LiquidButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <CustomModal
            isClosing={isClosing}
            selectedProject={selectedProject}
            handleClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
