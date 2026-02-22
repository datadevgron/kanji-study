import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

const { data: n3Kanji } = await supabase
  .from('kanji')
  .select('id, character')
  .eq('jlpt', 'N3')

let quality = 0
let generic = []

for (const k of n3Kanji) {
  const { data: m } = await supabase
    .from('mnemonics')
    .select('story')
    .eq('kanji_id', k.id)
    .single()
  
  // Quality mnemonics have engaging stories, not generic templates
  const isGeneric = m?.story?.includes('This is the kanji for') || m?.story?.includes('When you see')
  const isShort = !m?.story || m.story.length < 50
  
  if (!isGeneric && !isShort) {
    quality++
  } else {
    generic.push(k.character)
  }
}

console.log('📊 N3 MNEMONIC QUALITY CHECK:')
console.log('============================')
console.log('Quality mnemonics:', quality, '/ 367')
console.log('Generic/short mnemonics:', generic.length)
console.log('')
if (generic.length > 0) {
  console.log('Kanji with generic mnemonics:', generic.join(', '))
}
