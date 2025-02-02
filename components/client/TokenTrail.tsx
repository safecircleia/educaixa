'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

export function TokenTrail() {
  const ref = useRef<THREE.Group>(null);
  const tokens = Array.from({ length: 20 });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) / 8;
      ref.current.rotation.x = Math.cos(state.clock.elapsedTime / 2) / 8;
    }
  });

  return (
    <group ref={ref}>
      {/* Wrap the whole instanced group in Float */}
      <Float speed={2} rotationIntensity={2} floatIntensity={5}>
        <Instances>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial roughness={0} color="#4dc8ff" />
          {tokens.map((_, i) => (
            // IMPORTANT: Instance is now a direct child of Instances.
            <Instance
              key={i}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
              ]}
            >
              <Trail
                width={0.2}
                length={4}
                color="#4dc8ff"
                attenuation={(t: number) => t * t}
              />
            </Instance>
          ))}
        </Instances>
      </Float>
    </group>
  );
}

// Add default export
export default TokenTrail;
