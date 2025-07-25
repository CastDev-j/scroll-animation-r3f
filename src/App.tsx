import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";

function App() {
  return (
    <article className="w-full h-screen bg-pink-100">
      <Canvas
        className="r3f"
        camera={{
          fov: 65,
          position: [2.3, 1.5, 2.3],
        }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          backgroundColor: "#fce7f3",
          color: "black",
        }}
        dataStyles={{
          color: "black",
        }}
        barStyles={{
          backgroundColor: "#ad25be",
        }}
      />
    </article>
  );
}

export default App;
