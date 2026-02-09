import { useStore } from "@/store";

export default function EnviromentChanger() {
  const enviroment = useStore((state) => state.enviroment);
  const setEnviroment = useStore((state) => state.setEnviroment);

  const handleClick = () => {
    if (enviroment === "daylight") {
      setEnviroment("sunset");
    } else if (enviroment === "sunset") {
      setEnviroment("cloudy");
    } else {
      setEnviroment("daylight");
    }
  };

  return (
    <mesh
      rotation={[0, Math.PI / 2, 0]}
      position={[-1.35, 0.28, 0]}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}
