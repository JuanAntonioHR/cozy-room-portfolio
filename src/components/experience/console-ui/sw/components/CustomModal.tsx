import { motion } from "motion/react";
import { ProjectInterface } from "@/data/ProjectsInfo";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LiquidButton, LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";

interface CustomModalProps {
  selectedProject: ProjectInterface | null;
  handleClose: () => void;
  isClosing: boolean;
}

function CustomModal({ selectedProject, handleClose, isClosing }: CustomModalProps) {
  return (
    <>
      <div
        className={`absolute inset-0 z-40 ${isClosing ? "hidden" : "block"}`}
        onClick={handleClose}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 1000, damping: 20 }}
        className="pointer-events-none absolute inset-8 z-50 flex items-center justify-center gap-4"
      >
        <LiquidGlassCard className="pointer-events-auto relative flex h-75 w-full flex-row gap-4 overflow-hidden rounded-4xl border border-zinc-200/50 text-zinc-50 shadow-xl">
          <div className="flex w-50 flex-col gap-3">
            {selectedProject && (
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={160}
                height={160}
                className="z-60 rounded-2xl"
              />
            )}
            {selectedProject?.github && (
              <LiquidButton
                variant="ghost"
                className="flex w-full flex-row items-center justify-center gap-2 rounded-full bg-transparent text-zinc-50 transition-colors hover:bg-zinc-200/70"
                onClick={() => window.open(selectedProject.github, "_blank")}
              >
                <span>
                  <SiGithub className="size-4" />
                </span>
                <span>GitHub</span>
              </LiquidButton>
            )}
            {selectedProject?.url && (
              <LiquidButton
                variant="ghost"
                className="flex w-full flex-row items-center justify-center gap-2 rounded-full bg-transparent text-zinc-50 transition-colors hover:bg-zinc-200/70"
                onClick={() => window.open(selectedProject.url, "_blank")}
              >
                <ExternalLink className="size-4" />
                Visit
              </LiquidButton>
            )}
          </div>

          <p className="scrollbar-none overflow-y-auto text-xs text-zinc-300">
            {selectedProject?.description}
          </p>

          <LiquidButton
            size="icon"
            variant="ghost"
            className="size-14 cursor-pointer rounded-full bg-transparent text-zinc-300 transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
            onClick={handleClose}
          >
            <X className="size-7" />
          </LiquidButton>
        </LiquidGlassCard>
      </motion.div>
    </>
  );
}

export default CustomModal;
