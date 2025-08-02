/*
  # Create donations table

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `name` (text, donor name)
      - `email` (text, donor email)
      - `phone` (text, optional phone number)
      - `amount` (integer, donation amount in smallest currency unit)
      - `payment_status` (text, payment status)
      - `stripe_payment_intent_id` (text, optional Stripe payment intent ID)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `donations` table
    - Add policy for public to insert donations
    - Add policy for authenticated users to read donations
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  amount integer NOT NULL CHECK (amount > 0),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create donations (for public donation form)
CREATE POLICY "Anyone can create donations"
  ON donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read donations (for admin dashboard)
CREATE POLICY "Authenticated users can read donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update donation status
CREATE POLICY "Authenticated users can update donation status"
  ON donations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);