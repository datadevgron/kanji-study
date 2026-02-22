import React, { useState, useEffect } from 'react'
import { loadStudySettings, getStudyProgress, getDueForReview } from '../lib/studyService'

const JLPT_ORDER = ['N5', 'N4', 'N3', 'N2', 'N1']

// Total kanji count for each JLPT level (cumulative, from database)
const JLPT_KANJI_TOTALS = {
  'N5': 79,      // 79 kanji for N5
  'N4': 245,     // 79 + 166 = 245 for N5+N4
  'N3': 612,     // 245 + 367 = 612 for N5+N4+N3
  'N2': 1000,    // estimate for N5+N4+N3+N2
  'N1': 2136,    // estimate for all levels (joyo kanji)
}

function groupByJlpt(kanjiList, kanjiData){
  const groups = {}
  kanjiList.forEach(k=>{
    const info = kanjiData[k]
    const level = (info && info.jlpt) ? info.jlpt : 'unknown'
    if(!groups[level]) groups[level] = []
    groups[level].push(k)
  })

  // Build a set of all known kanji characters at each level and below
  const allKnownChars = new Set(kanjiList)

  // Sort kanji within each level:
  // 1. By stroke count (simpler first)
  // 2. Kanji whose characters appear as components in other kanji at the same level come first
  //    (i.e., kanji that depend on unlearned same-level kanji go later)
  for (const level of Object.keys(groups)) {
    const levelSet = new Set(groups[level])

    groups[level].sort((a, b) => {
      const infoA = kanjiData[a]
      const infoB = kanjiData[b]

      // Primary: stroke count (fewer strokes = simpler = first)
      const strokeA = (infoA && infoA.stroke_count) || 99
      const strokeB = (infoB && infoB.stroke_count) || 99
      if (strokeA !== strokeB) return strokeA - strokeB

      return 0
    })
  }

  return groups
}

