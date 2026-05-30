-- Supabase SQL Schema for Gallery CRUD Application
-- Run this script in Supabase SQL Editor

-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_title ON gallery_items(title);
CREATE INDEX IF NOT EXISTS idx_gallery_items_created_at ON gallery_items(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all items
CREATE POLICY "Allow authenticated users to read items"
  ON gallery_items
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to insert items
CREATE POLICY "Allow authenticated users to insert items"
  ON gallery_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for authenticated users to update items
CREATE POLICY "Allow authenticated users to update items"
  ON gallery_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to delete items
CREATE POLICY "Allow authenticated users to delete items"
  ON gallery_items
  FOR DELETE
  TO authenticated
  USING (true);

-- If you want to allow anonymous access, uncomment the following:
-- CREATE POLICY "Allow anonymous users to read items"
--   ON gallery_items
--   FOR SELECT
--   TO anon
--   USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row update
DROP TRIGGER IF EXISTS update_gallery_items_updated_at ON gallery_items;
CREATE TRIGGER update_gallery_items_updated_at
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
