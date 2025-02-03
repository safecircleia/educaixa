import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Validate data as needed
    if (!data.tier) {
      return NextResponse.json({ error: 'Tier is required' }, { status: 400 });
    }
    const { error, data: inserted } = await supabase
      .from('waitlist_entries')
      .insert([data])
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ entry: inserted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
