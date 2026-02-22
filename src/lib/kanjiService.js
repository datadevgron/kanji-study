/**
 * SUPABASE DATA SERVICE
 * 
 * This module provides functions to fetch kanji, vocab, and mnemonics
 * from your Supabase database.
 */

import { supabase } from './supabase'

/**
 * Fetch all kanji for specified JLPT levels
 * @param {string[]} levels - Array of JLPT levels like ['N5', 'N4', 'N3']
 * @returns {Promise<Object>} - Object mapping kanji character to its data
 */
export async function fetchKanjiByLevels(levels) {
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .in('jlpt', levels)
    .order('jlpt', { ascending: false })
    .order('stroke_count', { ascending: true })
    .order('id', { ascending: true })
  
  if (error) {
    console.error('Error fetching kanji:', error.message)
    return {}
  }
  
  // Convert array to object keyed by character
  const kanjiMap = {}
  for (const k of data) {
    kanjiMap[k.character] = {
      id: k.id,
      kanji: k.character,
      meanings: k.meanings || [],
      onyomi: k.onyomi || [],
      kunyomi: k.kunyomi || [],
      jlpt: k.jlpt,
      stroke_count: k.stroke_count
    }
  }
  
  return kanjiMap
}

/**
 * Fetch all kanji characters as a list (sorted by stroke count within each level)
 * @param {string[]} levels - Array of JLPT levels
 * @returns {Promise<string[]>} - Array of kanji characters
 */
export async function fetchKanjiList(levels) {
  const { data, error } = await supabase
    .from('kanji')
    .select('character, jlpt, id, stroke_count')
    .in('jlpt', levels)
    .order('jlpt', { ascending: false })
    .order('stroke_count', { ascending: true })
    .order('id', { ascending: true })
  
  if (error) {
    console.error('Error fetching kanji list:', error.message)
    return []
  }
  
  return data.map(k => k.character)
}

/**
 * Fetch vocab words for a specific kanji
 * @param {number} kanjiId - The database ID of the kanji
 * @param {string} userLevel - User's JLPT level to filter vocab
 * @param {Set<string>} knownKanjiChars - Set of all kanji characters at user's level
 * @returns {Promise<Array>} - Array of vocab words
 */
export async function fetchVocabForKanji(kanjiId, userLevel = 'N5', knownKanjiChars = null) {
  // Determine which JLPT levels to include based on user level
  const levelMap = {
    'N5': ['N5'],
    'N4': ['N5', 'N4'],
    'N3': ['N5', 'N4', 'N3'],
    'N2': ['N5', 'N4', 'N3', 'N2'],
    'N1': ['N5', 'N4', 'N3', 'N2', 'N1']
  }
  const allowedLevels = levelMap[userLevel] || ['N5']
  
  const { data, error } = await supabase
    .from('vocab')
    .select('*')
    .eq('kanji_id', kanjiId)
  
  if (error) {
    console.error('Error fetching vocab:', error.message)
    return []
  }
  
  // Regex to detect kanji characters (CJK Unified Ideographs range)
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/g

  // Filter by JLPT level and kanji knowledge
  return data
    .filter(v => !v.jlpt || allowedLevels.includes(v.jlpt))
    .filter(v => {
      // If no known kanji set provided, skip this filter
      if (!knownKanjiChars) return true
      // Check every kanji character in the vocab word is known
      const kanjiInWord = v.word.match(kanjiRegex) || []
      return kanjiInWord.every(ch => knownKanjiChars.has(ch))
    })
    .map(v => ({
      word: v.word,
      reading: v.reading,
      meaning: v.meaning,
      jlpt: v.jlpt
    }))
}

/**
 * Fetch vocab by kanji character (convenience function)
 * Searches for all vocab words containing this character
 * @param {string} character - The kanji character
 * @param {string} userLevel - User's JLPT level
 * @param {Set<string>} knownKanjiChars - Set of all kanji characters at user's level
 * @returns {Promise<Array>} - Array of vocab words
 */
export async function fetchVocabByCharacter(character, userLevel = 'N5', knownKanjiChars = null) {
  // Determine which JLPT levels to include based on user level
  const levelMap = {
    'N5': ['N5'],
    'N4': ['N5', 'N4'],
    'N3': ['N5', 'N4', 'N3'],
    'N2': ['N5', 'N4', 'N3', 'N2'],
    'N1': ['N5', 'N4', 'N3', 'N2', 'N1']
  }
  const allowedLevels = levelMap[userLevel] || ['N5']
  
  // Search for all vocab containing this character (using LIKE pattern)
  const { data, error } = await supabase
    .from('vocab')
    .select('*')
    .like('word', `%${character}%`)
  
  if (error) {
    console.error('Error fetching vocab:', error.message)
    return []
  }
  
  // Regex to detect kanji characters (CJK Unified Ideographs range)
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/g

  // Filter by JLPT level and kanji knowledge
  return (data || [])
    .filter(v => !v.jlpt || allowedLevels.includes(v.jlpt))
    .filter(v => {
      // If no known kanji set provided, skip this filter
      if (!knownKanjiChars) return true
      // Check every kanji character in the vocab word is known
      const kanjiInWord = v.word.match(kanjiRegex) || []
      return kanjiInWord.every(ch => knownKanjiChars.has(ch))
    })
    .map(v => ({
      word: v.word,
      reading: v.reading,
      meaning: v.meaning,
      jlpt: v.jlpt
    }))
}

