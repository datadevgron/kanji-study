import React, { useState, useEffect } from 'react'
import { 
  getDueForReview,
  updateReview,
  loadStudySettings,
  saveQuizResult
} from '../lib/studyService'
import { fetchVocabByCharacter } from '../lib/kanjiService'

// Romaji to Hiragana conversion (reused from Quiz.jsx)
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
  'wa': 'わ', 'wo': 'を', 'n': 'ん', "n'": 'ん',
  'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
  'za': 'ざ', 'zi': 'じ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
  'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
  'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
  'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
  'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
  'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
  'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
  'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
  'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
  'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
  'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
  'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
  'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
  'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
  'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
  '-': 'ー',
}

function romajiToHiragana(text) {
  let result = ''
  let i = 0
  const lower = text.toLowerCase()
  
  while (i < lower.length) {
    let found = false
    
    // Double consonant (small tsu)
    if (i < lower.length - 1) {
      const char = lower[i]
      const next = lower[i + 1]
      if (char === next && 'kstpgzdbcfhjmrw'.includes(char)) {
        result += 'っ'
        i += 1
        continue
      }
    }
    
    // Match longest patterns first
    for (let len = 3; len >= 1; len--) {
      const chunk = lower.slice(i, i + len)
      if (ROMAJI_TO_HIRAGANA[chunk]) {
        result += ROMAJI_TO_HIRAGANA[chunk]
        i += len
        found = true
        break
      }
    }
    
    // 'n' before consonant or end
    if (!found && lower[i] === 'n') {
      const next = lower[i + 1]
      if (!next || (!'aiueoy'.includes(next) && next !== "'")) {
        result += 'ん'
        i += 1
        found = true
      }
    }
    
    if (!found) {
      result += text[i]
      i += 1
    }
  }
  
  return result
}

/**
 * Review Quiz Component (SRS-based)
 * - Tests kanji due for review
 * - Updates SRS progress based on answers
 * - Auto-marks kanji as "known" when completing all stages
 */
