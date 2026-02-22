/**
 * Check mnemonic progress for N5 kanji
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function checkProgress() {
  const { data: n5 } = await supabase.from('kanji').select('id, character').eq('jlpt', 'N5')
  console.log('Total N5 kanji:', n5.length)

  let goodMnemonics = 0
  let needsWork = []

  for (const k of n5) {
    const { data: m } = await supabase.from('mnemonics').select('story').eq('kanji_id', k.id).single()
    const isGood = m && m.story && 
                   !m.story.includes('Picture the character') && 
                   !m.story.includes('visual story') && 
                   m.story.length > 50
    if (isGood) {
      goodMnemonics++
    } else {
      needsWork.push(k.character)
    }
  }

  console.log('Good mnemonics:', goodMnemonics)
  console.log('Need work:', needsWork.length)
  console.log('Still need:', needsWork.join(' '))
}

checkProgress()
