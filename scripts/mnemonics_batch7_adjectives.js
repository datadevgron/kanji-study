/**
 * BATCH 7: Adjectives 新古長高安広大小多少早
 * 
 * Descriptive kanji with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch7_adjectives.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_7 = [
  {
    character: '新',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }, { char: '木', name: 'tree', meaning: 'tree' }, { char: '斤', name: 'axe', meaning: 'axe' }],
    components: '立 (stand) + 木 (tree) + 斤 (axe)',
    story: 'A TREE (木) STANDING (立) gets cut by an AXE (斤) - now it\'s NEW lumber! When you cut fresh wood from a standing tree, you get NEW material. Freshly cut = NEW! New wood, new start!',
    hint: 'Fresh cut tree = new',
    reading_mnemonic: 'しん/あたら (shin/atara) - "SHEEN on NEW things!" NEW things have a SHEEN! Or: "AH-TAH-RAH-shii!" - "AH! TAke a RAre SHIny NEW one!" ATARASHII = shiny NEW!'
  },
  {
    character: '古',
    radicals: [{ char: '十', name: 'ten', meaning: 'ten' }, { char: '口', name: 'mouth', meaning: 'mouth/generations' }],
    components: '十 (ten) + 口 (mouth/generations)',
    story: 'TEN (十) generations of MOUTHS (口) passing down stories - that\'s OLD! When something has been talked about for ten generations, it\'s very OLD. Ancient tales = OLD!',
    hint: 'Ten generations = old',
    reading_mnemonic: 'こ/ふる (ko/furu) - "CO-CO is OLD!" Grandma CoCo is OLD! Or: "FOO-ROO!" - "This FOOD is RUINED - it\'s OLD!" FURUI = "foo-roo-ee" - this old food is ruined!'
  },
  {
    character: '長',
    radicals: [{ char: '長', name: 'long', meaning: 'long' }],
    components: 'Long flowing hair',
    story: 'LONG flowing hair blowing in the wind! The kanji shows strands of LONG hair. When hair grows and grows, it gets LONG. The elder with the LONGEST hair is the chief! Long hair = LONG!',
    hint: 'Flowing hair = long',
    reading_mnemonic: 'ちょう/なが (chou/naga) - "CHOmp on a LONG sandwich!" CHOW on something LONG! Or: "NAH-GAH!" - "NAH, this snake is LONG! GAH!" NAGAI = "nah-gah-ee" - so LONG!'
  },
  {
    character: '高',
    radicals: [{ char: '高', name: 'tall', meaning: 'tall/high' }],
    components: 'Tall building with layers',
    story: 'A TALL building with multiple floors! Count the layers - it\'s so HIGH! Like a pagoda reaching toward the sky. Each horizontal line is another floor going HIGHER. Tall tower = HIGH/EXPENSIVE!',
    hint: 'Multi-story building = tall/expensive',
    reading_mnemonic: 'こう/たか (kou/taka) - "COW on a HIGH mountain!" The COW climbed HIGH! Or: "TAH-KAH!" - "TAke the KArt HIGH up!" TAKAI = "tah-kah-ee" - prices are HIGH!'
  },
  {
    character: '安',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof/house' }, { char: '女', name: 'woman', meaning: 'woman' }],
    components: '宀 (roof) + 女 (woman)',
    story: 'A WOMAN (女) safe under a ROOF (宀) - that\'s PEACE/CHEAP! When you\'re safely home, you feel at PEACE. Also: basic shelter is CHEAP - just a roof over your head! Safe at home = PEACEFUL/CHEAP!',
    hint: 'Woman safe under roof = cheap/peaceful',
    reading_mnemonic: 'あん/やす (an/yasu) - "ON sale, CHEAP!" It\'s AN amazing deal! Or: "YAH-SUE!" - "YAH! SUE found it CHEAP!" YASUI = "yah-sue-ee" - yay, so CHEAP!'
  },
  {
    character: '広',
    radicals: [{ char: '广', name: 'building', meaning: 'cliff/shelter' }, { char: '厶', name: 'private', meaning: 'nose/self' }],
    components: '广 (shelter) + 厶 (spreading)',
    story: 'A shelter (广) that spreads out WIDE! A building with a WIDE roof covering a large area. The space beneath is SPACIOUS and WIDE. Spreading shelter = WIDE/SPACIOUS!',
    hint: 'Spreading shelter = wide',
    reading_mnemonic: 'こう/ひろ (kou/hiro) - "HE-ROW of WIDE fields!" A HERO surveys his WIDE lands! Or: "HERO\'s WIDE cape!" HIROI = "he-row-ee" - WIDE like a hero\'s cape!'
  },
  {
    character: '多',
    radicals: [{ char: '夕', name: 'evening', meaning: 'evening' }, { char: '夕', name: 'evening', meaning: 'evening' }],
    components: '夕 + 夕 (evening doubled)',
    story: 'EVENING (夕) after EVENING (夕) - MANY days! When you stack evenings on top of each other, you get MANY days. Two moons = MANY nights. Multiple of anything = MANY!',
    hint: 'Doubled evenings = many',
    reading_mnemonic: 'た/おお (ta/oo) - "TON of stuff - MANY!" A TON is MANY! Or: "OH-OH! So MANY!" You see MANY things: "OH-OH!" OOI = "oh-oh-ee" - oh, so MANY!'
  },
  {
    character: '少',
    radicals: [{ char: '小', name: 'small', meaning: 'small' }, { char: '丿', name: 'slash', meaning: 'cut' }],
    components: '小 (small) + slash (减少)',
    story: 'Something SMALL (小) being cut even smaller - now there\'s only a FEW! When you cut something small, you\'re left with very LITTLE. Less and less = FEW/A LITTLE!',
    hint: 'Small cut smaller = few',
    reading_mnemonic: 'しょう/すこ/すく (shou/suko/suku) - "SHOW me a LITTLE!" SHOW just a FEW! Or: "SKOO-shi!" - "Just a SCOOP-SHI!" SUKOSHI = "scoopshi" - just a little scoop!'
  },
  {
    character: '早',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '十', name: 'ten', meaning: 'cross/early' }],
    components: '日 (sun) + 十 (cross/ground)',
    story: 'The SUN (日) just above the ground (十) - it\'s EARLY morning! The sun has barely risen above the horizon. When the sun is low, it\'s EARLY! First light of day = EARLY!',
    hint: 'Sun just risen = early',
    reading_mnemonic: 'そう/さ/はや (sou/sa/haya) - "SO EARLY!" It\'s SO EARLY in the morning! Or: "HA-YAH!" - "HA-YAH! Wake up EARLY!" HAYAI = "ha-yah-ee" - karate chop yourself awake EARLY!'
  },
  {
    character: '明',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '月', name: 'moon', meaning: 'moon' }],
    components: '日 (sun) + 月 (moon)',
    story: 'The SUN (日) and MOON (月) together - maximum BRIGHTNESS! With both the sun AND moon visible, there\'s so much light! Double light sources = BRIGHT! Day and night lights = BRIGHT!',
    hint: 'Sun + moon = bright',
    reading_mnemonic: 'めい/あか (mei/aka) - "MAY be BRIGHT tomorrow!" MAY brings BRIGHT days! Or: "AH-KAH-rui!" - "AH! KA-rate in the BRIGHT light!" AKARUI = it\'s so BRIGHT!'
  },
  {
    character: '暗',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '音', name: 'sound', meaning: 'sound' }],
    components: '日 (sun) + 音 (sound)',
    story: 'When there\'s no SUN (日), you rely on SOUND (音) - it\'s DARK! In the DARK, you can\'t see, so you listen for sounds instead. Blind reliance on sound = DARK!',
    hint: 'Sun hidden, only sound = dark',
    reading_mnemonic: 'あん/くら (an/kura) - "ON in the DARK!" Turn the light ON in the DARK! Or: "CURE-AH!" - "CURE-AH my fear of the DARK!" KURAI = "cure-ah-ee" - cure my darkness fear!'
  },
  {
    character: '白',
    radicals: [{ char: '白', name: 'white', meaning: 'white' }],
    components: 'Sun ray creating white',
    story: 'The SUN\'s bright ray creates WHITE light! Pure sunlight appears WHITE. Snow reflecting sunlight = WHITE. The blank brightness of pure light = WHITE!',
    hint: 'Pure light = white',
    reading_mnemonic: 'はく/しろ (haku/shiro) - "HACK-er\'s WHITE screen!" Hackers see WHITE screens! Or: "SHE-ROW!" - "SHE has a ROW of WHITE teeth!" SHIROI = "she-row-ee" - WHITE as her teeth!'
  },
  {
    character: '黒',
    radicals: [{ char: '黒', name: 'black', meaning: 'black' }],
    components: 'Fire with soot creating black',
    story: 'FIRE creates BLACK soot and smoke! When things burn, they turn BLACK. The charred remains, the dark smoke - all BLACK! Burnt things = BLACK!',
    hint: 'Burnt/soot = black',
    reading_mnemonic: 'こく/くろ (koku/kuro) - "COCOA is dark!" Dark COCOA is almost BLACK! Or: "CREW-OH!" - "CREW, OH no, it\'s BLACK outside!" KUROI = "crew-oh-ee" - the crew sees BLACK!'
  }
]

async function insertBatch() {
  console.log('🎨 BATCH 7: Adjectives')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_7) {
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
  
  console.log('✨ Batch 7 complete!')
}

insertBatch()
