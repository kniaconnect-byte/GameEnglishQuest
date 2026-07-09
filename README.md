# English Quest Grade 5 - Premium Educational Game
**Brand**: kniaWorld  
**Platform**: React + Vite, PWA, Offline-First  
**Target Audience**: 10–12 Years Old (Grade 5 Elementary)

English Quest Grade 5 is a fully offline-first gamified learning app styled like a high-end educational console product. It guides children through 5 key chapters aligned with the English curriculum, featuring rich SVG vector illustrations, custom synthesized audio, accessibility options, and local progress tracking.

---

## 🚀 Key Features

*   **Offline-First & PWA Enabled**: Instant service-worker caching allows full standalone installations and gameplay without an active internet connection.
*   **Tactile Audio Synthesizer**: Uses lightweight browser Web Audio API oscillator synthesis to play retro sound effects (click, correct ping, wrong buzz, victory arpeggios) offline with zero external audio assets.
*   **7 Premium Mini-Game Engines**:
    1.  **Multiple Choice Quest (Quiz)**: Contextual vocabulary and grammar questions.
    2.  **Guess Picture (GuessImage)**: Vocabulary-to-visual mapping using flat vector SVGs.
    3.  **Word Matcher (Matching)**: Connecting English words with Indonesian meanings.
    4.  **Word Filler (DragDrop)**: Touch-friendly "tap-to-place" sentence blanks.
    5.  **Reading Comprehension (Reading)**: Grid layout with split story panels and checkable answers.
    6.  **Spelling Test (Writing)**: Text typing prompts with robust, punctuation-immune spelling engines.
    7.  **Sentence Builder (CompleteSentence)**: Rearranging word scrambles into perfect sentences.
*   **Reward Milestones & Statistics**: Unlocks badges, achievements, experience points (XP), star counts, and coin wallets saved to local persistence automatically.
*   **Premium Accessibility (A11y)**: Features toggles for High Contrast mode, Reduced Motion parameters, and large, comfortable button target heights (>= 52px).

---

## 📂 Project Structure

```bash
/public
  ├── manifest.json       # PWA Configuration & theme rules
  └── sw.js               # Service worker caching for offline assets
/src
  ├── assets              # Graphic files and build assets
  ├── components
  │   ├── MiniGames/      # Modular learning game components
  │   └── SVGIllustrations.tsx # Handcrafted vector illustrations (no emojis!)
  ├── context
  │   └── GameContext.tsx # Central state machine & local persistence
  ├── data
  │   ├── chapter1.ts     # Chapter 1 Vocabulary & Exercises
  │   ├── chapter2.ts     # Chapter 2 Vocabulary & Exercises
  │   ├── chapter3.ts     # Chapter 3 Vocabulary & Exercises
  │   ├── chapter4.ts     # Chapter 4 Vocabulary & Exercises
  │   ├── chapter5.ts     # Chapter 5 Vocabulary & Exercises
  │   └── index.ts        # Central curriculum exporter
  ├── pages
  │   ├── Splash.tsx      # Welcome profile setup
  │   ├── Home.tsx        # Central student HUD & dashboard
  │   ├── ChapterSelect.tsx # Chapter selection timeline
  │   ├── Settings.tsx    # Audio, Contrast & Reset controls
  │   ├── Profile.tsx     # Progress report card & Badges showcase
  │   ├── Result.tsx      # Reward splash & XP progression
  │   └── Review.tsx      # 3D Vocabulary Flashcards deck
  ├── types.ts            # Type-safe schemas and declarations
  ├── utils
  │   └── audio.ts        # 8-Bit Web Audio oscillator sound generator
  ├── App.tsx             # Root element containing page state routing
  ├── index.css           # Styling with custom animations and 3D utilities
  └── main.tsx            # App entry anchor
/metadata.json            # AI Studio applet permissions & title
/vite.config.ts           # Vite Bundler settings
```

---

## ✍️ How to Edit or Add Educational Content

Educational content is completely separated from components. To add new vocabulary terms, sentences, or questions, modify files inside the **`src/data/`** directory.

### Example: Adding a Vocabulary Word to Chapter 1
Open `src/data/chapter1.ts`, locate the `vocabulary` array, and append a new `VocabularyItem`:

```typescript
export const chapter1Vocabulary: VocabularyItem[] = [
  // ... existing items
  {
    id: "v_apple",
    english: "Apple",
    indonesian: "Apel",
    type: "Noun",
    meaning: "A round fruit with red, green, or yellow skin.",
    illustrationKey: "apple", // Matches vector names in SVGIllustrations.tsx
    hint: "Starts with the letter 'A'."
  }
];
```

*Note: Ensure your `illustrationKey` matches one of the custom flat SVG renderings defined in `src/components/SVGIllustrations.tsx`.*

### Types of Exercises Available
The `ChapterData` interface supports modifying:
*   `quiz`: Multiple choice items (`QuizQuestion`)
*   `matching`: Matching pair dictionaries (`MatchingPair`)
*   `dragDrop`: Interactive blanks sentence structures (`DragDropItem`)
*   `guessImage`: Image queries (`GuessImageQuestion`)
*   `reading`: Read segments and story questions (`ReadingExercise`)
*   `writing`: Typing queries (`WritingExercise`)
*   `completeSentence`: Scrambled word arrangements (`CompleteSentenceExercise`)

---

## 🛠️ Build and Local Run Commands

To inspect, run, or build the app:

### Run Development Server
```bash
npm run dev
```
Starts Vite listening on port `3000`.

### Compile for Production
```bash
npm run build
```
Validates TypeScript files, minifies static assets, and places compiled outputs in `dist/` ready for lightning-fast container deployment.

---

## 🎨 Visual Identity Rules (No Emojis!)
To maintain a high-quality console feel:
1.  **NEVER use native Emojis**. Instead, render handcrafted SVGs from `src/components/SVGIllustrations.tsx` or incorporate Lucide vectors.
2.  **Maintain off-white canvas backgrounds** (`bg-slate-50`) paired with elegant Indigo (`#4f46e5`), Emerald (`#22c55e`), and Amber (`#f59e0b`) accents.
3.  **Ensure touch targets** are accessible for 10–12 year olds (standard buttons must always meet a minimum vertical height of `52px`).
