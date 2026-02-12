"use client";

import { useEffect } from "react";
import { useStore, type Enviroment } from "@/store";

export function HydrationWatcher() {
  const setEnviroment = useStore((state) => state.setEnviroment);

  useEffect(() => {
    const calculateEnviroment = () => {
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 6 && hours < 17) {
        return "daylight" as Enviroment;
      } else if ((hours >= 17 && hours < 18) || (hours >= 5 && hours < 6)) {
        return "sunset" as Enviroment;
      } else {
        return "cloudy" as Enviroment;
      }
    };

    setEnviroment(calculateEnviroment());
  }, [setEnviroment]);

  return null;
}
