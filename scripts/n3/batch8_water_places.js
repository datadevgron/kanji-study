/**
 * N3 BATCH 8: Water & Places (30 kanji)
 * 済渡港満演点然煙熱犯状猫王現球産由申留番疑疲痛登皆盗直相
 * 
 * Run: node scripts/n3/batch8_water_places.js
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
    character: '済',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '斉', name: 'equal', meaning: 'equal' }],
    components: '氵 (water) + 斉 (equal)',
    story: 'WATER (氵) made EQUAL (斉) - SETTLE/FINISH! Completed. Water balanced = SETTLE!',
    hint: 'Water balanced = settle',
    reading_mnemonic: 'さい/す (sai/su) - "SIGH! FINISHED!" SUMU = finish! KEIZAI = economy!'
  },
  {
    character: '渡',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '度', name: 'degree', meaning: 'degree' }],
    components: '氵 (water) + 度 (degree)',
    story: 'WATER (氵) crossing by DEGREES (度) - CROSS/FERRY! Crossing over. Water cross = CROSS!',
    hint: 'Water cross = cross',
    reading_mnemonic: 'と/わた (to/wata) - "TOO! CROSS it!" WATARU = cross! TOKO = passage!'
  },
  {
    character: '港',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '巷', name: 'alley', meaning: 'passage' }],
    components: '氵 (water) + 共 (together)',
    story: 'WATER (氵) where ships gather TOGETHER - HARBOR! Port. Water gathering = HARBOR!',
    hint: 'Water gathering = harbor',
    reading_mnemonic: 'こう/みなと (kou/minato) - "KOU HARBOR!" MINATO = harbor! KUUKOU = airport!'
  },
  {
    character: '満',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '両', name: 'both', meaning: 'both' }, { char: '艹', name: 'grass', meaning: 'grass' }],
    components: '氵 (water) + full elements',
    story: 'WATER (氵) at maximum level - FULL! Filled. Water topped = FULL!',
    hint: 'Water topped = full',
    reading_mnemonic: 'まん/み (man/mi) - "MAN is FULL!" MITSURU = fill! MANZOKU = satisfaction!'
  },
  {
    character: '演',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '寅', name: 'tiger', meaning: 'perform' }],
    components: '氵 (water) + 寅 (perform)',
    story: 'WATER (氵) flowing like a performance - PERFORM! Acting. Flowing act = PERFORM!',
    hint: 'Flowing act = perform',
    reading_mnemonic: 'えん (en) - "EN PERFORM!" ENGEKI = drama! KOUEN = lecture!'
  },
  {
    character: '点',
    radicals: [{ char: '占', name: 'fortune', meaning: 'divine' }, { char: '灬', name: 'fire dots', meaning: 'fire' }],
    components: '占 (divine) + 灬 (fire)',
    story: 'DIVINE (占) FIRE (灬) dots - POINT/DOT! Spot. Fire spot = POINT!',
    hint: 'Fire spot = point',
    reading_mnemonic: 'てん (ten) - "TEN POINTS!" TEN = point! TENSUU = score!'
  },
  {
    character: '然',
    radicals: [{ char: '月', name: 'moon', meaning: 'flesh' }, { char: '犬', name: 'dog', meaning: 'dog' }, { char: '灬', name: 'fire dots', meaning: 'fire' }],
    components: '月 (meat) + 犬 (dog) + 灬 (fire)',
    story: 'Dog (犬) meat (月) over FIRE (灬) naturally - NATURAL/SO! Naturally so. Nature = SO!',
    hint: 'Naturally so = so',
    reading_mnemonic: 'ぜん/ねん (zen/nen) - "ZEN is NATURAL!" SHIZEN = nature! TOTSUZEN = suddenly!'
  },
  {
    character: '煙',
    radicals: [{ char: '火', name: 'fire', meaning: 'fire' }, { char: '垔', name: 'cover', meaning: 'cover' }],
    components: '火 (fire) + cover elements',
    story: 'FIRE (火) covered rises as - SMOKE! Burning. Fire rises = SMOKE!',
    hint: 'Fire rises = smoke',
    reading_mnemonic: 'えん/けむ (en/kemu) - "EN SMOKE!" KEMURI = smoke! KINEN = no smoking!'
  },
  {
    character: '熱',
    radicals: [{ char: '埶', name: 'art', meaning: 'craft' }, { char: '灬', name: 'fire dots', meaning: 'fire' }],
    components: 'Craft + 灬 (fire)',
    story: 'FIRE (灬) burning intensely - HEAT/FEVER! Hot. Fire burns = HEAT!',
    hint: 'Fire burns = heat',
    reading_mnemonic: 'ねつ/あつ (netsu/atsu) - "NET is HOT!" ATSUI = hot! NETSU = fever!'
  },
  {
    character: '犯',
    radicals: [{ char: '犭', name: 'dog', meaning: 'dog' }, { char: '卩', name: 'seal', meaning: 'seal' }],
    components: '犭 (dog) + 卩 (seal)',
    story: 'A wild DOG (犭) breaking the SEAL (卩) - CRIME! Offense. Wild dog = CRIME!',
    hint: 'Wild dog = crime',
    reading_mnemonic: 'はん/おか (han/oka) - "HAN commits CRIME!" HANZAI = crime! OKASU = commit!'
  },
  {
    character: '状',
    radicals: [{ char: '丬', name: 'split wood', meaning: 'half' }, { char: '犬', name: 'dog', meaning: 'dog' }],
    components: '丬 (half) + 犬 (dog)',
    story: 'A DOG (犬) in various conditions - CONDITION/LETTER! State. Dog state = CONDITION!',
    hint: 'State = condition',
    reading_mnemonic: 'じょう (jou) - "JOE\'s CONDITION!" JOUTAI = condition! JOUKYOU = situation!'
  },
  {
    character: '猫',
    radicals: [{ char: '犭', name: 'dog', meaning: 'beast' }, { char: '苗', name: 'seedling', meaning: 'seedling' }],
    components: '犭 (beast) + 苗 (seedling)',
    story: 'A small BEAST (犭) like a SEEDLING (苗) - CAT! Feline. Small beast = CAT!',
    hint: 'Small beast = cat',
    reading_mnemonic: 'びょう/ねこ (byou/neko) - "MEOW! CAT!" NEKO = cat!'
  },
  {
    character: '王',
    radicals: [{ char: '王', name: 'king', meaning: 'king' }],
    components: 'Three horizontal lines with vertical',
    story: 'Heaven, earth, and man connected by ONE - KING! Ruler. Connector = KING!',
    hint: 'Connector = king',
    reading_mnemonic: 'おう (ou) - "OH! The KING!" OU = king! JOOU = queen!'
  },
  {
    character: '現',
    radicals: [{ char: '王', name: 'king', meaning: 'jewel' }, { char: '見', name: 'see', meaning: 'see' }],
    components: '王 (jewel) + 見 (see)',
    story: 'A JEWEL (王) that you SEE (見) - PRESENT/APPEAR! Currently visible. Seen jewel = PRESENT!',
    hint: 'Seen jewel = present',
    reading_mnemonic: 'げん/あらわ (gen/arawa) - "GEN APPEARS!" GENZAI = present! ARAWARERU = appear!'
  },
  {
    character: '球',
    radicals: [{ char: '王', name: 'king', meaning: 'jewel' }, { char: '求', name: 'seek', meaning: 'seek' }],
    components: '王 (jewel) + 求 (seek)',
    story: 'A JEWEL (王) you SEEK (求) - BALL/SPHERE! Round. Sought jewel = BALL!',
    hint: 'Sought jewel = ball',
    reading_mnemonic: 'きゅう/たま (kyuu/tama) - "QUE BALL!" TAMA = ball! CHIKYUU = Earth!'
  },
  {
    character: '産',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }, { char: '生', name: 'life', meaning: 'life' }],
    components: '立 (stand) + 生 (life)',
    story: 'STANDING (立) and giving LIFE (生) - PRODUCE/BIRTH! Creation. Life stands = PRODUCE!',
    hint: 'Life stands = produce',
    reading_mnemonic: 'さん/う (san/u) - "SAN PRODUCES!" UMU = give birth! SEISAN = production!'
  },
  {
    character: '由',
    radicals: [{ char: '由', name: 'reason', meaning: 'reason' }],
    components: 'Oil flowing from container',
    story: 'Something flowing from its source - REASON/CAUSE! Origin. Source = REASON!',
    hint: 'Source = reason',
    reading_mnemonic: 'ゆ/ゆう/よし (yu/yuu/yoshi) - "YOU have a REASON!" RIYUU = reason! JIYUU = freedom!'
  },
  {
    character: '申',
    radicals: [{ char: '申', name: 'say', meaning: 'say' }],
    components: 'Lightning bolt through fields',
    story: 'Lightning speaking from heaven - SAY/REPORT! Humble speech. Lightning speaks = SAY!',
    hint: 'Lightning speaks = say',
    reading_mnemonic: 'しん/もう (shin/mou) - "SHIN SAYS!" MOUSU = say (humble)! SHINSEI = application!'
  },
  {
    character: '留',
    radicals: [{ char: '田', name: 'field', meaning: 'field' }, { char: '刀', name: 'sword', meaning: 'sword' }],
    components: '田 (field) + 刀 (sword)',
    story: 'A SWORD (刀) stuck in a FIELD (田) - STAY/KEEP! Remaining. Stuck = STAY!',
    hint: 'Stuck = stay',
    reading_mnemonic: 'りゅう/る/と (ryuu/ru/to) - "RYUU STAYS!" TOMERU = stop! RYUUGAKU = study abroad!'
  },
  {
    character: '番',
    radicals: [{ char: '釆', name: 'separate', meaning: 'sort' }, { char: '田', name: 'field', meaning: 'field' }],
    components: '釆 (sort) + 田 (field)',
    story: 'SORTING (釆) FIELDS (田) in order - NUMBER/TURN! Order. Sorted = NUMBER!',
    hint: 'Sorted = number',
    reading_mnemonic: 'ばん (ban) - "BAN NUMBER!" BANGOU = number! BANME = turn!'
  },
  {
    character: '疑',
    radicals: [{ char: '矛', name: 'spear', meaning: 'spear' }, { char: '匕', name: 'spoon', meaning: 'change' }, { char: '矢', name: 'arrow', meaning: 'arrow' }],
    components: 'Complex elements of uncertainty',
    story: 'Multiple confusing elements - DOUBT! Uncertain. Confusion = DOUBT!',
    hint: 'Confusion = doubt',
    reading_mnemonic: 'ぎ/うたが (gi/utaga) - "GEE! I DOUBT it!" UTAGAU = doubt! GIMON = question!'
  },
  {
    character: '疲',
    radicals: [{ char: '疒', name: 'sickness', meaning: 'illness' }, { char: '皮', name: 'skin', meaning: 'skin' }],
    components: '疒 (illness) + 皮 (skin)',
    story: 'ILLNESS (疒) reaching the SKIN (皮) - TIRED! Exhausted. Sick skin = TIRED!',
    hint: 'Sick skin = tired',
    reading_mnemonic: 'ひ/つか (hi/tsuka) - "HE is TIRED!" TSUKARERU = get tired! HIRŌ = fatigue!'
  },
  {
    character: '痛',
    radicals: [{ char: '疒', name: 'sickness', meaning: 'illness' }, { char: '甬', name: 'pass through', meaning: 'through' }],
    components: '疒 (illness) + 甬 (through)',
    story: 'ILLNESS (疒) passing THROUGH (甬) - PAIN! Hurting. Illness through = PAIN!',
    hint: 'Illness through = pain',
    reading_mnemonic: 'つう/いた (tsuu/ita) - "TSU! PAIN!" ITAI = painful! ZUTSUU = headache!'
  },
  {
    character: '登',
    radicals: [{ char: '癶', name: 'footsteps', meaning: 'footsteps' }, { char: '豆', name: 'bean', meaning: 'bean' }],
    components: '癶 (footsteps) + 豆 (bean)',
    story: 'FOOTSTEPS (癶) climbing like stacking BEANS (豆) - CLIMB! Ascending. Steps up = CLIMB!',
    hint: 'Steps up = climb',
    reading_mnemonic: 'と/とう/のぼ (to/tou/nobo) - "TOE CLIMBS!" NOBORU = climb! TOZAN = mountain climbing!'
  },
  {
    character: '皆',
    radicals: [{ char: '比', name: 'compare', meaning: 'compare' }, { char: '白', name: 'white', meaning: 'white' }],
    components: '比 (compare) + 白 (white)',
    story: 'All COMPARED (比) equal like WHITE (白) - EVERYONE! All. All same = EVERYONE!',
    hint: 'All same = everyone',
    reading_mnemonic: 'かい/みな (kai/mina) - "KAI means EVERYONE!" MINNA = everyone!'
  },
  {
    character: '盗',
    radicals: [{ char: '次', name: 'next', meaning: 'greed' }, { char: '皿', name: 'dish', meaning: 'dish' }],
    components: '次 (greed) + 皿 (dish)',
    story: 'Greed (次) over DISHES (皿) - STEAL! Theft. Greedy = STEAL!',
    hint: 'Greedy dish = steal',
    reading_mnemonic: 'とう/ぬす (tou/nusu) - "TOW! STEAL it!" NUSUMU = steal! GOUTOU = robber!'
  },
  {
    character: '直',
    radicals: [{ char: '十', name: 'ten', meaning: 'ten' }, { char: '目', name: 'eye', meaning: 'eye' }, { char: '𠃊', name: 'corner', meaning: 'corner' }],
    components: '十 (ten) + 目 (eye)',
    story: 'An EYE (目) looking STRAIGHT ahead - STRAIGHT/DIRECT! Direct. Straight eye = DIRECT!',
    hint: 'Straight eye = direct',
    reading_mnemonic: 'ちょく/じき/なお/ただ (choku/jiki/nao/tada) - "CHALK STRAIGHT line!" NAOSU = fix! CHOKUSETSU = directly!'
  },
  {
    character: '相',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '目', name: 'eye', meaning: 'eye' }],
    components: '木 (tree) + 目 (eye)',
    story: 'An EYE (目) looking at a TREE (木) - MUTUAL/EACH OTHER! Observation. Eye to tree = MUTUAL!',
    hint: 'Eye to tree = mutual',
    reading_mnemonic: 'そう/しょう/あい (sou/shou/ai) - "SO! MUTUAL!" AITE = partner! SOUDAN = consultation!'
  },
  {
    character: '眠',
    radicals: [{ char: '目', name: 'eye', meaning: 'eye' }, { char: '民', name: 'people', meaning: 'people' }],
    components: '目 (eye) + 民 (people)',
    story: 'EYES (目) of the PEOPLE (民) closed - SLEEP! Resting. Eyes closed = SLEEP!',
    hint: 'Eyes closed = sleep',
    reading_mnemonic: 'みん/ねむ (min/nemu) - "MIN SLEEPS!" NEMURU = sleep! SUIMIN = sleep!'
  },
  {
    character: '石',
    radicals: [{ char: '石', name: 'stone', meaning: 'stone' }],
    components: 'Cliff with stone',
    story: 'A rock fallen from a cliff - STONE! Rock. Cliff rock = STONE!',
    hint: 'Cliff rock = stone',
    reading_mnemonic: 'せき/しゃく/いし (seki/shaku/ishi) - "SAKE! STONE!" ISHI = stone! SEKIYU = petroleum!'
  }
]

async function insertBatch() {
  console.log('💧 N3 BATCH 8: Water & Places (30 kanji)')
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
  console.log(`✨ Batch 8 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
