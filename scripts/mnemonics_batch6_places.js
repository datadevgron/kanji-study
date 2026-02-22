/**
 * BATCH 6: Places & Directions 国店駅道北南東西外中上下左右
 * 
 * Location kanji with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch6_places.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_6 = [
  {
    character: '国',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'border/walls' }, { char: '玉', name: 'jewel', meaning: 'jewel/treasure' }],
    components: '囗 (border) + 玉 (jewel)',
    story: 'A precious JEWEL (玉) protected by WALLS (囗) - that\'s a COUNTRY! Every COUNTRY has borders (walls) to protect its treasures and people inside. The jewel is the nation\'s wealth! Walls + treasure = COUNTRY!',
    hint: 'Walls protecting jewel = country',
    reading_mnemonic: 'こく/くに (koku/kuni) - "COCA-Cola in every COUNTRY!" COKE is in every KOKU! Or: "COON-y!" - "This COUNTRY is full of racCOONS!" KUNI sounds like "coon-y" - every COUNTRY has wildlife!'
  },
  {
    character: '店',
    radicals: [{ char: '广', name: 'building', meaning: 'building/shelter' }, { char: '占', name: 'occupy', meaning: 'occupy/fortune' }],
    components: '广 (building) + 占 (occupy)',
    story: 'A BUILDING (广) that you OCCUPY (占) for business - a STORE! Shopkeepers occupy a building to sell things. The space is occupied by merchandise. Building + occupy = STORE/SHOP!',
    hint: 'Building occupied = store',
    reading_mnemonic: 'てん/みせ (ten/mise) - "TEN items at the STORE!" The STORE has TEN items on sale! Or: "ME-SAY welcome!" At the STORE, ME SAY "welcome!" MISE sounds like "me say" - I greet customers!'
  },
  {
    character: '駅',
    radicals: [{ char: '馬', name: 'horse', meaning: 'horse' }, { char: '尺', name: 'measure', meaning: 'unit/measure' }],
    components: '馬 (horse) + 尺 (measure)',
    story: 'Where HORSES (馬) stop at measured intervals - a STATION! In old Japan, stations were where you changed horses every few miles. Now trains stop at STATIONS instead of horses!',
    hint: 'Horse stop points = station',
    reading_mnemonic: 'えき (eki) - "ICKY STATION!" This STATION is ICKY and dirty! EKI sounds like "icky" - clean up the ICKY STATION! Or: "ECHO at the STATION!" Your voice ECHOs at the train EKI!'
  },
  {
    character: '道',
    radicals: [{ char: '辶', name: 'movement', meaning: 'road/walk' }, { char: '首', name: 'head', meaning: 'head/neck' }],
    components: '辶 (movement) + 首 (head)',
    story: 'Where your HEAD (首) leads as you MOVE (辶) - that\'s the ROAD! You walk down the ROAD following where your head faces. The path you walk, the WAY you go = ROAD!',
    hint: 'Moving where head leads = road/way',
    reading_mnemonic: 'どう/みち (dou/michi) - "DOH! Wrong ROAD!" Homer takes the wrong ROAD: "DOH!" Or: "ME-CHEE-z!" - "This ROAD leads to ME some CHEESE!" MICHI sounds like "me-cheese" - the road to cheese!'
  },
  {
    character: '北',
    radicals: [{ char: '北', name: 'north', meaning: 'north' }],
    components: 'Two people back to back',
    story: 'Two people sitting BACK-TO-BACK, turning away from the cold NORTH wind! When the cold northern wind blows, people turn their backs to it. Backs turned = facing away from NORTH!',
    hint: 'Backs to cold = north',
    reading_mnemonic: 'ほく/きた (hoku/kita) - "HOKKAIDO is NORTH!" Japan\'s NORTH island! Or: "KEY-TAH!" - "The KEY TAkes you NORTH!" KITA sounds like "key-ta" - the key to the NORTH!'
  },
  {
    character: '南',
    radicals: [{ char: '南', name: 'south', meaning: 'south' }],
    components: 'Plants growing in warmth',
    story: 'Lush plants growing under the warm SOUTHERN sun! The SOUTH is warm, so plants thrive. Picture palm trees and tropical plants - they love the SOUTH! Warm growth = SOUTH!',
    hint: 'Warm plants = south',
    reading_mnemonic: 'なん/みなみ (nan/minami) - "NAAN bread from the SOUTH!" Warm NAAN from southern India! Or: "ME-NAH-ME!" - "ME? NAH, ME go SOUTH!" MINAMI = "Me? Nah, me!" go south!'
  },
  {
    character: '東',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '日', name: 'sun', meaning: 'sun' }],
    components: '日 (sun) + 木 (tree)',
    story: 'The SUN (日) rising behind a TREE (木) - that\'s EAST! Every morning, the sun rises in the EAST. If you see the sun coming up behind trees, you\'re looking EAST! Sunrise through trees = EAST!',
    hint: 'Sun rising through tree = east',
    reading_mnemonic: 'とう/ひがし (tou/higashi) - "TOE-kyo is EAST!" Tokyo is in the EAST! Or: "HE-GAH-SHE!" - "HE goes, AH, SHE goes EAST!" HIGASHI = "He, gah, she" - everyone goes EAST!'
  },
  {
    character: '西',
    radicals: [{ char: '西', name: 'west', meaning: 'west' }],
    components: 'Bird in nest at sunset',
    story: 'A BIRD settling into its NEST as the sun sets in the WEST! When evening comes and the sun goes WEST, birds return to roost. Sunset nest = WEST! Birds go home when the sun goes WEST!',
    hint: 'Bird nesting at sunset = west',
    reading_mnemonic: 'せい/さい/にし (sei/sai/nishi) - "SAY goodbye to the WEST sun!" SAY "bye!" as the sun sets! Or: "KNEE-SHE!" - "KNEE deep, SHE walks WEST!" NISHI = "knee-she" wading west!'
  },
  {
    character: '外',
    radicals: [{ char: '夕', name: 'evening', meaning: 'evening/moon' }, { char: '卜', name: 'divination', meaning: 'fortune telling' }],
    components: '夕 (evening) + 卜 (divination)',
    story: 'Fortune tellers (卜) work OUTSIDE in the EVENING (夕)! They set up their stalls OUTSIDE when it gets dark. Also: when the moon comes out, you go OUTSIDE! Evening fortune telling = OUTSIDE!',
    hint: 'Evening divination outside = outside',
    reading_mnemonic: 'がい/そと (gai/soto) - "GUY goes OUTSIDE!" That GUY is going OUTSIDE! Or: "SO-TOE!" - "SO cold, my TOE freezes OUTSIDE!" SOTO = "so toe" - so cold outside!'
  },
  {
    character: '中',
    radicals: [{ char: '口', name: 'box', meaning: 'container' }, { char: '丨', name: 'line', meaning: 'center line' }],
    components: '口 (box) + 丨 (line through middle)',
    story: 'A line going through the MIDDLE of a box - right in the CENTER! The line hits the exact MIDDLE point. When something is IN a container, it\'s in the MIDDLE. Center of the box = MIDDLE/INSIDE!',
    hint: 'Line through center = middle/inside',
    reading_mnemonic: 'ちゅう/なか (chuu/naka) - "CHEW in the MIDDLE!" CHEW your food in the MIDDLE of your mouth! Or: "NAH-KAH!" - "NAH, come inside KAH!" NAKA = "nah-kah" - come INSIDE!'
  },
  {
    character: '上',
    radicals: [{ char: '上', name: 'above', meaning: 'above/up' }],
    components: 'Line above base',
    story: 'Something sitting ABOVE a base line - that\'s UP/ABOVE! The top part sits ON TOP of the bottom. When you go UP, you rise ABOVE where you were. Higher position = UP/ABOVE!',
    hint: 'Higher than base = up/above',
    reading_mnemonic: 'じょう/うえ (jou/ue) - "JOE climbs UP!" JOE goes UP the ladder! Or: "OOH-WAY!" - "OOH WAY up there!" You look UP: "OOH-way UP!" UE sounds like "ooh-way" - way UP there!'
  },
  {
    character: '下',
    radicals: [{ char: '下', name: 'below', meaning: 'below/down' }],
    components: 'Line below base',
    story: 'Something hanging BELOW a base line - that\'s DOWN/BELOW! The stroke goes DOWN under the line. When you go DOWN, you drop BELOW where you were. Lower position = DOWN/BELOW!',
    hint: 'Lower than base = down/below',
    reading_mnemonic: 'か/げ/した (ka/ge/shita) - "Come DOWN KAH!" Come DOWN from there! Or: "SHE-TAH!" - "SHE TAkes the stairs DOWN!" SHITA sounds like "she-ta" - SHE goes DOWN!'
  },
  {
    character: '左',
    radicals: [{ char: '工', name: 'work', meaning: 'work/craft' }, { char: '一', name: 'one', meaning: 'hand motion' }],
    components: 'Hand + work',
    story: 'A worker\'s LEFT hand holding a tool! Most people\'s LEFT hand assists while the right does the work. The LEFT hand holds things steady. Worker\'s helper hand = LEFT!',
    hint: 'Helper hand = left',
    reading_mnemonic: 'さ/ひだり (sa/hidari) - "SAH! I\'m LEFT-handed!" Or: "HE-DAH-REE!" - "HE DAREs to go LEFT!" HIDARI sounds like "he-dare-y" - he dares to turn LEFT!'
  },
  {
    character: '右',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '一', name: 'one', meaning: 'hand motion' }],
    components: 'Hand + mouth',
    story: 'Your RIGHT hand brings food to your MOUTH (口)! Most people eat with their RIGHT hand. The hand that feeds your mouth = RIGHT! Right hand to mouth = RIGHT!',
    hint: 'Feeding hand = right',
    reading_mnemonic: 'う/ゆう/みぎ (u/yuu/migi) - "YOU go RIGHT!" Turn RIGHT, YOU! Or: "ME-GEE!" - "ME? GEE, I\'ll go RIGHT!" MIGI sounds like "me-gee" - gee, I\'m going RIGHT!'
  }
]

async function insertBatch() {
  console.log('🗺️ BATCH 6: Places & Directions')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_6) {
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
  
  console.log('✨ Batch 6 complete!')
}

insertBatch()
