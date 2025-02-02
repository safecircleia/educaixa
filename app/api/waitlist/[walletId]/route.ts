import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: { walletId: string }}) {
  try {
    // Use params.walletId directly per Next.js requirements
    const walletId = params.walletId;
    const { data, error } = await supabase
      .from('waitlist_entries')
      .select('*')
      .eq('wallet_id', walletId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
