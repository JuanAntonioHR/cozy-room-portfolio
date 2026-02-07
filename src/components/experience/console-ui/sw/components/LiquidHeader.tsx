"use client";
import { useEffect, useState } from "react";
import { Wifi } from "lucide-react";
import BatteryInfo from "../../components/BatteryInfo";

export default function LiquidHeader() {
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
    <div className="z-10 flex items-center justify-between px-8 text-zinc-50">
      <div className="flex flex-col text-end">
        <span className="text-lg">{time}</span>
        <span className="text-sm">{date}</span>
      </div>
      <div className="flex items-center gap-4">
        <Wifi className="size-4" />
        <BatteryInfo />
      </div>
    </div>
  );
}
