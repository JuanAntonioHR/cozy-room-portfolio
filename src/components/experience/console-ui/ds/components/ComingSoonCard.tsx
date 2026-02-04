import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Plus } from "lucide-react";

function ComingSoonCard() {
  return (
    <LiquidGlassCard className="flex h-full flex-row items-center justify-center border border-zinc-200/50 px-6 text-lg text-zinc-50 shadow-xl transition-all duration-300 select-none">
      <div className="flex flex-col items-center gap-3 opacity-60">
        <div className="flex size-16 items-center justify-center rounded-full border-2 border-dashed border-zinc-400/50">
          <Plus className="size-8 text-zinc-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-medium text-zinc-300">Coming soon</h2>
          <p className="text-xs text-zinc-400">New experiences on the way</p>
        </div>
      </div>
    </LiquidGlassCard>
  );
}

export default ComingSoonCard;
