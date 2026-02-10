import { Html } from "@react-three/drei";
import TitleLabel from "./TitleLabel";

export default function TitleLabelThree({
  title,
  position,
}: {
  title: string;
  position: [number, number, number];
}) {
  return (
    <Html position={position}>
      <TitleLabel title={title} />
    </Html>
  );
}
