'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarBorder from "@/components/ui/starborder";
import { WaitlistOnboarding } from './WaitlistOnboarding';

export const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StarBorder
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer"
        color="#4dc8ff"
        speed="4s"
      >
        <span className="flex items-center gap-2 px-4">
          Join Waitlist
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </StarBorder>

      <AnimatePresence>
        {isOpen && <WaitlistOnboarding onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
