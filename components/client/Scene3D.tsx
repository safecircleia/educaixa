'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import TokenTrail with no SSR
const TokenTrail = dynamic(() => import('./TokenTrail').then(mod => mod.TokenTrail), {
  ssr: false
});

// Dynamically import Canvas with no SSR
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

export function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Suspense fallback={null}>
        <Canvas>
          <TokenTrail />
        </Canvas>
      </Suspense>
    </div>
  );
}
