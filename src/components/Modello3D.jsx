import { useGLTF } from "@react-three/drei";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Modello3D() {
  const meshRef = useRef();
  // Usiamo un ref per tenere traccia dell'animazione di rotazione corrente
  const rotationTween = useRef(null);
  const { scene } = useGLTF("/GoV2.glb");

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    // --- FUNZIONE CHE AVVIA LA ROTAZIONE ---
    // La definiamo qui dentro per poterla riutilizzare
    const startRotation = () => {
      // 1. Sicurezza: se c'è già un'animazione attiva, uccidila prima di farne una nuova
      // Altrimenti si accumulano e il modello girerebbe a velocità 2x, 3x...
      if (rotationTween.current) rotationTween.current.kill();

      // 2. Crea la nuova animazione
      rotationTween.current = gsap.to(meshRef.current.rotation, {
        y: "+=" + Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    };

    // --- SCROLLTRIGGER ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,

        // Quando entri nel footer, uccidiamo il loop per dare controllo totale allo scroll
        onEnter: () => {
          if (rotationTween.current) rotationTween.current.kill();
        },

        // Quando torni su (esci dal footer tornando verso l'alto), ricreiamo l'animazione!
        onLeaveBack: () => {
          startRotation();
        },
      },
    });

    // Animazione Scroll (Footer)
    tl.to(
      meshRef.current.rotation,
      {
        x: 0,
        y: 0,
        z: -1.57,
        overwrite: true, // Forza sovrascrittura immediata
      },
      0,
    ).to(
      ".go-3d",
      {
        x: () => (window.innerWidth / 3) * -1,
        duration: 1,
      },
      0,
    );

    // --- START INIZIALE ---
    startRotation();

    // CLEANUP GENERALE
    return () => {
      if (rotationTween.current) rotationTween.current.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <primitive ref={meshRef} object={scene} scale={1.2} position={[0, 0, 0]} />;
}

useGLTF.preload("/GoV2.glb");
