-- Add order_index column to user_study_queue for persistent drag-and-drop ordering
-- Run this in Supabase SQL Editor

-- Add the column (will be NULL for existing rows)
ALTER TABLE user_study_queue 
ADD COLUMN IF NOT EXISTS order_index INT DEFAULT NULL;

-- Initialize order_index for existing rows based on added_at order
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY added_at) as rn
  FROM user_study_queue
)
UPDATE user_study_queue 
SET order_index = ordered.rn
FROM ordered
WHERE user_study_queue.id = ordered.id;

-- Make order_index NOT NULL after initialization
-- ALTER TABLE user_study_queue ALTER COLUMN order_index SET NOT NULL;
