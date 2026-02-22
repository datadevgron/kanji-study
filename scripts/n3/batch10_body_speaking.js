/**
 * N3 BATCH 10: Body & Speaking (30 kanji)
 * 耳職育背能腹舞船良若苦草落葉薬術表要規覚観解記訪許認誤説
 * 
 * Run: node scripts/n3/batch10_body_speaking.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(char) {
  const { data } = await supabase.from('kanji').select('id').eq('character', char).single()
  return data?.id
}

const BATCH = [
  {
    character: '耳',
    radicals: [{ char: '耳', name: 'ear', meaning: 'ear' }],
    components: 'Ear shape',
    story: 'The shape of an EAR - EAR! Hearing. Ear shape = EAR!',
    hint: 'Ear shape = ear',
    reading_mnemonic: 'じ/みみ (ji/mimi) - "GEE! EAR!" MIMI = ear!'
  },
  {
    character: '職',
    radicals: [{ char: '耳', name: 'ear', meaning: 'ear' }, { char: '音', name: 'sound', meaning: 'sound' }, { char: '戈', name: 'weapon', meaning: 'weapon' }],
    components: '耳 (ear) + 音 (sound) + 戈 (weapon)',
    story: 'EAR (耳) hearing work commands - JOB/OCCUPATION! Employment. Ear at work = JOB!',
    hint: 'Ear at work = job',
    reading_mnemonic: 'しょく (shoku) - "SHOKU JOB!" SHOKUGYOU = occupation! SHOKUBA = workplace!'
  },
  {
    character: '育',
    radicals: [{ char: '云', name: 'cloud', meaning: 'flesh' }, { char: '月', name: 'moon', meaning: 'moon' }],
    components: 'Child + 月 (flesh)',
    story: 'A child\'s FLESH (月) growing - RAISE/NURTURE! Growth. Growing flesh = RAISE!',
    hint: 'Growing flesh = raise',
    reading_mnemonic: 'いく/そだ (iku/soda) - "IKU RAISE!" SODATERU = raise! KYOUIKU = education!'
  },
  {
    character: '背',
    radicals: [{ char: '北', name: 'north', meaning: 'north' }, { char: '月', name: 'moon', meaning: 'flesh' }],
    components: '北 (north) + 月 (flesh)',
    story: 'The FLESH (月) facing NORTH (北) - BACK! Behind. Flesh behind = BACK!',
    hint: 'Flesh behind = back',
    reading_mnemonic: 'はい/せ/そむ (hai/se/somu) - "HIGH BACK!" SE = back/height! HAIGO = behind!'
  },
  {
    character: '能',
    radicals: [{ char: '厶', name: 'private', meaning: 'private' }, { char: '月', name: 'moon', meaning: 'flesh' }],
    components: 'Bear (熊) elements + 月 (flesh)',
    story: 'A bear\'s strength and FLESH (月) - ABILITY! Skill. Bear strength = ABILITY!',
    hint: 'Bear strength = ability',
    reading_mnemonic: 'のう (nou) - "KNOW ABILITY!" NOURYOKU = ability! KANOU = possible!'
  },
  {
    character: '腹',
    radicals: [{ char: '月', name: 'moon', meaning: 'flesh' }, { char: '复', name: 'return', meaning: 'repeat' }],
    components: '月 (flesh) + 复 (repeat)',
    story: 'FLESH (月) that repeats (复) digestion - BELLY/STOMACH! Abdomen. Flesh stomach = BELLY!',
    hint: 'Flesh stomach = belly',
    reading_mnemonic: 'ふく/はら (fuku/hara) - "FUKU BELLY!" HARA = stomach! KUUFUKU = hunger!'
  },
  {
    character: '舞',
    radicals: [{ char: '舛', name: 'oppose', meaning: 'opposite' }, { char: '無', name: 'nothing', meaning: 'nothing' }],
    components: 'Dance movements',
    story: 'Feet moving in opposite directions - DANCE! Performance. Moving feet = DANCE!',
    hint: 'Moving feet = dance',
    reading_mnemonic: 'ぶ/ま (bu/ma) - "BOO! DANCE!" MAU = dance! BUYOU = dancing!'
  },
  {
    character: '船',
    radicals: [{ char: '舟', name: 'boat', meaning: 'boat' }, { char: '㕣', name: 'divide', meaning: 'divide' }],
    components: '舟 (boat) + 㕣 (divide)',
    story: 'A BOAT (舟) that divides water - SHIP! Vessel. Boat divides = SHIP!',
    hint: 'Boat divides = ship',
    reading_mnemonic: 'せん/ふね (sen/fune) - "SEN SHIP!" FUNE = ship! FŪNĒ = ferry!'
  },
  {
    character: '良',
    radicals: [{ char: '良', name: 'good', meaning: 'good' }],
    components: 'Grain being cleaned',
    story: 'Grain cleaned and purified - GOOD! Quality. Clean grain = GOOD!',
    hint: 'Clean grain = good',
    reading_mnemonic: 'りょう/よ (ryou/yo) - "RYOU GOOD!" YOI = good! RYOUSHIN = conscience!'
  },
  {
    character: '若',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '右', name: 'right', meaning: 'hand' }],
    components: '艹 (grass) + 右 (right hand)',
    story: 'Fresh GRASS (艹) picked by hand - YOUNG! New. Fresh grass = YOUNG!',
    hint: 'Fresh grass = young',
    reading_mnemonic: 'じゃく/わか/も (jaku/waka/mo) - "JACK is YOUNG!" WAKAI = young! WAKAMONO = young person!'
  },
  {
    character: '苦',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '古', name: 'old', meaning: 'old' }],
    components: '艹 (grass) + 古 (old)',
    story: 'OLD (古) GRASS (艹) that\'s bitter - SUFFERING/BITTER! Pain. Old grass = BITTER!',
    hint: 'Old grass = bitter',
    reading_mnemonic: 'く/くる/にが (ku/kuru/niga) - "KU is BITTER!" KURUSHII = painful! NIGAI = bitter!'
  },
  {
    character: '草',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '早', name: 'early', meaning: 'early' }],
    components: '艹 (grass) + 早 (early)',
    story: 'GRASS (艹) that grows EARLY (早) - GRASS! Plants. Early grass = GRASS!',
    hint: 'Early grass = grass',
    reading_mnemonic: 'そう/くさ (sou/kusa) - "SO! GRASS!" KUSA = grass!'
  },
  {
    character: '落',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '氵', name: 'water', meaning: 'water' }, { char: '各', name: 'each', meaning: 'each' }],
    components: '艹 (grass) + 氵 (water) + 各 (each)',
    story: 'GRASS (艹) with water droplets falling - FALL/DROP! Dropping. Grass falls = FALL!',
    hint: 'Grass falls = fall',
    reading_mnemonic: 'らく/お (raku/o) - "RACK FALLS!" OCHIRU = fall! RAKKA = fall (n)!'
  },
  {
    character: '葉',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '世', name: 'world', meaning: 'world' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '艹 (grass) + 世 (world) + 木 (tree)',
    story: 'GRASS (艹) on a TREE (木) - LEAF! Foliage. Tree grass = LEAF!',
    hint: 'Tree grass = leaf',
    reading_mnemonic: 'よう/は (you/ha) - "YO! A LEAF!" HA = leaf! KOUYOU = autumn leaves!'
  },
  {
    character: '薬',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '楽', name: 'enjoy', meaning: 'comfort' }],
    components: '艹 (grass) + 楽 (comfort)',
    story: 'GRASS (艹) that brings COMFORT (楽) - MEDICINE! Drug. Comfort grass = MEDICINE!',
    hint: 'Comfort grass = medicine',
    reading_mnemonic: 'やく/くすり (yaku/kusuri) - "YACK! MEDICINE!" KUSURI = medicine! YAKKYOKU = pharmacy!'
  },
  {
    character: '術',
    radicals: [{ char: '行', name: 'go', meaning: 'road' }, { char: '朮', name: 'millet', meaning: 'skill' }],
    components: '行 (road) + 朮 (skill)',
    story: 'Skills (朮) on the road (行) of learning - ART/TECHNIQUE! Method. Road skill = TECHNIQUE!',
    hint: 'Road skill = technique',
    reading_mnemonic: 'じゅつ (jutsu) - "JUTSU TECHNIQUE!" GIJUTSU = technology! BIJUTSU = art!'
  },
  {
    character: '表',
    radicals: [{ char: '衣', name: 'clothes', meaning: 'clothes' }, { char: '毛', name: 'fur', meaning: 'fur' }],
    components: '衣 (clothes) outer + elements',
    story: 'The outer CLOTHES (衣) layer - SURFACE/EXPRESS! Outside. Outer layer = SURFACE!',
    hint: 'Outer layer = surface',
    reading_mnemonic: 'ひょう/おもて/あらわ (hyou/omote/arawa) - "HYO SURFACE!" OMOTE = surface! HYOUGEN = expression!'
  },
  {
    character: '要',
    radicals: [{ char: '西', name: 'west', meaning: 'cover' }, { char: '女', name: 'woman', meaning: 'woman' }],
    components: '西 (cover) + 女 (woman)',
    story: 'A WOMAN (女) who is needed - NEED/IMPORTANT! Necessary. Woman needed = NEED!',
    hint: 'Woman needed = need',
    reading_mnemonic: 'よう/い/かなめ (you/i/kaname) - "YOU NEED it!" IRU = need! HITSUYOU = necessary!'
  },
  {
    character: '規',
    radicals: [{ char: '夫', name: 'husband', meaning: 'man' }, { char: '見', name: 'see', meaning: 'see' }],
    components: '夫 (man) + 見 (see)',
    story: 'A MAN (夫) SEEING (見) standards - RULE/STANDARD! Regulation. Man sees = RULE!',
    hint: 'Man sees = rule',
    reading_mnemonic: 'き (ki) - "KEY RULE!" KISOKU = rule! KIKAKU = standard!'
  },
  {
    character: '覚',
    radicals: [{ char: '学', name: 'learn', meaning: 'learn' }, { char: '見', name: 'see', meaning: 'see' }],
    components: '学 (learn) + 見 (see)',
    story: 'LEARNING (学) to SEE (見) - REMEMBER/AWAKE! Memorize. Learn see = REMEMBER!',
    hint: 'Learn see = remember',
    reading_mnemonic: 'かく/おぼ/さ (kaku/obo/sa) - "KAKU REMEMBERS!" OBOERU = remember! KANKAKU = sense!'
  },
  {
    character: '観',
    radicals: [{ char: '隹', name: 'bird', meaning: 'bird' }, { char: '見', name: 'see', meaning: 'see' }],
    components: '隹 (bird) + 見 (see)',
    story: 'SEEING (見) like a BIRD (隹) watches - VIEW/OBSERVE! Perspective. Bird sees = VIEW!',
    hint: 'Bird sees = view',
    reading_mnemonic: 'かん (kan) - "CON-template VIEW!" KANKOUKYAKU = tourist! KANNEN = idea!'
  },
  {
    character: '解',
    radicals: [{ char: '角', name: 'horn', meaning: 'horn' }, { char: '刀', name: 'sword', meaning: 'sword' }, { char: '牛', name: 'cow', meaning: 'cow' }],
    components: '角 (horn) + 刀 (sword) + 牛 (cow)',
    story: 'Using a SWORD (刀) to remove COW (牛) HORNS (角) - SOLVE/UNDERSTAND! Untangle. Sword untangles = SOLVE!',
    hint: 'Sword untangles = solve',
    reading_mnemonic: 'かい/げ/と/わか (kai/ge/to/waka) - "KAI SOLVES!" WAKARU = understand! KAIKETSU = solution!'
  },
  {
    character: '記',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '己', name: 'self', meaning: 'self' }],
    components: '言 (say) + 己 (self)',
    story: 'WORDS (言) about SELF (己) - RECORD! Write. Self words = RECORD!',
    hint: 'Self words = record',
    reading_mnemonic: 'き (ki) - "KEY RECORD!" KIROKU = record! NIKKI = diary!'
  },
  {
    character: '訪',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '方', name: 'direction', meaning: 'direction' }],
    components: '言 (say) + 方 (direction)',
    story: 'WORDS (言) in a DIRECTION (方) - VISIT! Call on. Words toward = VISIT!',
    hint: 'Words toward = visit',
    reading_mnemonic: 'ほう/たず/おとず (hou/tazu/otoz) - "HO! VISIT!" TAZUNERU = visit! HOUMON = visit!'
  },
  {
    character: '許',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '午', name: 'noon', meaning: 'noon' }],
    components: '言 (say) + 午 (noon)',
    story: 'WORDS (言) at NOON (午) - PERMIT! Allow. Noon words = PERMIT!',
    hint: 'Noon words = permit',
    reading_mnemonic: 'きょ/ゆる (kyo/yuru) - "KEY-O PERMIT!" YURUSU = permit! KYOKA = permission!'
  },
  {
    character: '認',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '忍', name: 'endure', meaning: 'endure' }],
    components: '言 (say) + 忍 (endure)',
    story: 'WORDS (言) that ENDURE (忍) scrutiny - RECOGNIZE! Acknowledge. Enduring words = RECOGNIZE!',
    hint: 'Enduring words = recognize',
    reading_mnemonic: 'にん/みと (nin/mito) - "NIN RECOGNIZES!" MITOMERU = recognize! KAKUNIN = confirmation!'
  },
  {
    character: '誤',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '呉', name: 'give', meaning: 'Wu' }],
    components: '言 (say) + 呉 (wrong)',
    story: 'WORDS (言) that are WRONG (呉) - MISTAKE! Error. Wrong words = MISTAKE!',
    hint: 'Wrong words = mistake',
    reading_mnemonic: 'ご/あやま (go/ayama) - "GO! MISTAKE!" AYAMARU = err! GŌKAI = misunderstanding!'
  },
  {
    character: '説',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '兌', name: 'exchange', meaning: 'exchange' }],
    components: '言 (say) + 兌 (exchange)',
    story: 'WORDS (言) EXCHANGED (兌) - EXPLAIN/THEORY! Explanation. Exchange words = EXPLAIN!',
    hint: 'Exchange words = explain',
    reading_mnemonic: 'せつ/と (setsu/to) - "SET EXPLAIN!" SETSUMEI = explanation! TOKU = preach!'
  },
  {
    character: '調',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '周', name: 'circumference', meaning: 'around' }],
    components: '言 (say) + 周 (around)',
    story: 'WORDS (言) going AROUND (周) - INVESTIGATE/TUNE! Check. Words around = INVESTIGATE!',
    hint: 'Words around = investigate',
    reading_mnemonic: 'ちょう/しら/ととの (chou/shira/totono) - "CHOW INVESTIGATES!" SHIRABERU = investigate! CHOUSEI = adjustment!'
  },
  {
    character: '談',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '炎', name: 'flame', meaning: 'flame' }],
    components: '言 (say) + 炎 (flame)',
    story: 'WORDS (言) like FLAMES (炎) - TALK/DISCUSS! Chat. Flaming words = TALK!',
    hint: 'Flaming words = talk',
    reading_mnemonic: 'だん (dan) - "DAN TALKS!" SOUDAN = consultation! KAIWA = conversation!'
  }
]

async function insertBatch() {
  console.log('🗣️ N3 BATCH 10: Body & Speaking (30 kanji)')
  console.log('='.repeat(50) + '\n')
  
  let success = 0, failed = 0
  
  for (const m of BATCH) {
    const kanji_id = await getKanjiId(m.character)
    if (!kanji_id) { console.log(`❌ ${m.character} - Not found`); failed++; continue }
    
    const { data: existing } = await supabase.from('mnemonics').select('id').eq('kanji_id', kanji_id).single()
    
    const data = {
      kanji_id,
      radicals: m.radicals,
      components: m.components,
      story: m.story,
      reading_mnemonic: m.reading_mnemonic,
      hint: m.hint
    }
    
    const { error } = existing 
      ? await supabase.from('mnemonics').update(data).eq('kanji_id', kanji_id)
      : await supabase.from('mnemonics').insert(data)
    
    if (error) { console.log(`❌ ${m.character} - ${error.message}`); failed++ }
    else { console.log(`✅ ${m.character}`); success++ }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log(`✨ Batch 10 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
