"use client";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { GodrayBuilder } from "./GodrayBuilder";
import { enviromentSettings } from "@/data/EnviromentSettings";
import { useStore } from "@/store";
import gsap from "gsap";

const GodrayMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("white") },
    uNoiseScale: { value: 5 },
    uTimeSpeed: { value: 0.1 },
    uSmoothTop: { value: 0.9 },
    uSmoothBottom: { value: 0.1 },
    uFresnelPower: { value: 5 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPositionWorld;
    varying vec3 vNormalLocal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vNormalLocal = normal;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vPositionWorld = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uNoiseScale;
    uniform float uTimeSpeed;
    uniform float uSmoothTop;
    uniform float uSmoothBottom;
    uniform float uFresnelPower;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPositionWorld;
    varying vec3 vNormalLocal;

    // Worley Noise Implementation
    vec3 hash( vec3 p ) {
        p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                  dot(p,vec3(269.5,183.3, 246.1)),
                  dot(p,vec3(113.5,271.9, 124.6)) );
        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }

    float worley( vec3 p ) {
        vec3 n = floor( p );
        vec3 f = fract( p );
        float res = 8.0;
        for( int k=-1; k<=1; k++ ) {
            for( int j=-1; j<=1; j++ ) {
                for( int i=-1; i<=1; i++ ) {
                    vec3 g = vec3( float(i), float(j), float(k) );
                    vec3 r = g - f + hash( n + g );
                    float d = dot( r, r );
                    res = min( res, d );
                }
            }
        }
        return sqrt( res );
    }

    void main() {
      vec3 viewDirection = normalize(cameraPosition - vPositionWorld);
      float fresnel = pow(abs(dot(vNormal, viewDirection)), uFresnelPower);
      
      float noise = worley(vNormalLocal * uNoiseScale + uTime * uTimeSpeed);
      
      float smoothEdges = smoothstep(0.0, uSmoothBottom, vUv.y) * smoothstep(1.0, uSmoothTop, vUv.y);
      
      float alpha = noise * fresnel * smoothEdges;
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
};

export interface GodraySettings {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  timeSpeed: number;
  noiseScale: number;
  topRadius: number;
  bottomRadius: number;
  height: number;
  smoothBottom: number;
  smoothTop: number;
  fresnelPower: number;
}

export interface GodrayProps {
  settings?: GodraySettings;
  debug?: boolean;
}

export const Godray = ({ debug = false, ...props }: GodrayProps) => {
  const [settings, setSettings] = useState<GodraySettings>(enviromentSettings[0].godraySettings);
  const enviroment = useStore((state) => state.enviroment);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const target = enviromentSettings.find((s) => s.name === enviroment)?.godraySettings;
    if (!target) return;

    if (tweenRef.current) tweenRef.current.kill();

    const startSettings = { ...settingsRef.current };

    // We create a proxy object to handle the animation of nested arrays (position, rotation)
    // and color smoothly with GSAP
    const animProxy = {
      ...startSettings,
      posX: startSettings.position[0],
      posY: startSettings.position[1],
      posZ: startSettings.position[2],
      rotX: startSettings.rotation[0],
      rotY: startSettings.rotation[1],
      rotZ: startSettings.rotation[2],
    };

    tweenRef.current = gsap.to(animProxy, {
      posX: target.position[0],
      posY: target.position[1],
      posZ: target.position[2],
      rotX: target.rotation[0],
      rotY: target.rotation[1],
      rotZ: target.rotation[2],
      topRadius: target.topRadius,
      bottomRadius: target.bottomRadius,
      height: target.height,
      timeSpeed: target.timeSpeed,
      noiseScale: target.noiseScale,
      smoothBottom: target.smoothBottom,
      smoothTop: target.smoothTop,
      fresnelPower: target.fresnelPower,
      color: target.color,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        setSettings({
          ...animProxy,
          position: [animProxy.posX, animProxy.posY, animProxy.posZ],
          rotation: [animProxy.rotX, animProxy.rotY, animProxy.rotZ],
        } as GodraySettings);
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [enviroment]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(settings.color) },
      uNoiseScale: { value: settings.noiseScale },
      uTimeSpeed: { value: settings.timeSpeed },
      uSmoothTop: { value: settings.smoothTop },
      uSmoothBottom: { value: settings.smoothBottom },
      uFresnelPower: { value: settings.fresnelPower },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      const u = materialRef.current.uniforms;
      u.uNoiseScale.value = settings.noiseScale;
      u.uTimeSpeed.value = settings.timeSpeed;
      u.uSmoothTop.value = settings.smoothTop;
      u.uSmoothBottom.value = settings.smoothBottom;
      u.uFresnelPower.value = settings.fresnelPower;
      if (settings.color) {
        u.uColor.value.set(settings.color);
      }
    }
  }, [settings]);

  return (
    <>
      {debug && <GodrayBuilder settings={settings} onChange={setSettings} />}
      <group
        ref={groupRef}
        position={settings.position as [number, number, number]}
        rotation={[
          settings.rotation[0] * Math.PI,
          settings.rotation[1] * Math.PI,
          settings.rotation[2] * Math.PI,
        ]}
      >
        <mesh {...props}>
          <cylinderGeometry
            args={[settings.topRadius, settings.bottomRadius, settings.height, 4, 1, false]}
          />
          <shaderMaterial
            ref={materialRef}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uniforms={uniforms}
            vertexShader={GodrayMaterial.vertexShader}
            fragmentShader={GodrayMaterial.fragmentShader}
          />
          {debug && <axesHelper args={[2]} />}
        </mesh>
      </group>
    </>
  );
};
