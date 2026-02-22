/**
 * N3 BATCH 2: Temperature, Processing & Actions (30 kanji)
 * 冷処列初判利到制刻割加助努労務勝勤化単危原参反収取受
 * 
 * Run: node scripts/n3/batch2_processing.js
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
    character: '冷',
    radicals: [{ char: '冫', name: 'ice', meaning: 'ice' }, { char: '令', name: 'command', meaning: 'order' }],
    components: '冫 (ice) + 令 (command)',
    story: 'ICE (冫) COMMANDS (令) coldness - COLD! The ice dictates the temperature. Ice commands = COLD!',
    hint: 'Ice commands = cold',
    reading_mnemonic: 'れい/つめ/ひ/さ (rei/tsume/hi/sa) - "RAY of COLD!" REIZOU = refrigerator! TSUMETAI = cold! HIYASU = cool! SAMERU = cool down!'
  },
  {
    character: '処',
    radicals: [{ char: '夂', name: 'go', meaning: 'go' }, { char: '几', name: 'table', meaning: 'desk' }],
    components: '夂 (go) + 几 (desk)',
    story: 'GOING (夂) to a DESK (几) to process things - DEAL WITH! Processing at a desk. Go to process = DEAL WITH!',
    hint: 'Go to process = deal with',
    reading_mnemonic: 'しょ (sho) - "SHOW how to DEAL WITH it!" SHORI = processing! SHOBUN = disposal!'
  },
  {
    character: '列',
    radicals: [{ char: '歹', name: 'death', meaning: 'bones' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '歹 (bones) + 刂 (knife)',
    story: 'BONES (歹) lined up by a KNIFE (刂) - ROW/LINE! Things arranged in order. Lined up = ROW!',
    hint: 'Bones lined up = row',
    reading_mnemonic: 'れつ (retsu) - "WRETCHED ROW!" RETSU = row! GYOURETSU = queue!'
  },
  {
    character: '初',
    radicals: [{ char: '衤', name: 'clothes', meaning: 'clothes' }, { char: '刀', name: 'sword', meaning: 'sword' }],
    components: '衤 (clothes) + 刀 (sword)',
    story: 'Cutting CLOTHES (衤) with a SWORD (刀) for the first time - FIRST/BEGINNING! First cut = FIRST!',
    hint: 'First cut of cloth = first',
    reading_mnemonic: 'しょ/はじ/はつ/うい (sho/haji/hatsu/ui) - "SHOW the FIRST!" HAJIMETE = for the first time! SAISHO = first!'
  },
  {
    character: '判',
    radicals: [{ char: '半', name: 'half', meaning: 'half' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '半 (half) + 刂 (knife)',
    story: 'Cutting in HALF (半) with a KNIFE (刂) to JUDGE - JUDGE! Dividing to decide. Cut to judge = JUDGE!',
    hint: 'Cut in half = judge',
    reading_mnemonic: 'はん/ばん (han/ban) - "HAN-d down JUDGMENT!" HANDAN = judgment! SAIBAN = trial!'
  },
  {
    character: '利',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '禾 (grain) + 刂 (knife)',
    story: 'Cutting GRAIN (禾) with a sharp KNIFE (刂) - PROFIT/ADVANTAGE! Efficient harvest = profit. Sharp harvest = PROFIT!',
    hint: 'Sharp grain cut = profit',
    reading_mnemonic: 'り/き (ri/ki) - "REE-p PROFIT!" RIEKI = profit! BENRI = convenient!'
  },
  {
    character: '到',
    radicals: [{ char: '至', name: 'arrive', meaning: 'reach' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '至 (arrive) + 刂 (knife)',
    story: 'ARRIVING (至) with precision like a KNIFE (刂) - ARRIVE! Reaching the exact point. Precise arrival = ARRIVE!',
    hint: 'Precise arrival = arrive',
    reading_mnemonic: 'とう (tou) - "TOE ARRIVES!" TOUCHAKU = arrival! TOUTOU = finally!'
  },
  {
    character: '制',
    radicals: [{ char: '牛', name: 'cow', meaning: 'cow' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '牛 (cow) + 刂 (knife) + tree',
    story: 'Using a KNIFE (刂) to CONTROL the cow (牛) - CONTROL/SYSTEM! Regulating with rules. Knife controls = SYSTEM!',
    hint: 'Knife controls = system',
    reading_mnemonic: 'せい (sei) - "SAY the RULES!" SEIDO = system! KISEI = regulation!'
  },
  {
    character: '刻',
    radicals: [{ char: '亥', name: 'boar', meaning: 'time' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '亥 (time) + 刂 (knife)',
    story: 'Carving TIME (亥) with a KNIFE (刂) - ENGRAVE/TIME! Marking moments precisely. Carving time = ENGRAVE!',
    hint: 'Carving time = engrave',
    reading_mnemonic: 'こく/きざ (koku/kiza) - "CLOCK ENGRAVES time!" JIKOKU = time! KIZAMU = carve!'
  },
  {
    character: '割',
    radicals: [{ char: '害', name: 'harm', meaning: 'harm' }, { char: '刂', name: 'knife', meaning: 'knife' }],
    components: '害 (harm) + 刂 (knife)',
    story: 'A KNIFE (刂) that can HARM (害) by cutting - DIVIDE/PROPORTION! Splitting things up. Cutting to divide = DIVIDE!',
    hint: 'Knife divides = proportion',
    reading_mnemonic: 'かつ/わ (katsu/wa) - "CUT and DIVIDE!" BUNKATSU = division! WARIAU = split!'
  },
  {
    character: '加',
    radicals: [{ char: '力', name: 'power', meaning: 'power' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '力 (power) + 口 (mouth)',
    story: 'Adding POWER (力) through your MOUTH (口) - ADD! Contributing strength. Power added = ADD!',
    hint: 'Power through mouth = add',
    reading_mnemonic: 'か/くわ (ka/kuwa) - "KAH! ADD more!" SANKA = participate! KUWAERU = add!'
  },
  {
    character: '助',
    radicals: [{ char: '且', name: 'moreover', meaning: 'pile' }, { char: '力', name: 'power', meaning: 'power' }],
    components: '且 (pile) + 力 (power)',
    story: 'Adding POWER (力) to the pile (且) - HELP! Providing extra strength. Extra power = HELP!',
    hint: 'Extra power = help',
    reading_mnemonic: 'じょ/たす/すけ (jo/tasu/suke) - "JOE HELPS!" TASUKERU = help! JOSHU = assistant!'
  },
  {
    character: '努',
    radicals: [{ char: '奴', name: 'slave', meaning: 'servant' }, { char: '力', name: 'power', meaning: 'power' }],
    components: '奴 (servant) + 力 (power)',
    story: 'A servant\'s (奴) POWER (力) - EFFORT! Working hard like a servant. Servant power = EFFORT!',
    hint: 'Servant power = effort',
    reading_mnemonic: 'ど/つと (do/tsuto) - "DOH! More EFFORT!" DORYOKU = effort! TSUTOMERU = strive!'
  },
  {
    character: '労',
    radicals: [{ char: '⺌', name: 'fire', meaning: 'flames' }, { char: '冖', name: 'cover', meaning: 'roof' }, { char: '力', name: 'power', meaning: 'power' }],
    components: 'Flames + roof + 力 (power)',
    story: 'POWER (力) under heat and pressure - LABOR! Hard work under stress. Stressed power = LABOR!',
    hint: 'Power under stress = labor',
    reading_mnemonic: 'ろう (rou) - "ROW harder! LABOR!" ROUDOU = labor! KUROU = hardship!'
  },
  {
    character: '務',
    radicals: [{ char: '矛', name: 'spear', meaning: 'spear' }, { char: '攵', name: 'strike', meaning: 'action' }, { char: '力', name: 'power', meaning: 'power' }],
    components: '矛 (spear) + 攵 (action) + 力 (power)',
    story: 'POWER (力) in ACTION (攵) like a SPEAR (矛) - DUTY! Active responsibility. Active power = DUTY!',
    hint: 'Active power = duty',
    reading_mnemonic: 'む/つと (mu/tsuto) - "MOO! It\'s my DUTY!" GIMU = duty! TSUTOMERU = serve!'
  },
  {
    character: '勝',
    radicals: [{ char: '月', name: 'moon', meaning: 'flesh' }, { char: '龹', name: 'roll', meaning: 'pile' }, { char: '力', name: 'power', meaning: 'power' }],
    components: 'Flesh + pile + 力 (power)',
    story: 'POWER (力) piled on flesh - WIN! Overcoming with strength. Powerful flesh = WIN!',
    hint: 'Powerful flesh = win',
    reading_mnemonic: 'しょう/か/まさ (shou/ka/masa) - "SHOW them you WIN!" SHOUBU = match! KATSU = win! MASARU = excel!'
  },
  {
    character: '勤',
    radicals: [{ char: '堇', name: 'clay', meaning: 'diligence' }, { char: '力', name: 'power', meaning: 'power' }],
    components: '堇 (diligence) + 力 (power)',
    story: 'DILIGENT (堇) use of POWER (力) - WORK DILIGENTLY! Careful effort. Diligent power = WORK!',
    hint: 'Diligent power = work',
    reading_mnemonic: 'きん/ごん/つと (kin/gon/tsuto) - "KIN works DILIGENTLY!" KINMU = service! TSUTOMERU = work at!'
  },
  {
    character: '化',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '匕', name: 'spoon', meaning: 'change' }],
    components: '亻 (person) + 匕 (change)',
    story: 'A PERSON (亻) undergoing CHANGE (匕) - TRANSFORM! People changing form. Person changes = TRANSFORM!',
    hint: 'Person changes = transform',
    reading_mnemonic: 'か/け/ば (ka/ke/ba) - "KAH! TRANSFORM!" HENKA = change! BAKERU = transform!'
  },
  {
    character: '単',
    radicals: [{ char: '⺌', name: 'little', meaning: 'top' }, { char: '日', name: 'sun', meaning: 'sun' }, { char: '十', name: 'ten', meaning: 'ten' }],
    components: 'Top + 日 (sun) + 十 (ten)',
    story: 'Just ONE sun (日) and nothing more - SIMPLE! Nothing complex. One thing = SIMPLE!',
    hint: 'Just one = simple',
    reading_mnemonic: 'たん (tan) - "TAN is SIMPLE!" TANJUN = simple! TANGO = word!'
  },
  {
    character: '危',
    radicals: [{ char: '⺈', name: 'cliff', meaning: 'cliff' }, { char: '厄', name: 'misfortune', meaning: 'danger' }],
    components: 'Cliff + person in danger',
    story: 'A person on a CLIFF in DANGER - DANGEROUS! Precarious position. Cliff danger = DANGEROUS!',
    hint: 'Cliff position = dangerous',
    reading_mnemonic: 'き/あぶ/あや (ki/abu/aya) - "KEY to DANGER!" KIKEN = danger! ABUNAI = dangerous! AYAUI = risky!'
  },
  {
    character: '原',
    radicals: [{ char: '厂', name: 'cliff', meaning: 'cliff' }, { char: '白', name: 'white', meaning: 'white' }, { char: '小', name: 'small', meaning: 'small' }],
    components: '厂 (cliff) + 白 (white) + 小 (small)',
    story: 'A WHITE (白) plain below a CLIFF (厂) - PLAIN/ORIGIN! The original flat land. Flat land = PLAIN/ORIGIN!',
    hint: 'White plain = origin',
    reading_mnemonic: 'げん/はら (gen/hara) - "GEN-uine ORIGIN!" GENSOKU = principle! HARA = plain/field!'
  },
  {
    character: '参',
    radicals: [{ char: '厶', name: 'private', meaning: 'self' }, { char: '大', name: 'big', meaning: 'big' }, { char: '彡', name: 'hair', meaning: 'decoration' }],
    components: 'Self + big + decoration',
    story: 'A decorated person coming to PARTICIPATE - PARTICIPATE! Joining formally. Decorated join = PARTICIPATE!',
    hint: 'Decorated join = participate',
    reading_mnemonic: 'さん/まい (san/mai) - "SAN PARTICIPATES!" SANKA = participation! OMAIRI = shrine visit!'
  },
  {
    character: '反',
    radicals: [{ char: '厂', name: 'cliff', meaning: 'cliff' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: '厂 (cliff) + 又 (hand)',
    story: 'A HAND (又) pushing against a CLIFF (厂) - ANTI/OPPOSITE! Pushing back. Hand against = ANTI!',
    hint: 'Hand against cliff = anti',
    reading_mnemonic: 'はん/たん/そ (han/tan/so) - "HAN-d AGAINST!" HANTAI = opposite! HANSEI = reflection! SORU = warp!'
  },
  {
    character: '収',
    radicals: [{ char: '丩', name: 'twist', meaning: 'gather' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: 'Gather + 又 (hand)',
    story: 'A HAND (又) GATHERING things - COLLECT! Bringing together. Hand gathers = COLLECT!',
    hint: 'Hand gathers = collect',
    reading_mnemonic: 'しゅう/おさ (shuu/osa) - "SHOE COLLECTION!" SHUUSHUU = collection! OSAMERU = obtain!'
  },
  {
    character: '取',
    radicals: [{ char: '耳', name: 'ear', meaning: 'ear' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: '耳 (ear) + 又 (hand)',
    story: 'A HAND (又) grabbing an EAR (耳) - TAKE! Taking hold of something. Hand grabs = TAKE!',
    hint: 'Hand grabs ear = take',
    reading_mnemonic: 'しゅ/と (shu/to) - "SHOE I TAKE!" TORU = take! SHUTOKU = acquisition!'
  },
  {
    character: '受',
    radicals: [{ char: '爫', name: 'claw', meaning: 'hand' }, { char: '冖', name: 'cover', meaning: 'cover' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: 'Hand + cover + 又 (hand)',
    story: 'Hands passing something between them - RECEIVE! Accepting from another. Hands pass = RECEIVE!',
    hint: 'Hands passing = receive',
    reading_mnemonic: 'じゅ/う (ju/u) - "JOO! I RECEIVE!" UKERU = receive! JUSHIN = reception!'
  },
  {
    character: '号',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '丂', name: 'bent', meaning: 'bent' }],
    components: '口 (mouth) + bent',
    story: 'A MOUTH (口) calling out a NUMBER - NUMBER/CALL! Announcing numbers. Mouth calls = NUMBER!',
    hint: 'Mouth calls = number',
    reading_mnemonic: 'ごう (gou) - "GO! NUMBER one!" BANGOU = number! SHINGOU = signal!'
  },
  {
    character: '合',
    radicals: [{ char: '亼', name: 'gather', meaning: 'gather' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: 'Gather + 口 (mouth)',
    story: 'MOUTHS (口) GATHERING together - FIT/MATCH! Coming together as one. Gathered = FIT!',
    hint: 'Gathered mouths = fit',
    reading_mnemonic: 'ごう/がっ/あ (gou/ga/a) - "GO-together! MATCH!" GOUKEI = total! AU = meet/fit!'
  },
  {
    character: '向',
    radicals: [{ char: '丿', name: 'stroke', meaning: 'direction' }, { char: '冂', name: 'border', meaning: 'opening' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: 'Direction + opening + 口 (mouth)',
    story: 'A MOUTH (口) facing an opening - FACE TOWARD! Turning to face something. Mouth faces = TOWARD!',
    hint: 'Mouth faces opening = toward',
    reading_mnemonic: 'こう/む (kou/mu) - "COW faces TOWARD!" HOUKOU = direction! MUKU = face toward!'
  },
  {
    character: '君',
    radicals: [{ char: '尹', name: 'govern', meaning: 'govern' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '尹 (govern) + 口 (mouth)',
    story: 'One who GOVERNS (尹) with their MOUTH (口) - YOU/LORD! Addressing someone respectfully. Governing mouth = YOU!',
    hint: 'Governing mouth = you/lord',
    reading_mnemonic: 'くん/きみ (kun/kimi) - "KOON! Hey YOU!" KIMI = you! KUN = Mr. (suffix)!'
  }
]

async function insertBatch() {
  console.log('⚙️ N3 BATCH 2: Temperature, Processing & Actions (30 kanji)')
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
  console.log(`✨ Batch 2 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
