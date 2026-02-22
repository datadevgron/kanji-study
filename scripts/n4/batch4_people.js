/**
 * N4 BATCH 4: Body, People & Family (30 kanji)
 * 体者肉自牛犬鳥魚親兄弟姉妹員品味答問題言計試質着
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/n4/batch4_people.js
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
    character: '体',
    radicals: [{ char: '亻', name: 'person', meaning: 'person' }, { char: '本', name: 'origin', meaning: 'base/tree' }],
    components: '亻 (person) + 本 (base)',
    story: 'A PERSON\'s (亻) BASE (本) - the BODY! Your body is your fundamental base as a person. Person\'s origin = BODY!',
    hint: 'Person\'s base = body',
    reading_mnemonic: 'たい/からだ (tai/karada) - "TIE your BODY down!" TIE! KARADA = kah-rah-dah, body! TAIJUU = body weight!'
  },
  {
    character: '者',
    radicals: [{ char: '耂', name: 'old', meaning: 'experience' }, { char: '日', name: 'sun', meaning: 'day' }],
    components: 'Experience + day',
    story: 'Someone with EXPERIENCE over many DAYS - a PERSON/ONE WHO! A person who does something. Experienced one = PERSON WHO!',
    hint: 'Experienced one = person who',
    reading_mnemonic: 'しゃ/もの (sha/mono) - "SHA! That PERSON!" SHA, look at that guy! GAKUSHA = scholar! Or: "MOH-NOH!" - "MOH-NO who?" MONO = person!'
  },
  {
    character: '肉',
    radicals: [{ char: '肉', name: 'meat', meaning: 'flesh' }],
    components: 'Meat/flesh shape',
    story: 'A shape like a rib cage with MEAT - MEAT/FLESH! The character looks like strips of meat. Ribs = MEAT!',
    hint: 'Rib shape = meat',
    reading_mnemonic: 'にく (niku) - "NICK the MEAT!" NICK cut the MEAT! NIKU = nee-koo, meat! GYUUNIKU = beef!'
  },
  {
    character: '自',
    radicals: [{ char: '自', name: 'self', meaning: 'nose/self' }],
    components: 'Nose/self shape',
    story: 'Pointing at your NOSE - pointing at yourSELF! In Japan, people point at their nose to indicate "me." Nose = SELF!',
    hint: 'Pointing at nose = self',
    reading_mnemonic: 'じ/みずか (ji/mizuka) - "JEEZ, mySELF!" JI-bun = myself! Or: "ME-ZOO-KAH!" - "ME? ZOO KAH! I\'ll go myself!" MIZUKARA = by oneself!'
  },
  {
    character: '牛',
    radicals: [{ char: '牛', name: 'cow', meaning: 'cow' }],
    components: 'Cow head with horns',
    story: 'A COW\'s face with two HORNS on top - COW! Picture a cow\'s head from the front. Horned head = COW!',
    hint: 'Horned head = cow',
    reading_mnemonic: 'ぎゅう/うし (gyuu/ushi) - "GOO says the COW!" GYUU-niku = beef! Or: "OO-SHE!" - "OO SHE\'s a big COW!" USHI = oo-she, cow!'
  },
  {
    character: '犬',
    radicals: [{ char: '大', name: 'big', meaning: 'big' }, { char: '丶', name: 'dot', meaning: 'ear' }],
    components: '大 (big) + 丶 (ear/dot)',
    story: 'A BIG (大) animal with a pointed EAR (丶) - DOG! A big four-legged friend with ears. Big with ears = DOG!',
    hint: 'Big with ear = dog',
    reading_mnemonic: 'けん/いぬ (ken/inu) - "KEN has a DOG!" Ken\'s DOG! Or: "EE-NOO!" - "EE! NO, bad DOG!" INU = ee-noo, dog!'
  },
  {
    character: '鳥',
    radicals: [{ char: '鳥', name: 'bird', meaning: 'bird' }],
    components: 'Bird shape with wing and tail',
    story: 'A BIRD with wings and tail feathers - BIRD! The shape shows a bird\'s body and plumage. Feathered creature = BIRD!',
    hint: 'Feathered shape = bird',
    reading_mnemonic: 'ちょう/とり (chou/tori) - "CHOW for the BIRD!" Give CHOW to the BIRD! TORI = toh-ree, bird! YAKITORI = grilled bird!'
  },
  {
    character: '魚',
    radicals: [{ char: '魚', name: 'fish', meaning: 'fish' }],
    components: 'Fish with scales and tail',
    story: 'A FISH with scales, fins, and tail - FISH! Picture a fish from the side with all its parts. Scaled swimmer = FISH!',
    hint: 'Scaled swimmer = fish',
    reading_mnemonic: 'ぎょ/さかな (gyo/sakana) - "GO FISH!" GO get that FISH! Or: "SAH-KAH-NAH!" - "SAKE and FISH!" SAKANA = sah-kah-nah, fish!'
  },
  {
    character: '親',
    radicals: [{ char: '立', name: 'stand', meaning: 'stand' }, { char: '木', name: 'tree', meaning: 'tree' }, { char: '見', name: 'see', meaning: 'watch' }],
    components: '立 (stand) + 木 (tree) + 見 (watch)',
    story: 'STANDING (立) by a TREE (木) WATCHING (見) over you - PARENT! Parents watch from a tree, protecting you. Watching from tree = PARENT!',
    hint: 'Standing tree watching = parent',
    reading_mnemonic: 'しん/おや (shin/oya) - "SHIN guards as PARENT!" Shin protects like a PARENT! Or: "OH-YAH!" - "OH YAH, that\'s my PARENT!" OYA = oh-yah, parent!'
  },
  {
    character: '兄',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '儿', name: 'legs', meaning: 'person' }],
    components: '口 (mouth) + 儿 (person)',
    story: 'A PERSON (儿) with a big MOUTH (口) giving orders - OLDER BROTHER! Big brothers boss around with their mouths! Bossy mouth = OLDER BROTHER!',
    hint: 'Person with big mouth = older brother',
    reading_mnemonic: 'きょう/あに (kyou/ani) - "KEY-OH! Big BROTHER!" KYOUDAI = siblings! Or: "AH-NEE!" - "AH, my KNEE hurts, BIG BRO!" ANI = ah-nee, older brother!'
  },
  {
    character: '弟',
    radicals: [{ char: '弓', name: 'bow', meaning: 'bow' }, { char: '丷', name: 'horns', meaning: 'young' }],
    components: 'Bow shape + young',
    story: 'A young one learning the BOW (弓) - YOUNGER BROTHER! The little one still practicing. Young learner = YOUNGER BROTHER!',
    hint: 'Young bow learner = younger brother',
    reading_mnemonic: 'てい/おとうと (tei/otouto) - "TAY! LITTLE BROTHER!" Hey TAY! Or: "OH-TOH-TOH!" - "OH TOH TOH, my LITTLE BROTHER!" OTOUTO = oh-toh-toh!'
  },
  {
    character: '姉',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '市', name: 'market', meaning: 'market/mature' }],
    components: '女 (woman) + 市 (market)',
    story: 'A WOMAN (女) who goes to MARKET (市) - OLDER SISTER! The mature sister who handles responsibilities. Mature woman = OLDER SISTER!',
    hint: 'Woman at market = older sister',
    reading_mnemonic: 'し/あね (shi/ane) - "SHE\'s my OLDER SISTER!" SHE is ANE! Or: "AH-NEH!" - "AH NEH! BIG SIS!" ANE = ah-neh, older sister!'
  },
  {
    character: '妹',
    radicals: [{ char: '女', name: 'woman', meaning: 'woman' }, { char: '未', name: 'not yet', meaning: 'not yet' }],
    components: '女 (woman) + 未 (not yet)',
    story: 'A WOMAN (女) who is NOT YET (未) grown - YOUNGER SISTER! Still young, not yet mature. Young woman = YOUNGER SISTER!',
    hint: 'Woman not yet grown = younger sister',
    reading_mnemonic: 'まい/いもうと (mai/imouto) - "MY LITTLE SISTER!" MY imouto! Or: "EE-MOH-TOH!" - "EE MO TO go with LITTLE SIS!" IMOUTO = ee-moh-toh!'
  },
  {
    character: '員',
    radicals: [{ char: '口', name: 'mouth', meaning: 'opening' }, { char: '貝', name: 'shell', meaning: 'money/value' }],
    components: '口 (opening) + 貝 (shell/money)',
    story: 'Someone who handles MONEY (貝) at an OPENING (口) - MEMBER/STAFF! A member of staff who counts money. Money person = MEMBER!',
    hint: 'Money handler = member',
    reading_mnemonic: 'いん (in) - "IN the group, a MEMBER!" You\'re IN! KAIIN = member! GIIN = congressman!'
  },
  {
    character: '品',
    radicals: [{ char: '口', name: 'mouth', meaning: 'box' }],
    components: 'Three 口 (boxes) stacked',
    story: 'Three BOXES (口口口) stacked - GOODS/PRODUCTS! Multiple items packaged up. Stacked boxes = GOODS!',
    hint: 'Stacked boxes = goods',
    reading_mnemonic: 'ひん/しな (hin/shina) - "HIN-t: quality GOODS!" High quality GOODS! Or: "SHEE-NAH!" - "SHEENA has nice GOODS!" SHINAMONO = goods!'
  },
  {
    character: '味',
    radicals: [{ char: '口', name: 'mouth', meaning: 'mouth' }, { char: '未', name: 'not yet', meaning: 'unknown' }],
    components: '口 (mouth) + 未 (not yet)',
    story: 'Your MOUTH (口) tasting something NOT YET (未) known - TASTE! Discovering new flavors. Unknown to mouth = TASTE!',
    hint: 'Mouth explores = taste',
    reading_mnemonic: 'み/あじ (mi/aji) - "ME like the TASTE!" ME tastes it! Or: "AH-JEE!" - "AH GEE, good TASTE!" AJI = ah-jee, taste!'
  },
  {
    character: '答',
    radicals: [{ char: '⺮', name: 'bamboo', meaning: 'bamboo' }, { char: '合', name: 'fit', meaning: 'match/fit' }],
    components: '⺮ (bamboo) + 合 (fit)',
    story: 'BAMBOO (⺮) slips that FIT (合) together - ANSWER! Ancient answers written on bamboo that matched questions. Matching bamboo = ANSWER!',
    hint: 'Fitting bamboo = answer',
    reading_mnemonic: 'とう/こた (tou/kota) - "TOE knows the ANSWER!" My TOE answered! Or: "KOH-TAH!" - "KOH TAH-ke the ANSWER!" KOTAERU = koh-tah-eh-roo, answer!'
  },
  {
    character: '問',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '口', name: 'mouth', meaning: 'mouth' }],
    components: '門 (gate) + 口 (mouth)',
    story: 'A MOUTH (口) at the GATE (門) - QUESTION! Asking at the door, questioning who\'s there. Mouth at gate = QUESTION!',
    hint: 'Mouth at gate = question',
    reading_mnemonic: 'もん/と (mon/to) - "MON-key QUESTIONS everything!" SHITSUMON = question! Or: "TOH!" - "TOH-wazu!" TOU = ask! MONDAI = problem!'
  },
  {
    character: '題',
    radicals: [{ char: '是', name: 'correct', meaning: 'right' }, { char: '頁', name: 'head', meaning: 'head/page' }],
    components: '是 (correct) + 頁 (page/head)',
    story: 'The CORRECT (是) thing at the HEAD (頁) of the page - TOPIC/TITLE! The main subject at the top. Head of page = TOPIC!',
    hint: 'Page header = topic',
    reading_mnemonic: 'だい (dai) - "DIE-hard on this TOPIC!" MONDAI = problem/question! SHUKUDAI = homework (assignment + topic)!'
  },
  {
    character: '言',
    radicals: [{ char: '言', name: 'say', meaning: 'words' }],
    components: 'Mouth + sound waves',
    story: 'A MOUTH with WORDS coming out - SAY/WORDS! The character shows speech leaving the mouth. Speaking mouth = SAY!',
    hint: 'Speaking mouth = say',
    reading_mnemonic: 'げん/い/こと (gen/i/koto) - "GEN-tly SAY it!" GEN-go = language! Or: "EE-oo!" - "IU = say!" Or: "KOH-TOH-ba!" - KOTOBA = words!'
  },
  {
    character: '計',
    radicals: [{ char: '言', name: 'say', meaning: 'words' }, { char: '十', name: 'ten', meaning: 'complete' }],
    components: '言 (words) + 十 (ten/complete)',
    story: 'Counting WORDS (言) to TEN (十) - MEASURE/PLAN! Calculating and planning with precision. Counting words = MEASURE!',
    hint: 'Counting words = measure',
    reading_mnemonic: 'けい/はか (kei/haka) - "KAY MEASURES it!" KAY plans! KEIKAKU = plan! Or: "HAH-KAH!" - "HA KA-culate!" HAKARU = measure!'
  },
  {
    character: '試',
    radicals: [{ char: '言', name: 'say', meaning: 'words' }, { char: '式', name: 'style', meaning: 'ceremony' }],
    components: '言 (words) + 式 (ceremony/style)',
    story: 'WORDS (言) in a formal CEREMONY (式) - TEST! A formal examination with questions. Formal words = TEST!',
    hint: 'Formal words = test',
    reading_mnemonic: 'し/ため/こころ (shi/tame/kokoro) - "SHE TRIES the TEST!" SHIKEN = exam! Or: "TAH-MEH!" - "TRY ME!" TAMESU = try! KOKOROMIRU = test!'
  },
  {
    character: '質',
    radicals: [{ char: '斤', name: 'axe', meaning: 'cut' }, { char: '貝', name: 'shell', meaning: 'value' }],
    components: '斤 (axe) + 貝 (shell/value)',
    story: 'Cutting (斤) open to check VALUE (貝) - QUALITY! Examining the quality by cutting to see inside. Checking value = QUALITY!',
    hint: 'Checking value = quality',
    reading_mnemonic: 'しつ (shitsu) - "SHEETS of QUALITY!" SHITSUMON = question! HINSHITSU = quality (goods + quality)!'
  },
  {
    character: '着',
    radicals: [{ char: '羊', name: 'sheep', meaning: 'clothing' }, { char: '目', name: 'eye', meaning: 'eye' }],
    components: 'Clothing + 目 (eye)',
    story: 'CLOTHING over your body that you see with EYES (目) - WEAR/ARRIVE! What you put on and what arrives. Clothing seen = WEAR!',
    hint: 'Visible clothing = wear',
    reading_mnemonic: 'ちゃく/き/つ (chaku/ki/tsu) - "CHALK on my clothes I WEAR!" CHAKU-riku = arrival! Or: "KEE-roo!" - "KEY to WEARING!" KIRU = wear! TSUKU = arrive!'
  },
  {
    character: '服',
    radicals: [{ char: '月', name: 'moon/flesh', meaning: 'body' }, { char: '又', name: 'again', meaning: 'hand' }],
    components: '月 (body) + 又 (hand)',
    story: 'Putting your HAND (又) on your BODY (月) to dress - CLOTHES! What you put on your body. Hand on body = CLOTHES!',
    hint: 'Hand dressing body = clothes',
    reading_mnemonic: 'ふく (fuku) - "FOOK! Nice CLOTHES!" FUKU = foo-koo, clothes! YOUFUKU = Western clothes! SEIFUKU = uniform!'
  },
  {
    character: '売',
    radicals: [{ char: '士', name: 'samurai', meaning: 'professional' }, { char: '冖', name: 'cover', meaning: 'cover' }, { char: '儿', name: 'legs', meaning: 'person' }],
    components: 'Professional + cover + person',
    story: 'A professional (士) person (儿) at a covered stall - SELL! A merchant at their stand selling goods. Merchant at stand = SELL!',
    hint: 'Merchant at stand = sell',
    reading_mnemonic: 'ばい/う (bai/u) - "BUY? No, SELL!" BAITEN = shop! Or: "OO-roo!" - "OOH, I\'ll SELL it!" URU = oo-roo, sell!'
  },
  {
    character: '買',
    radicals: [{ char: '罒', name: 'net', meaning: 'net/catch' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: '罒 (net) + 貝 (money)',
    story: 'CATCHING (罒) things with MONEY (貝) - BUY! Using money to capture goods. Net money = BUY!',
    hint: 'Catching with money = buy',
    reading_mnemonic: 'ばい/か (bai/ka) - "BYE money, I BUY!" BAI-BAI money! Or: "KAH-oo!" - "KAH! I\'ll BUY it!" KAU = kah-oo, buy!'
  },
  {
    character: '貸',
    radicals: [{ char: '代', name: 'substitute', meaning: 'substitute' }, { char: '貝', name: 'shell', meaning: 'money' }],
    components: '代 (substitute) + 貝 (money)',
    story: 'SUBSTITUTING (代) MONEY (貝) temporarily - LEND! Giving money that will be returned. Temporary money = LEND!',
    hint: 'Temporary money = lend',
    reading_mnemonic: 'たい/か (tai/ka) - "TIE up the LOAN!" Tie the LENDING! Or: "KAH-su!" - "KAH SU-re, I\'ll LEND!" KASU = kah-soo, lend!'
  },
  {
    character: '特',
    radicals: [{ char: '牛', name: 'cow', meaning: 'cow' }, { char: '寺', name: 'temple', meaning: 'temple' }],
    components: '牛 (cow) + 寺 (temple)',
    story: 'A COW (牛) at a TEMPLE (寺) - SPECIAL! A temple cow is rare and special! Unusual combination = SPECIAL!',
    hint: 'Temple cow = special',
    reading_mnemonic: 'とく (toku) - "TALK about SPECIAL!" How SPECIAL! TOKUBETSU = special! TOKUNI = especially!'
  }
]

async function insertBatch() {
  console.log('👥 N4 BATCH 4: Body, People & Family (30 kanji)')
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
  console.log(`✨ Batch 4 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
