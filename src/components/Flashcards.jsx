import React, { useState, useEffect } from 'react'
import { generateSimpleMnemonic } from '../data/mnemonics'
import { updateKanjiMeanings, updateKanjiOnyomi, updateKanjiKunyomi, updateVocabMeaning, fetchMnemonic, saveMnemonic } from '../lib/kanjiService'
import { loadUserMnemonic, saveUserMnemonic, deleteUserMnemonicDB } from '../lib/userDataService'

export default function Flashcards({kanji, data, words, userId, onStartQuiz, onStartWrite, onDataUpdate, onVocabUpdate}){
  // Build cards: first card is kanji overview, then each vocab word as its own card
  const cards = []
  cards.push({ type: 'kanji', kanji, data })
  words.forEach(w=>cards.push({type:'word', ...w}))

  const [index, setIndex] = useState(0)
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editField, setEditField] = useState('') // 'meaning', 'onyomi', 'kunyomi', 'vocab'
  const [editValue, setEditValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  
  // Mnemonic state
  const [baseMnemonic, setBaseMnemonic] = useState(null)
  const [userMnemonic, setUserMnemonic] = useState(null)
  const [loadingMnemonic, setLoadingMnemonic] = useState(false)
  const [editingMnemonic, setEditingMnemonic] = useState(false)
  const [mnemonicForm, setMnemonicForm] = useState({
    story: '',
    reading: '',
    hint: '',
    components: ''
  })

  const cur = cards[index]
  
  // Fetch mnemonic from database when kanji changes
  useEffect(() => {
    async function loadMnemonic() {
      if (cur.type !== 'kanji') return
      setLoadingMnemonic(true)
      const dbMnemonic = await fetchMnemonic(kanji)
      if (dbMnemonic) {
        setBaseMnemonic(dbMnemonic)
      } else {
        // Fall back to generated simple mnemonic
        setBaseMnemonic(generateSimpleMnemonic(kanji, data?.meanings))
      }
      // Load user mnemonic from database
      if (userId) {
        const userMnemonicData = await loadUserMnemonic(userId, kanji)
        setUserMnemonic(userMnemonicData)
      } else {
        setUserMnemonic(null)
      }
      setLoadingMnemonic(false)
    }
    loadMnemonic()
  }, [kanji, cur.type, userId])

  function goNext(){
    const next = Math.min(cards.length-1, index+1)
    if(next === index && onStartQuiz){
      onStartQuiz()
      return
    }
    setIndex(next)
    setShowMnemonic(false)
  }

  function goPrev(){
    setIndex(Math.max(0, index-1))
    setShowMnemonic(false)
    setIsEditing(false)
    setEditField('')
  }

  // Start editing a field
  function startEdit(field, currentValue) {
    setEditField(field)
    setEditValue(currentValue)
    setIsEditing(true)
  }

  // Save edit based on field type
  async function saveEdit() {
    setIsSaving(true)
    let success = false
    
    if (editField === 'meaning') {
      const newMeanings = editValue.split(',').map(m => m.trim()).filter(m => m)
      success = await updateKanjiMeanings(kanji, newMeanings)
      if (success && onDataUpdate) {
        onDataUpdate(kanji, { ...data, meanings: newMeanings })
      }
    } else if (editField === 'onyomi') {
      const newOnyomi = editValue.split(',').map(m => m.trim()).filter(m => m)
      success = await updateKanjiOnyomi(kanji, newOnyomi)
      if (success && onDataUpdate) {
        onDataUpdate(kanji, { ...data, onyomi: newOnyomi })
      }
    } else if (editField === 'kunyomi') {
      const newKunyomi = editValue.split(',').map(m => m.trim()).filter(m => m)
      success = await updateKanjiKunyomi(kanji, newKunyomi)
      if (success && onDataUpdate) {
        onDataUpdate(kanji, { ...data, kunyomi: newKunyomi })
      }
    } else if (editField === 'vocab') {
      success = await updateVocabMeaning(cur.word, cur.reading, editValue)
      if (success && onVocabUpdate) {
        onVocabUpdate(cur.word, cur.reading, editValue)
      }
    }
    
    setIsSaving(false)
    setIsEditing(false)
    setEditField('')
  }

  // Cancel editing
  function cancelEdit() {
    setIsEditing(false)
    setEditField('')
    setEditValue('')
  }

  // Start editing BASE mnemonic (saves to database)
  function startBaseMnemonicEdit() {
    setMnemonicForm({
      story: baseMnemonic?.story || '',
      reading: baseMnemonic?.reading || '',
      hint: baseMnemonic?.hint || '',
      components: baseMnemonic?.components || ''
    })
    setEditingMnemonic('base')
  }

  // Start editing USER mnemonic (saves to localStorage)
  function startUserMnemonicEdit() {
    setMnemonicForm({
      story: userMnemonic?.story || '',
      reading: userMnemonic?.reading || '',
      hint: userMnemonic?.hint || '',
      components: userMnemonic?.components || ''
    })
    setEditingMnemonic('user')
  }

  // Save BASE mnemonic to database
  async function saveBaseMnemonicEdit() {
    setIsSaving(true)
    const newMnemonic = {
      radicals: baseMnemonic?.radicals || [],
      components: mnemonicForm.components,
      story: mnemonicForm.story,
      hint: mnemonicForm.hint,
      reading: mnemonicForm.reading
    }
    const success = await saveMnemonic(kanji, newMnemonic)
    if (success) {
      setBaseMnemonic(newMnemonic)
    }
    setIsSaving(false)
    setEditingMnemonic(false)
  }

  // Save USER mnemonic to localStorage
  // Save USER mnemonic to database
  async function saveUserMnemonicEdit() {
    setIsSaving(true)
    const newMnemonic = {
      components: mnemonicForm.components,
      story: mnemonicForm.story,
      hint: mnemonicForm.hint,
      reading: mnemonicForm.reading
    }
    if (userId) {
      const success = await saveUserMnemonic(userId, kanji, newMnemonic)
      if (success) {
        setUserMnemonic(newMnemonic)
      }
    }
    setIsSaving(false)
    setEditingMnemonic(false)
  }

  // Delete user mnemonic from database
  async function deleteUserMnemonicHandler() {
    if (window.confirm('Delete your custom mnemonic?')) {
      if (userId) {
        const success = await deleteUserMnemonicDB(userId, kanji)
        if (success) {
          setUserMnemonic(null)
        }
      }
    }
  }

  // Cancel mnemonic editing
  function cancelMnemonicEdit() {
    setEditingMnemonic(false)
  }

  // Handle Enter key to go next
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter' && !isEditing && !editingMnemonic) {
        goNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, cards.length, isEditing])

  return (
    <div>
      <div className="flashcard card">
        {cur.type === 'kanji' ? (
          <div style={{textAlign:'center'}}>
            <div className="big-kanji">{kanji}</div>
            
            {/* Editable Meanings */}
            <div style={{fontSize:16, fontWeight:600, marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
              {isEditing && editField === 'meaning' ? (
                <div style={{display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', justifyContent:'center'}}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit()
                      if (e.key === 'Escape') cancelEdit()
                    }}
                    autoFocus
                    style={{
                      fontSize: 14,
                      padding: '6px 12px',
                      border: '1px solid rgba(37,99,235,0.3)',
                      borderRadius: 8,
                      outline: 'none',
                      minWidth: 200,
                      textAlign: 'center'
                    }}
                    placeholder="meaning1, meaning2, ..."
                  />
                  <button
                    onClick={saveEdit}
                    disabled={isSaving}
                    style={{
                      fontSize: 12,
                      padding: '6px 12px',
                      background: '#10b981',
                      border: 'none',
                      borderRadius: 6,
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    {isSaving ? '...' : '✓'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      fontSize: 12,
                      padding: '6px 12px',
                      background: '#ef4444',
                      border: 'none',
                      borderRadius: 6,
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span>{(data && data.meanings && data.meanings.length) ? data.meanings.join(', ') : 'Meaning'}</span>
                  <button
                    onClick={() => startEdit('meaning', (data && data.meanings) ? data.meanings.join(', ') : '')}
                    style={{
                      padding: '4px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      color: 'var(--muted)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Edit meaning"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {/* Onyomi */}
            <div style={{marginTop:8,color:'var(--muted)'}}>
              <span>Onyomi: {(data && data.onyomi && data.onyomi.length) ? data.onyomi.join(', ') : '—'}</span>
            </div>
            
            {/* Kunyomi */}
            <div style={{color:'var(--muted)'}}>
              <span>Kunyomi: {(data && data.kunyomi && data.kunyomi.length) ? data.kunyomi.join(', ') : '—'}</span>
            </div>
            
            {/* Mnemonic Section */}
            <div style={{marginTop: 16}}>
              {/* Create Mnemonic button when no base mnemonic exists */}
              {!baseMnemonic && !editingMnemonic && !loadingMnemonic && (
                <button 
                  onClick={() => {
                    setMnemonicForm({ story: '', reading: '', hint: '', components: '' })
                    setEditingMnemonic('base')
                  }}
                  style={{
                    fontSize: 13, 
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: 8,
                    color: '#7c3aed',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    margin: '0 auto'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create Mnemonic
                </button>
              )}
              
              {baseMnemonic && !editingMnemonic && (
                <>
                  <button 
                    onClick={() => setShowMnemonic(!showMnemonic)}
                    style={{
                      fontSize: 13, 
                      marginBottom: showMnemonic ? 12 : 0,
                      padding: '8px 16px',
                      background: showMnemonic ? 'rgba(124,58,237,0.1)' : 'transparent',
                      border: '1px solid rgba(124,58,237,0.3)',
                      borderRadius: 8,
                      color: '#7c3aed',
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {showMnemonic ? 'Hide Mnemonic' : 'Show Mnemonic'}
                  </button>
                
                  {showMnemonic && (
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08))',
                      borderRadius: 12,
                      padding: 16,
                      textAlign: 'left',
                      marginTop: 8
                    }}>
                      {/* Show Edit top-right only when user mnemonic exists (bottom area is taken) */}
                      {userMnemonic && (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 12}}>
                          <button
                            onClick={startBaseMnemonicEdit}
                            style={{
                              padding: '4px 10px',
                              background: 'transparent',
                              border: '1px solid rgba(124,58,237,0.3)',
                              borderRadius: 6,
                              color: '#7c3aed',
                              cursor: 'pointer',
                              fontWeight: 500,
                              fontSize: 11,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>
                        </div>
                      )}

                      {/* Radicals */}
                      {baseMnemonic.radicals && baseMnemonic.radicals.length > 0 && (
                        <div style={{marginBottom: 12}}>
                          <div style={{fontSize: 12, fontWeight: 600, color: '#7c3aed', marginBottom: 6}}>
                            RADICALS
                          </div>
                          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                            {baseMnemonic.radicals.map((r, i) => (
                              <span key={i} style={{
                                background: 'white',
                                padding: '4px 10px',
                                borderRadius: 8,
                                fontSize: 14,
                                border: '1px solid rgba(124,58,237,0.2)'
                            }}>
                              <span style={{fontSize: 18, marginRight: 6}}>{r.char}</span>
                              <span style={{color: 'var(--muted)'}}>{r.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Components */}
                    {baseMnemonic.components && (
                      <div style={{marginBottom: 12}}>
                        <div style={{fontSize: 12, fontWeight: 600, color: '#7c3aed', marginBottom: 4}}>
                          VISUAL
                        </div>
                        <div style={{fontSize: 14, color: '#4b5563', fontStyle: 'italic'}}>
                          {baseMnemonic.components}
                        </div>
                      </div>
                    )}
                    
                    {/* Story */}
                    <div>
                      <div style={{fontSize: 12, fontWeight: 600, color: '#7c3aed', marginBottom: 4}}>
                        MEMORY STORY
                      </div>
                      <div style={{fontSize: 14, color: '#1f2937', lineHeight: 1.6}}>
                        {baseMnemonic.story}
                      </div>
                    </div>
                    
                    {/* Reading Mnemonic */}
                    {baseMnemonic.reading && (
                      <div style={{marginTop: 12}}>
                        <div style={{fontSize: 12, fontWeight: 600, color: '#0d9488', marginBottom: 4}}>
                          READING
                        </div>
                        <div style={{fontSize: 14, color: '#1f2937', lineHeight: 1.6}}>
                          {baseMnemonic.reading}
                        </div>
                      </div>
                    )}
                    
                    {/* Hint */}
                    {baseMnemonic.hint && (
                      <div style={{
                        marginTop: 12,
                        padding: '8px 12px',
                        background: 'rgba(124,58,237,0.1)',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#6d28d9'
                      }}>
                        💡 {baseMnemonic.hint}
                      </div>
                    )}

                    {userMnemonic && (
                      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed rgba(13,148,136,0.35)' }}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                          <div style={{fontSize: 12, fontWeight: 700, color: '#0d9488'}}>
                            YOUR MNEMONIC
                          </div>
                          <div style={{display: 'flex', gap: 6}}>
                            <button
                              onClick={startUserMnemonicEdit}
                              style={{
                                padding: '4px 10px',
                                background: 'transparent',
                                border: '1px solid rgba(13,148,136,0.3)',
                                borderRadius: 6,
                                color: '#0d9488',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: 11,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={deleteUserMnemonicHandler}
                              style={{
                                padding: '4px 10px',
                                background: 'transparent',
                                border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: 6,
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: 11,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                        {userMnemonic.components && (
                          <div style={{marginBottom: 8}}>
                            <div style={{fontSize: 11, fontWeight: 600, color: '#0d9488', marginBottom: 4}}>VISUAL</div>
                            <div style={{fontSize: 14, color: '#4b5563', fontStyle: 'italic'}}>{userMnemonic.components}</div>
                          </div>
                        )}
                        {userMnemonic.story && (
                          <div style={{marginBottom: 8}}>
                            <div style={{fontSize: 11, fontWeight: 600, color: '#0d9488', marginBottom: 4}}>MEMORY STORY</div>
                            <div style={{fontSize: 14, color: '#1f2937', lineHeight: 1.6}}>{userMnemonic.story}</div>
                          </div>
                        )}
                        {userMnemonic.reading && (
                          <div style={{marginBottom: 8}}>
                            <div style={{fontSize: 11, fontWeight: 600, color: '#0d9488', marginBottom: 4}}>READING</div>
                            <div style={{fontSize: 14, color: '#1f2937', lineHeight: 1.6}}>{userMnemonic.reading}</div>
                          </div>
                        )}
                        {userMnemonic.hint && (
                          <div style={{
                            marginTop: 8,
                            padding: '8px 12px',
                            background: 'rgba(13,148,136,0.1)',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#0f766e'
                          }}>
                            💡 {userMnemonic.hint}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Bottom buttons: Edit + Add Your Own (only when no user mnemonic) */}
                    {!userMnemonic && (
                      <div style={{display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap'}}>
                        <button
                          onClick={startBaseMnemonicEdit}
                          style={{
                            padding: '8px 16px',
                            background: 'white',
                            border: '1px solid rgba(124,58,237,0.3)',
                            borderRadius: 8,
                            color: '#7c3aed',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: 13,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit Mnemonic
                        </button>
                        <button
                          onClick={startUserMnemonicEdit}
                          style={{
                            padding: '8px 16px',
                            background: 'white',
                            border: '1px solid rgba(13,148,136,0.3)',
                            borderRadius: 8,
                            color: '#0d9488',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: 13,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          Add Your Own
                        </button>
                      </div>
                    )}
                  </div>
                )}
                </>
              )}
                
              {/* Mnemonic Edit Form */}
              {editingMnemonic && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08))',
                  borderRadius: 12,
                  padding: 16,
                  textAlign: 'left',
                  marginTop: 8
                }}>
                    <div style={{fontSize: 14, fontWeight: 600, color: editingMnemonic === 'user' ? '#0d9488' : '#7c3aed', marginBottom: 16}}>
                      {editingMnemonic === 'user' 
                        ? (userMnemonic ? 'Edit Your Mnemonic' : `Add Your Own Mnemonic for ${kanji}`)
                        : `Edit Mnemonic for ${kanji}`
                      }
                    </div>
                    
                    {/* Components Field */}
                    <div style={{marginBottom: 12}}>
                      <label style={{fontSize: 12, fontWeight: 600, color: '#7c3aed', display: 'block', marginBottom: 4}}>
                        VISUAL / COMPONENTS
                      </label>
                      <input
                        type="text"
                        value={mnemonicForm.components}
                        onChange={(e) => setMnemonicForm({...mnemonicForm, components: e.target.value})}
                        placeholder="Describe what the kanji looks like..."
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid rgba(124,58,237,0.3)',
                          borderRadius: 8,
                          fontSize: 14,
                          outline: 'none'
                        }}
                      />
                    </div>
                    
                    {/* Story Field */}
                    <div style={{marginBottom: 12}}>
                      <label style={{fontSize: 12, fontWeight: 600, color: '#7c3aed', display: 'block', marginBottom: 4}}>
                        MEMORY STORY
                      </label>
                      <textarea
                        value={mnemonicForm.story}
                        onChange={(e) => setMnemonicForm({...mnemonicForm, story: e.target.value})}
                        placeholder="Write a memorable story to remember the meaning..."
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid rgba(124,58,237,0.3)',
                          borderRadius: 8,
                          fontSize: 14,
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                    
                    {/* Reading Mnemonic Field */}
                    <div style={{marginBottom: 12}}>
                      <label style={{fontSize: 12, fontWeight: 600, color: '#0d9488', display: 'block', marginBottom: 4}}>
                        READING MNEMONIC
                      </label>
                      <textarea
                        value={mnemonicForm.reading}
                        onChange={(e) => setMnemonicForm({...mnemonicForm, reading: e.target.value})}
                        placeholder="Write a mnemonic to remember the reading..."
                        rows={2}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid rgba(13,148,136,0.3)',
                          borderRadius: 8,
                          fontSize: 14,
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                    
                    {/* Hint Field */}
                    <div style={{marginBottom: 16}}>
                      <label style={{fontSize: 12, fontWeight: 600, color: '#6d28d9', display: 'block', marginBottom: 4}}>
                        💡 HINT (optional)
                      </label>
                      <input
                        type="text"
                        value={mnemonicForm.hint}
                        onChange={(e) => setMnemonicForm({...mnemonicForm, hint: e.target.value})}
                        placeholder="A quick hint or tip..."
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid rgba(124,58,237,0.3)',
                          borderRadius: 8,
                          fontSize: 14,
                          outline: 'none'
                        }}
                      />
                    </div>
                    
                    {/* Save / Cancel Buttons */}
                    <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                      <button
                        onClick={cancelMnemonicEdit}
                        style={{
                          padding: '8px 16px',
                          background: 'white',
                          border: '1px solid rgba(0,0,0,0.2)',
                          borderRadius: 8,
                          color: '#6b7280',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: 13
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={editingMnemonic === 'user' ? saveUserMnemonicEdit : saveBaseMnemonicEdit}
                        disabled={isSaving}
                        style={{
                          padding: '8px 16px',
                          background: editingMnemonic === 'user' ? '#0d9488' : '#7c3aed',
                          border: 'none',
                          borderRadius: 8,
                          color: 'white',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: 13
                        }}
                      >
                        {isSaving ? 'Saving...' : (editingMnemonic === 'user' ? 'Save Your Mnemonic' : 'Save')}
                      </button>
                    </div>
                  </div>
                )}
            </div>
            
            {/* Write button on kanji card */}
            {onStartWrite && (
              <button 
                onClick={onStartWrite}
                style={{
                  marginTop: 16, 
                  fontSize: 13,
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(13,148,136,0.3)',
                  borderRadius: 8,
                  color: '#0d9488',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
              >
                Practice Writing
              </button>
            )}
          </div>
        ) : (
          <div style={{textAlign:'center'}}>
            <div className="big-kanji">{cur.word}</div>
            
            {/* Editable Vocab Meaning */}
            <div style={{fontSize:16, fontWeight:600, marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
              {isEditing ? (
                <div style={{display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', justifyContent:'center'}}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit()
                      if (e.key === 'Escape') cancelEdit()
                    }}
                    autoFocus
                    style={{
                      fontSize: 14,
                      padding: '6px 12px',
                      border: '1px solid rgba(37,99,235,0.3)',
                      borderRadius: 8,
                      outline: 'none',
                      minWidth: 200,
                      textAlign: 'center'
                    }}
                    placeholder="meaning..."
                  />
                  <button
                    onClick={saveEdit}
                    disabled={isSaving}
                    style={{
                      fontSize: 12,
                      padding: '6px 12px',
                      background: '#10b981',
                      border: 'none',
                      borderRadius: 6,
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    {isSaving ? '...' : '✓'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      fontSize: 12,
                      padding: '6px 12px',
                      background: '#ef4444',
                      border: 'none',
                      borderRadius: 6,
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span>{cur.meaning}</span>
                  <button
                    onClick={() => startEdit('vocab', cur.meaning || '')}
                    style={{
                      padding: '4px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      color: 'var(--muted)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Edit meaning"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            <div style={{marginTop:8,color:'var(--muted)'}}>
              <div>Reading: {cur.reading}</div>
            </div>
            {cur.jlpt && <div style={{fontSize:12,padding:'4px 8px',borderRadius:8,background:'rgba(37,99,235,0.1)',color:'var(--accent)',border:`1px solid rgba(37,99,235,0.14)`,display:'inline-block',marginTop:8}}>{cur.jlpt}</div>}
          </div>
        )}

        <div className="controls">
          {index > 0 && <button className="btn secondary" onClick={goPrev}>{'Prev'}</button>}
          <button className="btn" onClick={goNext}>{index === cards.length-1 ? 'Start Quiz' : 'Next'}</button>
        </div>
      </div>
      <div className="result">Card {index+1} / {cards.length}</div>
    </div>
  )
}
