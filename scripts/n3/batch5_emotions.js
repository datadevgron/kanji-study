/**
 * N3 BATCH 5: Emotions & Mental (30 kanji)
 * 役彼徒得御必忘忙念怒怖性恐恥息悲情想愛感慣成戦戻所才打払投
 * 
 * Run: node scripts/n3/batch5_emotions.js
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
    character: '役',
    radicals: [{ char: '彳', name: 'step', meaning: 'step' }, { char: '殳', name: 'weapon', meaning: 'action' }],
    components: '彳 (step) + 殳 (action)',
    story: 'STEPPING (彳) into ACTION (殳) - ROLE/DUTY! Taking on responsibility. Step into action = ROLE!',
    hint: 'Step into action = role',
    reading_mnemonic: 'やく/えき (yaku/eki) - "YACK about your ROLE!" YAKUWARI = role! YAKUSHA = actor!'
  },
  {
    character: '彼',
    radicals: [{ char: '彳', name: 'step', meaning: 'step' }, { char: '皮', name: 'skin', meaning: 'skin' }],
    components: '彳 (step) + 皮 (skin)',
    story: 'Someone STEPPING (彳) with their own SKIN (皮) - HE/THAT! That person over there. That one = HE!',
    hint: 'That stepping person = he',
    reading_mnemonic: 'ひ/かれ/かの (hi/kare/kano) - "HE is KARE!" KARE = he! KANOJO = she!'
  },
  {
    character: '徒',
    radicals: [{ char: '彳', name: 'step', meaning: 'step' }, { char: '走', name: 'run', meaning: 'run' }],
    components: '彳 (step) + 走 (run)',
    story: 'STEPPING (彳) and RUNNING (走) on foot - ON FOOT/FOLLOWER! Walking. Step and run = ON FOOT!',
    hint: 'Stepping and running = on foot',
    reading_mnemonic: 'と (to) - "TO-walk ON FOOT!" TOHO = on foot! SEITO = student!'
  },
  {
    character: '得',
    radicals: [{ char: '彳', name: 'step', meaning: 'step' }, { char: '旦', name: 'dawn', meaning: 'day' }, { char: '寸', name: 'inch', meaning: 'hand' }],
    components: '彳 (step) + 旦 (dawn) + 寸 (hand)',
    story: 'STEPPING (彳) out at DAWN to GRASP - GAIN/OBTAIN! Getting what you seek. Step to grasp = GAIN!',
    hint: 'Stepping to grasp = gain',
    reading_mnemonic: 'とく/え/う (toku/e/u) - "TOK-en GAINED!" ERU = obtain! TOKUI = skilled!'
  },
  {
    character: '御',
    radicals: [{ char: '彳', name: 'step', meaning: 'step' }, { char: '卸', name: 'unload', meaning: 'control' }],
    components: '彳 (step) + control',
    story: 'STEPPING (彳) with CONTROL - HONORIFIC! Polite control. Controlled step = HONORIFIC!',
    hint: 'Controlled step = honorific',
    reading_mnemonic: 'ご/お/おん (go/o/on) - "GO-politely!" GOHAN = rice! ONEGAI = please!'
  },
  {
    character: '必',
    radicals: [{ char: '心', name: 'heart', meaning: 'heart' }, { char: '丿', name: 'stroke', meaning: 'pierce' }],
    components: '心 (heart) + pierce',
    story: 'An arrow piercing the HEART (心) - CERTAIN/NECESSARY! Without fail. Heart pierced = CERTAIN!',
    hint: 'Heart pierced = certain',
    reading_mnemonic: 'ひつ/かなら (hitsu/kanara) - "HITS the mark! NECESSARY!" KANARAZU = certainly! HITSUYOU = necessary!'
  },
  {
    character: '忘',
    radicals: [{ char: '亡', name: 'death', meaning: 'gone' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '亡 (gone) + 心 (heart)',
    story: 'Something GONE (亡) from the HEART (心) - FORGET! Lost from memory. Gone from heart = FORGET!',
    hint: 'Gone from heart = forget',
    reading_mnemonic: 'ぼう/わす (bou/wasu) - "BOW! I FORGOT!" WASURERU = forget! BOUNEN = year-end!'
  },
  {
    character: '忙',
    radicals: [{ char: '忄', name: 'heart', meaning: 'heart' }, { char: '亡', name: 'death', meaning: 'gone' }],
    components: '忄 (heart) + 亡 (gone)',
    story: 'HEART (忄) running around like crazy (亡) - BUSY! Too much to do. Frantic heart = BUSY!',
    hint: 'Frantic heart = busy',
    reading_mnemonic: 'ぼう/いそが (bou/isoga) - "BOW! So BUSY!" ISOGASHII = busy!'
  },
  {
    character: '念',
    radicals: [{ char: '今', name: 'now', meaning: 'now' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '今 (now) + 心 (heart)',
    story: 'NOW (今) in the HEART (心) - THOUGHT/WISH! What\'s in your heart now. Heart now = THOUGHT!',
    hint: 'Now in heart = thought',
    reading_mnemonic: 'ねん (nen) - "NEN! My WISH!" KINEN = commemoration! SHINNEN = belief!'
  },
  {
    character: '怒',
    radicals: [{ char: '奴', name: 'slave', meaning: 'servant' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '奴 (slave) + 心 (heart)',
    story: 'A HEART (心) like an angry slave (奴) - ANGRY! Raging emotion. Raging heart = ANGRY!',
    hint: 'Raging heart = angry',
    reading_mnemonic: 'ど/いか/おこ (do/ika/oko) - "DOH! So ANGRY!" OKORU = get angry! IKARI = anger!'
  },
  {
    character: '怖',
    radicals: [{ char: '忄', name: 'heart', meaning: 'heart' }, { char: '布', name: 'cloth', meaning: 'spread' }],
    components: '忄 (heart) + 布 (spread)',
    story: 'FEAR spreading (布) through the HEART (忄) - SCARY! Terror spreading. Spread fear = SCARY!',
    hint: 'Fear spreads = scary',
    reading_mnemonic: 'ふ/こわ (fu/kowa) - "FOO! SCARY!" KOWAI = scary!'
  },
  {
    character: '性',
    radicals: [{ char: '忄', name: 'heart', meaning: 'heart' }, { char: '生', name: 'life', meaning: 'life' }],
    components: '忄 (heart) + 生 (life)',
    story: 'The LIFE (生) of the HEART (忄) - NATURE/GENDER! Your essential nature. Heart life = NATURE!',
    hint: 'Heart life = nature',
    reading_mnemonic: 'せい/しょう (sei/shou) - "SAY your NATURE!" SEIKAKU = personality! DANSEI = male!'
  },
  {
    character: '恐',
    radicals: [{ char: '巩', name: 'solid', meaning: 'strong' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: 'Strong + 心 (heart)',
    story: 'A strong force gripping the HEART (心) - FEAR! Terrifying power. Gripped heart = FEAR!',
    hint: 'Gripped heart = fear',
    reading_mnemonic: 'きょう/おそ (kyou/oso) - "KEY-O! I FEAR!" OSOROSHII = terrifying! KYOUFU = fear!'
  },
  {
    character: '恥',
    radicals: [{ char: '耳', name: 'ear', meaning: 'ear' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '耳 (ear) + 心 (heart)',
    story: 'EARS (耳) burning and HEART (心) racing - SHAME! Embarrassment. Burning ears = SHAME!',
    hint: 'Burning ears = shame',
    reading_mnemonic: 'ち/は (chi/ha) - "CHEESE! I\'m ASHAMED!" HAZUKASHII = embarrassing!'
  },
  {
    character: '息',
    radicals: [{ char: '自', name: 'self', meaning: 'nose' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '自 (nose) + 心 (heart)',
    story: 'Air from the NOSE (自) to the HEART (心) - BREATH! Breathing life. Nose to heart = BREATH!',
    hint: 'Nose to heart = breath',
    reading_mnemonic: 'そく/いき (soku/iki) - "SOCK! Take a BREATH!" IKI = breath! KYUUSOKU = rest!'
  },
  {
    character: '悲',
    radicals: [{ char: '非', name: 'not', meaning: 'not' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '非 (not) + 心 (heart)',
    story: 'The HEART (心) that is NOT (非) happy - SAD! Unhappy heart. Not happy heart = SAD!',
    hint: 'Not happy heart = sad',
    reading_mnemonic: 'ひ/かな (hi/kana) - "HE is SAD!" KANASHII = sad! HIGEKI = tragedy!'
  },
  {
    character: '情',
    radicals: [{ char: '忄', name: 'heart', meaning: 'heart' }, { char: '青', name: 'blue', meaning: 'blue/pure' }],
    components: '忄 (heart) + 青 (blue/pure)',
    story: 'A PURE (青) HEART (忄) - EMOTION/FEELING! True feelings. Pure heart = EMOTION!',
    hint: 'Pure heart = emotion',
    reading_mnemonic: 'じょう/せい/なさ (jou/sei/nasa) - "JO\'s EMOTION!" KANJOU = emotion! JOUHOU = information!'
  },
  {
    character: '想',
    radicals: [{ char: '相', name: 'mutual', meaning: 'mutual' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '相 (mutual) + 心 (heart)',
    story: 'MUTUAL (相) thoughts in the HEART (心) - IMAGINE! Shared ideas. Mutual heart = IMAGINE!',
    hint: 'Mutual heart = imagine',
    reading_mnemonic: 'そう (sou) - "SO I IMAGINE!" SOUZOU = imagination! RISOU = ideal!'
  },
  {
    character: '愛',
    radicals: [{ char: '爫', name: 'claw', meaning: 'hand' }, { char: '冖', name: 'cover', meaning: 'cover' }, { char: '心', name: 'heart', meaning: 'heart' }, { char: '夂', name: 'go', meaning: 'legs' }],
    components: 'Hand + cover + 心 (heart) + legs',
    story: 'A HEART (心) protected and held with HANDS and LEGS - LOVE! Embracing completely. Embraced heart = LOVE!',
    hint: 'Embraced heart = love',
    reading_mnemonic: 'あい (ai) - "I LOVE you!" AI = love! AIJOU = affection!'
  },
  {
    character: '感',
    radicals: [{ char: '咸', name: 'all', meaning: 'all' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '咸 (all) + 心 (heart)',
    story: 'ALL (咸) in the HEART (心) - FEEL! Full of feeling. All in heart = FEEL!',
    hint: 'All in heart = feel',
    reading_mnemonic: 'かん (kan) - "CAN you FEEL it?" KANJIRU = feel! KANSHA = gratitude!'
  },
  {
    character: '慣',
    radicals: [{ char: '忄', name: 'heart', meaning: 'heart' }, { char: '貫', name: 'pierce', meaning: 'through' }],
    components: '忄 (heart) + 貫 (pierce through)',
    story: 'The HEART (忄) pierced through (貫) by practice - ACCUSTOM! Used to it. Practice through = ACCUSTOM!',
    hint: 'Heart pierced = accustom',
    reading_mnemonic: 'かん/な (kan/na) - "CAN get ACCUSTOMED!" NARERU = get used to! SHUUKAN = habit!'
  },
  {
    character: '成',
    radicals: [{ char: '戈', name: 'weapon', meaning: 'weapon' }, { char: '丁', name: 'nail', meaning: 'complete' }],
    components: '戈 (weapon) + complete',
    story: 'A weapon (戈) completing its work - BECOME/ACCOMPLISH! Achieving. Complete = BECOME!',
    hint: 'Weapon completes = become',
    reading_mnemonic: 'せい/な (sei/na) - "SAY I BECAME!" NARU = become! SEIKOU = success!'
  },
  {
    character: '戦',
    radicals: [{ char: '単', name: 'single', meaning: 'single' }, { char: '戈', name: 'weapon', meaning: 'weapon' }],
    components: '単 (single) + 戈 (weapon)',
    story: 'A SINGLE (単) WEAPON (戈) raised - WAR/BATTLE! Fighting. Weapon raised = WAR!',
    hint: 'Single weapon = war',
    reading_mnemonic: 'せん/いくさ/たたか (sen/ikusa/tataka) - "SEN-d to WAR!" SENSOU = war! TATAKAU = fight!'
  },
  {
    character: '戻',
    radicals: [{ char: '戸', name: 'door', meaning: 'door' }, { char: '大', name: 'big', meaning: 'big' }],
    components: '戸 (door) + 大 (big)',
    story: 'Coming back through the big DOOR (戸) - RETURN! Going back home. Back through door = RETURN!',
    hint: 'Back through door = return',
    reading_mnemonic: 'れい/もど (rei/modo) - "RAY RETURNS!" MODORU = return! MODOKASU = return something!'
  },
  {
    character: '所',
    radicals: [{ char: '戸', name: 'door', meaning: 'door' }, { char: '斤', name: 'axe', meaning: 'axe' }],
    components: '戸 (door) + 斤 (axe)',
    story: 'A DOOR (戸) made with an AXE (斤) - PLACE! Where things are built. Built door = PLACE!',
    hint: 'Door made = place',
    reading_mnemonic: 'しょ/ところ (sho/tokoro) - "SHOW me the PLACE!" TOKORO = place! BASHO = location!'
  },
  {
    character: '才',
    radicals: [{ char: '才', name: 'talent', meaning: 'talent' }],
    components: 'Talent sprouting',
    story: 'A sprout of ability - TALENT! Natural gift. Sprouting = TALENT!',
    hint: 'Sprouting gift = talent',
    reading_mnemonic: 'さい (sai) - "SIGH! Such TALENT!" TENSAI = genius! SAINOU = ability!'
  },
  {
    character: '打',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '丁', name: 'nail', meaning: 'nail' }],
    components: '扌 (hand) + 丁 (nail)',
    story: 'A HAND (扌) hitting a NAIL (丁) - HIT/STRIKE! Hammering. Hand hits nail = HIT!',
    hint: 'Hand hits nail = hit',
    reading_mnemonic: 'だ/う (da/u) - "DA! I HIT it!" UTSU = hit! DASU = send/hit!'
  },
  {
    character: '払',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '厶', name: 'private', meaning: 'sweep' }],
    components: '扌 (hand) + 厶 (sweep)',
    story: 'A HAND (扌) sweeping things away - PAY/SWEEP! Clearing out. Hand sweeps = PAY!',
    hint: 'Hand sweeps = pay',
    reading_mnemonic: 'はら (hara) - "HAH-RAH! PAY up!" HARAU = pay!'
  },
  {
    character: '投',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '殳', name: 'weapon', meaning: 'throw' }],
    components: '扌 (hand) + 殳 (throw)',
    story: 'A HAND (扌) throwing (殳) - THROW! Pitching. Hand throws = THROW!',
    hint: 'Hand throws = throw',
    reading_mnemonic: 'とう/な (tou/na) - "TOE THROWS!" NAGERU = throw! TOUHYOU = vote!'
  }
]

async function insertBatch() {
  console.log('💭 N3 BATCH 5: Emotions & Mental (30 kanji)')
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
  console.log(`✨ Batch 5 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
