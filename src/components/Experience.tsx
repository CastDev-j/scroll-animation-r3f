import { ScrollControls } from "@react-three/drei";
import { Office } from "./Office";
import { Overlay } from "./Overlay";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={3.5} />
      <ScrollControls pages={3} damping={0.251}>
        <Overlay />
        <Office />
      </ScrollControls>
    </>
  );
};
