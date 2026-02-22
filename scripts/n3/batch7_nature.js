/**
 * N3 BATCH 7: Time & Nature (30 kanji)
 * 末束杯果格構様権横機欠次欲歯歳残段殺民求決治法泳洗活流
 * 
 * Run: node scripts/n3/batch7_nature.js
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
    character: '末',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '一', name: 'one', meaning: 'one' }],
    components: '木 (tree) + 一 (one) at top long',
    story: 'A TREE (木) with full branches at the END - END! Fully grown. Full tree = END!',
    hint: 'Full tree = end',
    reading_mnemonic: 'まつ/すえ (matsu/sue) - "MATS at the END!" SUE = end! SHUUMATSU = weekend!'
  },
  {
    character: '束',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '口', name: 'mouth', meaning: 'tie' }],
    components: '木 (tree) + tied',
    story: 'A TREE (木) branches tied together - BUNDLE! Tied up. Tied tree = BUNDLE!',
    hint: 'Tied tree = bundle',
    reading_mnemonic: 'そく/たば (soku/taba) - "SOCK in a BUNDLE!" TABA = bundle! SOKUBAKU = restraint!'
  },
  {
    character: '杯',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '不', name: 'not', meaning: 'not' }],
    components: '木 (tree) + 不 (not)',
    story: 'WOODEN (木) container NOT (不) empty - CUP! Drinking vessel. Wood cup = CUP!',
    hint: 'Wooden vessel = cup',
    reading_mnemonic: 'はい (hai) - "HAI! A CUP!" IPPAI = one cup/full! SAKAZUKI = sake cup!'
  },
  {
    character: '果',
    radicals: [{ char: '田', name: 'field', meaning: 'fruit' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '田 (fruit) + 木 (tree)',
    story: 'FRUIT (田) on a TREE (木) - FRUIT/RESULT! Outcome. Tree fruit = RESULT!',
    hint: 'Tree fruit = result',
    reading_mnemonic: 'か/は (ka/ha) - "KAH! The RESULT!" KEKKA = result! KUDAMONO = fruit!'
  },
  {
    character: '格',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '各', name: 'each', meaning: 'each' }],
    components: '木 (tree) + 各 (each)',
    story: 'EACH (各) TREE (木) has its rank - STATUS/STANDARD! Classification. Each standard = STATUS!',
    hint: 'Each tree = status',
    reading_mnemonic: 'かく/こう (kaku/kou) - "KAKU STATUS!" KAKAKU = price! SEIKAKU = personality!'
  },
  {
    character: '構',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '冓', name: 'put together', meaning: 'construct' }],
    components: '木 (tree) + 冓 (construct)',
    story: 'WOOD (木) CONSTRUCTED (冓) together - CONSTRUCT/STRUCTURE! Building. Wood built = CONSTRUCT!',
    hint: 'Wood built = construct',
    reading_mnemonic: 'こう/かま (kou/kama) - "CON-struct it!" KAMAU = mind/care! KOUZOU = structure!'
  },
  {
    character: '様',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '羊', name: 'sheep', meaning: 'sheep' }, { char: '水', name: 'water', meaning: 'water' }],
    components: '木 (tree) + 羊 (sheep) + 水 (water)',
    story: 'A TREE (木) with SHEEP (羊) and WATER (水) - MANNER/MR/MS! Style. Various elements = MANNER!',
    hint: 'Style = manner',
    reading_mnemonic: 'よう/さま (you/sama) - "YO SAMA!" -SAMA = Mr/Ms! YOUSU = situation!'
  },
  {
    character: '権',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '隹', name: 'bird', meaning: 'bird' }],
    components: '木 (tree) + bird elements',
    story: 'A TREE (木) where birds perch by right - RIGHTS/AUTHORITY! Power. Tree authority = RIGHTS!',
    hint: 'Tree authority = rights',
    reading_mnemonic: 'けん/ごん (ken/gon) - "KEN has RIGHTS!" KENRI = rights! KENRYOKU = power!'
  },
  {
    character: '横',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '黄', name: 'yellow', meaning: 'yellow' }],
    components: '木 (tree) + 黄 (yellow)',
    story: 'A TREE (木) fallen YELLOW (黄) - SIDEWAYS! Horizontal. Fallen tree = SIDEWAYS!',
    hint: 'Fallen tree = sideways',
    reading_mnemonic: 'おう/よこ (ou/yoko) - "OH! SIDEWAYS!" YOKO = side/horizontal!'
  },
  {
    character: '機',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '幾', name: 'how many', meaning: 'mechanism' }],
    components: '木 (tree) + 幾 (mechanism)',
    story: 'WOODEN (木) MECHANISM (幾) - MACHINE/OPPORTUNITY! Device. Wood machine = MACHINE!',
    hint: 'Wood mechanism = machine',
    reading_mnemonic: 'き (ki) - "KEY MACHINE!" KIKAI = machine! KIKAI = opportunity!'
  },
  {
    character: '欠',
    radicals: [{ char: '欠', name: 'yawn', meaning: 'lack' }],
    components: 'Person yawning',
    story: 'A person YAWNING - LACK/ABSENCE! Missing something. Yawning = LACK!',
    hint: 'Yawning = lack',
    reading_mnemonic: 'けつ/か (ketsu/ka) - "KET the LACK!" KESSEKI = absence! KAKERU = lack!'
  },
  {
    character: '次',
    radicals: [{ char: '冫', name: 'ice', meaning: 'ice' }, { char: '欠', name: 'yawn', meaning: 'lack' }],
    components: '冫 (ice) + 欠 (yawn)',
    story: 'After the cold (冫) yawn (欠) comes - NEXT! Following. After lack = NEXT!',
    hint: 'After lack = next',
    reading_mnemonic: 'じ/つぎ (ji/tsugi) - "TSUG NEXT!" TSUGI = next! JIKAI = next time!'
  },
  {
    character: '欲',
    radicals: [{ char: '谷', name: 'valley', meaning: 'valley' }, { char: '欠', name: 'yawn', meaning: 'want' }],
    components: '谷 (valley) + 欠 (want)',
    story: 'A VALLEY (谷) of wanting (欠) - DESIRE! Craving. Valley of want = DESIRE!',
    hint: 'Valley of want = desire',
    reading_mnemonic: 'よく/ほ (yoku/ho) - "YOKU DESIRE!" HOSHII = want! YOKUBOU = desire!'
  },
  {
    character: '歯',
    radicals: [{ char: '止', name: 'stop', meaning: 'stop' }, { char: '米', name: 'rice', meaning: 'rice' }],
    components: '止 (stop) + 米 (rice) in mouth',
    story: 'What STOPS (止) RICE (米) - TEETH! Chewing. Stop food = TEETH!',
    hint: 'Stop food = teeth',
    reading_mnemonic: 'し/は (shi/ha) - "SHE has TEETH!" HA = tooth! HAISHA = dentist!'
  },
  {
    character: '歳',
    radicals: [{ char: '止', name: 'stop', meaning: 'stop' }, { char: '戈', name: 'halberd', meaning: 'weapon' }],
    components: '止 (stop) + 戈 (weapon)',
    story: 'Years STOPPED (止) by time\'s weapon - AGE/YEAR! Years passing. Time stops = AGE!',
    hint: 'Time stops = age',
    reading_mnemonic: 'さい/せい/とし (sai/sei/toshi) - "SIGH at my AGE!" TOSHI = age! SANSAI = 3 years old!'
  },
  {
    character: '残',
    radicals: [{ char: '歹', name: 'death', meaning: 'bone' }, { char: '戔', name: 'small', meaning: 'little' }],
    components: '歹 (bone) + small parts',
    story: 'BONES (歹) that are left behind - REMAIN! What\'s left. Bones left = REMAIN!',
    hint: 'Bones left = remain',
    reading_mnemonic: 'ざん/のこ (zan/noko) - "ZAN REMAINS!" NOKORU = remain! ZANNEN = regrettable!'
  },
  {
    character: '段',
    radicals: [{ char: '殳', name: 'weapon', meaning: 'weapon' }],
    components: 'Steps + 殳 (weapon)',
    story: 'Climbing STEPS like a weapon (殳) - STEP/GRADE! Level. Steps = STEP!',
    hint: 'Steps = step/grade',
    reading_mnemonic: 'だん (dan) - "DAN-level STEP!" KAIDAN = stairs! DANKAI = stage!'
  },
  {
    character: '殺',
    radicals: [{ char: '殳', name: 'weapon', meaning: 'weapon' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '殳 (weapon) + elements',
    story: 'A WEAPON (殳) striking - KILL! Death. Weapon strikes = KILL!',
    hint: 'Weapon strikes = kill',
    reading_mnemonic: 'さつ/ころ (satsu/koro) - "SATS you! KILL!" KOROSU = kill! SATSUJIN = murder!'
  },
  {
    character: '民',
    radicals: [{ char: '民', name: 'people', meaning: 'people' }],
    components: 'Eye pierced (old slaves)',
    story: 'The common PEOPLE - PEOPLE! Citizens. Common folk = PEOPLE!',
    hint: 'Common folk = people',
    reading_mnemonic: 'みん/たみ (min/tami) - "MIN PEOPLE!" TAMI = people! KOKUMIN = citizens!'
  },
  {
    character: '求',
    radicals: [{ char: '水', name: 'water', meaning: 'water' }, { char: '丶', name: 'dot', meaning: 'dot' }],
    components: '水 (water) + reaching',
    story: 'Reaching for WATER (水) - SEEK/REQUEST! Wanting. Reaching = SEEK!',
    hint: 'Reaching for water = seek',
    reading_mnemonic: 'きゅう/もと (kyuu/moto) - "QUE? I SEEK it!" MOTOMERU = seek! YOUKYUU = demand!'
  },
  {
    character: '決',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '夬', name: 'decide', meaning: 'decide' }],
    components: '氵 (water) + 夬 (decide)',
    story: 'WATER (氵) breaking through to DECIDE (夬) - DECIDE! Determination. Water decides = DECIDE!',
    hint: 'Water decides = decide',
    reading_mnemonic: 'けつ/き (ketsu/ki) - "KET DECIDE!" KIMERU = decide! KETTEI = decision!'
  },
  {
    character: '治',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '台', name: 'platform', meaning: 'platform' }],
    components: '氵 (water) + 台 (platform)',
    story: 'WATER (氵) controlled on a platform (台) - GOVERN/CURE! Control. Controlled water = GOVERN!',
    hint: 'Controlled water = govern',
    reading_mnemonic: 'ち/じ/なお/おさ (chi/ji/nao/osa) - "CHI! GOVERN!" NAOSU = cure! SEIJI = politics!'
  },
  {
    character: '法',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '去', name: 'go away', meaning: 'go' }],
    components: '氵 (water) + 去 (go)',
    story: 'WATER (氵) that must GO (去) a certain way - LAW! Rules. Water flow rules = LAW!',
    hint: 'Water rules = law',
    reading_mnemonic: 'ほう/はっ (hou/ha) - "HO! The LAW!" HOURITSU = law! HOUHOU = method!'
  },
  {
    character: '泳',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '永', name: 'eternal', meaning: 'eternal' }],
    components: '氵 (water) + 永 (eternal)',
    story: 'WATER (氵) eternally (永) moving through - SWIM! Swimming. Water motion = SWIM!',
    hint: 'Water eternal = swim',
    reading_mnemonic: 'えい/およ (ei/oyo) - "A swimming SWIM!" OYOGU = swim! SUIEI = swimming!'
  },
  {
    character: '洗',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '先', name: 'before', meaning: 'ahead' }],
    components: '氵 (water) + 先 (ahead)',
    story: 'WATER (氵) AHEAD (先) - WASH! Cleaning. Water first = WASH!',
    hint: 'Water ahead = wash',
    reading_mnemonic: 'せん/あら (sen/ara) - "SEN WASH!" ARAU = wash! SENTAKU = laundry!'
  },
  {
    character: '活',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '舌', name: 'tongue', meaning: 'tongue' }],
    components: '氵 (water) + 舌 (tongue)',
    story: 'WATER (氵) and TONGUE (舌) - LIFE/ACTIVITY! Living. Water of life = LIFE!',
    hint: 'Water life = life',
    reading_mnemonic: 'かつ/い (katsu/i) - "KATS LIFE!" IKIRU = live! SEIKATSU = life!'
  },
  {
    character: '流',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '㐬', name: 'flow', meaning: 'flow' }],
    components: '氵 (water) + flow elements',
    story: 'WATER (氵) FLOWING - FLOW/CURRENT! Stream. Water flows = FLOW!',
    hint: 'Water moves = flow',
    reading_mnemonic: 'りゅう/なが (ryuu/naga) - "RYUU FLOWS!" NAGARERU = flow! RYUUKOU = trend!'
  },
  {
    character: '浮',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '孚', name: 'hatch', meaning: 'float' }],
    components: '氵 (water) + 孚 (float)',
    story: 'On WATER (氵) floating - FLOAT! Buoyancy. On water = FLOAT!',
    hint: 'On water = float',
    reading_mnemonic: 'ふ/う (fu/u) - "FU FLOATS!" UKU = float! UKIWA = life preserver!'
  },
  {
    character: '消',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '肖', name: 'resemble', meaning: 'diminish' }],
    components: '氵 (water) + 肖 (diminish)',
    story: 'WATER (氵) that DIMINISHES (肖) - EXTINGUISH/ERASE! Disappearing. Water erases = ERASE!',
    hint: 'Water erases = erase',
    reading_mnemonic: 'しょう/き/け (shou/ki/ke) - "SHOW erased! EXTINGUISH!" KESHIGOMU = eraser! KIERU = disappear!'
  },
  {
    character: '深',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '穴', name: 'hole', meaning: 'hole' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '氵 (water) + 穴 (hole) + 木 (tree)',
    story: 'WATER (氵) in a deep HOLE (穴) - DEEP! Depth. Water hole = DEEP!',
    hint: 'Water hole = deep',
    reading_mnemonic: 'しん/ふか (shin/fuka) - "SHIN DEEP!" FUKAI = deep! SHINKAI = deep sea!'
  }
]

async function insertBatch() {
  console.log('🌿 N3 BATCH 7: Time & Nature (30 kanji)')
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
  console.log(`✨ Batch 7 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
