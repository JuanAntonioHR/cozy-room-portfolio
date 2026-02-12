import { motion } from "motion/react";
import { ProjectInterface } from "@/data/ProjectsInfo";
import { X } from "lucide-react";
import { LiquidButton, LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import ImageCarousel from "./ImageCarousel";

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
        <LiquidGlassCard className="pointer-events-auto flex h-75 w-full flex-col gap-4 overflow-hidden rounded-4xl border border-zinc-200/50 text-zinc-50 shadow-xl">
          <div className="flex h-44 w-full flex-row gap-10">
            <ImageCarousel images={selectedProject?.images || []} />
            <LiquidButton
              size="icon"
              variant="ghost"
              className="size-14 cursor-pointer rounded-full bg-transparent text-zinc-300 transition-colors hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
              onClick={handleClose}
            >
              <X className="size-7" />
            </LiquidButton>
          </div>

          <p className="text-xs text-zinc-300">{selectedProject?.description}</p>

          <div className="flex flex-row gap-2">
            <div className="flex items-center justify-center rounded-full border bg-zinc-200 px-2 py-1">
              <p className="text-[10px] font-medium text-zinc-900">Role</p>
            </div>

            <LiquidGlassCard className="flex w-fit flex-row items-center rounded-full border border-zinc-200/50 px-2 py-1 text-zinc-50 shadow-xl">
              <p className="line-clamp-1 text-[10px] text-nowrap">{selectedProject?.role}</p>
            </LiquidGlassCard>

            <div className="ml-1 flex items-center justify-center rounded-full border bg-zinc-200 px-2 py-1">
              <p className="text-[10px] font-medium text-zinc-900">Stack</p>
            </div>

            <div className="flex gap-2">
              {selectedProject?.technologies.map((tech, index) => (
                <LiquidGlassCard
                  key={index}
                  className="flex w-fit flex-row items-center rounded-full border border-zinc-200/50 px-2 py-1 text-zinc-50 shadow-xl"
                >
                  <p className="line-clamp-1 text-[10px] text-nowrap">{tech}</p>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </LiquidGlassCard>
      </motion.div>
    </>
  );
}

export default CustomModal;
