/**
 * BATCH 2: Nature & Elements 日月火水木金土山川
 * 
 * Quality mnemonics with:
 * - MEANING STORY: Explains WHY the kanji looks that way (radical-based, memorable)
 * - READING MNEMONIC: Sound association story to remember pronunciation
 * 
 * Run with: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch2_nature.js
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
  
  if (error) {
    console.log(`Could not find kanji_id for ${character}`)
    return null
  }
  return data.id
}

const BATCH_2 = [
  {
    character: '日',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun/day' }],
    components: 'A sun with a line through it',
    story: 'Look at that window! You can see the SUN through it - a bright square with a horizon line. Every DAY the sun rises in your window. The ancient Japanese drew the SUN as a box because it\'s too bright to look at directly!',
    hint: 'Window with sun = day',
    reading_mnemonic: 'にち/ひ (nichi/hi) - "KNEE-CHEESE!" Every DAY you eat KNEE-CHEESE for breakfast! Or: "HE!" - HE wakes up every DAY with the sun. "HE loves sunny DAYS!"'
  },
  {
    character: '月',
    radicals: [{ char: '月', name: 'moon', meaning: 'moon/month' }],
    components: 'A crescent moon with lines',
    story: 'The MOON with its craters! See the two horizontal lines inside? Those are the shadows on the moon\'s surface. Every MONTH the moon goes through its phases. The moon takes about a MONTH to orbit Earth!',
    hint: 'Crescent with marks = month/moon',
    reading_mnemonic: 'げつ/つき (getsu/tsuki) - "GET SKIING!" Every MONTH you GET to go SKIING under the moonlight! Or: "TSUKI" sounds like "sue key" - Sue lost her KEY under the MOON last MONTH!'
  },
  {
    character: '火',
    radicals: [{ char: '火', name: 'fire', meaning: 'fire' }],
    components: 'Flames with sparks flying',
    story: 'A campFIRE! See the person (人) shape in the middle? That\'s the main flame. The two dots on the sides are sparks flying off! When you sit around a FIRE, sparks pop and fly everywhere!',
    hint: 'Person shape + sparks = fire',
    reading_mnemonic: 'か/ひ (ka/hi) - "CAR on FIRE!" Your CAR is on FIRE! "KA-boom!" it explodes! Or: "HE set the FIRE!" HE was playing with matches!'
  },
  {
    character: '水',
    radicals: [{ char: '水', name: 'water', meaning: 'water' }],
    components: 'Water flowing and splashing',
    story: 'A river of WATER! The vertical line is the main stream, and the other strokes are splashes and tributaries branching off. Picture a waterfall - the main flow with spray splashing to the sides!',
    hint: 'Stream with splashes = water',
    reading_mnemonic: 'すい/みず (sui/mizu) - "SWEE!" You take a SWEET sip of WATER - "SWEE, so refreshing!" Or: "ME ZOO!" - "ME go to ZOO!" but it\'s raining WATER on ME at the ZOO!'
  },
  {
    character: '木',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree/wood' }],
    components: 'A tree with branches and roots',
    story: 'A perfect TREE! The horizontal line is the ground. Above it: branches reaching up to the sky. Below it: roots digging down into the earth. One vertical trunk, branches up, roots down - TREE!',
    hint: 'Trunk + branches + roots = tree',
    reading_mnemonic: 'もく/き (moku/ki) - "MOCK the TREE!" People MOCK the old TREE: "MOK MOK MOK!" Or: "KEY!" There\'s a KEY hidden in the TREE! Find the KEY in the TREE trunk!'
  },
  {
    character: '金',
    radicals: [{ char: '人', name: 'person', meaning: 'person' }, { char: '王', name: 'king', meaning: 'king' }],
    components: 'Person + king + dots (treasure)',
    story: 'Buried treasure! A PERSON (人) on top is digging. Below is the KING\'s (王) treasure chest. The dots are GOLD nuggets and coins! People dig for the KING\'s GOLD! MONEY comes from precious METAL!',
    hint: 'Person digging king\'s treasure = gold/money',
    reading_mnemonic: 'きん/かね (kin/kane) - "KIN has MONEY!" Your KIN (family) has lots of GOLD! Or: "CANE!" - Grandpa\'s CANE is made of GOLD! He\'s rich - his CANE is solid GOLD!'
  },
  {
    character: '土',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth/ground' }],
    components: 'A cross in the ground',
    story: 'A plant sprouting from the EARTH! The bottom line is the ground. The vertical line is a sprout growing up. The top line is the first leaves spreading out. Life grows from the SOIL/EARTH!',
    hint: 'Sprout from ground = earth/soil',
    reading_mnemonic: 'ど/つち (do/tsuchi) - "DOH!" Homer Simpson digs in the DIRT: "DOH! I hit a rock!" Or: "TWO CHEESE!" - There\'s TWO CHEESE buried in the EARTH! Dig up the TSUCHI for CHEESE!'
  },
  {
    character: '山',
    radicals: [{ char: '山', name: 'mountain', meaning: 'mountain' }],
    components: 'Three mountain peaks',
    story: 'Three MOUNTAIN peaks! The middle one is tallest - that\'s the main peak. The two on the sides are smaller peaks. Picture the Alps or Mount Fuji\'s volcanic cone. Three peaks = MOUNTAIN range!',
    hint: 'Three peaks = mountain',
    reading_mnemonic: 'さん/やま (san/yama) - "SAN Francisco has mountains!" Or better: "YAMA-HA!" Yamaha motorcycles climb MOUNTAINS! "YAMA! YAMA!" they roar up the MOUNTAIN!'
  },
  {
    character: '川',
    radicals: [{ char: '川', name: 'river', meaning: 'river' }],
    components: 'Three streams flowing',
    story: 'Three streams of a RIVER! Picture looking down at a river from above - you see the main current in the middle with two side streams. The curved lines show the water FLOWING downhill. A RIVER always flows!',
    hint: 'Three flowing streams = river',
    reading_mnemonic: 'せん/かわ (sen/kawa) - "Send it down the RIVER!" Or: "KAWA-saki!" Kawasaki jet skis zoom down the RIVER! "KAWA! KAWA!" - the sound of water in the RIVER!'
  },
  {
    character: '海',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '毎', name: 'every', meaning: 'every' }],
    components: '氵 (water drops) + 毎 (every)',
    story: 'WATER (氵) that goes on EVERY (毎) direction forever - that\'s the SEA! The ocean has water EVERY-where you look. The three drops on the left are waves, and 毎 (every) shows it\'s endless. Infinite WATER = SEA!',
    hint: 'Water + every = sea (water everywhere)',
    reading_mnemonic: 'かい/うみ (kai/umi) - "OO, ME!" The SEA is calling to you: "OO, ME! Come to ME!" The waves crash: "OO-ME! OO-ME!" beckoning you to swim in the SEA! UMI sounds like "Oo, me!"'
  },
  {
    character: '空',
    radicals: [{ char: '穴', name: 'hole/cave', meaning: 'hole' }, { char: '工', name: 'work', meaning: 'work/craft' }],
    components: '穴 (cave opening) + 工 (craft)',
    story: 'A HOLE (穴) in the ceiling where WORKERS (工) look up - they see the SKY! Or think: when you\'re in a cave and look up through a hole, you see EMPTY sky. The SKY is an EMPTY void above us!',
    hint: 'Hole + work = sky/empty',
    reading_mnemonic: 'くう/そら (kuu/sora) - "COO COO!" Birds in the SKY go "COO COO!" Look up at the EMPTY SKY! Or: "SO-RAH!" - "SO RAH!" (so raw!) The SKY is SO raw and beautiful! SORA the explorer looks at the SKY!'
  },
  {
    character: '雨',
    radicals: [{ char: '雨', name: 'rain', meaning: 'rain' }],
    components: 'Cloud with raindrops falling',
    story: 'Look at the sky - a CLOUD (the top horizontal line with the box) with RAINDROPS falling from it (the four marks inside)! When clouds get heavy with water, RAIN falls down. The box is the cloud, drops inside!',
    hint: 'Cloud box + drops = rain',
    reading_mnemonic: 'う/あめ (u/ame) - "OOH, it\'s RAINING!" "OOH!" you shout as RAIN pours down! Or: "AH-MAY!" - "AH, MAY showers!" April showers bring MAY flowers. AME = AH-MAY rain!'
  },
  {
    character: '天',
    radicals: [{ char: '一', name: 'one', meaning: 'one/top' }, { char: '大', name: 'big', meaning: 'big' }],
    components: 'One + big (above big)',
    story: 'What\'s above (一) a BIG (大) person? HEAVEN! The top line is the sky/heaven, and below is a big person looking up. HEAVEN is above everything, even the biggest person. The sky is HEAVEN!',
    hint: 'Above big = heaven/sky',
    reading_mnemonic: 'てん/あま (ten/ama) - "TEN angels in HEAVEN!" There are TEN angels flying in HEAVEN! Count them: 1, 2... TEN! Or: "AH-MA!" - "AH, MAMA is in HEAVEN!" AMA = heavenly mother!'
  },
  {
    character: '気',
    radicals: [{ char: '气', name: 'steam', meaning: 'steam/vapor' }, { char: '〆', name: 'tie', meaning: '締め' }],
    components: 'Steam rising with a twist',
    story: 'STEAM (气) rising with ENERGY (〆)! When water boils, you see STEAM rising - that\'s the SPIRIT/ENERGY of the water escaping! Your SPIRIT is like steam - invisible energy that powers you. FEELING is your inner steam!',
    hint: 'Rising steam = spirit/energy/feeling',
    reading_mnemonic: 'き/け (ki/ke) - "KEY to your SPIRIT!" The KEY unlocks your inner ENERGY! "KI-YAH!" martial artists shout, releasing their KI (energy)! Your KI is your life force!'
  },
  {
    character: '花',
    radicals: [{ char: '艹', name: 'grass/plant', meaning: 'plant' }, { char: '化', name: 'change', meaning: 'change/transform' }],
    components: '艹 (plant) + 化 (transform)',
    story: 'A PLANT (艹) that TRANSFORMS (化) - into a FLOWER! Seeds grow into plants, then they CHANGE into beautiful FLOWERS! The grass radical on top shows it\'s a plant, and 化 shows it transforms into something beautiful!',
    hint: 'Plant + transform = flower',
    reading_mnemonic: 'か/はな (ka/hana) - "HA-NAH!" You laugh at the beautiful FLOWER: "HA-NAH! So pretty!" Hannah loves FLOWERS - HANA is Hannah\'s favorite! Or: Montana HANA farm grows FLOWERS!'
  }
]

async function insertBatch() {
  console.log('🌿 BATCH 2: Nature & Elements')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_2) {
    const kanji_id = await getKanjiId(m.character)
    
    if (!kanji_id) {
      console.log(`❌ ${m.character} - Could not find in kanji table\n`)
      continue
    }
    
    console.log(`📝 ${m.character} - Inserting...`)
    console.log(`   Story: ${m.story.substring(0, 60)}...`)
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
  console.log('✨ Batch 2 complete! Nature kanji done.')
}

insertBatch()
