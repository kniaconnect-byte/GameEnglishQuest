/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabularyItem {
  word: string;
  meaning: string;
  category: string;
  illustrationKey: string; // Used to look up custom SVG renderers
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
  meaning?: string;
}

export interface MatchingPair {
  id: string;
  left: string;  // English term / prompt
  right: string; // Indonesian equivalent / description
}

export interface DragDropItem {
  id: string;
  sentence: string; // e.g. "I have a ____ because my tooth hurts."
  blankValue: string; // "toothache"
  options: string[];
}

export interface GuessImageQuestion {
  id: string;
  illustrationKey: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ReadingExercise {
  id: string;
  title: string;
  passage: string;
  questions: ReadingQuestion[];
}

export interface WritingExercise {
  id: string;
  prompt: string;
  correctAnswers: string[]; // Accepts clean variations
  hint: string;
}

export interface CompleteSentenceExercise {
  id: string;
  scrambled: string[];
  correct: string;
  hint: string;
}

export interface ListeningQuestion {
  id: string;
  audioText: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  learningObjectives: string[];
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
  matching: MatchingPair[];
  dragDrop: DragDropItem[];
  guessImage: GuessImageQuestion[];
  reading: ReadingExercise[];
  writing: WritingExercise[];
  completeSentence: CompleteSentenceExercise[];
  listening: ListeningQuestion[];
}

export interface UserProgress {
  unlockedChapters: number[]; // e.g. [1, 2]
  completedActivities: { [chapterId: number]: string[] }; // chapterId -> activityKeys[] ("quiz", "matching", etc.)
  xp: number;
  stars: number;
  coins: number;
  unlockedBadges: string[]; // badgeIds
  selectedAvatar: string; // avatar ID
  nickname: string;
  soundEnabled: boolean;
  musicEnabled: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}
