@@ .. @@
 export const createPaymentIntent = async (donationData: DonationData) => {
   try {
+    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
+      throw new Error('Missing Supabase configuration');
+    }
+
     const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
       method: 'POST',
       headers: {
@@ .. @@
     });

     if (!response.ok) {
-      throw new Error('Failed to create payment intent');
+      const errorData = await response.json().catch(() => ({}));
+      throw new Error(errorData.error || 'Failed to create payment intent');
     }

     return await response.json();
   } catch (error) {
     console.error('Error creating payment intent:', error);
     throw error;
   }
 };