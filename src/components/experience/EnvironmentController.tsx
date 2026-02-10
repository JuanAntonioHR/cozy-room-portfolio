import { Environment, Sparkles } from "@react-three/drei";
import { enviromentSettings } from "@/data/EnviromentSettings";
import { useStore } from "@/store";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function EnvironmentController() {
  // const enviromentControls = useControls("Environment", {
  //   intensity: { value: 1, min: 0, max: 1, step: 0.01 },
  //   preset: {
  //     value: "lobby" as EnvironmentPreset,
  //     options: [
  //       "city",
  //       "dawn",
  //       "forest",
  //       "night",
  //       "park",
  //       "studio",
  //       "warehouse",
  //       "apartment",
  //       "lobby",
  //       "sunset",
  //     ],
  //   },
  // });
  // const { x, y, z, color, intensity } = useControls("Directional Light", {
  //   x: { value: -6.1, min: -10, max: 10, step: 0.1 },
  //   y: { value: 4.9, min: -10, max: 10, step: 0.1 },
  //   z: { value: 1.9, min: -10, max: 10, step: 0.1 },
  //   color: "#ffd2a6",
  //   intensity: { value: 5.5, min: 0, max: 10, step: 0.1 },
  // });
  const enviroment = useStore((state) => state.enviroment);
  const isEffectsEnabled = useStore((state) => state.isEffectsEnabled);
  const [activeSettings, setActiveSettings] = useState({
    intensity: enviromentSettings[0].intensity,
    dirIntensity: enviromentSettings[0].directionalLight.intensity,
    dirPos: enviromentSettings[0].directionalLight.position,
    dirColor: enviromentSettings[0].directionalLight.color,
    preset: enviromentSettings[0].preset,
  });

  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const settingsRef = useRef(activeSettings);

  useEffect(() => {
    settingsRef.current = activeSettings;
  }, [activeSettings]);

  useEffect(() => {
    const target = enviromentSettings.find((s) => s.name === enviroment);
    if (!target) return;

    if (tweenRef.current) tweenRef.current.kill();

    const startSettings = { ...settingsRef.current };

    const animProxy = {
      intensity: startSettings.intensity,
      dirIntensity: startSettings.dirIntensity,
      dirPosX: startSettings.dirPos[0],
      dirPosY: startSettings.dirPos[1],
      dirPosZ: startSettings.dirPos[2],
      dirColor: startSettings.dirColor,
      preset: startSettings.preset,
    };

    tweenRef.current = gsap.to(animProxy, {
      intensity: target.intensity,
      dirIntensity: target.directionalLight.intensity,
      dirPosX: target.directionalLight.position[0],
      dirPosY: target.directionalLight.position[1],
      dirPosZ: target.directionalLight.position[2],
      dirColor: target.directionalLight.color,
      duration: 1.2,
      ease: "power2.inOut",
      onStart: () => {
        setActiveSettings((prev) => ({ ...prev, preset: target.preset }));
      },
      onUpdate: () => {
        setActiveSettings({
          intensity: animProxy.intensity,
          dirIntensity: animProxy.dirIntensity,
          dirPos: [animProxy.dirPosX, animProxy.dirPosY, animProxy.dirPosZ],
          dirColor: animProxy.dirColor,
          preset: target.preset,
        });
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [enviroment]);

  return (
    <>
      <Environment
        preset={activeSettings.preset}
        background
        environmentIntensity={
          isEffectsEnabled ? activeSettings.intensity : activeSettings.intensity / 2
        }
      />
      <directionalLight
        position={activeSettings.dirPos}
        intensity={activeSettings.dirIntensity}
        color={activeSettings.dirColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={4}
      />
      <Sparkles
        count={15}
        scale={1.3}
        position={[-4.7, 0.3, -1.6]}
        size={3}
        speed={0.2}
        opacity={0.4}
        color="#ffd8a8"
      />
    </>
  );
}
