export interface WaitlistFormData {
  name: string;
  email: string;
  tier: number;
  wallet_id: string;
  order_number: string;
  amount_paid: number;
  status: 'pending' | 'completed';
  created_at?: string;
}

export interface WaitlistEntry extends WaitlistFormData {
  id: number;
  created_at: string;
}
