/**
 * USER DATA SERVICE
 * 
 * Saves and loads per-user data:
 * - JLPT level
 * - Known kanji set
 * - User mnemonics (previously in localStorage)
 * 
 * Uses Supabase tables: user_profiles, user_known_kanji, user_mnemonics
 */

import { supabase } from './supabase'

// ──────────────────────────────────────
// USER PROFILE (jlpt level)
// ──────────────────────────────────────

/**
 * Load user profile (jlpt_level)
 */
export async function loadUserProfile(userId) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('jlpt_level')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return null
  }
  return data
}

/**
 * Save or create user profile
 */
export async function saveUserProfile(userId, jlptLevel) {
  const { data: existing } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('user_profiles')
      .update({ jlpt_level: jlptLevel })
      .eq('user_id', userId)
    if (error) console.error('Error updating profile:', error.message)
  } else {
    const { error } = await supabase
      .from('user_profiles')
      .insert({ user_id: userId, jlpt_level: jlptLevel })
    if (error) console.error('Error creating profile:', error.message)
  }
}

// ──────────────────────────────────────
// KNOWN KANJI
// ──────────────────────────────────────

/**
 * Load all known kanji for a user
 * @returns {Set<string>}
 */
export async function loadKnownKanji(userId) {
  const { data, error } = await supabase
    .from('user_known_kanji')
    .select('kanji_character')
    .eq('user_id', userId)

  if (error) {
    console.error('Error loading known kanji:', error.message)
    return new Set()
  }
  const result = new Set(data.map(row => row.kanji_character))
  console.log('[userDataService] Loaded known kanji from DB:', result.size, 'characters', [...result].join(', '))
  return result
}

/**
 * Save known kanji — syncs the full set (adds new, removes un-marked)
 */
export async function saveKnownKanji(userId, knownSet) {
  console.log('[userDataService] saveKnownKanji called with', knownSet.size, 'characters:', [...knownSet].join(', '))
  // Get current DB state
  const { data: existing, error: fetchErr } = await supabase
    .from('user_known_kanji')
    .select('kanji_character')
    .eq('user_id', userId)

  if (fetchErr) {
    console.error('Error fetching known kanji:', fetchErr.message)
    return
  }

  const dbSet = new Set(existing.map(r => r.kanji_character))
  
  // Characters to add (in knownSet but not in DB)
  const toAdd = [...knownSet].filter(k => !dbSet.has(k))
  // Characters to remove (in DB but not in knownSet)
  const toRemove = [...dbSet].filter(k => !knownSet.has(k))

  console.log('[userDataService] DB has:', dbSet.size, '| Want:', knownSet.size, '| toAdd:', toAdd.length, '| toRemove:', toRemove.length)

  // Batch insert new
  if (toAdd.length > 0) {
    const rows = toAdd.map(k => ({ user_id: userId, kanji_character: k }))
    const { error } = await supabase
      .from('user_known_kanji')
      .insert(rows)
    if (error) console.error('Error adding known kanji:', error.message)
  }

  // Batch delete removed
  if (toRemove.length > 0) {
    const { error } = await supabase
      .from('user_known_kanji')
      .delete()
      .eq('user_id', userId)
      .in('kanji_character', toRemove)
    if (error) console.error('Error removing known kanji:', error.message)
  }
}

// ──────────────────────────────────────
// USER MNEMONICS
// ──────────────────────────────────────

/**
 * Load a user's custom mnemonic for a kanji
 */
export async function loadUserMnemonic(userId, character) {
  const { data, error } = await supabase
    .from('user_mnemonics')
    .select('*')
    .eq('user_id', userId)
    .eq('kanji_character', character)
    .single()

  if (error || !data) return null

  return {
    components: data.components || '',
    story: data.story || '',
    hint: data.hint || '',
    reading: data.reading_mnemonic || ''
  }
}

/**
 * Save or update a user's custom mnemonic
 */
export async function saveUserMnemonic(userId, character, mnemonic) {
  const { data: existing } = await supabase
    .from('user_mnemonics')
    .select('id')
    .eq('user_id', userId)
    .eq('kanji_character', character)
    .single()

  const row = {
    user_id: userId,
    kanji_character: character,
    components: mnemonic.components || '',
    story: mnemonic.story || '',
    hint: mnemonic.hint || '',
    reading_mnemonic: mnemonic.reading || ''
  }

  if (existing) {
    const { error } = await supabase
      .from('user_mnemonics')
      .update(row)
      .eq('id', existing.id)
    if (error) {
      console.error('Error updating user mnemonic:', error.message)
      return false
    }
  } else {
    const { error } = await supabase
      .from('user_mnemonics')
      .insert(row)
    if (error) {
      console.error('Error inserting user mnemonic:', error.message)
      return false
    }
  }
  return true
}

/**
 * Delete a user's custom mnemonic
 */
export async function deleteUserMnemonicDB(userId, character) {
  const { error } = await supabase
    .from('user_mnemonics')
    .delete()
    .eq('user_id', userId)
    .eq('kanji_character', character)

  if (error) {
    console.error('Error deleting user mnemonic:', error.message)
    return false
  }
  return true
}
