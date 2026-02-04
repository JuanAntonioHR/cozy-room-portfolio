"use client";

import { useEffect, useState } from "react";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import BatteryInfo from "./BatteryInfo";
import { Wifi } from "lucide-react";

export default function BubbleHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(now);

  return (
    <>
      <LiquidGlassCard
        dir="rtl"
        className="flex w-70 justify-end rounded-s-full border-y border-s border-zinc-200/50 px-5 py-2 text-lg text-zinc-50 shadow-xl"
      >
        <h1 className="text-shadow-2xs text-shadow-teal-600">Experience</h1>
      </LiquidGlassCard>

      <LiquidGlassCard className="flex flex-row items-center gap-2 rounded-full border border-zinc-200/50 px-5 py-2 text-lg text-zinc-50 shadow-xl">
        {date}
        <span className="text-zinc-200/50">|</span> {time}
        <span className="text-zinc-200/50">|</span> <BatteryInfo /> <Wifi className="size-4" />
      </LiquidGlassCard>
    </>
  );
}
