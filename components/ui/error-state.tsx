'use client';

import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorState({ error, reset }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-red-500/10 border border-red-500/20">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" aria-hidden="true" />
      <h2 className="text-xl font-bold text-white/90 mb-4">
        {error?.message || "Algo salió mal"}
      </h2>
      {reset && (
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}