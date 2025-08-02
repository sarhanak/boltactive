import { useState, useEffect } from 'react';
import { supabase, type Donation } from '../lib/supabase';

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createDonation = async (donation: Omit<Donation, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([donation])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create donation');
    }
  };

  const updateDonationStatus = async (id: string, status: Donation['payment_status']) => {
    try {
      const { error } = await supabase
        .from('donations')
        .update({ payment_status: status })
        .eq('id', id);

      if (error) throw error;
      await fetchDonations(); // Refresh the list
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update donation status');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return {
    donations,
    loading,
    error,
    createDonation,
    updateDonationStatus,
    refetch: fetchDonations,
  };
};