/**
 * Update kanji meanings in the database
 * @param {string} character - The kanji character
 * @param {string[]} meanings - New array of meanings
 * @returns {Promise<boolean>} - Success status
 */
export async function updateKanjiMeanings(character, meanings) {
  const { error } = await supabase
    .from('kanji')
    .update({ meanings })
    .eq('character', character)
  
  if (error) {
    console.error('Error updating kanji meanings:', error.message)
    return false
  }
  
  return true
}

/**
 * Update kanji onyomi readings in the database
 * @param {string} character - The kanji character
 * @param {string[]} onyomi - New array of onyomi readings
 * @returns {Promise<boolean>} - Success status
 */
export async function updateKanjiOnyomi(character, onyomi) {
  const { error } = await supabase
    .from('kanji')
    .update({ onyomi })
    .eq('character', character)
  
  if (error) {
    console.error('Error updating kanji onyomi:', error.message)
    return false
  }
  
  return true
}

/**
 * Update kanji kunyomi readings in the database
 * @param {string} character - The kanji character
 * @param {string[]} kunyomi - New array of kunyomi readings
 * @returns {Promise<boolean>} - Success status
 */
export async function updateKanjiKunyomi(character, kunyomi) {
  const { error } = await supabase
    .from('kanji')
    .update({ kunyomi })
    .eq('character', character)
  
  if (error) {
    console.error('Error updating kanji kunyomi:', error.message)
    return false
  }
  
  return true
}

/**
 * Update vocab meaning in the database
 * @param {string} word - The vocab word
 * @param {string} reading - The reading (to uniquely identify)
 * @param {string} meaning - New meaning
 * @returns {Promise<boolean>} - Success status
 */
export async function updateVocabMeaning(word, reading, meaning) {
  const { error } = await supabase
    .from('vocab')
    .update({ meaning })
    .eq('word', word)
    .eq('reading', reading)
  
  if (error) {
    console.error('Error updating vocab meaning:', error.message)
    return false
  }
  
  return true
}

/**
 * Fetch a single kanji's full data including vocab
 * @param {string} character - The kanji character
 * @param {string} userLevel - User's JLPT level
 * @returns {Promise<Object>} - Kanji data with vocab
 */
export async function fetchKanjiWithVocab(character, userLevel = 'N5') {
  // Fetch kanji
  const { data: kanji, error: kanjiError } = await supabase
    .from('kanji')
    .select('*')
    .eq('character', character)
    .single()
  
  if (kanjiError || !kanji) {
    console.error('Error fetching kanji:', kanjiError?.message)
    return null
  }
  
  // Fetch vocab
  const vocab = await fetchVocabForKanji(kanji.id, userLevel)
  
  return {
    id: kanji.id,
    kanji: kanji.character,
    meanings: kanji.meanings || [],
    onyomi: kanji.onyomi || [],
    kunyomi: kanji.kunyomi || [],
    jlpt: kanji.jlpt,
    stroke_count: kanji.stroke_count,
    vocab
  }
}

/**
 * Fetch mnemonic for a kanji
 * @param {string} character - The kanji character
 * @returns {Promise<Object|null>} - Mnemonic data or null
 */
export async function fetchMnemonic(character) {
  // First, get the kanji_id from the kanji table
  const { data: kanjiData } = await supabase
    .from('kanji')
    .select('id')
    .eq('character', character)
    .single()
  
  if (!kanjiData) {
    return null
  }
  
  // Now fetch the mnemonic using kanji_id
  const { data, error } = await supabase
    .from('mnemonics')
    .select('*')
    .eq('kanji_id', kanjiData.id)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return {
    radicals: data.radicals || [],
    components: data.components || '',
    story: data.story || '',
    hint: data.hint || '',
    reading: data.reading_mnemonic || ''  // Note: column is reading_mnemonic not reading
  }
}

/**
 * Save or update mnemonic for a kanji
 * @param {string} character - The kanji character
 * @param {Object} mnemonic - Mnemonic data { radicals, components, story, hint, reading }
 * @returns {Promise<boolean>} - Success status
 */
export async function saveMnemonic(character, mnemonic) {
  // First, get the kanji_id from the kanji table
  const { data: kanjiData } = await supabase
    .from('kanji')
    .select('id')
    .eq('character', character)
    .single()
  
  if (!kanjiData) {
    console.error('Kanji not found:', character)
    return false
  }
  
  // Check if mnemonic exists for this kanji_id
  const { data: existing } = await supabase
    .from('mnemonics')
    .select('id')
    .eq('kanji_id', kanjiData.id)
    .single()
  
  if (existing) {
    // Update existing
    const { error } = await supabase
      .from('mnemonics')
      .update({
        radicals: mnemonic.radicals || [],
        components: mnemonic.components || '',
        story: mnemonic.story || '',
        hint: mnemonic.hint || '',
        reading_mnemonic: mnemonic.reading || ''
      })
      .eq('kanji_id', kanjiData.id)
    
    if (error) {
      console.error('Error updating mnemonic:', error.message)
      return false
    }
  } else {
    // Insert new
    const { error } = await supabase
      .from('mnemonics')
      .insert({
        kanji_id: kanjiData.id,
        radicals: mnemonic.radicals || [],
        components: mnemonic.components || '',
        story: mnemonic.story || '',
        hint: mnemonic.hint || '',
        reading_mnemonic: mnemonic.reading || ''
      })
    
    if (error) {
      console.error('Error inserting mnemonic:', error.message)
      return false
    }
  }
  
  return true
}
