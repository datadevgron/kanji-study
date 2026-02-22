import React, { useState, useEffect } from 'react'
import { 
  loadStudyQueue,
  addToStudyQueue,
  removeFromStudyQueue,
  reorderStudyQueue,
  generateStudyPlan,
  getWeekNumber
} from '../lib/studyService'

// SVG Icons
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const LayersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
)

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
)

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
)

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

export default function StudyPlan({ 
  userId, 
  kanjiList, 
  kanjiData, 
  knownKanji,
  weeklyGoal,
  onClose 
}) {
  const [studyQueue, setStudyQueue] = useState([])
  const [selectedKanji, setSelectedKanji] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState(null)
  const [view, setView] = useState('select')
  const [draggedKanji, setDraggedKanji] = useState(null)
  const [dragOverWeek, setDragOverWeek] = useState(null)
  const [planSearch, setPlanSearch] = useState('')

  const queuedKanjiSet = new Set(studyQueue.map(q => q.kanji_character))

  useEffect(() => {
    async function load() {
      const queue = await loadStudyQueue(userId)
      setStudyQueue(queue)
      setLoading(false)
    }
    load()
  }, [userId])

  const availableKanji = kanjiList.filter(k => 
    !knownKanji.has(k) && !queuedKanjiSet.has(k)
  )

  const toggleSelect = (k) => {
    setSelectedKanji(prev => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  }

  const selectAll = () => setSelectedKanji(new Set(availableKanji))
  const clearSelection = () => setSelectedKanji(new Set())

  const addSelectedToQueue = async () => {
    if (selectedKanji.size === 0) return
    setSaving(true)
    setSaveMessage(null)
    
    // Sort selected kanji by their original order in kanjiList (stroke order)
    const sortedSelected = kanjiList.filter(k => selectedKanji.has(k))
    
    const result = await addToStudyQueue(userId, sortedSelected, getWeekNumber())
    
    if (result.success) {
      const queue = await loadStudyQueue(userId)
      setStudyQueue(queue)
      setSelectedKanji(new Set())
      setSaveMessage({ type: 'success', text: `Added ${result.count} kanji to queue!` })
    } else {
      setSaveMessage({ type: 'error', text: `Error: ${result.error}. Have you created the database tables?` })
    }
    
    setSaving(false)
    
    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const removeFromQueue = async (kanjiChar) => {
    await removeFromStudyQueue(userId, [kanjiChar])
    setStudyQueue(prev => prev.filter(q => q.kanji_character !== kanjiChar))
  }

  const clearAllFromQueue = async () => {
    if (!window.confirm('Are you sure you want to clear your entire study plan? This cannot be undone.')) {
      return
    }
    setSaving(true)
    const allKanji = studyQueue.map(q => q.kanji_character)
    await removeFromStudyQueue(userId, allKanji)
    setStudyQueue([])
    setSaveMessage({ type: 'success', text: 'Study plan cleared!' })
    setSaving(false)
    setTimeout(() => setSaveMessage(null), 3000)
  }

  // Get queue kanji in order (already sorted by order_index from database)
  // For new kanji being added, maintain stroke order from kanjiList
  const queueKanjiOrdered = studyQueue.map(q => q.kanji_character)
  const plan = generateStudyPlan(queueKanjiOrdered, weeklyGoal)

  // Filter plan based on search
  const filteredPlan = planSearch.trim() 
    ? plan.map(week => ({
        ...week,
        kanji: week.kanji.filter(k => {
          const info = kanjiData[k]
          const searchLower = planSearch.toLowerCase()
          // Match kanji character itself
          if (k.includes(planSearch) || planSearch.includes(k)) return true
          // Match any meaning
          if (!info) return false
          const meanings = info.meanings
          if (!meanings) return false
          // Handle array of meanings
          if (Array.isArray(meanings)) {
            return meanings.some(m => 
              m && String(m).toLowerCase().includes(searchLower)
            )
          }
          // Handle string meaning
          if (typeof meanings === 'string') {
            return meanings.toLowerCase().includes(searchLower)
          }
          // Try JSON stringify as fallback
          return JSON.stringify(meanings).toLowerCase().includes(searchLower)
        })
      })).filter(week => week.kanji.length > 0)
    : plan

  // Drag and drop handlers
  const handleDragStart = (e, kanji, fromWeek) => {
    setDraggedKanji({ kanji, fromWeek })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, weekNum) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverWeek(weekNum)
  }

  const handleDragLeave = () => {
    setDragOverWeek(null)
  }

  const handleDrop = async (e, toWeek) => {
    e.preventDefault()
    setDragOverWeek(null)
    
    if (!draggedKanji || draggedKanji.fromWeek === toWeek) {
      setDraggedKanji(null)
      return
    }

    setSaving(true)
    
    // Get all kanji in current order
    const allKanji = [...queueKanjiOrdered]
    const kanjiIndex = allKanji.indexOf(draggedKanji.kanji)
    
    if (kanjiIndex === -1) {
      setDraggedKanji(null)
      setSaving(false)
      return
    }
    
    // Remove from current position
    allKanji.splice(kanjiIndex, 1)
    
    // Calculate new position (at the start of target week)
    const targetPosition = Math.min((toWeek - 1) * weeklyGoal, allKanji.length)
    
    // Insert at new position
    allKanji.splice(targetPosition, 0, draggedKanji.kanji)
    
    // Persist the new order to database
    const success = await reorderStudyQueue(userId, allKanji)
    
    if (success) {
      // Reload the queue to get the new order
      const queue = await loadStudyQueue(userId)
      setStudyQueue(queue)
      setSaveMessage({ type: 'success', text: `Moved ${draggedKanji.kanji} to Week ${toWeek}` })
    } else {
      setSaveMessage({ type: 'error', text: 'Failed to save new order' })
    }
    
    setTimeout(() => setSaveMessage(null), 2000)
    setDraggedKanji(null)
    setSaving(false)
  }

  const getStageInfo = (stage) => {
    const stages = [
      { label: 'New', color: '#64748b', bg: '#f1f5f9' },
      { label: 'S1', color: '#d97706', bg: '#fef3c7' },
      { label: 'S2', color: '#ea580c', bg: '#ffedd5' },
      { label: 'S3', color: '#dc2626', bg: '#fee2e2' },
      { label: 'S4', color: '#7c3aed', bg: '#ede9fe' },
      { label: 'S5', color: '#2563eb', bg: '#dbeafe' },
      { label: 'S6', color: '#059669', bg: '#d1fae5' },
      { label: 'S7', color: '#047857', bg: '#a7f3d0' },
    ]
    return stages[Math.min(stage, stages.length - 1)]
  }

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ color: '#64748b' }}>Loading study plan...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 20,
        maxWidth: 820,
        width: '95%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to right, #f8fafc, #ffffff)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <BookIcon />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Study Plan
              </h2>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
                Organise your kanji learning journey
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: 10,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
          >
            <XIcon />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          padding: '12px 24px',
          background: '#f8fafc',
          display: 'flex',
          gap: 8
        }}>
          <button
            onClick={() => setView('select')}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              background: view === 'select' ? '#e2e8f0' : 'white',
              color: view === 'select' ? '#374151' : '#64748b',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            <CheckCircleIcon />
            Select Kanji
            <span style={{
              background: view === 'select' ? '#cbd5e1' : '#f1f5f9',
              padding: '2px 8px',
              borderRadius: 6,
              fontSize: 11
            }}>
              {availableKanji.length}
            </span>
          </button>
          <button
            onClick={() => setView('plan')}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              background: view === 'plan' ? '#e2e8f0' : 'white',
              color: view === 'plan' ? '#374151' : '#64748b',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            <CalendarIcon />
            View Plan
            <span style={{
              background: view === 'plan' ? '#cbd5e1' : '#f1f5f9',
              padding: '2px 8px',
              borderRadius: 6,
              fontSize: 11
            }}>
              {studyQueue.length}
            </span>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {/* Save Message */}
          {saveMessage && (
            <div style={{
              padding: '12px 16px',
              marginBottom: 16,
              borderRadius: 10,
              background: saveMessage.type === 'success' ? '#d1fae5' : '#fee2e2',
              color: saveMessage.type === 'success' ? '#065f46' : '#991b1b',
              fontSize: 13,
              fontWeight: 500
            }}>
              {saveMessage.text}
            </div>
          )}
          
          {view === 'select' && (
            <>
              {/* Selection toolbar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16
              }}>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                  {selectedKanji.size > 0 
                    ? <><strong style={{ color: '#0d9488' }}>{selectedKanji.size}</strong> kanji selected</>
                    : 'Select kanji to add to your study queue'
                  }
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={selectAll}
                    style={{
                      fontSize: 12,
                      padding: '6px 14px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      color: '#475569',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    style={{
                      fontSize: 12,
                      padding: '6px 14px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      color: '#475569',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {availableKanji.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#94a3b8'
                }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#94a3b8'
                  }}>
                    <CheckCircleIcon />
                  </div>
                  <p style={{ fontWeight: 500 }}>All kanji are either known or in your queue!</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
                  gap: 8,
                  maxHeight: 320,
                  overflow: 'auto',
                  padding: 4
                }}>
                  {availableKanji.map(k => {
                    const isSelected = selectedKanji.has(k)
                    const info = kanjiData[k]
                    return (
                      <div
                        key={k}
                        onClick={() => toggleSelect(k)}
                        style={{
                          aspectRatio: '1',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isSelected ? '#0d9488' : '#ffffff',
                          border: isSelected ? '2px solid #0d9488' : '1px solid #e2e8f0',
                          borderRadius: 12,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                        }}
                      >
                        <div style={{ 
                          fontSize: 22, 
                          fontWeight: 500,
                          color: isSelected ? '#ffffff' : '#1e293b'
                        }}>
                          {k}
                        </div>
                        <div style={{ 
                          fontSize: 8, 
                          color: isSelected ? 'rgba(255,255,255,0.7)' : '#94a3b8',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '90%',
                          textAlign: 'center'
                        }}>
                          {info?.meanings?.[0] || ''}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {selectedKanji.size > 0 && (
                <div style={{
                  marginTop: 20,
                  padding: 16,
                  background: '#f0fdfa',
                  borderRadius: 14,
                  border: '1px solid #99f6e4'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 12
                  }}>
                    <div style={{ fontSize: 13, color: '#0f766e' }}>
                      <strong>{selectedKanji.size}</strong> kanji = <strong>{Math.ceil(selectedKanji.size / weeklyGoal)}</strong> week{Math.ceil(selectedKanji.size / weeklyGoal) !== 1 ? 's' : ''} at {weeklyGoal}/week
                    </div>
                    <button
                      onClick={addSelectedToQueue}
                      disabled={saving}
                      style={{
                        padding: '10px 20px',
                        background: '#0d9488',
                        border: 'none',
                        borderRadius: 10,
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: saving ? 'wait' : 'pointer',
                        opacity: saving ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      {saving ? 'Adding...' : 'Add to Queue'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {view === 'plan' && (
            <>
              {studyQueue.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#94a3b8'
                }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#94a3b8'
                  }}>
                    <LayersIcon />
                  </div>
                  <p style={{ fontWeight: 500, marginBottom: 8 }}>Your study queue is empty</p>
                  <p style={{ fontSize: 13 }}>Select some kanji to get started</p>
                </div>
              ) : (
                <>
                  {/* Header with Clear All button */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16
                  }}>
                    <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                      <strong style={{ color: '#0f172a' }}>{studyQueue.length}</strong> kanji in your study plan
                    </p>
                    <button
                      onClick={clearAllFromQueue}
                      disabled={saving}
                      style={{
                        fontSize: 12,
                        padding: '6px 14px',
                        background: 'white',
                        border: '1px solid #fecaca',
                        borderRadius: 8,
                        color: '#dc2626',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        opacity: saving ? 0.5 : 1
                      }}
                    >
                      <TrashIcon />
                      Clear All
                    </button>
                  </div>

                  {/* Search bar */}
                  <div style={{
                    position: 'relative',
                    marginBottom: 16
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      value={planSearch}
                      onChange={(e) => setPlanSearch(e.target.value)}
                      placeholder="Search by kanji or meaning..."
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 40px',
                        border: '1px solid #e2e8f0',
                        borderRadius: 10,
                        fontSize: 13,
                        outline: 'none',
                        background: 'white',
                        boxSizing: 'border-box'
                      }}
                    />
                    {planSearch && (
                      <button
                        onClick={() => setPlanSearch('')}
                        style={{
                          position: 'absolute',
                          right: 12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          fontSize: 16,
                          padding: 0,
                          lineHeight: 1
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 12,
                    marginBottom: 24
                  }}>
                    <div style={{
                      background: '#f8fafc',
                      padding: 16,
                      borderRadius: 14,
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        marginBottom: 8,
                        color: '#64748b'
                      }}>
                        <LayersIcon />
                        <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          In Queue
                        </span>
                      </div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>
                        {studyQueue.length}
                      </div>
                    </div>
                    <div style={{
                      background: '#f8fafc',
                      padding: 16,
                      borderRadius: 14,
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        marginBottom: 8,
                        color: '#64748b'
                      }}>
                        <CalendarIcon />
                        <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Weeks
                        </span>
                      </div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>
                        {plan.length}
                      </div>
                    </div>
                    <div style={{
                      background: '#f8fafc',
                      padding: 16,
                      borderRadius: 14,
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        marginBottom: 8,
                        color: '#64748b'
                      }}>
                        <TargetIcon />
                        <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Per Week
                        </span>
                      </div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>
                        {weeklyGoal}
                      </div>
                    </div>
                  </div>

                  {/* Weekly breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {filteredPlan.length === 0 && planSearch.trim() ? (
                      <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#94a3b8'
                      }}>
                        <p style={{ fontSize: 13 }}>No kanji found matching "{planSearch}"</p>
                      </div>
                    ) : (
                      filteredPlan.map(week => (
                      <div 
                        key={week.week}
                        onDragOver={(e) => handleDragOver(e, week.week)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, week.week)}
                        style={{
                          background: '#ffffff',
                          borderRadius: 14,
                          border: dragOverWeek === week.week 
                            ? '2px dashed #0d9488' 
                            : '1px solid #e2e8f0',
                          overflow: 'hidden',
                          transition: 'border 0.2s ease'
                        }}
                      >
                        <div style={{
                          padding: '12px 16px',
                          background: dragOverWeek === week.week ? '#f0fdfa' : '#f8fafc',
                          borderBottom: '1px solid #e2e8f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'background 0.2s ease'
                        }}>
                          <span style={{ 
                            fontSize: 13, 
                            fontWeight: 600, 
                            color: '#0f172a'
                          }}>
                            Week {week.week}
                          </span>
                          <span style={{ 
                            fontSize: 11, 
                            color: '#64748b',
                            background: '#e2e8f0',
                            padding: '3px 10px',
                            borderRadius: 6
                          }}>
                            {week.kanji.length} kanji
                          </span>
                        </div>
                        <div style={{ 
                          padding: 12,
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 8,
                          minHeight: 60
                        }}>
                          {week.kanji.map(k => {
                            const queueItem = studyQueue.find(q => q.kanji_character === k)
                            const info = kanjiData[k]
                            const stageInfo = queueItem ? getStageInfo(queueItem.srs_stage) : getStageInfo(0)
                            const isDragging = draggedKanji?.kanji === k
                            return (
                              <div
                                key={k}
                                draggable
                                onDragStart={(e) => handleDragStart(e, k, week.week)}
                                onDragEnd={() => setDraggedKanji(null)}
                                style={{
                                  width: 72,
                                  padding: '10px 6px 8px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  background: isDragging ? '#f0fdfa' : '#ffffff',
                                  border: isDragging ? '2px solid #0d9488' : '1px solid #e2e8f0',
                                  borderRadius: 10,
                                  position: 'relative',
                                  cursor: 'grab',
                                  opacity: isDragging ? 0.5 : 1,
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {/* Stage badge */}
                                <div style={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  fontSize: 8,
                                  fontWeight: 600,
                                  padding: '2px 5px',
                                  borderRadius: 4,
                                  background: stageInfo.bg,
                                  color: stageInfo.color
                                }}>
                                  {stageInfo.label}
                                </div>
                                
                                <div style={{ fontSize: 24, color: '#1e293b', marginBottom: 2 }}>{k}</div>
                                <div style={{ 
                                  fontSize: 9, 
                                  color: '#94a3b8',
                                  textAlign: 'center',
                                  marginBottom: 6,
                                  height: 12,
                                  overflow: 'hidden'
                                }}>
                                  {info?.meanings?.[0] || ''}
                                </div>
                                
                                <button
                                  onClick={() => removeFromQueue(k)}
                                  style={{
                                    padding: '4px 8px',
                                    background: 'transparent',
                                    border: '1px solid #fecaca',
                                    borderRadius: 6,
                                    color: '#dc2626',
                                    cursor: 'pointer',
                                    fontSize: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4
                                  }}
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
