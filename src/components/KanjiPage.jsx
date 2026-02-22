import React, { useState, useEffect } from 'react'
import Flashcards from './Flashcards'
import Quiz from './Quiz'
import WritingPractice from './WritingPractice'
import { fetchVocabByCharacter } from '../lib/kanjiService'

export default function KanjiPage({kanji, data, userLevel, kanjiData, userId, onBack, onDataUpdate}){
  const [mode, setMode] = useState('study') // 'study' | 'quiz' | 'write'
  const [words, setWords] = useState([])
  const [loadingVocab, setLoadingVocab] = useState(true)

  // Build set of all kanji characters at the user's level
  const knownKanjiChars = React.useMemo(() => {
    return new Set(Object.keys(kanjiData || {}))
  }, [kanjiData])

  // Fetch vocab from Supabase when kanji or userLevel changes
  useEffect(() => {
    async function loadVocab() {
      setLoadingVocab(true)
      const vocab = await fetchVocabByCharacter(kanji, userLevel, knownKanjiChars)
      setWords(vocab)
      setLoadingVocab(false)
    }
    loadVocab()
  }, [kanji, userLevel, knownKanjiChars])

  // Handle vocab meaning update
  function handleVocabUpdate(word, reading, newMeaning) {
    setWords(prev => prev.map(w => 
      (w.word === word && w.reading === reading) 
        ? { ...w, meaning: newMeaning } 
        : w
    ))
  }

  return (
    <div>
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
        <button className="btn secondary" onClick={onBack}>← Back</button>
        <div style={{fontSize:18,fontWeight:700}}>{kanji} — {mode}</div>
        <div style={{marginLeft:'auto', display:'flex', gap:8}}>
          <button 
            className={`btn ${mode === 'study' ? '' : 'secondary'}`} 
            onClick={()=>setMode('study')}
          >
            Study
          </button>
          <button 
            className={`btn ${mode === 'quiz' ? '' : 'secondary'}`} 
            onClick={()=>setMode('quiz')}
          >
            Quiz
          </button>
        </div>
      </div>

      <div className="card">
        {loadingVocab ? (
          <div style={{textAlign: 'center', padding: 40, color: '#6b7280'}}>
            Loading vocab...
          </div>
        ) : (
          <>
            {mode === 'study' && <Flashcards kanji={kanji} data={data} words={words} userId={userId} onStartQuiz={()=>setMode('quiz')} onStartWrite={()=>setMode('write')} onDataUpdate={onDataUpdate} onVocabUpdate={handleVocabUpdate} />}
            {mode === 'write' && <WritingPractice kanji={kanji} onBack={()=>setMode('study')} />}
            {mode === 'quiz' && <Quiz kanji={kanji} data={data} words={words} onBackToStudy={()=>setMode('study')} onBackToHome={onBack} />}
          </>
        )}
      </div>
    </div>
  )
}
