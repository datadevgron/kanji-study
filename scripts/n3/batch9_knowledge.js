/**
 * N3 BATCH 9: Knowledge & Learning (30 kanji)
 * 破確示礼祖神福科程種積突窓笑等箱米精約組経給絵絶続緒罪置
 * 
 * Run: node scripts/n3/batch9_knowledge.js
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
    character: '破',
    radicals: [{ char: '石', name: 'stone', meaning: 'stone' }, { char: '皮', name: 'skin', meaning: 'skin' }],
    components: '石 (stone) + 皮 (skin)',
    story: 'STONE (石) breaking through SKIN (皮) - BREAK/DESTROY! Shattering. Stone breaks = BREAK!',
    hint: 'Stone breaks = break',
    reading_mnemonic: 'は/やぶ (ha/yabu) - "HA! BREAK it!" YABURU = break! HAKAI = destruction!'
  },
  {
    character: '確',
    radicals: [{ char: '石', name: 'stone', meaning: 'stone' }, { char: '隹', name: 'bird', meaning: 'bird' }],
    components: '石 (stone) + 隹 (bird)',
    story: 'Solid as STONE (石), sure as a bird (隹) landing - CERTAIN! Sure. Stone sure = CERTAIN!',
    hint: 'Stone sure = certain',
    reading_mnemonic: 'かく/たし (kaku/tashi) - "KAKU CERTAIN!" TASHIKA = certain! KAKUNIN = confirmation!'
  },
  {
    character: '示',
    radicals: [{ char: '示', name: 'show', meaning: 'altar' }],
    components: 'Altar revealing',
    story: 'An altar revealing to others - SHOW/INDICATE! Display. Altar shows = SHOW!',
    hint: 'Altar shows = show',
    reading_mnemonic: 'し/じ/しめ (shi/ji/shime) - "SHE SHOWS!" SHIMESU = show! TEIJI = presentation!'
  },
  {
    character: '礼',
    radicals: [{ char: '礻', name: 'altar', meaning: 'spirit' }, { char: '乚', name: 'hook', meaning: 'bow' }],
    components: '礻 (spirit) + 乚 (bow)',
    story: 'BOWING (乚) at the ALTAR (礻) - COURTESY/BOW! Politeness. Altar bow = COURTESY!',
    hint: 'Altar bow = courtesy',
    reading_mnemonic: 'れい/らい (rei/rai) - "RAY of COURTESY!" OREI = thanks! SHITSUREISHIMASU = excuse me!'
  },
  {
    character: '祖',
    radicals: [{ char: '礻', name: 'altar', meaning: 'spirit' }, { char: '且', name: 'moreover', meaning: 'pile' }],
    components: '礻 (spirit) + 且 (pile)',
    story: 'SPIRITS (礻) piled up (且) through generations - ANCESTOR! Heritage. Spirit pile = ANCESTOR!',
    hint: 'Spirit pile = ancestor',
    reading_mnemonic: 'そ (so) - "SO! My ANCESTOR!" SOFU = grandfather! SENZO = ancestors!'
  },
  {
    character: '神',
    radicals: [{ char: '礻', name: 'altar', meaning: 'spirit' }, { char: '申', name: 'say', meaning: 'lightning' }],
    components: '礻 (spirit) + 申 (lightning)',
    story: 'SPIRIT (礻) speaking through LIGHTNING (申) - GOD! Divine. Spirit lightning = GOD!',
    hint: 'Spirit lightning = god',
    reading_mnemonic: 'しん/じん/かみ (shin/jin/kami) - "SHIN is GOD!" KAMI = god! JINJA = shrine!'
  },
  {
    character: '福',
    radicals: [{ char: '礻', name: 'altar', meaning: 'spirit' }, { char: '畐', name: 'full', meaning: 'full' }],
    components: '礻 (spirit) + 畐 (full)',
    story: 'SPIRIT (礻) blessing you FULL (畐) - FORTUNE/BLESSING! Luck. Spirit full = FORTUNE!',
    hint: 'Spirit full = fortune',
    reading_mnemonic: 'ふく (fuku) - "FUKU is FORTUNE!" KOUFUKU = happiness! SHIFUKU = bliss!'
  },
  {
    character: '科',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '斗', name: 'dipper', meaning: 'measure' }],
    components: '禾 (grain) + 斗 (measure)',
    story: 'MEASURING (斗) GRAIN (禾) - SUBJECT/DEPARTMENT! Classification. Measure grain = SUBJECT!',
    hint: 'Measure grain = subject',
    reading_mnemonic: 'か (ka) - "KA! SUBJECT!" KAGAKU = science! KYOUKA = subject!'
  },
  {
    character: '程',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '呈', name: 'display', meaning: 'present' }],
    components: '禾 (grain) + 呈 (present)',
    story: 'GRAIN (禾) presented (呈) in degrees - EXTENT/DEGREE! Amount. Grain degree = EXTENT!',
    hint: 'Grain degree = extent',
    reading_mnemonic: 'てい/ほど (tei/hodo) - "TAY EXTENT!" HODO = extent! KATEI = process!'
  },
  {
    character: '種',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '重', name: 'heavy', meaning: 'heavy' }],
    components: '禾 (grain) + 重 (heavy)',
    story: 'HEAVY (重) GRAIN (禾) - SEED/KIND! Type. Heavy grain = SEED!',
    hint: 'Heavy grain = seed',
    reading_mnemonic: 'しゅ/たね (shu/tane) - "SHOE SEED!" TANE = seed! SHURUI = kind!'
  },
  {
    character: '積',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '責', name: 'blame', meaning: 'pile' }],
    components: '禾 (grain) + 責 (pile)',
    story: 'GRAIN (禾) piled up (責) - ACCUMULATE! Stack. Grain piled = ACCUMULATE!',
    hint: 'Grain piled = accumulate',
    reading_mnemonic: 'せき/つ (seki/tsu) - "SEKI ACCUMULATES!" TSUMU = pile up! MENSEKI = area!'
  },
  {
    character: '突',
    radicals: [{ char: '穴', name: 'hole', meaning: 'hole' }, { char: '大', name: 'big', meaning: 'big' }],
    components: '穴 (hole) + 大 (big)',
    story: 'Something BIG (大) bursting through a HOLE (穴) - THRUST/突然! Sudden. Hole burst = THRUST!',
    hint: 'Hole burst = thrust',
    reading_mnemonic: 'とつ/つ (totsu/tsu) - "TOTS THRUST!" TSUKU = thrust! TOTSUZEN = suddenly!'
  },
  {
    character: '窓',
    radicals: [{ char: '穴', name: 'hole', meaning: 'hole' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '穴 (hole) + 心 (heart)',
    story: 'A HOLE (穴) to let HEART (心) see out - WINDOW! Opening. Heart hole = WINDOW!',
    hint: 'Heart hole = window',
    reading_mnemonic: 'そう/まど (sou/mado) - "SO! A WINDOW!" MADO = window! MADOGUCHI = counter!'
  },
  {
    character: '笑',
    radicals: [{ char: '竹', name: 'bamboo', meaning: 'bamboo' }, { char: '夭', name: 'young', meaning: 'young' }],
    components: '竹 (bamboo) + 夭 (young)',
    story: 'BAMBOO (竹) bending like a young (夭) person - LAUGH! Smiling. Bent bamboo = LAUGH!',
    hint: 'Bent bamboo = laugh',
    reading_mnemonic: 'しょう/わら/え (shou/wara/e) - "SHOW your LAUGH!" WARAU = laugh! EMU = smile!'
  },
  {
    character: '等',
    radicals: [{ char: '竹', name: 'bamboo', meaning: 'bamboo' }, { char: '寺', name: 'temple', meaning: 'temple' }],
    components: '竹 (bamboo) + 寺 (temple)',
    story: 'BAMBOO (竹) sections at a TEMPLE (寺) - EQUAL/RANK! Same. Bamboo equal = EQUAL!',
    hint: 'Bamboo equal = equal',
    reading_mnemonic: 'とう/ひと (tou/hito) - "TOE EQUAL!" BYOUDOU = equality! NADO = etc!'
  },
  {
    character: '箱',
    radicals: [{ char: '竹', name: 'bamboo', meaning: 'bamboo' }, { char: '相', name: 'mutual', meaning: 'together' }],
    components: '竹 (bamboo) + 相 (together)',
    story: 'BAMBOO (竹) woven TOGETHER (相) - BOX! Container. Woven bamboo = BOX!',
    hint: 'Woven bamboo = box',
    reading_mnemonic: 'そう/はこ (sou/hako) - "SO! A BOX!" HAKO = box!'
  },
  {
    character: '米',
    radicals: [{ char: '米', name: 'rice', meaning: 'rice' }],
    components: 'Grains spreading',
    story: 'Grains spreading from a stalk - RICE! Grain. Spreading grain = RICE!',
    hint: 'Spreading grain = rice',
    reading_mnemonic: 'べい/まい/こめ (bei/mai/kome) - "BAY of RICE!" KOME = rice! BEIKOKU = America!'
  },
  {
    character: '精',
    radicals: [{ char: '米', name: 'rice', meaning: 'rice' }, { char: '青', name: 'blue', meaning: 'blue' }],
    components: '米 (rice) + 青 (blue)',
    story: 'RICE (米) that is pure BLUE (青) - SPIRIT/REFINED! Essence. Pure rice = SPIRIT!',
    hint: 'Pure rice = spirit',
    reading_mnemonic: 'せい/しょう (sei/shou) - "SAY SPIRIT!" SEISHIN = spirit! SEIMITSU = precision!'
  },
  {
    character: '約',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '勺', name: 'ladle', meaning: 'measure' }],
    components: '糸 (thread) + 勺 (measure)',
    story: 'THREAD (糸) measured (勺) for a deal - PROMISE/APPROXIMATELY! Agreement. Thread deal = PROMISE!',
    hint: 'Thread deal = promise',
    reading_mnemonic: 'やく (yaku) - "YACK PROMISE!" YAKUSOKU = promise! YOYAKU = reservation!'
  },
  {
    character: '組',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '且', name: 'moreover', meaning: 'pile' }],
    components: '糸 (thread) + 且 (pile)',
    story: 'THREADS (糸) piled (且) together - GROUP/ASSEMBLE! Team. Threads grouped = GROUP!',
    hint: 'Threads grouped = group',
    reading_mnemonic: 'そ/く (so/ku) - "SO! GROUP!" KUMI = group! SOSHIKI = organization!'
  },
  {
    character: '経',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '圣', name: 'pass through', meaning: 'through' }],
    components: '糸 (thread) + 圣 (through)',
    story: 'THREAD (糸) passing THROUGH (圣) time - PASS/EXPERIENCE! Progress. Thread through = PASS!',
    hint: 'Thread through = pass',
    reading_mnemonic: 'けい/きょう/へ/た (kei/kyou/he/ta) - "KAY PASSES through!" KEIKEN = experience! KEIZAI = economy!'
  },
  {
    character: '給',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '合', name: 'fit', meaning: 'meet' }],
    components: '糸 (thread) + 合 (meet)',
    story: 'THREADS (糸) MEETING (合) needs - SUPPLY/SALARY! Provide. Thread meets = SUPPLY!',
    hint: 'Thread meets = supply',
    reading_mnemonic: 'きゅう (kyuu) - "QUE SALARY!" KYUURYOU = salary! KYUUSHOKU = school lunch!'
  },
  {
    character: '絵',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '会', name: 'meet', meaning: 'meet' }],
    components: '糸 (thread) + 会 (meet)',
    story: 'THREADS (糸) MEETING (会) as colors - PICTURE! Art. Thread colors = PICTURE!',
    hint: 'Thread colors = picture',
    reading_mnemonic: 'え/かい (e/kai) - "AY! A PICTURE!" E = picture! KAIGA = painting!'
  },
  {
    character: '絶',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '色', name: 'color', meaning: 'color' }],
    components: '糸 (thread) + 色 (color)',
    story: 'THREAD (糸) COLOR (色) cut off - SEVER/DISCONTINUE! End. Thread cut = SEVER!',
    hint: 'Thread cut = sever',
    reading_mnemonic: 'ぜつ/た (zetsu/ta) - "ZET SEVER!" TAERU = cease! ZETTAI = absolute!'
  },
  {
    character: '続',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '売', name: 'sell', meaning: 'sell' }],
    components: '糸 (thread) + 売 (sell)',
    story: 'THREAD (糸) that keeps going like sales - CONTINUE! Ongoing. Thread goes = CONTINUE!',
    hint: 'Thread goes = continue',
    reading_mnemonic: 'ぞく/つづ (zoku/tsuzu) - "ZOKU CONTINUES!" TSUZUKU = continue! RENZOKU = continuous!'
  },
  {
    character: '緒',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '者', name: 'person', meaning: 'person' }],
    components: '糸 (thread) + 者 (person)',
    story: 'THREAD (糸) connecting PEOPLE (者) - BEGINNING/TOGETHER! Start. Thread connects = TOGETHER!',
    hint: 'Thread connects = together',
    reading_mnemonic: 'しょ/お (sho/o) - "SHOW TOGETHER!" ISSHO = together! NAWA = cord!'
  },
  {
    character: '罪',
    radicals: [{ char: '网', name: 'net', meaning: 'net' }, { char: '非', name: 'not', meaning: 'wrong' }],
    components: '网 (net) + 非 (wrong)',
    story: 'Caught in a NET (网) for being WRONG (非) - SIN/CRIME! Guilt. Net wrong = SIN!',
    hint: 'Net wrong = sin',
    reading_mnemonic: 'ざい/つみ (zai/tsumi) - "ZAI! CRIME!" TSUMI = crime! HANZAI = crime!'
  },
  {
    character: '置',
    radicals: [{ char: '网', name: 'net', meaning: 'net' }, { char: '直', name: 'straight', meaning: 'straight' }],
    components: '网 (net) + 直 (straight)',
    story: 'Setting a NET (网) STRAIGHT (直) - PUT/PLACE! Position. Net straight = PUT!',
    hint: 'Net straight = put',
    reading_mnemonic: 'ち/お (chi/o) - "CHI! PUT it!" OKU = put! ICHI = position!'
  },
  {
    character: '美',
    radicals: [{ char: '羊', name: 'sheep', meaning: 'sheep' }, { char: '大', name: 'big', meaning: 'big' }],
    components: '羊 (sheep) + 大 (big)',
    story: 'A BIG (大) SHEEP (羊) is valuable - BEAUTIFUL! Pretty. Big sheep = BEAUTIFUL!',
    hint: 'Big sheep = beautiful',
    reading_mnemonic: 'び/うつく (bi/utsuku) - "BE BEAUTIFUL!" UTSUKUSHII = beautiful! BIJIN = beautiful person!'
  },
  {
    character: '老',
    radicals: [{ char: '耂', name: 'old', meaning: 'old' }, { char: '匕', name: 'spoon', meaning: 'change' }],
    components: '耂 (old) + 匕 (change)',
    story: 'A person with a cane - OLD! Elderly. Cane = OLD!',
    hint: 'Cane = old',
    reading_mnemonic: 'ろう/お (rou/o) - "ROW is OLD!" OIRU = grow old! ROUJIN = old person!'
  }
]

async function insertBatch() {
  console.log('📚 N3 BATCH 9: Knowledge & Learning (30 kanji)')
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
  console.log(`✨ Batch 9 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
