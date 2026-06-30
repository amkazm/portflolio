"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import NeuralField from "./NeuralField";

/**
 * The 3D hero canvas. Lazy-loaded from the Hero section (ssr: false) so it
 * never blocks first paint. Falls back to a transparent canvas while loading.
 */
export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#22D3EE" />
      <pointLight position={[-6, -4, 2]} intensity={1} color="#EC4899" />
      <Suspense fallback={null}>
        <NeuralField />
      </Suspense>
    </Canvas>
  );
}
