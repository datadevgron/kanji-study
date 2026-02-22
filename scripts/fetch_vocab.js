// Fetch vocabulary examples for kanji using the Jisho API
// Writes results to src/data/vocab.js

import fs from 'fs'

const KANJI = ['日','水']
const OUT = './src/data/vocab.js'

async function fetchFor(kanji){
  // fetch kanji readings from kanjiapi
  let onyomi = []
  let kunyomi = []
  let kanjiMeanings = []
  try{
    const kres = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`)
    if(kres.ok){
      const kjson = await kres.json()
      onyomi = kjson.on_readings || kjson.onyomi || kjson.on || []
      kunyomi = kjson.kun_readings || kjson.kunyomi || kjson.kun || []
      kanjiMeanings = kjson.meanings || []
    }
  }catch(e){}

  // helper: convert katakana to hiragana
  function toHiragana(s){
    if(!s) return ''
    return Array.from(s).map(ch=>{
      const code = ch.codePointAt(0)
      if(code >= 0x30A1 && code <= 0x30F6) return String.fromCodePoint(code - 0x60)
      return ch
    }).join('')
  }

  // Strip okurigana (e.g., "かわ.く" → "かわ")
  function stripOkurigana(reading){
    if(!reading) return ''
    return reading.split('.')[0].replace(/[-.]/g, '')
  }

  const validSingleReadings = new Set([
    ...onyomi.map(toHiragana),
    ...kunyomi.map(r => toHiragana(stripOkurigana(r)))
  ].filter(Boolean))

  // All readings we want to cover
  const allReadings = [
    ...onyomi.map(r => ({ reading: toHiragana(r), type: 'onyomi', original: r })),
    ...kunyomi.map(r => ({ reading: toHiragana(stripOkurigana(r)), type: 'kunyomi', original: r }))
  ]

  function coversReading(wordReading, kanjiReading){
    const wnorm = toHiragana(wordReading || '')
    const knorm = toHiragana(kanjiReading || '')
    return wnorm.includes(knorm) || knorm.includes(wnorm)
  }

  function getMatchingReadings(wordReading){
    return allReadings.filter(r => coversReading(wordReading, r.reading))
  }

  function extractJlpt(it){
    if(!it) return null
    if(Array.isArray(it.jlpt) && it.jlpt.length){
      const t = it.jlpt.find(x=>/jlpt[-_ ]?n?\d+/i.test(x))
      if(t){ const m = t.match(/jlpt[-_ ]?n?(\d+)/i); if(m && m[1]) return 'N'+m[1] }
    }
    if(it.tags && Array.isArray(it.tags)){
      const t = it.tags.find(tag => /jlpt[-_ ]?n?\d+/i.test(tag) || /\bN[1-5]\b/i.test(tag))
      if(t){ const m = t.match(/jlpt[-_ ]?n?(\d+)/i) || t.match(/\bN(\d)\b/i); if(m && m[1]) return 'N'+m[1] }
    }
    return null
  }

  async function fetchJishoWords(searchTerm){
    const url = 'https://jisho.org/api/v1/search/words?keyword='+encodeURIComponent(searchTerm)
    const res = await fetch(url)
    if(!res.ok) return []
    const json = await res.json()
    return json.data || []
  }

  const byWord = new Map()

  function processJishoResults(data){
    for(const item of data){
      const jap = item.japanese && item.japanese[0]
      if(!jap) continue
      const word = jap.word || jap.reading
      if(!word || !word.includes(kanji)) continue
      // Skip words with non-Japanese characters (brand names, etc)
      if(/[a-zA-Z・]/.test(word)) continue
      // Skip very long compound words (usually obscure)
      if(word.length > 4) continue
      const reading = jap.reading || ''
      if(!reading) continue // Skip entries without reading
      const meaning = (item.senses && item.senses[0] && item.senses[0].english_definitions) ? item.senses[0].english_definitions.join('; ') : ''
      const jlpt = extractJlpt(item)
      const is_common = !!item.is_common
      if(!byWord.has(word)){
        byWord.set(word, {word, reading, meaning, jlpt, score: (word.length>1?2:1)+(is_common?4:0), is_common})
      } else {
        const ex = byWord.get(word)
        if(is_common && !ex.is_common) byWord.set(word, {word, reading, meaning, jlpt: ex.jlpt||jlpt, score: ex.score, is_common})
      }
    }
  }

  // Main search
  console.log('  Fetching main results...')
  const mainResults = await fetchJishoWords(kanji)
  processJishoResults(mainResults)

  // Check coverage and search for missing readings
  let coveredReadings = new Set()
  for(const w of byWord.values()){
    for(const r of getMatchingReadings(w.reading)) coveredReadings.add(r.original)
  }

  const uncoveredReadings = allReadings.filter(r => !coveredReadings.has(r.original))
  for(const ur of uncoveredReadings){
    console.log('  Searching for words with reading '+ur.original+'...')
    // Try multiple search strategies for better coverage
    const searches = [
      kanji+' '+toHiragana(ur.original),
      '*'+kanji+'* '+toHiragana(ur.original)
    ]
    for(const searchTerm of searches){
      const additionalResults = await fetchJishoWords(searchTerm)
      processJishoResults(additionalResults)
    }
  }
  
  // Also search for common words that use specific readings we want
  // This helps find words like 本日 (honjitsu)
  const commonWordsToFind = {
    '日': ['本日', '毎日', '今日', '昨日', '明日', '休日', '祝日', '平日'],
    '水': ['水', '水曜', '水道', '水泳', '洪水', '海水']
  }
  if(commonWordsToFind[kanji]){
    for(const cw of commonWordsToFind[kanji]){
      if(!byWord.has(cw)){
        const results = await fetchJishoWords(cw)
        processJishoResults(results)
      }
    }
  }

  // Get results
  let results = Array.from(byWord.values()).sort((a,b)=> b.score - a.score)
  const singles = results.filter(r=> r.word.length === 1)
  const multis = results.filter(r=> r.word.length > 1)

  const goodSingles = singles.filter(r=>{
    const rnorm = toHiragana(r.reading || '')
    return validSingleReadings.has(rnorm)
  })

  // For standalone kanji word: prioritize COMMON kun'yomi (the general rule)
  // But use whatever Jisho marks as common if available
  let kanjiAsWord = null
  const kanjiSingles = goodSingles.filter(r => r.word === kanji)
  const commonKanjiSingles = kanjiSingles.filter(r => r.is_common)
  
  // Get kun'yomi readings (stripped of okurigana)
  const kunyomiReadings = kunyomi.map(r => toHiragana(stripOkurigana(r)))
  
  if(commonKanjiSingles.length > 0){
    // Prefer common kun'yomi reading for standalone kanji
    const commonKun = commonKanjiSingles.find(r => kunyomiReadings.includes(toHiragana(r.reading)))
    kanjiAsWord = commonKun || commonKanjiSingles[0]
  } else if(kanjiSingles.length > 0){
    // Prefer kun'yomi even if not marked common
    const kunSingle = kanjiSingles.find(r => kunyomiReadings.includes(toHiragana(r.reading)))
    kanjiAsWord = kunSingle || kanjiSingles[0]
  }
  
  // If no good single found from Jisho, create from kanji data with kun'yomi
  if(!kanjiAsWord && kunyomi.length > 0 && kanjiMeanings.length > 0){
    kanjiAsWord = {
      word: kanji,
      reading: stripOkurigana(kunyomi[0]),
      meaning: kanjiMeanings.slice(0,3).join('; '),
      jlpt: null,
      is_common: true // Assume common for basic kanji
    }
  }

  // Build final list
  const finalResults = []
  coveredReadings = new Set()

  if(kanjiAsWord){
    finalResults.push({word: kanjiAsWord.word, reading: kanjiAsWord.reading, meaning: kanjiAsWord.meaning, jlpt: kanjiAsWord.jlpt})
    for(const r of getMatchingReadings(kanjiAsWord.reading)) coveredReadings.add(r.original)
  }

  // Score multis by uncovered readings
  const scoredMultis = multis.map(w => {
    let readingScore = 0
    for(const r of allReadings){
      if(!coveredReadings.has(r.original) && coversReading(w.reading, r.reading)) readingScore += 10
    }
    return { ...w, readingScore }
  }).sort((a,b) => b.readingScore - a.readingScore || b.score - a.score)

  // First pass: add words that cover uncovered readings
  for(const w of scoredMultis){
    if(finalResults.length >= 12) break
    if(finalResults.some(r => r.word === w.word)) continue
    
    // Check if this word covers any uncovered reading
    const coversNewReading = allReadings.some(r => 
      !coveredReadings.has(r.original) && coversReading(w.reading, r.reading)
    )
    
    if(coversNewReading){
      finalResults.push({word: w.word, reading: w.reading, meaning: w.meaning, jlpt: w.jlpt})
      for(const r of allReadings){
        if(coversReading(w.reading, r.reading)) coveredReadings.add(r.original)
      }
    }
  }

  // Second pass: only add words that have JLPT level (important vocab)
  for(const w of scoredMultis){
    if(finalResults.length >= 10) break
    if(finalResults.some(r => r.word === w.word)) continue
    
    // Only add if it has a JLPT level
    if(w.jlpt){
      finalResults.push({word: w.word, reading: w.reading, meaning: w.meaning, jlpt: w.jlpt})
    }
  }

  // Log coverage
  const uncovered = allReadings.filter(r => !coveredReadings.has(r.original))
  if(uncovered.length > 0){
    console.log('  Missing readings:', uncovered.map(r => r.original+'('+r.type+')').join(', '))
  } else {
    console.log('  All readings covered!')
  }

  return finalResults
}

async function main(){
  const out = {}
  for(const k of KANJI){
    try{
      console.log('Fetching vocab for '+k+'...')
      const v = await fetchFor(k)
      out[k] = v
      console.log('  Got '+v.length+' words')
    }catch(e){
      console.error('err',k,e)
      out[k] = []
    }
  }
  const content = '// Auto-generated vocab file. Run scripts/fetch_vocab.js to refresh.\nexport const VOCAB = '+JSON.stringify(out, null, 2)+'\n'
  fs.writeFileSync(OUT, content, 'utf8')
  console.log('Wrote '+OUT)
}

main().catch(e=>{ console.error(e); process.exit(1) })
