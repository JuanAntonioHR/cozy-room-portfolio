import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'
import { useControls } from 'leva'

type ParallaxLayerProps = {
  id: string
  texturePath: string
  defaultPosition: [number, number, number]
  defaultSize: number
}

export function ParallaxLayer({
  id,
  texturePath,
  defaultPosition,
  defaultSize
}: ParallaxLayerProps) {
  const { x, y, z, size } = useControls(id, {
    x: { value: defaultPosition[0], min: -20, max: 20, step: 0.1 },
    y: { value: defaultPosition[1], min: -20, max: 20, step: 0.1 },
    z: { value: defaultPosition[2], min: -20, max: 0, step: 0.1 },
    size: { value: defaultSize, min: 0, max: 30, step: 0.1 }
  })

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
    <mesh position={[x, y, z]} rotation={[0, Math.PI * 0.5, 0]}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  )
}