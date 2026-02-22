/**
 * N3 BATCH 3: Speech & Communication (30 kanji)
 * 否吸吹告呼命和商喜回因困園在報増声変夢太夫失好妻娘婚婦
 * 
 * Run: node scripts/n3/batch3_communication.js
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
    character: '否',
    radicals: [{ char: '不', name: 'not', meaning: 'not' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '不 (not) + 口 (mouth)',
    story: 'A MOUTH (口) saying NOT (不) - DENY/NO! Negating something. Mouth says no = DENY!',
    hint: 'Mouth says not = deny',
    reading_mnemonic: 'ひ/いな (hi/ina) - "HE says NO!" HITEI = denial! INA = no/nay!'
  },
  {
    character: '吸',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '及', name: 'reach', meaning: 'reach' }],
    components: '口 (mouth) + 及 (reach)',
    story: 'A MOUTH (口) REACHING (及) for air - INHALE! Breathing in. Mouth reaches = INHALE!',
    hint: 'Mouth reaches = inhale',
    reading_mnemonic: 'きゅう/す (kyuu/su) - "QUEUE to INHALE!" KOKYUU = breathing! SUU = inhale!'
  },
  {
    character: '吹',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '欠', name: 'yawn', meaning: 'lack/blow' }],
    components: '口 (mouth) + 欠 (blow)',
    story: 'A MOUTH (口) BLOWING (欠) out air - BLOW! Exhaling forcefully. Mouth blows = BLOW!',
    hint: 'Mouth blows out = blow',
    reading_mnemonic: 'すい/ふ (sui/fu) - "SWEET BLOW!" FUKU = blow! FUKIDASU = burst out!'
  },
  {
    character: '告',
    radicals: [{ char: '牛', name: 'cow', meaning: 'cow' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '牛 (cow) + 口 (mouth)',
    story: 'A COW (牛) speaking through a MOUTH (口) - ANNOUNCE! Making a declaration. Cow announces = ANNOUNCE!',
    hint: 'Cow speaks = announce',
    reading_mnemonic: 'こく/つ (koku/tsu) - "COKE ANNOUNCEMENT!" KOKUCHI = notice! TSUGERU = tell!'
  },
  {
    character: '呼',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '乎', name: 'question', meaning: 'exhale' }],
    components: '口 (mouth) + 乎 (exhale)',
    story: 'A MOUTH (口) calling out with breath (乎) - CALL! Summoning someone. Mouth calls = CALL!',
    hint: 'Mouth calls out = call',
    reading_mnemonic: 'こ/よ (ko/yo) - "CO-me! I CALL you!" YOBU = call! KOKYUU = breath!'
  },
  {
    character: '命',
    radicals: [{ char: '亼', name: 'gather', meaning: 'gather' }, { char: '叩', name: 'knock', meaning: 'order' }],
    components: 'Gather + order',
    story: 'A gathering under orders - LIFE/COMMAND! The vital command to live. Command = LIFE!',
    hint: 'Vital command = life',
    reading_mnemonic: 'めい/いのち (mei/inochi) - "MAY your LIFE be long!" INOCHI = life! MEIREI = command!'
  },
  {
    character: '和',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '禾 (grain) + 口 (mouth)',
    story: 'GRAIN (禾) shared through MOUTHS (口) - HARMONY/PEACE! Sharing food brings peace. Shared grain = HARMONY!',
    hint: 'Shared grain = harmony',
    reading_mnemonic: 'わ/やわ/なご (wa/yawa/nago) - "WA! HARMONY!" HEIWA = peace! NAGOYAKA = gentle! YAWARAGU = soften!'
  },
  {
    character: '商',
    radicals: [{ char: '亠', name: 'lid', meaning: 'roof' }, { char: '冂', name: 'border', meaning: 'shop' }, { char: '八', name: 'eight', meaning: 'divide' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: 'Roof + shop + divide + mouth',
    story: 'MOUTHS negotiating under a shop roof - COMMERCE! Buying and selling. Shop talk = COMMERCE!',
    hint: 'Shop talk = commerce',
    reading_mnemonic: 'しょう/あきな (shou/akina) - "SHOW me the COMMERCE!" SHOUHIN = product! AKINAU = trade!'
  },
  {
    character: '喜',
    radicals: [{ char: '士', name: 'samurai', meaning: 'scholar' }, { char: '口', name: 'mouth', meaning: 'mouths' }],
    components: 'Scholar + 口 (mouths)',
    story: 'Many MOUTHS (口口) celebrating under a scholar (士) - JOY! Happy shouts. Many mouths = JOY!',
    hint: 'Many happy mouths = joy',
    reading_mnemonic: 'き/よろこ (ki/yoroko) - "KEY to JOY!" YOROKOBU = rejoice! KANKI = delight!'
  },
  {
    character: '回',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'enclosure' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '囗 (enclosure) + 口 (mouth)',
    story: 'A MOUTH (口) inside an ENCLOSURE (囗) - ROTATE/TIMES! Going around. Circle inside = ROTATE!',
    hint: 'Circle inside = rotate',
    reading_mnemonic: 'かい/まわ (kai/mawa) - "KAI goes AROUND!" KAITEN = rotation! MAWARU = go around!'
  },
  {
    character: '因',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'enclosure' }, { char: '大', name: 'big', meaning: 'big' }],
    components: '囗 (enclosure) + 大 (big)',
    story: 'Something BIG (大) trapped in an ENCLOSURE (囗) - CAUSE! The root cause contained. Trapped big thing = CAUSE!',
    hint: 'Trapped cause = cause',
    reading_mnemonic: 'いん/よ (in/yo) - "IN the CAUSE!" GENIN = cause! YORU = be due to!'
  },
  {
    character: '困',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'enclosure' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '囗 (enclosure) + 木 (tree)',
    story: 'A TREE (木) trapped in an ENCLOSURE (囗) - TROUBLE! Stuck and unable to grow. Trapped tree = TROUBLE!',
    hint: 'Trapped tree = trouble',
    reading_mnemonic: 'こん/こま (kon/koma) - "CON-fined! TROUBLE!" KOMARU = be troubled! KONNAN = difficulty!'
  },
  {
    character: '園',
    radicals: [{ char: '囗', name: 'enclosure', meaning: 'enclosure' }, { char: '袁', name: 'robe', meaning: 'garden' }],
    components: '囗 (enclosure) + 袁 (garden)',
    story: 'A beautiful space in an ENCLOSURE (囗) - GARDEN! A park surrounded. Enclosed beauty = GARDEN!',
    hint: 'Enclosed beauty = garden',
    reading_mnemonic: 'えん/その (en/sono) - "EN-joy the GARDEN!" KOUEN = park! SONO = garden!'
  },
  {
    character: '在',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '才', name: 'talent', meaning: 'exist' }],
    components: '土 (earth) + 才 (exist)',
    story: 'Something on EARTH (土) that EXISTS (才) - EXIST! Being present. On earth = EXIST!',
    hint: 'On earth = exist',
    reading_mnemonic: 'ざい/あ (zai/a) - "ZAI! It EXISTS!" SONZAI = existence! ARU = exist!'
  },
  {
    character: '報',
    radicals: [{ char: '幸', name: 'fortune', meaning: 'fortune' }, { char: '卩', name: 'seal', meaning: 'seal' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: 'Fortune + seal + hand',
    story: 'Passing fortunate news with a sealed hand - REPORT! Information delivered. News passed = REPORT!',
    hint: 'News passed = report',
    reading_mnemonic: 'ほう/むく (hou/muku) - "HO! A REPORT!" HOUKOU = report! MUKUIRU = reward!'
  },
  {
    character: '増',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '曽', name: 'formerly', meaning: 'layers' }],
    components: '土 (earth) + 曽 (layers)',
    story: 'EARTH (土) piled in LAYERS (曽) - INCREASE! Growing higher. Piled earth = INCREASE!',
    hint: 'Layered earth = increase',
    reading_mnemonic: 'ぞう/ま/ふ (zou/ma/fu) - "ZO! More! INCREASE!" ZOUKA = increase! MASU = increase! FUERU = grow!'
  },
  {
    character: '声',
    radicals: [{ char: '士', name: 'samurai', meaning: 'scholar' }, { char: '尸', name: 'corpse', meaning: 'body' }],
    components: 'Sound waves from body',
    story: 'Sound waves coming from a body - VOICE! The sound we make. Body sound = VOICE!',
    hint: 'Body sound = voice',
    reading_mnemonic: 'せい/こえ (sei/koe) - "SAY with your VOICE!" KOE = voice! ONSEI = voice/sound!'
  },
  {
    character: '変',
    radicals: [{ char: '亦', name: 'also', meaning: 'also' }, { char: '夂', name: 'go', meaning: 'legs' }],
    components: 'Also + legs moving',
    story: 'Something that ALSO moves and shifts - CHANGE! Transformation. Shifting = CHANGE!',
    hint: 'Shifting = change',
    reading_mnemonic: 'へん/か (hen/ka) - "HEN-ce, STRANGE CHANGE!" HENKA = change! KAWARU = change!'
  },
  {
    character: '夢',
    radicals: [{ char: '艹', name: 'grass', meaning: 'plants' }, { char: '目', name: 'eye', meaning: 'eyes' }, { char: '夕', name: 'evening', meaning: 'evening' }],
    components: 'Plants + eyes + evening',
    story: 'EYES (目) closed in the EVENING (夕) seeing plants - DREAM! Visions while sleeping. Night eyes = DREAM!',
    hint: 'Night visions = dream',
    reading_mnemonic: 'む/ゆめ (mu/yume) - "MOO! What a DREAM!" YUME = dream! AKUMU = nightmare!'
  },
  {
    character: '太',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }, { char: '丶', name: 'dot', meaning: 'dot' }],
    components: '大 (big) + 丶 (dot)',
    story: 'BIG (大) with an extra DOT (丶) - FAT/THICK! Extra big. Extra big = FAT!',
    hint: 'Extra big = fat',
    reading_mnemonic: 'たい/た/ふと (tai/ta/futo) - "TIE is FAT!" TAIYOU = sun! FUTOI = fat/thick!'
  },
  {
    character: '夫',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }, { char: '一', name: 'one', meaning: 'one' }],
    components: '大 (big) + 一 (one)',
    story: 'A BIG (大) man with ONE (一) hairpin - HUSBAND! The man of the house. Big man = HUSBAND!',
    hint: 'Big man with pin = husband',
    reading_mnemonic: 'ふう/おっと (fuu/otto) - "FOO! My HUSBAND!" FUUFU = couple! OTTO = husband!'
  },
  {
    character: '失',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }, { char: '丿', name: 'stroke', meaning: 'drop' }],
    components: '大 (big) + drop',
    story: 'Something BIG (大) dropping away - LOSE! Losing something important. Dropped = LOSE!',
    hint: 'Big thing drops = lose',
    reading_mnemonic: 'しつ/うしな (shitsu/ushina) - "SHE LOST it!" SHITSUREI = excuse me! USHINAU = lose!'
  },
  {
    character: '好',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '子', name: 'child', meaning: 'child' }],
    components: '女 (woman) + 子 (child)',
    story: 'A WOMAN (女) with her CHILD (子) - LIKE/GOOD! The bond of love. Woman + child = LIKE!',
    hint: 'Woman with child = like',
    reading_mnemonic: 'こう/す/この (kou/su/kono) - "CO-nnection I LIKE!" SUKI = like! KONOMU = prefer!'
  },
  {
    character: '妻',
    radicals: [{ char: '十', name: 'ten', meaning: 'cross' }, { char: '彐', name: 'hand', meaning: 'hand' }, { char: '女', name: 'woman', meaning: 'woman' }],
    components: 'Cross + hand + 女 (woman)',
    story: 'A WOMAN (女) with her hands crossed working - WIFE! The woman who manages. Working woman = WIFE!',
    hint: 'Working woman = wife',
    reading_mnemonic: 'さい/つま (sai/tsuma) - "SIGH, my WIFE!" TSUMA = wife! SAISHI = wife and children!'
  },
  {
    character: '娘',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '良', name: 'good', meaning: 'good' }],
    components: '女 (woman) + 良 (good)',
    story: 'A GOOD (良) WOMAN (女) - DAUGHTER! A lovely young woman. Good woman = DAUGHTER!',
    hint: 'Good woman = daughter',
    reading_mnemonic: 'じょう/むすめ (jou/musume) - "JO\'s DAUGHTER!" MUSUME = daughter!'
  },
  {
    character: '婚',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '昏', name: 'dusk', meaning: 'dusk' }],
    components: '女 (woman) + 昏 (dusk)',
    story: 'A WOMAN (女) at DUSK (昏) - MARRIAGE! Traditional evening wedding. Woman at dusk = MARRIAGE!',
    hint: 'Woman at dusk = marriage',
    reading_mnemonic: 'こん (kon) - "CON-gratulations on MARRIAGE!" KEKKON = marriage!'
  },
  {
    character: '婦',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '帚', name: 'broom', meaning: 'broom' }],
    components: '女 (woman) + 帚 (broom)',
    story: 'A WOMAN (女) with a BROOM (帚) - WIFE/LADY! The lady of the house. Woman with broom = WIFE!',
    hint: 'Woman with broom = wife',
    reading_mnemonic: 'ふ (fu) - "FOO! The LADY!" SHUFU = housewife! FUJIN = lady!'
  },
  {
    character: '存',
    radicals: [{ char: '子', name: 'child', meaning: 'child' }, { char: '才', name: 'talent', meaning: 'exist' }],
    components: '子 (child) + 才 (exist)',
    story: 'A CHILD (子) that EXISTS (才) - EXIST/KNOW! Being alive. Child exists = EXIST!',
    hint: 'Child exists = exist',
    reading_mnemonic: 'そん/ぞん (son/zon) - "SON EXISTS!" SONZAI = existence! GOZONJI = knowing!'
  },
  {
    character: '宅',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '乇', name: 'grow', meaning: 'sprout' }],
    components: '宀 (roof) + 乇 (sprout)',
    story: 'A ROOF (宀) where life grows (乇) - HOME! Where you live and grow. Roof + growth = HOME!',
    hint: 'Roof with growth = home',
    reading_mnemonic: 'たく (taku) - "TAK-e me HOME!" JITAKU = one\'s home! TAKUHAI = home delivery!'
  },
  {
    character: '守',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '寸', name: 'inch', meaning: 'hand' }],
    components: '宀 (roof) + 寸 (hand)',
    story: 'A HAND (寸) protecting under the ROOF (宀) - PROTECT! Guarding the home. Hand under roof = PROTECT!',
    hint: 'Hand guards roof = protect',
    reading_mnemonic: 'しゅ/す/まも/もり (shu/su/mamo/mori) - "SHOE PROTECTS!" MAMORU = protect! RUSUU = absence!'
  }
]

async function insertBatch() {
  console.log('💬 N3 BATCH 3: Speech & Communication (30 kanji)')
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
  console.log(`✨ Batch 3 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
