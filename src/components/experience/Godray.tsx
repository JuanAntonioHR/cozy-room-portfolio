import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { GodrayBuilder } from "./GodrayBuilder";

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

export interface GodrayProps {
  settings?: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    timeSpeed?: number;
    noiseScale?: number;
    topRadius?: number;
    bottomRadius?: number;
    height?: number;
    smoothBottom?: number;
    smoothTop?: number;
    fresnelPower?: number;
  };
  debug?: boolean;
}

export const Godray = ({ settings = {}, debug = false, ...props }: GodrayProps) => {
  const [
    {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      color: godrayColor = "white",
      timeSpeed = 0.1,
      noiseScale = 5,
      topRadius = 3,
      bottomRadius = 2,
      height = 10,
      smoothBottom = 0.1,
      smoothTop = 0.9,
      fresnelPower = 5,
    },
    setSettings,
  ] = useState(settings);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(godrayColor) },
      uNoiseScale: { value: noiseScale },
      uTimeSpeed: { value: timeSpeed },
      uSmoothTop: { value: smoothTop },
      uSmoothBottom: { value: smoothBottom },
      uFresnelPower: { value: fresnelPower },
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
      u.uNoiseScale.value = noiseScale;
      u.uTimeSpeed.value = timeSpeed;
      u.uSmoothTop.value = smoothTop;
      u.uSmoothBottom.value = smoothBottom;
      u.uFresnelPower.value = fresnelPower;
      if (godrayColor) {
        u.uColor.value.set(godrayColor);
      }
    }
  }, [noiseScale, godrayColor, timeSpeed, smoothTop, smoothBottom, fresnelPower]);

  return (
    <>
      {debug && <GodrayBuilder settings={settings} onChange={setSettings} />}
      <group
        position={position as [number, number, number]}
        rotation={[rotation[0] * Math.PI, rotation[1] * Math.PI, rotation[2] * Math.PI]}
      >
        <mesh {...props}>
          <cylinderGeometry args={[topRadius, bottomRadius, height, 4, 1, false]} />
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
