// Mnemonic data for kanji - includes radical breakdown and memory stories
// Format: kanji -> { radicals: [...], story: "..." }

export const MNEMONICS = {
  '日': {
    radicals: [
      { char: '日', name: 'sun', meaning: 'sun/day' }
    ],
    components: 'A window with the sun shining through',
    story: "Picture a window (the outer box □) with the sun peeking through the middle. Every DAY, you look out your window and see the SUN rise. The horizontal line in the middle is the horizon where the sun sits.",
    hint: "Box with a line = window showing the sun",
    reading: "にち (nichi) - When you look at the sun through a window, you SNEEZE! 'Ah-NICHI!' The sun is so bright it makes you sneeze every day."
  },
  
  '水': {
    radicals: [
      { char: '水', name: 'water', meaning: 'water' }
    ],
    components: 'A river flowing with splashes',
    story: "Picture a river with the vertical line as the main current flowing down, and the strokes on each side as WATER splashing outward as it hits rocks. The curves show the dynamic flow of water in motion.",
    hint: "River with splashes = water",
    reading: "みず (mizu) - 'MIZU me!' you shout as water splashes in your face. The water missed you... wait, no it didn't! Mizu!"
  },

  '山': {
    radicals: [
      { char: '山', name: 'mountain', meaning: 'mountain' }
    ],
    components: 'Three mountain peaks',
    story: "This kanji looks exactly like three MOUNTAIN peaks! The middle peak is the tallest, with two smaller peaks on each side. Picture yourself hiking and seeing this mountain range in the distance.",
    hint: "Three peaks = mountain",
    reading: "さん (san) - Mt. Fuji is called Fuji-SAN! Mountains are addressed respectfully with SAN, just like people. 'Hello, Mountain-san!'"
  },

  '火': {
    radicals: [
      { char: '火', name: 'fire', meaning: 'fire' }
    ],
    components: 'A person with flames',
    story: "Picture a person (人) sitting with FIRE burning on both sides of them. They're warming themselves by a campfire. The dots are the sparks flying up into the night sky.",
    hint: "Person with sparks = fire",
    reading: "か (ka) - A CAw! A crow (KA-KA!) flies over the fire. The fire is so hot, even the crows are cawing about it! 'KA! KA!'"
  },

  '木': {
    radicals: [
      { char: '木', name: 'tree', meaning: 'tree/wood' }
    ],
    components: 'A tree with branches and roots',
    story: "This is a simple TREE! The horizontal line is the branches spreading out, the vertical line is the trunk, and the diagonal strokes at the bottom are the roots digging into the ground.",
    hint: "Trunk + branches + roots = tree",
    reading: "もく (moku) - The tree got hit by lightning and now it can't MOve or talK (MOKU). It's just standing there, silent and still like all trees."
  },

  '月': {
    radicals: [
      { char: '月', name: 'moon', meaning: 'moon/month' }
    ],
    components: 'A crescent moon',
    story: "Picture a crescent MOON in the night sky. The two horizontal lines inside are the craters you can see on the moon's surface. Every MONTH, the moon goes through its phases.",
    hint: "Crescent shape with craters = moon",
    reading: "げつ (getsu) - You GET SUper excited every month when you see the full moon! 'I GETSU see the moon tonight!'"
  },

  '人': {
    radicals: [
      { char: '人', name: 'person', meaning: 'person' }
    ],
    components: 'A person walking',
    story: "This kanji shows a PERSON walking! The two strokes are like legs mid-stride. Picture someone taking a big step forward, their legs spread apart as they walk.",
    hint: "Two legs walking = person",
    reading: "じん (jin) - Every person wears JEANS! JIN sounds like jeans. Picture a person walking around in their favorite pair of jeans."
  },

  '口': {
    radicals: [
      { char: '口', name: 'mouth', meaning: 'mouth/opening' }
    ],
    components: 'An open mouth',
    story: "A simple square representing a MOUTH wide open! Picture someone saying 'ahhhh' at the doctor, their mouth forming this perfect square shape.",
    hint: "Square opening = mouth",
    reading: "こう (kou) - Open your mouth and COUgh! 'KOU KOU!' The doctor says to open wide and cough."
  },

  '一': {
    radicals: [
      { char: '一', name: 'one', meaning: 'one' }
    ],
    components: 'A single horizontal line',
    story: "ONE horizontal line = the number ONE. It's the simplest kanji! Just one single line. Picture holding up one finger horizontally.",
    hint: "One line = one",
    reading: "いち (ichi) - 'ITCHY!' You have ONE itchy spot. Just one! いち = one itch!"
  },

  '二': {
    radicals: [
      { char: '二', name: 'two', meaning: 'two' }
    ],
    components: 'Two horizontal lines',
    story: "TWO horizontal lines stacked = the number TWO. The top line is shorter (like a small roof) and the bottom is longer (like the ground). Two levels!",
    hint: "Two lines = two",
    reading: "に (ni) - Your KNEE has TWO parts - upper and lower leg meeting at the knee! NI = knee = two parts."
  },

  '三': {
    radicals: [
      { char: '三', name: 'three', meaning: 'three' }
    ],
    components: 'Three horizontal lines',
    story: "THREE horizontal lines = the number THREE. Think of it as a hamburger: top bun, patty, bottom bun. Three delicious layers!",
    hint: "Three lines = three",
    reading: "さん (san) - The THREE little pigs built houses with SAND! SAN = sand = three pigs playing in the sand."
  },

  '大': {
    radicals: [
      { char: '大', name: 'big', meaning: 'big/large' }
    ],
    components: 'A person with arms spread wide',
    story: "Picture a person (人) with their arms stretched out wide showing you how BIG something is! 'It was THIS big!' they say, arms spread as far as possible.",
    hint: "Person with spread arms = big",
    reading: "だい (dai) - 'Oh my, what a big person! They could DIE from being so big!' DAI = big enough to die!"
  },

  '小': {
    radicals: [
      { char: '小', name: 'small', meaning: 'small/little' }
    ],
    components: 'Something being divided into smaller pieces',
    story: "The vertical line is being divided by the two small dots/strokes on each side, making it SMALL. Think of something being broken down into tiny pieces.",
    hint: "Divided = small",
    reading: "しょう (shou) - SHOUt really quietly because you're so small! 'shou...' whispers the tiny voice. Small things make small sounds."
  },

  '中': {
    radicals: [
      { char: '口', name: 'mouth/box', meaning: 'enclosure' },
      { char: '丨', name: 'line', meaning: 'stick' }
    ],
    components: 'A line through the middle of a box',
    story: "A line going right through the MIDDLE of a box! The line pierces through the center perfectly. It's hitting the bullseye, right in the MIDDLE.",
    hint: "Line through center = middle",
    reading: "ちゅう (chuu) - CHEW your food in the middle of your mouth! CHU = chewing right in the center!"
  },

  '上': {
    radicals: [
      { char: '上', name: 'above', meaning: 'above/up' }
    ],
    components: 'A line above a base',
    story: "The short line is UP ABOVE the longer line below! Picture a table with something sitting on TOP of it. The small line is pointing upward.",
    hint: "Something on top = above/up",
    reading: "じょう (jou) - JOe is UP on the roof! 'JOU! Get down from there!' JOU = up high like Joe."
  },

  '下': {
    radicals: [
      { char: '下', name: 'below', meaning: 'below/down' }
    ],
    components: 'A line below pointing down',
    story: "The opposite of 上! The short line hangs DOWN BELOW. Picture something hanging underneath a shelf, pointing toward the ground. Going DOWN!",
    hint: "Something hanging down = below/down",
    reading: "か (ka) - A CAr fell down below! KA-crash! Down it goes!"
  },

  '川': {
    radicals: [
      { char: '川', name: 'river', meaning: 'river' }
    ],
    components: 'Three streams of water flowing',
    story: "Three vertical lines flowing downward like a RIVER! Picture three streams of water running down a mountainside, joining together to form a river.",
    hint: "Three flowing lines = river",
    reading: "かわ (kawa) - KAWAsaki motorcycles ride along the river! KAWA = river where Kawasakis zoom by."
  },

  '田': {
    radicals: [
      { char: '田', name: 'rice field', meaning: 'rice field' }
    ],
    components: 'A field divided into four plots',
    story: "A RICE FIELD divided into four sections by irrigation channels! Japanese farmers divided their fields this way to manage water flow. Picture looking down at farmland from above.",
    hint: "Grid pattern = rice field",
    reading: "た (ta) - 'TA-DA!' says the farmer showing off his rice field. TA = ta-da, look at my beautiful field!"
  },

  '本': {
    radicals: [
      { char: '木', name: 'tree', meaning: 'tree' },
      { char: '一', name: 'one', meaning: 'one/root' }
    ],
    components: 'A tree with its root marked',
    story: "A tree (木) with a line marking its ROOT at the base. BOOKS were originally made from tree roots/wood. This is the ORIGIN, the ROOT of things - that's why it also means 'book' (the root of knowledge) and 'Japan' (本 = origin).",
    hint: "Tree + root = book/origin",
    reading: "ほん (hon) - HONDA makes cars in JAPAN (nihon)! HON = the origin of Honda is Japan!"
  },

  '休': {
    radicals: [
      { char: '亻', name: 'person radical', meaning: 'person' },
      { char: '木', name: 'tree', meaning: 'tree' }
    ],
    components: 'A person leaning against a tree',
    story: "A person (亻) RESTING against a tree (木)! After a long walk, you find a nice tree to lean on and take a REST. The perfect way to relax in nature.",
    hint: "Person + tree = rest",
    reading: "きゅう (kyuu) - Take a rest in the QUEUE! KYUU = resting while waiting in line. 'I need a KYUU break!'"
  },

  '今': {
    radicals: [
      { char: '亼', name: 'cover', meaning: 'cover/roof' },
      { char: 'ラ', name: 'katakana ra', meaning: 'additional strokes' }
    ],
    components: 'The present moment captured',
    story: "Picture a roof (亼) covering this exact moment - the NOW! Under this roof is the present, right here, right NOW. Everything happening at this instant.",
    hint: "This moment captured = now",
    reading: "こん (kon) - A CON artist lives in the NOW! KON = 'I'm conning you right NOW!' They only think about the present moment."
  },
}

// Helper function to get mnemonic for a kanji
export function getMnemonic(kanji) {
  return MNEMONICS[kanji] || null
}

// Generate a simple mnemonic if none exists
export function generateSimpleMnemonic(kanji, meanings = []) {
  const meaning = meanings[0] || 'this concept'
  return {
    radicals: [],
    components: `The kanji ${kanji}`,
    story: `This kanji (${kanji}) represents "${meaning}". Study its shape and associate it with the meaning. Practice writing it to build muscle memory!`,
    hint: `${kanji} = ${meaning}`
  }
}
