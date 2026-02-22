/**
 * N3 BATCH 11: Communication & Movement (30 kanji)
 * 論識警議負財貧責費資賛越路辞込迎返迷追退逃途速連進遅遊過
 * 
 * Run: node scripts/n3/batch11_communication.js
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
    character: '論',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '侖', name: 'order', meaning: 'order' }],
    components: '言 (say) + 侖 (order)',
    story: 'WORDS (言) in ORDER (侖) - THEORY/DISCUSS! Argument. Ordered words = THEORY!',
    hint: 'Ordered words = theory',
    reading_mnemonic: 'ろん (ron) - "RON ARGUES!" GIRON = argument! RONBUN = thesis!'
  },
  {
    character: '識',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '音', name: 'sound', meaning: 'sound' }, { char: '戈', name: 'weapon', meaning: 'weapon' }],
    components: '言 (say) + 音 (sound) + 戈 (weapon)',
    story: 'WORDS (言) distinguishing sounds - KNOW/DISCRIMINATE! Knowledge. Words know = KNOWLEDGE!',
    hint: 'Words know = knowledge',
    reading_mnemonic: 'しき (shiki) - "SHE KEY KNOWS!" CHISHIKI = knowledge! ISHIKI = consciousness!'
  },
  {
    character: '警',
    radicals: [{ char: '敬', name: 'respect', meaning: 'respect' }, { char: '言', name: 'say', meaning: 'say' }],
    components: '敬 (respect) + 言 (say)',
    story: 'RESPECTFUL (敬) WORDS (言) of warning - WARN/POLICE! Alert. Warn words = POLICE!',
    hint: 'Warn words = police',
    reading_mnemonic: 'けい (kei) - "KAY WARNS!" KEISATSU = police! KEIKAI = caution!'
  },
  {
    character: '議',
    radicals: [{ char: '言', name: 'say', meaning: 'say' }, { char: '義', name: 'righteousness', meaning: 'righteousness' }],
    components: '言 (say) + 義 (righteousness)',
    story: 'WORDS (言) about RIGHTEOUSNESS (義) - DISCUSS/DELIBERATE! Debate. Righteous words = DISCUSS!',
    hint: 'Righteous words = discuss',
    reading_mnemonic: 'ぎ (gi) - "GEE! DISCUSSION!" KAIGI = meeting! GIIN = congressman!'
  },
  {
    character: '負',
    radicals: [{ char: '貝', name: 'shell', meaning: 'money' }, { char: '刀', name: 'sword', meaning: 'sword' }],
    components: '貝 (money) + 刀 (sword)',
    story: 'MONEY (貝) cut by SWORD (刀) - LOSE/BEAR! Defeat. Cut money = LOSE!',
    hint: 'Cut money = lose',
    reading_mnemonic: 'ふ/ま/お (fu/ma/o) - "FU LOSES!" MAKERU = lose! FUTAN = burden!'
  },
  {
    character: '財',
    radicals: [{ char: '貝', name: 'shell', meaning: 'money' }, { char: '才', name: 'talent', meaning: 'talent' }],
    components: '貝 (money) + 才 (talent)',
    story: 'MONEY (貝) from TALENT (才) - WEALTH! Property. Money talent = WEALTH!',
    hint: 'Money talent = wealth',
    reading_mnemonic: 'ざい/さい (zai/sai) - "ZAI WEALTH!" ZAISAN = property! ZAISEI = finance!'
  },
  {
    character: '貧',
    radicals: [{ char: '分', name: 'divide', meaning: 'divide' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: '分 (divide) + 貝 (money)',
    story: 'MONEY (貝) DIVIDED (分) - POOR! Poverty. Divided money = POOR!',
    hint: 'Divided money = poor',
    reading_mnemonic: 'ひん/びん/まず (hin/bin/mazu) - "HIN is POOR!" MAZUSHII = poor! HINKON = poverty!'
  },
  {
    character: '責',
    radicals: [{ char: '主', name: 'master', meaning: 'thorns' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: 'Thorns + 貝 (money)',
    story: 'MONEY (貝) demands with thorns - BLAME/RESPONSIBILITY! Duty. Money demands = RESPONSIBILITY!',
    hint: 'Money demands = responsibility',
    reading_mnemonic: 'せき/せ (seki/se) - "SEK RESPONSIBILITY!" SEKININ = responsibility! SEMERU = blame!'
  },
  {
    character: '費',
    radicals: [{ char: '弗', name: 'dollar', meaning: 'spend' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: '弗 (spend) + 貝 (money)',
    story: 'MONEY (貝) being spent - EXPENSE! Cost. Spent money = EXPENSE!',
    hint: 'Spent money = expense',
    reading_mnemonic: 'ひ/つい (hi/tsui) - "HE SPENDS! EXPENSE!" TSUIYASU = spend! HIYO = expense!'
  },
  {
    character: '資',
    radicals: [{ char: '次', name: 'next', meaning: 'next' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: '次 (next) + 貝 (money)',
    story: 'MONEY (貝) for the NEXT (次) step - RESOURCES! Capital. Next money = RESOURCES!',
    hint: 'Next money = resources',
    reading_mnemonic: 'し (shi) - "SHE has RESOURCES!" SHIGEN = resources! SHIKIN = funds!'
  },
  {
    character: '賛',
    radicals: [{ char: '夫', name: 'husband', meaning: 'man' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: 'Two 夫 (men) + 貝 (money)',
    story: 'MEN (夫) giving MONEY (貝) in support - APPROVE! Praise. Money support = APPROVE!',
    hint: 'Money support = approve',
    reading_mnemonic: 'さん (san) - "SAN APPROVES!" SANSEI = approval! SANKA = participation!'
  },
  {
    character: '越',
    radicals: [{ char: '走', name: 'run', meaning: 'run' }, { char: '戉', name: 'axe', meaning: 'exceed' }],
    components: '走 (run) + 戉 (exceed)',
    story: 'RUNNING (走) to EXCEED (戉) - EXCEED/CROSS OVER! Surpass. Run exceed = EXCEED!',
    hint: 'Run exceed = exceed',
    reading_mnemonic: 'えつ/こ (etsu/ko) - "ETS! EXCEED!" KOERU = exceed! CHOUETSU = transcend!'
  },
  {
    character: '路',
    radicals: [{ char: '足', name: 'foot', meaning: 'foot' }, { char: '各', name: 'each', meaning: 'each' }],
    components: '足 (foot) + 各 (each)',
    story: 'FEET (足) going EACH (各) way - ROAD/PATH! Route. Feet path = ROAD!',
    hint: 'Feet path = road',
    reading_mnemonic: 'ろ/じ/みち (ro/ji/michi) - "ROW on the ROAD!" MICHI = road! DOURO = road!'
  },
  {
    character: '辞',
    radicals: [{ char: '舌', name: 'tongue', meaning: 'tongue' }, { char: '辛', name: 'spicy', meaning: 'bitter' }],
    components: '舌 (tongue) + 辛 (bitter)',
    story: 'BITTER (辛) words from TONGUE (舌) - RESIGN/WORD! Goodbye. Bitter tongue = RESIGN!',
    hint: 'Bitter tongue = resign',
    reading_mnemonic: 'じ/や (ji/ya) - "GEE! RESIGN!" YAMERU = resign! JISHO = dictionary!'
  },
  {
    character: '込',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '入', name: 'enter', meaning: 'enter' }],
    components: '辶 (road) + 入 (enter)',
    story: 'ENTERING (入) the ROAD (辶) - CROWDED/GO IN!込む. Enter road = CROWDED!',
    hint: 'Enter road = crowded',
    reading_mnemonic: 'こ (ko) - "KO! GO IN!" KOMU = be crowded! MOUSHIKOMI = application!'
  },
  {
    character: '迎',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '卬', name: 'rise', meaning: 'greet' }],
    components: '辶 (road) + 卬 (greet)',
    story: 'Going on the ROAD (辶) to GREET - WELCOME! Receive. Road greet = WELCOME!',
    hint: 'Road greet = welcome',
    reading_mnemonic: 'げい/むか (gei/muka) - "GAY WELCOME!" MUKAERU = welcome! KANGEI = welcome!'
  },
  {
    character: '返',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '反', name: 'anti', meaning: 'turn back' }],
    components: '辶 (road) + 反 (turn back)',
    story: 'Going on the ROAD (辶) and TURNING BACK (反) - RETURN! Go back. Road back = RETURN!',
    hint: 'Road back = return',
    reading_mnemonic: 'へん/かえ (hen/kae) - "HEN RETURNS!" KAESU = return! HENPIN = returned goods!'
  },
  {
    character: '迷',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '米', name: 'rice', meaning: 'rice' }],
    components: '辶 (road) + 米 (rice)',
    story: 'On the ROAD (辶) like scattered RICE (米) - LOST/CONFUSED! Stray. Road scattered = LOST!',
    hint: 'Road scattered = lost',
    reading_mnemonic: 'めい/まよ (mei/mayo) - "MAY be LOST!" MAYOU = get lost! MEIWAKU = trouble!'
  },
  {
    character: '追',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '㠯', name: 'heap', meaning: 'heap' }],
    components: '辶 (road) + 㠯 (heap)',
    story: 'On the ROAD (辶) chasing - CHASE/PURSUE! Follow. Road chase = CHASE!',
    hint: 'Road chase = chase',
    reading_mnemonic: 'つい/お (tsui/o) - "TSUE CHASES!" OU = chase! TSUIKYUU = pursuit!'
  },
  {
    character: '退',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '艮', name: 'stop', meaning: 'stop' }],
    components: '辶 (road) + 艮 (stop)',
    story: 'On the ROAD (辶) and STOPPING (艮) - RETREAT! Withdraw. Road stop = RETREAT!',
    hint: 'Road stop = retreat',
    reading_mnemonic: 'たい/しりぞ (tai/shirizo) - "TAI RETREATS!" SHIRIZOKU = retreat! TAISHOKU = retirement!'
  },
  {
    character: '逃',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '兆', name: 'omen', meaning: 'sign' }],
    components: '辶 (road) + 兆 (sign)',
    story: 'On the ROAD (辶) seeing the SIGN (兆) to flee - ESCAPE! Run away. Road sign = ESCAPE!',
    hint: 'Road sign = escape',
    reading_mnemonic: 'とう/に/のが (tou/ni/noga) - "TOE ESCAPES!" NIGERU = escape! TOUBOU = flight!'
  },
  {
    character: '途',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '余', name: 'surplus', meaning: 'surplus' }],
    components: '辶 (road) + 余 (surplus)',
    story: 'The ROAD (辶) with SURPLUS (余) - WAY/ROUTE! Journey. Road surplus = WAY!',
    hint: 'Road surplus = way',
    reading_mnemonic: 'と (to) - "TO the WAY!" TOCHUU = on the way!'
  },
  {
    character: '速',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '束', name: 'bundle', meaning: 'bundle' }],
    components: '辶 (road) + 束 (bundle)',
    story: 'On the ROAD (辶) quickly like a BUNDLE (束) - FAST/SPEED! Quick. Road quick = FAST!',
    hint: 'Road quick = fast',
    reading_mnemonic: 'そく/はや/すみ (soku/haya/sumi) - "SOKU FAST!" HAYAI = fast! SOKUDO = speed!'
  },
  {
    character: '連',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '車', name: 'car', meaning: 'car' }],
    components: '辶 (road) + 車 (car)',
    story: 'On the ROAD (辶) with CARS (車) linked - CONNECT/ACCOMPANY! Chain. Road cars = CONNECT!',
    hint: 'Road cars = connect',
    reading_mnemonic: 'れん/つ (ren/tsu) - "REN CONNECTS!" TSURERU = take along! RENRAKU = contact!'
  },
  {
    character: '進',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '隹', name: 'bird', meaning: 'bird' }],
    components: '辶 (road) + 隹 (bird)',
    story: 'On the ROAD (辶) like a BIRD (隹) flying forward - ADVANCE! Progress. Road bird = ADVANCE!',
    hint: 'Road bird = advance',
    reading_mnemonic: 'しん/すす (shin/susu) - "SHIN ADVANCES!" SUSUMU = advance! SHINPO = progress!'
  },
  {
    character: '遅',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '犀', name: 'rhino', meaning: 'slow' }],
    components: '辶 (road) + slow elements',
    story: 'On the ROAD (辶) going SLOW - LATE/SLOW! Delayed. Road slow = LATE!',
    hint: 'Road slow = late',
    reading_mnemonic: 'ち/おそ/おく (chi/oso/oku) - "CHI is LATE!" OSOI = slow! CHIKOKU = late!'
  },
  {
    character: '遊',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '㫃', name: 'flag', meaning: 'flag' }, { char: '子', name: 'child', meaning: 'child' }],
    components: '辶 (road) + flag + 子 (child)',
    story: 'On the ROAD (辶) with CHILDREN (子) - PLAY! Fun. Road children = PLAY!',
    hint: 'Road children = play',
    reading_mnemonic: 'ゆう/あそ (yuu/aso) - "YOU PLAY!" ASOBU = play! YUUENCHI = amusement park!'
  },
  {
    character: '過',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '咼', name: 'bone', meaning: 'exceed' }],
    components: '辶 (road) + 咼 (exceed)',
    story: 'On the ROAD (辶) going past - PASS/EXCEED! Go by. Road past = PASS!',
    hint: 'Road past = pass',
    reading_mnemonic: 'か/す/あやま (ka/su/ayama) - "KA PASSES!" SUGIRU = exceed! KAKO = past!'
  },
  {
    character: '達',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '羊', name: 'sheep', meaning: 'sheep' }, { char: '土', name: 'earth', meaning: 'earth' }],
    components: '辶 (road) + 羊 (sheep) + 土 (earth)',
    story: 'On the ROAD (辶) with SHEEP (羊) reaching destination - REACH/PLURAL! Arrive. Road reach = REACH!',
    hint: 'Road reach = reach',
    reading_mnemonic: 'たつ/たち (tatsu/tachi) - "TATS REACHES!" TOMODACHI = friends! TASSEI = achievement!'
  }
]

async function insertBatch() {
  console.log('🚶 N3 BATCH 11: Communication & Movement (30 kanji)')
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
  console.log(`✨ Batch 11 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
