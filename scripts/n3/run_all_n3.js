/**
 * N3 BATCH RUNNER - Runs all 13 N3 batches
 * Total: 367 kanji
 * 
 * Run: node scripts/n3/run_all_n3.js
 */

import { execSync } from 'child_process'
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const batches = [
  'batch1_people_relations.js',
  'batch2_processing.js',
  'batch3_communication.js',
  'batch4_buildings.js',
  'batch5_emotions.js',
  'batch6_actions.js',
  'batch7_nature.js',
  'batch8_water_places.js',
  'batch9_knowledge.js',
  'batch10_body_speaking.js',
  'batch11_communication.js',
  'batch12_places_things.js',
  'batch13_final.js'
]

console.log('🚀 Running ALL N3 Mnemonic Batches')
console.log('='.repeat(60))
console.log(`Total batches: ${batches.length}`)
console.log(`Expected kanji: 367\n`)

let totalSuccess = 0
let totalFailed = 0

for (const batch of batches) {
  console.log(`\n📦 Running ${batch}...`)
  console.log('-'.repeat(40))
  
  try {
    const output = execSync(`node ${join(__dirname, batch)}`, { 
      encoding: 'utf8',
      cwd: join(__dirname, '../..')
    })
    console.log(output)
  } catch (error) {
    console.log(`❌ Error running ${batch}:`, error.message)
    totalFailed++
  }
}

console.log('\n' + '='.repeat(60))
console.log('🏁 ALL N3 BATCHES COMPLETED!')
console.log('='.repeat(60))
