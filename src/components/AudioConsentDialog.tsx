"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/8bit/dialog";
import { Button } from "@/components/ui/8bit/button";
import { useStore } from "@/store";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export function AudioConsentDialog() {
  const setAudioSettings = useStore((state) => state.setAudioSettings);
  const [open, setOpen] = useState(true);

  const handleContinue = (withSound: boolean = false) => {
    setOpen(false);
    setAudioSettings({
      isMusicEnabled: withSound,
      isSoundEnabled: withSound,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) handleContinue();
        setOpen(value);
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Enable Audio</DialogTitle>
          <DialogDescription className="text-zinc-400">
            This portfolio contains ambient music and sounds that enrich the experience.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-wrap">
          <Button variant="secondary" onClick={() => handleContinue(false)}>
            <VolumeX className="mr-2 size-4" />
            Continue without sound
          </Button>

          <Button onClick={() => handleContinue(true)}>
            <Volume2 className="mr-2 size-4" />
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
