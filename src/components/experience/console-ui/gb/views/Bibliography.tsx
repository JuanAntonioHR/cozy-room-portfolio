import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { ScrollArea } from "@/components/ui/8bit/scroll-area";
import { Separator } from "@/components/ui/8bit/separator";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Bibliography() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden p-2">
      <Card className="flex h-full flex-col gap-2 border-none bg-transparent pb-0 shadow-none">
        <CardHeader className="flex shrink-0 flex-row items-center gap-4 p-4">
          <div className="border-foreground relative h-24 w-24 overflow-hidden border-4">
            <Image src="/images/profile.png" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <CardTitle className="text-xl">Juan Antonio HR</CardTitle>
            <Badge variant="secondary" className="w-fit text-[8px]">
              Web Developer & Designer
            </Badge>
            <div className="flex gap-2">
              <Button
                aria-label="Github"
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                onClick={() => window.open("https://github.com/JuanAntonioHR", "_blank")}
              >
                <SiGithub size={14} />
              </Button>
              <Button
                aria-label="Linkedin"
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                onClick={() => window.open("https://www.linkedin.com/in/jantoniohr/", "_blank")}
              >
                <FaLinkedin size={14} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-2 shrink-0" />
        <CardContent className="flex flex-1 flex-col overflow-hidden p-2 pt-0">
          <ScrollArea className="min-h-0 flex-1 pr-4">
            <div className="space-y-4 text-[10px] leading-relaxed">
              <p>
                I&apos;m a web designer and full-stack developer who loves building interactive,
                expressive interfaces rather than ordinary websites.
              </p>
              <p>
                I&apos;m particularly drawn to juicy interactions, cozy atmospheres, and visuals
                inspired by voxel art, pixel art, and cubic games. I believe great experiences can
                be both creative and practical, so I always aim for solutions that are accessible,
                responsive, performant, and thoughtfully designed.
              </p>
              <p>
                When I&apos;m not coding, you can find me diving into nintendo games, working magic
                on consoles, UI animations, or enjoying a quiet moment in a virtual cozy room just
                like this one :3
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
