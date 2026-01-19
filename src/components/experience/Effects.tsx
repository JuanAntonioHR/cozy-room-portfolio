import { EffectComposer, Bloom, Noise, Vignette, ToneMapping } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom mipmapBlur intensity={1.2} luminanceThreshold={1} radius={0.4} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
      <ToneMapping adaptive={true} />
    </EffectComposer>
  );
}
