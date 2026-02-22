/**
 * POPULATE VOCAB DATABASE
 * 
 * This script:
 * 1. Gets all kanji from our database
 * 2. Fetches vocab words for each kanji from Jisho API
 * 3. Inserts them into the vocab table
 * 
 * Run with: node scripts/populate_vocab.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch vocab from Jisho API
async function fetchVocabFromJisho(kanji) {
  const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(kanji)}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) return []
    
    const json = await response.json()
    const words = []
    let hasKanjiItself = false  // Track if we've added the kanji by itself
    
    // Get up to 10 words per kanji
    for (const item of json.data.slice(0, 15)) {
      const japanese = item.japanese[0]
      const sense = item.senses[0]
      
      // Only include words that contain our kanji
      const word = japanese.word || japanese.reading
      if (!word || !word.includes(kanji)) continue
      
      // If this is the kanji by itself, only keep the first one (main reading)
      if (word === kanji) {
        if (hasKanjiItself) continue  // Skip duplicate readings of kanji itself
        hasKanjiItself = true
      }
      
      // Get JLPT level if available
      let jlpt = null
      if (item.jlpt && item.jlpt.length > 0) {
        jlpt = item.jlpt[0].replace('jlpt-', '').toUpperCase()
      }
      
      words.push({
        word: word,
        reading: japanese.reading || '',
        meaning: sense.english_definitions.slice(0, 3).join('; '),
        jlpt: jlpt
      })
      
      // Stop at 10 words
      if (words.length >= 10) break
    }
    
    return words
  } catch (error) {
    console.log(`   ⚠️ Error fetching vocab for ${kanji}: ${error.message}`)
    return []
  }
}

// Insert vocab into database
async function insertVocab(kanjiId, vocabList) {
  if (vocabList.length === 0) return 0
  
  const vocabData = vocabList.map(v => ({
    kanji_id: kanjiId,
    word: v.word,
    reading: v.reading,
    meaning: v.meaning,
    jlpt: v.jlpt
  }))
  
  const { error } = await supabase
    .from('vocab')
    .upsert(vocabData, {
      onConflict: 'kanji_id,word',
      ignoreDuplicates: true
    })
  
  if (error) {
    // Likely duplicate, try inserting one by one
    let inserted = 0
    for (const v of vocabData) {
      const { error: singleError } = await supabase
        .from('vocab')
        .insert(v)
      if (!singleError) inserted++
    }
    return inserted
  }
  
  return vocabList.length
}

async function main() {
  console.log('🚀 Starting vocab population...\n')
  
  // Get all kanji from database
  const { data: kanjiList, error } = await supabase
    .from('kanji')
    .select('id, character, jlpt')
    .order('jlpt', { ascending: false })  // N5 first, then N4, N3
  
  if (error) {
    console.error('Failed to fetch kanji:', error.message)
    return
  }
  
  console.log(`Found ${kanjiList.length} kanji to process\n`)
  
  let totalVocab = 0
  
  for (let i = 0; i < kanjiList.length; i++) {
    const kanji = kanjiList[i]
    
    process.stdout.write(`\r[${i + 1}/${kanjiList.length}] ${kanji.character} (${kanji.jlpt})...`)
    
    // Fetch vocab from Jisho
    const vocab = await fetchVocabFromJisho(kanji.character)
    
    // Insert into database
    const inserted = await insertVocab(kanji.id, vocab)
    totalVocab += inserted
    
    process.stdout.write(` ${vocab.length} words`)
    
    // Delay to avoid rate limiting Jisho
    await delay(300)
  }
  
  console.log(`\n\n${'='.repeat(50)}`)
  console.log(`🎉 Done! Added ${totalVocab} vocab words`)
  console.log('='.repeat(50))
}

main().catch(console.error)
