/**
 * N3 BATCH 12: Places & Things (30 kanji)
 * 違遠適選部都配酒閉関降限除険陽際雑難雪静非面靴頂頭頼顔願
 * 
 * Run: node scripts/n3/batch12_places_things.js
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
    character: '違',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '韋', name: 'leather', meaning: 'change' }],
    components: '辶 (road) + 韋 (change)',
    story: 'On the ROAD (辶) taking different paths - DIFFER/WRONG! Different. Road different = DIFFER!',
    hint: 'Road different = differ',
    reading_mnemonic: 'い/ちが (i/chiga) - "EE! DIFFERENT!" CHIGAU = differ! MACHIGAI = mistake!'
  },
  {
    character: '遠',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '袁', name: 'robe', meaning: 'distant' }],
    components: '辶 (road) + 袁 (distant)',
    story: 'On the ROAD (辶) going DISTANT (袁) - FAR! Remote. Road distant = FAR!',
    hint: 'Road distant = far',
    reading_mnemonic: 'えん/おん/とお (en/on/too) - "EN FAR!" TOOI = far! ENRYO = reserve!'
  },
  {
    character: '適',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '啇', name: 'suitable', meaning: 'fit' }],
    components: '辶 (road) + 啇 (fit)',
    story: 'On the ROAD (辶) that FITS (啇) - SUITABLE! Appropriate. Road fits = SUITABLE!',
    hint: 'Road fits = suitable',
    reading_mnemonic: 'てき (teki) - "TECH SUITABLE!" TEKITOU = appropriate! TEKISETSU = suitable!'
  },
  {
    character: '選',
    radicals: [{ char: '辶', name: 'road', meaning: 'road' }, { char: '巽', name: 'humble', meaning: 'choose' }],
    components: '辶 (road) + 巽 (choose)',
    story: 'On the ROAD (辶) CHOOSING (巽) - SELECT! Pick. Road choose = SELECT!',
    hint: 'Road choose = select',
    reading_mnemonic: 'せん/えら (sen/era) - "SEN SELECTS!" ERABU = choose! SENKYO = election!'
  },
  {
    character: '部',
    radicals: [{ char: '咅', name: 'spit', meaning: 'divide' }, { char: '阝', name: 'city', meaning: 'city' }],
    components: '咅 (divide) + 阝 (city)',
    story: 'A divided (咅) section of the CITY (阝) - PART/DEPARTMENT! Section. City part = PART!',
    hint: 'City part = part',
    reading_mnemonic: 'ぶ (bu) - "BOO DEPARTMENT!" BUBUN = part! ZENBU = all!'
  },
  {
    character: '都',
    radicals: [{ char: '者', name: 'person', meaning: 'person' }, { char: '阝', name: 'city', meaning: 'city' }],
    components: '者 (person) + 阝 (city)',
    story: 'PEOPLE (者) in a CITY (阝) - CAPITAL/METROPOLIS! Urban. City people = CAPITAL!',
    hint: 'City people = capital',
    reading_mnemonic: 'と/つ/みやこ (to/tsu/miyako) - "TO the CAPITAL!" MIYAKO = capital! TOKAI = city!'
  },
  {
    character: '配',
    radicals: [{ char: '酉', name: 'wine', meaning: 'wine' }, { char: '己', name: 'self', meaning: 'self' }],
    components: '酉 (wine) + 己 (self)',
    story: 'WINE (酉) distributed to SELF (己) - DISTRIBUTE! Deliver. Wine distribute = DISTRIBUTE!',
    hint: 'Wine distribute = distribute',
    reading_mnemonic: 'はい/くば (hai/kuba) - "HIGH DISTRIBUTE!" KUBARU = distribute! SHINPAI = worry!'
  },
  {
    character: '酒',
    radicals: [{ char: '氵', name: 'water', meaning: 'water' }, { char: '酉', name: 'wine', meaning: 'wine jar' }],
    components: '氵 (water) + 酉 (wine jar)',
    story: 'WATER (氵) in a WINE JAR (酉) - SAKE/ALCOHOL! Drink. Water wine = SAKE!',
    hint: 'Water wine = sake',
    reading_mnemonic: 'しゅ/さけ/さか (shu/sake/saka) - "SHU SAKE!" SAKE = alcohol! IZAKAYA = bar!'
  },
  {
    character: '閉',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '才', name: 'talent', meaning: 'talent' }],
    components: '門 (gate) + 才 (talent)',
    story: 'A GATE (門) with talent (才) to lock - CLOSE! Shut. Gate locks = CLOSE!',
    hint: 'Gate locks = close',
    reading_mnemonic: 'へい/と/し (hei/to/shi) - "HEY! CLOSE it!" SHIMERU = close! HEITEN = closing!'
  },
  {
    character: '関',
    radicals: [{ char: '門', name: 'gate', meaning: 'gate' }, { char: '関', name: 'gate mechanism', meaning: 'lock' }],
    components: '門 (gate) + mechanism',
    story: 'A GATE (門) with its mechanism - RELATED/BARRIER! Connection. Gate barrier = RELATED!',
    hint: 'Gate barrier = related',
    reading_mnemonic: 'かん/せき (kan/seki) - "CAN RELATE!" KANKEI = relation! GENKAN = entrance!'
  },
  {
    character: '降',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill' }, { char: '夂', name: 'go', meaning: 'down' }],
    components: '阝 (hill) + down elements',
    story: 'Going DOWN (夂) the HILL (阝) - DESCEND/FALL! Drop. Hill down = DESCEND!',
    hint: 'Hill down = descend',
    reading_mnemonic: 'こう/お/ふ (kou/o/fu) - "COW DESCENDS!" ORIRU = get off! FURU = fall (rain)!'
  },
  {
    character: '限',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill' }, { char: '艮', name: 'stop', meaning: 'stop' }],
    components: '阝 (hill) + 艮 (stop)',
    story: 'STOPPING (艮) at the HILL (阝) edge - LIMIT! Boundary. Hill stop = LIMIT!',
    hint: 'Hill stop = limit',
    reading_mnemonic: 'げん/かぎ (gen/kagi) - "GEN LIMITS!" KAGIRU = limit! SEIGEN = restriction!'
  },
  {
    character: '除',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill' }, { char: '余', name: 'surplus', meaning: 'surplus' }],
    components: '阝 (hill) + 余 (surplus)',
    story: 'SURPLUS (余) removed from HILL (阝) - REMOVE/EXCLUDE! Take away. Remove surplus = REMOVE!',
    hint: 'Remove surplus = remove',
    reading_mnemonic: 'じょ/のぞ (jo/nozo) - "JOE REMOVES!" NOZOKU = remove! SOJI = cleaning!'
  },
  {
    character: '険',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill' }, { char: '僉', name: 'all', meaning: 'steep' }],
    components: '阝 (hill) + 僉 (steep)',
    story: 'A STEEP (僉) HILL (阝) - DANGER! Peril. Steep hill = DANGER!',
    hint: 'Steep hill = danger',
    reading_mnemonic: 'けん (ken) - "KEN! DANGER!" KIKEN = danger! HOKEN = insurance!'
  },
  {
    character: '陽',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill' }, { char: '昜', name: 'sun rise', meaning: 'bright' }],
    components: '阝 (hill) + 昜 (bright)',
    story: 'BRIGHT (昜) side of the HILL (阝) - SUN/POSITIVE! Yang. Bright hill = SUN!',
    hint: 'Bright hill = sun',
    reading_mnemonic: 'よう (you) - "YO! SUN!" TAIYOU = sun! YOUKI = cheerful!'
  },
  {
    character: '際',
    radicals: [{ char: '阝', name: 'hill', meaning: 'hill' }, { char: '祭', name: 'festival', meaning: 'festival' }],
    components: '阝 (hill) + 祭 (festival)',
    story: 'FESTIVAL (祭) at the HILL (阝) border - OCCASION/EDGE! Time. Hill border = OCCASION!',
    hint: 'Hill border = occasion',
    reading_mnemonic: 'さい/きわ (sai/kiwa) - "SIGH! OCCASION!" JISSAI = actually! KOKUSAI = international!'
  },
  {
    character: '雑',
    radicals: [{ char: '九', name: 'nine', meaning: 'nine' }, { char: '木', name: 'tree', meaning: 'tree' }, { char: '隹', name: 'bird', meaning: 'bird' }],
    components: '九 (nine) + 木 (tree) + 隹 (bird)',
    story: 'NINE (九) things mixed like TREES (木) and BIRDS (隹) - MISCELLANEOUS! Mixed. Mixed stuff = MISCELLANEOUS!',
    hint: 'Mixed stuff = miscellaneous',
    reading_mnemonic: 'ざつ/ぞう (zatsu/zou) - "ZATS MISCELLANEOUS!" ZASSHI = magazine! ZATSUON = noise!'
  },
  {
    character: '難',
    radicals: [{ char: '堇', name: 'violet', meaning: 'difficult' }, { char: '隹', name: 'bird', meaning: 'bird' }],
    components: '堇 (difficult) + 隹 (bird)',
    story: 'A BIRD (隹) facing difficulties (堇) - DIFFICULT! Hard. Bird struggles = DIFFICULT!',
    hint: 'Bird struggles = difficult',
    reading_mnemonic: 'なん/むずか/かた (nan/muzuka/kata) - "NAN DIFFICULT!" MUZUKASHII = difficult! KONNAN = trouble!'
  },
  {
    character: '雪',
    radicals: [{ char: '雨', name: 'rain', meaning: 'rain' }, { char: 'ヨ', name: 'broom', meaning: 'sweep' }],
    components: '雨 (rain) + ヨ (broom)',
    story: 'RAIN (雨) you can sweep - SNOW! Frozen. Rain swept = SNOW!',
    hint: 'Rain swept = snow',
    reading_mnemonic: 'せつ/ゆき (setsu/yuki) - "SET of SNOW!" YUKI = snow!'
  },
  {
    character: '静',
    radicals: [{ char: '青', name: 'blue', meaning: 'blue' }, { char: '争', name: 'compete', meaning: 'fight' }],
    components: '青 (blue) + 争 (fight)',
    story: 'BLUE (青) calm, no FIGHTING (争) - QUIET! Silent. No fight = QUIET!',
    hint: 'No fight = quiet',
    reading_mnemonic: 'せい/しず (sei/shizu) - "SAY QUIET!" SHIZUKA = quiet! SEISHI = stillness!'
  },
  {
    character: '非',
    radicals: [{ char: '非', name: 'not', meaning: 'not' }],
    components: 'Two wings opposing',
    story: 'Wings going opposite ways - NOT/WRONG! Negative. Opposite = NOT!',
    hint: 'Opposite = not',
    reading_mnemonic: 'ひ (hi) - "HE says NOT!" HIJOU = extraordinary! HIHAN = criticism!'
  },
  {
    character: '面',
    radicals: [{ char: '面', name: 'face', meaning: 'face' }],
    components: 'Face in frame',
    story: 'A face in a frame - FACE/SURFACE! Side. Face frame = FACE!',
    hint: 'Face frame = face',
    reading_mnemonic: 'めん/おも/つら (men/omo/tsura) - "MEN with FACE!" OMOSHIROI = interesting! HYOUMEN = surface!'
  },
  {
    character: '靴',
    radicals: [{ char: '革', name: 'leather', meaning: 'leather' }, { char: '化', name: 'change', meaning: 'change' }],
    components: '革 (leather) + 化 (change)',
    story: 'LEATHER (革) CHANGED (化) into footwear - SHOES! Boots. Leather changed = SHOES!',
    hint: 'Leather changed = shoes',
    reading_mnemonic: 'か/くつ (ka/kutsu) - "KA SHOES!" KUTSU = shoes!'
  },
  {
    character: '頂',
    radicals: [{ char: '丁', name: 'nail', meaning: 'nail' }, { char: '頁', name: 'head', meaning: 'head' }],
    components: '丁 (nail) + 頁 (head)',
    story: 'The top of the HEAD (頁) like a NAIL (丁) point - TOP/RECEIVE! Summit. Head top = TOP!',
    hint: 'Head top = top',
    reading_mnemonic: 'ちょう/いただ (chou/itada) - "CHOU TOP!" ITADAKU = receive (humble)! CHOUJOU = summit!'
  },
  {
    character: '頭',
    radicals: [{ char: '豆', name: 'bean', meaning: 'bean' }, { char: '頁', name: 'head', meaning: 'head' }],
    components: '豆 (bean) + 頁 (head)',
    story: 'A HEAD (頁) shaped like a BEAN (豆) - HEAD! Skull. Bean head = HEAD!',
    hint: 'Bean head = head',
    reading_mnemonic: 'とう/ず/あたま/かしら (tou/zu/atama/kashira) - "TOE HEAD!" ATAMA = head!'
  },
  {
    character: '頼',
    radicals: [{ char: '束', name: 'bundle', meaning: 'bundle' }, { char: '頁', name: 'head', meaning: 'head' }],
    components: '束 (bundle) + 頁 (head)',
    story: 'Bowing HEAD (頁) with a BUNDLE (束) - RELY/REQUEST! Depend. Head bows = RELY!',
    hint: 'Head bows = rely',
    reading_mnemonic: 'らい/たの/たよ (rai/tano/tayo) - "RELY on RAI!" TANOMU = ask! TAYORU = depend!'
  },
  {
    character: '顔',
    radicals: [{ char: '彦', name: 'lad', meaning: 'elegant' }, { char: '頁', name: 'head', meaning: 'head' }],
    components: '彦 (elegant) + 頁 (head)',
    story: 'An ELEGANT (彦) HEAD (頁) - FACE! Countenance. Elegant head = FACE!',
    hint: 'Elegant head = face',
    reading_mnemonic: 'がん/かお (gan/kao) - "GON has a FACE!" KAO = face!'
  },
  {
    character: '願',
    radicals: [{ char: '原', name: 'original', meaning: 'original' }, { char: '頁', name: 'head', meaning: 'head' }],
    components: '原 (original) + 頁 (head)',
    story: 'HEAD (頁) bowing with ORIGINAL (原) desire - WISH/REQUEST! Prayer. Original wish = WISH!',
    hint: 'Original wish = wish',
    reading_mnemonic: 'がん/ねが (gan/nega) - "GON WISHES!" NEGAU = wish! SHIGAN = application!'
  },
  {
    character: '類',
    radicals: [{ char: '米', name: 'rice', meaning: 'rice' }, { char: '大', name: 'big', meaning: 'big' }, { char: '頁', name: 'head', meaning: 'head' }],
    components: '米 (rice) + 大 (big) + 頁 (head)',
    story: 'HEADS (頁) sorted like RICE (米) - KIND/TYPE! Category. Sorted heads = KIND!',
    hint: 'Sorted heads = kind',
    reading_mnemonic: 'るい (rui) - "RUI TYPE!" SHURUI = kind! JINRUI = mankind!'
  },
  {
    character: '飛',
    radicals: [{ char: '飛', name: 'fly', meaning: 'fly' }],
    components: 'Bird with wings spread',
    story: 'Wings spread taking off - FLY! Soar. Wings spread = FLY!',
    hint: 'Wings spread = fly',
    reading_mnemonic: 'ひ/と (hi/to) - "HE FLIES!" TOBU = fly! HIKOUKI = airplane!'
  }
]

async function insertBatch() {
  console.log('🏛️ N3 BATCH 12: Places & Things (30 kanji)')
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
  console.log(`✨ Batch 12 complete! ${success} succeeded, ${failed} failed`)
}

insertBatch()
