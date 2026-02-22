/**
 * POPULATE MNEMONICS DATABASE
 * 
 * This script imports existing mnemonics from mnemonics.js into Supabase.
 * 
 * First, create the table in Supabase SQL Editor:
 * 
 * CREATE TABLE mnemonics (
 *   id SERIAL PRIMARY KEY,
 *   character TEXT NOT NULL UNIQUE,
 *   radicals JSONB DEFAULT '[]',
 *   components TEXT DEFAULT '',
 *   story TEXT DEFAULT '',
 *   hint TEXT DEFAULT '',
 *   reading TEXT DEFAULT '',
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * -- Create index for faster lookups
 * CREATE INDEX idx_mnemonics_character ON mnemonics(character);
 * 
 * Run with: node scripts/populate_mnemonics.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { MNEMONICS } from '../src/data/mnemonics.js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function populateMnemonics() {
  console.log('🧠 Starting mnemonic import...\n')
  
  const entries = Object.entries(MNEMONICS)
  console.log(`Found ${entries.length} mnemonics to import\n`)
  
  let successCount = 0
  let errorCount = 0
  
  for (const [character, mnemonic] of entries) {
    const { error } = await supabase
      .from('mnemonics')
      .upsert({
        character,
        radicals: mnemonic.radicals || [],
        components: mnemonic.components || '',
        story: mnemonic.story || '',
        hint: mnemonic.hint || '',
        reading: mnemonic.reading || ''
      }, {
        onConflict: 'character'
      })
    
    if (error) {
      console.log(`❌ Error inserting ${character}: ${error.message}`)
      errorCount++
    } else {
      console.log(`✅ ${character} - imported`)
      successCount++
    }
  }
  
  console.log('\n========================================')
  console.log(`✅ Successfully imported: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log('========================================\n')
}

populateMnemonics().catch(console.error)
