/**
 * BATCH 4: Actions & Movement 行来見聞話読書食飲立休思知
 * 
 * Action verbs with memorable stories!
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/mnemonics_batch4_actions.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function getKanjiId(character) {
  const { data } = await supabase.from('kanji').select('id').eq('character', character).single()
  return data?.id
}

const BATCH_4 = [
  {
    character: '行',
    radicals: [{ char: '彳', name: 'step', meaning: 'left step' }, { char: '亍', name: 'step', meaning: 'right step' }],
    components: 'Left step + right step',
    story: 'Left foot step (彳) + right foot step (亍) = GOING! Picture a crossroads where you can GO in any direction. The kanji shows two feet taking turns stepping: left, right, left, right - WALKING to GO somewhere!',
    hint: 'Steps left and right = go',
    reading_mnemonic: 'こう/ぎょう/い (kou/gyou/i) - "GO-ING!" Where are you GOING? "I\'m GO-ing to the store!" Or: "EE-KU!" sounds like "icky" - "I don\'t want to GO, it\'s icky!" IKU (to go) when you have to GO somewhere!'
  },
  {
    character: '来',
    radicals: [{ char: '来', name: 'come', meaning: 'come' }],
    components: 'Rice plant with grain coming',
    story: 'A rice plant with heavy grain bending toward you - the harvest is COMING! In ancient times, when rice was ready, good times were COMING. Picture the grain heads bending down as they COME to be harvested!',
    hint: 'Rice bending toward you = come',
    reading_mnemonic: 'らい/く (rai/ku) - "RYE bread is COMING!" Someone\'s bringing RYE bread - it\'s COMING! Or: "KOO!" - A dove COMES to you going "koo koo!" KU-RU = COME here!'
  },
  {
    character: '見',
    radicals: [{ char: '目', name: 'eye', meaning: 'eye' }, { char: '儿', name: 'legs', meaning: 'legs' }],
    components: '目 (eye) + 儿 (legs)',
    story: 'An EYE (目) on LEGS (儿) walking around to SEE things! Imagine an eyeball with legs running around looking at everything. Your eyes walk around with you to SEE the world. Eye + legs = SEE!',
    hint: 'Eye on legs = see',
    reading_mnemonic: 'けん/み (ken/mi) - "KEN can SEE!" Ken uses his eyes to SEE everything! Or: "ME!" - "Look at ME!" I want you to SEE ME! MI-RU = "me see!" - ME wants to SEE!'
  },
  {
    character: '聞',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '耳', name: 'ear', meaning: 'ear' }],
    components: '門 (gate) + 耳 (ear)',
    story: 'Your EAR (耳) at the GATE (門) - you\'re eavesdropping! When you want to HEAR what\'s happening inside, you press your ear against the gate. Someone\'s at the GATE listening with their EAR = HEAR!',
    hint: 'Ear at gate = hear/ask',
    reading_mnemonic: 'ぶん/き (bun/ki) - "BUN news!" You HEAR the news about a BUN sale! Or: "KEY-KU!" - "I HEAR someone with a KEY!" KI-KU = I HEAR a key!'
  },
  {
    character: '話',
    radicals: [{ char: '言', name: 'words', meaning: 'speech' }, { char: '舌', name: 'tongue', meaning: 'tongue' }],
    components: '言 (words) + 舌 (tongue)',
    story: 'WORDS (言) flowing off your TONGUE (舌) = TALK! To SPEAK, you use your tongue to form words. Your tongue moves in your mouth making SPEECH come out. Words from tongue = TALK/STORY!',
    hint: 'Words + tongue = speak/story',
    reading_mnemonic: 'わ/はな (wa/hana) - "WAH! I\'m TALKING!" Babies go "WAH" when they try to TALK! Or: "HA-NAH-SU!" - "HA! NASA is TALKING!" HANASU sounds like "Ha, NASA" - NASA is speaking! HANASHI = a story someone tells!'
  },
  {
    character: '読',
    radicals: [{ char: '言', name: 'words', meaning: 'words' }, { char: '売', name: 'sell', meaning: 'sell' }],
    components: '言 (words) + 売 (sell)',
    story: 'WORDS (言) being SOLD (売) = READ! Books full of words are sold at bookstores for you to READ! You pay money to READ someone\'s words. Buying words = READING!',
    hint: 'Words + sell = read',
    reading_mnemonic: 'どく/よ (doku/yo) - "DOKU-ment!" You READ a DOCUment! Or: "YO! READ this!" - YO, my friend, READ this! YOMU sounds like "Yo, mu(st)" - "Yo, you must READ this!"'
  },
  {
    character: '書',
    radicals: [{ char: '聿', name: 'brush', meaning: 'writing brush' }, { char: '日', name: 'sun', meaning: 'day' }],
    components: '聿 (brush) + 曰 (say)',
    story: 'A BRUSH (聿) that SAYS things (曰) = WRITE! You hold a brush and write down what you want to say. The brush speaks for you when you WRITE. Ancient people used brushes to WRITE their thoughts!',
    hint: 'Brush + speak = write',
    reading_mnemonic: 'しょ/か (sho/ka) - "SHOW what you WRITE!" SHOW me your writing! Or: "KA-KU!" - "Cuckoo clock!" Every hour, I WRITE when the CUCKOO sounds! KAKU = WRITE when the clock says "ca-ku!"'
  },
  {
    character: '食',
    radicals: [{ char: '食', name: 'eat', meaning: 'eat/food' }],
    components: 'Person at table with food',
    story: 'A person (人) sitting under a roof at a table eating! The top is a cover/roof, below is a table with legs. Picture sitting down at a table to EAT your meal. Everyone sits to EAT FOOD!',
    hint: 'Person at table = eat/food',
    reading_mnemonic: 'しょく/た (shoku/ta) - "SHOCK! The FOOD is moving!" Or: "TAH-beru!" - "TAH-DAH!" Mom reveals the food: "TA-DA! Time to EAT!" TABERU = TA-DA + "berry" - TA-DA, eat this berry!'
  },
  {
    character: '飲',
    radicals: [{ char: '食', name: 'eat', meaning: 'food' }, { char: '欠', name: 'lack', meaning: 'yawn/lack' }],
    components: '食 (food) + 欠 (yawn/open mouth)',
    story: 'FOOD (食) + wide open YAWN (欠) = DRINK! When you DRINK, you open your mouth wide (like a yawn) to pour liquid in. The mouth opens wider for drinking than eating. Open wide to DRINK!',
    hint: 'Food + open mouth = drink',
    reading_mnemonic: 'いん/の (in/no) - "INN has DRINKS!" At the INN, they serve DRINKS! Or: "NO-mu!" - "NO, moo!" The cow says "NO" when you try to DRINK its milk! NOMU = "No, moo!" - the cow protests!'
  },
  {
    character: '立',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }],
    components: 'Person standing on ground',
    story: 'A person STANDING on the ground! The top looks like a person with arms out, the bottom line is the ground they STAND on. When you STAND up, you rise from the ground like this kanji!',
    hint: 'Person on ground = stand',
    reading_mnemonic: 'りつ/た (ritsu/ta) - "RITZ cracker! STAND it up!" STAND a RITZ cracker on its edge! Or: "TAH-tsu!" - "TA-DA!" I STAND up and say "TA-DA!" TATSU = "Ta-da, sue!" - I STAND up and TA-DA!'
  },
  {
    character: '休',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '木', name: 'tree', meaning: 'tree' }],
    components: '亻 (person) + 木 (tree)',
    story: 'A PERSON (亻) leaning against a TREE (木) to REST! After working hard, you find a nice tree and lean against it to take a break. The shade feels so good! Person + tree = REST from your labors!',
    hint: 'Person + tree = rest',
    reading_mnemonic: 'きゅう/やす (kyuu/yasu) - "QUEUE? I need to REST!" The line (queue) is too long, I need to REST! Or: "YAH-SUE-mi!" - "YEAH, SUE ME, I\'m RESTING!" YASUMI = "Yeah sue me" - I deserve a REST!'
  },
  {
    character: '思',
    radicals: [{ char: '田', name: 'rice field', meaning: 'field' }, { char: '心', name: 'heart', meaning: 'heart' }],
    components: '田 (field) + 心 (heart)',
    story: 'What fills a Japanese farmer\'s HEART (心)? The rice FIELD (田)! They THINK about their crops constantly - it\'s always on their mind. When your livelihood depends on the field, you THINK about it in your heart day and night!',
    hint: 'Field in heart = think',
    reading_mnemonic: 'し/おも (shi/omo) - "SHE\'s THINKING!" Look at her - SHE\'s deep in thought! Or: "OH-MOE!" - "OH MOE, I was THINKING about you!" OMOU sounds like "Oh, Moe!" - I THINK of you, Moe!'
  },
  {
    character: '知',
    radicals: [{ char: '矢', name: 'arrow', meaning: 'arrow' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '矢 (arrow) + 口 (mouth)',
    story: 'An ARROW (矢) straight to the MOUTH (口) = KNOW! Knowledge hits you like an arrow - suddenly you KNOW! Or: you speak (mouth) as quick as an arrow when you KNOW the answer. Quick knowledge = KNOW!',
    hint: 'Arrow + mouth = know',
    reading_mnemonic: 'ち/し (chi/shi) - "CHEESE! I KNOW!" - "Say CHEESE if you KNOW the answer!" Or: "SHE-ru!" - "SHE rules! I KNOW SHE does!" SHIRU = "She-ru(les)" - I KNOW she\'s the best!'
  },
  {
    character: '好',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '子', name: 'child', meaning: 'child' }],
    components: '女 (woman) + 子 (child)',
    story: 'A WOMAN (女) with her CHILD (子) = LIKE/LOVE! A mother loves her child more than anything - that\'s the deepest LIKING. When you see woman + child, think of a mother\'s love. Woman + child = LIKE!',
    hint: 'Woman + child = like (mother\'s love)',
    reading_mnemonic: 'こう/す (kou/su) - "COO like a dove!" You LIKE someone so much you COO at them! Or: "SUE-ki!" - "I LIKE SUE!" SUKI = "Sue-ki" - I really LIKE Sue! She\'s my favorite!'
  }
]

async function insertBatch() {
  console.log('🏃 BATCH 4: Actions & Movement')
  console.log('=' .repeat(50) + '\n')
  
  for (const m of BATCH_4) {
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
  
  console.log('✨ Batch 4 complete!')
}

insertBatch()
