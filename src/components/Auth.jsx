import React, { useState } from 'react'
import { signIn, signUp } from '../lib/authService'

export default function Auth({ onAuth }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (isSignUp && password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    if (isSignUp) {
      const { user, error: authError } = await signUp(email, password)
      if (authError) {
        setError(authError)
      } else if (user) {
        // Some Supabase configs require email confirmation
        if (user.identities && user.identities.length === 0) {
          setError('An account with this email already exists')
        } else {
          setSuccessMsg('Account created! Check your email to confirm, then sign in.')
          setIsSignUp(false)
          setPassword('')
          setConfirmPassword('')
        }
      }
    } else {
      const { user, error: authError } = await signIn(email, password)
      if (authError) {
        setError(authError)
      } else if (user) {
        onAuth(user)
      }
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'var(--bg)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: 'var(--card)',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.04)'
      }}>
        {/* Logo */}
        <div style={{textAlign: 'center', marginBottom: 28}}>
          <div style={{
            fontSize: 48,
            marginBottom: 8
          }}>漢字</div>
          <div style={{
            fontSize: 22,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Kanji Ganbare
          </div>
          <div style={{
            fontSize: 13,
            color: 'var(--muted)',
            marginTop: 4
          }}>
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </div>
        </div>

        {/* Error / Success messages */}
        {error && (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 10,
            color: '#dc2626',
            fontSize: 13,
            marginBottom: 16
          }}>
            {error}
          </div>
        )}
        {successMsg && (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 10,
            color: '#059669',
            fontSize: 13,
            marginBottom: 16
          }}>
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: 14}}>
            <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#374151',
              marginBottom: 6
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 10,
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s',
                background: 'transparent'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0d9488'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>

          <div style={{marginBottom: 14}}>
            <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#374151',
              marginBottom: 6
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 10,
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s',
                background: 'transparent'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0d9488'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>

          {isSignUp && (
            <div style={{marginBottom: 14}}>
              <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 6
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 10,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  background: 'transparent'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0d9488'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #0d9488, #14b8a6)',
              border: 'none',
              borderRadius: 10,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginTop: 4,
              boxShadow: loading ? 'none' : '0 4px 12px rgba(13,148,136,0.3)'
            }}
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {/* Toggle sign in / sign up */}
        <div style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 13,
          color: 'var(--muted)'
        }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
              setSuccessMsg('')
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#0d9488',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 13,
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}
