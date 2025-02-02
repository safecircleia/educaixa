'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface CounterContextType {
  count: number;
  total: number;
  percentage: number;
}

const CounterContext = createContext<CounterContextType>({
  count: 0,
  total: 5000,
  percentage: 0,
});

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const total = 5000;
  const percentage = Math.min((count / total) * 100, 100);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await supabase
        .from('waitlist_count')
        .select('count')
        .eq('id', 1)
        .single();
      
      if (data) setCount(data.count);
    };

    getCount();

    const channel = supabase
      .channel('counter')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waitlist_count'
        },
        (payload: any) => {
          if (payload.new?.count !== undefined) {
            setCount(payload.new.count);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <CounterContext.Provider value={{ count, total, percentage }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
