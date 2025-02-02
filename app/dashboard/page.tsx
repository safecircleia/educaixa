'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePhantom } from '@/hooks/usePhantom';
import { Dashboard } from '@/components/client/Dashboard';
import { supabase } from '@/lib/supabase';
import type { WaitlistEntry } from '@/types/database';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { connected, pubKey } = usePhantom();
  const router = useRouter();
  const [entry, setEntry] = useState<WaitlistEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      // Wait a bit to ensure Phantom connection is established
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!connected || !pubKey) {
        router.push('/');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('waitlist_entries')
          .select('*')
          .eq('wallet_id', pubKey.toString())
          .single();

        if (error || !data) {
          router.push('/onboarding');
          return;
        }

        if (mounted) {
          setEntry(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/onboarding');
      }
    };

    checkAccess();
    return () => { mounted = false; };
  }, [connected, pubKey]);

  if (loading || !entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <Dashboard entry={entry} />
    </div>
  );
}
