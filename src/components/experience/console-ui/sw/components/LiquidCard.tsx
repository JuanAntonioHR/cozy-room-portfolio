import Image from "next/image";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { motion } from "motion/react";

interface LiquidCardProps {
  title: string;
  image: string;
  onClick?: () => void;
  isVisible?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const imageVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.1 },
};

export default function LiquidCard({
  title,
  image,
  onClick,
  isVisible = true,
  onMouseEnter,
  onMouseLeave,
}: LiquidCardProps) {
  return (
    <motion.button
      initial="idle"
      whileHover="hover"
      className="size-full"
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <LiquidGlassCard className="flex size-full items-center justify-center rounded-4xl border border-zinc-200/50 text-zinc-50 shadow-xl transition-all duration-300 select-none hover:bg-zinc-200/20 hover:shadow-lg hover:shadow-zinc-50/20">
        <motion.div
          variants={imageVariants}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <Image src={image} alt={title} width={160} height={160} className="rounded-2xl" />
        </motion.div>
      </LiquidGlassCard>
    </motion.button>
  );
}
