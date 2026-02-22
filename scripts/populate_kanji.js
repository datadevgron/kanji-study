/**
 * POPULATE KANJI DATABASE
 * 
 * This script:
 * 1. Fetches kanji lists for N5, N4, N3 from KanjiAPI
 * 2. Gets detailed info for each kanji (meanings, readings, strokes)
 * 3. Inserts them into your Supabase database
 * 
 * Run with: node scripts/populate_kanji.js
 */

import 'dotenv/config'  // Loads .env file
import { createClient } from '@supabase/supabase-js'

// Connect to Supabase using your credentials from .env
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

// Helper: wait between API calls to be nice to the server
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch list of kanji for a JLPT level
async function fetchKanjiList(level) {
  console.log(`📚 Fetching ${level} kanji list...`)
  const response = await fetch(`https://kanjiapi.dev/v1/kanji/jlpt-${level.toLowerCase().replace('n', '')}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${level} kanji list`)
  }
  
  const kanjiList = await response.json()
  console.log(`   Found ${kanjiList.length} kanji for ${level}`)
  return kanjiList
}

// Fetch detailed info for a single kanji
async function fetchKanjiDetails(kanji) {
  const response = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`)
  
  if (!response.ok) {
    console.log(`   ⚠️ Could not fetch details for ${kanji}`)
    return null
  }
  
  return await response.json()
}

// Insert kanji into database
async function insertKanji(kanjiData, jlptLevel) {
  const { data, error } = await supabase
    .from('kanji')
    .upsert({
      character: kanjiData.kanji,
      meanings: kanjiData.meanings || [],
      onyomi: kanjiData.on_readings || [],
      kunyomi: kanjiData.kun_readings || [],
      jlpt: jlptLevel,
      stroke_count: kanjiData.stroke_count || null
    }, {
      onConflict: 'character'  // If kanji exists, update it
    })
    .select()
  
  if (error) {
    console.log(`   ❌ Error inserting ${kanjiData.kanji}: ${error.message}`)
    return null
  }
  
  return data[0]
}

// Main function
async function main() {
  console.log('🚀 Starting kanji database population...\n')
  
  // Process each JLPT level
  const levels = ['N5', 'N4', 'N3']
  let totalInserted = 0
  
  for (const level of levels) {
    console.log(`\n${'='.repeat(50)}`)
    console.log(`Processing ${level}`)
    console.log('='.repeat(50))
    
    // Get list of kanji for this level
    const kanjiList = await fetchKanjiList(level)
    
    // Process each kanji
    for (let i = 0; i < kanjiList.length; i++) {
      const kanji = kanjiList[i]
      
      // Show progress
      process.stdout.write(`\r   Processing ${i + 1}/${kanjiList.length}: ${kanji}`)
      
      // Fetch details from KanjiAPI
      const details = await fetchKanjiDetails(kanji)
      
      if (details) {
        // Insert into database
        const inserted = await insertKanji(details, level)
        if (inserted) {
          totalInserted++
        }
      }
      
      // Small delay to avoid rate limiting
      await delay(100)
    }
    
    console.log(`\n   ✅ Finished ${level}`)
  }
  
  console.log(`\n${'='.repeat(50)}`)
  console.log(`🎉 Done! Inserted ${totalInserted} kanji into database`)
  console.log('='.repeat(50))
}

// Run the script
main().catch(console.error)
