import { useState } from 'react';
import { supabase, type ContactMessage } from '../lib/supabase';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContactMessage = async (message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...message, status: 'new' }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNewsletter = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('newsletter')
        .insert([{ email, is_active: true }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to subscribe';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContactMessage,
    subscribeToNewsletter,
  };
};