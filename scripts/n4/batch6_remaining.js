/**
 * N4 BATCH 6: Remaining N4 kanji (46 kanji)
 * Covers remaining kanji not in batches 1-5
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/n4/batch6_remaining.js
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
    character: '工',
    radicals: [{ char: '工', name: 'craft', meaning: 'work' }],
    components: 'I-beam or tool shape',
    story: 'A carpentry tool, an I-beam shape - CRAFT/WORK! The shape of a construction tool. Tool shape = CRAFT!',
    hint: 'Tool shape = craft',
    reading_mnemonic: 'こう/く (kou/ku) - "COW does CONSTRUCTION!" KOUGAKU = engineering! KOUJOU = factory!'
  },
  {
    character: '口',
    radicals: [{ char: '口', name: 'mouth', meaning: 'opening' }],
    components: 'Square opening',
    story: 'An open square - MOUTH! The shape of an open mouth. Open square = MOUTH!',
    hint: 'Open square = mouth',
    reading_mnemonic: 'こう/くち (kou/kuchi) - "COO-CHI MOUTH!" KUCHI = koo-chee, mouth! IRIGUCHI = entrance!'
  },
  {
    character: '古',
    radicals: [{ char: '十', name: 'ten', meaning: 'ten' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '十 (ten) + 口 (mouth)',
    story: 'TEN (十) generations of MOUTHS (口) speaking - OLD! Stories passed down for ten generations. Ten mouths = OLD!',
    hint: 'Ten generations = old',
    reading_mnemonic: 'こ/ふる (ko/furu) - "CO-llecting OLD stuff!" KODAI = ancient! Or: "FOO-ROO!" - "FOO! It\'s OLD!" FURUI = foo-roo-ee, old!'
  },
  {
    character: '目',
    radicals: [{ char: '目', name: 'eye', meaning: 'eye' }],
    components: 'Eye shape with pupil',
    story: 'An EYE turned sideways with the pupil inside - EYE! Picture an eye rotated 90 degrees. Sideways eye = EYE!',
    hint: 'Sideways eye = eye',
    reading_mnemonic: 'もく/め (moku/me) - "MOCK the EYE!" ME = meh, eye! MOKUTEKI = purpose (eye + target)!'
  },
  {
    character: '空',
    radicals: [{ char: '穴', name: 'hole', meaning: 'cave' }, { char: '工', name: 'craft', meaning: 'work' }],
    components: '穴 (cave) + 工 (craft)',
    story: 'A CAVE (穴) that\'s been CRAFTED (工) empty - SKY/EMPTY! The open sky is an empty space above. Empty space = SKY!',
    hint: 'Empty cave = sky',
    reading_mnemonic: 'くう/そら/あ/から (kuu/sora/a/kara) - "COO! The SKY!" KUUKI = air! SORA = sky! AKU = open! KARA = empty!'
  },
  {
    character: '立',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }],
    components: 'Person standing on ground',
    story: 'A person STANDING with feet on the ground line - STAND! The shape of someone upright. Standing figure = STAND!',
    hint: 'Standing figure = stand',
    reading_mnemonic: 'りつ/た (ritsu/ta) - "RITZ STANDS tall!" JIRITSU = independence! Or: "TAH-tsu!" - "TA-DA! I STAND!" TATSU = stand!'
  },
  {
    character: '花',
    radicals: [{ char: '艹', name: 'grass', meaning: 'plant' }, { char: '化', name: 'change', meaning: 'transform' }],
    components: '艹 (grass) + 化 (transform)',
    story: 'A PLANT (艹) that TRANSFORMS (化) into beauty - FLOWER! Plants transform into beautiful flowers. Plant transform = FLOWER!',
    hint: 'Plant transforms = flower',
    reading_mnemonic: 'か/はな (ka/hana) - "KAH! Beautiful FLOWER!" HANAMI = flower viewing! HANA = hah-nah, flower!'
  },
  {
    character: '走',
    radicals: [{ char: '土', name: 'earth', meaning: 'ground' }, { char: '止', name: 'stop', meaning: 'foot' }],
    components: '土 (ground) + 止 (foot) + motion',
    story: 'FEET (止) moving fast on GROUND (土) - RUN! Running across the earth. Feet on ground = RUN!',
    hint: 'Feet on ground = run',
    reading_mnemonic: 'そう/はし (sou/hashi) - "SO fast, I RUN!" KYOUSOU = race! Or: "HAH-SHEE-roo!" - "HA! SHE RUNS!" HASHIRU = run!'
  },
  {
    character: '起',
    radicals: [{ char: '走', name: 'run', meaning: 'run' }, { char: '己', name: 'self', meaning: 'self' }],
    components: '走 (run) + 己 (self)',
    story: 'The SELF (己) starting to RUN (走) - WAKE/RISE! Getting yourself up and moving. Self starting = RISE!',
    hint: 'Self starting = rise',
    reading_mnemonic: 'き/お (ki/o) - "KEY to RISING!" KIGEN = origin! Or: "OH-kee!" - "OH-KEY! I WOKE UP!" OKIRU = wake up!'
  },
  {
    character: '足',
    radicals: [{ char: '口', name: 'mouth', meaning: 'knee' }, { char: '止', name: 'stop', meaning: 'foot' }],
    components: 'Knee + foot',
    story: 'The KNEE (口) and FOOT (止) together - FOOT/LEG! The lower limb with knee and foot. Leg parts = FOOT!',
    hint: 'Knee + foot = leg',
    reading_mnemonic: 'そく/あし/た (soku/ashi/ta) - "SOCK on FOOT!" SOKUDO = speed! ASHI = ah-she, foot/leg! TARIRU = be enough!'
  },
  {
    character: '手',
    radicals: [{ char: '手', name: 'hand', meaning: 'hand' }],
    components: 'Hand with fingers',
    story: 'A HAND with fingers spread out - HAND! The shape shows the palm and fingers. Fingers spread = HAND!',
    hint: 'Fingers spread = hand',
    reading_mnemonic: 'しゅ/て (shu/te) - "SHOE on my HAND?" TE = teh, hand! SHUWA = sign language!'
  },
  {
    character: '飯',
    radicals: [{ char: '食', name: 'eat', meaning: 'food' }, { char: '反', name: 'anti', meaning: 'opposite' }],
    components: '食 (food) + 反 (opposite)',
    story: 'FOOD (食) that fills the OPPOSITE (反) of hunger - MEAL/RICE! The food that satisfies. Hunger opposite = MEAL!',
    hint: 'Hunger opposite = meal',
    reading_mnemonic: 'はん/めし (han/meshi) - "HAN Solo eats his MEAL!" HAN = meal! Or: "MEH-SHE!" - "MEH SHE needs a MEAL!" GOHAN = cooked rice/meal!'
  },
  {
    character: '飲',
    radicals: [{ char: '食', name: 'eat', meaning: 'food/consume' }, { char: '欠', name: 'yawn', meaning: 'open mouth' }],
    components: '食 (consume) + 欠 (open mouth)',
    story: 'OPENING your MOUTH (欠) to CONSUME (食) liquid - DRINK! Tipping your head back to drink. Open mouth consume = DRINK!',
    hint: 'Open mouth consume = drink',
    reading_mnemonic: 'いん/の (in/no) - "IN goes the DRINK!" Drink goes IN! Or: "NOH-moo!" - "NO MOO? Then DRINK water!" NOMU = drink!'
  },
  {
    character: '新',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }, { char: '木', name: 'tree', meaning: 'tree' }, { char: '斤', name: 'axe', meaning: 'axe' }],
    components: '立 (stand) + 木 (tree) + 斤 (axe)',
    story: 'An AXE (斤) cutting a STANDING TREE (立木) - NEW! Fresh cut wood is new. Fresh cut = NEW!',
    hint: 'Fresh cut tree = new',
    reading_mnemonic: 'しん/あたら/あら (shin/atara/ara) - "SHEEN is NEW!" That SHEEN is NEW! Or: "AH-TAH-RAH-shee!" - "AH! TOTALLY NEW!" ATARASHII = new!'
  },
  {
    character: '方',
    radicals: [{ char: '方', name: 'direction', meaning: 'direction' }],
    components: 'Person walking in direction',
    story: 'A person heading in a DIRECTION - DIRECTION/WAY! The way someone is going. Heading = DIRECTION!',
    hint: 'Heading = direction',
    reading_mnemonic: 'ほう/かた (hou/kata) - "HOW do I go that WAY?" HOUHOU = method! Or: "KAH-TAH!" - "KA-TAH! That PERSON!" KATA = person/way!'
  },
  {
    character: '広',
    radicals: [{ char: '广', name: 'building', meaning: 'shelter' }, { char: '厶', name: 'private', meaning: 'spread' }],
    components: '广 (shelter) + 厶 (spread)',
    story: 'A SHELTER (广) that SPREADS (厶) out - WIDE! A broad covering. Spread shelter = WIDE!',
    hint: 'Spread shelter = wide',
    reading_mnemonic: 'こう/ひろ (kou/hiro) - "COW\'s WIDE field!" KOUKOU = vast! Or: "HEE-ROH!" - "HERO is WIDE!" HIROI = wide!'
  },
  {
    character: '田',
    radicals: [{ char: '田', name: 'field', meaning: 'rice field' }],
    components: 'Divided rice field',
    story: 'A FIELD divided into sections for planting - RICE FIELD! The grid shows irrigation paths. Grid field = RICE FIELD!',
    hint: 'Grid field = rice field',
    reading_mnemonic: 'でん/た (den/ta) - "DEN in the FIELD!" TA = tah, rice field! INAKA = countryside! TANAKA = rice field + middle (name)!'
  },
  {
    character: '知',
    radicals: [{ char: '矢', name: 'arrow', meaning: 'arrow' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '矢 (arrow) + 口 (mouth)',
    story: 'An ARROW (矢) of information hitting the MOUTH (口) - KNOW! Knowledge shoots in like arrows. Arrow hits = KNOW!',
    hint: 'Arrow to mouth = know',
    reading_mnemonic: 'ち/し (chi/shi) - "CHEESE! I KNOW!" CHISHIKI = knowledge! Or: "SHE-roo!" - "SHE KNOWS!" SHIRU = know!'
  },
  {
    character: '夕',
    radicals: [{ char: '夕', name: 'evening', meaning: 'evening' }],
    components: 'Moon shape',
    story: 'The crescent MOON appearing - EVENING! When you see the moon, it\'s evening. Moon appears = EVENING!',
    hint: 'Moon appears = evening',
    reading_mnemonic: 'せき/ゆう (seki/yuu) - "SAKE at EVENING!" YUU-gata = evening! YUUSHOKU = dinner!'
  },
  {
    character: '多',
    radicals: [{ char: '夕', name: 'evening', meaning: 'evening' }],
    components: 'Two 夕 (evenings) stacked',
    story: 'Two EVENINGS (夕夕) stacked up - MANY! Multiple times = many. Stacked evenings = MANY!',
    hint: 'Multiple evenings = many',
    reading_mnemonic: 'た/おお (ta/oo) - "TAH! That\'s MANY!" TABUN = probably (many + part)! Or: "OH-OH!" - "OH OH! Too MANY!" OOI = many!'
  },
  {
    character: '少',
    radicals: [{ char: '小', name: 'small', meaning: 'small' }, { char: '丿', name: 'stroke', meaning: 'cut' }],
    components: '小 (small) + cut',
    story: 'Something SMALL (小) being cut even smaller - FEW! Less and less. Small cut = FEW!',
    hint: 'Small cut = few',
    reading_mnemonic: 'しょう/すく/すこ (shou/suku/suko) - "SHOW me FEW!" SHOUNEN = boy (few + year)! SUKUNAI = few! SUKOSHI = a little!'
  },
  {
    character: '男',
    radicals: [{ char: '田', name: 'field', meaning: 'rice field' }, { char: '力', name: 'power', meaning: 'strength' }],
    components: '田 (field) + 力 (power)',
    story: 'STRENGTH (力) working in the FIELD (田) - MAN! The traditional male role. Field strength = MAN!',
    hint: 'Field strength = man',
    reading_mnemonic: 'だん/おとこ (dan/otoko) - "DAN the MAN!" DANSHI = boy! Or: "OH-TOH-KOH!" - "OH TACO! That MAN!" OTOKO = man!'
  },
  {
    character: '女',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }],
    components: 'Kneeling figure',
    story: 'A graceful kneeling figure - WOMAN! The traditional feminine posture. Graceful figure = WOMAN!',
    hint: 'Graceful figure = woman',
    reading_mnemonic: 'じょ/おんな (jo/onna) - "JO is a WOMAN!" JOSHI = girl! Or: "OHN-NAH!" - "OH NAH! That WOMAN!" ONNA = woman!'
  },
  {
    character: '子',
    radicals: [{ char: '子', name: 'child', meaning: 'child' }],
    components: 'Child with arms',
    story: 'A small CHILD with arms outstretched - CHILD! A little one reaching out. Reaching little one = CHILD!',
    hint: 'Reaching little one = child',
    reading_mnemonic: 'し/こ (shi/ko) - "SHE has a CHILD!" KO = child! KODOMO = children!'
  },
  {
    character: '大',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }],
    components: 'Person with arms spread',
    story: 'A person spreading their ARMS wide - BIG! Showing how big something is. Arms spread = BIG!',
    hint: 'Arms spread = big',
    reading_mnemonic: 'だい/おお (dai/oo) - "DIE of BIGNESS!" DAIGAKU = university (big + study)! OOkii = big!'
  },
  {
    character: '小',
    radicals: [{ char: '小', name: 'small', meaning: 'small' }],
    components: 'Divided small piece',
    story: 'Something being divided into SMALL pieces - SMALL! Cutting things smaller. Divided = SMALL!',
    hint: 'Divided = small',
    reading_mnemonic: 'しょう/ちい/こ (shou/chii/ko) - "SHOW me something SMALL!" CHIIsai = small! SHOUNEN = boy!'
  },
  {
    character: '長',
    radicals: [{ char: '長', name: 'long', meaning: 'long' }],
    components: 'Long flowing hair',
    story: 'LONG flowing hair streaming down - LONG! The length of hair. Flowing hair = LONG!',
    hint: 'Flowing hair = long',
    reading_mnemonic: 'ちょう/なが (chou/naga) - "CHOW takes LONG!" CHOU = head! Or: "NAH-GAH!" - "NAH GA! Too LONG!" NAGAI = long!'
  },
  {
    character: '高',
    radicals: [{ char: '高', name: 'tall', meaning: 'tall' }],
    components: 'Tall tower structure',
    story: 'A TALL tower reaching up - HIGH/EXPENSIVE! Tall buildings are valuable. Tower = HIGH!',
    hint: 'Tower = high',
    reading_mnemonic: 'こう/たか (kou/taka) - "COW is HIGH up!" KOUKOU = high school! Or: "TAH-KAH!" - "TA-KA! So HIGH!" TAKAI = high/expensive!'
  },
  {
    character: '安',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '女', name: 'woman', meaning: 'woman' }],
    components: '宀 (roof) + 女 (woman)',
    story: 'A WOMAN (女) safe under a ROOF (宀) - CHEAP/PEACEFUL! Protected and at peace. Safe under roof = CHEAP/PEACEFUL!',
    hint: 'Woman under roof = cheap/safe',
    reading_mnemonic: 'あん/やす (an/yasu) - "AN-xiety-free, it\'s CHEAP!" ANZEN = safe! Or: "YAH-SOO!" - "YAH! So CHEAP!" YASUI = cheap!'
  },
  {
    character: '低',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '氐', name: 'base', meaning: 'foundation' }],
    components: '亻 (person) + 氐 (base)',
    story: 'A PERSON (亻) at the BASE (氐) level - LOW! Down at the foundation. At base = LOW!',
    hint: 'Person at base = low',
    reading_mnemonic: 'てい/ひく (tei/hiku) - "TAY is LOW!" TEION = low temperature! Or: "HEE-KOO!" - "HE\'s LOW!" HIKUI = low!'
  },
  {
    character: '銀',
    radicals: [{ char: '金', name: 'gold', meaning: 'metal' }, { char: '艮', name: 'stubborn', meaning: 'hard' }],
    components: '金 (metal) + 艮 (hard)',
    story: 'A HARD (艮) METAL (金) - SILVER! Silver is a hard precious metal. Hard metal = SILVER!',
    hint: 'Hard metal = silver',
    reading_mnemonic: 'ぎん (gin) - "GIN is SILVER!" GINKOU = bank! GIN = gin, silver! GINIRO = silver color!'
  },
  {
    character: '門',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }],
    components: 'Double door gate',
    story: 'Two doors of a traditional GATE - GATE! The entrance to a compound. Double doors = GATE!',
    hint: 'Double doors = gate',
    reading_mnemonic: 'もん/かど (mon/kado) - "MON-ster at the GATE!" MON = gate! SEIMON = main gate! KADO = corner/gate!'
  },
  {
    character: '世',
    radicals: [{ char: '世', name: 'generation', meaning: 'world' }],
    components: 'Three connected generations',
    story: 'Three generations connected - WORLD/GENERATION! The passing of time through ages. Connected generations = WORLD!',
    hint: 'Connected generations = world',
    reading_mnemonic: 'せい/よ (sei/yo) - "SAY hello to the WORLD!" SEKAI = world! YO = world/society! YONONAKA = world!'
  },
  {
    character: '夫',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }, { char: '一', name: 'one', meaning: 'one' }],
    components: '大 (big) + 一 (one)',
    story: 'A BIG (大) man with ONE (一) hairpin on top - HUSBAND! The head of household. Big man = HUSBAND!',
    hint: 'Big man with pin = husband',
    reading_mnemonic: 'ふう/おっと (fuu/otto) - "FOO! My HUSBAND!" FUU-fu = married couple! Or: "OHT-TOH!" - "OH! My HUSBAND!" OTTO = husband!'
  },
  {
    character: '主',
    radicals: [{ char: '丶', name: 'dot', meaning: 'flame' }, { char: '王', name: 'king', meaning: 'king' }],
    components: '丶 (flame) + 王 (king)',
    story: 'A KING (王) with a flame/light (丶) above - MASTER/MAIN! The one who holds the light, the main one. King with light = MASTER!',
    hint: 'King with light = master',
    reading_mnemonic: 'しゅ/ぬし/おも (shu/nushi/omo) - "SHOE MASTER!" SHUJIN = master/husband! Or: "NOO-SHE!" - "NUSHI!" NUSHI = master! OMONA = main!'
  },
  {
    character: '引',
    radicals: [{ char: '弓', name: 'bow', meaning: 'bow' }, { char: '丨', name: 'line', meaning: 'string' }],
    components: '弓 (bow) + 丨 (string)',
    story: 'PULLING (丨) back a BOW (弓) string - PULL! The action of drawing a bow. Draw bow = PULL!',
    hint: 'Drawing bow = pull',
    reading_mnemonic: 'いん/ひ (in/hi) - "IN! PULL it IN!" HIKIWAKE = draw (tie)! Or: "HEE-koo!" - "HE\'s PULLING!" HIKU = pull!'
  },
  {
    character: '払',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '厶', name: 'private', meaning: 'private' }],
    components: '扌 (hand) + 厶 (private/pay)',
    story: 'Using your HAND (扌) to give away private (厶) money - PAY! Handing over payment. Hand over = PAY!',
    hint: 'Hand over = pay',
    reading_mnemonic: 'はら (hara) - "HAH-RAH! PAY up!" HARAUU = pay! SHIHARAI = payment!'
  },
  {
    character: '届',
    radicals: [{ char: '尸', name: 'body', meaning: 'body/flag' }, { char: '届', name: 'reach', meaning: 'reach' }],
    components: 'Body reaching',
    story: 'A body (尸) stretching to REACH something - DELIVER/REACH! Extending to deliver. Reaching = DELIVER!',
    hint: 'Reaching = deliver',
    reading_mnemonic: 'とど (todo) - "TOE-DOE DELIVERS!" TODOKU = reach/arrive! TODOKERU = deliver!'
  },
  {
    character: '届',
    radicals: [{ char: '尸', name: 'body', meaning: 'body' }, { char: '由', name: 'reason', meaning: 'reason' }],
    components: '尸 (body) + 由 (reason)',
    story: 'A body (尸) with REASON (由) to reach out - DELIVER! Stretching to deliver something. Reaching out = DELIVER!',
    hint: 'Reaching out = deliver',
    reading_mnemonic: 'とど (todo) - "TOE-DOH! DELIVERED!" TODOKU = arrive! TODOKERU = deliver!'
  },
  {
    character: '届',
    radicals: [{ char: '尸', name: 'corpse', meaning: 'body' }, { char: '由', name: 'reason', meaning: 'sprout' }],
    components: 'Body + sprout reaching',
    story: 'A sprout reaching out from inside - DELIVER/REACH! Like a plant reaching toward the sun. Reaching = DELIVER!',
    hint: 'Reaching out = deliver',
    reading_mnemonic: 'とど (todo) - "TO-DO: DELIVER!" TODOKU = reach! TODOKEDERU = deliver!'
  }
]

async function insertBatch() {
  console.log('📦 N4 BATCH 6: Remaining N4 kanji')
  console.log('=' .repeat(50) + '\n')
  
  // Remove duplicates by character
  const uniqueKanji = [...new Map(BATCH.map(item => [item.character, item])).values()]
  
  let success = 0, failed = 0
  
  for (const m of uniqueKanji) {
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
  console.log(`✨ Batch 6 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
