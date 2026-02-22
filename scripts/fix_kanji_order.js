/**
 * FIX KANJI ORDER FROM JISHO (Web Scraping)
 * 
 * This script fetches the correct meaning/reading order from Jisho.org kanji pages
 * by scraping the HTML and updates the database to match.
 * 
 * Run with: source ~/.nvm/nvm.sh && nvm use default && node scripts/fix_kanji_order.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch and parse kanji page from Jisho
async function fetchKanjiFromJisho(kanji) {
  try {
    const url = `https://jisho.org/search/${encodeURIComponent(kanji)}%20%23kanji`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) {
      return null
    }
    
    const html = await response.text()
    
    // Parse meanings
    const meaningsMatch = html.match(/<div class="kanji-details__main-meanings">\s*([^<]+)\s*<\/div>/s)
    let meanings = []
    if (meaningsMatch) {
      meanings = meaningsMatch[1]
        .split(',')
        .map(m => m.trim())
        .filter(m => m.length > 0)
    }
    
    // Parse On'yomi readings (extract from anchor tags)
    const onMatch = html.match(/<dt>On:<\/dt>[\s\S]*?<dd class="kanji-details__main-readings-list"[^>]*>([\s\S]*?)<\/dd>/i)
    let onyomi = []
    if (onMatch) {
      const onLinks = onMatch[1].match(/>([ァ-ン]+)<\/a>/g)
      if (onLinks) onyomi = onLinks.map(m => m.replace(/>|<\/a>/g, ''))
    }
    
    // Parse Kun'yomi readings (extract from anchor tags)
    const kunMatch = html.match(/<dt>Kun:<\/dt>[\s\S]*?<dd class="kanji-details__main-readings-list"[^>]*>([\s\S]*?)<\/dd>/i)
    let kunyomi = []
    if (kunMatch) {
      const kunLinks = kunMatch[1].match(/>([ぁ-ん\.\-]+)<\/a>/g)
      if (kunLinks) kunyomi = kunLinks.map(m => m.replace(/>|<\/a>/g, ''))
    }
    
    return {
      meanings,
      kunyomi,
      onyomi
    }
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`)
    return null
  }
}

// Test function for a single kanji
async function testSingle(kanji) {
  console.log(`Testing ${kanji}...`)
  const data = await fetchKanjiFromJisho(kanji)
  console.log('Result:', JSON.stringify(data, null, 2))
  return data
}

// Main function
async function fixAllKanji() {
  // First test with 見
  console.log('🧪 Testing with 見 first...\n')
  const testResult = await testSingle('見')
  
  if (!testResult || !testResult.meanings || testResult.meanings.length === 0) {
    console.log('\n❌ Test failed - Jisho scraping not working')
    console.log('The HTML structure may have changed.')
    return
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('✅ Test passed! Continuing with all kanji...')
  console.log('='.repeat(50) + '\n')
  
  // Get all kanji from database
  const { data: allKanji, error } = await supabase
    .from('kanji')
    .select('id, character, meanings, onyomi, kunyomi, jlpt')
    .order('jlpt', { ascending: false })
  
  if (error) {
    console.log('❌ Error fetching kanji:', error.message)
    return
  }
  
  console.log(`Found ${allKanji.length} kanji to process\n`)
  
  const levels = ['N5', 'N4', 'N3']
  
  for (const level of levels) {
    const kanjiForLevel = allKanji.filter(k => k.jlpt === level)
    console.log(`\n📚 Processing ${level} (${kanjiForLevel.length} kanji)`)
    console.log('-'.repeat(40))
    
    let updated = 0
    let skipped = 0
    
    for (let i = 0; i < kanjiForLevel.length; i++) {
      const k = kanjiForLevel[i]
      
      // Fetch from Jisho
      const jishoData = await fetchKanjiFromJisho(k.character)
      
      if (jishoData && jishoData.meanings && jishoData.meanings.length > 0) {
        // Build update object
        const updateData = {}
        
        if (jishoData.meanings.length > 0) {
          updateData.meanings = jishoData.meanings
        }
        if (jishoData.onyomi.length > 0) {
          updateData.onyomi = jishoData.onyomi
        }
        if (jishoData.kunyomi.length > 0) {
          updateData.kunyomi = jishoData.kunyomi
        }
        
        // Update database
        const { error: updateError } = await supabase
          .from('kanji')
          .update(updateData)
          .eq('id', k.id)
        
        if (!updateError) {
          updated++
          console.log(`   ✅ ${k.character}: ${jishoData.meanings.slice(0, 3).join(', ')}...`)
        } else {
          console.log(`   ❌ ${k.character}: ${updateError.message}`)
        }
      } else {
        skipped++
        console.log(`   ⏭️ ${k.character}: No data found`)
      }
      
      // Rate limit - wait 500ms between requests to be nice to Jisho
      await delay(500)
    }
    
    console.log(`\n   Level ${level}: ✅ ${updated} updated | ⏭️ ${skipped} skipped`)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ Done fixing kanji order!')
}

fixAllKanji()
