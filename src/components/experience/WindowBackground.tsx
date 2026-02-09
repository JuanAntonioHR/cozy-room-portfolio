"use client";

import { ParallaxLayer } from "./ParallaxLayer";
import { useStore } from "@/store";
import { useRef, useEffect } from "react";
import { Group, Mesh } from "three";
import gsap from "gsap";

export default function WindowBackground() {
  const enviroment = useStore((state) => state.enviroment);
  const greenRef = useRef<Group>(null!);
  const blueRef = useRef<Group>(null!);
  const pinkRef = useRef<Group>(null!);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const groups = [
      { ref: greenRef, name: "daylight" },
      { ref: blueRef, name: "cloudy" },
      { ref: pinkRef, name: "sunset" },
    ];

    groups.forEach(({ ref, name }) => {
      if (!ref.current) return;

      const isVisible = enviroment === name;
      const targetOpacity = isVisible ? 1 : 0;

      ref.current.traverse((child) => {
        if (child instanceof Mesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];

          materials.forEach((mat) => {
            gsap.to(mat, {
              opacity: targetOpacity,
              duration: isFirstRender.current ? 0 : 1.2,
              ease: "power2.inOut",
            });
          });
        }
      });
    });

    isFirstRender.current = false;
  }, [enviroment]);

  return (
    <>
      <group ref={greenRef}>
        <ParallaxLayer
          texturePath="/textures/green/BG0.png"
          defaultPosition={[-9.4, 0.8, -4.5]}
          defaultSize={5}
        />
        <ParallaxLayer
          texturePath="/textures/green/BG1.png"
          defaultPosition={[-12, 0.8, -5.6]}
          defaultSize={7}
        />
        <ParallaxLayer
          texturePath="/textures/green/BG2.png"
          defaultPosition={[-13.0, 1.3, -5.9]}
          defaultSize={9}
        />
        <ParallaxLayer
          texturePath="/textures/green/BG3.png"
          defaultPosition={[-15, 1.3, -6.8]}
          defaultSize={11}
        />
      </group>

      <group ref={blueRef}>
        <ParallaxLayer
          texturePath="/textures/blue/BG0.png"
          defaultPosition={[-9.4, 0.8, -4.5]}
          defaultSize={5}
        />
        <ParallaxLayer
          texturePath="/textures/blue/BG1.png"
          defaultPosition={[-12, 0.8, -5.6]}
          defaultSize={7}
        />
        <ParallaxLayer
          texturePath="/textures/blue/BG2.png"
          defaultPosition={[-13.0, 1.3, -5.9]}
          defaultSize={9}
        />
        <ParallaxLayer
          texturePath="/textures/blue/BG3.png"
          defaultPosition={[-15, 1.3, -6.8]}
          defaultSize={11}
        />
      </group>

      <group ref={pinkRef}>
        <ParallaxLayer
          texturePath="/textures/pink/BG0.png"
          defaultPosition={[-9.4, 0.8, -4.5]}
          defaultSize={5}
        />
        <ParallaxLayer
          texturePath="/textures/pink/BG1.png"
          defaultPosition={[-12, 0.8, -5.6]}
          defaultSize={7}
        />
        <ParallaxLayer
          texturePath="/textures/pink/BG2.png"
          defaultPosition={[-13.0, 1.3, -5.9]}
          defaultSize={9}
        />
        <ParallaxLayer
          texturePath="/textures/pink/BG3.png"
          defaultPosition={[-15, 1.3, -6.8]}
          defaultSize={11}
        />
      </group>
    </>
  );
}
