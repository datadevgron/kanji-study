/**
 * Check N4 mnemonic progress
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function check() {
  // Get all N4 kanji
  const { data: n4Kanji, error: e1 } = await supabase.from('kanji').select('id, character').eq('jlpt', 'N4')
  if (e1) { console.error('Error:', e1); return }
  console.log('Total N4 kanji:', n4Kanji.length)
  
  // Get mnemonics for N4
  const n4Ids = n4Kanji.map(k => k.id)
  const { data: mnemonics } = await supabase.from('mnemonics').select('kanji_id, story').in('kanji_id', n4Ids)
  
  console.log('N4 with mnemonics:', mnemonics.length)
  
  // Quality check
  const quality = mnemonics.filter(m => m.story && m.story.length > 50)
  console.log('N4 with quality mnemonics:', quality.length)
  
  // Find missing
  const hasM = new Set(mnemonics.map(m => m.kanji_id))
  const missing = n4Kanji.filter(k => !hasM.has(k.id))
  console.log('\nMissing mnemonics:', missing.length)
  if (missing.length > 0) {
    console.log('Missing kanji:', missing.map(k => k.character).join(''))
  }
}
check()
