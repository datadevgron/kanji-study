/**
 * BATCH 2: Days/Time (日月火水木金土年時間)
 * 
 * Run with: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch2.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data, error } = await supabase
    .from('kanji')
    .select('id')
    .eq('character', character)
    .single()
  
  if (error) return null
  return data.id
}

const BATCH_2 = [
  {
    character: '日',
    radicals: [{ char: '日', name: 'sun/day', meaning: 'sun, day' }],
    components: 'A box with a line through the middle - the sun',
    story: 'A window frame with the SUN shining through! The box is the window, and the horizontal line is the horizon where the SUN sits. Every DAY you look out and see the SUN. Also used for Japan (land of the rising sun).',
    hint: 'Window with sun = day/sun',
    reading_mnemonic: 'にち/ひ (nichi/hi) - "KNEE-CHI!" The sun is so bright, you get down on your KNEE and do tai-CHI every morning. Or HI! The sun says HI to you every day!'
  },
  {
    character: '月',
    radicals: [{ char: '月', name: 'moon/month', meaning: 'moon, month' }],
    components: 'A crescent moon with crater marks',
    story: 'A crescent MOON in the night sky! The two horizontal lines inside are the craters you can see on the moon\'s surface. Every MONTH, the moon goes through all its phases - new moon to full moon and back.',
    hint: 'Crescent with craters = moon/month',
    reading_mnemonic: 'げつ/つき (getsu/tsuki) - "GET SUper excited!" You GET SUper excited every month when you see the full moon! TSUKI sounds like "ski" - imagine skiing down a mountain by moonlight!'
  },
  {
    character: '火',
    radicals: [{ char: '火', name: 'fire', meaning: 'fire' }],
    components: 'A person with flames on both sides',
    story: 'Picture a person (人) sitting by a campFIRE! The dots on the sides are sparks and flames flying up. The person is warming their hands by the FIRE on a cold night.',
    hint: 'Person with flames = fire',
    reading_mnemonic: 'か/ひ (ka/hi) - "KAw KAw!" A crow flies over the fire going "KA KA!" - crows are attracted to fire\'s warmth! HI is like "HEE!" - fire is HI-t (hot)!'
  },
  {
    character: '水',
    radicals: [{ char: '水', name: 'water', meaning: 'water' }],
    components: 'A river with splashes',
    story: 'A river flowing down! The vertical line is the main current, and the strokes on each side are WATER splashing as it hits rocks. See the droplets spraying outward? That\'s WATER in motion!',
    hint: 'River with splashes = water',
    reading_mnemonic: 'すい/みず (sui/mizu) - "SWEE!" Water tastes so SWEET! SUI = sweet! MIZU sounds like "me zoo" - "Me? Zoo? I need MIZU (water) after walking around the zoo!"'
  },
  {
    character: '木',
    radicals: [{ char: '木', name: 'tree/wood', meaning: 'tree, wood' }],
    components: 'A tree with branches and roots',
    story: 'A perfect TREE! The horizontal line is branches spreading out, the vertical line is the trunk going straight up, and the diagonal strokes at the bottom are roots digging into the ground. WOOD comes from TREEs!',
    hint: 'Trunk + branches + roots = tree',
    reading_mnemonic: 'もく/き (moku/ki) - "MOO-K!" A cow (MOO) got stuck in a tree and can\'t move or talk - it\'s MOKU (silent)! KI sounds like "key" - the KEY is hidden in the tree!'
  },
  {
    character: '金',
    radicals: [{ char: '金', name: 'gold/metal', meaning: 'gold, metal, money' }],
    components: 'A roof over a mound with nuggets',
    story: 'Picture a roof/cover (人+王) protecting a pile of GOLD nuggets (土) underneath! The dots at the bottom are gold coins or precious metal pieces. GOLD needs protection - keep it safe under a roof!',
    hint: 'Roof over nuggets = gold/money',
    reading_mnemonic: 'きん/かね (kin/kane) - "KIN!" Your KIN (family) wants your GOLD! Or KANE sounds like "cane" - a pimp\'s golden CANE shows off his money!'
  },
  {
    character: '土',
    radicals: [{ char: '土', name: 'earth/soil', meaning: 'earth, soil, ground' }],
    components: 'A cross planted in the ground',
    story: 'A cross or sprout emerging from the ground! The horizontal line is the surface of the EARTH/SOIL, and the vertical line is something growing up from it. Plants grow from the SOIL. Saturday is "earth day" in Japanese!',
    hint: 'Surface + growth = earth/soil',
    reading_mnemonic: 'ど/つち (do/tsuchi) - "DOH!" Homer Simpson falls and eats DIRT: "DOH!" TSUCHI sounds like "two chi" - dig TWO inches into the soil with your CHI energy!'
  },
  {
    character: '年',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain/rice plant' }, { char: '干', name: 'dry', meaning: 'dry/shield' }],
    components: 'Grain stalks being harvested over time',
    story: 'Picture rice/grain (禾) being harvested - this happens once a YEAR! The strokes show grain stalks bending with time. Farmers count YEARS by their harvests. One harvest cycle = one YEAR.',
    hint: 'Harvest cycle = year',
    reading_mnemonic: 'ねん/とし (nen/toshi) - "NEN!" Every YEAR you say "NEN-ever again!" to your New Year\'s resolutions. TOSHI sounds like "toasty" - every year ends with TOASTY holiday celebrations!'
  },
  {
    character: '時',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun/day' }, { char: '寺', name: 'temple', meaning: 'temple' }],
    components: 'Sun next to a temple',
    story: 'The sun (日) next to a temple (寺)! In old days, temples rang bells to tell TIME throughout the day. When the SUN moves across the sky past the TEMPLE, you know what TIME it is. Temple bells = TIME!',
    hint: 'Sun + temple bells = time',
    reading_mnemonic: 'じ/とき (ji/toki) - "What time is it? GEE (JI), I don\'t know!" TOKI sounds like "tokey" - check your watch (TOKI-ticker) for the time!'
  },
  {
    character: '間',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '日', name: 'sun', meaning: 'sun' }],
    components: 'Sun peeking through a gate',
    story: 'The sun (日) peeking through a gate (門)! When you see sunlight coming through the crack BETWEEN door panels, that\'s the INTERVAL/SPACE between them. The gap BETWEEN the gates lets light through!',
    hint: 'Sun through gate = interval/between',
    reading_mnemonic: 'かん/あいだ/ま (kan/aida/ma) - "CAN I see through?" Yes, you CAN see through the gap! AIDA sounds like "I duh" - "I, duh, need space BETWEEN us!" MA = "Mah, give me space!"'
  }
]

async function insertBatch() {
  console.log('📅 BATCH 2: Days/Time (日月火水木金土年時間)')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_2) {
    const kanji_id = await getKanjiId(m.character)
    
    if (!kanji_id) {
      console.log(`❌ ${m.character} - Could not find in kanji table\n`)
      continue
    }
    
    console.log(`📝 ${m.character} (kanji_id: ${kanji_id}) - Inserting...`)
    console.log(`   Memory: ${m.story.substring(0, 50)}...`)
    console.log(`   Reading: ${m.reading_mnemonic.substring(0, 50)}...`)
    
    const { data: existing } = await supabase
      .from('mnemonics')
      .select('id')
      .eq('kanji_id', kanji_id)
      .single()
    
    let error
    if (existing) {
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
  console.log('✨ Batch 2 complete! 20/79 N5 kanji done.')
}

insertBatch()
