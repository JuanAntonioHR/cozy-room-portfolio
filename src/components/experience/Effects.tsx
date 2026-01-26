import {
  EffectComposer,
  Bloom,
  Noise,
  ToneMapping,
  ChromaticAberration,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom mipmapBlur intensity={1.2} luminanceThreshold={1} radius={0.4} />
      <Noise opacity={0.02} />
      <ToneMapping adaptive={true} />
      <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
      <DepthOfField bokehScale={0.5} height={1000} />
      <Vignette offset={0.3} darkness={0.9} />
    </EffectComposer>
  );
}
