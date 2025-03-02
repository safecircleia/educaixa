'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type CounterContextType = {
  count: number;
  total: number;
  percentage: number;
  incrementCount: () => void;
};

const CounterContext = createContext<CounterContextType>({
  count: 0,
  total: 5000,
  percentage: 0,
  incrementCount: () => {},
});

type WaitlistCountRecord = {
  id: number;
  count: number;
};

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const total = 1000;
  const percentage = Math.min((count / total) * 100, 100);

  const incrementCount = () => {
    setCount(prevCount => Math.min(prevCount + 1, total));
  };

  useEffect(() => {
    const fetchInitialCount = async () => {
      const { data, error } = await supabase
        .from('waitlist_count')
        .select('count')
        .eq('id', 1)
        .single();

      if (!error && data) {
        setCount(data.count);
      }
    };

    fetchInitialCount();

    // Set up real-time subscription
    const channel = supabase
      .channel('counter-changes')
      .on(
        'postgres_changes' as const,
        {
          event: '*',
          schema: 'public',
          table: 'waitlist_count',
        },
        (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
          const newRecord = payload.new as WaitlistCountRecord;
          if (typeof newRecord?.count === 'number') {
            setCount(newRecord.count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CounterContext.Provider value={{ count, total, percentage, incrementCount }}>
      {children}
    </CounterContext.Provider>
  );
}

export const useCounter = () => useContext(CounterContext);
