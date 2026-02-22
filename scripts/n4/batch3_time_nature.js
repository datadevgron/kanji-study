/**
 * N4 BATCH 3: Time, Nature & Numbers (30 kanji)
 * 夏冬春秋朝昼夜曜早明暗風雨雪発有産業運重力強弱多少
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/n4/batch3_time_nature.js
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
    character: '夏',
    radicals: [{ char: '一', name: 'one', meaning: 'top' }, { char: '自', name: 'self', meaning: 'head' }, { char: '夂', name: 'go', meaning: 'legs' }],
    components: 'Head + body + legs dancing',
    story: 'A person with their HEAD and LEGS dancing in the heat - SUMMER! Everyone comes out to dance and celebrate in SUMMER. Dancing in heat = SUMMER!',
    hint: 'Dancing figure = summer',
    reading_mnemonic: 'か/なつ (ka/natsu) - "NOT SO hot? It\'s SUMMER!" NATSU = not-su, it\'s SUMMER! NATSUYASUMI = summer vacation!'
  },
  {
    character: '冬',
    radicals: [{ char: '夂', name: 'go slowly', meaning: 'legs' }, { char: '冫', name: 'ice', meaning: 'ice' }],
    components: '夂 (legs) + 冫 (ice)',
    story: 'Walking slowly (夂) because of ICE (冫) - WINTER! In WINTER, you walk carefully on icy ground. Ice + slow walking = WINTER!',
    hint: 'Walking on ice = winter',
    reading_mnemonic: 'とう/ふゆ (tou/fuyu) - "TOE is cold in WINTER!" Your TOES freeze! Or: "FOO-YOU!" - "FOO, YOU\'re freezing!" FUYU = foo-you, winter!'
  },
  {
    character: '春',
    radicals: [{ char: '三', name: 'three', meaning: 'layers' }, { char: '人', name: 'person', meaning: 'people' }, { char: '日', name: 'sun', meaning: 'sun' }],
    components: 'Three + person + 日 (sun)',
    story: 'THREE layers of plants pushing up with people under the SUN (日) - SPRING! Plants grow, sun shines, life returns. New growth + sun = SPRING!',
    hint: 'Growth under sun = spring',
    reading_mnemonic: 'しゅん/はる (shun/haru) - "SHE\'s coming in SPRING!" She arrives in SPRING! Or: "HAH-RU!" - "HAH! Flowers RULE in spring!" HARU = hah-roo, spring!'
  },
  {
    character: '秋',
    radicals: [{ char: '禾', name: 'grain', meaning: 'grain/harvest' }, { char: '火', name: 'fire', meaning: 'fire/red' }],
    components: '禾 (grain) + 火 (fire)',
    story: 'GRAIN (禾) harvest and FIRE (火) colors - AUTUMN! The leaves turn red like fire, and crops are harvested. Fire-colored harvest = AUTUMN!',
    hint: 'Red grain harvest = autumn',
    reading_mnemonic: 'しゅう/あき (shuu/aki) - "SHOE shopping in AUTUMN!" Get new SHOEs for fall! Or: "AH-KEE!" - "AH, KEY to harvest!" AKI = ah-kee, autumn!'
  },
  {
    character: '朝',
    radicals: [{ char: '十', name: 'ten', meaning: 'cross' }, { char: '日', name: 'sun', meaning: 'sun' }, { char: '月', name: 'moon', meaning: 'moon' }],
    components: '十 (cross) + 日 (sun) + 月 (moon)',
    story: 'The SUN (日) and MOON (月) crossing paths - MORNING! At dawn, the moon is setting as the sun rises. Sun meeting moon = MORNING!',
    hint: 'Sun meets moon = morning',
    reading_mnemonic: 'ちょう/あさ (chou/asa) - "CHOW! Breakfast in the MORNING!" Time for MORNING CHOW! Or: "AH-SA!" - "AH, SAY good morning!" ASA = ah-sah, morning!'
  },
  {
    character: '昼',
    radicals: [{ char: '尺', name: 'measure', meaning: 'unit' }, { char: '旦', name: 'dawn', meaning: 'sun horizon' }],
    components: 'Measure + sun at peak',
    story: 'The sun measured at its peak - NOON/DAYTIME! When the sun is highest in the sky. Peak sun = NOON!',
    hint: 'Sun at peak = noon',
    reading_mnemonic: 'ちゅう/ひる (chuu/hiru) - "CHEW lunch at NOON!" Time to CHEW at NOON! Or: "HE-ROO!" - "HE RULES at noon, the sun!" HIRU = hee-roo, noon!'
  },
  {
    character: '夜',
    radicals: [{ char: '亠', name: 'lid', meaning: 'roof' }, { char: '人', name: 'person', meaning: 'person' }, { char: '夕', name: 'evening', meaning: 'evening' }],
    components: '亠 (roof) + 人 (person) + 夕 (evening)',
    story: 'A PERSON (人) under a roof at EVENING (夕) time - NIGHT! When evening falls and you\'re inside. Evening darkness = NIGHT!',
    hint: 'Person at evening = night',
    reading_mnemonic: 'や/よる (ya/yoru) - "YO! It\'s NIGHT!" YO, YORU desu! Or: "YAH!" - "YAH! It\'s dark at NIGHT!" YORU = yo-roo, night!'
  },
  {
    character: '曜',
    radicals: [{ char: '日', name: 'sun', meaning: 'sun/day' }, { char: '羽', name: 'wing', meaning: 'wings' }, { char: '隹', name: 'bird', meaning: 'bird' }],
    components: '日 (sun) + 羽 (wings) + 隹 (bird)',
    story: 'The SUN (日) and its celestial birds flying through - DAY OF THE WEEK! The sun marks each DAY as it flies across the sky. Flying days = DAY OF WEEK!',
    hint: 'Flying sun = day of week',
    reading_mnemonic: 'よう (you) - "YO! What DAY is it?" YO! NANYOUBI? NICHIYOUBI = Sunday! GETSUYOUBI = Monday! KAYOUBI = Tuesday!'
  },
  {
    character: '発',
    radicals: [{ char: '癶', name: 'footsteps', meaning: 'departure' }, { char: '殳', name: 'weapon', meaning: 'action' }],
    components: 'Footsteps + action',
    story: 'FOOTSTEPS of DEPARTURE with action - LEAVE/EMIT/START! When something starts moving, energy is released. Starting action = EMIT/DEPART!',
    hint: 'Starting footsteps = emit/depart',
    reading_mnemonic: 'はつ/た (hatsu/ta) - "HATS off, we\'re LEAVING!" HATSU-sha = departing train! SHUPPATSU = departure! HAPPYOU = announcement (emit + express)!'
  },
  {
    character: '有',
    radicals: [{ char: '月', name: 'moon/meat', meaning: 'substance' }, { char: '丿', name: 'stroke', meaning: 'holding' }],
    components: 'Hand holding meat/substance',
    story: 'HOLDING something substantial (月/meat) in hand - HAVE/EXIST! If you can hold it, it EXISTS. You HAVE it. Holding = HAVE!',
    hint: 'Holding substance = have',
    reading_mnemonic: 'ゆう/あ (yuu/a) - "YOU HAVE it!" YOU got it! YUUMEI = famous (have + name)! Or: "AH-ru!" - "AH, it EXISTS!" ARU = ah-roo, exist!'
  },
  {
    character: '産',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }, { char: '生', name: 'life', meaning: 'birth/life' }],
    components: '立 (stand) + 生 (birth)',
    story: 'STANDING (立) to give BIRTH (生) - PRODUCE! Creating new life, making products. Giving birth = PRODUCE!',
    hint: 'Standing birth = produce',
    reading_mnemonic: 'さん/う (san/u) - "SON PRODUCED!" You PRODUCED a SON! SEISAN = production! UMARERU = to be born! SANGYOU = industry!'
  },
  {
    character: '業',
    radicals: [{ char: '业', name: 'work', meaning: 'work' }, { char: '羊', name: 'sheep', meaning: 'offering' }],
    components: 'Work + offering',
    story: 'The WORK and offerings stacked up - BUSINESS/INDUSTRY! All your labor and deeds accumulate. Work piled up = BUSINESS!',
    hint: 'Stacked work = business',
    reading_mnemonic: 'ぎょう/わざ (gyou/waza) - "GO to your BUSINESS!" GO work! SANGYOU = industry! Or: "WAH-ZAH!" - "WAH ZAH! What a skill!" WAZA = skill/deed!'
  },
  {
    character: '運',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '軍', name: 'army', meaning: 'army/troops' }],
    components: '辶 (road) + 軍 (army)',
    story: 'Moving an ARMY (軍) along the ROAD (辶) - TRANSPORT/LUCK! Moving troops takes luck and effort. Movement + fate = CARRY/LUCK!',
    hint: 'Moving army = transport/luck',
    reading_mnemonic: 'うん/はこ (un/hako) - "OON! LUCKY!" OON, good LUCK! UNTEN = driving! Or: "HAH-KOH!" - "HAH, KO-move it!" HAKOBU = hah-koh-boo, carry!'
  },
  {
    character: '重',
    radicals: [{ char: '千', name: 'thousand', meaning: 'many' }, { char: '里', name: 'village', meaning: 'distance/layers' }],
    components: 'Layers stacked',
    story: 'Many LAYERS (里) stacked (千) - HEAVY/IMPORTANT! When things pile up, they become HEAVY and IMPORTANT. Stacked layers = HEAVY!',
    hint: 'Stacked layers = heavy',
    reading_mnemonic: 'じゅう/おも/かさ (juu/omo/kasa) - "JOO! That\'s HEAVY!" JOO-dou = heavy! Or: "OH-MOH!" - "OH MO! So HEAVY!" OMOI = oh-moy, heavy!'
  },
  {
    character: '力',
    radicals: [{ char: '力', name: 'power', meaning: 'muscle/strength' }],
    components: 'Flexed arm muscle',
    story: 'A flexed ARM showing MUSCLE - POWER/STRENGTH! The shape of a strong arm. Muscle = POWER!',
    hint: 'Flexed arm = power',
    reading_mnemonic: 'りょく/ちから (ryoku/chikara) - "ROCK your POWER!" Show your ROCK-hard strength! Or: "CHEE-KAH-RAH!" - "CHI-KA-RA! POWER UP!" CHIKARA = strength!'
  },
  {
    character: '強',
    radicals: [{ char: '弓', name: 'bow', meaning: 'bow' }, { char: '虫', name: 'insect', meaning: 'insect' }],
    components: '弓 (bow) + 虫 (insect)',
    story: 'A BOW (弓) powered by an INSECT (虫)\'s strength - STRONG! Even small insects can be incredibly strong. Bow power = STRONG!',
    hint: 'Bug with bow = strong',
    reading_mnemonic: 'きょう/つよ (kyou/tsuyo) - "KEY-OH! So STRONG!" WOW, STRONG! Or: "TSOO-YO-ee!" - "TSOOI! STRONG!" TSUYOI = tsoo-yoy, strong!'
  },
  {
    character: '弱',
    radicals: [{ char: '弓', name: 'bow', meaning: 'bow' }, { char: '冫', name: 'ice', meaning: 'ice/weak' }],
    components: 'Two bows bent',
    story: 'Two BOWS (弓弓) that are bent and can\'t shoot - WEAK! Damaged bows are useless. Broken bows = WEAK!',
    hint: 'Broken bows = weak',
    reading_mnemonic: 'じゃく/よわ (jaku/yowa) - "JACK is WEAK!" Poor JACK! Or: "YO-WAH!" - "YO! WAH, I\'m WEAK!" YOWAI = yo-why, weak!'
  },
  {
    character: '風',
    radicals: [{ char: '几', name: 'table', meaning: 'movement' }, { char: '虫', name: 'insect', meaning: 'insect' }],
    components: 'Movement + 虫 (insect)',
    story: 'INSECTS (虫) blown about by movement - WIND! Bugs flying everywhere in the WIND. Blowing insects = WIND!',
    hint: 'Bugs in breeze = wind',
    reading_mnemonic: 'ふう/かぜ (fuu/kaze) - "FOO! WIND!" Blow FOO to make WIND! Or: "KAH-ZEH!" - "CAUSE A breeze!" KAZE = kah-zeh, wind!'
  },
  {
    character: '雪',
    radicals: [{ char: '雨', name: 'rain', meaning: 'rain' }, { char: 'ヨ', name: 'hand', meaning: 'hand/brush' }],
    components: '雨 (rain) + ヨ (brush away)',
    story: 'RAIN (雨) that you BRUSH (ヨ) away - SNOW! Snow is rain you can sweep and brush off. Brushable rain = SNOW!',
    hint: 'Rain to brush = snow',
    reading_mnemonic: 'せつ/ゆき (setsu/yuki) - "SET the SNOW aside!" SETSU = set snow! Or: "YOU-KEY!" - "YOU got the KEY to the snow fort!" YUKI = you-key, snow!'
  },
  {
    character: '青',
    radicals: [{ char: '生', name: 'life', meaning: 'growth' }, { char: '月', name: 'moon', meaning: 'moon' }],
    components: '生 (life/growth) + 月 (moon)',
    story: 'LIFE growing (生) under the MOON (月) - BLUE/GREEN! The color of life, plants, sky. Living color = BLUE/GREEN!',
    hint: 'Living moon color = blue',
    reading_mnemonic: 'せい/あお (sei/ao) - "SAY it\'s BLUE!" SAY ao! Or: "AH-OH!" - "AH OH! So BLUE!" AO = ah-oh, blue! AOZORA = blue sky!'
  },
  {
    character: '色',
    radicals: [{ char: '⺈', name: 'bent person', meaning: 'person' }, { char: '巴', name: 'snake', meaning: 'pattern' }],
    components: 'Person over pattern',
    story: 'A PERSON looking at different patterns - COLOR! Examining the hues and colors of things. Looking at hues = COLOR!',
    hint: 'Examining patterns = color',
    reading_mnemonic: 'しょく/いろ (shoku/iro) - "SHOOK by the COLOR!" The COLOR SHOOK me! Or: "EE-ROH!" - "EERO! Hero colors!" IRO = ee-roh, color!'
  },
  {
    character: '赤',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '火', name: 'fire', meaning: 'fire' }],
    components: '土 (earth) + 火 (fire)',
    story: 'The EARTH (土) on FIRE (火) - RED! The color of fire, blood, passion. Fire color = RED!',
    hint: 'Earth on fire = red',
    reading_mnemonic: 'せき/あか (seki/aka) - "SAKE turns you RED!" SAKE makes you blush! Or: "AH-KAH!" - "AH KAH! So RED!" AKA = ah-kah, red!'
  },
  {
    character: '黒',
    radicals: [{ char: '里', name: 'village', meaning: 'field' }, { char: '灬', name: 'fire dots', meaning: 'fire' }],
    components: '里 (field) + 灬 (fire)',
    story: 'A FIELD (里) burned by FIRE (灬) - BLACK! After fire, everything is BLACK with soot. Burned = BLACK!',
    hint: 'Burned field = black',
    reading_mnemonic: 'こく/くろ (koku/kuro) - "COKE is BLACK!" COKE cola is BLACK! Or: "KOO-ROH!" - "CRUEL is the BLACK night!" KURO = koo-roh, black!'
  },
  {
    character: '元',
    radicals: [{ char: '二', name: 'two', meaning: 'two' }, { char: '儿', name: 'legs', meaning: 'person' }],
    components: '二 (two) + 儿 (legs)',
    story: 'A person (儿) standing on TWO (二) - the ORIGIN! Standing at the beginning, the original place. Base position = ORIGIN/BASE!',
    hint: 'Person at base = origin',
    reading_mnemonic: 'げん/もと (gen/moto) - "GEN is the ORIGIN!" GEN = genesis, the ORIGIN! Or: "MOH-TOH!" - "MOTO-cycle started here!" MOTO = moh-toh, origin!'
  },
  {
    character: '医',
    radicals: [{ char: '匚', name: 'box', meaning: 'container' }, { char: '矢', name: 'arrow', meaning: 'arrow' }],
    components: '匚 (box) + 矢 (arrow)',
    story: 'ARROWS (矢) in a BOX (匚) - MEDICINE! Ancient medicine used sharp tools from boxes. Doctor\'s tools = MEDICINE!',
    hint: 'Tools in box = medicine',
    reading_mnemonic: 'い (i) - "EE! A DOCTOR!" EE! ISHA = doctor! IGAKU = medicine (medical + study)!'
  },
  {
    character: '病',
    radicals: [{ char: '疒', name: 'sickness', meaning: 'illness' }, { char: '丙', name: 'third', meaning: 'third/fire' }],
    components: '疒 (sickness) + 丙 (internal)',
    story: 'The SICKNESS (疒) radical with internal distress (丙) - ILLNESS! Something wrong inside the body. Sick feeling = ILLNESS!',
    hint: 'Sickness radical = illness',
    reading_mnemonic: 'びょう/やまい (byou/yamai) - "BYO-in = hospital for ILLNESS!" BYOUIN = hospital! Or: "YAH-MY!" - "YAH MY sickness!" YAMAI = yah-my, illness!'
  },
  {
    character: '注',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '主', name: 'master', meaning: 'main' }],
    components: '氵 (water) + 主 (main)',
    story: 'WATER (氵) focused on the MAIN (主) point - POUR/ATTENTION! Pouring water with attention, focusing on the main thing. Focused pour = POUR/ATTENTION!',
    hint: 'Focused water = pour/attention',
    reading_mnemonic: 'ちゅう/そそ (chuu/soso) - "CHEW with ATTENTION!" Pay ATTENTION! CHUUI = attention! SOSOGO = pour! CHUUMON = order (pour + ask)!'
  },
  {
    character: '洋',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '羊', name: 'sheep', meaning: 'sheep/ocean' }],
    components: '氵 (water) + 羊 (sheep/vast)',
    story: 'Vast WATER (氵) like SHEEP (羊) stretching to horizon - OCEAN/WESTERN! The great ocean, Western waters. Vast water = OCEAN/WESTERN!',
    hint: 'Vast water = ocean',
    reading_mnemonic: 'よう (you) - "YO! The OCEAN!" YO, what an OCEAN! TAIYOU = Pacific OCEAN! YOUFUKU = Western clothes!'
  },
  {
    character: '漢',
    radicals: [{ char: '氵', name: 'water', meaning: 'water/river' }, { char: '廿', name: 'twenty', meaning: 'many' }, { char: '口', name: 'mouth', meaning: 'people' }],
    components: '氵 (water/Han River) + 艹 + 口',
    story: 'People along the HAN RIVER (氵) - HAN/CHINESE! The Han dynasty, Han people, Han river. Chinese culture = HAN/CHINESE!',
    hint: 'Han river people = Chinese',
    reading_mnemonic: 'かん (kan) - "CAN read CHINESE characters!" You CAN read KANJI! KANJI = Han + character! CHUUGOKUGO = Chinese language!'
  },
  {
    character: '真',
    radicals: [{ char: '十', name: 'ten', meaning: 'complete' }, { char: '目', name: 'eye', meaning: 'eye' }, { char: '八', name: 'eight', meaning: 'stand' }],
    components: '十 (complete) + 目 (eye) + 八 (legs)',
    story: 'An EYE (目) seeing completely (十) with legs (八) - TRUE/REAL! Seeing reality with your own eyes. Complete seeing = TRUE!',
    hint: 'Complete eye = true',
    reading_mnemonic: 'しん/ま (shin/ma) - "SHEEN is REAL!" That SHEEN is TRUE! SHINJITSU = truth! Or: "MAH!" - "MA! It\'s TRUE!" MA = mah, true!'
  }
]

async function insertBatch() {
  console.log('⏰ N4 BATCH 3: Time, Nature & Numbers (30 kanji)')
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
  console.log(`✨ Batch 3 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
