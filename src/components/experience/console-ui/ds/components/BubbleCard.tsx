import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import Image from "next/image";

const ExperienceInfo = {
  image: "/images/petco.png",
  title: "Software Eng. Intern",
  company: "Petco",
  date: "May 2025 - Jan 2026",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  skills: ["SQL", "Jira"],
};

export default function BubbleCard() {
  return (
    <LiquidGlassCard className="flex h-full flex-row items-center border border-zinc-200/50 px-6 text-lg text-zinc-50 shadow-xl">
      <Image
        src={ExperienceInfo.image}
        alt={ExperienceInfo.company}
        width={120}
        height={120}
        className="z-10 rounded-lg"
      />
      <div className="flex h-full flex-col justify-between">
        <div>
          <h2 className="text-2xl text-shadow-2xs text-shadow-teal-600">{ExperienceInfo.title}</h2>
          <div className="flex w-full flex-row justify-between">
            <h3 className="text-xs text-amber-300 text-shadow-2xs text-shadow-zinc-900/25">
              {ExperienceInfo.company}
            </h3>
            <p className="text-[10px]">{ExperienceInfo.date}</p>
          </div>
        </div>
        <p className="line-clamp-2 text-xs">{ExperienceInfo.description}</p>
        <div className="flex flex-row gap-2">
          {ExperienceInfo.skills.map((skill, index) => (
            <LiquidGlassCard
              key={index}
              className="flex w-fit flex-row items-center rounded-full border border-zinc-200/50 px-2 py-1 text-zinc-50 shadow-xl"
            >
              <p className="text-[10px]">{skill}</p>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </LiquidGlassCard>
  );
}
