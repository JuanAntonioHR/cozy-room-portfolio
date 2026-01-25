import { EffectComposer, Bloom, Noise, ToneMapping } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom mipmapBlur intensity={1.2} luminanceThreshold={1} radius={0.4} />
      <Noise opacity={0.02} />
      <ToneMapping adaptive={true} />
    </EffectComposer>
  );
}
