/**
 * N3 BATCH 6: Actions & Movement (30 kanji)
 * 折抜抱押招指捕掛探支放政敗散数断易昔昨晩景晴暗暮曲更最望
 * 
 * Run: node scripts/n3/batch6_actions.js
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
    character: '折',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '斤', name: 'axe', meaning: 'axe' }],
    components: '扌 (hand) + 斤 (axe)',
    story: 'A HAND (扌) breaking like an AXE (斤) - FOLD/BREAK! Bending. Hand breaks = FOLD!',
    hint: 'Hand breaks = fold',
    reading_mnemonic: 'せつ/お (setsu/o) - "SET and FOLD!" ORU = fold/break! KOSSETSU = bone fracture!'
  },
  {
    character: '抜',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '友', name: 'friend', meaning: 'pull' }],
    components: '扌 (hand) + 友 (pull)',
    story: 'A HAND (扌) pulling like grabbing a friend - EXTRACT! Pulling out. Hand extracts = EXTRACT!',
    hint: 'Hand pulls = extract',
    reading_mnemonic: 'ばつ/ぬ (batsu/nu) - "BAT EXTRACTS!" NUKU = extract! BASSUI = excerpt!'
  },
  {
    character: '抱',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '包', name: 'wrap', meaning: 'wrap' }],
    components: '扌 (hand) + 包 (wrap)',
    story: 'A HAND (扌) WRAPPING (包) around - EMBRACE! Hugging. Hand wraps = EMBRACE!',
    hint: 'Hand wraps = embrace',
    reading_mnemonic: 'ほう/だ/いだ (hou/da/ida) - "HO! EMBRACE!" DAKU = embrace! IDAKU = hold!'
  },
  {
    character: '押',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '甲', name: 'armor', meaning: 'shell' }],
    components: '扌 (hand) + 甲 (shell)',
    story: 'A HAND (扌) pushing against a SHELL (甲) - PUSH! Pressing. Hand presses = PUSH!',
    hint: 'Hand on shell = push',
    reading_mnemonic: 'おう/お (ou/o) - "OH! PUSH it!" OSU = push!'
  },
  {
    character: '招',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '召', name: 'call', meaning: 'call' }],
    components: '扌 (hand) + 召 (call)',
    story: 'A HAND (扌) CALLING (召) someone over - INVITE! Beckoning. Hand calls = INVITE!',
    hint: 'Hand calls = invite',
    reading_mnemonic: 'しょう/まね (shou/mane) - "SHOW! I INVITE you!" MANEKU = beckon! SHOUTAI = invitation!'
  },
  {
    character: '指',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '旨', name: 'delicious', meaning: 'point' }],
    components: '扌 (hand) + 旨 (point)',
    story: 'A HAND (扌) POINTING (旨) at something - FINGER/POINT! Indicating. Hand points = FINGER!',
    hint: 'Hand points = finger',
    reading_mnemonic: 'し/ゆび/さ (shi/yubi/sa) - "SHE POINTS with FINGER!" YUBI = finger! SHIJI = instructions!'
  },
  {
    character: '捕',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '甫', name: 'begin', meaning: 'catch' }],
    components: '扌 (hand) + 甫 (catch)',
    story: 'A HAND (扌) reaching to CATCH (甫) - CATCH! Grabbing. Hand catches = CATCH!',
    hint: 'Hand reaches = catch',
    reading_mnemonic: 'ほ/と/つか (ho/to/tsuka) - "HO! I CATCH you!" TSUKAMAERU = catch! TORAERU = capture!'
  },
  {
    character: '掛',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '圭', name: 'jewel', meaning: 'hang' }],
    components: '扌 (hand) + 圭 (hang)',
    story: 'A HAND (扌) hanging something up (圭) - HANG! Suspending. Hand hangs = HANG!',
    hint: 'Hand hangs = hang',
    reading_mnemonic: 'か/かか/か (ka/kaka/ka) - "KAH! HANG it up!" KAKERU = hang! KAKARU = cost/hang!'
  },
  {
    character: '探',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '深', name: 'deep', meaning: 'deep' }],
    components: '扌 (hand) + deep elements',
    story: 'A HAND (扌) reaching DEEP - SEARCH! Looking for something. Hand reaches deep = SEARCH!',
    hint: 'Hand reaches deep = search',
    reading_mnemonic: 'たん/さが/さぐ (tan/saga/sagu) - "TAN SEARCHES!" SAGASU = search! TANKEN = exploration!'
  },
  {
    character: '支',
    radicals: [{ char: '十', name: 'ten', meaning: 'branch' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: '十 (branch) + 又 (hand)',
    story: 'A HAND (又) holding a BRANCH (十) - SUPPORT! Holding up. Branch support = SUPPORT!',
    hint: 'Hand holds branch = support',
    reading_mnemonic: 'し/ささ (shi/sasa) - "SHE SUPPORTS!" SASAERU = support! SHIEN = aid!'
  },
  {
    character: '放',
    radicals: [{ char: '方', name: 'direction', meaning: 'direction' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: '方 (direction) + 攵 (action)',
    story: 'Action (攵) sending in a DIRECTION (方) - RELEASE! Letting go. Direction action = RELEASE!',
    hint: 'Direction action = release',
    reading_mnemonic: 'ほう/はな (hou/hana) - "HO! RELEASE it!" HANASU = release! HOUSOU = broadcast!'
  },
  {
    character: '政',
    radicals: [{ char: '正', name: 'correct', meaning: 'correct' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: '正 (correct) + 攵 (action)',
    story: 'CORRECT (正) ACTION (攵) - POLITICS! Proper governance. Correct action = POLITICS!',
    hint: 'Correct action = politics',
    reading_mnemonic: 'せい/しょう/まつり (sei/shou/matsuri) - "SAY POLITICS!" SEIJI = politics! GYOUSEI = administration!'
  },
  {
    character: '敗',
    radicals: [{ char: '貝', name: 'shell', meaning: 'money' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: '貝 (money) + 攵 (action)',
    story: 'Action (攵) against MONEY (貝) lost - DEFEAT! Losing everything. Lost money = DEFEAT!',
    hint: 'Lost money = defeat',
    reading_mnemonic: 'はい/やぶ (hai/yabu) - "HIGH loss! DEFEAT!" SHIPPAI = failure! YABURERU = be defeated!'
  },
  {
    character: '散',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '月', name: 'moon', meaning: 'flesh' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: '艹 (grass) + 月 (moon) + 攵 (action)',
    story: 'GRASS (艹) blown by action (攵) - SCATTER! Dispersing. Grass scattered = SCATTER!',
    hint: 'Grass blown = scatter',
    reading_mnemonic: 'さん/ち (san/chi) - "SAN SCATTERS!" CHIRU = scatter! SANPO = walk!'
  },
  {
    character: '数',
    radicals: [{ char: '婁', name: 'weak', meaning: 'stack' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: 'Stack + 攵 (action)',
    story: 'Action (攵) of counting stacks - NUMBER! Counting. Counting action = NUMBER!',
    hint: 'Counting action = number',
    reading_mnemonic: 'すう/かず/かぞ (suu/kazu/kazo) - "SUE counts NUMBERS!" KAZU = number! KAZOERU = count!'
  },
  {
    character: '断',
    radicals: [{ char: '斤', name: 'axe', meaning: 'axe' }, { char: '米', name: 'rice', meaning: 'rice' }, { char: '糸', name: 'thread', meaning: 'threads' }],
    components: '斤 (axe) + threads',
    story: 'An AXE (斤) cutting threads - CUT OFF/DECIDE! Severing. Axe cuts = DECIDE!',
    hint: 'Axe cuts = decide',
    reading_mnemonic: 'だん/た/ことわ (dan/ta/kotowa) - "DAN DECIDES!" KOTOWARU = refuse! HANDAN = judgment!'
  },
  {
    character: '易',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '勿', name: 'not', meaning: 'change' }],
    components: '日 (sun) + 勿 (change)',
    story: 'The SUN (日) that doesn\'t change (勿) - EASY! Simple as day. Unchanging sun = EASY!',
    hint: 'Simple sun = easy',
    reading_mnemonic: 'えき/い/やさ (eki/i/yasa) - "EKI! EASY!" YASASHII = easy! BOUEKI = trade!'
  },
  {
    character: '昔',
    radicals: [{ char: '共', name: 'together', meaning: 'stack' }, { char: '日', name: 'sun', meaning: 'day' }],
    components: 'Stack + 日 (day)',
    story: 'DAYS (日) stacked up - LONG AGO! Past times. Stacked days = LONG AGO!',
    hint: 'Stacked days = long ago',
    reading_mnemonic: 'せき/むかし (seki/mukashi) - "SAKE in the OLD DAYS!" MUKASHI = long ago!'
  },
  {
    character: '昨',
    radicals: [{ char: '日', name: 'sun', meaning: 'day' }, { char: '乍', name: 'while', meaning: 'make' }],
    components: '日 (day) + 乍 (while)',
    story: 'The DAY (日) that just passed - YESTERDAY! Recent past. Day passed = YESTERDAY!',
    hint: 'Day passed = yesterday',
    reading_mnemonic: 'さく (saku) - "SUCK! That was YESTERDAY!" KINOU = yesterday! SAKUYA = last night!'
  },
  {
    character: '晩',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '免', name: 'avoid', meaning: 'exempt' }],
    components: '日 (sun) + 免 (avoid)',
    story: 'When the SUN (日) is AVOIDED (免) - EVENING! Nighttime. No sun = EVENING!',
    hint: 'Avoiding sun = evening',
    reading_mnemonic: 'ばん (ban) - "BAN the sun! It\'s EVENING!" KONBAN = tonight!'
  },
  {
    character: '景',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '京', name: 'capital', meaning: 'capital' }],
    components: '日 (sun) + 京 (capital)',
    story: 'The SUN (日) over the CAPITAL (京) - SCENERY! Beautiful view. Sun over city = SCENERY!',
    hint: 'Sun over capital = scenery',
    reading_mnemonic: 'けい (kei) - "KAY enjoys the SCENERY!" KESHIKI = scenery! FUUKEI = landscape!'
  },
  {
    character: '晴',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '青', name: 'blue', meaning: 'blue' }],
    components: '日 (sun) + 青 (blue)',
    story: 'The SUN (日) in a BLUE (青) sky - CLEAR/SUNNY! Good weather. Blue sun = SUNNY!',
    hint: 'Sun in blue = sunny',
    reading_mnemonic: 'せい/は (sei/ha) - "SAY it\'s SUNNY!" HARERU = clear up! KAISEI = clear weather!'
  },
  {
    character: '暗',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '音', name: 'sound', meaning: 'sound' }],
    components: '日 (sun) + 音 (sound)',
    story: 'When the SUN (日) is blocked and only SOUND (音) - DARK! No light. Blocked sun = DARK!',
    hint: 'Blocked sun = dark',
    reading_mnemonic: 'あん/くら (an/kura) - "AN so DARK!" KURAI = dark! ANKI = memorization!'
  },
  {
    character: '暮',
    radicals: [{ char: '艹', name: 'grass', meaning: 'grass' }, { char: '日', name: 'sun', meaning: 'sun' }, { char: '大', name: 'big', meaning: 'big' }],
    components: '艹 (grass) + 日 (sun) + 大 (big)',
    story: 'The SUN (日) setting over GRASS (艹) - DUSK/LIVELIHOOD! End of day. Setting sun = DUSK!',
    hint: 'Sun over grass = dusk',
    reading_mnemonic: 'ぼ/く (bo/ku) - "BOW to the DUSK!" KURASU = live! YUUGURE = dusk!'
  },
  {
    character: '曲',
    radicals: [{ char: '曲', name: 'bend', meaning: 'bend' }],
    components: 'Bent shape',
    story: 'A shape that BENDS - BEND/TUNE! Curved form. Bent = BEND/TUNE!',
    hint: 'Bent shape = bend',
    reading_mnemonic: 'きょく/ま (kyoku/ma) - "KEY-OKU the TUNE!" KYOKU = tune! MAGARU = bend!'
  },
  {
    character: '更',
    radicals: [{ char: '一', name: 'one', meaning: 'one' }, { char: '日', name: 'sun', meaning: 'day' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: '一 (one) + 日 (day) + 攵 (action)',
    story: 'Action (攵) on a new DAY (日) - RENEW/CHANGE! Refreshing. Day action = RENEW!',
    hint: 'Day action = renew',
    reading_mnemonic: 'こう/さら/ふ (kou/sara/fu) - "CO-ntinue to RENEW!" SARANI = furthermore! FUKERU = grow late!'
  },
  {
    character: '最',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun' }, { char: '取', name: 'take', meaning: 'take' }],
    components: '日 (sun) + 取 (take)',
    story: 'TAKING (取) the SUN (日) - MOST/BEST! The ultimate. Taking sun = MOST!',
    hint: 'Taking sun = most',
    reading_mnemonic: 'さい/もっと (sai/motto) - "SIGH! The MOST!" SAIKOU = best! MOTTOMO = most!'
  },
  {
    character: '望',
    radicals: [{ char: '亡', name: 'death', meaning: 'gone' }, { char: '月', name: 'moon', meaning: 'moon' }, { char: '王', name: 'king', meaning: 'king' }],
    components: '亡 (gone) + 月 (moon) + 王 (king)',
    story: 'Looking at the MOON (月) like a king (王) - HOPE/WISH! Longing. Moon gaze = HOPE!',
    hint: 'Moon gaze = hope',
    reading_mnemonic: 'ぼう/のぞ (bou/nozo) - "BOW with HOPE!" NOZOMU = hope! KIBOU = hope!'
  },
  {
    character: '期',
    radicals: [{ char: '其', name: 'that', meaning: 'that' }, { char: '月', name: 'moon', meaning: 'moon' }],
    components: '其 (that) + 月 (moon)',
    story: 'THAT (其) MOON (月) cycle - PERIOD/EXPECT! Time cycle. Moon cycle = PERIOD!',
    hint: 'Moon cycle = period',
    reading_mnemonic: 'き/ご (ki/go) - "KEY PERIOD!" KIKAN = period! KITAI = expectation!'
  },
  {
    character: '未',
    radicals: [{ char: '木', name: 'tree', meaning: 'tree' }, { char: '一', name: 'one', meaning: 'one' }],
    components: '木 (tree) + 一 (one) at top',
    story: 'A TREE (木) with short branches - NOT YET! Still growing. Short tree = NOT YET!',
    hint: 'Short tree = not yet',
    reading_mnemonic: 'み/いま (mi/ima) - "ME? NOT YET!" MADA = not yet! MIRAI = future!'
  }
]

async function insertBatch() {
  console.log('🏃 N3 BATCH 6: Actions & Movement (30 kanji)')
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
  console.log(`✨ Batch 6 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
