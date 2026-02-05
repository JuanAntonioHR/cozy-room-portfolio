import React from "react";
import { ScrollArea } from "@/components/ui/8bit/scroll-area";
import XPBarRow from "../components/XPBarRow";
import { skillsData } from "@/data/AboutInfo";

export default function Skills() {
  return (
    <div className="bg-background flex h-full flex-col overflow-hidden p-2">
      <h2 className="border-foreground mb-4 shrink-0 border-b-4 px-2 pb-2 text-sm">TECH SKILLS</h2>
      <ScrollArea className="min-h-0 flex-1 pr-4">
        <div className="flex flex-col gap-2">
          {skillsData.map((skill) => (
            <React.Fragment key={skill.label}>
              <XPBarRow label={skill.label} value={skill.value} />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
