# Kanji React App

This is a React app (Vite) to study kanji. It shows kanji grouped by JLPT level, a flashcard study mode and a quiz mode.

Features implemented:
- Homepage: kanji grouped by JLPT level (uses `kanjiapi.dev` to fetch details)
- Study (flashcards): first card shows the kanji, meaning, onyomi/kunyomi; subsequent cards show vocabulary with flip to reveal reading + meaning
- Practise writing
- Quiz: typed answers for kanji → meaning, vocab → reading, vocab → meaning

Two kanji are included as a starter: `日` and `水`. Vocabulary for these kanji is in `src/data/vocab.js`.

To run:

1. cd into the project

```bash
cd Kanji/kanji-react-app
```

2. Install dependencies and start dev server

```bash
npm install
npm run dev
```

Open the printed localhost URL in your browser.

Notes:
- The app fetches kanji details from https://kanjiapi.dev; if unavailable, minimal fallback data is used.
- For a larger set of kanji, expand the START_KANJI list in `src/App.jsx` and add vocabulary to `src/data/vocab.js`.
