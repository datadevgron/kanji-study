/**
 * Update 入 with tent flap story
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function update() {
  const { data: k } = await supabase.from('kanji').select('id').eq('character', '入').single()

  const updated = {
    radicals: [{ char: '入', name: 'enter', meaning: 'enter/insert' }],
    components: 'Tent flap opening inward',
    story: 'Picture pushing open a TENT FLAP to ENTER - the two strokes are the flaps parting as you duck IN! The left flap goes one way, the right flap the other, creating an opening for you to go INSIDE. Every time you see 入, imagine unzipping that tent to ENTER!',
    reading_mnemonic: 'にゅう/い/はい (nyuu/i/hai) - "NEW camper ENTERS the tent!" A NEW (NYUU) person comes IN! Or: "HI!" - You unzip the tent and say "HI!" to everyone inside! HAIRU = "hi-roo" - HI, I\'m coming IN!',
    hint: 'Tent flap parting = enter'
  }

  await supabase.from('mnemonics').update(updated).eq('kanji_id', k.id)
  console.log('✅ Updated 入 with tent flap story!')
  console.log('Story:', updated.story)
}

update()
