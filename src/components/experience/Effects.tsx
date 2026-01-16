import { EffectComposer, Bloom, Noise, Vignette, SSAO, ToneMapping } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer enableNormalPass={false}>
    <SSAO intensity={20} radius={0.3} luminanceInfluence={0.6} bias={0.02} />
      <Bloom 
        mipmapBlur 
        intensity={1.2} 
        luminanceThreshold={1} 
        radius={0.4} 
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
      <ToneMapping adaptive={true} />
    </EffectComposer>
  );
}