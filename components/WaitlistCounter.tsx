'use client';

import { useEffect, useState } from 'react';
import { supabase, supabaseApi } from '@/lib/supabase';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export default function WaitlistCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Initial count fetch using secure API route
    supabaseApi<{ count: number }>('getWaitlistCount')
      .then(({ count }) => setCount(count ?? 0))
      .catch(console.error);

    // Real-time subscription
    const subscription = supabase
      .channel('waitlist_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'waitlist' 
        }, 
        async (payload: RealtimePostgresChangesPayload<{ id: number }>) => {
          // Fetch the updated count from secure API when changes occur
          const { count: newCount } = await supabaseApi<{ count: number }>('getWaitlistCount');
          setCount(newCount ?? 0);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="font-mono text-2xl">
      {count.toLocaleString()}
    </div>
  );
}