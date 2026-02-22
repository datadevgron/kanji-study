import React, { useMemo, useRef, useState } from 'react'

// Romaji to Hiragana conversion map
const ROMAJI_TO_HIRAGANA = {
  'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
  'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
  'sa': 'さ', 'si': 'し', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
  'ta': 'た', 'ti': 'ち', 'chi': 'ち', 'tu': 'つ', 'tsu': 'つ', 'te': 'て', 'to': 'と',
  'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
  'ha': 'は', 'hi': 'ひ', 'hu': 'ふ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
  'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
  'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
  'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
  'wa': 'わ', 'wi': 'ゐ', 'we': 'ゑ', 'wo': 'を',
  'n': 'ん', "n'": 'ん',
  'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
  'za': 'ざ', 'zi': 'じ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
  'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
  'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
  'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
  // Combo sounds
  'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
  'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ', 'sya': 'しゃ', 'syu': 'しゅ', 'syo': 'しょ',
  'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ', 'tya': 'ちゃ', 'tyu': 'ちゅ', 'tyo': 'ちょ',
  'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
  'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
  'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
  'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
  'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
  'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ', 'jya': 'じゃ', 'jyu': 'じゅ', 'jyo': 'じょ',
  'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
  'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
  // Small tsu (double consonant)
  'kk': 'っk', 'ss': 'っs', 'tt': 'っt', 'pp': 'っp', 'cc': 'っc',
  // Long vowels
  'aa': 'ああ', 'ii': 'いい', 'uu': 'うう', 'ee': 'ええ', 'oo': 'おお', 'ou': 'おう',
  '-': 'ー',
}

function romajiToHiragana(text) {
  let result = ''
  let i = 0
  const lower = text.toLowerCase()
  
  while (i < lower.length) {
    let found = false
    
    // Handle double consonants (small tsu) - check this FIRST
    // e.g., "kko" -> "っこ", "tta" -> "った"
    if (i < lower.length - 1) {
      const char = lower[i]
      const next = lower[i + 1]
      if (char === next && 'kstpgzdbcfhjmrw'.includes(char)) {
        result += 'っ'
        i += 1  // Skip first consonant, let the second one be processed normally
        found = true
        continue
      }
    }
    
    // Try matching longest patterns first (up to 4 chars)
    for (let len = 4; len >= 1; len--) {
      const chunk = lower.slice(i, i + len)
      if (ROMAJI_TO_HIRAGANA[chunk]) {
        result += ROMAJI_TO_HIRAGANA[chunk]
        i += len
        found = true
        break
      }
    }
    
    // Handle 'n' before consonant or end
    if (!found && lower[i] === 'n') {
      const next = lower[i + 1]
      if (!next || (!'aiueoy'.includes(next) && next !== "'")) {
        result += 'ん'
        i += 1
        found = true
      }
    }
    
    if (!found) {
      result += text[i] // Keep original character
      i += 1
    }
  }
  
  return result
}

function normalize(s){
  return (s||'').trim().replace(/\s+/g,' ').toLowerCase()
}

function itemKey(it){
  return `${it.type}|${it.prompt}|${(it.answers||[]).join(',')}`
}

