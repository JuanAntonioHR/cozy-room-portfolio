import { useGLTF, Merged } from "@react-three/drei";

export default function Bookshelf() {
  const { nodes } = useGLTF("/models/VoxelBooks.glb");

  return (
    <Merged meshes={nodes}>
      {({ Book_0, Book_1, Book_2, Book_3, Book_4, Book_5, Book_6, Book_7, Book_8 }) => (
        <>
          <group>
            <Book_1 position={[-1, 0.98, -1.11]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_0 position={[-1, 1.02, -1.12]} rotation={[0, -0.2, 0.5 * Math.PI]} />
            <Book_1 position={[-1, 1.06, -1.13]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_0 position={[-1, 1.1, -1.12]} rotation={[0, 0.2, 0.5 * Math.PI]} />
            <Book_7 position={[-0.4, 0.96, -1.13]} />
            <Book_4 position={[-0.33, 0.96, -1.14]} />
            <Book_2 position={[-0.2, 0.96, -1.14]} rotation={[0, 0, 0.4]} />

            <Book_3 position={[-1.16, 0.63, -1.14]} />
            <Book_1 position={[-1.09, 0.63, -1.15]} />
            <Book_2 position={[-1.02, 0.63, -1.14]} />
            <Book_3 position={[-0.95, 0.63, -1.15]} />
            <Book_4 position={[-0.88, 0.63, -1.14]} />
            <Book_3 position={[-0.81, 0.63, -1.14]} />
            <Book_4 position={[-0.74, 0.63, -1.15]} />
            <Book_5 position={[-0.67, 0.63, -1.14]} />
            <Book_4 position={[-0.6, 0.63, -1.15]} />
            <Book_2 position={[-0.53, 0.63, -1.15]} />
            <Book_1 position={[-0.46, 0.63, -1.14]} />
            <Book_2 position={[-0.39, 0.63, -1.15]} />

            <Book_5 position={[-1.16, 0, -1.14]} />
            <Book_4 position={[-1.09, 0, -1.15]} />
            <Book_4 position={[-1.02, 0, -1.15]} />
            <Book_5 position={[-0.94, 0, -1.14]} />
            <Book_5 position={[-1.16, 0, -1.14]} />
            <Book_8 position={[-0.81, 0.01, -1.15]} rotation={[0, 0, 0.4]} />
            <Book_7 position={[-0.52, 0.028, -1.14]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_6 position={[-0.51, 0.07, -1.14]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_7 position={[-0.52, 0.12, -1.14]} rotation={[0, 0.2, 0.5 * Math.PI]} />
            <Book_6 position={[-0.51, 0.17, -1.14]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_8 position={[-0.43, 0, -1.15]} rotation={[0, 0, -0.4]} />
            <Book_1 position={[-0.29, 0, -1.14]} />
            <Book_4 position={[-0.23, 0, -1.15]} />
            <Book_1 position={[-0.16, 0, -1.14]} />

            <Book_3 position={[-1.16, -0.32, -1.14]} />
            <Book_3 position={[-1.09, -0.32, -1.15]} />
            <Book_1 position={[-0.95, -0.32, -1.15]} />
            <Book_3 position={[-0.88, -0.32, -1.14]} />
            <Book_1 position={[-0.81, -0.32, -1.15]} />
            <Book_3 position={[-0.67, -0.32, -1.14]} />
            <Book_1 position={[-0.6, -0.32, -1.14]} />
            <Book_1 position={[-0.53, -0.32, -1.15]} />
            <Book_2 position={[-0.42, -0.31, -1.15]} rotation={[0, 0, 0.4]} />
            <Book_1 position={[-0.26, -0.3, -1.14]} rotation={[0, 0, 0.8]} />

            <Book_2 position={[-0.95, -0.61, -1.14]} />
            <Book_7 position={[-0.8, -0.61, -1.15]} rotation={[0, 0, -0.7]} />
            <Book_2 position={[-0.5, -0.61, -1.15]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_2 position={[-0.5, -0.56, -1.14]} rotation={[0, 0.3, 0.5 * Math.PI]} />
            <Book_7 position={[-0.5, -0.52, -1.14]} rotation={[0, -0.1, 0.5 * Math.PI]} />
            <Book_2 position={[-0.17, -0.62, -1.14]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_8 position={[-0.17, -0.57, -1.14]} rotation={[0, 0.3, 0.5 * Math.PI]} />
            <Book_8 position={[-0.17, -0.53, -1.15]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_2 position={[-0.17, -0.49, -1.15]} rotation={[0, -0.1, 0.5 * Math.PI]} />

            <Book_0 position={[-0.95, -0.96, -1.14]} />
            <Book_1 position={[-0.88, -0.96, -1.15]} />
            <Book_0 position={[-0.81, -0.96, -1.14]} />
            <Book_1 position={[-0.74, -0.96, -1.15]} />
            <Book_1 position={[-0.67, -0.96, -1.14]} />
            <Book_0 position={[-0.6, -0.96, -1.14]} />
            <Book_1 position={[-0.53, -0.96, -1.15]} />
            <Book_0 position={[-0.46, -0.96, -1.14]} />
            <Book_0 position={[-0.39, -0.96, -1.15]} />
            <Book_0 position={[-0.25, -0.96, -1.15]} rotation={[0, -0.5 * Math.PI, 0]} />
            <Book_1 position={[-0.25, -0.96, -1.09]} rotation={[0, -0.5 * Math.PI, 0]} />
          </group>
          <group>
            <Book_1 position={[0.06, 0.63, -1.14]} />
            <Book_8 position={[0.13, 0.63, -1.15]} />
            <Book_1 position={[0.2, 0.63, -1.15]} />
            <Book_8 position={[0.27, 0.63, -1.14]} />
            <Book_2 position={[0.38, 0.64, -1.15]} rotation={[0, 0, 0.4]} />
            <Book_2 position={[0.65, 0.66, -1.14]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_3 position={[0.65, 0.7, -1.14]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_8 position={[0.65, 0.75, -1.14]} rotation={[0, 0.2, 0.5 * Math.PI]} />
            <Book_1 position={[0.65, 0.79, -1.14]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_3 position={[0.73, 0.63, -1.15]} rotation={[0, 0, -0.4]} />
            <Book_1 position={[0.83, 0.63, -1.14]} />
            <Book_1 position={[0.9, 0.63, -1.15]} />
            <Book_8 position={[0.97, 0.63, -1.14]} />
            <Book_1 position={[1.04, 0.63, -1.14]} />

            <Book_6 position={[0.27, 0, -1.14]} />
            <Book_1 position={[0.34, 0, -1.15]} />
            <Book_1 position={[0.41, 0, -1.14]} />
            <Book_5 position={[0.48, 0, -1.15]} />
            <Book_4 position={[0.55, 0, -1.14]} />
            <Book_4 position={[0.62, 0, -1.14]} />
            <Book_5 position={[0.69, 0, -1.15]} />
            <Book_5 position={[0.76, 0, -1.14]} />
            <Book_4 position={[0.81, 0, -1.15]} />
            <Book_1 position={[0.95, 0, -1.14]} rotation={[0, -0.5 * Math.PI, 0]} />
            <Book_6 position={[1, 0, -1.09]} rotation={[0, -0.5 * Math.PI, 0]} />

            <Book_0 position={[0.06, -0.32, -1.14]} />
            <Book_1 position={[0.12, -0.31, -1.15]} rotation={[0, 0, -0.7]} />
            <Book_0 position={[0.43, -0.29, -1.15]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_1 position={[0.43, -0.24, -1.14]} rotation={[0, 0.3, 0.5 * Math.PI]} />
            <Book_7 position={[0.43, -0.2, -1.15]} rotation={[0, -0.1, 0.5 * Math.PI]} />
            <Book_0 position={[0.43, -0.15, -1.14]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_7 position={[0.52, -0.31, -1.14]} rotation={[0, 0, 0.4]} />
            <Book_8 position={[0.9, -0.32, -1.14]} />
            <Book_2 position={[0.96, -0.32, -1.15]} />
            <Book_8 position={[1.02, -0.32, -1.14]} />
            <Book_8 position={[1.08, -0.32, -1.15]} />

            <Book_3 position={[0.73, -0.62, -1.15]} rotation={[0, 0, 0.5 * Math.PI]} />
            <Book_2 position={[0.73, -0.58, -1.15]} rotation={[0, 0.2, 0.5 * Math.PI]} />
            <Book_1 position={[0.73, -0.54, -1.15]} rotation={[0, 0.1, 0.5 * Math.PI]} />
            <Book_3 position={[0.73, -0.5, -1.15]} rotation={[0, -0.1, 0.5 * Math.PI]} />

            <Book_0 position={[0.06, -0.96, -1.14]} />
            <Book_0 position={[0.13, -0.96, -1.13]} />
            <Book_0 position={[0.19, -0.96, -1.14]} />
            <Book_8 position={[0.26, -0.96, -1.15]} />
            <Book_8 position={[0.32, -0.96, -1.15]} />
            <Book_8 position={[0.39, -0.96, -1.14]} />
          </group>
        </>
      )}
    </Merged>
  );
}

useGLTF.preload("/models/VoxelBooks.glb");
