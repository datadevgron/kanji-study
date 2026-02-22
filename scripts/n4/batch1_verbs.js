/**
 * N4 BATCH 1: Verbs & Actions (30 kanji)
 * 不世主事仕代以会住作使借切別動去始帰待持教止歩死
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/n4/batch1_verbs.js
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
    character: '不',
    radicals: [{ char: '一', name: 'one', meaning: 'one' }, { char: '不', name: 'not', meaning: 'negative' }],
    components: 'A bird unable to fly',
    story: 'A bird with clipped wings that canNOT fly! The top stroke is the sky it can\'t reach, and below shows the bird grounded. When something is NOT possible, it\'s blocked like this bird. Blocked = NOT!',
    hint: 'Blocked bird = not',
    reading_mnemonic: 'ふ/ぶ (fu/bu) - "FOO! NOT fair!" You complain "FOO!" when something is NOT right! Or: "BOO! NOT good!" BOO when you\'re NOT happy!'
  },
  {
    character: '世',
    radicals: [{ char: '世', name: 'world', meaning: 'generation/world' }],
    components: 'Three tens connected',
    story: 'Three TENS (十) connected through time - three GENERATIONS make a WORLD! Your grandparents, parents, and you = three generations experiencing the WORLD. Thirty years = one GENERATION in the WORLD!',
    hint: 'Three tens = generation/world',
    reading_mnemonic: 'せ/せい/よ (se/sei/yo) - "SAY hello to the WORLD!" SAY hi to every GENERATION! Or: "YO, WORLD!" - "YO!" you greet the WORLD! SEKAI = "say-kai" - say to the world!'
  },
  {
    character: '主',
    radicals: [{ char: '丶', name: 'dot', meaning: 'drop' }, { char: '王', name: 'king', meaning: 'king' }],
    components: 'Dot above king',
    story: 'A dot (crown jewel) above the KING (王) - that\'s the MAIN person, the MASTER! The king with his crown is the LORD and MASTER. The most important person = MAIN/MASTER!',
    hint: 'Crowned king = main/master',
    reading_mnemonic: 'しゅ/ぬし/おも (shu/nushi/omo) - "SHOE of the MASTER!" The MASTER\'s fancy SHOE! Or: "NEW-SHE is the OWNER!" NUSHI = "new-she" - the new owner!'
  },
  {
    character: '事',
    radicals: [{ char: '事', name: 'thing', meaning: 'matter/thing' }],
    components: 'Hand holding brush writing tasks',
    story: 'A hand holding a brush writing down MATTERS to handle! All the THINGS you need to do get written as TASKS. When you have business MATTERS, you write them down. Writing tasks = THING/MATTER!',
    hint: 'Writing tasks = thing/matter',
    reading_mnemonic: 'じ/こと (ji/koto) - "GEE, so many THINGS!" GEE, there are so many MATTERS! Or: "CO-TOE!" - Every THING from head to TOE! KOTO = "co-toe" - things from top to bottom!'
  },
  {
    character: '仕',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '士', name: 'samurai', meaning: 'warrior/official' }],
    components: '亻 (person) + 士 (samurai)',
    story: 'A PERSON (亻) who is a SAMURAI (士) - they SERVE their lord! Samurai don\'t just fight, they SERVE. A person dedicated to SERVICE. Person + warrior = SERVE!',
    hint: 'Person + samurai = serve',
    reading_mnemonic: 'し/つか (shi/tsuka) - "SHE SERVES tea!" SHE is serving! Or: "TSUKA-eru!" - "SKA band SERVES music!" TSUKAERU = "ska-eru" - serve like a ska band serves beats!'
  },
  {
    character: '代',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '弋', name: 'arrow', meaning: 'stake/substitute' }],
    components: '亻 (person) + 弋 (substitute)',
    story: 'A PERSON (亻) who SUBSTITUTES (弋) for another - that\'s a GENERATION or SUBSTITUTE! Each generation replaces the previous. One person takes the place of another through the AGES. Person replacing = GENERATION/SUBSTITUTE!',
    hint: 'Person substituting = generation/substitute',
    reading_mnemonic: 'だい/たい/か/よ (dai/tai/ka/yo) - "DIE and next GENERATION takes over!" When you DIE, the next GENERATION SUBSTITUTES! Or: "KA-waru!" - "CAR changes!" KAWARU = change/substitute!'
  },
  {
    character: '以',
    radicals: [{ char: '以', name: 'by means of', meaning: 'by means of' }],
    components: 'Person using a tool',
    story: 'A person using a tool or plow - doing something BY MEANS OF an instrument! You accomplish things BY USING tools. Everything you do FROM a point onward uses this. By means of = BY/FROM!',
    hint: 'Using tools = by means of',
    reading_mnemonic: 'い (i) - "EE-asy BY means of this!" It\'s EASY by using this! I = ee = by means of something, it\'s easy!'
  },
  {
    character: '住',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '主', name: 'master', meaning: 'main/master' }],
    components: '亻 (person) + 主 (master)',
    story: 'A PERSON (亻) who is MASTER (主) of their place - they LIVE there! The master of the house LIVES there. Where you are master is where you RESIDE. Person + master of place = LIVE/DWELL!',
    hint: 'Person master of place = live',
    reading_mnemonic: 'じゅう/す (juu/su) - "JEWS LIVE everywhere!" People LIVE all around! Or: "SUE-mu!" - "SUE moved to LIVE there!" SUMU = "sue-moo" - Sue lives there now!'
  },
  {
    character: '作',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '乍', name: 'suddenly', meaning: 'for the first time' }],
    components: '亻 (person) + 乍 (doing)',
    story: 'A PERSON (亻) doing something for the first time (乍) - MAKING something! When you CREATE, you bring something into existence. A person making = CREATE/MAKE!',
    hint: 'Person creating = make',
    reading_mnemonic: 'さく/さ/つく (saku/sa/tsuku) - "SOCK MAKER!" Someone who MAKES SOCKS! SAKU = sock maker! Or: "TSUKU-ru!" - "Took COUP to MAKE it!" TSUKURU = took effort to make!'
  },
  {
    character: '使',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '吏', name: 'official', meaning: 'officer' }],
    components: '亻 (person) + 吏 (official)',
    story: 'A PERSON (亻) employed as an OFFICIAL (吏) - they USE their authority! Officials USE their power. When you USE something, you employ it. Person employing = USE!',
    hint: 'Person employing = use',
    reading_mnemonic: 'し/つか (shi/tsuka) - "SHE USES it!" SHE knows how to USE things! Or: "TSUKA-u!" - "SKA band USES instruments!" TSUKAU = use (like using instruments)!'
  },
  {
    character: '借',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '昔', name: 'past', meaning: 'once upon a time' }],
    components: '亻 (person) + 昔 (past/long ago)',
    story: 'A PERSON (亻) getting something from the PAST (昔) - BORROWING! When you BORROW, you take something that will return later (like from the past to the future). Person + past = BORROW!',
    hint: 'Person getting from past = borrow',
    reading_mnemonic: 'しゃく/か (shaku/ka) - "SHOCK! You BORROWED that?!" Or: "KA-riru!" - "CAR I rented - I BORROWED it!" KARIRU = "car-ee-roo" - borrowed the car!'
  },
  {
    character: '切',
    radicals: [{ char: '七', name: 'seven', meaning: 'seven' }, { char: '刀', name: 'sword', meaning: 'sword/cut' }],
    components: '七 (seven) + 刀 (sword)',
    story: 'SEVEN (七) SWORD (刀) cuts - CUT it into seven pieces! A blade that slices - that\'s CUTTING! The sword makes clean CUTS. Seven + sword = CUT!',
    hint: 'Seven sword cuts = cut',
    reading_mnemonic: 'せつ/き (setsu/ki) - "SET the knife to CUT!" SET up and CUT! Or: "KEY-ru!" - "Use KEY to CUT the tape!" KIRU = cut with a key-like motion!'
  },
  {
    character: '別',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '刂', name: 'knife', meaning: 'blade' }],
    components: 'Mouth/bone + knife',
    story: 'A KNIFE (刂) cutting to SEPARATE things - that\'s making a DISTINCTION! When you cut something apart, you make things DIFFERENT and SEPARATE. Cutting apart = SEPARATE/DIFFERENT!',
    hint: 'Knife separating = separate/different',
    reading_mnemonic: 'べつ/わか (betsu/waka) - "BET SUE will SEPARATE!" I BET they\'ll be DIFFERENT! Or: "WAKA-reru!" - "WALK AWAY to SEPARATE!" WAKARERU = walk away, separate!'
  },
  {
    character: '動',
    radicals: [{ char: '重', name: 'heavy', meaning: 'heavy' }, { char: '力', name: 'power', meaning: 'strength' }],
    components: '重 (heavy) + 力 (power)',
    story: 'It takes POWER (力) to move something HEAVY (重) - that\'s MOVEMENT! When you apply force to weight, things MOVE. Strength against weight = MOVE!',
    hint: 'Power moves heavy = move',
    reading_mnemonic: 'どう/うご (dou/ugo) - "DOH! It MOVED!" Homer says DOH when things MOVE! Or: "OOH-GO!" - "OOH, GO! MOVE it!" UGOKU = ooh-go-koo - ooh, it\'s moving!'
  },
  {
    character: '去',
    radicals: [{ char: '土', name: 'earth', meaning: 'earth' }, { char: '厶', name: 'private', meaning: 'self' }],
    components: '土 (earth) + legs leaving',
    story: 'Leaving the EARTH (土), going AWAY - that\'s LEAVING! When you GO AWAY from a place, you depart. The PAST has LEFT us. Departing = LEAVE/PAST!',
    hint: 'Leaving earth = leave/past',
    reading_mnemonic: 'きょ/こ/さ (kyo/ko/sa) - "KILL me, I have to LEAVE!" Don\'t GO! Or: "SAH-ru!" - "SAH-RA left! She\'s GONE!" SARU = Sarah left, went away!'
  },
  {
    character: '始',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '台', name: 'platform', meaning: 'stand' }],
    components: '女 (woman) + 台 (platform)',
    story: 'A WOMAN (女) stepping onto a PLATFORM (台) to BEGIN! She takes the stage to START the show. Everything has a BEGINNING. Woman on stage = BEGIN!',
    hint: 'Woman on stage = begin',
    reading_mnemonic: 'し/はじ (shi/haji) - "SHE\'s BEGINNING!" SHE\'s about to START! Or: "HA-JEE-meru!" - "HA! GEE, let\'s BEGIN!" HAJIMERU = ha, gee, let\'s start!'
  },
  {
    character: '帰',
    radicals: [{ char: '帚', name: 'broom', meaning: 'broom' }, { char: '巾', name: 'cloth', meaning: 'cloth' }],
    components: 'Broom sweeping home',
    story: 'Sweeping with a BROOM when you RETURN home! When you GO BACK home, you clean up. The place where you RETURN to sweep = home. Coming back = RETURN!',
    hint: 'Broom at home = return',
    reading_mnemonic: 'き/かえ (ki/kae) - "KEY to RETURN home!" Use your KEY when you RETURN! Or: "KA-ERU!" - "CAR! ARROW points home!" KAERU = car-eh-roo, return by car!'
  },
  {
    character: '待',
    radicals: [{ char: '彳', name: 'step', meaning: 'step/go' }, { char: '寺', name: 'temple', meaning: 'temple' }],
    components: '彳 (step) + 寺 (temple)',
    story: 'WALKING (彳) to a TEMPLE (寺) and WAITING! At the temple, people wait patiently for their turn to pray. Going to temple and waiting = WAIT!',
    hint: 'Walking to temple and waiting = wait',
    reading_mnemonic: 'たい/ま (tai/ma) - "TIE your shoes while you WAIT!" Take TIME while WAITING! Or: "MAH-tsu!" - "MA! Wait for TSUnami to pass!" MATSU = ma, wait for the tsu!'
  },
  {
    character: '持',
    radicals: [{ char: '扌', name: 'hand', meaning: 'hand' }, { char: '寺', name: 'temple', meaning: 'temple' }],
    components: '扌 (hand) + 寺 (temple)',
    story: 'A HAND (扌) at the TEMPLE (寺) HOLDING offerings! You HOLD your hands together at temple, or HOLD gifts to offer. Hand + temple = HOLD/HAVE!',
    hint: 'Hand at temple = hold/have',
    reading_mnemonic: 'じ/も (ji/mo) - "GEE, HOLD on!" GEE, I\'m HOLDING it! Or: "MOH-tsu!" - "MOW the lawn? TSU - I\'m HOLDING the mower!" MOTSU = holding the mower!'
  },
  {
    character: '教',
    radicals: [{ char: '孝', name: 'filial piety', meaning: 'respect' }, { char: '攵', name: 'strike', meaning: 'action/strike' }],
    components: '孝 (respect) + 攵 (action)',
    story: 'Taking ACTION (攵) to instill RESPECT/filial piety (孝) - that\'s TEACHING! Teachers take action to educate. Passing on values through action = TEACH!',
    hint: 'Action to instill respect = teach',
    reading_mnemonic: 'きょう/おし (kyou/oshi) - "KYOTO TEACHERS!" Teachers from KYOTO! Or: "OH-SHE-eru!" - "OH! SHE TEACHES!" OSHIERU = oh, she teaches!'
  },
  {
    character: '止',
    radicals: [{ char: '止', name: 'stop', meaning: 'stop/foot' }],
    components: 'A foot stopping',
    story: 'A FOOT that has STOPPED moving! The kanji looks like a footprint - when you plant your foot, you STOP. The foot settles = STOP!',
    hint: 'Foot planted = stop',
    reading_mnemonic: 'し/と (shi/to) - "SHE STOPPED!" SHE came to a STOP! Or: "TOH-maru!" - "TOE! MAR the floor when you STOP!" TOMARU = toe marks when stopping!'
  },
  {
    character: '歩',
    radicals: [{ char: '止', name: 'stop', meaning: 'foot' }, { char: '少', name: 'few', meaning: 'little' }],
    components: '止 (foot) + 少 (little)',
    story: 'Taking LITTLE (少) steps with your FOOT (止) - that\'s WALKING! Walk step by step, small movements at a time. Little foot movements = WALK!',
    hint: 'Little foot steps = walk',
    reading_mnemonic: 'ほ/ある/あゆ (ho/aru/ayu) - "HO HO HO, Santa WALKS!" Santa WALKS saying HO! Or: "AH-ROO-ku!" - "AH, ROOK walks in chess!" ARUKU = ah, roo-koo, walking rook!'
  },
  {
    character: '死',
    radicals: [{ char: '歹', name: 'bad/death', meaning: 'death/decay' }, { char: '匕', name: 'spoon', meaning: 'person fallen' }],
    components: '歹 (death) + 匕 (fallen person)',
    story: 'The DEATH radical (歹) with a fallen person (匕) - that\'s DEATH! When bones (歹) appear and a person falls (匕), life ends. Decay + fallen = DEATH!',
    hint: 'Bones + fallen = death',
    reading_mnemonic: 'し/し (shi/shi) - "SHE faced DEATH!" SHE - DEATH is scary! The number 4 (shi) is unlucky because it sounds like DEATH (shi)! SHINU = she-knew death was coming!'
  },
  {
    character: '注',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '主', name: 'master', meaning: 'main/pour' }],
    components: '氵 (water) + 主 (main/lord)',
    story: 'WATER (氵) being the MAIN (主) focus - POURING or paying ATTENTION! When you pour, water is the main thing. When you focus, attention is poured. Water + main = POUR/ATTENTION!',
    hint: 'Water main focus = pour/attention',
    reading_mnemonic: 'ちゅう/そそ (chuu/soso) - "CHEW and pay ATTENTION!" CHEW slowly, pay ATTENTION to food! Or: "SO-SO-gu!" - "SO SO good when you POUR!" SOSOGU = so-so-goo, pour it!'
  },
  {
    character: '洋',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '羊', name: 'sheep', meaning: 'sheep' }],
    components: '氵 (water) + 羊 (sheep)',
    story: 'WATER (氵) with SHEEP (羊) - the vast OCEAN where sheep were shipped across to the WEST! The big waters = OCEAN/WESTERN style! Water + sheep = OCEAN/WESTERN!',
    hint: 'Water + sheep = ocean/western',
    reading_mnemonic: 'よう (you) - "YO, that\'s WESTERN!" YO, look at that OCEAN! YOU see the Western OCEAN! YOUSHOKU = Western food from across the ocean!'
  },
  {
    character: '発',
    radicals: [{ char: '癶', name: 'footsteps', meaning: 'departure' }, { char: '殳', name: 'weapon', meaning: 'strike' }],
    components: 'Departure + action',
    story: 'DEPARTING footsteps ready to GO - DEPARTURE! When you START something, you EMIT energy and DEPART. The beginning of movement = EMIT/DEPARTURE!',
    hint: 'Departing footsteps = emit/departure',
    reading_mnemonic: 'はつ/ほつ (hatsu/hotsu) - "HATS off, we DEPART!" Take your HAT and START! HATSU = hat-sue, departure! First DEPARTURE with your hat!'
  },
  {
    character: '送',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '关', name: 'send', meaning: 'accompany' }],
    components: '辶 (movement) + 关 (accompany)',
    story: 'MOVEMENT (辶) to accompany someone - SENDING them off! When you SEND something, it travels on the road. Escort someone along the path = SEND!',
    hint: 'Movement accompanying = send',
    reading_mnemonic: 'そう/おく (sou/oku) - "SO, I\'ll SEND it!" SO, let me SEND this! Or: "OH-KU-ru!" - "OH, COURIER to SEND!" OKURU = oh-koo-roo, courier sends!'
  },
  {
    character: '届',
    radicals: [{ char: '尸', name: 'body', meaning: 'body/flag' }, { char: '届', name: 'deliver', meaning: 'reach' }],
    components: 'Body reaching to deliver',
    story: 'A body (尸) reaching out to DELIVER something - it REACHES its destination! When you DELIVER, you make sure it REACHES. Reaching out = DELIVER/REACH!',
    hint: 'Body reaching = deliver',
    reading_mnemonic: 'とど (todo) - "TO-DO: DELIVER!" On your TO-DO list: DELIVER this! TODOKU = to-do-koo, it reached the destination!'
  },
  {
    character: '転',
    radicals: [{ char: '車', name: 'car', meaning: 'vehicle' }, { char: '云', name: 'cloud', meaning: 'revolve' }],
    components: '車 (vehicle) + 云 (revolve)',
    story: 'A VEHICLE (車) that REVOLVES/rolls - wheels TURNING! When wheels ROLL, things TURN over. Cars roll, people tumble = ROLL/TURN!',
    hint: 'Vehicle revolving = roll/turn',
    reading_mnemonic: 'てん/ころ (ten/koro) - "TEN times it ROLLED!" It TURNED TEN times! Or: "KO-RO-bu!" - "COLA ROLLS over!" KOROBU = cola-ro-boo, it rolled!'
  },
  {
    character: '運',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '軍', name: 'army', meaning: 'army' }],
    components: '辶 (movement) + 軍 (army)',
    story: 'An ARMY (軍) on the MOVE (辶) - CARRYING supplies, TRANSPORTING troops! Military movement requires LUCK too. Movement + army = CARRY/LUCK!',
    hint: 'Army moving = carry/luck',
    reading_mnemonic: 'うん/はこ (un/hako) - "UN-lucky if you can\'t CARRY it!" Need LUCK to TRANSPORT! Or: "HAKO-bu!" - "HACK-OH, I\'ll CARRY it!" HAKOBU = hack-oh-boo, carry it!'
  }
]

async function insertBatch() {
  console.log('🏃 N4 BATCH 1: Verbs & Actions (30 kanji)')
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
  console.log(`✨ Batch 1 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