export default function Quiz({kanji, data, words, onBackToStudy, onBackToHome}){
  const [started, setStarted] = useState(false)
  
  // Build quiz items: 1) kanji -> meaning, then for each word: word -> reading, word -> meaning
  const initialItems = useMemo(()=>{
    const items = []
    items.push({type:'kanji-meaning', prompt: kanji, answers: (data && data.meanings) ? data.meanings : []})
    words.forEach(w=>{
      items.push({type:'word-reading', prompt: w.word, answers: [w.reading]})
      // Split meaning by semicolons to accept any individual meaning as correct
      const meaningAnswers = w.meaning ? w.meaning.split(';').map(m => m.trim()).filter(Boolean) : []
      items.push({type:'word-meaning', prompt: w.word, answers: meaningAnswers})
    })
    return items
  }, [kanji, data, words])

  const initialRef = useRef(initialItems)
  const [queue, setQueue] = useState(initialItems)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [responses, setResponses] = useState([]) // record {item, user, ok, expected}
  const [retryList, setRetryList] = useState([])
  const [results, setResults] = useState({})
  const [pass, setPass] = useState(0)
  const [finished, setFinished] = useState(false)

  const cur = queue[index]
  
  // For reading questions, convert romaji input to hiragana
  const isReadingQuestion = cur && cur.type === 'word-reading'
  const displayInput = isReadingQuestion ? romajiToHiragana(input) : input

  function check(){
    if(!cur) return
    const valueToCheck = isReadingQuestion ? romajiToHiragana(input) : input
    const n = normalize(valueToCheck)
    const ok = cur.answers.some(a=>normalize(a) === n)
    setFeedback(ok ? {ok:true,msg:'Correct!'} : {ok:false,msg:`Expected: ${cur.answers.join(' / ')}`})

    const k = itemKey(cur)
    setResults(prev=>{
      const next = {...prev}
      if(ok) next[k] = true
      else if(!(k in next)) next[k] = false
      return next
    })

    if(!ok){
      setRetryList(r=>{
        const k2 = itemKey(cur)
        if(r.find(x=>itemKey(x)===k2)) return r
        return [...r, cur]
      })
    }
    // record response
    setResponses(r=>[...r, {item:cur, user:valueToCheck, ok, expected: cur.answers}])
  }

  function goNext(){
    setInput('')
    setFeedback(null)
    const nextIndex = index + 1
    if(nextIndex < queue.length){
      setIndex(nextIndex)
      return
    }

    // finished the quiz - go to results
    setFinished(true)
  }

  function restart(){
    setQueue(initialRef.current)
    setIndex(0)
    setInput('')
    setFeedback(null)
    setRetryList([])
    setResults({})
    setPass(0)
    setFinished(false)
    setResponses([])
    setStarted(true)
  }

  function endQuiz(){
    setFinished(true)
  }

  function retryIncorrect(){
    const incorrectItems = responses.filter(r => !r.ok).map(r => r.item)
    // Remove duplicates
    const uniqueIncorrect = incorrectItems.filter((item, idx, arr) => 
      arr.findIndex(x => itemKey(x) === itemKey(item)) === idx
    )
    if(uniqueIncorrect.length > 0){
      setQueue(uniqueIncorrect)
      setIndex(0)
      setInput('')
      setFeedback(null)
      setRetryList([])
      setPass(pass + 1)
      setFinished(false)
      setResponses([])
    }
  }

  // Quiz intro screen
  if(!started){
    return (
      <div style={{padding:32,textAlign:'center'}}>
        <div style={{fontSize:64,marginBottom:16}}>{kanji}</div>
        <div style={{fontSize:24,fontWeight:700,marginBottom:8}}>Ready to Quiz?</div>
        <div style={{fontSize:14,color:'var(--muted)',marginBottom:24}}>
          {initialItems.length} questions • Kanji meanings & word readings
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}>
          <button className="btn" onClick={()=>setStarted(true)}>Start Quiz</button>
          {onBackToStudy && <button className="btn secondary" onClick={onBackToStudy}>Back to Study</button>}
        </div>
      </div>
    )
  }

  if(finished){
    const total = initialRef.current.length
    const correctResponses = responses.filter(r=>r.ok)
    const incorrectResponses = responses.filter(r=>!r.ok)
    // Get unique incorrect items
    const uniqueIncorrect = incorrectResponses.filter((r, idx, arr) => 
      arr.findIndex(x => itemKey(x.item) === itemKey(r.item)) === idx
    )
    const score = Math.round((correctResponses.length / responses.length) * 100) || 0
    
    return (
      <div style={{padding:20,textAlign:'center'}}>
        {/* Score Circle */}
        <div style={{
          width:120,
          height:120,
          borderRadius:'50%',
          background: score >= 80 ? 'linear-gradient(135deg, #10b981, #059669)' : 
                      score >= 50 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 
                      'linear-gradient(135deg, #ef4444, #dc2626)',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          margin:'0 auto 20px',
          boxShadow:'0 4px 14px rgba(0,0,0,0.15)'
        }}>
          <div style={{fontSize:32,fontWeight:700,color:'white'}}>{score}%</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.9)'}}>Score</div>
        </div>

        <div style={{fontSize:24,fontWeight:700,marginBottom:8}}>
          {score >= 80 ? '🎉 Great job!' : score >= 50 ? '👍 Good effort!' : '💪 Keep practicing!'}
        </div>
        
        <div style={{fontSize:16,color:'var(--muted)',marginBottom:24}}>
          {correctResponses.length} correct out of {responses.length} questions
        </div>

        {/* Action Buttons */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:32}}>
          {onBackToHome && <button className="btn" onClick={onBackToHome}>Back to Home</button>}
          <button className="btn secondary" onClick={restart}>Try Again</button>
          {uniqueIncorrect.length > 0 && (
            <button className="btn secondary" onClick={retryIncorrect}>
              Retry Incorrect ({uniqueIncorrect.length})
            </button>
          )}
        </div>

        {/* Results Details */}
        {uniqueIncorrect.length > 0 && (
          <div style={{
            background:'rgba(239,68,68,0.08)',
            borderRadius:12,
            padding:16,
            marginBottom:16,
            textAlign:'left'
          }}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:12,color:'#ef4444'}}>
              ❌ Incorrect ({uniqueIncorrect.length})
            </div>
            {uniqueIncorrect.map((r,i)=> (
              <div key={i} style={{
                padding:'10px 12px',
                background:'white',
                borderRadius:8,
                marginBottom:8,
                border:'1px solid rgba(239,68,68,0.2)'
              }}>
                <div style={{fontSize:18,fontWeight:600}}>{r.item.prompt}</div>
                <div style={{fontSize:13,color:'var(--muted)',marginTop:4}}>
                  Your answer: <span style={{color:'#ef4444'}}>{r.user || '(empty)'}</span>
                </div>
                <div style={{fontSize:13,color:'#059669',marginTop:2}}>
                  Correct: {r.expected.join(' / ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {correctResponses.length > 0 && (
          <div style={{
            background:'rgba(16,185,129,0.08)',
            borderRadius:12,
            padding:16,
            textAlign:'left'
          }}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:12,color:'#10b981'}}>
              ✓ Correct ({correctResponses.length})
            </div>
            {correctResponses.map((r,i)=> (
              <div key={i} style={{
                padding:'8px 12px',
                background:'white',
                borderRadius:8,
                marginBottom:6,
                border:'1px solid rgba(16,185,129,0.2)',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
              }}>
                <span style={{fontWeight:500}}>{r.item.prompt}</span>
                <span style={{color:'var(--muted)',fontSize:14}}>{r.user}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{padding:12,position:'relative'}}>
        {/* End Quiz Button - top right */}
        <button 
          onClick={endQuiz}
          style={{
            position:'absolute',
            top:12,
            right:12,
            fontSize:12,
            padding:'4px 12px',
            background:'transparent',
            border:'1px solid var(--border)',
            borderRadius:6,
            color:'var(--muted)',
            cursor:'pointer'
          }}
        >
          End Quiz ×
        </button>

        {cur ? (
          <>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',paddingTop:20}}>
              <div style={{fontSize:42,fontWeight:700}}>{cur.prompt}</div>
              <div style={{fontSize:14,color:'var(--muted)',marginTop:8}}>
                {cur.type === 'kanji-meaning' ? 'Type the meaning of the kanji' : (cur.type === 'word-reading' ? 'Type the reading in hiragana' : 'Type the meaning')}
              </div>

              <div style={{marginTop:16,width:'100%',maxWidth:400}}>
                {isReadingQuestion && input && (
                  <div style={{fontSize:24,marginBottom:8,minHeight:32,color:'var(--foreground)'}}>{displayInput}</div>
                )}
                <input 
                  autoFocus 
                  className="quiz-input" 
                  value={input} 
                  onChange={e=>setInput(e.target.value)} 
                  placeholder={isReadingQuestion ? "Type in romaji (e.g., 'mizu')" : "Type your answer"} 
                  onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                      if(!feedback) check()
                      else goNext()
                    }
                  }} 
                  style={{textAlign:'center'}}
                />
              </div>

              <div className="controls">
                {index > 0 && <button className="btn secondary" onClick={()=>{ setInput(''); setFeedback(null); setIndex(Math.max(0,index-1)); }}>Prev</button>}
                <button className="btn" onClick={()=>{ if(!feedback) check(); else goNext(); }}>{!feedback ? 'Check' : 'Next'}</button>
              </div>

              {feedback && (
                <div className="result" style={{color: feedback.ok ? '#0b6' : '#f44'}}>{feedback.msg}</div>
              )}

              <div className="result">Question {index+1} / {queue.length} {pass > 0 ? '(retry pass)' : ''}</div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}
