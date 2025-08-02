/*
  # Create newsletter subscription table

  1. New Tables
    - `newsletter`
      - `id` (uuid, primary key)
      - `email` (text, unique subscriber email)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, subscription status)

  2. Security
    - Enable RLS on `newsletter` table
    - Add policy for public to insert subscriptions
    - Add policy for authenticated users to read subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read newsletter subscriptions
CREATE POLICY "Authenticated users can read newsletter subscriptions"
  ON newsletter
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update subscription status
CREATE POLICY "Authenticated users can update subscription status"
  ON newsletter
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);