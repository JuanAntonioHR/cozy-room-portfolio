import { Html } from "@react-three/drei";
import { useStore } from "@/store";

export default function Console3DSContent() {
  const setFocus = useStore((state) => state.setFocus);

  return (
    <group>
      <Html transform position={[0.001, 0.032, -0.0455]} rotation={[-0.45, 0, 0]} scale={0.01}>
        <div className={`h-[360px] w-[640px] overflow-auto bg-blue-900 p-4 text-white`}>
          <h1 className="text-2xl font-bold">Proyecto Principal</h1>

          <button
            className="mt-4 rounded bg-red-500 py-2 text-white transition hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              setFocus("idle");
            }}
          >
            VOLVER AL CUARTO
          </button>
        </div>
      </Html>
    </group>
  );
}
