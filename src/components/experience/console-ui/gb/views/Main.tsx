"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/8bit/tabs";
import Bibliography from "./Bibliography";
import Skills from "./Skills";
import Acknowledgments from "./Acknowledgments";
import "@/app/retro-globals.css";
import { Howl } from "howler";

import { useStore } from "@/store";

export default function Main() {
  const isSoundEnabled = useStore((state) => state.isSoundEnabled);

  const buttonSound = new Howl({
    src: ["/sounds/button-press.mp3"],
    volume: 0.5,
  });

  const handleTabChange = () => {
    if (!isSoundEnabled) return;
    const randomPitch = 0.9 + Math.random() * 0.3; // 0.9 – 1.2
    buttonSound.rate(randomPitch);
    buttonSound.play();
  };

  return (
    <div className="bg-background text-foreground retro theme-gameboy h-full w-full select-none">
      <Tabs defaultValue="bio" className="flex h-full flex-col overflow-hidden">
        <TabsList className="w-full shrink-0 justify-between">
          <TabsTrigger value="bio" className="flex-1 text-[10px]" onClick={handleTabChange}>
            BIO
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex-1 text-[10px]" onClick={handleTabChange}>
            SKILLS
          </TabsTrigger>
          <TabsTrigger value="thanks" className="flex-1 text-[10px]" onClick={handleTabChange}>
            THANKS
          </TabsTrigger>
        </TabsList>
        <div className="relative flex-1 overflow-hidden">
          <TabsContent value="bio" className="absolute inset-0 m-0 flex flex-col p-0">
            <Bibliography />
          </TabsContent>
          <TabsContent value="skills" className="absolute inset-0 m-0 flex flex-col p-0">
            <Skills />
          </TabsContent>
          <TabsContent value="thanks" className="absolute inset-0 m-0 flex flex-col p-0">
            <Acknowledgments />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
