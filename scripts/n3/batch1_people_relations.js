/**
 * N3 BATCH 1: People & Relations (30 kanji)
 * 与両交他付件任伝似位余例供便係信倒候値偉側偶備働優
 * 
 * Run: node scripts/n3/batch1_people_relations.js
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
    character: '与',
    radicals: [{ char: '一', name: 'one', meaning: 'one' }, { char: '与', name: 'give', meaning: 'give' }],
    components: 'Hands giving',
    story: 'Two hands reaching out to GIVE something - GIVE/PARTICIPATE! Sharing with others. Hands extending = GIVE!',
    hint: 'Hands extending = give',
    reading_mnemonic: 'よ/あた (yo/ata) - "YO! I\'ll GIVE it!" YO! Here you go! Or: "AH-TAH!" - "AH TAH-ke it!" ATAERU = give!'
  },
  {
    character: '両',
    radicals: [{ char: '一', name: 'one', meaning: 'one' }, { char: '冂', name: 'border', meaning: 'frame' }, { char: '山', name: 'mountain', meaning: 'mountain' }],
    components: 'Frame with two equal sides',
    story: 'A frame showing two equal SIDES - BOTH! Two matching halves. Equal sides = BOTH!',
    hint: 'Equal sides = both',
    reading_mnemonic: 'りょう (ryou) - "REAL-YO! BOTH of them!" RYOUHOU = both ways! RYOUSHIN = both parents!'
  },
  {
    character: '交',
    radicals: [{ char: '亠', name: 'lid', meaning: 'top' }, { char: '父', name: 'father', meaning: 'cross' }],
    components: 'Crossing lines',
    story: 'Lines CROSSING each other - EXCHANGE! When paths cross, people exchange. Crossing = EXCHANGE!',
    hint: 'Crossing = exchange',
    reading_mnemonic: 'こう/まじ/か (kou/maji/ka) - "CO-incidentally we EXCHANGED!" KOUTSUU = traffic! MAJIRU = mix! KAWARU = exchange!'
  },
  {
    character: '他',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '也', name: 'also', meaning: 'also' }],
    components: '亻 (person) + 也 (also)',
    story: 'A PERSON (亻) who is ALSO (也) there - OTHER! Someone else, another person. Also a person = OTHER!',
    hint: 'Also a person = other',
    reading_mnemonic: 'た/ほか (ta/hoka) - "TAH! The OTHER one!" TANIN = other people! Or: "HOH-KAH!" - "HOKA no!" HOKA = other!'
  },
  {
    character: '付',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '寸', name: 'inch', meaning: 'measure' }],
    components: '亻 (person) + 寸 (inch/hand)',
    story: 'A PERSON (亻) with a HAND (寸) - ATTACH! Someone sticking close, attaching. Person close = ATTACH!',
    hint: 'Person with hand = attach',
    reading_mnemonic: 'ふ/つ (fu/tsu) - "FOO! ATTACHED!" FUZOKU = attached! Or: "TSOO-keru!" - "TSUKE!" TSUKERU = attach!'
  },
  {
    character: '件',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '牛', name: 'cow', meaning: 'cow' }],
    components: '亻 (person) + 牛 (cow)',
    story: 'A PERSON (亻) counting COWS (牛) - MATTER/CASE! Each cow is a case to count. Counting items = MATTER!',
    hint: 'Person counts cows = matter',
    reading_mnemonic: 'けん (ken) - "KEN handles MATTERS!" JIKEN = incident! JOUKEN = condition!'
  },
  {
    character: '任',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '壬', name: 'burden', meaning: 'burden' }],
    components: '亻 (person) + 壬 (burden)',
    story: 'A PERSON (亻) carrying a BURDEN (壬) - DUTY/RESPONSIBILITY! The weight of duty on someone. Person with burden = DUTY!',
    hint: 'Person with burden = duty',
    reading_mnemonic: 'にん/まか (nin/maka) - "NIN-ja has DUTY!" SEKININ = responsibility! Or: "MAH-KAH-seru!" - MAKASERU = entrust!'
  },
  {
    character: '伝',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '云', name: 'cloud', meaning: 'say' }],
    components: '亻 (person) + 云 (say/cloud)',
    story: 'A PERSON (亻) passing on words like CLOUDS (云) - TRANSMIT! Information spreading from person to person. Person spreading = TRANSMIT!',
    hint: 'Person spreading words = transmit',
    reading_mnemonic: 'でん/つた (den/tsuta) - "DEN-nis TRANSMITS!" DENSETSU = legend! Or: "TSOO-TAH!" - TSUTAERU = convey!'
  },
  {
    character: '似',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '以', name: 'by means of', meaning: 'compare' }],
    components: '亻 (person) + 以 (compare)',
    story: 'A PERSON (亻) compared (以) to another - RESEMBLE! Looking alike when compared. Person compared = RESEMBLE!',
    hint: 'Person compared = resemble',
    reading_mnemonic: 'じ/に (ji/ni) - "GEE, they RESEMBLE!" RUIJI = similar! Or: "NEE-roo!" - NIRU = resemble!'
  },
  {
    character: '位',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '立', name: 'stand', meaning: 'stand' }],
    components: '亻 (person) + 立 (stand)',
    story: 'A PERSON (亻) STANDING (立) in their place - RANK/POSITION! Where you stand = your position. Person standing = RANK!',
    hint: 'Person standing = rank',
    reading_mnemonic: 'い/くらい (i/kurai) - "EE! What RANK?" ICHII = first place! Or: "KOO-RAH-ee!" - KURAI = rank/about!'
  },
  {
    character: '余',
    radicals: [{ char: '人', name: 'person', meaning: 'person' }, { char: '示', name: 'show', meaning: 'altar' }],
    components: 'Person + altar with extra',
    story: 'A person with EXTRA offerings at the altar - SURPLUS! More than needed. Extra = SURPLUS!',
    hint: 'Extra at altar = surplus',
    reading_mnemonic: 'よ/あま (yo/ama) - "YO! EXTRA stuff!" YOBUN = surplus! Or: "AH-MAH-roo!" - AMARU = be left over!'
  },
  {
    character: '例',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '列', name: 'row', meaning: 'row' }],
    components: '亻 (person) + 列 (row)',
    story: 'A PERSON (亻) in a ROW (列) of examples - EXAMPLE! One of many in a series. Person in row = EXAMPLE!',
    hint: 'Person in row = example',
    reading_mnemonic: 'れい/たと (rei/tato) - "RAY is an EXAMPLE!" TATOEBA = for example! REI = example!'
  },
  {
    character: '供',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '共', name: 'together', meaning: 'together' }],
    components: '亻 (person) + 共 (together)',
    story: 'A PERSON (亻) TOGETHER (共) with others - OFFER/ACCOMPANY! Providing together. Person together = OFFER!',
    hint: 'Person together = offer',
    reading_mnemonic: 'きょう/そな/とも (kyou/sona/tomo) - "KEY-OH! I OFFER!" TEIKYOU = provide! SONAERU = offer! KODOMO = child!'
  },
  {
    character: '便',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '更', name: 'change', meaning: 'renew' }],
    components: '亻 (person) + 更 (renew)',
    story: 'A PERSON (亻) making things RENEWED (更) and easy - CONVENIENCE! Making life easier. Person renewing = CONVENIENCE!',
    hint: 'Person renewing = convenience',
    reading_mnemonic: 'べん/びん/たよ (ben/bin/tayo) - "BEN-eficial CONVENIENCE!" BENRI = convenient! BIN = mail/flight! TAYORI = news!'
  },
  {
    character: '係',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '系', name: 'system', meaning: 'thread' }],
    components: '亻 (person) + 系 (thread/connection)',
    story: 'A PERSON (亻) connected by THREADS (系) - CONNECTION/CHARGE! The one responsible, connected. Person connected = IN CHARGE!',
    hint: 'Person connected = in charge',
    reading_mnemonic: 'けい/かか (kei/kaka) - "KAY is in CHARGE!" KANKEI = relation! Or: "KAH-KAH-ri!" - KAKARI = person in charge!'
  },
  {
    character: '信',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '言', name: 'say', meaning: 'words' }],
    components: '亻 (person) + 言 (words)',
    story: 'A PERSON (亻) whose WORDS (言) you trust - BELIEVE! Words from a trustworthy person. Person\'s words = BELIEVE!',
    hint: 'Person\'s words = believe',
    reading_mnemonic: 'しん (shin) - "SHIN BELIEVES!" SHINJIRU = believe! SHINRAI = trust! SHINNEN = faith!'
  },
  {
    character: '倒',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '到', name: 'arrive', meaning: 'arrive/reach' }],
    components: '亻 (person) + 到 (arrive/fall)',
    story: 'A PERSON (亻) who has arrived at the ground - FALL DOWN! Collapsed on arrival. Person falling = FALL DOWN!',
    hint: 'Person falling = fall down',
    reading_mnemonic: 'とう/たお (tou/tao) - "TOE trips, FALL DOWN!" TAORERU = fall down! MENDOU = trouble!'
  },
  {
    character: '候',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '矦', name: 'wait', meaning: 'arrow/wait' }],
    components: '亻 (person) + 矦 (wait)',
    story: 'A PERSON (亻) WAITING like an arrow ready - CLIMATE/SEASON! Observing and waiting. Person waiting = CLIMATE!',
    hint: 'Person waiting = climate',
    reading_mnemonic: 'こう (kou) - "COW waits for WEATHER!" KIKOU = climate! TENKOU = weather! KOUHO = candidate!'
  },
  {
    character: '値',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '直', name: 'straight', meaning: 'straight' }],
    components: '亻 (person) + 直 (straight)',
    story: 'A PERSON (亻) standing STRAIGHT (直) at a price - VALUE! The worth of something direct. Person straight = VALUE!',
    hint: 'Person standing straight = value',
    reading_mnemonic: 'ち/ね/あたい (chi/ne/atai) - "CHEAP VALUE?" NEDAN = price! ATAI = value! KACHI = value!'
  },
  {
    character: '偉',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '韋', name: 'leather', meaning: 'surround' }],
    components: '亻 (person) + 韋 (surround/great)',
    story: 'A PERSON (亻) surrounded by greatness (韋) - GREAT/ADMIRABLE! Someone impressive. Person great = GREAT!',
    hint: 'Person surrounded = great',
    reading_mnemonic: 'い/えら (i/era) - "EE! How GREAT!" ERAI = great! IJIN = great person!'
  },
  {
    character: '側',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '則', name: 'rule', meaning: 'rule' }],
    components: '亻 (person) + 則 (rule/beside)',
    story: 'A PERSON (亻) standing beside the rule (則) - SIDE! Standing to the side. Person beside = SIDE!',
    hint: 'Person beside = side',
    reading_mnemonic: 'そく/がわ (soku/gawa) - "SOCK on one SIDE!" MIGAWA = right side! HIDARIGAWA = left side!'
  },
  {
    character: '偶',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '禺', name: 'corner', meaning: 'puppet' }],
    components: '亻 (person) + 禺 (puppet/pair)',
    story: 'A PERSON (亻) paired like a puppet (禺) - ACCIDENTALLY/PAIR! Chance pairing. Person paired = ACCIDENTAL!',
    hint: 'Person paired = accidental',
    reading_mnemonic: 'ぐう/たま (guu/tama) - "GOO! By ACCIDENT!" GUUZEN = by chance! TAMATAMA = accidentally!'
  },
  {
    character: '備',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '備', name: 'prepare', meaning: 'arrows ready' }],
    components: '亻 (person) + prepared arrows',
    story: 'A PERSON (亻) with arrows all PREPARED - PREPARE! Ready with equipment. Person prepared = PREPARE!',
    hint: 'Person with equipment = prepare',
    reading_mnemonic: 'び/そな (bi/sona) - "BE PREPARED!" JUNBI = preparation! SONAERU = prepare!'
  },
  {
    character: '働',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '動', name: 'move', meaning: 'move' }],
    components: '亻 (person) + 動 (move)',
    story: 'A PERSON (亻) in MOTION (動) - WORK! A person moving and working. Person moving = WORK!',
    hint: 'Person moving = work',
    reading_mnemonic: 'どう/はたら (dou/hatara) - "DOH! Time to WORK!" Or: "HAH-TAH-RAH-ku!" - HATARAKU = work!'
  },
  {
    character: '優',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '憂', name: 'grief', meaning: 'heart/care' }],
    components: '亻 (person) + 憂 (caring heart)',
    story: 'A PERSON (亻) with a caring heart (憂) - GENTLE/SUPERIOR! Kind and excellent. Caring person = GENTLE/SUPERIOR!',
    hint: 'Caring person = gentle',
    reading_mnemonic: 'ゆう/やさ/すぐ (yuu/yasa/sugu) - "YOU are EXCELLENT!" YUUSHUU = excellent! YASASHII = gentle! SUGURERU = excel!'
  },
  {
    character: '光',
    radicals: [{ char: '⺌', name: 'little', meaning: 'rays' }, { char: '儿', name: 'legs', meaning: 'person' }],
    components: 'Rays + 儿 (person)',
    story: 'RAYS shining from a person (儿) - LIGHT! Brightness emanating. Rays from person = LIGHT!',
    hint: 'Rays from person = light',
    reading_mnemonic: 'こう/ひか (kou/hika) - "CO-lor of LIGHT!" HIKARI = light! KOUSEN = beam of light!'
  },
  {
    character: '全',
    radicals: [{ char: '入', name: 'enter', meaning: 'enter' }, { char: '王', name: 'king', meaning: 'king' }],
    components: '入 (enter) + 王 (king)',
    story: 'ENTERING (入) the KING\'s (王) domain completely - ALL/WHOLE! Everything included. All enter = ALL!',
    hint: 'All enter = whole',
    reading_mnemonic: 'ぜん/まった/すべ (zen/matta/sube) - "ZEN is ALL!" ZENBU = all! MATTAKU = completely! SUBETE = everything!'
  },
  {
    character: '共',
    radicals: [{ char: '廾', name: 'hands', meaning: 'two hands' }, { char: '八', name: 'eight', meaning: 'divide' }],
    components: 'Two hands together',
    story: 'Two HANDS (廾) working TOGETHER - TOGETHER! Cooperation. Hands united = TOGETHER!',
    hint: 'Hands united = together',
    reading_mnemonic: 'きょう/とも (kyou/tomo) - "KEY-OH TOGETHER!" KYOUTSUU = common! TOMO = together!'
  },
  {
    character: '具',
    radicals: [{ char: '目', name: 'eye', meaning: 'eye' }, { char: '一', name: 'one', meaning: 'shelf' }, { char: '八', name: 'eight', meaning: 'legs' }],
    components: '目 (eye) + shelf + legs',
    story: 'An EYE (目) checking TOOLS on a shelf - TOOL/EQUIPMENT! Inspecting equipment. Eye checks tools = TOOL!',
    hint: 'Eye checks tools = tool',
    reading_mnemonic: 'ぐ (gu) - "GOO-d TOOLS!" DOUGU = tool! GUAI = condition! GUTAI = concrete!'
  },
  {
    character: '内',
    radicals: [{ char: '冂', name: 'border', meaning: 'frame' }, { char: '人', name: 'person', meaning: 'person' }],
    components: '冂 (frame) + 人 (person)',
    story: 'A PERSON (人) inside a FRAME (冂) - INSIDE! Contained within. Person in frame = INSIDE!',
    hint: 'Person in frame = inside',
    reading_mnemonic: 'ない/うち (nai/uchi) - "NIGH inside!" NAIBU = inside! UCHI = inside/home!'
  }
]

async function insertBatch() {
  console.log('👥 N3 BATCH 1: People & Relations (30 kanji)')
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
  console.log(`✨ Batch 1 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
