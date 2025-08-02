import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useContact } from '../hooks/useContact';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { loading, error, subscribeToNewsletter } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribeToNewsletter(email);
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center space-x-3">
        <CheckCircle className="h-6 w-6 text-green-600" />
        <p className="text-green-800 font-medium">Successfully subscribed to our newsletter!</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Mail className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
      </div>
      <p className="text-gray-600 mb-4">Get the latest updates on our programs and impact.</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;