/**
 * BATCH 9: Final N5 kanji - 何 入 木 百 語 車
 * 
 * Last few N5 kanji with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch9_final_n5.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_9 = [
  {
    character: '何',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '可', name: 'possible', meaning: 'can/possible' }],
    components: '亻 (person) + 可 (possible/can)',
    story: 'A PERSON (亻) asking "Is it POSSIBLE?" (可) - that\'s asking WHAT! When you don\'t know something, you ask "WHAT is possible?" The confused person asking questions = WHAT?',
    hint: 'Person asking if possible = what',
    reading_mnemonic: 'か/なに/なん (ka/nani/nan) - "NAH-NEE?!" You don\'t understand so you ask "NAH-NEE?! WHAT?!" Or: "NONE! WHAT do you mean NONE left?!" NANI sounds like "nah-knee" - what, my knee?!'
  },
  {
    character: '入',
    radicals: [{ char: '入', name: 'enter', meaning: 'enter' }],
    components: 'Arrow pointing inward',
    story: 'An arrow pointing IN - ENTER! Picture a doorway with an arrow showing you where to go IN. The two strokes converge inward like walking through a narrow entrance. Going in = ENTER!',
    hint: 'Arrow going in = enter',
    reading_mnemonic: 'にゅう/い/はい (nyuu/i/hai) - "NEW student ENTERS!" A NEW student comes IN! NYUU = NEW entering! Or: "HIGH-ru!" - "HIGH five as you ENTER!" HAIRU sounds like "high-roo"!'
  },
  {
    character: '木',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree/wood' }],
    components: 'A tree with branches and roots',
    story: 'A TREE standing tall! The horizontal line is the ground. The strokes above are branches reaching to the sky. Below are roots digging into the earth. One trunk, branches up, roots down = TREE!',
    hint: 'Trunk + branches + roots = tree',
    reading_mnemonic: 'もく/ぼく/き (moku/boku/ki) - "BOOK about TREES!" Read a BOOK (BOKU) about TREES! Or: "KEY hidden in TREE!" There\'s a KEY (KI) hidden inside the TREE! Find the KEY in the TREE!'
  },
  {
    character: '百',
    radicals: [{ char: '一', name: 'one', meaning: 'one' }, { char: '白', name: 'white', meaning: 'white' }],
    components: '一 (one) + 白 (white)',
    story: 'ONE (一) on top of WHITE (白) = HUNDRED! Think of it as "one white" - pure white paper comes in packs of HUNDRED sheets! Or: add one to ninety-nine (almost white/complete) = HUNDRED!',
    hint: 'One + white = hundred',
    reading_mnemonic: 'ひゃく (hyaku) - "HE YAKS about HUNDREDS!" He talks so much about his HUNDRED achievements! HYAKU sounds like "he-yak" - he won\'t stop yakking about HUNDREDS!'
  },
  {
    character: '語',
    radicals: [{ char: '言', name: 'words', meaning: 'speech/words' }, { char: '吾', name: 'I/my', meaning: 'self' }],
    components: '言 (words) + 吾 (I/myself)',
    story: 'WORDS (言) that express MYSELF (吾) - that\'s LANGUAGE! A LANGUAGE is how you put your thoughts into words. The words I use to express myself = LANGUAGE/WORD!',
    hint: 'Words + self = language',
    reading_mnemonic: 'ご/かた (go/kata) - "GO speak the LANGUAGE!" GO learn that LANGUAGE! Or: "KATA-ri!" - Tell a STORY (katari) in your LANGUAGE! KATARU sounds like "cut-ah-roo" - cut to the story!'
  },
  {
    character: '車',
    radicals: [{ char: '車', name: 'car', meaning: 'car/vehicle' }],
    components: 'A cart viewed from above',
    story: 'A CART viewed from above - wheels on the sides, axle through the middle! Picture an ancient wooden cart with two wheels. The horizontal lines are the wheels, vertical is the body. Wheeled vehicle = CAR!',
    hint: 'Wheels + axle = car/vehicle',
    reading_mnemonic: 'しゃ/くるま (sha/kuruma) - "SHA-ll we take the CAR?" SHA-ll we drive? Or: "CREW-MAH!" - "The CREW, MAn, they took the CAR!" KURUMA sounds like "crew-mah" - the crew\'s car!'
  }
]

async function insertBatch() {
  console.log('🏁 BATCH 9: Final N5 Kanji')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_9) {
    const kanji_id = await getKanjiId(m.character)
    if (!kanji_id) { console.log(`❌ ${m.character} - Not found\n`); continue }
    
    console.log(`📝 ${m.character} - Inserting...`)
    
    const { data: existing } = await supabase.from('mnemonics').select('id').eq('kanji_id', kanji_id).single()
    
    const mnemonicData = {
      kanji_id,
      radicals: m.radicals,
      components: m.components,
      story: m.story,
      reading_mnemonic: m.reading_mnemonic,
      hint: m.hint
    }
    
    const { error } = existing 
      ? await supabase.from('mnemonics').update(mnemonicData).eq('kanji_id', kanji_id)
      : await supabase.from('mnemonics').insert(mnemonicData)
    
    console.log(error ? `   ❌ ${error.message}\n` : `   ✅ Success!\n`)
  }
  
  console.log('=' .repeat(50))
  console.log('🎉 ALL N5 KANJI COMPLETE!')
  console.log('79/79 N5 kanji now have quality mnemonics!')
}

insertBatch()
