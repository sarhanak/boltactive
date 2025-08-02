@@ .. @@
 import React, { useState } from 'react';
 import { Heart, Shield, Users, Award, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
 import { stripePromise, createPaymentIntent, type DonationData } from '../lib/stripe';
 import { useDonations } from '../hooks/useDonations';
+import { useAnalytics } from '../hooks/useAnalytics';
+import DonationReceipt from '../components/DonationReceipt';
+import LoadingSpinner from '../components/LoadingSpinner';
+import SEO from '../components/SEO';

 const Donate = () => {
@@ .. @@
   const [processing, setProcessing] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState<string | null>(null);
+  const [completedDonation, setCompletedDonation] = useState<any>(null);
+  const [showReceipt, setShowReceipt] = useState(false);
   
   const { createDonation, updateDonationStatus } = useDonations();
+  const { trackDonation, trackEvent } = useAnalytics();

@@ .. @@
       // Update donation status to completed
       await updateDonationStatus(donation.id, 'completed');
       
+      // Track successful donation
+      trackDonation(parseInt(finalAmount));
+      
+      setCompletedDonation(donation);
       setSuccess(true);
       setAmount('');
       setCustomAmount('');
       setDonorInfo({ name: '', email: '', phone: '' });
       
     } catch (err) {
+      trackEvent({
+        event: 'donation_failed',
+        category: 'ecommerce',
+        label: err instanceof Error ? err.message : 'Unknown error'
+      });
       setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
     } finally {
       setProcessing(false);
@@ .. @@
   if (success) {
     return (
-      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
-        <div className="max-w-2xl mx-auto px-4 text-center">
-          <div className="bg-white rounded-2xl shadow-2xl p-12">
-            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
-            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
-            <p className="text-xl text-gray-600 mb-8">
-              Your generous donation has been processed successfully. You'll receive a confirmation email shortly.
-            </p>
-            <div className="space-y-4">
-              <button
-                onClick={() => setSuccess(false)}
-                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
-              >
-                Make Another Donation
-              </button>
-              <p className="text-sm text-gray-500">
-                Your tax-deductible receipt will be sent to your email address.
-              </p>
+      <>
+        <SEO 
+          title="Thank You for Your Donation - Active For You Charitable Trust"
+          description="Thank you for your generous donation to Active For You Charitable Trust. Your contribution helps us empower communities."
+        />
+        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
+          <div className="max-w-2xl mx-auto px-4 text-center">
+            <div className="bg-white rounded-2xl shadow-2xl p-12">
+              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
+              <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
+              <p className="text-xl text-gray-600 mb-8">
+                Your generous donation has been processed successfully. You'll receive a confirmation email shortly.
+              </p>
+              <div className="space-y-4">
+                <div className="flex space-x-4 justify-center">
+                  <button
+                    onClick={() => setShowReceipt(true)}
+                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
+                  >
+                    View Receipt
+                  </button>
+                  <button
+                    onClick={() => setSuccess(false)}
+                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
+                  >
+                    Make Another Donation
+                  </button>
+                </div>
+                <p className="text-sm text-gray-500">
+                  Your tax-deductible receipt will be sent to your email address.
+                </p>
+              </div>
             </div>
           </div>
         </div>
-      </div>
+        
+        {showReceipt && completedDonation && (
+          <DonationReceipt 
+            donation={completedDonation} 
+            onClose={() => setShowReceipt(false)} 
+          />
+        )}
+      </>
     );
   }

   return (
     <div>
+      <SEO 
+        title="Donate - Active For You Charitable Trust"
+        description="Support our mission to empower communities through healthcare, education, women's empowerment, and environmental programs. Every donation makes a difference."
+        keywords="donate, charity, NGO, support, healthcare, education, women empowerment"
+      />
+      
       {/* Hero Section */}
@@ .. @@
                >
                   {processing ? (
                     <>
-                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
+                      <LoadingSpinner size="sm" color="border-white" />
                       <span>Processing...</span>
                     </>
                   ) : (