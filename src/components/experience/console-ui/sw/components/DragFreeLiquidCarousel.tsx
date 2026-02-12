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

  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    active: !isOpen,
  });

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
      <div className="z-10 flex flex-row items-center gap-8 px-8">
        <div className="flex flex-row items-center gap-5">
          <LiquidButton
            variant="ghost"
            size="icon"
            className="size-14 rounded-full bg-transparent transition-all hover:bg-zinc-200/70"
            onClick={() => {
              if (isOpen && selectedProject?.url) {
                window.open(selectedProject.url, "_blank");
              }
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen && selectedProject?.url && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink className="size-7 text-zinc-50" />
                </motion.div>
              )}
            </AnimatePresence>
          </LiquidButton>
          <LiquidButton
            variant="ghost"
            size="icon"
            className="size-14 rounded-full bg-transparent transition-all hover:bg-zinc-200/70"
            onClick={() => {
              if (isOpen && selectedProject?.github) {
                window.open(selectedProject.github, "_blank");
              }
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen && selectedProject?.github && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.2 }}
                >
                  <SiGithub className="size-7 text-zinc-50" />
                </motion.div>
              )}
            </AnimatePresence>
          </LiquidButton>
        </div>
        <div className="relative overflow-visible">
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
