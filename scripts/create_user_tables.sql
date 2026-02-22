-- ============================================
-- SUPABASE TABLES FOR USER AUTH & DATA
-- Run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. USER PROFILES
-- Stores per-user settings (JLPT level, etc.)
CREATE TABLE IF NOT EXISTS user_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  jlpt_level TEXT NOT NULL DEFAULT 'N5',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. USER KNOWN KANJI
-- Tracks which kanji each user has marked as "known"
CREATE TABLE IF NOT EXISTS user_known_kanji (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kanji_character TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, kanji_character)
);

-- 3. USER MNEMONICS
-- Stores per-user custom mnemonics (previously in localStorage)
CREATE TABLE IF NOT EXISTS user_mnemonics (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kanji_character TEXT NOT NULL,
  components TEXT DEFAULT '',
  story TEXT DEFAULT '',
  hint TEXT DEFAULT '',
  reading_mnemonic TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, kanji_character)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Each user can only see/edit their own data
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_known_kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mnemonics ENABLE ROW LEVEL SECURITY;

-- USER PROFILES policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- USER KNOWN KANJI policies
CREATE POLICY "Users can view own known kanji"
  ON user_known_kanji FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own known kanji"
  ON user_known_kanji FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own known kanji"
  ON user_known_kanji FOR DELETE
  USING (auth.uid() = user_id);

-- USER MNEMONICS policies
CREATE POLICY "Users can view own mnemonics"
  ON user_mnemonics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mnemonics"
  ON user_mnemonics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mnemonics"
  ON user_mnemonics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mnemonics"
  ON user_mnemonics FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_known_kanji_user_id ON user_known_kanji(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mnemonics_user_id ON user_mnemonics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mnemonics_character ON user_mnemonics(user_id, kanji_character);
