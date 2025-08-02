import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface DonationRequest {
  amount: number
  name: string
  email: string
  phone?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const { amount, name, email, phone }: DonationRequest = await req.json()

    // Validate input
    if (!amount || amount < 50) {
      throw new Error('Minimum donation amount is ₹50')
    }

    if (!name || !email) {
      throw new Error('Name and email are required')
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paisa (smallest currency unit)
      currency: 'inr',
      metadata: {
        donor_name: name,
        donor_email: email,
        donor_phone: phone || '',
      },
      receipt_email: email,
    })

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})