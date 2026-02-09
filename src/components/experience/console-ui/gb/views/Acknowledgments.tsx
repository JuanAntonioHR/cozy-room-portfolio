import { ScrollArea } from "@/components/ui/8bit/scroll-area";
import { Card } from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";

export default function Acknowledgments() {
  return (
    <div className="bg-background flex h-full flex-col gap-4 overflow-hidden py-2">
      <h2 className="border-foreground shrink-0 px-4 pt-2 text-sm uppercase">Acknowledgments</h2>
      <ScrollArea className="min-h-0 flex-1 pr-4">
        <div className="flex flex-col gap-4 pb-4">
          <Card className="gap-4 p-5">
            <h3 className="text-xs uppercase">Inspiration</h3>
            <p className="text-[10px] leading-relaxed">
              <a
                href="https://www.youtube.com/@DriftAwayAmbience7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary font-bold underline transition-colors"
              >
                Drift Away Ambience
              </a>
              : This channel was my primary design inspiration. I often work with their videos in
              the background; I love the music and the cozy Minecraft aesthetic paired with shaders
              and ambient sounds.
            </p>

            <Separator />

            <h3 className="text-xs uppercase">Tools & Resources</h3>
            <ul className="flex list-none flex-col gap-2 p-0 text-[10px] leading-relaxed">
              <li>
                <a
                  href="https://r3f.docs.pmnd.rs/getting-started/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  R3F
                </a>
                : The foundation for integrating Three.js into React.
              </li>
              <li>
                <a
                  href="https://gsap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  GSAP
                </a>
                : Powers the smooth 3D animations within the scene.
              </li>
              <li>
                <a
                  href="https://motion.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  Motion
                </a>
                : Used for fluid UI transitions and interactions.
              </li>
              <li>
                <a
                  href="https://www.8bitcn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  8bitcn
                </a>
                : The source for this project&apos;s retro UI style.
              </li>
              <li>
                <a
                  href="https://kokonutui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  KokonutUI Glass
                </a>
                : The most performant glass component base I found.
              </li>
            </ul>

            <Separator />

            <h3 className="text-xs uppercase">Learning & Tutorials</h3>
            <ul className="flex list-none flex-col gap-2 p-0 text-[10px] leading-relaxed">
              <li>
                <a
                  href="https://threejs-journey.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  Three.js Journey
                </a>
                : An incredible and comprehensive course for mastering Three.js.
              </li>
              <li>
                <a
                  href="https://youtu.be/qCqt0E-NXqU?si=1KJOaQxMIf5Qw0aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  Fake Godrays in Three.js
                </a>
                : A tutorial that introduced me to shaders and environmental lighting.
              </li>
              <li>
                <a
                  href="https://www.domestika.org/en/courses/1404-introduction-to-voxel-art-for-character-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-bold underline"
                >
                  Voxel Art Intro
                </a>
                : Provided the foundational skills for my voxel art modeling.
              </li>
            </ul>

            <Separator />

            <h3 className="text-xs uppercase">Music</h3>
            <p className="text-[10px] leading-relaxed">
              <span className="italic">&ldquo;Deep Relaxation&rdquo;</span>
              <br />
              by{" "}
              <a
                href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900045"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary font-bold underline transition-colors"
              >
                Kevin MacLeod
              </a>{" "}
              (incompetech.com)
              <br />
              Licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary underline transition-colors"
              >
                Creative Commons Attribution 4.0 International
              </a>
              .
              <br />
              Edited for looping and background use.
            </p>

            <Separator />

            <h3 className="text-xs uppercase">Special Thanks</h3>
            <p className="text-[10px] leading-relaxed">
              To my family and friends who supported me during late-night coding sessions and design
              iterations. And also to the big support and knowledge that ChatGPT gave me.
            </p>
          </Card>

          <div className="mt-4 mb-4 text-center text-[8px] uppercase opacity-70">
            Thank you for visiting!
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
