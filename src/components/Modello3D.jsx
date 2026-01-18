import { useGLTF } from "@react-three/drei";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registriamo il plugin
gsap.registerPlugin(ScrollTrigger);

export default function Modello3D() {
  const meshRef = useRef();
  const { scene } = useGLTF("/Go.glb");

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    // 1. ROTAZIONE INFINITA (Sostituisce useFrame)
    const rotationLoop = gsap.to(meshRef.current.rotation, {
      y: "+=" + Math.PI * 2, // Ruota di 360 gradi
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    // 2. TIMELINE PER LO SCROLL AL FOOTER
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "footer", // GSAP cerca il tag <footer> nel tuo HTML
        start: "top bottom", // Inizia quando il footer appare in fondo
        end: "bottom bottom", // Finisce quando il footer è visibile
        scrub: 1, // Collega l'animazione allo scroll
        onEnter: () => rotationLoop.pause(), // Ferma il loop quando arrivi al footer
        onLeaveBack: () => rotationLoop.play(), // Riprendi il loop se torni su
      },
    });

    // Animazione 1: Mette il modello in orizzontale
    tl.to(
      meshRef.current.rotation,
      {
        x: 0,
        y: 0,
        z: -1.57,
      },
      0,
    );

    // Animazione 2: Sposta il contenitore HTML fisso
    tl.to(
      ".go-3d",
      {
        // Calcola: "Tutta la larghezza dello schermo - 36px - la larghezza dell'elemento"
        x: () => (window.innerWidth / 3) * -1,
        duration: 1,
      },
      0,
    );

    // CLEANUP: Fondamentale per evitare che le animazioni si sovrappongano al refresh
    return () => {
      rotationLoop.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <primitive ref={meshRef} object={scene} scale={1.2} position={[0, 0, 0]} />;
}

useGLTF.preload("/Go.glb");
