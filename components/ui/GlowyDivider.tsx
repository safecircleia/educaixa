'use client';

import { cn } from '@/lib/utils';

interface GlowyDividerProps {
  showBuckle?: boolean;
  direction?: 'top' | 'bottom';
  className?: string;
}

export function GlowyDivider({ 
  showBuckle = false, 
  direction = 'bottom',
  className 
}: GlowyDividerProps) {
  return (
    <div className={cn("relative py-6 w-full", className)}>
      <div
        className={cn(
          "absolute left-0 h-full w-full",
          direction === 'bottom'
            ? "top-1/2 dark:bg-[radial-gradient(35%_48px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] bg-[radial-gradient(35%_48px_at_50%_0%,theme(backgroundColor.neutral.950/5%),transparent)]"
            : "-top-1/2 dark:bg-[radial-gradient(35%_48px_at_50%_100%,theme(backgroundColor.white/8%),transparent)] bg-[radial-gradient(35%_48px_at_50%_100%,theme(backgroundColor.neutral.950/5%),transparent)]"
        )}
      />
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {showBuckle && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black p-1.5">
          <div className="h-1.5 w-8 rounded-lg bg-white/90" />
        </div>
      )}
    </div>
  );
}
