import { GodraySettings } from "@/components/experience/Godray";

export interface EnviromentSettings {
    name: string;
    intensity: number;
    preset: EnvironmentPreset;
    directionalLight: {
        position: [number, number, number];
        intensity: number;
        color: string;
    };
    godraySettings: GodraySettings;
}

export type EnvironmentPreset =
  | "night"
  | "city"
  | "dawn"
  | "forest"
  | "park"
  | "studio"
  | "warehouse"
  | "apartment"
  | "lobby"
  | "sunset";

export const enviromentSettings: EnviromentSettings[] = [
    {
        name: "daylight",
        intensity: 1,
        preset: "lobby",
        directionalLight: {
            position: [-6.1, 4.9, 1.9],
            intensity: 5.5,
            color: "#ffd2a6",
        },
        godraySettings: {
          position: [-0.6, -0.6, -0.6],
          rotation: [-0.44, 0.21, -1.47],
          color: "#ffcc80",
          topRadius: 0.8,
          bottomRadius: 0.8,
          height: 2.5,
          timeSpeed: 0.1,
          noiseScale: 4.5,
          smoothBottom: 0.4,
          smoothTop: 0.7,
          fresnelPower: 3,
        }
    },
    {
        name: "sunset",
        intensity: 0.5,
        preset: "sunset",
        directionalLight: {
            position: [-3.7, 2.5, 1.2],
            intensity: 4.2,
            color: "#ffb07c",
        },
        godraySettings: {
          position: [-0.7, -0.4, -0.5],
          rotation: [-0.4, 0.21, -1.47],
          color: "#ff9f68",
          topRadius: 0.8,
          bottomRadius: 0.8,
          height: 2.5,
          timeSpeed: 0.08,
          noiseScale: 4.5,
          smoothBottom: 0.45,
          smoothTop: 0.66,
          fresnelPower: 3.4,
        }
    },
    {
        name: "cloudy",
        intensity: 0.5,
        preset: "forest",
        directionalLight: {
            position: [-5.6, 7.3, 1.6],
            intensity: 3.0,
            color: "#96b9fe",
        },
        godraySettings: {
          position: [-1.1, -0.3, 0],
          rotation: [-0.63, 0.25, -1.40],
          color: "#bac4cf",
          topRadius: 0.8,
          bottomRadius: 0.8,
          height: 2.5,
          timeSpeed: 0.05,
          noiseScale: 4.5,
          smoothBottom: 0.45,
          smoothTop: 0.29,
          fresnelPower: 5,
        }
    }
]