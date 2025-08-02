import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailRequest {
  to: string
  subject: string
  html: string
  type: 'donation_confirmation' | 'contact_message' | 'newsletter_welcome'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, subject, html, type }: EmailRequest = await req.json()

    // In a production environment, you would integrate with an email service
    // like SendGrid, Mailgun, or AWS SES here
    
    // For demo purposes, we'll log the email and return success
    console.log(`Email would be sent to: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Type: ${type}`)
    console.log(`HTML: ${html}`)

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to send email',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})