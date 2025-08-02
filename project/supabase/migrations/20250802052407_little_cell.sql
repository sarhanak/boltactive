/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, sender name)
      - `email` (text, sender email)
      - `phone` (text, optional phone number)
      - `message` (text, message content)
      - `status` (text, message status)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for public to insert messages
    - Add policy for authenticated users to read messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create contact messages
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read contact messages
CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update message status
CREATE POLICY "Authenticated users can update message status"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);