export default function ReviewQuiz({ 
  userId, 
  kanjiData,
  knownKanji,
  setKnownKanji,
  onClose 
}) {
  const [dueKanji, setDueKanji] = useState([])
  const [quizKanji, setQuizKanji] = useState([])
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(true)
  const [srsIntervals, setSrsIntervals] = useState([1, 1, 2, 3, 5, 8, 14])
  const [quizComplete, setQuizComplete] = useState(false)
  const [results, setResults] = useState({ correct: 0, total: 0, completed: [] })
  const [isCorrect, setIsCorrect] = useState(false)

  // Load due kanji and settings
  useEffect(() => {
    async function load() {
      const settings = await loadStudySettings(userId)
      const due = await getDueForReview(userId, settings.weekly_goal)
      
      setDueKanji(due)
      setSrsIntervals(settings.srs_intervals)
      
      if (due.length > 0) {
        // Pick 2-5 random kanji for this quiz session
        const shuffled = [...due].sort(() => Math.random() - 0.5)
        const selected = shuffled.slice(0, Math.min(5, Math.max(2, shuffled.length)))
        setQuizKanji(selected)
        
        // Build questions for selected kanji
        await buildQuestions(selected)
      }
      setLoading(false)
    }
    load()
  }, [userId])

  // Build questions for selected kanji
  const buildQuestions = async (selectedKanji) => {
    const allQuestions = []
    
    for (const item of selectedKanji) {
      const char = item.kanji_character
      const info = kanjiData[char]
      
      if (!info) continue

      // Question 1: What is the meaning of this kanji?
      if (info.meanings?.length > 0) {
        allQuestions.push({
          type: 'meaning',
          kanji: char,
          question: `What is the meaning of 「${char}」?`,
          answer: info.meanings[0],
          allAnswers: info.meanings,
          options: generateOptions(info.meanings[0], kanjiData)
        })
      }

      // Question 2: What is the reading?
      const readings = [
        ...(info.onyomi || []),
        ...(info.kunyomi || [])
      ].filter(Boolean)
      
      if (readings.length > 0) {
        allQuestions.push({
          type: 'reading',
          kanji: char,
          question: `What is a reading of 「${char}」?`,
          answer: readings[0],
          allAnswers: readings,
          isReading: true
        })
      }

      // Question 3: Vocab (if available)
      try {
        const knownChars = new Set([...knownKanji, ...selectedKanji.map(k => k.kanji_character)])
        const vocab = await fetchVocabByCharacter(char, knownChars)
        if (vocab?.length > 0) {
          const word = vocab[0]
          allQuestions.push({
            type: 'vocab',
            kanji: char,
            question: `What does 「${word.word}」 mean?`,
            vocab: word.word,
            answer: word.meaning || '',
            allAnswers: word.meaning ? word.meaning.split(';').map(s => s.trim()) : [],
            reading: word.reading || ''
          })
        }
      } catch (e) {
        console.warn('Error fetching vocab:', e)
      }
    }

    // Shuffle questions
    setQuestions(allQuestions.sort(() => Math.random() - 0.5))
  }

  // Generate multiple choice options
  const generateOptions = (correct, kanjiData) => {
    if (!correct) return []
    
    const allMeanings = Object.values(kanjiData)
      .map(k => k.meanings?.[0])
      .filter(m => m && m !== correct)
    
    const shuffled = allMeanings.sort(() => Math.random() - 0.5)
    const options = [correct, ...shuffled.slice(0, 3)]
    return options.sort(() => Math.random() - 0.5)
  }

  const checkAnswer = (userAnswer) => {
    const question = questions[currentIndex]
    const ua = userAnswer.toLowerCase().trim()
    
    if (question.type === 'meaning') {
      return question.allAnswers.some(a => a.toLowerCase() === ua)
    } else if (question.type === 'reading') {
      const converted = romajiToHiragana(ua)
      return question.allAnswers.some(r => {
        const clean = r.replace(/[.-]/g, '')
        return r === ua || r === converted || clean === ua || clean === converted
      })
    } else if (question.type === 'vocab') {
      return question.allAnswers.some(a => {
        const al = a.toLowerCase()
        return al === ua || ua.includes(al) || al.includes(ua)
      })
    }
    return false
  }

  const submitAnswer = async () => {
    const question = questions[currentIndex]
    const correct = checkAnswer(input)
    setIsCorrect(correct)
    setShowResult(true)

    setResults(prev => ({
      ...prev,
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))

    // Update SRS for this kanji
    const completed = await updateReview(
      userId, 
      question.kanji, 
      correct, 
      srsIntervals
    )

    if (completed) {
      // Kanji completed all SRS stages - mark as known!
      setKnownKanji(prev => {
        const next = new Set(prev)
        next.add(question.kanji)
        return next
      })
      setResults(prev => ({
        ...prev,
        completed: [...prev.completed, question.kanji]
      }))
    }
  }

  const nextQuestion = () => {
    setShowResult(false)
    setInput('')
    setIsCorrect(false)
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setQuizComplete(true)
      saveQuizResult(
        userId,
        quizKanji.map(k => k.kanji_character),
        results.correct,
        results.total,
        'srs-review'
      )
    }
  }

  // Loading state
  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 32,
          textAlign: 'center'
        }}>
          Loading review...
        </div>
      </div>
    )
  }

  // No kanji due
  if (dueKanji.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 32,
          maxWidth: 400,
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#1f2937' }}>
            All caught up!
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 20 }}>
            No kanji are due for review. Add some to your study queue or check back later!
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Quiz complete
  if (quizComplete) {
    const percentage = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0
    const iconColor = percentage >= 80 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444'
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 32,
          maxWidth: 400,
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: 16 }}>
            {percentage >= 80 ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            ) : percentage >= 50 ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
              </svg>
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            )}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#1f2937' }}>
            Review Complete!
          </h2>
          <div style={{ 
            fontSize: 48, 
            fontWeight: 800, 
            color: percentage >= 80 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444',
            marginBottom: 8
          }}>
            {percentage}%
          </div>
          <p style={{ color: '#6b7280', marginBottom: 16 }}>
            {results.correct} / {results.total} correct
          </p>
          
          {results.completed.length > 0 && (
            <div style={{
              background: 'rgba(16,185,129,0.1)',
              padding: 12,
              borderRadius: 10,
              marginBottom: 20
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#059669', marginBottom: 4 }}>
                🏆 Mastered!
              </div>
              <div style={{ fontSize: 28 }}>
                {results.completed.join(' ')}
              </div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>
                Completed all review stages — now marked as known!
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  // No questions
  if (questions.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 32,
          textAlign: 'center'
        }}>
          <p>Building questions...</p>
        </div>
      </div>
    )
  }

  const question = questions[currentIndex]
  const displayInput = question.type === 'reading' ? romajiToHiragana(input) : input

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 28,
        maxWidth: 500,
        width: '95%'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>
            Review {currentIndex + 1} / {questions.length}
          </span>
          <span style={{ fontSize: 12, color: '#10b981' }}>
            {results.correct} correct
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 20,
              color: '#9ca3af',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div style={{
          background: 'rgba(0,0,0,0.06)',
          borderRadius: 4,
          height: 6,
          marginBottom: 24,
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, #10b981, #059669)',
            height: '100%',
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Question Type Label */}
        <div style={{
          fontSize: 11,
          color: '#9ca3af',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {question.type === 'meaning' ? '📝 Meaning' : 
           question.type === 'reading' ? '🗣️ Reading' : '📖 Vocabulary'}
        </div>

        {/* Question */}
        <div style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#1f2937',
          marginBottom: 24
        }}>
          {question.question}
        </div>

        {/* Answer Input */}
        {!showResult ? (
          <>
            {question.type === 'meaning' && question.options?.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: 10,
                marginBottom: 20 
              }}>
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(opt)}
                    style={{
                      padding: '14px 16px',
                      background: input === opt ? 'rgba(13,148,136,0.15)' : 'rgba(0,0,0,0.03)',
                      border: input === opt ? '2px solid #0d9488' : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: 10,
                      fontSize: 14,
                      color: input === opt ? '#0d9488' : '#374151',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom: 20 }}>
                <input
                  type="text"
                  value={displayInput}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={question.type === 'reading' 
                    ? 'Type reading (romaji or hiragana)...'
                    : 'Type your answer...'}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: 16,
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: 10,
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && input.trim()) submitAnswer()
                  }}
                />
                {question.type === 'reading' && input && displayInput !== input && (
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
                    Converted: {displayInput}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={submitAnswer}
              disabled={!input.trim()}
              style={{
                width: '100%',
                padding: '14px',
                background: input.trim() 
                  ? 'linear-gradient(135deg, #0d9488, #14b8a6)' 
                  : 'rgba(0,0,0,0.1)',
                border: 'none',
                borderRadius: 10,
                color: input.trim() ? 'white' : '#9ca3af',
                fontSize: 15,
                fontWeight: 600,
                cursor: input.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Submit Answer
            </button>
          </>
        ) : (
          <>
            <div style={{
              background: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              padding: 20,
              borderRadius: 12,
              marginBottom: 20,
              border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
            }}>
              <div style={{
                fontSize: 18,
                fontWeight: 700,
                color: isCorrect ? '#059669' : '#dc2626',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                {isCorrect ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                )}
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div style={{ fontSize: 14, color: '#374151' }}>
                <strong>Your answer:</strong> {question.type === 'reading' ? romajiToHiragana(input) : input}
              </div>
              {!isCorrect && (
                <div style={{ fontSize: 14, color: '#374151', marginTop: 4 }}>
                  <strong>Correct answer:</strong> {question.answer}
                  {question.allAnswers?.length > 1 && (
                    <span style={{ color: '#6b7280' }}>
                      {' '}(also: {question.allAnswers.slice(1, 3).join(', ')})
                    </span>
                  )}
                </div>
              )}
              {question.type === 'vocab' && question.reading && (
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                  Reading: {question.reading}
                </div>
              )}
            </div>

            <button
              onClick={nextQuestion}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                border: 'none',
                borderRadius: 10,
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
