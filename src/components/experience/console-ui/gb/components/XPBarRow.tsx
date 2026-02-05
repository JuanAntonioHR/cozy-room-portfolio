import XpBar from "@/components/ui/8bit/xp-bar";

interface XPBarRowProps {
  label: string;
  value: number;
}

export default function XPBarRow({ label, value }: XPBarRowProps) {
  return (
    <div className="flex w-full flex-col gap-1 p-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] uppercase">{label}</span>
        <span className="text-[8px]">{value}%</span>
      </div>
      <XpBar value={value} variant="retro" />
    </div>
  );
}
