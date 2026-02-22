/**
 * BATCH 8: Family & People 父母兄弟姉妹友家族先生学
 * 
 * Family and people kanji with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch8_family.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_8 = [
  {
    character: '父',
    radicals: [{ char: '父', name: 'father', meaning: 'father' }],
    components: 'Two hands holding/working',
    story: 'Two hands crossed holding tools - FATHER at work! The FATHER works with his hands to provide for the family. Picture dad holding tools, fixing things. Working hands = FATHER!',
    hint: 'Working hands = father',
    reading_mnemonic: 'ふ/ちち (fu/chichi) - "FOO-D from FATHER!" FATHER brings FOOD! Or: "CHEE-CHEE!" - "CHEE-CHEE, papa!" A baby calling FATHER! CHICHI = "chee-chee" papa!'
  },
  {
    character: '母',
    radicals: [{ char: '母', name: 'mother', meaning: 'mother' }],
    components: 'Woman with breasts nurturing',
    story: 'A woman with two nurturing dots - MOTHER! The dots represent a mother\'s breasts feeding her children. MOTHER nurtures and feeds the family. Nurturing woman = MOTHER!',
    hint: 'Nurturing woman = mother',
    reading_mnemonic: 'ぼ/はは (bo/haha) - "BOW to MOTHER!" Show respect - BOW to mom! Or: "HA-HA!" - MOTHER laughs "HA-HA!" when she\'s happy! HAHA = mama\'s laugh!'
  },
  {
    character: '兄',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '儿', name: 'legs', meaning: 'legs' }],
    components: '口 (mouth) + 儿 (legs)',
    story: 'A big MOUTH (口) on LEGS (儿) bossing you around - ELDER BROTHER! Big brothers always tell younger siblings what to do. That mouth never stops talking! Bossy mouth on legs = BIG BROTHER!',
    hint: 'Bossy mouth = elder brother',
    reading_mnemonic: 'けい/きょう/あに (kei/kyou/ani) - "KAY, big BRO!" Calling your brother: "KAY!" Or: "AH-KNEE!" - Big brother hurt his knee: "AH, KNEE!" ANI = "ah-knee" hurts!'
  },
  {
    character: '弟',
    radicals: [{ char: '弓', name: 'bow', meaning: 'bow' }, { char: '丨', name: 'line', meaning: 'order' }],
    components: 'Bow + order line',
    story: 'A smaller BOW (弓) with a line showing order - YOUNGER BROTHER! The younger one has a smaller bow, following in line behind the elder. In order of birth = YOUNGER BROTHER!',
    hint: 'Smaller bow in line = younger brother',
    reading_mnemonic: 'てい/だい/おとうと (tei/dai/otouto) - "DAY with little BRO!" Spend the DAY with younger brother! Or: "OH-TOE-TOE!" - Little brother stubs his toes: "OH TOE TOE!" OTOUTO = "oh-toe-toe"!'
  },
  {
    character: '姉',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '市', name: 'market', meaning: 'market/city' }],
    components: '女 (woman) + 市 (market)',
    story: 'A WOMAN (女) who goes to the MARKET (市) - ELDER SISTER! Big sister is old enough to go shopping by herself. She\'s responsible enough to go to market = ELDER SISTER!',
    hint: 'Woman at market = elder sister',
    reading_mnemonic: 'し/あね (shi/ane) - "SHE\'s my ELDER SISTER!" SHE is older! Or: "AH-NAY!" - "AH, NAY!" Big sister says no: "AH, NAY, you can\'t come!" ANE = "ah-nay" - sister says no!'
  },
  {
    character: '妹',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '未', name: 'not yet', meaning: 'not yet' }],
    components: '女 (woman) + 未 (not yet)',
    story: 'A WOMAN (女) who is NOT YET (未) grown up - YOUNGER SISTER! She\'s not yet old enough to go to market like big sister. Still NOT YET mature = YOUNGER SISTER!',
    hint: 'Woman not yet grown = younger sister',
    reading_mnemonic: 'まい/いもうと (mai/imouto) - "MY little SISTER!" She\'s MY baby sis! Or: "EE-MOE-TOE!" - "EE! MOE stubbed her TOE!" Little sister hurt herself! IMOUTO = "ee-moe-toe"!'
  },
  {
    character: '友',
    radicals: [{ char: '友', name: 'friend', meaning: 'friend' }],
    components: 'Two hands clasped together',
    story: 'Two hands reaching out and clasping together - FRIENDS! When two people shake hands or hold hands, they become FRIENDS. Two hands connecting = FRIEND!',
    hint: 'Hands together = friend',
    reading_mnemonic: 'ゆう/とも (yuu/tomo) - "YOU are my FRIEND!" YOU\'re my buddy! Or: "TOE-MOE!" - "My friend\'s name is TOE-MOE!" TOMO = "toe-moe" - your friend\'s name!'
  },
  {
    character: '家',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '豕', name: 'pig', meaning: 'pig' }],
    components: '宀 (roof) + 豕 (pig)',
    story: 'A PIG (豕) under a ROOF (宀) - that\'s HOME! In ancient times, families kept pigs in their homes - it showed wealth. A roof with livestock = HOUSE/HOME! Where your animals live = HOME!',
    hint: 'Pig under roof = house/home',
    reading_mnemonic: 'か/け/いえ/うち (ka/ke/ie/uchi) - "KEY to the HOUSE!" Get the KEY to your HOME! Or: "EE-YAY!" - "EE-YAY! I\'m HOME!" Celebrate coming HOME! IE/UCHI = "ee-yay/ooh-chee"!'
  },
  {
    character: '族',
    radicals: [{ char: '方', name: 'direction', meaning: 'direction/flag' }, { char: '矢', name: 'arrow', meaning: 'arrow' }],
    components: '方 (flag/direction) + 矢 (arrow)',
    story: 'A group following one FLAG/direction (方) with ARROWS (矢) - a TRIBE! A clan that fights together under one banner. People united by one flag = FAMILY/TRIBE!',
    hint: 'Flag + arrows = tribe/family',
    reading_mnemonic: 'ぞく (zoku) - "ZOO-CREW is my TRIBE!" My family is like a ZOO CREW! ZOKU = "zoo-koo" - we\'re a wild FAMILY!'
  },
  {
    character: '先',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '儿', name: 'legs', meaning: 'legs' }],
    components: '土 (earth/dirt) + 儿 (legs)',
    story: 'LEGS (儿) stepping on EARTH (土) going FIRST - AHEAD/BEFORE! The person in FRONT steps on new ground first. Who walks AHEAD? The one who goes FIRST! Leading steps = PREVIOUS/AHEAD!',
    hint: 'First steps forward = previous/ahead',
    reading_mnemonic: 'せん/さき (sen/saki) - "SEN-sei goes FIRST!" Teacher goes AHEAD! Or: "SAH-KEY!" - "SAH, the KEY person goes FIRST!" SAKI = "sah-key" - the key person AHEAD!'
  },
  {
    character: '生',
    radicals: [{ char: '生', name: 'life', meaning: 'life/birth' }],
    components: 'Plant growing from earth',
    story: 'A plant sprouting from the earth - LIFE! Seeds grow into LIVING plants. When something is BORN, it springs to LIFE like this sprout. Growing plant = LIFE/BIRTH!',
    hint: 'Sprout = life/birth',
    reading_mnemonic: 'せい/しょう/い/う/なま (sei/shou/i/u/nama) - "SAY you\'re ALIVE!" SAY you have LIFE! Or: "NAH-MAH!" - "NAH, MAma! I want to LIVE!" NAMA = raw/LIFE!'
  },
  {
    character: '学',
    radicals: [{ char: '⺌', name: 'cover', meaning: 'cover' }, { char: '冖', name: 'roof', meaning: 'roof' }, { char: '子', name: 'child', meaning: 'child' }],
    components: 'Cover + roof + 子 (child)',
    story: 'A CHILD (子) under a roof with hands raised - STUDYING! A child in school raising their hand to learn. Under the school roof, children STUDY! Child learning = STUDY!',
    hint: 'Child under roof learning = study',
    reading_mnemonic: 'がく/まな (gaku/mana) - "GAWK while you STUDY!" Don\'t GAWK - STUDY! Or: "MAH-NAH!" - "MA! NAH, I\'m STUDYING!" Tell mom you\'re learning! MANABU = "mah-nah-boo"!'
  },
  {
    character: '校',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree/wood' }, { char: '交', name: 'mix', meaning: 'cross/exchange' }],
    components: '木 (tree/building) + 交 (cross/exchange)',
    story: 'A wooden building where ideas are EXCHANGED (交) - SCHOOL! Students cross paths and exchange knowledge in a SCHOOL building. Place of exchange = SCHOOL!',
    hint: 'Building for exchange = school',
    reading_mnemonic: 'こう (kou) - "COW goes to SCHOOL!" Even COWs go to SCHOOL! KOUKOU = high SCHOOL! Moo-ve to SCHOOL!'
  }
]

async function insertBatch() {
  console.log('👨‍👩‍👧‍👦 BATCH 8: Family & People')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_8) {
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
  
  console.log('✨ Batch 8 complete!')
}

insertBatch()
