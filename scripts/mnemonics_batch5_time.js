/**
 * BATCH 5: Time 時間分週年今前後朝夜午毎半
 * 
 * Time-related kanji with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch5_time.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_5 = [
  {
    character: '時',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun/day' }, { char: '寺', name: 'temple', meaning: 'temple' }],
    components: '日 (sun) + 寺 (temple)',
    story: 'The SUN (日) at the TEMPLE (寺) marks TIME! Ancient temples had sundials - monks watched the sun\'s shadow to know what TIME it was. When the sun reaches the temple, it\'s TIME for prayer! Sun + temple = TIME!',
    hint: 'Sun + temple = time',
    reading_mnemonic: 'じ/とき (ji/toki) - "GEE, what TIME is it?" Check your watch: "GEE!" Or: "TOKYO TIME!" What TIME is it in TOKYO? TOKI sounds like "Tokyo" - it\'s TOKI (time) to check Tokyo time!'
  },
  {
    character: '間',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '日', name: 'sun', meaning: 'sun' }],
    components: '門 (gate) + 日 (sun)',
    story: 'The SUN (日) peeking through a GATE (門) - that gap is an INTERVAL! The space BETWEEN the gate doors where light comes through. Any gap or pause BETWEEN things is an INTERVAL of space or time!',
    hint: 'Sun through gate = interval/between',
    reading_mnemonic: 'かん/あいだ (kan/aida) - "CAN you wait in BETWEEN?" CAN you wait during this INTERVAL? Or: "AI-DA!" - "Aida the opera takes TIME in BETWEEN acts!" AIDA = the space BETWEEN!'
  },
  {
    character: '分',
    radicals: [{ char: '八', name: 'eight', meaning: 'divide' }, { char: '刀', name: 'sword', meaning: 'sword/cut' }],
    components: '八 (divide) + 刀 (sword)',
    story: 'Take a SWORD (刀) and DIVIDE (八) something into parts! Cut a pie into MINUTES - 60 slices! When you DIVIDE time, you get MINUTES. When you DIVIDE anything, you UNDERSTAND its parts!',
    hint: 'Divide with sword = minute/understand',
    reading_mnemonic: 'ふん/ぶん/わ (fun/bun/wa) - "FUN to count MINUTES!" It\'s FUN to divide time! Or: "One BUN per MINUTE!" Eat one BUN every MINUTE! WAKARU = "wa-ka-ru" - I UNDERSTAND in parts!'
  },
  {
    character: '週',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '周', name: 'circumference', meaning: 'circuit' }],
    components: '辶 (movement) + 周 (circuit)',
    story: 'MOVING (辶) in a complete CIRCUIT (周) - that\'s a WEEK! The earth moves in a cycle, and every 7 days completes one WEEK. A WEEK is one circuit of your routine - Monday back to Monday!',
    hint: 'Moving in circuit = week',
    reading_mnemonic: 'しゅう (shuu) - "SHOE shopping every WEEK!" Every WEEK you buy new SHOEs! "SHUU!" - the sound of a WEEK flying by! One SHUU = one WEEK gone!'
  },
  {
    character: '年',
    radicals: [{ char: '年', name: 'year', meaning: 'year' }],
    components: 'Grain harvest cycle',
    story: 'A farmer carrying grain from the harvest! The top is the grain, the lines are the farmer walking. Every YEAR the harvest comes once. Ancient people counted YEARS by harvests - one harvest = one YEAR!',
    hint: 'Harvest cycle = year',
    reading_mnemonic: 'ねん/とし (nen/toshi) - "NEN-ny goat is one YEAR old!" The nanny goat had a birthday! Or: "TOSHI" sounds like "toasty" - every YEAR we get TOASTY celebrating New Year!'
  },
  {
    character: '今',
    radicals: [{ char: '人', name: 'person', meaning: 'person' }, { char: '一', name: 'one', meaning: 'roof/cover' }],
    components: '人 (person) + cover',
    story: 'A PERSON (人) under a roof in this moment - NOW! Not yesterday, not tomorrow, but right NOW you\'re here under this roof. The present moment is NOW - you exist in the NOW!',
    hint: 'Person here = now',
    reading_mnemonic: 'こん/いま (kon/ima) - "Come ON, do it NOW!" Come ON! Or: "I\'M-A do it NOW!" I\'MA (I\'m going to) do it NOW! IMA sounds like "I\'m a" - I\'m HERE right NOW!'
  },
  {
    character: '前',
    radicals: [{ char: '前', name: 'before', meaning: 'before/front' }],
    components: 'Boat moving forward',
    story: 'A boat with someone rowing FORWARD! The top part shows movement, the bottom is the boat cutting through water. Everything in FRONT of the boat is BEFORE you reach it. Forward = BEFORE/FRONT!',
    hint: 'Moving forward = before/front',
    reading_mnemonic: 'ぜん/まえ (zen/mae) - "ZEN master sits in FRONT!" The ZEN master always sits at the FRONT! Or: "MAY I go BEFORE you?" MAE sounds like "May" - MAY I go in FRONT?'
  },
  {
    character: '後',
    radicals: [{ char: '彳', name: 'step', meaning: 'step' }, { char: '幺', name: 'thread', meaning: 'tiny' }, { char: '夂', name: 'walking', meaning: 'slow walk' }],
    components: 'Steps + trailing behind',
    story: 'STEPS (彳) with something trailing BEHIND (夂) - that\'s AFTER/BEHIND! When you walk, everything behind you is AFTER where you were. The past is BEHIND you, coming AFTER the present!',
    hint: 'Trailing behind = after/behind',
    reading_mnemonic: 'ご/こう/あと/うし (go/kou/ato/ushiro) - "GO AFTER them!" GO chase them! Or: "AH-TOE!" - "AH, my TOE is BEHIND me!" Your heel is AFTER your toe! USHIRO = "ooh, she row" - she rows BEHIND!'
  },
  {
    character: '朝',
    radicals: [{ char: '龺', name: 'sunrise', meaning: 'sun rising' }, { char: '月', name: 'moon', meaning: 'moon' }],
    components: 'Sunrise over moon',
    story: 'The sun rising while the MOON (月) sets - that\'s MORNING! In the early MORNING, you can sometimes see both the rising sun and the setting moon. When sun replaces moon = MORNING!',
    hint: 'Sun rising, moon setting = morning',
    reading_mnemonic: 'ちょう/あさ (chou/asa) - "CHOW down in the MORNING!" Time for breakfast CHOW! Or: "AH-SA!" - "AH, SAturday MORNING!" You wake up: "AH-SA! It\'s MORNING!" ASA = "Ah, Saturday!"'
  },
  {
    character: '夜',
    radicals: [{ char: '亠', name: 'lid', meaning: 'cover' }, { char: '亻', name: 'person', meaning: 'person' }, { char: '夕', name: 'evening', meaning: 'evening' }],
    components: 'Person under cover at evening',
    story: 'A PERSON (亻) under a cover (亠) during the EVENING (夕) - that\'s NIGHT! When evening comes, people go under covers to sleep. The darkness covers everything at NIGHT!',
    hint: 'Person covered at evening = night',
    reading_mnemonic: 'や/よる (ya/yoru) - "YAH! It\'s NIGHT!" You yawn: "YAH!" at NIGHT! Or: "YOUR room at NIGHT!" It\'s YOUR time to sleep! YORU sounds like "your" - YOUR NIGHT to rest!'
  },
  {
    character: '午',
    radicals: [{ char: '午', name: 'noon', meaning: 'noon/horse' }],
    components: 'Vertical line through horizontal',
    story: 'The sun at its highest point - straight up at NOON! The vertical line is the sun\'s rays coming straight down. At NOON, shadows are shortest because the sun is directly overhead!',
    hint: 'Sun overhead = noon',
    reading_mnemonic: 'ご (go) - "GO eat lunch at NOON!" At NOON, GO have lunch! GOGO = afternoon (after NOON). GO-GO dancer performs at NOON!'
  },
  {
    character: '毎',
    radicals: [{ char: '毎', name: 'every', meaning: 'every' }],
    components: 'Mother with children',
    story: 'A mother (with hairpin on top) giving birth repeatedly - EVERY time! Mothers do things EVERY day: feed, clean, care. EVERY day, EVERY week, EVERY year - constant repetition like a mother\'s love!',
    hint: 'Repeated action = every',
    reading_mnemonic: 'まい (mai) - "MY routine EVERY day!" It\'s MY habit EVERY day! MAI sounds like "my" - MY EVERY day routine! MAINICHI = "my" daily life!'
  },
  {
    character: '半',
    radicals: [{ char: '八', name: 'eight', meaning: 'divide' }, { char: '牛', name: 'cow', meaning: 'cow' }],
    components: '八 (divide) + part of 牛 (cow)',
    story: 'DIVIDE (八) something into two equal parts - that\'s HALF! Cut something down the middle and you get HALF and HALF. The kanji shows splitting something into two HALVES!',
    hint: 'Divided equally = half',
    reading_mnemonic: 'はん (han) - "HANd me HALF!" Give me HALF with your HAND! HAN sounds like "hand" - HAND over HALF of that pizza! HANHAN = half-half!'
  }
]

async function insertBatch() {
  console.log('⏰ BATCH 5: Time')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_5) {
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
  
  console.log('✨ Batch 5 complete!')
}

insertBatch()
