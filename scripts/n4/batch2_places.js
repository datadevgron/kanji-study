/**
 * N4 BATCH 2: Places, Buildings & Directions (30 kanji)
 * 京院堂場屋工建広店度地図町界野道近通遠台室開院集
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/n4/batch2_places.js
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
    character: '京',
    radicals: [{ char: '亠', name: 'lid', meaning: 'top' }, { char: '口', name: 'mouth', meaning: 'building' }, { char: '小', name: 'small', meaning: 'foundation' }],
    components: 'Tall structure',
    story: 'A tall CAPITAL city structure! Picture a grand pagoda or palace in the CAPITAL city. The layers show a towering building befitting a CAPITAL like Tokyo or Kyoto. Tall palace = CAPITAL!',
    hint: 'Tall palace = capital',
    reading_mnemonic: 'きょう/けい (kyou/kei) - "KYOTO is the old CAPITAL!" KYO = Kyoto, the ancient CAPITAL! TOKYO = eastern CAPITAL! KEI = KAY, what a grand CAPITAL!'
  },
  {
    character: '堂',
    radicals: [{ char: '尚', name: 'esteem', meaning: 'high/respect' }, { char: '土', name: 'earth', meaning: 'ground' }],
    components: '尚 (esteem) + 土 (earth)',
    story: 'A place of high ESTEEM (尚) built on EARTH (土) - a HALL! Grand halls and temples are respected buildings. A place where important things happen = HALL!',
    hint: 'Esteemed building = hall',
    reading_mnemonic: 'どう (dou) - "DOH! What a grand HALL!" Homer\'s impressed by the HALL! SHOKUDOU = eating HALL! DOJO = training HALL!'
  },
  {
    character: '場',
    radicals: [{ char: '土', name: 'earth', meaning: 'ground' }, { char: '昜', name: 'sun rising', meaning: 'bright/open' }],
    components: '土 (earth) + 昜 (open/bright)',
    story: 'Open GROUND (土) where the sun shines bright (昜) - a PLACE! An open area, a location, a spot for activities. Open ground = PLACE!',
    hint: 'Open ground = place',
    reading_mnemonic: 'じょう/ば (jou/ba) - "JOE\'s PLACE!" This is JOE\'s spot! Or: "BAH, what a PLACE!" BA = place (like IZA-KA-BA = a place to drink)!'
  },
  {
    character: '屋',
    radicals: [{ char: '尸', name: 'corpse/flag', meaning: 'roof/building' }, { char: '至', name: 'arrive', meaning: 'reach' }],
    components: '尸 (roof) + 至 (arrive)',
    story: 'Under a ROOF (尸) where you ARRIVE (至) - a SHOP or HOUSE! The place you arrive at with a roof = a building, SHOP, or ROOF! Where you end up = SHOP/ROOF!',
    hint: 'Roof to arrive at = shop/roof',
    reading_mnemonic: 'おく/や (oku/ya) - "YA, nice SHOP!" YA, this SHOP is great! PANYA = bread shop! HEYA = room (flat + ya)!'
  },
  {
    character: '建',
    radicals: [{ char: '廴', name: 'long stride', meaning: 'stride' }, { char: '聿', name: 'brush', meaning: 'building up' }],
    components: 'Stride + building up',
    story: 'Taking long strides to BUILD something up - BUILDING! Construction requires effort and steps. The process of BUILDING something = BUILD!',
    hint: 'Striding to build = build',
    reading_mnemonic: 'けん/た (ken/ta) - "KEN BUILDS houses!" Ken is a BUILDER! Or: "TAH-teru!" - "TA-DA! I BUILT it!" TATERU = ta-da-teh-roo, I built it!'
  },
  {
    character: '度',
    radicals: [{ char: '广', name: 'building', meaning: 'shelter' }, { char: '廿', name: 'twenty', meaning: 'measures' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: 'Shelter with measurements',
    story: 'A shelter where you measure DEGREES and TIMES! Temperature DEGREES, counting TIMES - measurements of extent. How many TIMES, what DEGREE = DEGREE/TIME!',
    hint: 'Measuring extent = degree/time',
    reading_mnemonic: 'ど/たび (do/tabi) - "DOH! What DEGREE?" Homer checks the temperature DEGREE! Or: "TAH-BI!" - "Each TIME (TABI), I travel!" TABI = time (occasion)!'
  },
  {
    character: '地',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '也', name: 'also', meaning: 'flat' }],
    components: '土 (earth) + 也 (flat/also)',
    story: 'EARTH (土) that spreads out flat (也) - GROUND! The land beneath your feet, the EARTH\'s surface. Flat earth = GROUND/PLACE!',
    hint: 'Flat earth = ground',
    reading_mnemonic: 'ち/じ (chi/ji) - "CHEESE on the GROUND?" CHI = earth/ground! CHIZU = map (earth + diagram)! JISHIN = earthquake (earth + shake)!'
  },
  {
    character: '図',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'frame' }, { char: '丶', name: 'dot', meaning: 'marks' }],
    components: 'Frame with marks inside',
    story: 'A frame (囗) with marks and plans inside - a DIAGRAM! A MAP shows the world in a frame. Planning drawings = DIAGRAM/MAP!',
    hint: 'Frame with marks = diagram',
    reading_mnemonic: 'ず/と (zu/to) - "ZOO MAP!" A MAP of the ZOO! CHIZU = earth-diagram = MAP! TOSHOKAN = library (drawing + book + building)!'
  },
  {
    character: '町',
    radicals: [{ char: '田', name: 'field', meaning: 'rice field' }, { char: '丁', name: 'block', meaning: 'block/ward' }],
    components: '田 (field) + 丁 (block)',
    story: 'FIELDS (田) divided into BLOCKS (丁) - a TOWN! Towns started as farming areas divided into sections. Organized fields = TOWN!',
    hint: 'Fields in blocks = town',
    reading_mnemonic: 'ちょう/まち (chou/machi) - "CHOW down in TOWN!" Eat CHOW in the TOWN! Or: "MAH-CHI!" - "MA, CHIldren play in TOWN!" MACHI = ma-chee, town!'
  },
  {
    character: '界',
    radicals: [{ char: '田', name: 'field', meaning: 'field' }, { char: '介', name: 'between', meaning: 'boundary' }],
    components: '田 (field) + 介 (between)',
    story: 'The BOUNDARY (介) BETWEEN FIELDS (田) - the edge of a WORLD! Where one field ends and another begins. Borders define the WORLD = WORLD/BOUNDARY!',
    hint: 'Boundary between fields = world',
    reading_mnemonic: 'かい (kai) - "KAI knows the WORLD!" KAI explores every WORLD! SEKAI = generation + boundary = the WORLD! KAIKAI = boundary boundary = limits!'
  },
  {
    character: '野',
    radicals: [{ char: '里', name: 'village', meaning: 'village/field' }, { char: '予', name: 'beforehand', meaning: 'wild' }],
    components: '里 (village) + 予 (wild area)',
    story: 'Beyond the VILLAGE (里), the wild (予) area - FIELD! The open areas outside town, the PLAINS. Wild open space = FIELD/WILD!',
    hint: 'Wild area beyond village = field',
    reading_mnemonic: 'や/の (ya/no) - "NO way, that FIELD is huge!" NO = wild field! YASEI = wild nature! NOHARA = plain field!'
  },
  {
    character: '通',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '甬', name: 'path', meaning: 'tube/path' }],
    components: '辶 (movement) + 甬 (path)',
    story: 'MOVEMENT (辶) through a PATH (甬) - PASS THROUGH! When you PASS, you go through. A road that lets you PASS = PASS/COMMUTE!',
    hint: 'Movement through path = pass',
    reading_mnemonic: 'つう/とお/かよ (tsuu/too/kayo) - "TOO far to PASS through!" It\'s TOO far! TSUUKIN = commuting! TOORU = pass through! KAYOU = attend (pass through regularly)!'
  },
  {
    character: '近',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '斤', name: 'axe', meaning: 'near distance' }],
    components: '辶 (movement) + 斤 (axe throw)',
    story: 'Only an AXE throw (斤) away on the ROAD (辶) - that\'s NEAR! Close enough to hit with a thrown axe. Short distance = NEAR!',
    hint: 'Axe throw distance = near',
    reading_mnemonic: 'きん/ちか (kin/chika) - "KIN live NEARBY!" Your KIN (relatives) are NEAR! Or: "CHEE-KAH!" - "CHEE-KAH! So CLOSE!" CHIKAI = chee-kah-ee, near!'
  },
  {
    character: '遠',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '袁', name: 'long robe', meaning: 'extended' }],
    components: '辶 (movement) + 袁 (extended)',
    story: 'MOVEMENT (辶) over an EXTENDED (袁) distance - FAR! A long journey stretching out far. Extended road = FAR!',
    hint: 'Extended movement = far',
    reading_mnemonic: 'えん/とお (en/too) - "END is FAR away!" The END seems so FAR! Or: "TOO-ee!" - "TOO far!" TOOI = too-ee, it\'s far!'
  },
  {
    character: '開',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '开', name: 'open', meaning: 'open' }],
    components: '門 (gate) + 开 (hands opening)',
    story: 'Hands (开) pushing a GATE (門) - OPEN! When you push the gate doors apart, you OPEN it. Gate + hands = OPEN!',
    hint: 'Pushing gate open = open',
    reading_mnemonic: 'かい/あ/ひら (kai/a/hira) - "KAI OPENS the door!" KAI pushes it OPEN! Or: "AH-keru!" - "AH! I can OPEN it!" AKERU = ah-keh-roo, open it! HIRAKU = spread open!'
  },
  {
    character: '集',
    radicals: [{ char: '隹', name: 'bird', meaning: 'bird' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '隹 (bird) + 木 (tree)',
    story: 'BIRDS (隹) GATHERING in a TREE (木) - COLLECT! Birds flock together in trees. When things come together = GATHER/COLLECT!',
    hint: 'Birds in tree = gather',
    reading_mnemonic: 'しゅう/あつ (shuu/atsu) - "SHOE collection!" COLLECT all the SHOEs! Or: "AH-TSU-maru!" - "AH! Tsunami GATHERS!" ATSUMARU = ah-tsu-mah-roo, gather!'
  },
  {
    character: '台',
    radicals: [{ char: '厶', name: 'private', meaning: 'self' }, { char: '口', name: 'mouth', meaning: 'platform' }],
    components: 'Self on platform',
    story: 'Standing on a raised PLATFORM (口) - a STAND or COUNTER! A raised surface for machines, a pedestal. Raised platform = STAND/COUNTER!',
    hint: 'Raised platform = stand/counter',
    reading_mnemonic: 'たい/だい (tai/dai) - "TIE it to the STAND!" TIE things on the COUNTER! BUTAI = stage (dance + stand)! DAIDOKORO = kitchen (stand + place)!'
  },
  {
    character: '室',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '至', name: 'arrive', meaning: 'reach' }],
    components: '宀 (roof) + 至 (arrive)',
    story: 'Under a ROOF (宀) where you ARRIVE (至) to stay - a ROOM! The place you reach and rest under a roof. Arrive at roof = ROOM!',
    hint: 'Arrive under roof = room',
    reading_mnemonic: 'しつ (shitsu) - "SHEETS in the ROOM!" Change the SHEETS in your ROOM! KYOUSHITSU = classroom! SHITSUMON = question (room + ask)!'
  },
  {
    character: '社',
    radicals: [{ char: '礻', name: 'spirit', meaning: 'altar/god' }, { char: '土', name: 'earth', meaning: 'ground' }],
    components: '礻 (altar) + 土 (earth)',
    story: 'An ALTAR (礻) on the EARTH (土) - a SHRINE or COMPANY! People gather at shrines, just like they gather at companies. Sacred gathering place = SHRINE/COMPANY!',
    hint: 'Altar on earth = shrine/company',
    reading_mnemonic: 'しゃ/やしろ (sha/yashiro) - "SHA-ll we visit the SHRINE?" Let\'s go to the COMPANY! KAISHA = company! JINJA = Shinto shrine!'
  },
  {
    character: '公',
    radicals: [{ char: '八', name: 'eight', meaning: 'divide/share' }, { char: '厶', name: 'private', meaning: 'private' }],
    components: '八 (share) + 厶 (private)',
    story: 'SHARING (八) what was PRIVATE (厶) - PUBLIC! When private things are shared, they become PUBLIC. Opening up = PUBLIC!',
    hint: 'Sharing private = public',
    reading_mnemonic: 'こう/おおやけ (kou/ooyake) - "COW in PUBLIC!" A COW in the PUBLIC park! KOUKYOU = public! KOUEN = public park!'
  },
  {
    character: '私',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '厶', name: 'private', meaning: 'private/self' }],
    components: '禾 (grain) + 厶 (private)',
    story: 'My PRIVATE (厶) GRAIN (禾) - that belongs to ME! What\'s privately yours = I/ME/PRIVATE. My own grain = PRIVATE/I!',
    hint: 'Private grain = I/private',
    reading_mnemonic: 'し/わたし/わたくし (shi/watashi/watakushi) - "SHE is ME? I am WATASHI!" I am WATASHI! WATASHI = wa-ta-shi, that\'s ME! SHIYUU = private ownership!'
  },
  {
    character: '研',
    radicals: [{ char: '石', name: 'stone', meaning: 'stone' }, { char: '开', name: 'open', meaning: 'polish' }],
    components: '石 (stone) + 开 (polish)',
    story: 'POLISHING (开) a STONE (石) - RESEARCH! To research is to polish ideas until they shine. Grinding and refining = RESEARCH/POLISH!',
    hint: 'Polishing stone = research',
    reading_mnemonic: 'けん (ken) - "KEN does RESEARCH!" Ken POLISHES his research! KENKYUU = research! KENKYUUSHA = researcher!'
  },
  {
    character: '究',
    radicals: [{ char: '穴', name: 'hole', meaning: 'cave' }, { char: '九', name: 'nine', meaning: 'ultimate' }],
    components: '穴 (cave) + 九 (nine/ultimate)',
    story: 'Going to the ULTIMATE (九) depth of a CAVE (穴) - INVESTIGATE! To study deeply, to explore thoroughly. Deep exploration = RESEARCH/INVESTIGATE!',
    hint: 'Deepest cave = investigate',
    reading_mnemonic: 'きゅう (kyuu) - "QUEUE to INVESTIGATE!" Line up in a QUEUE to do RESEARCH! KENKYUU = research (polish + investigate)!'
  },
  {
    character: '院',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill/city' }, { char: '完', name: 'complete', meaning: 'complete' }],
    components: '阝 (hill/city) + 完 (complete)',
    story: 'A COMPLETE (完) building on a HILL (阝) - an INSTITUTION! Hospitals, temples, schools on hillsides. Complete building = INSTITUTION!',
    hint: 'Complete building on hill = institution',
    reading_mnemonic: 'いん (in) - "IN the INSTITUTION!" Go IN the hospital! BYOUIN = hospital! DAIGAKUIN = graduate school!'
  },
  {
    character: '映',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun/light' }, { char: '央', name: 'center', meaning: 'center' }],
    components: '日 (sun) + 央 (center)',
    story: 'SUN/light (日) at the CENTER (央) - REFLECT/PROJECT! Light centered and projected makes images. Projecting light = REFLECT/MOVIE!',
    hint: 'Light projected = reflect/movie',
    reading_mnemonic: 'えい/うつ/は (ei/utsu/ha) - "A MOVIE!" EI-GA = movie! Light REFLECTS and projects on screen! EIGA = movie (reflect + picture)!'
  },
  {
    character: '画',
    radicals: [{ char: '一', name: 'one', meaning: 'frame' }, { char: '田', name: 'field', meaning: 'sections' }],
    components: 'Frame with sections',
    story: 'A framed FIELD (田) divided into sections - a PICTURE! Paintings are framed with divided compositions. Framed sections = PICTURE/PLAN!',
    hint: 'Framed sections = picture',
    reading_mnemonic: 'が/かく/え (ga/kaku/e) - "GAH! What a PICTURE!" GAH, beautiful! EIGA = movie (reflect + picture)! MANGA = comic (random + picture)!'
  },
  {
    character: '館',
    radicals: [{ char: '食', name: 'eat', meaning: 'food' }, { char: '官', name: 'government', meaning: 'official building' }],
    components: '食 (food) + 官 (official)',
    story: 'An official building (官) where FOOD (食) is served - a large BUILDING/HALL! Hotels, restaurants, museums - large public buildings. Big building = BUILDING/HALL!',
    hint: 'Official food building = hall',
    reading_mnemonic: 'かん (kan) - "CAN I visit the BUILDING?" CAN we go to the museum? TOSHOKAN = library! BIJUTSUKAN = art museum!'
  },
  {
    character: '験',
    radicals: [{ char: '馬', name: 'horse', meaning: 'horse' }, { char: '僉', name: 'all', meaning: 'everyone tests' }],
    components: '馬 (horse) + 僉 (all test)',
    story: 'Testing a HORSE (馬) - checking if everyone (僉) passes - EXPERIMENT/TEST! Examining and testing things. Testing = EXPERIMENT/TEST!',
    hint: 'Testing horse = experiment',
    reading_mnemonic: 'けん (ken) - "KEN takes the TEST!" Ken does the EXPERIMENT! SHIKEN = exam! KEIKEN = experience (pass through + test)!'
  },
  {
    character: '駅',
    radicals: [{ char: '馬', name: 'horse', meaning: 'horse' }, { char: '尺', name: 'measure', meaning: 'unit' }],
    components: '馬 (horse) + 尺 (measured distance)',
    story: 'Where HORSES (馬) stop at measured (尺) intervals - a STATION! Post stations where horses were changed. Now trains stop at STATIONS!',
    hint: 'Horse stop points = station',
    reading_mnemonic: 'えき (eki) - "ICKY STATION!" This STATION is ICKY! Clean up the EKI! EKIMAE = in front of station!'
  }
]

async function insertBatch() {
  console.log('🏛️ N4 BATCH 2: Places, Buildings & Directions (30 kanji)')
  console.log('=' .repeat(50) + '\n')
  
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
  
  console.log('\n' + '=' .repeat(50))
  console.log(`✨ Batch 2 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
