import { button, useControls } from "leva";
import { useEffect } from "react";
import { GodraySettings } from "./Godray";

interface GodrayBuilderProps {
  settings: GodraySettings;
  onChange: (settings: GodraySettings) => void;
}

export const GodrayBuilder = ({ settings, onChange }: GodrayBuilderProps) => {
  const controls = useControls("Godray Settings", {
    position: {
      value: settings.position || [0, 0, 0],
      step: 0.1,
    },
    rotation: {
      value: settings.rotation || [0, 0, 0],
      min: -2,
      max: 2,
      step: 0.01,
    },
    color: {
      value: settings.color || "white",
    },
    topRadius: {
      value: settings.topRadius || 3,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    bottomRadius: {
      value: settings.bottomRadius || 2,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    height: {
      value: settings.height || 10,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    timeSpeed: {
      value: settings.timeSpeed || 0.1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    noiseScale: {
      value: settings.noiseScale || 5,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    smoothBottom: {
      value: settings.smoothBottom || 0.1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    smoothTop: {
      value: settings.smoothTop || 0.9,
      min: 0,
      max: 1,
      step: 0.001,
    },
    fresnelPower: {
      value: settings.fresnelPower || 5,
      min: 1,
      max: 10,
      step: 0.1,
    },
    "Export Settings": button(() => {
      const json = JSON.stringify(controls, null, 2);
      console.log("Godray Settings:", json);
      navigator.clipboard?.writeText(json);
    }),
  });
  useEffect(() => {
    onChange(controls);
  }, [controls, onChange]);

  return null;
};
