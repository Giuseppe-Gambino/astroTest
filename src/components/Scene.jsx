// src/components/Scene.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import Modello3D from "./Modello3D"; // Il tuo componente esistente

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <Modello3D />
        </Stage>
      </Suspense>
      <OrbitControls makeDefault enableZoom={false} />
    </Canvas>
  );
}
