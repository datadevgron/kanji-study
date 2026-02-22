/**
 * STUDY SERVICE
 * 
 * Manages:
 * - Study settings (weekly goal, SRS intervals)
 * - Study queue (kanji to learn with SRS progress)
 * - Quiz history
 * 
 * Uses Supabase tables: user_study_settings, user_study_queue, user_quiz_history
 */

import { supabase } from './supabase'

// Default SRS intervals (in days)
// After completing all stages, kanji is marked as "known"
export const DEFAULT_SRS_INTERVALS = [1, 1, 2, 3, 5, 8, 14]

// ──────────────────────────────────────
// STUDY SETTINGS
// ──────────────────────────────────────

/**
 * Load user study settings
 */
export async function loadStudySettings(userId) {
  const { data, error } = await supabase
    .from('user_study_settings')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return {
      weekly_goal: 10,
      srs_intervals: DEFAULT_SRS_INTERVALS
    }
  }
  return {
    weekly_goal: data.weekly_goal,
    srs_intervals: data.srs_intervals || DEFAULT_SRS_INTERVALS
  }
}

/**
 * Save user study settings
 */
export async function saveStudySettings(userId, settings) {
  const { data: existing } = await supabase
    .from('user_study_settings')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('user_study_settings')
      .update({
        weekly_goal: settings.weekly_goal,
        srs_intervals: settings.srs_intervals,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
    if (error) console.error('Error updating study settings:', error.message)
  } else {
    const { error } = await supabase
      .from('user_study_settings')
      .insert({
        user_id: userId,
        weekly_goal: settings.weekly_goal,
        srs_intervals: settings.srs_intervals
      })
    if (error) console.error('Error creating study settings:', error.message)
  }
}

// ──────────────────────────────────────
// STUDY QUEUE
// ──────────────────────────────────────

/**
 * Load entire study queue for a user (sorted by order_index if available, otherwise added_at)
 */
export async function loadStudyQueue(userId) {
  const { data, error } = await supabase
    .from('user_study_queue')
    .select('*')
    .eq('user_id', userId)
    .order('order_index', { ascending: true, nullsFirst: false })
    .order('added_at', { ascending: true })

  if (error) {
    console.error('Error loading study queue:', error.message)
    return []
  }
  return data || []
}

/**
 * Add kanji to study queue with order_index
 */
export async function addToStudyQueue(userId, kanjiChars, weekNumber = null) {
  // Get the current max order_index
  const { data: existing } = await supabase
    .from('user_study_queue')
    .select('order_index')
    .eq('user_id', userId)
    .order('order_index', { ascending: false })
    .limit(1)
  
  let nextIndex = (existing?.[0]?.order_index || 0) + 1
  
  const rows = kanjiChars.map((k, i) => ({
    user_id: userId,
    kanji_character: k,
    srs_stage: 0,
    next_review: null,
    review_count: 0,
    streak: 0,
    week_added: weekNumber,
    order_index: nextIndex + i
  }))

  console.log('Adding to study queue:', { userId, count: kanjiChars.length, weekNumber })
  
  const { data, error } = await supabase
    .from('user_study_queue')
    .upsert(rows, { onConflict: 'user_id,kanji_character' })
    .select()

  if (error) {
    console.error('Error adding to study queue:', error.message, error)
    return { success: false, error: error.message }
  }
  
  console.log('Successfully added to queue:', data?.length || kanjiChars.length, 'kanji')
  return { success: true, count: data?.length || kanjiChars.length }
}

/**
 * Remove kanji from study queue
 */
export async function removeFromStudyQueue(userId, kanjiChars) {
  const { error } = await supabase
    .from('user_study_queue')
    .delete()
    .eq('user_id', userId)
    .in('kanji_character', kanjiChars)

  if (error) console.error('Error removing from study queue:', error.message)
}

/**
 * Reorder kanji in study queue (for drag and drop)
 * @param userId - User ID
 * @param orderedKanji - Array of kanji characters in the new order
 */
export async function reorderStudyQueue(userId, orderedKanji) {
  // Update each kanji with its new order_index
  const updates = orderedKanji.map((k, index) => ({
    user_id: userId,
    kanji_character: k,
    order_index: index + 1
  }))
  
  // Update in batches
  for (const update of updates) {
    const { error } = await supabase
      .from('user_study_queue')
      .update({ order_index: update.order_index })
      .eq('user_id', userId)
      .eq('kanji_character', update.kanji_character)
    
    if (error) {
      console.error('Error reordering:', error.message)
      return false
    }
  }
  
  return true
}

/**
 * Get kanji due for review
 * - Overdue kanji with next_review <= now (always included)
 * - New kanji (stage 0) up to the weekly goal limit
 * @param weeklyGoal - how many new kanji to learn per week
 */
export async function getDueForReview(userId, weeklyGoal = 10) {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay()) // Sunday
  startOfWeek.setHours(0, 0, 0, 0)
  
  const { data, error } = await supabase
    .from('user_study_queue')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: true })

  if (error) {
    console.error('Error getting due reviews:', error.message)
    return []
  }
  
  const queue = data || []
  
  // Count how many already learned this week
  const learnedThisWeek = queue.filter(q => {
    if (!q.last_reviewed) return false
    const reviewedDate = new Date(q.last_reviewed)
    return reviewedDate >= startOfWeek
  }).length
  
  // Separate overdue and new kanji
  const overdueKanji = queue.filter(q => q.next_review && new Date(q.next_review) <= now)
  const newKanji = queue.filter(q => !q.next_review && q.srs_stage === 0)
  
  // Calculate how many new kanji to include (respect weekly goal)
  const remainingGoal = Math.max(0, weeklyGoal - learnedThisWeek)
  const newKanjiToInclude = newKanji.slice(0, remainingGoal)
  
  // Return overdue first, then new kanji up to goal
  return [...overdueKanji, ...newKanjiToInclude]
}

