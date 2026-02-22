/**
 * GENERATE RADICAL-BASED MNEMONICS
 * 
 * This script generates mnemonics based on kanji radical decomposition.
 * It creates stories that connect the radicals/components to the meaning.
 * 
 * Run with: node scripts/generate_radical_mnemonics.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

// Radical/component meanings for building stories
const componentMeanings = {
  // People & Body
  '人': 'person', '亻': 'person', '儿': 'legs/person', '女': 'woman', '子': 'child',
  '男': 'man', '父': 'father', '母': 'mother', '目': 'eye', '耳': 'ear', '口': 'mouth',
  '手': 'hand', '扌': 'hand', '足': 'foot/leg', '心': 'heart', '忄': 'heart/emotion',
  '頁': 'head/page', '首': 'neck/head', '身': 'body', '骨': 'bone',
  
  // Nature
  '日': 'sun/day', '月': 'moon/month', '木': 'tree/wood', '林': 'forest', '森': 'woods',
  '山': 'mountain', '川': 'river', '水': 'water', '氵': 'water', '氺': 'water',
  '火': 'fire', '灬': 'fire/heat', '土': 'earth/soil', '石': 'stone', '金': 'metal/gold',
  '雨': 'rain', '雲': 'cloud', '風': 'wind', '雪': 'snow', '田': 'rice field',
  '花': 'flower', '草': 'grass', '艹': 'grass/plant', '⺾': 'grass', '竹': 'bamboo',
  
  // Buildings & Objects
  '宀': 'roof/house', '广': 'building/cliff', '门': 'gate', '門': 'gate',
  '戸': 'door', '車': 'car/vehicle', '舟': 'boat', '糸': 'thread/silk',
  '衣': 'clothing', '衤': 'clothing', '食': 'food/eat', '飠': 'food',
  
  // Actions & Abstract
  '言': 'speech/say', '訁': 'speech', '見': 'see', '聞': 'hear', '走': 'run',
  '行': 'go/walk', '立': 'stand', '止': 'stop', '力': 'power/strength',
  '刀': 'sword/cut', '⺉': 'sword', '攵': 'strike/action', '⻖': 'hill',
  '辶': 'movement/walk', '⻌': 'movement', '彳': 'step/walk',
  
  // Numbers & Measurement
  '一': 'one', '二': 'two', '三': 'three', '十': 'ten', '百': 'hundred',
  '千': 'thousand', '万': 'ten thousand', '寸': 'inch/measure',
  
  // Misc common components
  '大': 'big', '小': 'small', '中': 'middle', '上': 'above', '下': 'below',
  '白': 'white', '黒': 'black', '赤': 'red', '青': 'blue/green',
  '古': 'old', '新': 'new', '高': 'tall/high', '長': 'long',
  '生': 'life/birth', '死': 'death', '王': 'king', '玉': 'jewel',
  '示': 'show/altar', '礻': 'altar/spirit', '神': 'god/spirit',
  '貝': 'shell/money', '馬': 'horse', '鳥': 'bird', '魚': 'fish', '犬': 'dog',
  '牛': 'cow', '羊': 'sheep', '虫': 'insect', '豕': 'pig',
  '又': 'again/hand', '寺': 'temple', '者': 'person/one who',
  '工': 'craft/work', '士': 'samurai/scholar', '夕': 'evening',
  '音': 'sound', '里': 'village/ri', '各': 'each', '合': 'fit/join',
  '分': 'divide/minute', '化': 'change', '可': 'possible',
  '己': 'self', '已': 'already', '巳': 'snake', '⺖': 'heart',
  '⺗': 'heart', '⺘': 'hand', '⺡': 'water', '⺨': 'dog',
  '⺼': 'meat/flesh', '肉': 'meat', '⺲': 'net', '⺮': 'bamboo',
  '⻗': 'rain', '⻘': 'blue', '⻣': 'bone', '⻤': 'demon',
  '采': 'harvest', '隹': 'short-tailed bird', '⺍': 'grass',
  '⺿': 'grass', '⻏': 'city', '⻖': 'hill', '⺒': 'roof',
  '宁': 'peaceful', '冖': 'cover', '冂': 'borders', '几': 'table',
  '凵': 'container', '勹': 'wrap', '匕': 'spoon/person', '匚': 'box',
  '匸': 'hiding', '卩': 'kneeling person', '厂': 'cliff', '厶': 'private',
  '夂': 'go slowly', '夊': 'go slowly', '夬': 'decisive',
}

// Kanji decomposition data (common N5-N3 kanji)
const kanjiDecomposition = {
  // N5 common
  '休': { parts: ['亻', '木'], story: 'A PERSON (亻) leaning against a TREE (木) to REST' },
  '何': { parts: ['亻', '可'], story: 'A PERSON (亻) asking "is it POSSIBLE (可)?" - WHAT?' },
  '体': { parts: ['亻', '本'], story: 'A PERSON\'s (亻) ROOT/ORIGIN (本) is their BODY' },
  '作': { parts: ['亻', '乍'], story: 'A PERSON (亻) working suddenly - to MAKE/CREATE' },
  '住': { parts: ['亻', '主'], story: 'A PERSON (亻) who is the MASTER (主) of a place LIVES there' },
  '使': { parts: ['亻', '吏'], story: 'A PERSON (亻) who is an OFFICIAL - to USE/EMPLOY' },
  '信': { parts: ['亻', '言'], story: 'A PERSON\'s (亻) WORDS (言) you can BELIEVE/TRUST' },
  '働': { parts: ['亻', '動'], story: 'A PERSON (亻) in MOTION (動) - WORKING' },
  '会': { parts: ['人', '云'], story: 'PEOPLE (人) gathering to talk (云) - a MEETING' },
  '先': { parts: ['⺧', '儿'], story: 'Legs (儿) moving BEFORE/AHEAD' },
  '入': { parts: ['入'], story: 'An arrow pointing down and in - to ENTER' },
  '出': { parts: ['山', '凵'], story: 'A mountain (山) rising from a container - to EXIT/GO OUT' },
  '前': { parts: ['⺼', '刂'], story: 'The MOON (月) cut with a SWORD (刂) - what comes BEFORE' },
  '名': { parts: ['夕', '口'], story: 'In the EVENING (夕), you call out with your MOUTH (口) someone\'s NAME' },
  '国': { parts: ['囗', '玉'], story: 'A JEWEL (玉) inside BORDERS (囗) - a COUNTRY' },
  '外': { parts: ['夕', '卜'], story: 'EVENING (夕) fortune-telling (卜) done OUTSIDE' },
  '大': { parts: ['大'], story: 'A person spreading arms and legs wide - BIG' },
  '天': { parts: ['一', '大'], story: 'ONE (一) thing above a BIG (大) person - HEAVEN/SKY' },
  '女': { parts: ['女'], story: 'A kneeling figure - WOMAN' },
  '子': { parts: ['子'], story: 'A baby with arms outstretched - CHILD' },
  '学': { parts: ['⺍', '子'], story: 'A CHILD (子) under a roof learning - to STUDY' },
  '安': { parts: ['宀', '女'], story: 'A WOMAN (女) under a ROOF (宀) is PEACEFUL/CHEAP' },
  '家': { parts: ['宀', '豕'], story: 'A PIG (豕) under a ROOF (宀) - a HOUSE (pigs were kept indoors)' },
  '室': { parts: ['宀', '至'], story: 'A ROOF (宀) you ARRIVE (至) at - a ROOM' },
  '小': { parts: ['小'], story: 'Three small drops - SMALL/LITTLE' },
  '山': { parts: ['山'], story: 'Three peaks - a MOUNTAIN' },
  '川': { parts: ['川'], story: 'Three flowing lines - a RIVER' },
  '年': { parts: ['⺧', '干'], story: 'Grain drying - a full YEAR cycle' },
  '後': { parts: ['彳', '幺', '夂'], story: 'Small steps (彳) taken slowly (夂) - BEHIND/AFTER' },
  '日': { parts: ['日'], story: 'The SUN with a line inside - SUN/DAY' },
  '時': { parts: ['日', '寺'], story: 'The SUN (日) at a TEMPLE (寺) - TIME (monks track time)' },
  '書': { parts: ['聿', '日'], story: 'A brush (聿) working by DAY (日) - to WRITE' },
  '月': { parts: ['月'], story: 'The crescent MOON' },
  '木': { parts: ['木'], story: 'A TREE with branches and roots' },
  '本': { parts: ['木', '一'], story: 'A line at the base of a TREE (木) - ROOT/BOOK/ORIGIN' },
  '来': { parts: ['来'], story: 'A tree with grain falling - harvest COMES' },
  '東': { parts: ['木', '日'], story: 'The SUN (日) rising behind a TREE (木) - EAST' },
  '校': { parts: ['木', '交'], story: 'TREES (木) where people MINGLE (交) - SCHOOL' },
  '母': { parts: ['母'], story: 'A woman with two breasts nursing - MOTHER' },
  '毎': { parts: ['⺼', '母'], story: 'EVERY day a MOTHER works' },
  '気': { parts: ['气', '〆'], story: 'Rising steam/air - SPIRIT/ENERGY' },
  '水': { parts: ['水'], story: 'Flowing drops - WATER' },
  '火': { parts: ['火'], story: 'Flames rising - FIRE' },
  '父': { parts: ['父'], story: 'A hand holding a stone axe - FATHER (provider)' },
  '男': { parts: ['田', '力'], story: 'POWER (力) in the FIELD (田) - MAN' },
  '白': { parts: ['白'], story: 'The sun with a ray - WHITE (bright)' },
  '百': { parts: ['一', '白'], story: 'ONE (一) WHITE (白) - HUNDRED' },
  '見': { parts: ['目', '儿'], story: 'An EYE (目) on LEGS (儿) walking around - to SEE' },
  '話': { parts: ['言', '舌'], story: 'WORDS (言) from a TONGUE (舌) - to TALK' },
  '語': { parts: ['言', '吾'], story: 'WORDS (言) I speak (吾) - LANGUAGE/WORD' },
  '読': { parts: ['言', '売'], story: 'WORDS (言) you SELL (売) - to READ' },
  '車': { parts: ['車'], story: 'A cart seen from above - CAR/VEHICLE' },
  '金': { parts: ['金'], story: 'Nuggets under a roof - GOLD/METAL/MONEY' },
  '長': { parts: ['長'], story: 'Long flowing hair - LONG' },
  '間': { parts: ['門', '日'], story: 'SUN (日) seen through a GATE (門) - INTERVAL/BETWEEN' },
  '雨': { parts: ['雨'], story: 'Drops falling from clouds - RAIN' },
  '電': { parts: ['雨', '田'], story: 'RAIN (雨) and FIELD (田) - ELECTRICITY (lightning in rice fields)' },
  '食': { parts: ['食'], story: 'A bowl with food and cover - to EAT' },
  '高': { parts: ['高'], story: 'A tall tower - HIGH/TALL' },
  '聞': { parts: ['門', '耳'], story: 'An EAR (耳) at the GATE (門) - to HEAR/ASK' },
  '行': { parts: ['行'], story: 'Crossroads - to GO' },
  '西': { parts: ['西'], story: 'Bird in nest at sunset - WEST' },
  '生': { parts: ['生'], story: 'A plant sprouting from earth - LIFE/BIRTH' },
  
  // N4 common additions
  '強': { parts: ['弓', '虫'], story: 'A BOW (弓) and INSECT (虫) - STRONG (like a bug with armor)' },
  '教': { parts: ['孝', '攵'], story: 'Filial piety (孝) with a striking hand (攵) - to TEACH' },
  '新': { parts: ['立', '木', '斤'], story: 'Standing (立) tree (木) being cut with axe (斤) - NEW (fresh cut)' },
  '親': { parts: ['立', '木', '見'], story: 'Standing (立) at a tree (木) watching (見) - PARENT (watching over)' },
  '開': { parts: ['門', '开'], story: 'A GATE (門) being pushed - to OPEN' },
  '買': { parts: ['罒', '貝'], story: 'A net (罒) and SHELL/money (貝) - to BUY' },
  '売': { parts: ['士', '儿'], story: 'A scholar (士) with legs - to SELL' },
  '歩': { parts: ['止', '少'], story: 'STOP (止) a LITTLE (少) at each step - to WALK' },
  '思': { parts: ['田', '心'], story: 'A FIELD (田) in the HEART (心) - to THINK' },
  '持': { parts: ['扌', '寺'], story: 'HAND (扌) at a TEMPLE (寺) - to HOLD/HAVE' },
  '待': { parts: ['彳', '寺'], story: 'WALKING (彳) to a TEMPLE (寺) - to WAIT' },
  '近': { parts: ['斤', '⻌'], story: 'An AXE (斤) on the ROAD (⻌) - NEAR' },
  '送': { parts: ['关', '⻌'], story: 'Going (⻌) with (关) someone - to SEND/ESCORT' },
  '通': { parts: ['甬', '⻌'], story: 'A path (甬) for MOVEMENT (⻌) - to PASS THROUGH' },
  '運': { parts: ['軍', '⻌'], story: 'An ARMY (軍) on the MOVE (⻌) - to CARRY/LUCK' },
  '道': { parts: ['首', '⻌'], story: 'A HEAD (首) on a PATH (⻌) - the WAY/ROAD' },
  '起': { parts: ['走', '己'], story: 'To RUN (走) from ONESELF (己) - to GET UP/ARISE' },
  '花': { parts: ['艹', '化'], story: 'GRASS (艹) that CHANGES (化) - FLOWER' },
  '茶': { parts: ['艹', '人', '木'], story: 'A PLANT (艹) with a PERSON (人) and TREE (木) - TEA' },
  '悪': { parts: ['亜', '心'], story: 'Asia (亜) in the HEART (心) - BAD (cultural bias in old times)' },
  '意': { parts: ['音', '心'], story: 'SOUND (音) in the HEART (心) - MEANING/IDEA' },
  '愛': { parts: ['爫', '冖', '心', '夂'], story: 'A hand (爫) covering (冖) the HEART (心) walking slowly (夂) - LOVE' },
  
  // N3 additions  
  '決': { parts: ['氵', '夬'], story: 'WATER (氵) bursting through (夬) - to DECIDE' },
  '消': { parts: ['氵', '肖'], story: 'WATER (氵) making small (肖) - to EXTINGUISH/DISAPPEAR' },
  '深': { parts: ['氵', '木', '儿'], story: 'WATER (氵) with a TREE (木) and LEGS - DEEP' },
  '海': { parts: ['氵', '毎'], story: 'WATER (氵) EVERY (毎) day - the SEA' },
  '港': { parts: ['氵', '巷'], story: 'WATER (氵) in a lane (巷) - HARBOR' },
  '洗': { parts: ['氵', '先'], story: 'WATER (氵) FIRST (先) - to WASH' },
  '活': { parts: ['氵', '舌'], story: 'WATER (氵) and TONGUE (舌) - LIVELY (living things need water)' },
  '流': { parts: ['氵', '㐬'], story: 'WATER (氵) flowing - CURRENT/FLOW' },
  '注': { parts: ['氵', '主'], story: 'WATER (氵) being the MASTER (主) - to POUR' },
  '泳': { parts: ['氵', '永'], story: 'WATER (氵) for ETERNITY (永) - to SWIM' },
}

// Reading associations
const readingAssociations = {
  'カ': 'CAR', 'キ': 'KEY', 'ク': 'COOL', 'ケ': 'CARE', 'コ': 'COAT',
  'サ': 'SAW', 'シ': 'SHE', 'ス': 'SUE', 'セ': 'SAY', 'ソ': 'SO',
  'タ': 'TAR', 'チ': 'CHI', 'ツ': 'TSU', 'テ': 'TEN', 'ト': 'TOE',
  'ナ': 'NAH', 'ニ': 'KNEE', 'ヌ': 'NEW', 'ネ': 'NET', 'ノ': 'NO',
  'ハ': 'HA!', 'ヒ': 'HE', 'フ': 'WHO', 'ヘ': 'HEY', 'ホ': 'HOME',
  'マ': 'MA', 'ミ': 'ME', 'ム': 'MOO', 'メ': 'MAY', 'モ': 'MORE',
  'ヤ': 'YA!', 'ユ': 'YOU', 'ヨ': 'YO!',
  'ラ': 'RAH', 'リ': 'RE', 'ル': 'RULE', 'レ': 'RAY', 'ロ': 'ROW',
  'ワ': 'WA!', 'ガ': 'GAH', 'ギ': 'GEEK', 'グ': 'GOO', 'ゲ': 'GAY', 'ゴ': 'GO',
  'ザ': 'ZAH', 'ジ': 'GEE', 'ズ': 'ZOO', 'ゼ': 'ZEN', 'ゾ': 'ZONE',
  'ダ': 'DAH', 'デ': 'DAY', 'ド': 'DOOR',
  'バ': 'BAH', 'ビ': 'BEE', 'ブ': 'BOO', 'ベ': 'BAY', 'ボ': 'BOAT',
  'パ': 'PAH', 'ピ': 'PEE', 'プ': 'POO', 'ペ': 'PAY', 'ポ': 'PO',
}

function generateReadingMnemonic(kunyomi, onyomi, meaning) {
  let parts = []
  
  if (kunyomi && kunyomi.length > 0) {
    const kun = kunyomi[0].replace(/\./g, '').replace(/-/g, '')
    parts.push(`Kun: ${kunyomi[0]} - Japanese reading for "${meaning}"`)
  }
  
  if (onyomi && onyomi.length > 0) {
    const on = onyomi[0]
    const assoc = readingAssociations[on] || readingAssociations[on?.charAt(0)] || on
    parts.push(`On: ${onyomi[0]} - Think "${assoc}" in compounds`)
  }
  
  return parts.length > 0 ? parts.join(' | ') : `Learn through vocabulary words.`
}

async function updateMnemonicsWithRadicals() {
  console.log('🔧 Updating mnemonics with radical-based stories...\n')
  
  const characters = Object.keys(kanjiDecomposition)
  console.log(`Found ${characters.length} kanji with decomposition data\n`)
  
  let updated = 0
  let skipped = 0
  
  for (const char of characters) {
    // Get kanji ID
    const { data: kanji } = await supabase
      .from('kanji')
      .select('id, meanings, onyomi, kunyomi')
      .eq('character', char)
      .single()
    
    if (!kanji) {
      console.log(`   ⏭️ ${char}: Not found in database`)
      skipped++
      continue
    }
    
    const decomp = kanjiDecomposition[char]
    const mainMeaning = kanji.meanings?.[0] || 'unknown'
    
    // Build radicals array
    const radicals = decomp.parts.map(p => ({
      char: p,
      name: componentMeanings[p] || p,
      meaning: componentMeanings[p] || 'component'
    }))
    
    // Build components string
    const components = decomp.parts.map(p => `${p} (${componentMeanings[p] || 'component'})`).join(' + ')
    
    // Generate reading mnemonic
    const readingMnemonic = generateReadingMnemonic(kanji.kunyomi, kanji.onyomi, mainMeaning)
    
    // Update in database
    const { error } = await supabase
      .from('mnemonics')
      .update({
        radicals,
        components,
        story: decomp.story,
        reading_mnemonic: readingMnemonic,
        hint: `${decomp.parts.join(' + ')} = ${mainMeaning}`
      })
      .eq('kanji_id', kanji.id)
    
    if (error) {
      console.log(`   ❌ ${char}: ${error.message}`)
    } else {
      console.log(`   ✅ ${char} (${mainMeaning}): ${decomp.parts.join(' + ')}`)
      updated++
    }
  }
  
  console.log(`\n${'='.repeat(50)}`)
  console.log(`✨ Done! Updated ${updated} mnemonics with radical stories`)
  console.log(`   Skipped: ${skipped}`)
}

updateMnemonicsWithRadicals()
