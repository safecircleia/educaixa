import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const DEFAULT_AVATAR_URL = '/default-avatar.svg';

// This client only has realtime subscription capabilities
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper function to interact with the secure API route
export async function supabaseApi<T>(action: string, data = {}): Promise<T> {
  const response = await fetch('/api/supabase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, ...data })
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}

// Helper function to get public URL for avatar
export const getAvatarPublicUrl = (userId: string, fileName: string) => {
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(`${userId}/${fileName}`);
  return data.publicUrl;
};

// Helper function to upload avatar
export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return getAvatarPublicUrl(userId, fileName);
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};
