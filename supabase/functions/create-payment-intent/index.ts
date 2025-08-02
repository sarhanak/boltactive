@@ .. @@
 import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
+import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
 import Stripe from 'npm:stripe@14.21.0'

@@ .. @@
   try {
     const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
       apiVersion: '2023-10-16',
     })
+    
+    const supabase = createClient(
+      Deno.env.get('SUPABASE_URL') ?? '',
+      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
+    )

     const { amount, name, email, phone }: DonationRequest = await req.json()
@@ .. @@
     // Create payment intent
     const paymentIntent = await stripe.paymentIntents.create({
       amount: amount * 100, // Convert to paisa (smallest currency unit)
       currency: 'inr',
+      automatic_payment_methods: {
+        enabled: true,
+      },
       metadata: {
         donor_name: name,
         donor_email: email,
         donor_phone: phone || '',
       },
       receipt_email: email,
     })
+    
+    // Create donation record in database
+    const { error: dbError } = await supabase
+      .from('donations')
+      .insert([{
+        name,
+        email,
+        phone,
+        amount,
+        payment_status: 'pending',
+        stripe_payment_intent_id: paymentIntent.id,
+      }])
+    
+    if (dbError) {
+      console.error('Database error:', dbError)
+      // Don't throw here, as payment intent was created successfully
+    }

     return new Response(