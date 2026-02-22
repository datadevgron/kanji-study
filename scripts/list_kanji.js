import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

const { data } = await supabase
  .from('kanji')
  .select('character, meanings, onyomi, kunyomi, jlpt')
  .order('jlpt', { ascending: false })

console.log('Total kanji:', data.length)

const n5 = data.filter(k => k.jlpt === 'N5')
console.log('\nN5 kanji (' + n5.length + '):')
n5.forEach(k => {
  console.log(`${k.character} - ${k.meanings?.join(', ')} | On: ${k.onyomi?.join(', ')} | Kun: ${k.kunyomi?.join(', ')}`)
})
