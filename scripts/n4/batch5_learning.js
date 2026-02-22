/**
 * N4 BATCH 5: Learning, Culture & Activities (30 kanji)
 * 英語文字料理写教歌楽音勉習考思意心急悪正同紙終送転
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/n4/batch5_learning.js
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
    character: '英',
    radicals: [{ char: '艹', name: 'grass', meaning: 'plant' }, { char: '央', name: 'center', meaning: 'center' }],
    components: '艹 (grass) + 央 (center)',
    story: 'The CENTER (央) flower among the GRASS (艹) - ENGLAND/BRILLIANT! Like the brightest flower standing out. Brilliant flower = ENGLAND!',
    hint: 'Brilliant flower = England',
    reading_mnemonic: 'えい (ei) - "A! ENGLISH!" EI-GO = English! EI = England! EIGO = English language!'
  },
  {
    character: '語',
    radicals: [{ char: '言', name: 'say', meaning: 'words' }, { char: '吾', name: 'I', meaning: 'self' }],
    components: '言 (words) + 吾 (I/self)',
    story: 'The WORDS (言) of one\'s SELF (吾) - LANGUAGE! The words you express yourself with. Personal words = LANGUAGE!',
    hint: 'Self words = language',
    reading_mnemonic: 'ご/かた (go/kata) - "GO speak the LANGUAGE!" NIHONGO = Japanese! EIGO = English! Or: "KAH-TAH-roo!" - KATARU = tell/speak!'
  },
  {
    character: '文',
    radicals: [{ char: '文', name: 'writing', meaning: 'pattern/writing' }],
    components: 'Crossed lines = pattern',
    story: 'Crossed lines making a PATTERN - WRITING/SENTENCE! Written patterns form sentences. Pattern marks = WRITING!',
    hint: 'Pattern marks = writing',
    reading_mnemonic: 'ぶん/もん (bun/mon) - "BUN is WRITING!" BUNPOU = grammar! BUNSHOU = sentence! MONKU = complaint!'
  },
  {
    character: '字',
    radicals: [{ char: '宀', name: 'roof', meaning: 'roof' }, { char: '子', name: 'child', meaning: 'child' }],
    components: '宀 (roof) + 子 (child)',
    story: 'A CHILD (子) learning under a ROOF (宀) - CHARACTER/LETTER! Children learn letters at home. Child learning = CHARACTER!',
    hint: 'Child under roof = character',
    reading_mnemonic: 'じ (ji) - "G! That\'s a CHARACTER!" KANJI = Chinese characters! MOJI = letters! JI = character!'
  },
  {
    character: '料',
    radicals: [{ char: '米', name: 'rice', meaning: 'rice' }, { char: '斗', name: 'measure', meaning: 'scoop' }],
    components: '米 (rice) + 斗 (measure)',
    story: 'MEASURING (斗) out RICE (米) - INGREDIENTS/FEE! Measured portions for cooking or paying. Measured rice = INGREDIENTS!',
    hint: 'Measured rice = ingredients',
    reading_mnemonic: 'りょう (ryou) - "ROYAL INGREDIENTS!" RYOURI = cooking! RYOUKIN = fee! SHIRYOU = materials!'
  },
  {
    character: '理',
    radicals: [{ char: '王', name: 'king', meaning: 'king/jewel' }, { char: '里', name: 'village', meaning: 'village' }],
    components: '王 (king/jewel) + 里 (village)',
    story: 'The KING (王) organizing the VILLAGE (里) - REASON/LOGIC! Putting things in order. Organizing = REASON!',
    hint: 'King organizes = reason',
    reading_mnemonic: 'り (ri) - "REE-son is LOGIC!" RIYUU = reason! RYOURI = cooking (ingredients + reason)! KANRI = management!'
  },
  {
    character: '写',
    radicals: [{ char: '冖', name: 'cover', meaning: 'cover' }, { char: '与', name: 'give', meaning: 'give' }],
    components: 'Cover + give',
    story: 'COVERING something and GIVING a duplicate - COPY! Making a copy by covering and transferring. Duplicate = COPY!',
    hint: 'Transfer copy = copy',
    reading_mnemonic: 'しゃ/うつ (sha/utsu) - "SHOT a COPY!" SHASHIN = photograph! Or: "OO-TSU!" - "OOH, I\'ll COPY it!" UTSUSU = copy!'
  },
  {
    character: '教',
    radicals: [{ char: '孝', name: 'filial piety', meaning: 'respect' }, { char: '攵', name: 'strike', meaning: 'action' }],
    components: '孝 (respect) + 攵 (action)',
    story: 'Taking ACTION (攵) with RESPECT (孝) - TEACH! Teaching is respectful action. Respectful action = TEACH!',
    hint: 'Respectful action = teach',
    reading_mnemonic: 'きょう/おし (kyou/oshi) - "KEY-OH! TEACH me!" KYOUSHI = teacher! Or: "OH-SHEE!" - "OH SHE\'s the TEACHER!" OSHIERU = teach!'
  },
  {
    character: '歌',
    radicals: [{ char: '可', name: 'can', meaning: 'able' }, { char: '欠', name: 'lack', meaning: 'yawn/open mouth' }],
    components: '可 (able) + 欠 (open mouth)',
    story: 'ABLE (可) to open your MOUTH (欠) and sing - SONG! Opening your mouth to make music. Open mouth music = SONG!',
    hint: 'Open mouth able = song',
    reading_mnemonic: 'か/うた (ka/uta) - "KAH-raoke SONG!" KA = song! KARAOKE! Or: "OO-TAH!" - "OOH TAH-da! A SONG!" UTA = oo-tah, song!'
  },
  {
    character: '楽',
    radicals: [{ char: '白', name: 'white', meaning: 'white' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: 'White + 木 (tree)',
    story: 'A WHITE decorated TREE (木) - ENJOYMENT/MUSIC! A beautiful decorated tree brings joy. Decorated tree = ENJOY/MUSIC!',
    hint: 'Decorated tree = enjoy',
    reading_mnemonic: 'らく/がく/たの (raku/gaku/tano) - "ROCK to the MUSIC!" ONGAKU = music! Or: "TAH-NOH-shii!" - "TAH-NO! It\'s FUN!" TANOSHII = enjoyable!'
  },
  {
    character: '音',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }, { char: '日', name: 'sun', meaning: 'day' }],
    components: '立 (stand) + 日 (sun)',
    story: 'STANDING (立) under the SUN (日) listening - SOUND! Sound waves standing in the air. Standing waves = SOUND!',
    hint: 'Standing waves = sound',
    reading_mnemonic: 'おん/おと (on/oto) - "ON the SOUND!" Turn ON the SOUND! Or: "OH-TOH!" - "OH TOH-ne!" OTO = oh-toh, sound!'
  },
  {
    character: '勉',
    radicals: [{ char: '免', name: 'escape', meaning: 'escape' }, { char: '力', name: 'power', meaning: 'power' }],
    components: '免 (escape) + 力 (power)',
    story: 'Using POWER (力) to ESCAPE (免) ignorance - STUDY! Effort to escape not knowing. Power to escape = STUDY!',
    hint: 'Power to escape = study',
    reading_mnemonic: 'べん (ben) - "BEN STUDIES hard!" BENKYOU = study! Ben does BENKYOU!'
  },
  {
    character: '習',
    radicals: [{ char: '羽', name: 'wing', meaning: 'wings' }, { char: '白', name: 'white', meaning: 'white' }],
    components: '羽 (wings) + 白 (white)',
    story: 'A bird with WHITE (白) WINGS (羽) learning to fly - LEARN/PRACTICE! Baby birds practice flying. Practicing wings = LEARN!',
    hint: 'Practicing wings = learn',
    reading_mnemonic: 'しゅう/なら (shuu/nara) - "SHOE-lace PRACTICE!" SHU-UKYOU = practice! Or: "NAH-RAH-oo!" - "NAH RAH! I\'ll LEARN!" NARAU = learn!'
  },
  {
    character: '考',
    radicals: [{ char: '耂', name: 'old', meaning: 'old/wise' }, { char: '丂', name: 'bent', meaning: 'bent' }],
    components: '耂 (old/wise) + bent',
    story: 'An OLD (耂) wise person bent in THOUGHT - THINK! Wisdom comes from deep thinking. Wise bent = THINK!',
    hint: 'Wise pondering = think',
    reading_mnemonic: 'こう/かんが (kou/kanga) - "COW THINKS!" The COW ponders! Or: "KAHN-GAH-eh-roo!" - "KAN-GA! THINK about it!" KANGAERU = think!'
  },
  {
    character: '思',
    radicals: [{ char: '田', name: 'field', meaning: 'brain' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '田 (brain/field) + 心 (heart)',
    story: 'Your BRAIN (田) connected to your HEART (心) - THINK! True thinking combines head and heart. Brain + heart = THINK!',
    hint: 'Brain + heart = think',
    reading_mnemonic: 'し/おも (shi/omo) - "SHE THINKS!" SHE thinks with her heart! Or: "OH-MOH!" - "OH MOH! I THOUGHT so!" OMOU = oh-moh-oo, think!'
  },
  {
    character: '意',
    radicals: [{ char: '音', name: 'sound', meaning: 'sound' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '音 (sound) + 心 (heart)',
    story: 'The SOUND (音) of your HEART (心) - MEANING/INTENTION! What your heart sounds like = intention. Heart sound = MEANING!',
    hint: 'Heart sound = meaning',
    reading_mnemonic: 'い (i) - "EE! What\'s the MEANING?" IMI = meaning! IKEN = opinion! ISHIKI = consciousness!'
  },
  {
    character: '心',
    radicals: [{ char: '心', name: 'heart', meaning: 'heart' }],
    components: 'Heart shape',
    story: 'The shape of a HEART beating - HEART/MIND! Your emotional and mental center. Beating center = HEART!',
    hint: 'Beating center = heart',
    reading_mnemonic: 'しん/こころ (shin/kokoro) - "SHIN guards the HEART!" SHINZOU = heart organ! Or: "KOH-KOH-ROH!" - "COCOA warms my HEART!" KOKORO = heart/mind!'
  },
  {
    character: '急',
    radicals: [{ char: '刍', name: 'hand grabbing', meaning: 'grab' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: 'Grabbing + 心 (heart)',
    story: 'Your HEART (心) being GRABBED - URGENT! When something grabs your heart urgently. Grabbed heart = URGENT!',
    hint: 'Grabbed heart = urgent',
    reading_mnemonic: 'きゅう/いそ (kyuu/iso) - "QUEUE! It\'s URGENT!" Get in QUEUE! KYUU! Or: "EE-SOH!" - "ISO! HURRY!" ISOGU = hurry!'
  },
  {
    character: '悪',
    radicals: [{ char: '亜', name: 'second', meaning: 'inferior' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '亜 (inferior) + 心 (heart)',
    story: 'An INFERIOR (亜) HEART (心) - BAD/EVIL! A heart that\'s not good. Bad heart = BAD!',
    hint: 'Inferior heart = bad',
    reading_mnemonic: 'あく/わる (aku/waru) - "ACK! That\'s BAD!" AKU = evil! Or: "WAH-ROO!" - "WAH ROO! BAD dog!" WARUI = wah-roo-ee, bad!'
  },
  {
    character: '正',
    radicals: [{ char: '一', name: 'one', meaning: 'one' }, { char: '止', name: 'stop', meaning: 'stop/foot' }],
    components: '一 (one) + 止 (stop)',
    story: 'STOPPING (止) at ONE (一) standard - CORRECT! The one right way to stop. One standard = CORRECT!',
    hint: 'One standard = correct',
    reading_mnemonic: 'せい/ただ (sei/tada) - "SAY it\'s CORRECT!" SEIKAI = correct! Or: "TAH-DAH!" - "TA-DA! It\'s RIGHT!" TADASHII = correct!'
  },
  {
    character: '同',
    radicals: [{ char: '冂', name: 'border', meaning: 'box' }, { char: '一', name: 'one', meaning: 'one' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: 'Box + 一 (one) + 口 (mouth)',
    story: 'Everyone in the BOX saying ONE (一) thing with one MOUTH (口) - SAME! All together, same. United voice = SAME!',
    hint: 'One voice = same',
    reading_mnemonic: 'どう/おな (dou/ona) - "DOH! It\'s the SAME!" DOH-same! ONAJI = same! Or: "OH-NAH-jee!" - "OH NAH GEE! It\'s the SAME!" ONAJI = same!'
  },
  {
    character: '紙',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '氏', name: 'clan', meaning: 'clan' }],
    components: '糸 (thread) + 氏 (clan)',
    story: 'THREADS (糸) pressed together by a CLAN (氏) - PAPER! Ancient paper made from fiber. Pressed threads = PAPER!',
    hint: 'Pressed threads = paper',
    reading_mnemonic: 'し/かみ (shi/kami) - "SHE uses PAPER!" KAMI = paper! Or: "KAH-ME!" - "KA-ME! Turtle on PAPER!" KAMI = kah-me, paper!'
  },
  {
    character: '終',
    radicals: [{ char: '糸', name: 'thread', meaning: 'thread' }, { char: '冬', name: 'winter', meaning: 'winter' }],
    components: '糸 (thread) + 冬 (winter)',
    story: 'The THREAD (糸) reaches WINTER (冬) - END! The thread of the year ends in winter. Winter thread = END!',
    hint: 'Winter thread = end',
    reading_mnemonic: 'しゅう/お (shuu/o) - "SHOE at the END!" End of SHOE! SHUUTEN = last stop! Or: "OH-WAH-roo!" - "OH WAH! It\'s OVER!" OWARU = end!'
  },
  {
    character: '送',
    radicals: [{ char: '辶', name: 'road', meaning: 'movement' }, { char: '关', name: 'barrier', meaning: 'pass through' }],
    components: '辶 (road) + 关 (pass)',
    story: 'MOVEMENT (辶) past a barrier (关) - SEND! Sending something on its way. Sending along = SEND!',
    hint: 'Movement along = send',
    reading_mnemonic: 'そう/おく (sou/oku) - "SO, I\'ll SEND it!" SO-uryou = shipping! Or: "OH-KOO!" - "OH KOO! I\'ll SEND it!" OKURU = send!'
  },
  {
    character: '転',
    radicals: [{ char: '車', name: 'car', meaning: 'vehicle' }, { char: '云', name: 'cloud', meaning: 'turn' }],
    components: '車 (vehicle) + 云 (turn)',
    story: 'A VEHICLE (車) TURNING (云) - ROLL/TURN! Wheels turning and rolling. Vehicle turn = ROLL!',
    hint: 'Vehicle turning = roll',
    reading_mnemonic: 'てん/ころ (ten/koro) - "TEN TURNS!" UNTEN = driving! Or: "KOH-ROH!" - "KOH ROH-ll over!" KOROBU = fall over!'
  },
  {
    character: '旅',
    radicals: [{ char: '方', name: 'direction', meaning: 'direction' }, { char: '衣', name: 'clothes', meaning: 'people' }],
    components: '方 (direction) + 衣 (clothes/people)',
    story: 'PEOPLE (衣) heading in a DIRECTION (方) - TRAVEL! People moving toward destinations. Direction + people = TRAVEL!',
    hint: 'People heading direction = travel',
    reading_mnemonic: 'りょ/たび (ryo/tabi) - "RIO is a TRIP!" RYOKOU = travel! Or: "TAH-BEE!" - "TAH BEE! Time to TRAVEL!" TABI = trip!'
  },
  {
    character: '族',
    radicals: [{ char: '方', name: 'direction', meaning: 'banner' }, { char: '矢', name: 'arrow', meaning: 'arrow' }],
    components: '方 (banner) + 矢 (arrow)',
    story: 'A BANNER (方) with ARROWS (矢) - TRIBE/FAMILY! A clan united under one banner with warriors. Clan banner = TRIBE!',
    hint: 'Banner + arrows = tribe',
    reading_mnemonic: 'ぞく (zoku) - "ZO-KU! My TRIBE!" KAZOKU = family! MINZOKU = ethnic group!'
  },
  {
    character: '茶',
    radicals: [{ char: '艹', name: 'grass', meaning: 'plant' }, { char: '木', name: 'tree', meaning: 'tree' }, { char: '人', name: 'person', meaning: 'person' }],
    components: '艹 (plant) + 人 (person) + 木 (tree)',
    story: 'A PLANT (艹) that a PERSON (人) picks from a TREE (木) - TEA! Tea leaves from tea bushes. Picked plant = TEA!',
    hint: 'Picked plant = tea',
    reading_mnemonic: 'ちゃ/さ (cha/sa) - "CHA! TEA time!" OCHA = tea! CHA-iro = brown! KISSATEN = tea shop!'
  },
  {
    character: '用',
    radicals: [{ char: '用', name: 'use', meaning: 'use' }],
    components: 'Container being used',
    story: 'A container being USED for purpose - USE! The character shows something functional. Functional container = USE!',
    hint: 'Functional = use',
    reading_mnemonic: 'よう/もち (you/mochi) - "YO! I\'ll USE it!" RIYOU = use! YOUJI = errand! Or: "MOH-CHEE!" - "MOCHI is USED for New Year!" MOCHIIRU = use!'
  },
  {
    character: '物',
    radicals: [{ char: '牛', name: 'cow', meaning: 'animal' }, { char: '勿', name: 'not', meaning: 'various' }],
    components: '牛 (animal) + 勿 (various)',
    story: 'Various ANIMALS (牛) and things (勿) - THING! All sorts of objects and creatures. Various stuff = THING!',
    hint: 'Various stuff = thing',
    reading_mnemonic: 'ぶつ/もの (butsu/mono) - "BOOTS are THINGS!" NIMOTSU = luggage! Or: "MOH-NOH!" - "MOH NO! Too many THINGS!" MONO = thing!'
  }
]

async function insertBatch() {
  console.log('📚 N4 BATCH 5: Learning, Culture & Activities (30 kanji)')
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
  console.log(`✨ Batch 5 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
