/**
 * N3 BATCH 4: Buildings & Places (30 kanji)
 * 完官定実客害容宿寄富寒寝察対局居差市師席常平幸幾座庭式
 * 
 * Run: node scripts/n3/batch4_buildings.js
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
    character: '完',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '元', name: 'origin', meaning: 'origin' }],
    components: '宀 (roof) + 元 (origin)',
    story: 'Everything under the ROOF (宀) back to ORIGIN (元) - COMPLETE! Finished and whole. Roof + origin = COMPLETE!',
    hint: 'Roof + origin = complete',
    reading_mnemonic: 'かん (kan) - "CAN be COMPLETE!" KANZEN = perfect! KANSEI = completion!'
  },
  {
    character: '官',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '官', name: 'government', meaning: 'pipes' }],
    components: '宀 (roof) + 官 (pipes/administration)',
    story: 'Under the ROOF (宀) of government - GOVERNMENT OFFICIAL! Public servant. Roof of state = OFFICIAL!',
    hint: 'Government roof = official',
    reading_mnemonic: 'かん (kan) - "CAN be an OFFICIAL!" KANRI = government! KEIKAN = police officer!'
  },
  {
    character: '定',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '正', name: 'correct', meaning: 'correct' }],
    components: '宀 (roof) + 正 (correct)',
    story: 'CORRECT (正) under a ROOF (宀) - DECIDE/FIX! Settled and determined. Roof + correct = DECIDE!',
    hint: 'Correct under roof = decide',
    reading_mnemonic: 'てい/じょう/さだ (tei/jou/sada) - "TAY DECIDES!" KETTEI = decision! SADAMERU = determine!'
  },
  {
    character: '実',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '貫', name: 'pierce', meaning: 'substance' }],
    components: '宀 (roof) + 貫 (substance)',
    story: 'Real SUBSTANCE under a ROOF (宀) - REALITY/FRUIT! Tangible results. Real substance = REALITY!',
    hint: 'Substance under roof = reality',
    reading_mnemonic: 'じつ/み/みの (jitsu/mi/mino) - "GIST of REALITY!" JISSAI = actual! MI = fruit! MINORU = bear fruit!'
  },
  {
    character: '客',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '各', name: 'each', meaning: 'each' }],
    components: '宀 (roof) + 各 (each)',
    story: 'EACH (各) person under your ROOF (宀) - GUEST! Visitors to your home. Each under roof = GUEST!',
    hint: 'Each under roof = guest',
    reading_mnemonic: 'きゃく/かく (kyaku/kaku) - "KEY-ACK! A GUEST!" OKYAKUSAN = customer! KANKOUKYAKU = tourist!'
  },
  {
    character: '害',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '丰', name: 'abundant', meaning: 'mouth' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '宀 (roof) + 丰 (abundance) + 口 (mouth)',
    story: 'Too much under the ROOF (宀) causing problems - HARM! Damage from excess. Excess = HARM!',
    hint: 'Excess under roof = harm',
    reading_mnemonic: 'がい (gai) - "GAI-ning HARM!" HIGAI = damage! GAITOU = harmful!'
  },
  {
    character: '容',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '谷', name: 'valley', meaning: 'valley' }],
    components: '宀 (roof) + 谷 (valley)',
    story: 'A VALLEY (谷) under a ROOF (宀) - CONTAIN/APPEARANCE! Space to contain. Valley space = CONTAIN!',
    hint: 'Valley under roof = contain',
    reading_mnemonic: 'よう (you) - "YO! What\'s the CONTENT?" NAIYOU = contents! YOUSHI = appearance!'
  },
  {
    character: '宿',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '百', name: 'hundred', meaning: 'hundred' }, { char: '人', name: 'person', meaning: 'person' }],
    components: '宀 (roof) + 百 (hundred) + 人 (person)',
    story: 'A hundred PEOPLE (人) under one ROOF (宀) - INN/LODGE! Place to stay. Many under roof = INN!',
    hint: 'Many under roof = inn',
    reading_mnemonic: 'しゅく/やど (shuku/yado) - "SHOOK at the INN!" SHUKUDAI = homework! YADO = inn!'
  },
  {
    character: '寄',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '奇', name: 'strange', meaning: 'strange' }],
    components: '宀 (roof) + 奇 (strange)',
    story: 'STRANGE (奇) things coming under the ROOF (宀) - APPROACH/DONATE! Things gathering. Strange gather = APPROACH!',
    hint: 'Strange gather = approach',
    reading_mnemonic: 'き/よ (ki/yo) - "KEY! APPROACH!" YORU = approach! KIFU = donation!'
  },
  {
    character: '富',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '畐', name: 'full', meaning: 'abundance' }],
    components: '宀 (roof) + 畐 (abundance)',
    story: 'ABUNDANCE (畐) under your ROOF (宀) - WEALTH! Riches at home. Abundance = WEALTH!',
    hint: 'Abundance under roof = wealth',
    reading_mnemonic: 'ふう/ふ/とみ/と (fuu/fu/tomi/to) - "FOO! Such WEALTH!" TOMI = wealth! YUTAKA = abundant!'
  },
  {
    character: '寒',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '井', name: 'well', meaning: 'well' }, { char: '八', name: 'eight', meaning: 'ice' }],
    components: '宀 (roof) + 井 (well) + ice',
    story: 'Ice forming under the ROOF (宀) by the WELL (井) - COLD! Winter cold. Ice inside = COLD!',
    hint: 'Ice under roof = cold',
    reading_mnemonic: 'かん/さむ (kan/samu) - "CAN\'t stand the COLD!" SAMUI = cold! KANKI = cold air!'
  },
  {
    character: '寝',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '爿', name: 'bed', meaning: 'bed' }, { char: '彐', name: 'hand', meaning: 'hand' }],
    components: '宀 (roof) + bed + hand',
    story: 'Lying in BED under a ROOF (宀) - SLEEP! Resting at home. Bed under roof = SLEEP!',
    hint: 'Bed under roof = sleep',
    reading_mnemonic: 'しん/ね (shin/ne) - "SHIN down to SLEEP!" NERU = sleep! SHINSHITSU = bedroom!'
  },
  {
    character: '察',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '祭', name: 'festival', meaning: 'ritual' }],
    components: '宀 (roof) + 祭 (ritual)',
    story: 'A RITUAL (祭) of observation under the ROOF (宀) - INSPECT! Looking closely. Ritual look = INSPECT!',
    hint: 'Ritual observation = inspect',
    reading_mnemonic: 'さつ (satsu) - "SAT-down to INSPECT!" KEISATSU = police! KANSATSU = observation!'
  },
  {
    character: '対',
    radicals: [{ char: '文', name: 'writing', meaning: 'pattern' }, { char: '寸', name: 'inch', meaning: 'measure' }],
    components: '文 (pattern) + 寸 (measure)',
    story: 'Measuring (寸) a PATTERN (文) for comparison - VERSUS/PAIR! Facing each other. Measured pattern = VERSUS!',
    hint: 'Measured pattern = versus',
    reading_mnemonic: 'たい/つい (tai/tsui) - "TIE! VERSUS!" TAISHOU = contrast! HANTAI = opposite!'
  },
  {
    character: '局',
    radicals: [{ char: '尸', name: 'corpse', meaning: 'body' }, { char: '句', name: 'phrase', meaning: 'bent' }],
    components: '尸 (body) + 句 (bent)',
    story: 'A body (尸) bent over at a desk - BUREAU/OFFICE! An official station. Bent at work = BUREAU!',
    hint: 'Bent at work = bureau',
    reading_mnemonic: 'きょく (kyoku) - "KEY-OKU at the BUREAU!" YUUBINKYOKU = post office! TEREBI KYOKU = TV station!'
  },
  {
    character: '居',
    radicals: [{ char: '尸', name: 'corpse', meaning: 'body' }, { char: '古', name: 'old', meaning: 'old' }],
    components: '尸 (body) + 古 (old)',
    story: 'A body (尸) staying in the OLD (古) place - RESIDE! Living somewhere. Body stays = RESIDE!',
    hint: 'Body stays old place = reside',
    reading_mnemonic: 'きょ/い (kyo/i) - "KEY-O! I RESIDE here!" IRU = be/exist! KYOJUU = residence!'
  },
  {
    character: '差',
    radicals: [{ char: '羊', name: 'sheep', meaning: 'sheep' }, { char: '工', name: 'craft', meaning: 'work' }],
    components: '羊 (sheep) + 工 (work)',
    story: 'Different SHEEP (羊) doing different WORK (工) - DIFFERENCE! Varying results. Different work = DIFFERENCE!',
    hint: 'Different work = difference',
    reading_mnemonic: 'さ/さ (sa/sa) - "SAH! What\'s the DIFFERENCE?" SA = difference! SASU = point!'
  },
  {
    character: '市',
    radicals: [{ char: '亠', name: 'lid', meaning: 'roof' }, { char: '巾', name: 'cloth', meaning: 'cloth' }],
    components: '亠 (roof) + 巾 (cloth)',
    story: 'CLOTH (巾) sold under a ROOF (亠) - CITY/MARKET! Urban commerce. Cloth under roof = CITY!',
    hint: 'Cloth under roof = city',
    reading_mnemonic: 'し/いち (shi/ichi) - "SHE goes to the CITY!" TOSHI = city! ICHIBA = market!'
  },
  {
    character: '師',
    radicals: [{ char: '𠂤', name: 'mound', meaning: 'hill' }, { char: '巾', name: 'cloth', meaning: 'banner' }],
    components: 'Mound + 巾 (banner)',
    story: 'A BANNER (巾) on a MOUND leading troops - MASTER/TEACHER! One who leads. Banner leader = MASTER!',
    hint: 'Banner leader = master',
    reading_mnemonic: 'し (shi) - "SHE\'s a TEACHER!" KYOUSHI = teacher! ISHI = doctor!'
  },
  {
    character: '席',
    radicals: [{ char: '广', name: 'building', meaning: 'shelter' }, { char: '巾', name: 'cloth', meaning: 'cloth' }, { char: '廿', name: 'twenty', meaning: 'mat' }],
    components: '广 (shelter) + 巾 (cloth) + mat',
    story: 'A CLOTH (巾) mat in a SHELTER (广) - SEAT! A place to sit. Cloth in shelter = SEAT!',
    hint: 'Cloth in shelter = seat',
    reading_mnemonic: 'せき (seki) - "SEKI your SEAT!" ZASEKI = seat! SHUSSEKI = attendance!'
  },
  {
    character: '常',
    radicals: [{ char: '⺌', name: 'little', meaning: 'top' }, { char: '冖', name: 'cover', meaning: 'cover' }, { char: '巾', name: 'cloth', meaning: 'cloth' }],
    components: 'Top + cover + 巾 (cloth)',
    story: 'A covered CLOTH (巾) always present - USUAL/ALWAYS! Constant presence. Always there = USUAL!',
    hint: 'Always present = usual',
    reading_mnemonic: 'じょう/つね (jou/tsune) - "JOE is ALWAYS there!" FUTSUU = normal! TSUNENI = always!'
  },
  {
    character: '平',
    radicals: [{ char: '干', name: 'dry', meaning: 'shield' }, { char: '八', name: 'eight', meaning: 'divide' }],
    components: 'Shield + divide',
    story: 'A shield laid FLAT and divided - FLAT/PEACE! Level and peaceful. Flat shield = PEACE!',
    hint: 'Flat shield = peace',
    reading_mnemonic: 'へい/びょう/たい/ひら (hei/byou/tai/hira) - "HAY is FLAT!" HEIWA = peace! HIRATAI = flat!'
  },
  {
    character: '幸',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '¥', name: 'money', meaning: 'value' }],
    components: 'Earth + value',
    story: 'Finding VALUE in the EARTH - HAPPINESS! Good fortune found. Value found = HAPPINESS!',
    hint: 'Value found = happiness',
    reading_mnemonic: 'こう/さいわ/しあわ (kou/saiwa/shiawa) - "CO-me! HAPPINESS!" KOUFUKU = happiness! SHIAWASE = happy!'
  },
  {
    character: '幾',
    radicals: [{ char: '幺', name: 'thread', meaning: 'thread' }, { char: '戈', name: 'weapon', meaning: 'weapon' }, { char: '人', name: 'person', meaning: 'person' }],
    components: 'Threads + weapon + person',
    story: 'THREADS (幺) counting with a weapon (戈) - HOW MANY? Counting things. Counting = HOW MANY!',
    hint: 'Counting threads = how many',
    reading_mnemonic: 'き/いく (ki/iku) - "KEY! HOW MANY?" IKUTSU = how many? KIKA = geometry!'
  },
  {
    character: '座',
    radicals: [{ char: '广', name: 'building', meaning: 'shelter' }, { char: '坐', name: 'sit', meaning: 'sit' }],
    components: '广 (shelter) + 坐 (sit)',
    story: 'SITTING (坐) in a SHELTER (广) - SIT/SEAT! A place to sit. Shelter sit = SEAT!',
    hint: 'Sitting in shelter = seat',
    reading_mnemonic: 'ざ/すわ (za/suwa) - "ZAH! Take a SEAT!" SUWARU = sit! ZASEKI = seat!'
  },
  {
    character: '庭',
    radicals: [{ char: '广', name: 'building', meaning: 'shelter' }, { char: '廷', name: 'court', meaning: 'court' }],
    components: '广 (shelter) + 廷 (court)',
    story: 'A COURT (廷) beside a SHELTER (广) - GARDEN! Outdoor space. Court + shelter = GARDEN!',
    hint: 'Court by shelter = garden',
    reading_mnemonic: 'てい/にわ (tei/niwa) - "TAY\'s GARDEN!" NIWA = garden! KATEI = home!'
  },
  {
    character: '式',
    radicals: [{ char: '弋', name: 'stake', meaning: 'stake' }, { char: '工', name: 'craft', meaning: 'work' }],
    components: '弋 (stake) + 工 (work)',
    story: 'WORK (工) done in a formal way with stakes (弋) - CEREMONY/STYLE! Formal procedure. Formal work = CEREMONY!',
    hint: 'Formal work = ceremony',
    reading_mnemonic: 'しき (shiki) - "SHEE-KEY CEREMONY!" KEKKONSHIKI = wedding! HOUSHIKI = method!'
  },
  {
    character: '引',
    radicals: [{ char: '弓', name: 'bow', meaning: 'bow' }, { char: '丨', name: 'line', meaning: 'string' }],
    components: '弓 (bow) + 丨 (string)',
    story: 'PULLING a bow (弓) STRING (丨) - PULL! Drawing back. Bow string = PULL!',
    hint: 'Bow string = pull',
    reading_mnemonic: 'いん/ひ (in/hi) - "IN-ward PULL!" HIKU = pull! HIKIDASHI = drawer!'
  },
  {
    character: '当',
    radicals: [{ char: '⺌', name: 'little', meaning: 'light' }, { char: '彐', name: 'hand', meaning: 'hand' }],
    components: 'Light + hand',
    story: 'A HAND hitting the right spot - HIT/APPROPRIATE! On target. Hand hits = HIT!',
    hint: 'Hand hits = appropriate',
    reading_mnemonic: 'とう/あ (tou/a) - "TOE hits! APPROPRIATE!" ATARU = hit! TOUZEN = naturally!'
  },
  {
    character: '形',
    radicals: [{ char: '开', name: 'open', meaning: 'frame' }, { char: '彡', name: 'hair', meaning: 'pattern' }],
    components: 'Frame + 彡 (pattern)',
    story: 'A FRAME with a PATTERN (彡) - SHAPE/FORM! The outline. Frame pattern = SHAPE!',
    hint: 'Frame pattern = shape',
    reading_mnemonic: 'けい/ぎょう/かた/かたち (kei/gyou/kata/katachi) - "KAY\'s SHAPE!" KATACHI = shape! NINGYO = doll!'
  }
]

async function insertBatch() {
  console.log('🏛️ N3 BATCH 4: Buildings & Places (30 kanji)')
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
  console.log(`✨ Batch 4 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
