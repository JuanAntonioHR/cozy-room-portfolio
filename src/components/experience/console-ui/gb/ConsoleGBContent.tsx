import { Html } from "@react-three/drei";

export default function ConsoleGBContent() {
  return (
    <group>
      <Html transform position={[0, 0.035, 0.02]} rotation={[0, 0, 0]} scale={0.0045}>
        <div className={`h-[480px] w-[480px] overflow-auto bg-blue-900 p-4 text-white`}>
          <h1 className="text-2xl font-bold">Proyecto Principal</h1>
        </div>
      </Html>
    </group>
  );
}
