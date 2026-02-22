import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

// Try inserting with a test record to see what happens
const testData = {
  character: '一',
  radicals: [{ char: '一', name: 'one' }],
  components: 'test',
  story: 'test story',
  hint: 'test hint',
  reading: 'test reading'
}

console.log('Attempting insert with:', Object.keys(testData))

const { data, error } = await supabase
  .from('mnemonics')
  .insert(testData)
  .select()

console.log('Result:', data)
console.log('Error:', error)

// Also try to select all to see structure
const { data: all, error: allErr } = await supabase.from('mnemonics').select('*')
console.log('\nAll records:', all)
console.log('Select error:', allErr)