export default function Home({
  kanjiList, 
  kanjiData, 
  onSelect, 
  knownKanji, 
  setKnownKanji, 
  userLevel,
  userId,
  onOpenSettings,
  onOpenStudyPlan,
  onOpenReview,
  onOpenStudySession,
  studyProgress,
  studyQueue
}){
  const [searchQuery, setSearchQuery] = useState('')
  const [selectMode, setSelectMode] = useState(false)
  const [selectedKanji, setSelectedKanji] = useState(new Set())
  
  // Build a map of kanji to their study queue item for quick lookup
  const studyQueueMap = new Map()
  if (studyQueue) {
    studyQueue.forEach(item => {
      studyQueueMap.set(item.kanji_character, item)
    })
  }
  
  // Get SRS stage info for display
  const getStageInfo = (stage) => {
    const stages = [
      { label: 'New', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
      { label: 'S1', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
      { label: 'S2', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
      { label: 'S3', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
      { label: 'S4', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
      { label: 'S5', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
      { label: 'S6', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
      { label: 'S7', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
    ]
    return stages[Math.min(stage, stages.length - 1)]
  }
  const grouped = groupByJlpt(kanjiList, kanjiData)
  
  // Sort levels: user's selected level first, then descending (N3 -> N4 -> N5)
  const sortedLevels = Object.keys(grouped).sort((a, b) => {
    const aIdx = JLPT_ORDER.indexOf(a)
    const bIdx = JLPT_ORDER.indexOf(b)
    if (aIdx === -1 && bIdx === -1) return 0
    if (aIdx === -1) return 1
    if (bIdx === -1) return -1
    // Put user's level first, then reverse order (higher level numbers first)
    if (a === userLevel) return -1
    if (b === userLevel) return 1
    return bIdx - aIdx  // Reverse: N3 before N4 before N5
  })

  // Total kanji needed for user's level
  const totalKanjiForLevel = JLPT_KANJI_TOTALS[userLevel] || JLPT_KANJI_TOTALS['N5']
  const knownCount = knownKanji.size
  const progressPercent = totalKanjiForLevel > 0 ? Math.min(100, Math.round((knownCount / totalKanjiForLevel) * 100)) : 0

  const toggleKnown = (k, e) => {
    e.stopPropagation()
    setKnownKanji(prev => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  }

  const toggleLevelKnown = (level) => {
    const levelKanji = grouped[level] || []
    const allKnown = levelKanji.every(k => knownKanji.has(k))
    
    setKnownKanji(prev => {
      const next = new Set(prev)
      if (allKnown) {
        // Remove all from this level
        levelKanji.forEach(k => next.delete(k))
      } else {
        // Add all from this level
        levelKanji.forEach(k => next.add(k))
      }
      return next
    })
  }

  const isLevelAllKnown = (level) => {
    const levelKanji = grouped[level] || []
    return levelKanji.length > 0 && levelKanji.every(k => knownKanji.has(k))
  }

  // Select mode functions
  const enterSelectMode = () => {
    setSelectMode(true)
    setSelectedKanji(new Set(knownKanji)) // Start with currently known kanji selected
  }

  const exitSelectMode = () => {
    setSelectMode(false)
    setSelectedKanji(new Set())
  }

  const toggleSelectKanji = (k) => {
    setSelectedKanji(prev => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  }

  const confirmSelection = () => {
    setKnownKanji(selectedKanji)
    setSelectMode(false)
    setSelectedKanji(new Set())
  }

  return (
    <div>
      {/* Select Mode Header */}
      {selectMode && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
          padding: '12px 16px',
          marginBottom: 16,
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(13,148,136,0.3)'
        }}>
          <button
            onClick={exitSelectMode}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 14
            }}
          >
            Cancel
          </button>
          <div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>
            {selectedKanji.size} selected
          </div>
          <button
            onClick={confirmSelection}
            style={{
              background: 'white',
              border: 'none',
              color: '#0d9488',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Done ✓
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div style={{
        marginBottom: 16,
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--card)',
          borderRadius: 12,
          padding: '0 16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by kanji or meaning..."
            style={{
              flex: 1,
              padding: '14px 12px',
              border: 'none',
              outline: 'none',
              fontSize: 14,
              background: 'transparent',
              color: '#1f2937'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'rgba(0,0,0,0.06)',
                border: 'none',
                borderRadius: '50%',
                width: 22,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: 12,
                flexShrink: 0
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() ? (() => {
        const q = searchQuery.trim().toLowerCase()
        const filtered = kanjiList.filter(k => {
          // Match kanji character itself
          if (k === q || k.includes(q)) return true
          // Match meanings
          const info = kanjiData[k]
          if (info && info.meanings) {
            return info.meanings.some(m => m.toLowerCase().includes(q))
          }
          return false
        })
        return (
          <div>
            <div style={{fontSize: 13, color: 'var(--muted)', marginBottom: 12}}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery.trim()}"
            </div>
            {filtered.length > 0 ? (
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                {filtered.map(k => {
                  const isKnown = knownKanji.has(k)
                  const info = kanjiData[k]
                  return (
                    <div
                      key={k}
                      onClick={() => onSelect(k)}
                      style={{
                        width: 70,
                        height: 70,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isKnown ? 'rgba(16,185,129,0.06)' : 'white',
                        border: isKnown ? '2px solid #10b981' : '1px solid rgba(0,0,0,0.08)',
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{
                        fontSize: 32,
                        fontWeight: 500,
                        color: isKnown ? '#059669' : '#1f2937'
                      }}>
                        {k}
                      </div>
                      <div style={{
                        fontSize: 9,
                        color: 'var(--muted)',
                        marginTop: 2,
                        textAlign: 'center',
                        padding: '0 4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%'
                      }}>
                        {(info && info.meanings && info.meanings.length) ? info.meanings[0] : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: 32, color: '#9ca3af'}}>
                No kanji found
              </div>
            )}
          </div>
        )
      })() : (
      <>
      {/* Study Dashboard */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(13,148,136,0.08), rgba(20,184,166,0.05))',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        border: '1px solid rgba(13,148,136,0.15)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d9488', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Study Dashboard
          </h3>
          <button
            onClick={onOpenSettings}
            style={{
              padding: '6px 12px',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 8,
              fontSize: 12,
              color: '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Settings
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 10,
          marginBottom: 16
        }}>
          <div style={{
            background: 'white',
            padding: '12px 14px',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Weekly Goal
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0d9488' }}>
              {studyProgress?.learnedThisWeek || 0}/{studyProgress?.weeklyGoal || 10}
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>learned</div>
          </div>

          <div style={{
            background: 'white',
            padding: '12px 14px',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              New to Learn
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#3b82f6' }}>
              {studyProgress?.newKanjiDue || 0}
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>this week</div>
          </div>

          <div style={{
            background: (studyProgress?.overdueCount || 0) > 0 ? 'rgba(245,158,11,0.1)' : 'white',
            padding: '12px 14px',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: (studyProgress?.overdueCount || 0) > 0 ? '1px solid rgba(245,158,11,0.3)' : 'none'
          }}>
            <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Due Review
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>
              {studyProgress?.overdueCount || 0}
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>overdue</div>
          </div>

          <div style={{
            background: 'white',
            padding: '12px 14px',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              In Queue
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#8b5cf6' }}>
              {studyProgress?.totalInQueue || 0}
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>total</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={onOpenStudyPlan}
            style={{
              flex: '1 1 140px',
              padding: '12px 16px',
              background: 'white',
              border: '1px solid rgba(13,148,136,0.3)',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: '#0d9488',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Study Plan
          </button>
          
          <button
            onClick={onOpenStudySession}
            disabled={!studyProgress?.dueForReview && !studyProgress?.totalInQueue}
            style={{
              flex: '1 1 140px',
              padding: '12px 16px',
              background: (studyProgress?.dueForReview > 0 || studyProgress?.totalInQueue > 0)
                ? 'linear-gradient(135deg, #0d9488, #0f766e)' 
                : 'rgba(0,0,0,0.04)',
              border: 'none',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: (studyProgress?.dueForReview > 0 || studyProgress?.totalInQueue > 0) ? 'white' : '#9ca3af',
              cursor: (studyProgress?.dueForReview > 0 || studyProgress?.totalInQueue > 0) ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Study
          </button>
          
          <button
            onClick={onOpenReview}
            disabled={!studyProgress?.overdueCount}
            style={{
              flex: '1 1 140px',
              padding: '12px 16px',
              background: studyProgress?.overdueCount > 0 
                ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                : 'rgba(0,0,0,0.04)',
              border: 'none',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: studyProgress?.overdueCount > 0 ? 'white' : '#9ca3af',
              cursor: studyProgress?.overdueCount > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Review Now {studyProgress?.overdueCount > 0 && `(${studyProgress.overdueCount})`}
          </button>

          <button
            onClick={enterSelectMode}
            style={{
              flex: '1 1 140px',
              padding: '12px 16px',
              background: 'white',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: '#10b981',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            Mark Known
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'var(--card)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
          <span style={{fontSize: 14, fontWeight: 600}}>Kanji Progress (up to {userLevel})</span>
          <span style={{fontSize: 14, color: 'var(--muted)'}}>{knownCount} / {totalKanjiForLevel} learned</span>
        </div>
        <div style={{
          background: 'rgba(0,0,0,0.06)',
          borderRadius: 8,
          height: 12,
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, #10b981, #059669)',
            height: '100%',
            width: `${progressPercent}%`,
            borderRadius: 8,
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{fontSize: 12, color: 'var(--muted)', marginTop: 6, textAlign: 'right'}}>
          {progressPercent}% complete
        </div>
      </div>

      {/* Kanji Grid by Level */}
      <div className="levels">
        {sortedLevels.map(level => {
          const levelAllKnown = isLevelAllKnown(level)
          const levelKnownCount = grouped[level].filter(k => knownKanji.has(k)).length
          const isCurrentLevel = level === userLevel
          
          return (
            <div key={level} style={{marginBottom: 24}}>
              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 12,
                padding: '8px 12px',
                background: isCurrentLevel ? 'rgba(13,148,136,0.08)' : 'rgba(0,0,0,0.02)',
                borderRadius: 10,
                border: isCurrentLevel ? '1px solid rgba(13,148,136,0.2)' : '1px solid transparent'
              }}>
                <div style={{
                  fontSize: 14, 
                  fontWeight: 600,
                  color: isCurrentLevel ? '#0d9488' : '#374151'
                }}>
                  JLPT {level === 'unknown' ? '—' : level}
                  <span style={{fontSize: 11, marginLeft: 8, color: 'var(--muted)', fontWeight: 400}}>
                    {selectMode 
                      ? `(${grouped[level].filter(k => selectedKanji.has(k)).length}/${grouped[level].length} selected)`
                      : `(${levelKnownCount}/${grouped[level].length})`
                    }
                  </span>
                </div>
                {selectMode ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button 
                      onClick={() => {
                        setSelectedKanji(prev => {
                          const next = new Set(prev)
                          grouped[level].forEach(k => next.add(k))
                          return next
                        })
                      }}
                      style={{
                        fontSize: 11,
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid rgba(16,185,129,0.3)',
                        background: 'rgba(16,185,129,0.1)',
                        color: '#059669',
                        cursor: 'pointer'
                      }}
                    >
                      Select All
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedKanji(prev => {
                          const next = new Set(prev)
                          grouped[level].forEach(k => next.delete(k))
                          return next
                        })
                      }}
                      style={{
                        fontSize: 11,
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: 'transparent',
                        color: 'var(--muted)',
                        cursor: 'pointer'
                      }}
                    >
                      Deselect
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleLevelKnown(level)}
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: levelAllKnown ? '1px solid #10b981' : '1px solid rgba(0,0,0,0.1)',
                      background: levelAllKnown ? 'rgba(16,185,129,0.1)' : 'transparent',
                      color: levelAllKnown ? '#059669' : 'var(--muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {levelAllKnown ? '✓ All Known' : 'Mark All Known'}
                  </button>
                )}
              </div>
              
              {/* Horizontal row of square kanji boxes - using flex wrap */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10
              }}>
                {grouped[level].map(k => {
                  const isKnown = knownKanji.has(k)
                  const isSelected = selectMode && selectedKanji.has(k)
                  const queueItem = studyQueueMap.get(k)
                  const isInQueue = !!queueItem
                  const stageInfo = queueItem ? getStageInfo(queueItem.srs_stage) : null
                  
                  return (
                    <div 
                      key={k} 
                      onClick={() => selectMode ? toggleSelectKanji(k) : onSelect(k)}
                      style={{
                        width: 70,
                        height: 70,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: selectMode
                          ? (isSelected ? 'rgba(16,185,129,0.15)' : 'white')
                          : (isKnown 
                            ? 'rgba(16,185,129,0.06)' 
                            : isInQueue 
                              ? 'rgba(139,92,246,0.04)' 
                              : 'white'),
                        border: selectMode
                          ? (isSelected ? '2px solid #10b981' : '2px dashed rgba(0,0,0,0.15)')
                          : (isKnown 
                            ? '2px solid #10b981' 
                            : isInQueue 
                              ? '2px solid rgba(139,92,246,0.4)' 
                              : '1px solid rgba(0,0,0,0.08)'),
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        flexShrink: 0,
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      {/* Selection Checkmark in Select Mode */}
                      {selectMode && (
                        <div style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: isSelected ? '#10b981' : 'rgba(0,0,0,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 11,
                          fontWeight: 700
                        }}>
                          {isSelected && '✓'}
                        </div>
                      )}
                      
                      {/* SRS Stage Badge */}
                      {!selectMode && isInQueue && !isKnown && (
                        <div style={{
                          position: 'absolute',
                          top: 3,
                          right: 3,
                          fontSize: 7,
                          fontWeight: 600,
                          padding: '2px 4px',
                          borderRadius: 4,
                          background: stageInfo.bg,
                          color: stageInfo.color
                        }}>
                          {stageInfo.label}
                        </div>
                      )}
                      
                      <div style={{
                        fontSize: 32, 
                        fontWeight: 500,
                        color: selectMode 
                          ? (isSelected ? '#059669' : '#1f2937')
                          : (isKnown ? '#059669' : isInQueue ? '#6d28d9' : '#1f2937')
                      }}>
                        {k}
                      </div>
                      <div style={{
                        fontSize: 9,
                        color: 'var(--muted)',
                        marginTop: 2,
                        textAlign: 'center',
                        padding: '0 4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%'
                      }}>
                        {(kanjiData[k] && kanjiData[k].meanings && kanjiData[k].meanings.length) 
                          ? kanjiData[k].meanings[0] 
                          : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      </>
      )}
    </div>
  )
}
