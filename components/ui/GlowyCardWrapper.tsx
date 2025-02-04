import React, { useRef, useEffect, useCallback } from 'react';

interface GlowyCardWrapperProps {
  hue?: number;
  size?: number;
  border?: number;
  radius?: number;
  className?: string;
  children: React.ReactNode;
}

export const GlowyCardWrapper: React.FC<GlowyCardWrapperProps> = ({
  hue = 120,
  size = 200,
  border = 2,
  radius = 10,
  className = '',
  children,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);

  const syncPointer = useCallback(({ x, y }: { x: number; y: number }) => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--x', x.toFixed(2));
      wrapperRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
      wrapperRef.current.style.setProperty('--y', y.toFixed(2));
      wrapperRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    }
  }, []);

  const leaveWrapper = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--x', '0');
      wrapperRef.current.style.setProperty('--y', '0');
    }
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (el) {
      const pointerMoveHandler = (e: PointerEvent) =>
        syncPointer({ x: e.clientX, y: e.clientY });
      el.addEventListener('pointermove', pointerMoveHandler);
      el.addEventListener('pointerleave', leaveWrapper);
      return () => {
        el.removeEventListener('pointermove', pointerMoveHandler);
        el.removeEventListener('pointerleave', leaveWrapper);
      };
    }
  }, [syncPointer, leaveWrapper]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--hue', hue.toString());
      wrapperRef.current.style.setProperty('--size', size.toString());
      wrapperRef.current.style.setProperty('--border', border.toString());
      wrapperRef.current.style.setProperty('--radius', radius.toString());
    }
  }, [hue, size, border, radius]);

  return (
    <main ref={wrapperRef} className={`sui-glow-card-wrapper ${className}`}>
      {children}
    </main>
  );
};
