'use client';

import { useEffect, useId } from 'react';
import { loadSlim } from "@tsparticles/slim";
import { tsParticles, type Container } from "@tsparticles/engine";

interface ParticlesEffectProps {
  className?: string;
  density?: number;
  size?: number;
  minSize?: number;
  speed?: number;
  minSpeed?: number;
  opacity?: number;
  minOpacity?: number;
  color?: string;
}

export const ParticlesEffect = ({
  className = '',
  density = 1200,
  size = 1.2,
  minSize = 0.4,
  speed = 1,
  minSpeed = 0,
  opacity = 1,
  minOpacity = 0.1,
  color = '#FFFFFF'
}: ParticlesEffectProps) => {
  const id = useId();

  useEffect(() => {
    let container: Container | undefined;

    const init = async () => {
      await loadSlim(tsParticles);

      container = await tsParticles.load({
        id,
        options: {
          fullScreen: { enable: false, zIndex: 1 },
          fpsLimit: 120,
          particles: {
            color: { value: color },
            move: {
              enable: true,
              direction: 'none',
              speed: { min: minSpeed || speed / 10, max: speed },
              straight: false
            },
            number: { value: density },
            opacity: {
              value: { min: minOpacity || opacity / 10, max: opacity },
              animation: { enable: true, sync: false, speed }
            },
            size: {
              value: { min: minSize || size / 2.5, max: size }
            }
          },
          detectRetina: true
        }
      });
    };

    init();

    return () => {
      container?.destroy();
    };
  }, [id, density, size, minSize, speed, minSpeed, opacity, minOpacity, color]);

  return <div id={id} className={className} />;
};
