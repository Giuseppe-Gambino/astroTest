import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Modello3D() {
  const meshRef = useRef();
  // 1. Carichiamo il file (il percorso punta alla cartella public)
  const { scene } = useGLTF("/Go.glb");

  // Questa funzione viene eseguita 60 volte al secondo
  useFrame((state, delta) => {
    if (meshRef.current) {
      // delta è il tempo trascorso dall'ultimo frame (per rotazione fluida)
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // 2. Lo visualizziamo usando il tag <primitive />
  return <primitive ref={meshRef} object={scene} scale={1.5} position={[0, 0, 0]} />;
}

// Opzionale: pre-carica il file per maggiore velocità
useGLTF.preload("/Go.glb");
