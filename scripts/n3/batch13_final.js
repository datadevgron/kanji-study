/**
 * N3 BATCH 13: Final Miscellaneous (7 kanji)
 * 首馬髪鳴乗予争
 * 
 * Run: node scripts/n3/batch13_final.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(char) {
  const { data } = await supabase.from('kanji').select('id').eq('character', char).single()
  return data?.id
}

const BATCH = [
  {
    character: '首',
    radicals: [{ char: '首', name: 'neck', meaning: 'neck' }],
    components: 'Head with hair on top',
    story: 'A head with hair - NECK! Beginning. Head top = NECK!',
    hint: 'Head top = neck',
    reading_mnemonic: 'しゅ/くび (shu/kubi) - "SHU NECK!" KUBI = neck! SHUSHOU = prime minister!'
  },
  {
    character: '馬',
    radicals: [{ char: '馬', name: 'horse', meaning: 'horse' }],
    components: 'Horse with legs',
    story: 'An animal with four legs and mane - HORSE! Steed. Four legs = HORSE!',
    hint: 'Four legs = horse',
    reading_mnemonic: 'ば/うま/ま (ba/uma/ma) - "BAH! HORSE!" UMA = horse!'
  },
  {
    character: '髪',
    radicals: [{ char: '長', name: 'long', meaning: 'long' }, { char: '彡', name: 'hair', meaning: 'hair' }, { char: '友', name: 'friend', meaning: 'friend' }],
    components: '髟 (long hair) + 友 (friend)',
    story: 'LONG (長) flowing hair (彡) - HAIR! Locks. Long flowing = HAIR!',
    hint: 'Long flowing = hair',
    reading_mnemonic: 'はつ/かみ (hatsu/kami) - "HAT on HAIR!" KAMI = hair! KAMIGATA = hairstyle!'
  },
  {
    character: '鳴',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '鳥', name: 'bird', meaning: 'bird' }],
    components: '口 (mouth) + 鳥 (bird)',
    story: 'A BIRD (鳥) MOUTH (口) singing - CRY/CHIRP! Sound. Bird mouth = CHIRP!',
    hint: 'Bird mouth = chirp',
    reading_mnemonic: 'めい/な (mei/na) - "MAY CHIRP!" NAKU = cry! NARU = ring!'
  },
  {
    character: '乗',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '人', name: 'person', meaning: 'person' }],
    components: '禾 (grain) + 人 (person)',
    story: 'A PERSON (人) on top of grain (禾) - RIDE! Mount. Person on top = RIDE!',
    hint: 'Person on top = ride',
    reading_mnemonic: 'じょう/の (jou/no) - "JOE RIDES!" NORU = ride! JOUSHA = passenger!'
  },
  {
    character: '予',
    radicals: [{ char: '予', name: 'beforehand', meaning: 'beforehand' }],
    components: 'Weaving beforehand',
    story: 'Planning like weaving ahead - BEFOREHAND! In advance. Weaving ahead = BEFOREHAND!',
    hint: 'Weaving ahead = beforehand',
    reading_mnemonic: 'よ (yo) - "YO! IN ADVANCE!" YOTEI = plan! YOYAKU = reservation!'
  },
  {
    character: '争',
    radicals: [{ char: '爪', name: 'claw', meaning: 'claw' }, { char: '亅', name: 'hook', meaning: 'hook' }],
    components: '爪 (claw) + hand',
    story: 'CLAWS (爪) grabbing - COMPETE/DISPUTE! Fight. Claws grab = COMPETE!',
    hint: 'Claws grab = compete',
    reading_mnemonic: 'そう/あらそ (sou/araso) - "SO! COMPETE!" ARASOU = compete! SENSOU = war!'
  }
]

async function insertBatch() {
  console.log('🎯 N3 BATCH 13: Final Miscellaneous (7 kanji)')
  console.log('='.repeat(50) + '\n')
  
  let success = 0, failed = 0
  
  for (const m of BATCH) {
    const kanji_id = await getKanjiId(m.character)
    if (!kanji_id) { console.log(`❌ ${m.character} - Not found`); failed++; continue }
    
    const { data: existing } = await supabase.from('mnemonics').select('id').eq('kanji_id', kanji_id).single()
    
    const data = {
      kanji_id,
      radicals: m.radicals,
      components: m.components,
      story: m.story,
      reading_mnemonic: m.reading_mnemonic,
      hint: m.hint
    }
    
    const { error } = existing 
      ? await supabase.from('mnemonics').update(data).eq('kanji_id', kanji_id)
      : await supabase.from('mnemonics').insert(data)
    
    if (error) { console.log(`❌ ${m.character} - ${error.message}`); failed++ }
    else { console.log(`✅ ${m.character}`); success++ }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log(`✨ Batch 13 complete! ${success} succeeded, ${failed} failed`)
  console.log('\n🎉 ALL N3 KANJI COMPLETE! 367/367 🎉')
}

insertBatch()
