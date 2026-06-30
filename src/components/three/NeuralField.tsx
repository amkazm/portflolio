"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A rotating "neural network" — points (neurons) connected by faint edges,
 * evoking a brain / graph of activations. Pure geometry, very light on the GPU.
 */
export default function NeuralField({ count = 90 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  const { positions, lineGeometry } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const radius = 2.6;
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere for even distribution.
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.6 + Math.random() * 0.4);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    const positions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    // Connect near neighbours with edges.
    const linePos: number[] = [];
    const maxDist = 1.15;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z);
          linePos.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePos, 3)
    );

    return { positions, lineGeometry };
  }, [count]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += delta * 0.02;
    // Subtle parallax toward pointer.
    const { x, y } = state.pointer;
    group.current.rotation.y += x * 0.0015;
    group.current.rotation.x += y * 0.0015;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#22D3EE"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}
