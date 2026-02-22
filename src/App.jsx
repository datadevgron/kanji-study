import React, { useEffect, useState, useCallback, useRef } from 'react'
import Home from './components/Home'
import KanjiPage from './components/KanjiPage'
import Auth from './components/Auth'
import StudySettings from './components/StudySettings'
import StudyPlan from './components/StudyPlan'
import ReviewQuiz from './components/ReviewQuiz'
import { fetchKanjiByLevels, fetchKanjiList } from './lib/kanjiService'
import { getSession, signOut, onAuthStateChange } from './lib/authService'
import { loadUserProfile, saveUserProfile, loadKnownKanji, saveKnownKanji } from './lib/userDataService'
import { loadStudySettings, loadStudyQueue, getStudyProgress } from './lib/studyService'
import './index.css'

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1']

export default function App(){
  // Auth state
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // App state
  const [selected, setSelected] = useState(null)
  const [kanjiData, setKanjiData] = useState({})
  const [kanjiList, setKanjiList] = useState([])
  const [userLevel, setUserLevel] = useState('N5')
  const [knownKanji, setKnownKanji] = useState(new Set())
  const [loading, setLoading] = useState(true)

  // Study state
  const [showSettings, setShowSettings] = useState(false)
  const [showStudyPlan, setShowStudyPlan] = useState(false)
  const [showReviewQuiz, setShowReviewQuiz] = useState(false)
  const [studySettings, setStudySettings] = useState({ weekly_goal: 10, srs_intervals: [1,1,2,3,5,8,14] })
  const [studyQueue, setStudyQueue] = useState([])
  const [studyProgress, setStudyProgress] = useState(null)

  // Debounce ref for saving known kanji
  const saveKnownTimer = useRef(null)

  // Check for existing session on mount
  useEffect(() => {
    async function checkSession() {
      const sessionUser = await getSession()
      if (sessionUser) {
        setUser(sessionUser)
      }
      setAuthLoading(false)
    }
    checkSession()

    // Listen for auth changes (e.g. sign in from another tab, token refresh)
    const unsubscribe = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setKnownKanji(new Set())
        setUserLevel('N5')
      }
    })

    return unsubscribe
  }, [])

  // Flush pending known kanji save on page close/refresh
  useEffect(() => {
    function handleBeforeUnload() {
      if (saveKnownTimer.current && user) {
        clearTimeout(saveKnownTimer.current)
        saveKnownTimer.current = null
        // Use sendBeacon-style sync save (navigator.sendBeacon doesn't work with Supabase)
        // So we do a fire-and-forget save
        saveKnownKanji(user.id, latestKnownRef.current)
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [user])

  // Load user data when user logs in
  useEffect(() => {
    if (!user) return
    async function loadData() {
      const [profile, known, settings, queue] = await Promise.all([
        loadUserProfile(user.id),
        loadKnownKanji(user.id),
        loadStudySettings(user.id),
        loadStudyQueue(user.id)
      ])
      if (profile?.jlpt_level) {
        setUserLevel(profile.jlpt_level)
      }
      setKnownKanji(known)
      latestKnownRef.current = known
      setStudySettings(settings)
      setStudyQueue(queue)
      
      // Get progress with weekly goal
      const progress = await getStudyProgress(user.id, settings.weekly_goal)
      setStudyProgress({
        ...progress,
        weeklyGoal: settings.weekly_goal
      })
    }
    loadData()
  }, [user])

  // Refresh study progress
  const refreshStudyProgress = useCallback(async () => {
    if (!user) return
    const [queue, settings] = await Promise.all([
      loadStudyQueue(user.id),
      loadStudySettings(user.id)
    ])
    setStudyQueue(queue)
    setStudySettings(settings)
    
    const progress = await getStudyProgress(user.id, settings.weekly_goal)
    setStudyProgress({
      ...progress,
      weeklyGoal: settings.weekly_goal
    })
  }, [user])

  // Save JLPT level when it changes (debounced by user action)
  const handleSetUserLevel = useCallback((level) => {
    setUserLevel(level)
    if (user) {
      saveUserProfile(user.id, level)
    }
  }, [user])

  // Save known kanji when it changes — save immediately on every change
  const latestKnownRef = useRef(new Set())
  const isSavingKnown = useRef(false)
  const pendingSaveKnown = useRef(false)

  async function flushKnownKanji(userId, knownSet) {
    if (isSavingKnown.current) {
      pendingSaveKnown.current = true
      return
    }
    isSavingKnown.current = true
    try {
      await saveKnownKanji(userId, knownSet)
    } catch (e) {
      console.error('Failed to save known kanji:', e)
    }
    isSavingKnown.current = false
    // If another save was requested while we were saving, save again
    if (pendingSaveKnown.current) {
      pendingSaveKnown.current = false
      await flushKnownKanji(userId, latestKnownRef.current)
    }
  }

  const handleSetKnownKanji = useCallback((updater) => {
    setKnownKanji(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      latestKnownRef.current = next
      if (user) {
        // Debounce slightly (500ms) to batch rapid toggles like "Mark All Known"
        if (saveKnownTimer.current) clearTimeout(saveKnownTimer.current)
        saveKnownTimer.current = setTimeout(() => {
          flushKnownKanji(user.id, next)
        }, 500)
      }
      return next
    })
  }, [user])

  // Get levels to fetch based on user's current level
  const getLevelsToFetch = (level) => {
    const levelMap = {
      'N5': ['N5'],
      'N4': ['N5', 'N4'],
      'N3': ['N5', 'N4', 'N3'],
      'N2': ['N5', 'N4', 'N3', 'N2'],
      'N1': ['N5', 'N4', 'N3', 'N2', 'N1']
    }
    return levelMap[level] || ['N5']
  }

  useEffect(()=>{
    if (!user) return  // Don't fetch kanji until logged in
    async function load(){
      setLoading(true)
      const levels = getLevelsToFetch(userLevel)
      
      const [data, list] = await Promise.all([
        fetchKanjiByLevels(levels),
        fetchKanjiList(levels)
      ])
      
      setKanjiData(data)
      setKanjiList(list)
      setLoading(false)
    }
    load()
  },[userLevel, user])

  // Handle sign out — flush any pending saves first
  async function handleSignOut() {
    // Cancel pending debounce and save immediately
    if (saveKnownTimer.current) {
      clearTimeout(saveKnownTimer.current)
      saveKnownTimer.current = null
    }
    console.log('[App] handleSignOut — latestKnownRef has', latestKnownRef.current.size, 'kanji')
    if (user && latestKnownRef.current.size > 0) {
      console.log('[App] Flushing known kanji before sign out...')
      await saveKnownKanji(user.id, latestKnownRef.current)
      console.log('[App] Flush complete')
    }
    await signOut()
    setUser(null)
    setKnownKanji(new Set())
    latestKnownRef.current = new Set()
    setSelected(null)
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280'
      }}>
        Loading...
      </div>
    )
  }

  // Show login page if not authenticated
  if (!user) {
    return <Auth onAuth={setUser} />
  }

  return (
    <div className="app">
      {/* Header - only show full header on home page */}
      {!selected && (
        <div style={{marginBottom: 28}}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20
          }}>
            <div style={{
              fontSize: 28, 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              漢字 Kanji Study
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{fontSize: 12, color: '#9ca3af'}}>
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                style={{
                  padding: '6px 14px',
                  background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 8,
                  color: '#6b7280',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
          
          {/* JLPT Level Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
            padding: '14px 20px',
            borderRadius: 14,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: 14, 
              fontWeight: 600,
              color: '#374151'
            }}>
              Your JLPT Level
            </span>
            <div style={{display: 'flex', gap: 8}}>
              {JLPT_LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => handleSetUserLevel(level)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: userLevel === level 
                      ? 'linear-gradient(135deg, #0d9488, #14b8a6)' 
                      : 'rgba(0,0,0,0.04)',
                    color: userLevel === level ? 'white' : '#6b7280',
                    fontSize: 13,
                    fontWeight: userLevel === level ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: userLevel === level ? '0 4px 12px rgba(13,148,136,0.3)' : 'none'
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
            <div style={{
              marginLeft: 'auto',
              fontSize: 12, 
              color: '#9ca3af',
              background: 'rgba(0,0,0,0.03)',
              padding: '6px 12px',
              borderRadius: 8
            }}>
              📚 Vocab up to {userLevel} in study & quiz
            </div>
          </div>
        </div>
      )}

      {!selected && (
        loading ? (
          <div style={{textAlign: 'center', padding: 40, color: '#6b7280'}}>
            Loading kanji...
          </div>
        ) : (
          <Home 
            kanjiList={kanjiList} 
            kanjiData={kanjiData} 
            onSelect={setSelected}
            knownKanji={knownKanji}
            setKnownKanji={handleSetKnownKanji}
            userLevel={userLevel}
            userId={user.id}
            onOpenSettings={() => setShowSettings(true)}
            onOpenStudyPlan={() => setShowStudyPlan(true)}
            onOpenReview={() => setShowReviewQuiz(true)}
            studyProgress={studyProgress}
            studyQueue={studyQueue}
          />
        )
      )}
      {selected && (
        <KanjiPage 
          kanji={selected} 
          data={kanjiData[selected]} 
          userLevel={userLevel} 
          kanjiData={kanjiData}
          userId={user.id}
          onBack={() => setSelected(null)}
          onDataUpdate={(char, newData) => {
            setKanjiData(prev => ({...prev, [char]: newData}))
          }}
        />
      )}

      {/* Modals */}
      {showSettings && (
        <StudySettings 
          userId={user.id}
          onClose={() => setShowSettings(false)}
          onSave={(settings) => {
            setStudySettings(settings)
            refreshStudyProgress()
          }}
        />
      )}

      {showStudyPlan && (
        <StudyPlan 
          userId={user.id}
          kanjiList={kanjiList}
          kanjiData={kanjiData}
          knownKanji={knownKanji}
          weeklyGoal={studySettings.weekly_goal}
          onClose={() => {
            setShowStudyPlan(false)
            refreshStudyProgress()
          }}
        />
      )}

      {showReviewQuiz && (
        <ReviewQuiz
          userId={user.id}
          kanjiData={kanjiData}
          knownKanji={knownKanji}
          setKnownKanji={handleSetKnownKanji}
          onClose={() => {
            setShowReviewQuiz(false)
            refreshStudyProgress()
          }}
        />
      )}
    </div>
  )
}
