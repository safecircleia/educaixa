import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `SC-${timestamp}-${random}`;
};

export const incrementWaitlistCount = async () => {
  const { data, error } = await supabase.rpc('increment_waitlist_count');
  if (error) throw error;
  return data;
};

export const createWaitlistEntry = async (data: WaitlistFormData) => {
  // Generate order number first
  const orderNumber = generateOrderNumber();
  
  const { data: entry, error } = await supabase
    .from('waitlist_entries')
    .insert([{
      ...data,
      order_number: orderNumber,
      created_at: new Date().toISOString(),
      status: data.tx_hash ? 'completed' : 'pending'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating entry:', error);
    throw error;
  }

  try {
    await incrementWaitlistCount();
  } catch (error) {
    console.error('Error incrementing count:', error);
  }

  return entry;
};

export const updateEntryStatus = async (walletId: string, status: 'pending' | 'completed' | 'failed') => {
  const { error } = await supabase
    .from('waitlist_entries')
    .update({ status })
    .eq('wallet_id', walletId);

  if (error) throw error;
};
