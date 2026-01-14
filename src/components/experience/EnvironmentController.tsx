
import { useControls } from "leva";

export default function EnvironmentController() {
  const ambientLightValue = useControls("Ambient Light", {
    intensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    color: "#ffdcb2",
  });

  return (
    <>
      <ambientLight intensity={ambientLightValue.intensity} color={ambientLightValue.color} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        color="#ffe6c7"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={0.6}
        color="#ffb86c"
        distance={10}
      />
    </>
  );
}