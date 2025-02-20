'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-red-500/10 border border-red-500/20">
          <h2 className="text-xl font-bold text-white/90 mb-4">Algo salió mal</h2>
          <p className="text-white/70">Por favor, recarga la página</p>
        </div>
      );
    }

    return this.props.children;
  }
}