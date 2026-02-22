/**
 * Fix the 3 remaining N3 kanji with generic mnemonics: 互, 亡, 老
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(char) {
  const { data } = await supabase.from('kanji').select('id').eq('character', char).single()
  return data?.id
}

const FIXES = [
  {
    character: '互',
    radicals: [{ char: '二', name: 'two', meaning: 'two' }, { char: '彑', name: 'snout', meaning: 'interlock' }],
    components: '二 (two) + interlocking shape',
    story: 'Two interlocking shapes like gears - MUTUAL! Each helping the other. Interlocking = MUTUAL!',
    hint: 'Interlocking = mutual',
    reading_mnemonic: 'ご/たが (go/taga) - "GO MUTUAL!" TAGAI = each other! GOJO = mutual aid!'
  },
  {
    character: '亡',
    radicals: [{ char: '亠', name: 'lid', meaning: 'cover' }, { char: '乚', name: 'hidden', meaning: 'hidden' }],
    components: '亠 (cover) + 乚 (hidden)',
    story: 'Something HIDDEN (乚) under a COVER (亠) - DECEASED/PERISH! Gone forever. Hidden under = DECEASED!',
    hint: 'Hidden under = deceased',
    reading_mnemonic: 'ぼう/な (bou/na) - "BOW! They PERISHED!" SHIBOU = death! BOUREI = ghost!'
  },
  {
    character: '老',
    radicals: [{ char: '耂', name: 'old', meaning: 'old' }, { char: '匕', name: 'spoon', meaning: 'change' }],
    components: '耂 (old person) + 匕 (change)',
    story: 'A bent PERSON with a cane (耂) changed by time - OLD! Elderly. Bent with cane = OLD!',
    hint: 'Bent with cane = old',
    reading_mnemonic: 'ろう/お/ふ (rou/o/fu) - "ROW! Getting OLD!" OIRU = grow old! ROUJIN = elderly person!'
  }
]

async function fixRemaining() {
  console.log('🔧 Fixing 3 remaining N3 kanji with generic mnemonics...\n')
  
  for (const m of FIXES) {
    const kanji_id = await getKanjiId(m.character)
    if (!kanji_id) { console.log(`❌ ${m.character} - Not found`); continue }
    
    const data = {
      kanji_id,
      radicals: m.radicals,
      components: m.components,
      story: m.story,
      reading_mnemonic: m.reading_mnemonic,
      hint: m.hint
    }
    
    const { error } = await supabase.from('mnemonics').update(data).eq('kanji_id', kanji_id)
    
    if (error) { console.log(`❌ ${m.character} - ${error.message}`) }
    else { console.log(`✅ ${m.character} - Fixed!`) }
  }
  
  console.log('\n✨ All N3 kanji now have quality mnemonics!')
}

fixRemaining()
