'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import UICounter from '@/components/ui/counter';

export const WaitlistCounter = () => {
  const [count, setCount] = useState(4912);
  const total = 5000;

  useEffect(() => {
    const subscription = supabase
      .channel('waitlist-counter')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'waitlist' 
      }, () => {
        setCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex items-baseline gap-2 mb-8">
      <UICounter
        value={count}
        places={[1000, 100, 10, 1]}
        fontSize={32}
        padding={3}
        gap={4}
        textColor="rgb(34, 211, 238)"
        fontWeight={700}
      />
      <span className="text-gray-400 text-xl">/{total.toLocaleString()} Slots Filled</span>
    </div>
  );
};