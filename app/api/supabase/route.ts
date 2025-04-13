import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/database';

// Add Edge Runtime configuration
export const runtime = 'edge';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(req: NextRequest) {
  try {
    const { action, ...data } = await req.json();

    switch (action) {
      case 'getWaitlistCount':
        const { count } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        
        return NextResponse.json({ count });

      case 'incrementWaitlist':
        const { data: updatedCount } = await supabase.rpc('increment_waitlist_counter');
        return NextResponse.json({ count: updatedCount });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}