/**
 * Update kanji after review (correct or incorrect)
 * @param correct - whether the answer was correct
 * @param srsIntervals - the user's SRS intervals array
 * @returns {boolean} - true if kanji completed all SRS stages (should be marked known)
 */
export async function updateReview(userId, kanjiChar, correct, srsIntervals = DEFAULT_SRS_INTERVALS) {
  // Get current state
  const { data: current, error: fetchErr } = await supabase
    .from('user_study_queue')
    .select('*')
    .eq('user_id', userId)
    .eq('kanji_character', kanjiChar)
    .single()

  if (fetchErr || !current) {
    console.error('Error fetching kanji for review update:', fetchErr?.message)
    return false
  }

  let newStage = current.srs_stage
  let newStreak = current.streak
  let newReviewCount = current.review_count
  let nextReview = null
  let completed = false

  if (correct) {
    newStage = current.srs_stage + 1
    newStreak = current.streak + 1
    newReviewCount = current.review_count + 1

    // Check if completed all SRS stages
    if (newStage >= srsIntervals.length) {
      completed = true
      // Remove from queue - will be marked as known by caller
      await supabase
        .from('user_study_queue')
        .delete()
        .eq('user_id', userId)
        .eq('kanji_character', kanjiChar)
      return completed
    }

    // Calculate next review date
    const daysUntilNext = srsIntervals[newStage] || 1
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + daysUntilNext)
    nextReview = nextDate.toISOString()
  } else {
    // Wrong answer - reset to stage 0 or go back a stage
    newStage = Math.max(0, current.srs_stage - 1)
    newStreak = 0
    // Review again soon (next day)
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + 1)
    nextReview = nextDate.toISOString()
  }

  const { error } = await supabase
    .from('user_study_queue')
    .update({
      srs_stage: newStage,
      streak: newStreak,
      review_count: newReviewCount,
      next_review: nextReview,
      last_reviewed: new Date().toISOString()
    })
    .eq('user_id', userId)
    .eq('kanji_character', kanjiChar)

  if (error) console.error('Error updating review:', error.message)
  return completed
}

/**
 * Get study progress summary
 */
export async function getStudyProgress(userId, weeklyGoal = 10) {
  const queue = await loadStudyQueue(userId)
  
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay()) // Sunday
  startOfWeek.setHours(0, 0, 0, 0)
  
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)

  // Count kanji that have been REVIEWED at least once this week
  // (not just added, but actually studied)
  const learnedThisWeek = queue.filter(q => {
    if (!q.last_reviewed) return false // Never reviewed
    const reviewedDate = new Date(q.last_reviewed)
    return reviewedDate >= startOfWeek && reviewedDate < endOfWeek
  }).length

  // Count by SRS stage
  const byStage = {}
  queue.forEach(q => {
    byStage[q.srs_stage] = (byStage[q.srs_stage] || 0) + 1
  })

  // Separate new kanji (never reviewed) from those with scheduled reviews
  const newKanji = queue.filter(q => !q.next_review && q.srs_stage === 0)
  const overdueKanji = queue.filter(q => q.next_review && new Date(q.next_review) <= now)
  
  // For new kanji, only count up to (weeklyGoal - learnedThisWeek) as "due"
  // This represents how many more new kanji you should learn this week
  const remainingGoal = Math.max(0, weeklyGoal - learnedThisWeek)
  const newKanjiDue = Math.min(newKanji.length, remainingGoal)
  
  // Total due = overdue reviews + new kanji for this week's goal
  const dueNow = overdueKanji.length + newKanjiDue

  return {
    totalInQueue: queue.length,
    learnedThisWeek,
    dueForReview: dueNow,
    byStage,
    newKanjiAvailable: newKanji.length,
    overdueCount: overdueKanji.length
  }
}

// ──────────────────────────────────────
// QUIZ HISTORY
// ──────────────────────────────────────

/**
 * Save a quiz result
 */
export async function saveQuizResult(userId, kanjiTested, correctCount, totalCount, quizType = 'mixed') {
  const { error } = await supabase
    .from('user_quiz_history')
    .insert({
      user_id: userId,
      kanji_tested: kanjiTested,
      correct_count: correctCount,
      total_count: totalCount,
      quiz_type: quizType
    })

  if (error) console.error('Error saving quiz result:', error.message)
}

/**
 * Get recent quiz history
 */
export async function getQuizHistory(userId, limit = 10) {
  const { data, error } = await supabase
    .from('user_quiz_history')
    .select('*')
    .eq('user_id', userId)
    .order('quiz_date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error loading quiz history:', error.message)
    return []
  }
  return data || []
}

// ──────────────────────────────────────
// STUDY PLAN GENERATOR
// ──────────────────────────────────────

/**
 * Generate a study plan based on selected kanji and weekly goal
 * @param selectedKanji - array of kanji characters to learn
 * @param weeklyGoal - number of kanji per week
 * @returns Array of week objects: [{ week: 1, kanji: ['日', '月', ...] }, ...]
 */
export function generateStudyPlan(selectedKanji, weeklyGoal) {
  const plan = []
  let week = 1
  
  for (let i = 0; i < selectedKanji.length; i += weeklyGoal) {
    plan.push({
      week,
      kanji: selectedKanji.slice(i, i + weeklyGoal)
    })
    week++
  }
  
  return plan
}

/**
 * Get week number of the year
 */
export function getWeekNumber(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date - start
  const oneWeek = 604800000 // milliseconds in a week
  return Math.ceil((diff + start.getDay() * 86400000) / oneWeek)
}
