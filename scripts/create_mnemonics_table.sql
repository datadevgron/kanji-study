-- Run this in Supabase SQL Editor to create the mnemonics table

CREATE TABLE IF NOT EXISTS mnemonics (
  id SERIAL PRIMARY KEY,
  character TEXT NOT NULL UNIQUE,
  radicals JSONB DEFAULT '[]',
  components TEXT DEFAULT '',
  story TEXT DEFAULT '',
  hint TEXT DEFAULT '',
  reading TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_mnemonics_character ON mnemonics(character);

-- Enable RLS but allow all operations for now
ALTER TABLE mnemonics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on mnemonics" ON mnemonics
  FOR ALL USING (true) WITH CHECK (true);
