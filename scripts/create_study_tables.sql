-- ============================================
-- STUDY PLAN & SRS TABLES
-- Run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. USER STUDY SETTINGS
-- Stores weekly goals and custom SRS intervals
CREATE TABLE IF NOT EXISTS user_study_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weekly_goal INT NOT NULL DEFAULT 10,
  -- SRS intervals in days, JSON array e.g. [1, 1, 2, 3, 5, 8, 14]
  -- After completing all intervals, kanji is marked as "known"
  srs_intervals JSONB NOT NULL DEFAULT '[1, 1, 2, 3, 5, 8, 14]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. USER STUDY QUEUE
-- Kanji that user has selected to learn, with SRS progress
CREATE TABLE IF NOT EXISTS user_study_queue (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kanji_character TEXT NOT NULL,
  -- Stage in SRS (0 = new/learning, 1+ = review stages based on srs_intervals)
  srs_stage INT NOT NULL DEFAULT 0,
  -- Next review date (null = available now for first learning)
  next_review TIMESTAMPTZ DEFAULT NULL,
  -- How many times reviewed successfully
  review_count INT NOT NULL DEFAULT 0,
  -- Consecutive correct answers (resets on wrong answer)
  streak INT NOT NULL DEFAULT 0,
  -- Date added to study queue
  added_at TIMESTAMPTZ DEFAULT NOW(),
  -- Last reviewed
  last_reviewed TIMESTAMPTZ DEFAULT NULL,
  -- Week number when added (for weekly planning)
  week_added INT DEFAULT NULL,
  UNIQUE(user_id, kanji_character)
);

-- 3. USER QUIZ HISTORY
-- Track quiz attempts and scores
CREATE TABLE IF NOT EXISTS user_quiz_history (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_date TIMESTAMPTZ DEFAULT NOW(),
  -- JSON array of kanji tested
  kanji_tested JSONB NOT NULL DEFAULT '[]',
  -- Number correct
  correct_count INT NOT NULL DEFAULT 0,
  -- Total questions
  total_count INT NOT NULL DEFAULT 0,
  -- Quiz type: 'meaning', 'reading', 'mixed'
  quiz_type TEXT DEFAULT 'mixed'
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE user_study_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_study_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_history ENABLE ROW LEVEL SECURITY;

-- USER STUDY SETTINGS policies
CREATE POLICY "Users can view own study settings"
  ON user_study_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study settings"
  ON user_study_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study settings"
  ON user_study_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- USER STUDY QUEUE policies
CREATE POLICY "Users can view own study queue"
  ON user_study_queue FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study queue"
  ON user_study_queue FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study queue"
  ON user_study_queue FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own study queue"
  ON user_study_queue FOR DELETE
  USING (auth.uid() = user_id);

-- USER QUIZ HISTORY policies
CREATE POLICY "Users can view own quiz history"
  ON user_quiz_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz history"
  ON user_quiz_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_study_settings_user_id ON user_study_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_study_queue_user_id ON user_study_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_user_study_queue_next_review ON user_study_queue(user_id, next_review);
CREATE INDEX IF NOT EXISTS idx_user_quiz_history_user_id ON user_quiz_history(user_id);
