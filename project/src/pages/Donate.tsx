import React, { useState } from 'react';
import { Heart, Shield, Users, Award, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { stripePromise, createPaymentIntent, type DonationData } from '../lib/stripe';
import { useDonations } from '../hooks/useDonations';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { createDonation, updateDonationStatus } = useDonations();

  const presetAmounts = [500, 1000, 2500, 5000];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    
    const finalAmount = amount || customAmount;
    
    if (!finalAmount || !donorInfo.name || !donorInfo.email) {
      setError('Please fill in all required fields');
      setProcessing(false);
      return;
    }

    try {
      // Create donation record
      const donation = await createDonation({
        name: donorInfo.name,
        email: donorInfo.email,
        phone: donorInfo.phone,
        amount: parseInt(finalAmount),
        payment_status: 'pending'
      });

      // Create Stripe payment intent
      const donationData: DonationData = {
        amount: parseInt(finalAmount),
        name: donorInfo.name,
        email: donorInfo.email,
        phone: donorInfo.phone
      };

      const { client_secret, payment_intent_id } = await createPaymentIntent(donationData);
      
      // Get Stripe instance
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: {
            // In a real implementation, you'd use Stripe Elements here
            // For demo purposes, we'll simulate a successful payment
          }
        }
      });

      if (stripeError) {
        await updateDonationStatus(donation.id, 'failed');
        throw new Error(stripeError.message);
      }

      // Update donation status to completed
      await updateDonationStatus(donation.id, 'completed');
      
      setSuccess(true);
      setAmount('');
      setCustomAmount('');
      setDonorInfo({ name: '', email: '', phone: '' });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const impactPoints = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Healthcare Access",
      description: "₹500 provides basic medical care for one family"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Education Support",
      description: "₹1000 sponsors a child's education for one month"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Skill Development",
      description: "₹2500 funds vocational training for one woman"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Community Programs",
      description: "₹5000 supports environmental and cultural initiatives"
    }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your generous donation has been processed successfully. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setSuccess(false)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Make Another Donation
              </button>
              <p className="text-sm text-gray-500">
                Your tax-deductible receipt will be sent to your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6995455/pexels-photo-6995455.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Support Makes a Difference</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Together, we can build a more equitable and resilient society
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every donation helps us build a more equitable and resilient society. See how your contribution creates lasting change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactPoints.map((point, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
              <p className="text-gray-600">
                Your generous contribution fuels our mission to empower communities and transform lives. Every donation helps us build a more equitable and resilient society.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Amount Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">Select Amount</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {presetAmounts.map((presetAmount) => (
                    <button
                      key={presetAmount}
                      type="button"
                      onClick={() => handleAmountSelect(presetAmount)}
                      className={`p-4 rounded-lg border-2 font-semibold transition-all duration-200 ${
                        amount === presetAmount.toString()
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      ₹{presetAmount}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Payment Security Note */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Secure Payment</h3>
                    <p className="text-green-700 text-sm">Your donation is processed through secure payment gateways with 256-bit SSL encryption.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={(!amount && !customAmount) || !donorInfo.name || !donorInfo.email || processing}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Donate Securely - ₹{amount || customAmount || '0'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparency & Trust</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We believe in complete transparency. Every rupee you donate is tracked and reported, ensuring maximum impact for your contribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-600">Bank-level security for all transactions</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tax Benefits</h3>
              <p className="text-gray-600">80G tax exemption certificates provided</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Impact</h3>
              <p className="text-gray-600">Regular updates on how your donation helps</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;