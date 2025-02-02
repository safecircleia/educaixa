import { supabase } from './supabase';
import { generateOrderNumber } from './constants';
import type { WaitlistFormData } from '@/types/database';

export async function createWaitlistEntry(data: Omit<WaitlistFormData, 'order_number'>) {
  const orderNumber = generateOrderNumber();

  const { data: entry, error } = await supabase
    .from('waitlist_entries')
    .insert([{
      ...data,
      order_number: orderNumber,
      created_at: new Date().toISOString(),
      status: 'completed'
    }])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    throw new Error('Failed to create waitlist entry');
  }

  try {
    await incrementWaitlistCount();
  } catch (error) {
    console.error('Failed to increment waitlist count:', error);
  }

  return entry;
}

export async function incrementWaitlistCount() {
  const { error } = await supabase.rpc('increment_waitlist_count');
  if (error) throw error;
}

export async function getWaitlistEntry(walletId: string) {
  const { data, error } = await supabase
    .from('waitlist_entries')
    .select('*')
    .eq('wallet_id', walletId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Database error:', error);
    throw new Error('Failed to fetch waitlist entry');
  }

  return data;
}
