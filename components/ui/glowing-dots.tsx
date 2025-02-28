'use client';

import { useEffect, useRef } from 'react';

interface GlowingDotsProps {
  className?: string;
}

const GlowingDots = ({ className = '' }: GlowingDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numDots = 50;
    const connectionDistance = 150;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDots = () => {
      for (let i = 0; i < numDots; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.3)'; // Blue-300 with opacity
        ctx.fill();

        // Draw connections
        dots.forEach((otherDot, j) => {
          if (i !== j) {
            const dx = dot.x - otherDot.x;
            const dy = dot.y - otherDot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(otherDot.x, otherDot.y);
              const opacity = (1 - distance / connectionDistance) * 0.2;
              ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawDots);
    };

    // Initialize
    resize();
    createDots();
    drawDots();

    // Handle resize
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} opacity-50`}
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export { GlowingDots };