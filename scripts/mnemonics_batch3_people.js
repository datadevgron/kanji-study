/**
 * BATCH 3: People & Body 人大小子女男口目耳手足心体
 * 
 * Quality mnemonics with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch3_people.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_3 = [
  {
    character: '人',
    radicals: [{ char: '人', name: 'person', meaning: 'person' }],
    components: 'Two legs walking',
    story: 'Two legs walking - it\'s a PERSON! Picture someone walking away from you - all you see is their two legs in a V shape. Every PERSON walks on two legs. The simplest drawing of a human: just the legs!',
    hint: 'Two legs = person',
    reading_mnemonic: 'じん/にん/ひと (jin/nin/hito) - "JEAN!" Every PERSON wears JEANs! "NIN-ja!" - a NINja is a PERSON in black! Or: "HE-TOE!" - HE stubbed his TOE! Every PERSON has toes!'
  },
  {
    character: '大',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }],
    components: 'Person with arms stretched wide',
    story: 'A PERSON with arms stretched out wide saying "It was THIS BIG!" When you describe something BIG, you spread your arms wide! The kanji is a person (人) with an extra line for stretched arms showing something HUGE!',
    hint: 'Person spreading arms = big',
    reading_mnemonic: 'だい/たい/おお (dai/tai/oo) - "DIE-NO-SAUR!" DIE-nosaurs are BIG! Or: "TIE!" - This TIE is too BIG for me! Or: "OH-OH!" - "OH-OH, that\'s BIG!" You gasp at something HUGE!'
  },
  {
    character: '小',
    radicals: [{ char: '小', name: 'small', meaning: 'small' }],
    components: 'Something being divided into tiny pieces',
    story: 'Take something and chop it into SMALL pieces! The vertical line is a knife cutting, and the two dots are the tiny pieces flying off. Keep cutting until everything is SMALL. Or: a tiny person with arms down - so SMALL!',
    hint: 'Divided into bits = small',
    reading_mnemonic: 'しょう/ちい/こ (shou/chii/ko) - "SHOW me something SMALL!" Or: "CHEE-Z!" - CHEESE cut into SMALL pieces! Or: "CO-in!" - A SMALL COin! KO sounds like a baby\'s first word - babies are SMALL!'
  },
  {
    character: '子',
    radicals: [{ char: '子', name: 'child', meaning: 'child' }],
    components: 'A baby with arms reaching',
    story: 'A CHILD reaching up with arms to be picked up! The top part is the head, the horizontal line is arms reaching out, and the hook is the body. Every CHILD reaches up to their parents. "Pick me up!"',
    hint: 'Baby reaching up = child',
    reading_mnemonic: 'し/こ (shi/ko) - "SHE\'s a CHILD!" SHE is still a little CHILD! Or: "KO-ala!" - A baby KOala is a CHILD koala! KO = little one, CHILD!'
  },
  {
    character: '女',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }],
    components: 'An elegant kneeling figure',
    story: 'A WOMAN in a beautiful pose! Picture a woman kneeling elegantly in a kimono - legs crossed, graceful posture. The curved lines show her elegant, flowing form. In ancient Japan, WOMEN sat this way!',
    hint: 'Elegant kneeling pose = woman',
    reading_mnemonic: 'じょ/にょ/おんな (jo/nyo/onna) - "JO-anne!" JOanne is a WOMAN! Or: "ON-NA!" - "Oh, NANA!" Your grandma (NANA) is a wise WOMAN! ONNA sounds like "Oh, Nana!"'
  },
  {
    character: '男',
    radicals: [{ char: '田', name: 'rice field', meaning: 'field' }, { char: '力', name: 'power', meaning: 'strength' }],
    components: '田 (rice field) + 力 (power/strength)',
    story: 'Who works the rice FIELDS (田) with STRENGTH (力)? The MAN! In traditional Japan, MEN used their power to plow the fields. FIELD + POWER = MAN. A man is someone who uses strength in the fields!',
    hint: 'Field + power = man',
    reading_mnemonic: 'だん/なん/おとこ (dan/nan/otoko) - "DAN is a MAN!" Daniel - DAN - is a strong MAN! Or: "OH-TOE-KO!" - "OH, the TOe KO-ck!" A MAN kicks with his toe!'
  },
  {
    character: '口',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }],
    components: 'An open mouth shape',
    story: 'Open your MOUTH wide and look in a mirror - it\'s a square hole! The kanji is just a simple open MOUTH shape. When you say "Ahhhh" at the doctor, your MOUTH makes this square shape!',
    hint: 'Open square = mouth',
    reading_mnemonic: 'こう/く/くち (kou/ku/kuchi) - "COUP!" A chicken\'s MOUTH goes "COUP COUP!" Or: "KOO-CHEE!" - "KOO-CHEE-KOO!" You make baby sounds with your MOUTH! KUCHI = mouth sounds!'
  },
  {
    character: '目',
    radicals: [{ char: '目', name: 'eye', meaning: 'eye' }],
    components: 'An eye turned sideways',
    story: 'Turn your head sideways and look at this kanji - it\'s an EYE! The outer rectangle is the eye socket, and the lines inside are the iris and pupil. Ancient people drew the EYE lying on its side!',
    hint: 'Sideways eye shape = eye',
    reading_mnemonic: 'もく/め (moku/me) - "MOK-eye!" People MOCK you with their EYES! Or: "MAY I?" - "MAY I see with my EYES?" ME = "May" I look! You see things with your ME (eyes)!'
  },
  {
    character: '耳',
    radicals: [{ char: '耳', name: 'ear', meaning: 'ear' }],
    components: 'An ear with inner curves',
    story: 'Look at someone\'s EAR from the side - see all those curves inside? The kanji captures the complex folds of the outer EAR and the canal going in. The loops show how sound waves curl into your EAR!',
    hint: 'Curvy ear shape = ear',
    reading_mnemonic: 'じ/みみ (ji/mimi) - "GEE, nice EARS!" Or: "ME-ME!" - Listen to ME-ME (grandma)! "MIMI!" you call, and her EARS perk up! MIMI sounds like asking someone to listen to "me, me!"'
  },
  {
    character: '手',
    radicals: [{ char: '手', name: 'hand', meaning: 'hand' }],
    components: 'A hand with fingers spread',
    story: 'Hold up your HAND with fingers together - now look at it! The horizontal lines are your three middle fingers, and the vertical line with hook is your thumb sticking out. Five fingers = HAND!',
    hint: 'Fingers and thumb = hand',
    reading_mnemonic: 'しゅ/て (shu/te) - "SHOE in HAND!" Pick up your SHOE with your HAND! Or: "TAY-K!" - TAKE things with your HAND! TE sounds like "take" - you TAKE with your TE (hand)!'
  },
  {
    character: '足',
    radicals: [{ char: '口', name: 'mouth', meaning: 'knee/joint' }, { char: '止', name: 'stop', meaning: 'foot' }],
    components: 'Knee (口) + foot (止)',
    story: 'The top part (口) is your KNEE joint, and the bottom (止) is your FOOT! A leg goes from knee down to foot. When you WALK, your foot STOPs on the ground each step. Knee + foot stopping = LEG/FOOT!',
    hint: 'Knee + stopping foot = foot/leg',
    reading_mnemonic: 'そく/あし (soku/ashi) - "SOCK on FOOT!" Put your SOCK on your FOOT! Or: "AH-SHE!" - "AH, SHE stepped on my FOOT!" ASHI = "Ah, she!" kicked my leg!'
  },
  {
    character: '心',
    radicals: [{ char: '心', name: 'heart', meaning: 'heart' }],
    components: 'A beating heart with ventricles',
    story: 'Your HEART with its chambers! The middle hook is the main heart muscle, and the three dots are the valves and blood vessels. Picture your HEART pumping: *thump* *thump*! Your emotions live in your HEART!',
    hint: 'Heart shape with dots = heart/mind',
    reading_mnemonic: 'しん/こころ (shin/kokoro) - "SHEEN in your HEART!" Your HEART has a SHEEN when you\'re happy! Or: "COCOA-ROW!" - COCOA in a ROW warms your HEART! KOKORO sounds like "cocoa row" - comfort for the heart!'
  },
  {
    character: '体',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '本', name: 'origin/book', meaning: 'root/base' }],
    components: '亻 (person) + 本 (root/origin)',
    story: 'A PERSON\'s (亻) ROOT/origin (本) - that\'s the BODY! Your BODY is the base of who you are as a person. The person radical + root = the BODY that is your foundation. Take care of your BODY - it\'s your root!',
    hint: 'Person + root = body',
    reading_mnemonic: 'たい/からだ (tai/karada) - "TIE around your BODY!" Wrap a TIE around your BODY! Or: "CAR-AH-DAH!" - "The CAR hit AH DAD\'s BODY!" KARADA sounds like "car-ah-dah" - protect your body from cars!'
  },
  {
    character: '頭',
    radicals: [{ char: '豆', name: 'bean', meaning: 'bean' }, { char: '頁', name: 'head/page', meaning: 'head' }],
    components: '豆 (bean) + 頁 (head/page)',
    story: 'A BEAN (豆) shaped HEAD (頁)! Your HEAD is shaped like a bean on top of your neck! The 頁 radical means head/page (your face is like a page). Your bean-shaped HEAD sits on your shoulders!',
    hint: 'Bean + head radical = head',
    reading_mnemonic: 'とう/ず/あたま (tou/zu/atama) - "TOE on HEAD!" Imagine a TOE on your HEAD - weird! Or: "AH-TAH-MAH!" - "AH, TAta hit MAma on the HEAD!" ATAMA sounds like someone getting bonked!'
  },
  {
    character: '顔',
    radicals: [{ char: '彦', name: 'accomplished', meaning: 'handsome' }, { char: '頁', name: 'head/page', meaning: 'head/face' }],
    components: '彦 (handsome) + 頁 (head)',
    story: 'A HANDSOME (彦) HEAD (頁) - your FACE! The left side shows something distinguished, the right is the head radical. Your FACE is the distinguished part of your head that makes you YOU!',
    hint: 'Distinguished + head = face',
    reading_mnemonic: 'がん/かお (gan/kao) - "COW FACE!" A cow\'s FACE goes "MOO!" KAO sounds like "cow" - picture a cow\'s FACE! Or: "GAN-der at my FACE!" Take a gander (look) at my FACE!'
  }
]

async function insertBatch() {
  console.log('👤 BATCH 3: People & Body')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_3) {
    const kanji_id = await getKanjiId(m.character)
    if (!kanji_id) { console.log(`❌ ${m.character} - Not found\n`); continue }
    
    console.log(`📝 ${m.character} - Inserting...`)
    
    const { data: existing } = await supabase.from('mnemonics').select('id').eq('kanji_id', kanji_id).single()
    
    const mnemonicData = {
      kanji_id,
      radicals: m.radicals,
      components: m.components,
      story: m.story,
      reading_mnemonic: m.reading_mnemonic,
      hint: m.hint
    }
    
    const { error } = existing 
      ? await supabase.from('mnemonics').update(mnemonicData).eq('kanji_id', kanji_id)
      : await supabase.from('mnemonics').insert(mnemonicData)
    
    console.log(error ? `   ❌ ${error.message}\n` : `   ✅ Success!\n`)
  }
  
  console.log('✨ Batch 3 complete!')
}

insertBatch()
