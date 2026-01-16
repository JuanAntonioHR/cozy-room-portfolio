import { ParallaxLayer } from './ParallaxLayer'

export default function WindowBackground() {
  return (
    <>
      <ParallaxLayer
        texturePath="/bg/BG0.png"
        defaultPosition={[-9.4, 0.8, -4.5]}
        defaultSize={5}
      />
      <ParallaxLayer
        texturePath="/bg/BG1.png"
        defaultPosition={[-12, 0.8, -5.6]}
        defaultSize={7}
      />
      <ParallaxLayer
        texturePath="/bg/BG2.png"
        defaultPosition={[-13.0, 1.3, -5.9]}
        defaultSize={9}
      />
      <ParallaxLayer
        texturePath="/bg/BG3.png"
        defaultPosition={[-15, 1.3, -6.8]}
        defaultSize={11}
      />
    </>
  )
}