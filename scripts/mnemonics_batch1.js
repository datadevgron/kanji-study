/**
 * BATCH 1: Numbers 一二三四五六七八九十
 * 
 * Each kanji has:
 * - radicals: component parts that make up the kanji
 * - components: visual description
 * - story: MEMORY STORY to remember the MEANING
 * - reading_mnemonic: READING MNEMONIC to remember the PRONUNCIATION
 * - hint: quick reminder
 * 
 * Run with: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch1.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

// First, get the kanji IDs for each character
async function getKanjiId(character) {
  const { data, error } = await supabase
    .from('kanji')
    .select('id')
    .eq('character', character)
    .single()
  
  if (error) {
    console.log(`Could not find kanji_id for ${character}`)
    return null
  }
  return data.id
}

const BATCH_1 = [
  {
    character: '一',
    radicals: [{ char: '一', name: 'one', meaning: 'one/horizontal stroke' }],
    components: 'A single horizontal line',
    story: 'The simplest kanji: ONE horizontal line for the number ONE. Hold up ONE finger sideways - it looks exactly like this! Just ONE stroke to write ONE.',
    hint: 'One line = one',
    reading_mnemonic: 'いち (ichi) - "ITCHY!" You got ONE mosquito bite and it\'s so ITCHY! "Ichi ichi!" you scratch at that ONE spot!'
  },
  {
    character: '二',
    radicals: [{ char: '二', name: 'two', meaning: 'two' }],
    components: 'Two horizontal lines stacked',
    story: 'TWO horizontal lines stacked like TWO bunk beds or TWO floors of a building. Count the lines: top is one, bottom is two. TWO lines = TWO!',
    hint: 'Two lines = two',
    reading_mnemonic: 'に (ni) - "KNEE!" Point to your TWO KNEES! Left knee = NI, right knee = NI. You have NI knees!'
  },
  {
    character: '三',
    radicals: [{ char: '三', name: 'three', meaning: 'three' }],
    components: 'Three horizontal lines stacked',
    story: 'THREE lines stacked like a hamburger: top bun, meat patty, bottom bun - THREE layers! Or like a triple-decker sandwich. Count them: 1, 2, 3!',
    hint: 'Three lines = three',
    reading_mnemonic: 'さん (san) - "SAN Francisco!" The city has THREE famous things: Golden Gate, cable cars, and Alcatraz. Or count like a photographer: "One, two, SAN!" Click!'
  },
  {
    character: '四',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'box/mouth' }, { char: '儿', name: 'legs', meaning: 'human legs' }],
    components: 'A box enclosing legs',
    story: 'A box (囗) with legs (儿) trapped inside - imagine FOUR people squeezed in a tiny elevator, you only see their FOUR pairs of legs! Or a table with FOUR legs under a tablecloth.',
    hint: 'Box with legs = four',
    reading_mnemonic: 'し/よん (shi/yon) - "SHE said YON!" SHE counted her FOUR cats: "YON! I have YON cats!" Use よん more often since し sounds like "death" in Japanese!'
  },
  {
    character: '五',
    radicals: [{ char: '五', name: 'five', meaning: 'five' }],
    components: 'Horizontal lines with an X through the middle',
    story: 'Picture your FIVE fingers spread out - the top and bottom lines are your thumb and pinky, the crossed middle is your three middle fingers overlapping. FIVE fingers!',
    hint: 'Crossed lines = five',
    reading_mnemonic: 'ご (go) - "GO!" Countdown from FIVE: "5, 4, 3, 2, 1, GO!" When you reach FIVE, you GO! Ready, set, GO!'
  },
  {
    character: '六',
    radicals: [{ char: '亠', name: 'lid', meaning: 'lid/top' }, { char: '八', name: 'eight', meaning: 'eight/divide' }],
    components: 'A lid sitting on spreading legs',
    story: 'A top hat (亠) over spreading legs (八) - picture a magician\'s table for his SIX magic tricks! Or think: an insect has SIX legs, you see two spreading out from under its body.',
    hint: 'Hat over legs = six',
    reading_mnemonic: 'ろく (roku) - "Let\'s ROCK!" A guitar has SIX strings and guitarists ROCK! Play those SIX strings: "ROKU and roll, baby!"'
  },
  {
    character: '七',
    radicals: [{ char: '七', name: 'seven', meaning: 'seven' }],
    components: 'A bent or flipped number 7',
    story: 'It looks like the number 7 got flipped upside down and bent! Or a boomerang that comes back SEVEN times. SEVEN days in a week, SEVEN colors in a rainbow.',
    hint: 'Bent 7 = seven',
    reading_mnemonic: 'しち/なな (shichi/nana) - "SHE\'s CHEEKY, NANA!" Your grandma NANA caught you - SHE was CHEEKY and ate SEVEN cookies! SHICHI = she cheeky, NANA = grandma who counted SEVEN!'
  },
  {
    character: '八',
    radicals: [{ char: '八', name: 'eight', meaning: 'eight/divide' }],
    components: 'Two lines spreading apart like a V',
    story: 'Two strokes spreading apart - like cutting something in HALF, then HALF, then HALF again = EIGHT pieces! Or Mount Fuji\'s slopes spreading out - Fuji has EIGHT climbing stations.',
    hint: 'Spreading apart = eight',
    reading_mnemonic: 'はち (hachi) - "HACHI!" Remember Hachiko, Japan\'s famous loyal dog who waited EIGHT years? Picture a spotted dog with EIGHT spots named HACHI!'
  },
  {
    character: '九',
    radicals: [{ char: '九', name: 'nine', meaning: 'nine' }],
    components: 'A hook or curved arm reaching',
    story: 'Looks like a hook or someone reaching with one arm! On your hands, NINE means only ONE finger down (the hook shape). You\'re reaching for TEN - almost there!',
    hint: 'Hook reaching = nine',
    reading_mnemonic: 'きゅう/く (kyuu/ku) - "QUEUE up!" NINE people standing in a QUEUE (KYU/KU). Or a pool CUE - sink NINE balls to win! "Get in the KYUU!"'
  },
  {
    character: '十',
    radicals: [{ char: '十', name: 'ten', meaning: 'ten/cross' }],
    components: 'A perfect cross or plus sign',
    story: 'A perfect + sign! Cross your hands at the wrists with all TEN fingers spread - you make this shape! Or: 9 + 1 more = TEN. The plus sign adds up to TEN!',
    hint: 'Cross = ten',
    reading_mnemonic: 'じゅう (juu) - "JUICE!" After counting to TEN on all your fingers, celebrate with JUICE! "JUU-ice for everyone!" Ten sips of JUU!'
  }
]

async function insertBatch() {
  console.log('🔢 BATCH 1: Numbers (一二三四五六七八九十)')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_1) {
    // Get the kanji_id first
    const kanji_id = await getKanjiId(m.character)
    
    if (!kanji_id) {
      console.log(`❌ ${m.character} - Could not find in kanji table\n`)
      continue
    }
    
    console.log(`📝 ${m.character} (kanji_id: ${kanji_id}) - Inserting...`)
    console.log(`   Memory: ${m.story.substring(0, 50)}...`)
    console.log(`   Reading: ${m.reading_mnemonic.substring(0, 50)}...`)
    
    // Check if mnemonic already exists for this kanji_id
    const { data: existing } = await supabase
      .from('mnemonics')
      .select('id')
      .eq('kanji_id', kanji_id)
      .single()
    
    let error
    if (existing) {
      // Update existing
      const result = await supabase
        .from('mnemonics')
        .update({
          radicals: m.radicals,
          components: m.components,
          story: m.story,
          reading_mnemonic: m.reading_mnemonic,
          hint: m.hint
        })
        .eq('kanji_id', kanji_id)
      error = result.error
    } else {
      // Insert new
      const result = await supabase
        .from('mnemonics')
        .insert({
          kanji_id,
          radicals: m.radicals,
          components: m.components,
          story: m.story,
          reading_mnemonic: m.reading_mnemonic,
          hint: m.hint
        })
      error = result.error
    }
    
    if (error) {
      console.log(`   ❌ Error: ${error.message}\n`)
    } else {
      console.log(`   ✅ Success!\n`)
    }
  }
  
  console.log('=' .repeat(50))
  console.log('✨ Batch 1 complete! 10/79 N5 kanji done.')
}

insertBatch()
