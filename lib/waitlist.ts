import { supabase } from './supabase';
import { generateOrderNumber } from './constants';
import type { WaitlistFormData } from '@/types/database';

export async function createWaitlistEntry(entry: Record<string, any>) {
  const orderNumber = generateOrderNumber();

  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry) // ensure payload is serialized
  });
  if (!res.ok) throw new Error('Failed to create entry');
  return await res.json();
}

export async function incrementWaitlistCount() {
  const { error } = await supabase.rpc('increment_waitlist_count');
  if (error) throw error;
}

export async function getWaitlistEntry(walletId: string) {
  const res = await fetch(`/api/waitlist/${walletId}`);
  if (!res.ok) throw new Error('Failed to fetch waitlist entry');
  const data = await res.json(); // properly parse the JSON response
  return { data };
}

export async function updateEntryStatus(walletId: string, status: 'pending' | 'completed' | 'failed') {
  const { error } = await supabase
    .from('waitlist_entries')
    .update({ status })
    .eq('wallet_id', walletId);

  if (error) throw error;
}

export async function addToWaitlist(email: string) {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      return { error };
    }

    await incrementWaitlistCount();
    return { data };
  } catch (error) {
    return { error };
  }
}
