import React, { useState, useEffect } from 'react';
import { supabase, type Donation, type ContactMessage } from '../lib/supabase';
import { DollarSign, Mail, Users, TrendingUp, Eye, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    totalMessages: 0,
    completedDonations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch donations
      const { data: donationsData } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch contact messages
      const { data: messagesData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      setDonations(donationsData || []);
      setMessages(messagesData || []);

      // Calculate stats
      const totalDonations = donationsData?.length || 0;
      const completedDonations = donationsData?.filter(d => d.payment_status === 'completed').length || 0;
      const totalAmount = donationsData?.reduce((sum, d) => d.payment_status === 'completed' ? sum + d.amount : sum, 0) || 0;
      const totalMessages = messagesData?.length || 0;

      setStats({
        totalDonations,
        totalAmount,
        totalMessages,
        completedDonations
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);
      
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor donations and manage contact messages</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Donations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedDonations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Donations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Donations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {donations.slice(0, 10).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{donation.name}</p>
                      <p className="text-sm text-gray-600">{donation.email}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{donation.amount}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        donation.payment_status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : donation.payment_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {donation.payment_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Messages */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Contact Messages</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {messages.slice(0, 10).map((message) => (
                  <div key={message.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">{message.name}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            message.status === 'new' 
                              ? 'bg-blue-100 text-blue-800'
                              : message.status === 'read'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {message.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{message.email}</p>
                        <p className="text-sm text-gray-800 mt-2">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {message.status === 'new' && (
                        <button
                          onClick={() => markMessageAsRead(message.id)}
                          className="ml-4 p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                          title="Mark as read"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;