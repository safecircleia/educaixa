'use client';

import { useRouter } from 'next/navigation';
import StarBorder from "@/components/ui/starborder";

export const WaitlistButton = () => {
  // Disabled button for hype; clicking does nothing.
  return (
    <StarBorder
      // ...removed onClick handler...
      className="group opacity-50 cursor-not-allowed"
      color="#4dc8ff"
      speed="4s"
    >
      <span className="flex items-center gap-2 px-4">
        Join Waitlist (Coming Soon)
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </StarBorder>
  );
};
