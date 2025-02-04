import React from 'react';

interface GlowyCardProps {
  className?: string;
  children: React.ReactNode;
}

export const GlowyCard: React.FC<GlowyCardProps> = ({ className = '', children }) => {
  return (
    <section className={`sui-glow-card ${className}`} data-glow>
      <div data-glow />
      {children}
    </section>
  );
};
