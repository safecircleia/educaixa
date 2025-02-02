'use client';

import { useRouter } from 'next/navigation';
import StarBorder from "@/components/ui/starborder";

export const WaitlistButton = () => {
  const router = useRouter();

  return (
    <StarBorder
      onClick={() => router.push('/onboarding')}
      className="group"
      color="#4dc8ff"
      speed="4s"
    >
      <span className="flex items-center gap-2 px-4">
        Join Waitlist
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </StarBorder>
  );
};
