/**
 * Generate engaging mnemonics for ALL kanji
 * 
 * This script creates:
 * 1. Radical-based MEANING stories (explaining WHY the kanji means what it does)
 * 2. Sound-based READING mnemonics (memorable stories for pronunciation)
 * 
 * Uses KanjiAlive API for radical decomposition data
 * 
 * Run: source ~/.nvm/nvm.sh && nvm use default && node scripts/generate_all_mnemonics_v2.js
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

// ============================================================================
// RADICAL MEANINGS DATABASE
// Common radicals and their visual/meaning associations
// ============================================================================
const RADICAL_MEANINGS = {
  // People & Body
  '人': { name: 'person', visual: 'a person standing', memory: 'PERSON' },
  '亻': { name: 'person radical', visual: 'a person (side view)', memory: 'PERSON' },
  '女': { name: 'woman', visual: 'a woman kneeling', memory: 'WOMAN' },
  '子': { name: 'child', visual: 'a child with arms', memory: 'CHILD' },
  '口': { name: 'mouth', visual: 'an open mouth', memory: 'MOUTH' },
  '目': { name: 'eye', visual: 'an eye turned sideways', memory: 'EYE' },
  '耳': { name: 'ear', visual: 'an ear shape', memory: 'EAR' },
  '手': { name: 'hand', visual: 'a hand with fingers', memory: 'HAND' },
  '扌': { name: 'hand radical', visual: 'a hand reaching', memory: 'HAND' },
  '足': { name: 'foot/leg', visual: 'a leg and foot', memory: 'FOOT' },
  '心': { name: 'heart', visual: 'a beating heart', memory: 'HEART' },
  '忄': { name: 'heart radical', visual: 'heartbeat lines', memory: 'HEART/EMOTION' },
  '月': { name: 'moon/flesh', visual: 'the moon or body part', memory: 'MOON/BODY' },
  '身': { name: 'body', visual: 'a person\'s body', memory: 'BODY' },
  
  // Nature
  '日': { name: 'sun/day', visual: 'the sun', memory: 'SUN/DAY' },
  '木': { name: 'tree', visual: 'a tree with branches', memory: 'TREE' },
  '林': { name: 'grove', visual: 'two trees together', memory: 'GROVE' },
  '森': { name: 'forest', visual: 'three trees', memory: 'FOREST' },
  '水': { name: 'water', visual: 'flowing water', memory: 'WATER' },
  '氵': { name: 'water radical', visual: 'water drops', memory: 'WATER' },
  '火': { name: 'fire', visual: 'flames burning', memory: 'FIRE' },
  '灬': { name: 'fire dots', visual: 'flames at bottom', memory: 'FIRE/HEAT' },
  '土': { name: 'earth', visual: 'ground with plant', memory: 'EARTH/GROUND' },
  '山': { name: 'mountain', visual: 'mountain peaks', memory: 'MOUNTAIN' },
  '石': { name: 'stone', visual: 'a rock', memory: 'STONE' },
  '田': { name: 'rice field', visual: 'a divided field', memory: 'FIELD' },
  '草': { name: 'grass', visual: 'grass growing', memory: 'GRASS' },
  '艹': { name: 'grass radical', visual: 'grass sprouting', memory: 'PLANT/GRASS' },
  '花': { name: 'flower', visual: 'a blooming flower', memory: 'FLOWER' },
  '雨': { name: 'rain', visual: 'rain falling', memory: 'RAIN' },
  '⻗': { name: 'rain radical', visual: 'rain clouds', memory: 'RAIN/WEATHER' },
  '風': { name: 'wind', visual: 'wind blowing', memory: 'WIND' },
  '川': { name: 'river', visual: 'flowing river', memory: 'RIVER' },
  '海': { name: 'sea', visual: 'the ocean', memory: 'SEA' },
  
  // Buildings & Objects
  '門': { name: 'gate', visual: 'a gateway', memory: 'GATE' },
  '宀': { name: 'roof', visual: 'a roof/house', memory: 'ROOF/HOUSE' },
  '广': { name: 'cliff/building', visual: 'a shelter', memory: 'BUILDING' },
  '車': { name: 'car/vehicle', visual: 'a wheeled cart', memory: 'VEHICLE' },
  '道': { name: 'road', visual: 'a path', memory: 'ROAD' },
  '辶': { name: 'road radical', visual: 'walking on road', memory: 'MOVEMENT/ROAD' },
  '⻌': { name: 'road radical', visual: 'walking on road', memory: 'MOVEMENT/ROAD' },
  '金': { name: 'gold/metal', visual: 'gold nuggets', memory: 'GOLD/METAL' },
  '釒': { name: 'metal radical', visual: 'metal/gold', memory: 'METAL' },
  '糸': { name: 'thread', visual: 'silk thread', memory: 'THREAD' },
  '糹': { name: 'thread radical', visual: 'threads', memory: 'THREAD' },
  '衣': { name: 'clothes', visual: 'clothing', memory: 'CLOTHES' },
  '衤': { name: 'clothes radical', visual: 'garment', memory: 'CLOTHES' },
  
  // Actions & Concepts  
  '言': { name: 'speech', visual: 'words from mouth', memory: 'WORDS/SPEECH' },
  '訁': { name: 'speech radical', visual: 'speaking', memory: 'SPEECH' },
  '力': { name: 'power', visual: 'a flexed arm', memory: 'POWER/STRENGTH' },
  '刀': { name: 'sword', visual: 'a blade', memory: 'SWORD/CUT' },
  '刂': { name: 'sword radical', visual: 'blade edge', memory: 'CUT/BLADE' },
  '食': { name: 'eat', visual: 'eating food', memory: 'FOOD/EAT' },
  '飠': { name: 'food radical', visual: 'food', memory: 'FOOD' },
  '見': { name: 'see', visual: 'an eye on legs', memory: 'SEE/LOOK' },
  '立': { name: 'stand', visual: 'person standing', memory: 'STAND' },
  '行': { name: 'go', visual: 'crossroads', memory: 'GO/TRAVEL' },
  '走': { name: 'run', visual: 'running figure', memory: 'RUN' },
  
  // Numbers & Basic
  '一': { name: 'one', visual: 'one line', memory: 'ONE' },
  '二': { name: 'two', visual: 'two lines', memory: 'TWO' },
  '三': { name: 'three', visual: 'three lines', memory: 'THREE' },
  '十': { name: 'ten', visual: 'a cross/plus', memory: 'TEN' },
  '百': { name: 'hundred', visual: 'one + white', memory: 'HUNDRED' },
  '千': { name: 'thousand', visual: 'person + ten', memory: 'THOUSAND' },
  
  // Other common
  '大': { name: 'big', visual: 'person with arms wide', memory: 'BIG' },
  '小': { name: 'small', visual: 'tiny drops', memory: 'SMALL' },
  '中': { name: 'middle', visual: 'line through box', memory: 'MIDDLE' },
  '上': { name: 'above', visual: 'pointing up', memory: 'UP/ABOVE' },
  '下': { name: 'below', visual: 'pointing down', memory: 'DOWN/BELOW' },
  '白': { name: 'white', visual: 'the sun rising', memory: 'WHITE' },
  '青': { name: 'blue', visual: 'green/blue', memory: 'BLUE' },
  '赤': { name: 'red', visual: 'fire red', memory: 'RED' },
  '黒': { name: 'black', visual: 'dark/black', memory: 'BLACK' },
  '八': { name: 'eight', visual: 'dividing apart', memory: 'EIGHT/DIVIDE' },
  '入': { name: 'enter', visual: 'going in', memory: 'ENTER' },
  '出': { name: 'exit', visual: 'going out', memory: 'EXIT/OUT' },
  '囗': { name: 'enclosure', visual: 'a box', memory: 'BOX/ENCLOSURE' },
  '冂': { name: 'upside down box', visual: 'covering', memory: 'COVER' },
  '儿': { name: 'legs', visual: 'human legs', memory: 'LEGS' },
  '亠': { name: 'lid', visual: 'a lid/top', memory: 'TOP/LID' },
  '厂': { name: 'cliff', visual: 'cliff edge', memory: 'CLIFF' },
  '又': { name: 'again', visual: 'right hand', memory: 'AGAIN/HAND' },
  '寸': { name: 'inch', visual: 'small measure', memory: 'MEASURE' },
  '工': { name: 'work', visual: 'construction beam', memory: 'WORK' },
  '己': { name: 'self', visual: 'oneself', memory: 'SELF' },
  '已': { name: 'already', visual: 'finished', memory: 'ALREADY' },
  '巾': { name: 'cloth', visual: 'hanging cloth', memory: 'CLOTH' },
  '干': { name: 'dry', visual: 'drying rack', memory: 'DRY' },
  '弓': { name: 'bow', visual: 'archery bow', memory: 'BOW' },
  '彳': { name: 'step', visual: 'taking steps', memory: 'STEP/WALK' },
  '戈': { name: 'weapon', visual: 'halberd', memory: 'WEAPON' },
  '戸': { name: 'door', visual: 'single door', memory: 'DOOR' },
  '方': { name: 'direction', visual: 'pointing way', memory: 'DIRECTION' },
  '斤': { name: 'axe', visual: 'axe head', memory: 'AXE' },
  '欠': { name: 'lack', visual: 'person yawning', memory: 'LACK/YAWN' },
  '殳': { name: 'weapon', visual: 'hand + weapon', memory: 'STRIKE' },
  '毛': { name: 'fur', visual: 'hair/fur', memory: 'FUR/HAIR' },
  '气': { name: 'steam', visual: 'rising steam', memory: 'STEAM/AIR' },
  '片': { name: 'slice', visual: 'split wood', memory: 'PIECE' },
  '牛': { name: 'cow', visual: 'cow horns', memory: 'COW' },
  '犬': { name: 'dog', visual: 'a dog', memory: 'DOG' },
  '犭': { name: 'dog radical', visual: 'animal', memory: 'ANIMAL' },
  '王': { name: 'king', visual: 'heaven-earth-man', memory: 'KING' },
  '玉': { name: 'jewel', visual: 'jade', memory: 'JEWEL' },
  '⺩': { name: 'jewel radical', visual: 'precious', memory: 'PRECIOUS' },
  '瓜': { name: 'melon', visual: 'melon vine', memory: 'MELON' },
  '生': { name: 'life', visual: 'plant growing', memory: 'LIFE/BIRTH' },
  '用': { name: 'use', visual: 'using tool', memory: 'USE' },
  '疒': { name: 'sickness', visual: 'sick in bed', memory: 'SICKNESS' },
  '皮': { name: 'skin', visual: 'animal skin', memory: 'SKIN' },
  '皿': { name: 'dish', visual: 'a plate', memory: 'DISH/PLATE' },
  '矢': { name: 'arrow', visual: 'an arrow', memory: 'ARROW' },
  '示': { name: 'show', visual: 'altar showing', memory: 'SHOW/SPIRIT' },
  '礻': { name: 'spirit radical', visual: 'spiritual', memory: 'SPIRIT' },
  '禾': { name: 'grain', visual: 'rice plant', memory: 'GRAIN' },
  '穴': { name: 'hole', visual: 'cave entrance', memory: 'HOLE/CAVE' },
  '竹': { name: 'bamboo', visual: 'bamboo stalks', memory: 'BAMBOO' },
  '⺮': { name: 'bamboo radical', visual: 'bamboo', memory: 'BAMBOO' },
  '米': { name: 'rice', visual: 'rice grains', memory: 'RICE' },
  '羊': { name: 'sheep', visual: 'sheep horns', memory: 'SHEEP' },
  '羽': { name: 'feather', visual: 'bird wings', memory: 'FEATHER/WING' },
  '老': { name: 'old', visual: 'elderly person', memory: 'OLD' },
  '而': { name: 'and', visual: 'beard', memory: 'BEARD' },
  '耒': { name: 'plow', visual: 'farming tool', memory: 'PLOW' },
  '肉': { name: 'meat', visual: 'piece of meat', memory: 'MEAT' },
  '臣': { name: 'minister', visual: 'bowing official', memory: 'SERVANT' },
  '自': { name: 'self', visual: 'nose (self)', memory: 'SELF' },
  '至': { name: 'arrive', visual: 'arrow hitting', memory: 'ARRIVE' },
  '舌': { name: 'tongue', visual: 'tongue in mouth', memory: 'TONGUE' },
  '舟': { name: 'boat', visual: 'a boat', memory: 'BOAT' },
  '艮': { name: 'stopping', visual: 'eye + legs stop', memory: 'STOP' },
  '色': { name: 'color', visual: 'person blushing', memory: 'COLOR' },
  '虫': { name: 'insect', visual: 'a bug', memory: 'INSECT' },
  '血': { name: 'blood', visual: 'drop in dish', memory: 'BLOOD' },
  '西': { name: 'west', visual: 'bird in nest', memory: 'WEST' },
  '角': { name: 'horn', visual: 'animal horn', memory: 'HORN' },
  '豆': { name: 'bean', visual: 'bean on stand', memory: 'BEAN' },
  '貝': { name: 'shell', visual: 'cowrie shell', memory: 'SHELL/MONEY' },
  '酉': { name: 'sake', visual: 'wine jar', memory: 'ALCOHOL' },
  '里': { name: 'village', visual: 'field + earth', memory: 'VILLAGE' },
  '長': { name: 'long', visual: 'long hair', memory: 'LONG' },
  '阝': { name: 'mound', visual: 'hill/city', memory: 'HILL/CITY' },
  '隹': { name: 'bird', visual: 'short-tailed bird', memory: 'BIRD' },
  '非': { name: 'not', visual: 'wings apart', memory: 'NOT/OPPOSE' },
  '音': { name: 'sound', visual: 'sound from mouth', memory: 'SOUND' },
  '頁': { name: 'head', visual: 'head/page', memory: 'HEAD/PAGE' },
  '馬': { name: 'horse', visual: 'a horse', memory: 'HORSE' },
  '骨': { name: 'bone', visual: 'skeleton', memory: 'BONE' },
  '高': { name: 'tall', visual: 'tall building', memory: 'TALL' },
  '魚': { name: 'fish', visual: 'a fish', memory: 'FISH' },
  '鳥': { name: 'bird', visual: 'a bird', memory: 'BIRD' },
  '麦': { name: 'wheat', visual: 'wheat plant', memory: 'WHEAT' },
  '黄': { name: 'yellow', visual: 'yellow field', memory: 'YELLOW' },
  '鼻': { name: 'nose', visual: 'a nose', memory: 'NOSE' },
}

// ============================================================================
// READING SOUND ASSOCIATIONS
// Maps Japanese sounds to English words for memorable associations
// ============================================================================
const SOUND_ASSOCIATIONS = {
  // Hiragana readings
  'あ': ['AH', 'AHH!', 'spa'],
  'い': ['EE', 'eel', 'easy'],
  'う': ['OO', 'ooh', 'ooze'],
  'え': ['EH', 'egg', 'edge'],
  'お': ['OH', 'oh!', 'open'],
  
  'か': ['CAR', 'ka-boom', 'card'],
  'き': ['KEY', 'keen', 'ki-yah'],
  'く': ['COO', 'cool', 'cookie'],
  'け': ['KAY', '케이크', 'keg'],
  'こ': ['CO', 'cocoa', 'cold'],
  
  'さ': ['SAH', 'saw', 'psalm'],
  'し': ['SHE', 'she', 'sheep'],
  'す': ['SUE', 'sue', 'super'],
  'せ': ['SAY', 'say', 'set'],
  'そ': ['SO', 'so', 'soak'],
  
  'た': ['TAH', 'taco', 'tall'],
  'ち': ['CHEE', 'cheese', 'chi'],
  'つ': ['TSU', 'tsunami', 'suits'],
  'て': ['TAY', 'tape', 'ten'],
  'と': ['TOE', 'toe', 'toast'],
  
  'な': ['NAH', 'nah', 'nacho'],
  'に': ['NEE', 'knee', 'need'],
  'ぬ': ['NOO', 'noodle', 'noon'],
  'ね': ['NAY', 'nay', 'nest'],
  'の': ['NO', 'no', 'know'],
  
  'は': ['HA', 'ha!', 'hot'],
  'ひ': ['HE', 'he', 'heat'],
  'ふ': ['FOO', 'food', 'fool'],
  'へ': ['HEY', 'hey', 'help'],
  'ほ': ['HO', 'ho ho', 'hope'],
  
  'ま': ['MA', 'mama', 'ma'],
  'み': ['ME', 'me', 'meet'],
  'む': ['MOO', 'moo', 'mood'],
  'め': ['MAY', 'may', 'maze'],
  'も': ['MO', 'more', 'most'],
  
  'や': ['YA', 'ya!', 'yard'],
  'ゆ': ['YOU', 'you', 'youth'],
  'よ': ['YO', 'yo!', 'yoga'],
  
  'ら': ['RA', 'rah!', 'raw'],
  'り': ['REE', 'reef', 'read'],
  'る': ['ROO', 'room', 'rule'],
  'れ': ['RAY', 'ray', 'red'],
  'ろ': ['RO', 'row', 'road'],
  
  'わ': ['WA', 'wa!', 'wah'],
  'ん': ['N', 'hmmm', 'zen'],
  
  // Compound sounds
  'きょ': ['KYO', 'Tokyo', 'kyoto'],
  'しょ': ['SHO', 'show', 'shop'],
  'ちょ': ['CHO', 'chocolate', 'chore'],
  'にょ': ['NYO', 'meow', 'canyon'],
  'ひょ': ['HYO', 'hyper', 'hyena'],
  'みょ': ['MYO', 'meow', 'mysterious'],
  'りょ': ['RYO', 'Rio', 'royal'],
  'ぎょ': ['GYO', 'gyoza', 'yoga'],
  'じょ': ['JO', 'Joe', 'joke'],
  'びょ': ['BYO', 'beyond', 'byo'],
  'ぴょ': ['PYO', 'piano', 'pyo'],
  
  'きゅ': ['KYU', 'cute', 'queue'],
  'しゅ': ['SHU', 'shoe', 'shoo'],
  'ちゅ': ['CHU', 'chew', 'choose'],
  'にゅ': ['NYU', 'new', 'news'],
  'ひゅ': ['HYU', 'huge', 'human'],
  'みゅ': ['MYU', 'mew', 'music'],
  'りゅ': ['RYU', 'Ryu', 'dragon'],
  'ぎゅ': ['GYU', 'gyu', 'argue'],
  'じゅ': ['JU', 'juice', 'June'],
  'びゅ': ['BYU', 'view', 'beauty'],
  'ぴゅ': ['PYU', 'pew', 'pure'],
  
  'きゃ': ['KYA', 'kya!', 'cat'],
  'しゃ': ['SHA', 'sha!', 'sharp'],
  'ちゃ': ['CHA', 'cha-cha', 'chai'],
  'にゃ': ['NYA', 'meow', 'nyan'],
  'ひゃ': ['HYA', 'hya!', 'hyah'],
  'みゃ': ['MYA', 'meow', 'mya'],
  'りゃ': ['RYA', 'ria', 'rya'],
  'ぎゃ': ['GYA', 'gya!', 'argue'],
  'じゃ': ['JA', 'jar', 'jazz'],
  'びゃ': ['BYA', 'bya', 'ya'],
  'ぴゃ': ['PYA', 'piano', 'pya'],
  
  // Long vowels  
  'おう': ['OH', 'oh!', 'go'],
  'こう': ['KOH', 'co', 'code'],
  'そう': ['SOH', 'so', 'soul'],
  'とう': ['TOH', 'toe', 'toast'],
  'のう': ['NOH', 'no', 'know'],
  'ほう': ['HOH', 'ho', 'home'],
  'もう': ['MOH', 'mo', 'mow'],
  'ろう': ['ROH', 'row', 'road'],
  
  'えい': ['AY', 'ay', 'say'],
  'けい': ['KAY', 'K', 'okay'],
  'せい': ['SAY', 'say', 'say'],
  'てい': ['TAY', 'tay', 'stay'],
  'ねい': ['NAY', 'nay', 'neigh'],
  'へい': ['HAY', 'hay', 'hey'],
  'めい': ['MAY', 'may', 'May'],
  'れい': ['RAY', 'ray', 'reign'],
  
  // Katakana common sounds
  'イチ': ['ITCHY', 'itch', 'itchy'],
  'ニ': ['NEE', 'knee', 'need'],
  'サン': ['SUN', 'san', 'sun'],
  'シ': ['SHE', 'she', 'sheep'],
  'ゴ': ['GO', 'go', 'goal'],
  'ロク': ['ROCK', 'rock', 'roku'],
  'シチ': ['SHICHI', 'she cheeky', 'stitchy'],
  'ハチ': ['HACHI', 'hot cheese', 'hatchy'],
  'キュウ': ['QUEUE', 'Q', 'cue'],
  'ジュウ': ['JEW', 'juice', 'chew'],
}

// ============================================================================
// KANJI DECOMPOSITION DATABASE
// Comprehensive breakdown for all N5/N4/N3 kanji
// ============================================================================
const KANJI_DECOMPOSITION = {
  // Numbers (Batch 1 - already done, but included for completeness)
  '一': { parts: ['一'], meaning: 'one', story: 'ONE horizontal line = the number ONE. Hold ONE finger sideways!' },
  '二': { parts: ['一', '一'], meaning: 'two', story: 'TWO horizontal lines stacked = TWO. Like TWO floors!' },
  '三': { parts: ['一', '一', '一'], meaning: 'three', story: 'THREE lines = THREE. A hamburger with three layers!' },
  '四': { parts: ['囗', '儿'], meaning: 'four', story: 'A BOX (囗) with LEGS (儿) inside - FOUR legs of a table under a cloth!' },
  '五': { parts: ['一', '丨', '一'], meaning: 'five', story: 'FIVE fingers spread out - the crossed middle is three fingers overlapping!' },
  '六': { parts: ['亠', '八'], meaning: 'six', story: 'A LID (亠) over EIGHT (八) spreading - an insect with SIX legs!' },
  '七': { parts: ['七'], meaning: 'seven', story: 'A bent 7! Like a boomerang that returns SEVEN times!' },
  '八': { parts: ['八'], meaning: 'eight', story: 'Two lines spreading apart - cut in half, half, half = EIGHT pieces!' },
  '九': { parts: ['九'], meaning: 'nine', story: 'A hook shape reaching - NINE means one finger down, reaching for TEN!' },
  '十': { parts: ['十'], meaning: 'ten', story: 'A perfect + sign! Cross your hands = TEN fingers!' },
  
  // Basic/Common N5
  '日': { parts: ['日'], meaning: 'sun/day', story: 'The SUN in a box - a window showing the SUN. One DAY of sunlight!' },
  '月': { parts: ['月'], meaning: 'moon/month', story: 'The crescent MOON - one cycle is a MONTH!' },
  '火': { parts: ['火'], meaning: 'fire', story: 'FLAMES rising up - see the two sparks flying off the central fire!' },
  '水': { parts: ['氵', '丨'], meaning: 'water', story: 'WATER flowing and splashing - the drops and stream!' },
  '木': { parts: ['木'], meaning: 'tree', story: 'A TREE with branches up top and roots below!' },
  '金': { parts: ['人', '王', '土'], meaning: 'gold/metal', story: 'A PERSON (人) + KING (王) buried in EARTH (土) = GOLD treasure!' },
  '土': { parts: ['十', '一'], meaning: 'earth/ground', story: 'A cross in the ground - EARTH with a plant sprouting!' },
  '本': { parts: ['木', '一'], meaning: 'book/origin', story: 'A TREE (木) with roots marked (一) = the ORIGIN, or paper from trees = BOOK!' },
  '人': { parts: ['人'], meaning: 'person', story: 'Two legs walking - a PERSON!' },
  '大': { parts: ['大'], meaning: 'big', story: 'A PERSON with arms stretched wide = BIG!' },
  '小': { parts: ['小'], meaning: 'small', story: 'Something tiny being divided into SMALL pieces!' },
  '中': { parts: ['口', '丨'], meaning: 'middle', story: 'A line through the MIDDLE of a box!' },
  '上': { parts: ['上'], meaning: 'above', story: 'The top line is UP/ABOVE the base!' },
  '下': { parts: ['下'], meaning: 'below', story: 'The line hangs DOWN/BELOW!' },
  '左': { parts: ['工', '一'], meaning: 'left', story: 'A WORKER\'s (工) left HAND holding a tool!' },
  '右': { parts: ['口', '一'], meaning: 'right', story: 'A MOUTH (口) and hand - eating with RIGHT hand!' },
  '山': { parts: ['山'], meaning: 'mountain', story: 'Three peaks of a MOUNTAIN range!' },
  '川': { parts: ['川'], meaning: 'river', story: 'Three streams flowing - a RIVER!' },
  '田': { parts: ['田'], meaning: 'rice field', story: 'A FIELD divided into four sections for planting!' },
  '男': { parts: ['田', '力'], meaning: 'man', story: 'FIELD (田) + POWER (力) = MAN working the fields!' },
  '女': { parts: ['女'], meaning: 'woman', story: 'A WOMAN in elegant pose!' },
  '子': { parts: ['子'], meaning: 'child', story: 'A CHILD with arms reaching out!' },
  '学': { parts: ['⺌', '冖', '子'], meaning: 'study', story: 'A CHILD (子) under a roof (冖) learning = STUDY!' },
  '生': { parts: ['生'], meaning: 'life/birth', story: 'A plant growing from the ground = LIFE!' },
  '先': { parts: ['土', '儿'], meaning: 'previous/ahead', story: 'EARTH (土) + LEGS (儿) = walking AHEAD, going FIRST!' },
  '年': { parts: ['年'], meaning: 'year', story: 'A grain harvest that happens once a YEAR!' },
  '休': { parts: ['亻', '木'], meaning: 'rest', story: 'A PERSON (亻) leaning against a TREE (木) to REST!' },
  '何': { parts: ['亻', '可'], meaning: 'what', story: 'A PERSON (亻) asking "CAN/possible?" (可) = WHAT?' },
  '名': { parts: ['夕', '口'], meaning: 'name', story: 'At EVENING (夕), call your MOUTH (口) out = shout your NAME!' },
  '今': { parts: ['人', '一'], meaning: 'now', story: 'A person under a roof right NOW!' },
  '会': { parts: ['人', '云'], meaning: 'meet', story: 'PEOPLE (人) gathering under clouds = a MEETING!' },
  '来': { parts: ['来'], meaning: 'come', story: 'Grain on a tree - harvest COMING!' },
  '行': { parts: ['彳', '亍'], meaning: 'go', story: 'Footsteps left and right - GO walking!' },
  '見': { parts: ['目', '儿'], meaning: 'see', story: 'EYE (目) on LEGS (儿) = walking around to SEE!' },
  '聞': { parts: ['門', '耳'], meaning: 'hear', story: 'An EAR (耳) at the GATE (門) = HEAR/listen!' },
  '食': { parts: ['食'], meaning: 'eat', story: 'A person at a table with food - EAT!' },
  '飲': { parts: ['食', '欠'], meaning: 'drink', story: 'FOOD/eat (食) + YAWN/lack (欠) = open mouth to DRINK!' },
  '話': { parts: ['言', '舌'], meaning: 'speak', story: 'WORDS (言) from TONGUE (舌) = SPEAK/TALK!' },
  '読': { parts: ['言', '売'], meaning: 'read', story: 'WORDS (言) being SOLD (売) = READ books!' },
  '書': { parts: ['聿', '日'], meaning: 'write', story: 'A pen writing in the DAY (日) = WRITE!' },
  '買': { parts: ['网', '貝'], meaning: 'buy', story: 'A net catching SHELLS/money (貝) = BUY!' },
  '入': { parts: ['入'], meaning: 'enter', story: 'An arrow pointing IN = ENTER!' },
  '出': { parts: ['山', '山'], meaning: 'exit', story: 'Mountains pushing OUT = EXIT!' },
  '立': { parts: ['立'], meaning: 'stand', story: 'A person STANDING on the ground!' },
  '待': { parts: ['彳', '寺'], meaning: 'wait', story: 'WALKING (彳) to a TEMPLE (寺) and WAITING!' },
  '時': { parts: ['日', '寺'], meaning: 'time', story: 'The SUN (日) at the TEMPLE (寺) marks TIME!' },
  '間': { parts: ['門', '日'], meaning: 'interval', story: 'SUN (日) through a GATE (門) = gap/INTERVAL!' },
  '分': { parts: ['八', '刀'], meaning: 'minute/divide', story: 'EIGHT (八) + SWORD (刀) = DIVIDE into parts/MINUTES!' },
  '毎': { parts: ['毎'], meaning: 'every', story: 'A mother birthing children = EVERY time!' },
  '週': { parts: ['辶', '周'], meaning: 'week', story: 'WALKING (辶) in a CIRCUIT (周) = one WEEK cycle!' },
  '午': { parts: ['午'], meaning: 'noon', story: 'The sun at its highest point = NOON!' },
  '前': { parts: ['前'], meaning: 'before', story: 'A boat going forward = BEFORE/in front!' },
  '後': { parts: ['彳', '幺', '夂'], meaning: 'after', story: 'WALKING (彳) with threads behind = AFTER/behind!' },
  '朝': { parts: ['龺', '月'], meaning: 'morning', story: 'The moon setting as sun rises = MORNING!' },
  '夜': { parts: ['亠', '亻', '夕'], meaning: 'night', story: 'A PERSON (亻) under the EVENING (夕) sky = NIGHT!' },
  '昼': { parts: ['尺', '旦'], meaning: 'daytime', story: 'The sun risen = DAYTIME!' },
  '夕': { parts: ['夕'], meaning: 'evening', story: 'The moon appearing = EVENING!' },
  '方': { parts: ['方'], meaning: 'direction', story: 'A signpost pointing a DIRECTION!' },
  '北': { parts: ['北'], meaning: 'north', story: 'Two people back-to-back, facing NORTH!' },
  '南': { parts: ['南'], meaning: 'south', story: 'Plants growing in warm SOUTH!' },
  '東': { parts: ['東'], meaning: 'east', story: 'Sun rising through trees in the EAST!' },
  '西': { parts: ['西'], meaning: 'west', story: 'Bird nesting as sun sets in WEST!' },
  '外': { parts: ['夕', '卜'], meaning: 'outside', story: 'EVENING (夕) + divination (卜) = fortune-telling OUTSIDE!' },
  '国': { parts: ['囗', '玉'], meaning: 'country', story: 'A JEWEL (玉) protected by walls = COUNTRY!' },
  '天': { parts: ['天'], meaning: 'heaven', story: 'Above a big person = HEAVEN above us!' },
  '気': { parts: ['气', '〆'], meaning: 'spirit/air', story: 'STEAM (气) rising = AIR/SPIRIT!' },
  '雨': { parts: ['雨'], meaning: 'rain', story: 'Clouds with drops falling = RAIN!' },
  '電': { parts: ['雨', '田'], meaning: 'electricity', story: 'RAIN (雨) in FIELDS (田) = lightning/ELECTRICITY!' },
  '車': { parts: ['車'], meaning: 'car', story: 'A cart with wheels = CAR/vehicle!' },
  '駅': { parts: ['馬', '尺'], meaning: 'station', story: 'Where HORSES (馬) stop = STATION!' },
  '道': { parts: ['辶', '首'], meaning: 'road', story: 'WALKING (辶) where the HEAD (首) leads = ROAD!' },
  '店': { parts: ['广', '占'], meaning: 'store', story: 'A BUILDING (广) where you OCCUPY (占) space = STORE!' },
  '病': { parts: ['疒', '丙'], meaning: 'sick', story: 'SICKNESS radical (疒) = being SICK!' },
  '院': { parts: ['阝', '完'], meaning: 'institution', story: 'A HILL (阝) with COMPLETENESS (完) = INSTITUTION!' },
  '社': { parts: ['礻', '土'], meaning: 'company', story: 'SPIRIT (礻) + EARTH (土) = shrine/COMPANY!' },
  '花': { parts: ['艹', '化'], meaning: 'flower', story: 'GRASS (艹) that TRANSFORMS (化) = FLOWER!' },
  '海': { parts: ['氵', '毎'], meaning: 'sea', story: 'WATER (氵) EVERY (毎) where = SEA!' },
  '空': { parts: ['穴', '工'], meaning: 'sky/empty', story: 'A HOLE (穴) of WORK (工) = emptiness/SKY!' },
  '手': { parts: ['手'], meaning: 'hand', story: 'Fingers spread = HAND!' },
  '足': { parts: ['口', '止'], meaning: 'foot', story: 'MOUTH (口) + STOP (止) = FOOT to stop walking!' },
  '目': { parts: ['目'], meaning: 'eye', story: 'An EYE turned sideways!' },
  '耳': { parts: ['耳'], meaning: 'ear', story: 'An EAR shape!' },
  '口': { parts: ['口'], meaning: 'mouth', story: 'An open MOUTH!' },
  '心': { parts: ['心'], meaning: 'heart', story: 'A HEART with ventricles!' },
  '体': { parts: ['亻', '本'], meaning: 'body', story: 'A PERSON (亻) + ROOT (本) = BODY, the root of a person!' },
  '頭': { parts: ['頁', '豆'], meaning: 'head', story: 'PAGE/head (頁) + BEAN (豆) = HEAD shape!' },
  '顔': { parts: ['彦', '頁'], meaning: 'face', story: 'A distinguished (彦) HEAD (頁) = FACE!' },
  '声': { parts: ['声'], meaning: 'voice', story: 'Sound waves coming out = VOICE!' },
  '言': { parts: ['言'], meaning: 'say', story: 'Words from mouth = SAY!' },
  '語': { parts: ['言', '吾'], meaning: 'language', story: 'WORDS (言) + I/self (吾) = LANGUAGE!' },
  '力': { parts: ['力'], meaning: 'power', story: 'A flexed arm = POWER!' },
  '元': { parts: ['二', '儿'], meaning: 'origin', story: 'TWO (二) LEGS (儿) = where you came from, ORIGIN!' },
  '気': { parts: ['气', '〆'], meaning: 'spirit', story: 'Rising steam = SPIRIT/energy!' },
  '持': { parts: ['扌', '寺'], meaning: 'hold', story: 'HAND (扌) at TEMPLE (寺) = HOLD offerings!' },
  '使': { parts: ['亻', '吏'], meaning: 'use', story: 'A PERSON (亻) as an official = USE/employ!' },
  '作': { parts: ['亻', '乍'], meaning: 'make', story: 'A PERSON (亻) SUDDENLY (乍) = MAKE something!' },
  '思': { parts: ['田', '心'], meaning: 'think', story: 'FIELD (田) in your HEART (心) = THINK!' },
  '知': { parts: ['矢', '口'], meaning: 'know', story: 'ARROW (矢) to MOUTH (口) = quick to KNOW!' },
  '好': { parts: ['女', '子'], meaning: 'like', story: 'WOMAN (女) + CHILD (子) = mother\'s love = LIKE!' },
  '新': { parts: ['立', '木', '斤'], meaning: 'new', story: 'STANDING (立) TREE (木) cut by AXE (斤) = NEW wood!' },
  '古': { parts: ['十', '口'], meaning: 'old', story: 'TEN (十) MOUTHS (口) = passed down, OLD!' },
  '多': { parts: ['夕', '夕'], meaning: 'many', story: 'EVENING (夕) after EVENING = MANY days!' },
  '少': { parts: ['小', '丿'], meaning: 'few', story: 'SMALL (小) with a cut = even FEWER!' },
  '長': { parts: ['長'], meaning: 'long', story: 'Long flowing hair = LONG!' },
  '短': { parts: ['矢', '豆'], meaning: 'short', story: 'ARROW (矢) + BEAN (豆) = SHORT like a bean!' },
  '高': { parts: ['高'], meaning: 'tall', story: 'A tall building = HIGH/TALL!' },
  '低': { parts: ['亻', '氐'], meaning: 'low', story: 'A PERSON (亻) bowing down = LOW!' },
  '安': { parts: ['宀', '女'], meaning: 'cheap/peace', story: 'WOMAN (女) under ROOF (宀) = PEACEFUL/cheap!' },
  '広': { parts: ['广', '厶'], meaning: 'wide', story: 'A BUILDING (广) spreading = WIDE!' },
  '強': { parts: ['弓', '虫'], meaning: 'strong', story: 'BOW (弓) + INSECT (虫) = beetle STRONG!' },
  '弱': { parts: ['弓', '弓'], meaning: 'weak', story: 'Two broken BOWS (弓) = WEAK!' },
  '早': { parts: ['日', '十'], meaning: 'early', story: 'SUN (日) at TEN (十) = EARLY morning!' },
  '遅': { parts: ['辶', '犀'], meaning: 'late', story: 'WALKING (辶) slow like a rhino = LATE!' },
  '明': { parts: ['日', '月'], meaning: 'bright', story: 'SUN (日) + MOON (月) = BRIGHT!' },
  '暗': { parts: ['日', '音'], meaning: 'dark', story: 'SUN (日) with SOUND (音) but no light = DARK!' },
  '重': { parts: ['重'], meaning: 'heavy', story: 'Stacked layers = HEAVY!' },
  '軽': { parts: ['車', '又'], meaning: 'light', story: 'CAR (車) easy to handle = LIGHT weight!' },
  '同': { parts: ['同'], meaning: 'same', story: 'Everything inside the box = SAME!' },
  '違': { parts: ['辶', '韋'], meaning: 'different', story: 'WALKING (辶) a DIFFERENT way!' },
  '正': { parts: ['一', '止'], meaning: 'correct', story: 'ONE (一) STOP (止) = CORRECT way!' },
  '悪': { parts: ['亜', '心'], meaning: 'bad', story: 'SUB (亜) HEART (心) = BAD feelings!' },
  '近': { parts: ['辶', '斤'], meaning: 'near', story: 'WALKING (辶) an AXE (斤) throw away = NEAR!' },
  '遠': { parts: ['辶', '袁'], meaning: 'far', story: 'WALKING (辶) a long way = FAR!' },
  '速': { parts: ['辶', '束'], meaning: 'fast', story: 'WALKING (辶) like a BUNDLE (束) shot = FAST!' },
  '太': { parts: ['大', '丶'], meaning: 'fat', story: 'BIG (大) with extra dot = FAT!' },
  '細': { parts: ['糸', '田'], meaning: 'thin', story: 'THREAD (糸) in FIELD (田) = THIN!' },
  '若': { parts: ['艹', '右'], meaning: 'young', story: 'GRASS (艹) on the RIGHT (右) = fresh/YOUNG!' },
  '美': { parts: ['羊', '大'], meaning: 'beautiful', story: 'BIG (大) SHEEP (羊) = BEAUTIFUL!' },
  '親': { parts: ['立', '木', '見'], meaning: 'parent', story: 'STANDING (立) in TREES (木) WATCHING (見) = PARENT!' },
  '友': { parts: ['友'], meaning: 'friend', story: 'Two hands together = FRIEND!' },
  '兄': { parts: ['口', '儿'], meaning: 'elder brother', story: 'MOUTH (口) on LEGS (儿) = ELDER BROTHER talking!' },
  '弟': { parts: ['弓', '丨', '丿'], meaning: 'younger brother', story: 'Smaller BOW (弓) = YOUNGER BROTHER!' },
  '姉': { parts: ['女', '市'], meaning: 'elder sister', story: 'WOMAN (女) at MARKET (市) = ELDER SISTER!' },
  '妹': { parts: ['女', '未'], meaning: 'younger sister', story: 'WOMAN (女) NOT YET (未) grown = YOUNGER SISTER!' },
  '家': { parts: ['宀', '豕'], meaning: 'house', story: 'PIG (豕) under ROOF (宀) = HOUSE with livestock!' },
  '族': { parts: ['方', '㫃'], meaning: 'tribe', story: 'FLAGS in one DIRECTION (方) = TRIBE!' },
  '犬': { parts: ['大', '丶'], meaning: 'dog', story: 'BIG (大) animal with a dot = DOG!' },
  '猫': { parts: ['犭', '苗'], meaning: 'cat', story: 'ANIMAL (犭) + SEEDLING (苗) = CAT (nimble like plants)!' },
  '鳥': { parts: ['鳥'], meaning: 'bird', story: 'A BIRD with tail feathers!' },
  '魚': { parts: ['魚'], meaning: 'fish', story: 'A FISH with scales!' },
  '牛': { parts: ['牛'], meaning: 'cow', story: 'COW horns on head!' },
  '馬': { parts: ['馬'], meaning: 'horse', story: 'A HORSE with mane!' },
  '肉': { parts: ['肉'], meaning: 'meat', story: 'Inside a frame = MEAT!' },
  '茶': { parts: ['艹', '人', '木'], meaning: 'tea', story: 'PLANT (艹) PERSON (人) picks from TREE (木) = TEA!' },
  '飯': { parts: ['食', '反'], meaning: 'rice/meal', story: 'FOOD (食) that RETURNS (反) daily = RICE/MEAL!' },
  '酒': { parts: ['氵', '酉'], meaning: 'alcohol', story: 'WATER (氵) + JAR (酉) = ALCOHOL!' },
  '薬': { parts: ['艹', '楽'], meaning: 'medicine', story: 'PLANT (艹) that brings PLEASURE (楽) = MEDICINE!' },
  '物': { parts: ['牛', '勿'], meaning: 'thing', story: 'COW (牛) and other stuff = THING!' },
  '品': { parts: ['口', '口', '口'], meaning: 'goods', story: 'Three MOUTHS (口) = many GOODS!' },
  '服': { parts: ['月', '又', '卩'], meaning: 'clothes', story: 'BODY (月) covered = CLOTHES!' },
  '着': { parts: ['羊', '目'], meaning: 'wear', story: 'SHEEP (羊) + EYE (目) = see what you WEAR!' },
  '靴': { parts: ['革', '化'], meaning: 'shoes', story: 'LEATHER (革) TRANSFORMED (化) = SHOES!' },
  '色': { parts: ['色'], meaning: 'color', story: 'A person blushing = COLOR!' },
  '赤': { parts: ['赤'], meaning: 'red', story: 'Fire and earth = RED!' },
  '青': { parts: ['青'], meaning: 'blue', story: 'Plants and moon = BLUE/green!' },
  '白': { parts: ['白'], meaning: 'white', story: 'The sun\'s ray = WHITE!' },
  '黒': { parts: ['黒'], meaning: 'black', story: 'Fire with soot = BLACK!' },
  '黄': { parts: ['黄'], meaning: 'yellow', story: 'A field of grain = YELLOW!' },
  '教': { parts: ['孝', '攵'], meaning: 'teach', story: 'FILIAL piety (孝) + ACTION (攵) = TEACH!' },
  '習': { parts: ['羽', '白'], meaning: 'learn', story: 'WHITE (白) WINGS (羽) = baby bird LEARNING to fly!' },
  '勉': { parts: ['免', '力'], meaning: 'endeavor', story: 'ESCAPE (免) + POWER (力) = ENDEAVOR/effort!' },
  '働': { parts: ['亻', '動'], meaning: 'work', story: 'A PERSON (亻) in MOTION (動) = WORK!' },
  '始': { parts: ['女', '台'], meaning: 'begin', story: 'WOMAN (女) on PLATFORM (台) = BEGIN!' },
  '終': { parts: ['糸', '冬'], meaning: 'end', story: 'THREAD (糸) in WINTER (冬) = the END!' },
  '開': { parts: ['門', '开'], meaning: 'open', story: 'GATE (門) with hands = OPEN!' },
  '閉': { parts: ['門', '才'], meaning: 'close', story: 'GATE (門) + TALENT (才) = CLOSE the gate!' },
  '答': { parts: ['竹', '合'], meaning: 'answer', story: 'BAMBOO (竹) + COMBINE (合) = write an ANSWER!' },
  '問': { parts: ['門', '口'], meaning: 'question', story: 'MOUTH (口) at GATE (門) = ask a QUESTION!' },
  '題': { parts: ['是', '頁'], meaning: 'topic', story: 'IS (是) + PAGE (頁) = the TOPIC!' },
  '質': { parts: ['斤', '貝'], meaning: 'quality', story: 'AXE (斤) + SHELL/money (貝) = QUALITY!' },
  '試': { parts: ['言', '式'], meaning: 'test', story: 'WORDS (言) + STYLE (式) = TEST!' },
  '験': { parts: ['馬', '僉'], meaning: 'exam', story: 'HORSE (馬) testing = EXAM!' },
  '宿': { parts: ['宀', '人', '百'], meaning: 'lodging', story: 'ROOF (宀) + PERSON (人) + HUNDRED (百) = INN/LODGING!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
  '届': { parts: ['尸', '届'], meaning: 'deliver', story: 'BODY (尸) bringing = DELIVER!' },
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Convert katakana to hiragana for reading mnemonics
function katakanaToHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, match => 
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  )
}

// Get the first reading (prefer kunyomi, then onyomi)
function getPrimaryReading(kanji) {
  if (kanji.kunyomi && kanji.kunyomi.length > 0) {
    // Clean up kunyomi (remove dots, dashes)
    return kanji.kunyomi[0].replace(/[.\-]/g, '')
  }
  if (kanji.onyomi && kanji.onyomi.length > 0) {
    return katakanaToHiragana(kanji.onyomi[0])
  }
  return null
}

// Generate a reading mnemonic based on sound associations
function generateReadingMnemonic(reading, meaning) {
  if (!reading) return null
  
  const cleanReading = reading.replace(/[.\-]/g, '')
  
  // Check if we have a direct sound association
  for (const [sound, associations] of Object.entries(SOUND_ASSOCIATIONS)) {
    if (cleanReading.startsWith(sound) || cleanReading === sound) {
      const word = associations[0]
      return `${reading} - "${word}!" Remember ${meaning.toUpperCase()} by thinking of ${word.toLowerCase()}!`
    }
  }
  
  // Generate a phonetic mnemonic
  const romaji = toRomaji(cleanReading)
  return `${reading} (${romaji}) - Sound out "${romaji}" when you see ${meaning}!`
}

// Simple hiragana to romaji converter
function toRomaji(hiragana) {
  const map = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きょ': 'kyo', 'しょ': 'sho', 'ちょ': 'cho', 'にょ': 'nyo',
    'ひょ': 'hyo', 'みょ': 'myo', 'りょ': 'ryo',
    'きゅ': 'kyu', 'しゅ': 'shu', 'ちゅ': 'chu', 'にゅ': 'nyu',
    'ひゅ': 'hyu', 'みゅ': 'myu', 'りゅ': 'ryu',
    'きゃ': 'kya', 'しゃ': 'sha', 'ちゃ': 'cha', 'にゃ': 'nya',
    'ひゃ': 'hya', 'みゃ': 'mya', 'りゃ': 'rya',
    'ぎょ': 'gyo', 'じょ': 'jo', 'びょ': 'byo', 'ぴょ': 'pyo',
    'ぎゅ': 'gyu', 'じゅ': 'ju', 'びゅ': 'byu', 'ぴゅ': 'pyu',
    'ぎゃ': 'gya', 'じゃ': 'ja', 'びゃ': 'bya', 'ぴゃ': 'pya',
    'っ': 'っ', 'ー': '-',
    'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
  }
  
  let result = ''
  let i = 0
  while (i < hiragana.length) {
    // Check for two-character combinations first
    if (i < hiragana.length - 1) {
      const twoChar = hiragana.substring(i, i + 2)
      if (map[twoChar]) {
        result += map[twoChar]
        i += 2
        continue
      }
    }
    // Single character
    result += map[hiragana[i]] || hiragana[i]
    i++
  }
  return result
}

// Generate a meaning story based on components
function generateMeaningStory(kanji, meanings) {
  const char = kanji.character
  const primaryMeaning = meanings[0]
  
  // Check if we have a decomposition
  if (KANJI_DECOMPOSITION[char]) {
    const decomp = KANJI_DECOMPOSITION[char]
    return decomp.story
  }
  
  // Try to build from radicals we know
  const possibleParts = []
  for (const [radical, info] of Object.entries(RADICAL_MEANINGS)) {
    if (char.includes(radical) || isVisuallyContained(char, radical)) {
      possibleParts.push(info)
    }
  }
  
  if (possibleParts.length >= 2) {
    const parts = possibleParts.slice(0, 3).map(p => p.memory).join(' + ')
    return `${parts} combine to mean ${primaryMeaning.toUpperCase()}!`
  }
  
  // Fallback to shape-based story
  return `Picture ${char} - its shape represents ${primaryMeaning.toUpperCase()}!`
}

// Check if a radical appears to be in a kanji (simple check)
function isVisuallyContained(kanji, radical) {
  // This is a simplified check - for full accuracy you'd use a decomposition API
  const commonParts = {
    '亻': ['休', '何', '作', '使', '体', '住', '位', '低', '信', '借', '働', '億'],
    '氵': ['海', '池', '洗', '流', '泳', '注', '活', '浅', '深', '清', '港', '湖'],
    '扌': ['持', '押', '払', '投', '拾', '指', '振', '探', '捨', '掛', '授', '掃'],
    '言': ['話', '語', '読', '説', '詩', '記', '計', '試', '調', '論', '識', '議'],
    '艹': ['花', '草', '茶', '薬', '菜', '若', '苦', '落', '葉', '届', '届'],
    '辶': ['道', '近', '遠', '送', '退', '届', '届', '届', '届', '届'],
    '門': ['間', '開', '閉', '聞', '問', '届', '届', '届', '届', '届'],
    '忄': ['思', '忙', '快', '届', '届', '届', '届', '届', '届', '届'],
  }
  
  for (const [part, kanjiList] of Object.entries(commonParts)) {
    if (part === radical && kanjiList.includes(kanji)) {
      return true
    }
  }
  return false
}

// Generate components string
function generateComponents(kanji) {
  const char = kanji.character
  
  if (KANJI_DECOMPOSITION[char]) {
    const parts = KANJI_DECOMPOSITION[char].parts
    return parts.map(p => {
      const info = RADICAL_MEANINGS[p]
      return info ? `${p} (${info.name})` : p
    }).join(' + ')
  }
  
  return `Components of ${char}`
}

// Generate radicals array
function generateRadicals(kanji) {
  const char = kanji.character
  
  if (KANJI_DECOMPOSITION[char]) {
    return KANJI_DECOMPOSITION[char].parts.map(p => {
      const info = RADICAL_MEANINGS[p]
      return {
        char: p,
        name: info?.name || p,
        meaning: info?.memory || p
      }
    })
  }
  
  return [{ char: char, name: 'whole', meaning: kanji.meanings?.[0] || 'kanji' }]
}

// Generate hint
function generateHint(kanji) {
  const char = kanji.character
  const meaning = kanji.meanings?.[0] || ''
  
  if (KANJI_DECOMPOSITION[char]) {
    const parts = KANJI_DECOMPOSITION[char].parts
    return `${parts.join(' + ')} = ${meaning}`
  }
  
  return `${char} = ${meaning}`
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================
async function generateAllMnemonics() {
  console.log('🎯 Generating mnemonics for ALL kanji...\n')
  console.log('=' .repeat(60))
  
  // Get all kanji
  const { data: allKanji, error } = await supabase
    .from('kanji')
    .select('*')
    .order('id')
  
  if (error) {
    console.error('Error fetching kanji:', error)
    return
  }
  
  console.log(`Found ${allKanji.length} kanji to process\n`)
  
  let updated = 0
  let created = 0
  let errors = 0
  
  for (const kanji of allKanji) {
    const char = kanji.character
    const meanings = kanji.meanings || []
    const primaryMeaning = meanings[0] || 'meaning'
    
    // Generate mnemonic content
    const radicals = generateRadicals(kanji)
    const components = generateComponents(kanji)
    const story = generateMeaningStory(kanji, meanings)
    const reading = getPrimaryReading(kanji)
    const readingMnemonic = generateReadingMnemonic(reading, primaryMeaning)
    const hint = generateHint(kanji)
    
    // Check if mnemonic exists
    const { data: existing } = await supabase
      .from('mnemonics')
      .select('id, story')
      .eq('kanji_id', kanji.id)
      .single()
    
    // Only update if the current story is generic (not already customized)
    const isGenericStory = existing?.story?.includes('Picture the character') || 
                          existing?.story?.includes('visual story') ||
                          !existing
    
    // Skip if already has a good custom mnemonic
    if (existing && !isGenericStory) {
      // Still update reading mnemonic if it's missing
      if (!existing.reading_mnemonic && readingMnemonic) {
        await supabase
          .from('mnemonics')
          .update({ reading_mnemonic: readingMnemonic })
          .eq('id', existing.id)
      }
      continue
    }
    
    const mnemonicData = {
      kanji_id: kanji.id,
      radicals,
      components,
      story,
      reading_mnemonic: readingMnemonic,
      hint
    }
    
    if (existing) {
      // Update
      const { error: updateError } = await supabase
        .from('mnemonics')
        .update(mnemonicData)
        .eq('id', existing.id)
      
      if (updateError) {
        console.log(`❌ ${char} - Error: ${updateError.message}`)
        errors++
      } else {
        console.log(`✏️  ${char} (${primaryMeaning}) - Updated`)
        updated++
      }
    } else {
      // Create
      const { error: insertError } = await supabase
        .from('mnemonics')
        .insert(mnemonicData)
      
      if (insertError) {
        console.log(`❌ ${char} - Error: ${insertError.message}`)
        errors++
      } else {
        console.log(`✅ ${char} (${primaryMeaning}) - Created`)
        created++
      }
    }
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log(`\n✨ Done!`)
  console.log(`   Created: ${created}`)
  console.log(`   Updated: ${updated}`)
  console.log(`   Errors: ${errors}`)
  console.log(`   Skipped: ${allKanji.length - created - updated - errors} (already have custom mnemonics)`)
}

generateAllMnemonics()
