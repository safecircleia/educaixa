'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  retry?: () => void;
}

export const ErrorState = ({ message, retry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-xl font-bold text-white/90 mb-2">Error</h3>
      <p className="text-white/70 text-center mb-4">{message}</p>
      {retry && (
        <Button
          variant="outline"
          onClick={retry}
          className="border-red-500/20 hover:bg-red-500/10"
        >
          Reintentar
        </Button>
      )}
    </div>
  );
};