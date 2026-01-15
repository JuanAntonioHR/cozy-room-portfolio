import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'

type ParallaxLayerProps = {
  texturePath: string
  defaultPosition: [number, number, number]
  defaultSize: number
}

export function ParallaxLayer({
  texturePath,
  defaultPosition,
  defaultSize
}: ParallaxLayerProps) {

  const baseTexture = useTexture(texturePath)

  const texture = useMemo(() => {
    const tex = baseTexture.clone()
    tex.colorSpace = THREE.SRGBColorSpace
    tex.magFilter = THREE.LinearFilter
    tex.minFilter = THREE.LinearFilter
    tex.needsUpdate = true
    return tex
  }, [baseTexture])

  return (
    <mesh position={[defaultPosition[0], defaultPosition[1], defaultPosition[2]]} rotation={[0, Math.PI * 0.5, 0]}>
      <planeGeometry args={[defaultSize, defaultSize]} />
      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  )
}