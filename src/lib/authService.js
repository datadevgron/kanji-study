/**
 * SUPABASE AUTH SERVICE
 * 
 * Handles user authentication: sign up, sign in, sign out, session management.
 */

import { supabase } from './supabase'

/**
 * Sign up a new user with email and password
 */
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) {
    return { user: null, error: error.message }
  }
  return { user: data.user, error: null }
}

/**
 * Sign in an existing user
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    return { user: null, error: error.message }
  }
  return { user: data.user, error: null }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error: error?.message || null }
}

/**
 * Get the current session (returns user if logged in)
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) {
    return null
  }
  return session.user
}

/**
 * Listen for auth state changes
 * @param {Function} callback - Called with (event, session)
 * @returns {Function} unsubscribe function
 */
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback)
  return () => subscription.unsubscribe()
}
