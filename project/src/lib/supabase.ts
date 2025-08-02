import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Donation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  amount: number;
  payment_status: 'pending' | 'completed' | 'failed';
  stripe_payment_intent_id?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}