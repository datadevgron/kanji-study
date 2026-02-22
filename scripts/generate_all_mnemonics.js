/**
 * GENERATE MNEMONICS FOR ALL KANJI
 * 
 * This script generates mnemonics for all kanji that don't have them yet.
 * Uses structured patterns based on kanji components and meanings.
 * 
 * Run with: node scripts/generate_all_mnemonics.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

// Common radical meanings for building stories
const radicalMeanings = {
  '人': 'person', '亻': 'person', '日': 'sun/day', '月': 'moon/month', '木': 'tree/wood',
  '水': 'water', '氵': 'water', '火': 'fire', '灬': 'fire', '土': 'earth/soil',
  '金': 'metal/gold', '山': 'mountain', '川': 'river', '口': 'mouth', '目': 'eye',
  '耳': 'ear', '手': 'hand', '扌': 'hand', '足': 'foot', '心': 'heart',
  '忄': 'heart', '言': 'speech', '訁': 'speech', '糸': 'thread', '門': 'gate',
  '雨': 'rain', '田': 'rice field', '石': 'stone', '竹': 'bamboo', '女': 'woman',
  '子': 'child', '力': 'power', '刀': 'sword', '⺅': 'person', '宀': 'roof',
  '广': 'building', '辶': 'movement', '⻌': 'movement', '艹': 'grass/plant',
  '⺾': 'grass', '⺍': 'grass', '⺿': 'grass', '⻏': 'city', '⻖': 'hill',
  '食': 'food/eat', '飠': 'food', '⻟': 'food', '車': 'vehicle', '馬': 'horse',
  '魚': 'fish', '鳥': 'bird', '貝': 'shell/money', '見': 'see', '立': 'stand',
  '走': 'run', '行': 'go', '大': 'big', '小': 'small', '中': 'middle',
  '上': 'above', '下': 'below', '一': 'one', '二': 'two', '三': 'three',
  '十': 'ten', '百': 'hundred', '千': 'thousand', '万': 'ten thousand'
}

// Reading mnemonics - English word associations for common readings
const readingAssociations = {
  // Common on'yomi
  'カ': 'CAR', 'キ': 'KEY', 'ク': 'COOL', 'ケ': 'CARE', 'コ': 'COAT',
  'サ': 'SAW', 'シ': 'SHE', 'ス': 'SUE', 'セ': 'SAY', 'ソ': 'SO',
  'タ': 'TAR', 'チ': 'CHI/TEA', 'ツ': 'TSU/TWO', 'テ': 'TEN', 'ト': 'TOE',
  'ナ': 'NAH', 'ニ': 'KNEE', 'ヌ': 'NEW', 'ネ': 'NET', 'ノ': 'NO',
  'ハ': 'HA!', 'ヒ': 'HE', 'フ': 'WHO', 'ヘ': 'HEY', 'ホ': 'HOME',
  'マ': 'MA', 'ミ': 'ME', 'ム': 'MOO', 'メ': 'MAY', 'モ': 'MORE',
  'ヤ': 'YA!', 'ユ': 'YOU', 'ヨ': 'YO!',
  'ラ': 'RAH', 'リ': 'RE', 'ル': 'RULE', 'レ': 'RAY', 'ロ': 'ROW',
  'ワ': 'WA!', 'ン': 'N',
  'ガ': 'GAH', 'ギ': 'GEEK', 'グ': 'GOO', 'ゲ': 'GAY', 'ゴ': 'GO',
  'ザ': 'ZAH', 'ジ': 'GEE', 'ズ': 'ZOO', 'ゼ': 'ZEN', 'ゾ': 'ZONE',
  'ダ': 'DAH', 'ヂ': 'GEE', 'ヅ': 'ZOO', 'デ': 'DAY', 'ド': 'DOOR',
  'バ': 'BAH', 'ビ': 'BEE', 'ブ': 'BOO', 'ベ': 'BAY', 'ボ': 'BOAT',
  'パ': 'PAH', 'ピ': 'PEE', 'プ': 'POO', 'ペ': 'PAY', 'ポ': 'PO',
  'キョ': 'KYO', 'シャ': 'SHA', 'シュ': 'SHOE', 'ショ': 'SHOW',
  'チャ': 'CHA', 'チュ': 'CHEW', 'チョ': 'CHO',
  'ニャ': 'NYA', 'ニュ': 'NEW', 'ニョ': 'NYO',
  'ヒャ': 'HYA', 'ヒュ': 'HUE', 'ヒョ': 'HYO',
  'ミャ': 'MYA', 'ミュ': 'MEW', 'ミョ': 'MYO',
  'リャ': 'RYA', 'リュ': 'RYU', 'リョ': 'RYO',
  'ギャ': 'GYA', 'ギュ': 'GYU', 'ギョ': 'GYO',
  'ジャ': 'JA', 'ジュ': 'JU', 'ジョ': 'JO',
  'ビャ': 'BYA', 'ビュ': 'BYU', 'ビョ': 'BYO',
  'ピャ': 'PYA', 'ピュ': 'PYU', 'ピョ': 'PYO',
  // Common kun'yomi
  'あ': 'AH', 'い': 'EE', 'う': 'OO', 'え': 'EH', 'お': 'OH',
  'か': 'CAR', 'き': 'KEY', 'く': 'COO', 'け': 'KAY', 'こ': 'KOH',
  'さ': 'SAH', 'し': 'SHE', 'す': 'SUE', 'せ': 'SAY', 'そ': 'SO',
  'た': 'TAH', 'ち': 'CHEE', 'つ': 'TSU', 'て': 'TAY', 'と': 'TOH',
  'な': 'NAH', 'に': 'NEE', 'ぬ': 'NOO', 'ね': 'NAY', 'の': 'NO',
  'は': 'HAH', 'ひ': 'HE', 'ふ': 'FOO', 'へ': 'HEY', 'ほ': 'HO',
  'ま': 'MAH', 'み': 'ME', 'む': 'MOO', 'め': 'MAY', 'も': 'MO',
  'や': 'YAH', 'ゆ': 'YOU', 'よ': 'YO',
  'ら': 'RAH', 'り': 'REE', 'る': 'ROO', 'れ': 'RAY', 'ろ': 'RO',
  'わ': 'WAH', 'を': 'WO', 'ん': 'N'
}

// Generate a mnemonic for a kanji
function generateMnemonic(kanji, meanings, onyomi, kunyomi) {
  const mainMeaning = meanings[0] || 'unknown'
  const allMeanings = meanings.slice(0, 3).join(', ')
  
  // Build components description
  let components = `Kanji for "${mainMeaning}"`
  let radicals = []
  
  // Check if kanji itself is a common radical
  if (radicalMeanings[kanji]) {
    radicals.push({ char: kanji, name: radicalMeanings[kanji], meaning: radicalMeanings[kanji] })
  }
  
  // Generate story based on meaning
  let story = generateStory(kanji, mainMeaning, allMeanings)
  
  // Generate reading mnemonic
  let readingMnemonic = generateReadingMnemonic(kunyomi, onyomi, mainMeaning)
  
  // Generate hint
  let hint = `Think: ${mainMeaning}`
  
  return {
    radicals,
    components,
    story,
    reading_mnemonic: readingMnemonic,
    hint
  }
}

// Generate a memorable story for the kanji
function generateStory(kanji, mainMeaning, allMeanings) {
  const templates = [
    `This kanji means "${allMeanings}". Picture ${mainMeaning} in your mind - the shape of this character ${kanji} represents that concept visually.`,
    `${kanji} represents "${allMeanings}". Imagine the strokes forming a picture of ${mainMeaning}.`,
    `When you see ${kanji}, think of "${mainMeaning}". The character's shape hints at its meaning: ${allMeanings}.`,
    `This is the kanji for "${mainMeaning}" (${allMeanings}). Visualize the concept as you trace the strokes.`
  ]
  
  return templates[Math.floor(Math.random() * templates.length)]
}

// Generate a reading mnemonic
function generateReadingMnemonic(kunyomi, onyomi, meaning) {
  let parts = []
  
  // Kun'yomi
  if (kunyomi && kunyomi.length > 0) {
    const kun = kunyomi[0].replace(/\./g, '').replace(/-/g, '')
    const firstChar = kun.charAt(0)
    const assoc = readingAssociations[firstChar] || firstChar.toUpperCase()
    parts.push(`Kun: ${kunyomi[0]} - Think "${assoc}" when reading as Japanese word for ${meaning}`)
  }
  
  // On'yomi
  if (onyomi && onyomi.length > 0) {
    const on = onyomi[0]
    const assoc = readingAssociations[on] || readingAssociations[on.charAt(0)] || on
    parts.push(`On: ${onyomi[0]} - "${assoc}" sound in compounds`)
  }
  
  if (parts.length === 0) {
    return `Learn the reading through vocabulary words containing this kanji.`
  }
  
  return parts.join(' | ')
}

// Main function
async function generateAllMnemonics() {
  console.log('🧠 Generating mnemonics for all kanji...\n')
  
  // Get existing mnemonic kanji_ids
  const { data: existing } = await supabase
    .from('mnemonics')
    .select('kanji_id')
    .not('kanji_id', 'is', null)
  
  const existingIds = new Set(existing.map(m => m.kanji_id))
  console.log(`Found ${existingIds.size} existing mnemonics\n`)
  
  // Get all kanji by level
  const levels = ['N5', 'N4', 'N3']
  
  for (const level of levels) {
    const { data: kanjiList } = await supabase
      .from('kanji')
      .select('id, character, meanings, onyomi, kunyomi')
      .eq('jlpt', level)
      .order('id')
    
    const needMnemonics = kanjiList.filter(k => !existingIds.has(k.id))
    
    console.log(`\n📚 ${level}: ${needMnemonics.length} kanji need mnemonics`)
    console.log('-'.repeat(40))
    
    if (needMnemonics.length === 0) {
      console.log('   All done!')
      continue
    }
    
    let created = 0
    let failed = 0
    
    for (const k of needMnemonics) {
      const mnemonic = generateMnemonic(k.character, k.meanings || [], k.onyomi || [], k.kunyomi || [])
      
      const { error } = await supabase
        .from('mnemonics')
        .insert({
          kanji_id: k.id,
          ...mnemonic
        })
      
      if (error) {
        console.log(`   ❌ ${k.character}: ${error.message}`)
        failed++
      } else {
        console.log(`   ✅ ${k.character}: ${k.meanings?.[0] || 'unknown'}`)
        created++
      }
    }
    
    console.log(`\n   ${level} complete: ✅ ${created} created | ❌ ${failed} failed`)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ Done generating mnemonics!')
}

generateAllMnemonics()
