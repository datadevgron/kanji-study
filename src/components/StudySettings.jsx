import React, { useState, useEffect } from 'react'
import { 
  loadStudySettings, 
  saveStudySettings, 
  DEFAULT_SRS_INTERVALS 
} from '../lib/studyService'

/**
 * Study Settings Component
 * - Weekly goal setting
 * - Custom SRS intervals configuration
 */
export default function StudySettings({ userId, onClose, onSave }) {
  const [weeklyGoal, setWeeklyGoal] = useState(10)
  const [srsIntervals, setSrsIntervals] = useState(DEFAULT_SRS_INTERVALS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const settings = await loadStudySettings(userId)
      setWeeklyGoal(settings.weekly_goal)
      setSrsIntervals(settings.srs_intervals)
      setLoading(false)
    }
    load()
  }, [userId])

  const handleSave = async () => {
    setSaving(true)
    await saveStudySettings(userId, {
      weekly_goal: weeklyGoal,
      srs_intervals: srsIntervals
    })
    setSaving(false)
    onSave?.({ weekly_goal: weeklyGoal, srs_intervals: srsIntervals })
    onClose?.()
  }

  const updateInterval = (index, value) => {
    const newIntervals = [...srsIntervals]
    newIntervals[index] = Math.max(1, parseInt(value) || 1)
    setSrsIntervals(newIntervals)
  }

  const addInterval = () => {
    setSrsIntervals([...srsIntervals, srsIntervals[srsIntervals.length - 1] || 7])
  }

  const removeInterval = (index) => {
    if (srsIntervals.length > 1) {
      setSrsIntervals(srsIntervals.filter((_, i) => i !== index))
    }
  }

  const resetToDefault = () => {
    setSrsIntervals([...DEFAULT_SRS_INTERVALS])
  }

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
          maxWidth: 500,
          width: '90%'
        }}>
          Loading settings...
        </div>
      </div>
    )
  }

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
        maxWidth: 500,
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ 
          fontSize: 20, 
          fontWeight: 700, 
          marginBottom: 24,
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Study Settings
        </h2>

        {/* Weekly Goal */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 8,
            color: '#374151'
          }}>
            Weekly Learning Goal
          </label>
          <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
            How many new kanji do you want to learn each week?
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              type="range"
              min="1"
              max="150"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(parseInt(e.target.value))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min="1"
              max="150"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(Math.min(150, Math.max(1, parseInt(e.target.value) || 1)))}
              style={{
                width: 64,
                padding: '8px 12px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
                color: '#0d9488'
              }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: 11, 
            color: '#9ca3af',
            marginTop: 4
          }}>
            <span>1 (relaxed)</span>
            <span>150 (intensive)</span>
          </div>
        </div>

        {/* SRS Intervals */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 8
          }}>
            <label style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#374151'
            }}>
              Review Schedule (SRS)
            </label>
            <button
              onClick={resetToDefault}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                background: 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 6,
                color: '#6b7280',
                cursor: 'pointer'
              }}
            >
              Reset to Default
            </button>
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
            Days between each review stage. After completing all stages, kanji is marked as "known".
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {srsIntervals.map((days, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'rgba(13,148,136,0.08)',
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(13,148,136,0.2)'
                }}
              >
                <span style={{ fontSize: 11, color: '#6b7280' }}>
                  Stage {index + 1}:
                </span>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={days}
                  onChange={(e) => updateInterval(index, e.target.value)}
                  style={{
                    width: 40,
                    padding: '4px 6px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: 4,
                    fontSize: 12,
                    textAlign: 'center'
                  }}
                />
                <span style={{ fontSize: 11, color: '#6b7280' }}>days</span>
                {srsIntervals.length > 1 && (
                  <button
                    onClick={() => removeInterval(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: 14,
                      padding: '0 4px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addInterval}
            style={{
              fontSize: 12,
              padding: '6px 12px',
              background: 'transparent',
              border: '1px dashed rgba(0,0,0,0.2)',
              borderRadius: 8,
              color: '#6b7280',
              cursor: 'pointer'
            }}
          >
            + Add Stage
          </button>

          {/* Preview */}
          <div style={{
            marginTop: 16,
            padding: 12,
            background: 'rgba(0,0,0,0.02)',
            borderRadius: 8,
            fontSize: 12,
            color: '#6b7280'
          }}>
            <strong>Preview:</strong> After learning a kanji, you'll review it after{' '}
            {srsIntervals.map((d, i) => (
              <span key={i}>
                {i > 0 && ', then '}
                <strong style={{ color: '#0d9488' }}>{d}</strong> day{d !== 1 ? 's' : ''}
              </span>
            ))}
            . Total: <strong>{srsIntervals.reduce((a, b) => a + b, 0)} days</strong> to mastery.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 8,
              color: '#6b7280',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
