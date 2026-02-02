import { useBattery } from "@/hooks/useBattery";
import {
  BatteryWarning,
  BatteryCharging,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
} from "lucide-react";

export default function BatteryInfo() {
  const { level, charging, isSupported, isLoading } = useBattery();

  return (
    <>
      {isSupported ? (
        isLoading ? (
          <BatteryWarning className="size-5" />
        ) : charging ? (
          <BatteryCharging className="size-5" />
        ) : level > 0.8 ? (
          <BatteryFull className="size-5" />
        ) : level > 0.5 ? (
          <BatteryMedium className="size-5" />
        ) : level > 0.2 ? (
          <BatteryLow className="size-5" />
        ) : (
          <Battery className="size-5" />
        )
      ) : (
        <BatteryFull className="size-5" />
      )}
    </>
  );
}
