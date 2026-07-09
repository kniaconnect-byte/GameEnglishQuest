/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChapterData } from "../types";

export const chapter3Data: ChapterData = {
  id: 3,
  title: "My Friendly Classmates",
  subtitle: "Personality Traits and Ordinal Numbers",
  description: "Explore personality traits to describe your friends and classmates (diligent, polite, patient, naughty). Learn ordinal numbers (1st, 2nd, 3rd up to 30th) to talk about positions and dates, and understand 'want to', 'need to', and 'have to'.",
  learningObjectives: [
    "Describe friends' personalities using appropriate adjectives",
    "Use ordinal numbers (1st to 30th) in writing and conversation",
    "Differentiate and apply 'want to', 'need to', and 'have to'",
    "Understand classroom cooperation scenarios"
  ],
  vocabulary: [
    { word: "Clever", meaning: "Pintar", category: "Personality", illustrationKey: "clever" },
    { word: "Friendly", meaning: "Ramah", category: "Personality", illustrationKey: "friendly" },
    { word: "Patient", meaning: "Sabar", category: "Personality", illustrationKey: "patient" },
    { word: "Helpful", meaning: "Suka menolong", category: "Personality", illustrationKey: "helpful" },
    { word: "Naughty", meaning: "Nakal", category: "Personality", illustrationKey: "headache" },
    { word: "Polite", meaning: "Sopan", category: "Personality", illustrationKey: "avatar_girl1" },
    { word: "Diligent", meaning: "Rajin", category: "Personality", illustrationKey: "clever" },
    { word: "First (1st)", meaning: "Pertama", category: "Ordinals", illustrationKey: "trophy" },
    { word: "Second (2nd)", meaning: "Kedua", category: "Ordinals", illustrationKey: "badge" },
    { word: "Third (3rd)", meaning: "Ketiga", category: "Ordinals", illustrationKey: "badge" },
    { word: "Fifth (5th)", meaning: "Kelima", category: "Ordinals", illustrationKey: "badge" },
    { word: "Tenth (10th)", meaning: "Kesepuluh", category: "Ordinals", illustrationKey: "badge" },
    { word: "Twentieth (20th)", meaning: "Kedua puluh", category: "Ordinals", illustrationKey: "badge" },
    { word: "Thirtieth (30th)", meaning: "Ketiga puluh", category: "Ordinals", illustrationKey: "badge" },
    { word: "Classmate", meaning: "Teman sekelas", category: "School", illustrationKey: "friendly" },
    { word: "Need to", meaning: "Perlu untuk", category: "Grammar", illustrationKey: "helping_hand" },
    { word: "Want to", meaning: "Ingin untuk", category: "Grammar", illustrationKey: "avatar_boy1" },
    { word: "Have to", meaning: "Harus", category: "Grammar", illustrationKey: "patient" },
    { word: "Matter", meaning: "Masalah / Persoalan", category: "School", illustrationKey: "headache" },
    { word: "Honest", meaning: "Jujur", category: "Personality", illustrationKey: "avatar_girl1" }
  ],
  quiz: [
    {
      id: "c3_q1",
      question: "Which word describes a person who always says 'thank you' and is respectful?",
      options: ["Naughty", "Polite", "Patient", "First"],
      correctAnswer: "Polite",
      hint: "Sopan."
    },
    {
      id: "c3_q2",
      question: "What is the ordinal form for the number '3'?",
      options: ["Three", "Threeth", "Third", "Thirtieth"],
      correctAnswer: "Third"
    },
    {
      id: "c3_q3",
      question: "If a student works very hard on homework, they are...",
      options: ["Naughty", "Diligent", "Patient", "Friendly"],
      correctAnswer: "Diligent"
    },
    {
      id: "c3_q4",
      question: "Complete: 'I have an exam tomorrow, so I ____ study tonight.'",
      options: ["want to", "need to", "polite", "naughty"],
      correctAnswer: "need to"
    },
    {
      id: "c3_q5",
      question: "What does '1st' stand for?",
      options: ["Fist", "First", "Oneth", "One"],
      correctAnswer: "First"
    },
    {
      id: "c3_q6",
      question: "A person who is smiling, talking to everyone, and making friends is...",
      options: ["Friendly", "Naughty", "Diligent", "Clever"],
      correctAnswer: "Friendly"
    },
    {
      id: "c3_q7",
      question: "Complete the question: 'What's the ____? You look sad.'",
      options: ["matter", "problem", "clever", "friendly"],
      correctAnswer: "matter"
    },
    {
      id: "c3_q8",
      question: "Which of these expresses a strong obligation (harus)?",
      options: ["want to", "have to", "need to", "like to"],
      correctAnswer: "have to"
    },
    {
      id: "c3_q9",
      question: "What is 'patient' in Indonesian?",
      options: ["Sabar", "Sakit", "Sopan", "Rajin"],
      correctAnswer: "Sabar"
    },
    {
      id: "c3_q10",
      question: "Siti won the competition. She got the ____ prize.",
      options: ["1st", "1th", "one", "firstly"],
      correctAnswer: "1st"
    },
    {
      id: "c3_q11",
      question: "A student who breaks rules or makes trouble is...",
      options: ["Polite", "Clever", "Naughty", "Helpful"],
      correctAnswer: "Naughty"
    },
    {
      id: "c3_q12",
      question: "How do you write 'ke-30' in English?",
      options: ["30st", "30rd", "30th", "30nd"],
      correctAnswer: "30th"
    },
    {
      id: "c3_q13",
      question: "Complete: 'I ____ drink water, I am so thirsty!'",
      options: ["want to", "polite", "naughty", "diligent"],
      correctAnswer: "want to"
    },
    {
      id: "c3_q14",
      question: "Which word means 'pintar' or 'cerdas'?",
      options: ["Clever", "Friendly", "Patient", "Polite"],
      correctAnswer: "Clever"
    },
    {
      id: "c3_q15",
      question: "What is the ordinal representation of '20'?",
      options: ["20rd", "Twentieth (20th)", "Twenty", "20nd"],
      correctAnswer: "Twentieth (20th)"
    }
  ],
  matching: [
    { id: "c3_m1", left: "First", right: "Pertama" },
    { id: "c3_m2", left: "Second", right: "Kedua" },
    { id: "c3_m3", left: "Third", right: "Ketiga" },
    { id: "c3_m4", left: "Diligent", right: "Rajin" },
    { id: "c3_m5", left: "Friendly", right: "Ramah" },
    { id: "c3_m6", left: "Patient", right: "Sabar" },
    { id: "c3_m7", left: "Polite", right: "Sopan" },
    { id: "c3_m8", left: "Helpful", right: "Suka menolong" },
    { id: "c3_m9", left: "Naughty", right: "Nakal" },
    { id: "c3_m10", left: "Clever", right: "Pintar" }
  ],
  dragDrop: [
    { id: "c3_dd1", sentence: "She won the race and finished in ____ place.", blankValue: "first", options: ["first", "naughty", "need to"] },
    { id: "c3_dd2", sentence: "Budi is so ____; he always helps teachers clean the board.", blankValue: "helpful", options: ["helpful", "second", "want to"] },
    { id: "c3_dd3", sentence: "We ____ wear our uniforms to school.", blankValue: "have to", options: ["have to", "polite", "third"] },
    { id: "c3_dd4", sentence: "Tono is a ____ boy. He always scores 100 on math tests.", blankValue: "clever", options: ["clever", "tenth", "naughty"] },
    { id: "c3_dd5", sentence: "He is the ____ student in line, right behind the second.", blankValue: "third", options: ["third", "diligent", "have to"] },
    { id: "c3_dd6", sentence: "What's the ____? Why are you crying?", blankValue: "matter", options: ["matter", "patient", "friendly"] },
    { id: "c3_dd7", sentence: "Don't be ____ in class! Listen to your teacher.", blankValue: "naughty", options: ["naughty", "fifth", "polite"] },
    { id: "c3_dd8", sentence: "I ____ eat some chocolate cake, please.", blankValue: "want to", options: ["want to", "twentieth", "helpful"] }
  ],
  guessImage: [
    { id: "c3_gi1", illustrationKey: "clever", question: "This book represents being...", options: ["Naughty", "Clever", "First", "Friendly"], correctAnswer: "Clever" },
    { id: "c3_gi2", illustrationKey: "friendly", question: "Shaking hands represents which personality trait?", options: ["Naughty", "Friendly", "Patient", "Polite"], correctAnswer: "Friendly" },
    { id: "c3_gi3", illustrationKey: "patient", question: "This clock representing waiting calmly symbolizes being...", options: ["Patient", "Clever", "Naughty", "Diligent"], correctAnswer: "Patient" },
    { id: "c3_gi4", illustrationKey: "helpful", question: "Supporting and growing a plant symbolises being...", options: ["Helpful", "Naughty", "Patient", "Diligent"], correctAnswer: "Helpful" },
    { id: "c3_gi5", illustrationKey: "trophy", question: "A trophy represents winning the ____ place.", options: ["First (1st)", "Tenth (10th)", "Second (2nd)", "Thirtieth (30th)"], correctAnswer: "First (1st)" },
    { id: "c3_gi6", illustrationKey: "badge", question: "This silver medal represents coming...", options: ["First", "Second", "Third", "Fifth"], correctAnswer: "Second" },
    { id: "c3_gi7", illustrationKey: "avatar_girl1", question: "Siti bows politely. She is a ____ classmate.", options: ["naughty", "polite", "clever", "patient"], correctAnswer: "polite" },
    { id: "c3_gi8", illustrationKey: "avatar_boy2", question: "Budi studies late every night. He is very...", options: ["diligent", "naughty", "friendly", "impatient"], correctAnswer: "diligent" },
    { id: "c3_gi9", illustrationKey: "headache", question: "If a classmate is crying, we can ask: 'What is the ____?'", options: ["matter", "happy", "diligent", "polite"], correctAnswer: "matter" },
    { id: "c3_gi10", illustrationKey: "badge", question: "This red ribbon award is for...", options: ["Achievement", "Food", "Weather", "Body Parts"], correctAnswer: "Achievement" }
  ],
  reading: [
    {
      id: "c3_r1",
      title: "Class 5A Elections",
      passage: "Today, Class 5A is electing the class leader. Budi is very friendly and polite, so many classmates like him. He finishes in first (1st) place with twenty votes. Siti is a diligent and clever girl. She finishes in second (2nd) place with fifteen votes. Both of them want to make Class 5A the best class in the school!",
      questions: [
        {
          id: "c3_r1_q1",
          question: "Who won the class leader election in first place?",
          options: ["Siti", "Budi", "Tono", "Lisa"],
          correctAnswer: "Budi"
        },
        {
          id: "c3_r1_q2",
          question: "What is Budi's personality like?",
          options: ["Naughty and loud", "Friendly and polite", "Patient and lazy", "Clever but naughty"],
          correctAnswer: "Friendly and polite"
        },
        {
          id: "c3_r1_q3",
          question: "In what place did Siti finish?",
          options: ["First", "Second", "Third", "Tenth"],
          correctAnswer: "Second"
        }
      ]
    },
    {
      id: "c3_r2",
      title: "Helping Our Friends",
      passage: "At school, we have to help each other. Yesterday, Doni lost his pencil. He was crying. Anna saw him and asked, 'What's the matter, Doni?' Anna is a helpful and kind classmate. She lent him her blue pencil. Doni smiled and thanked her politely. Classmates need to support each other every day.",
      questions: [
        {
          id: "c3_r2_q1",
          question: "What did Anna ask Doni when he was crying?",
          options: ["'How are you?'", "'What's the matter?'", "'Do you have a pencil?'", "'What is your name?'"],
          correctAnswer: "'What's the matter?'"
        },
        {
          id: "c3_r2_q2",
          question: "What is Anna's personality?",
          options: ["Naughty", "Helpful and kind", "Polite but lazy", "Clever and naughty"],
          correctAnswer: "Helpful and kind"
        },
        {
          id: "c3_r2_q3",
          question: "How did Doni thank Anna?",
          options: ["Naughtily", "Politely", "Patiently", "Angrily"],
          correctAnswer: "Politely"
        }
      ]
    }
  ],
  writing: [
    { id: "c3_w1", prompt: "Translate 'rajin' into English.", correctAnswers: ["diligent"], hint: "D-i-l-i-g-e-n-t" },
    { id: "c3_w2", prompt: "Write the abbreviation for 'first' (e.g. 1st, 2nd).", correctAnswers: ["1st"], hint: "Number 1 with two letters." },
    { id: "c3_w3", prompt: "Translate 'sopan' into English.", correctAnswers: ["polite"], hint: "P-o-l-i-t-e" },
    { id: "c3_w4", prompt: "Complete with 'want to', 'need to' or 'have to': 'We ____ wear a school tie on Mondays (it is a strict rule).'", correctAnswers: ["have to"], hint: "Expresses mandatory obligation." },
    { id: "c3_w5", prompt: "Translate 'suka menolong' into English.", correctAnswers: ["helpful"], hint: "H-e-l-p-f-u-l" },
    { id: "c3_w6", prompt: "Write the ordinal number for '30th' in words.", correctAnswers: ["thirtieth"], hint: "T-h-i-r-t-i-e-t-h" }
  ],
  completeSentence: [
    { id: "c3_cs1", scrambled: ["is", "the", "student", "first", "Budi"], correct: "Budi is the first student", hint: "Budi adalah murid pertama." },
    { id: "c3_cs2", scrambled: ["matter", "what", "is", "the", "Doni"], correct: "what is the matter Doni", hint: "Ada apa, Doni?" },
    { id: "c3_cs3", scrambled: ["have", "study", "we", "to", "hard"], correct: "we have to study hard", hint: "Kita harus belajar dengan giat." },
    { id: "c3_cs4", scrambled: ["she", "diligent", "a", "is", "classmate"], correct: "she is a diligent classmate", hint: "Dia adalah teman sekelas yang rajin." },
    { id: "c3_cs5", scrambled: ["want", "I", "play", "to", "kites"], correct: "I want to play kites", hint: "Saya ingin bermain layang-layang." },
    { id: "c3_cs6", scrambled: ["polite", "and", "they", "helpful", "are"], correct: "they are polite and helpful", hint: "Mereka sopan dan suka menolong." }
  ],
  listening: [
    {
      id: "c3_l1",
      audioText: "Budi is the first student.",
      question: "Which ordinal rank did Budi achieve?",
      options: ["First", "Second", "Third", "Thirtieth"],
      correctAnswer: "First",
      hint: "Urutan pertama."
    },
    {
      id: "c3_l2",
      audioText: "What is the matter, Doni?",
      question: "What did the speaker ask Doni?",
      options: ["What is your name?", "What is the matter?", "How are you today?", "Where is your school?"],
      correctAnswer: "What is the matter?",
      hint: "Ada apa, Doni?"
    },
    {
      id: "c3_l3",
      audioText: "We have to study hard.",
      question: "What obligation did the speaker mention?",
      options: ["We want to play games", "We have to study hard", "We need to sleep early", "We have to buy a tie"],
      correctAnswer: "We have to study hard",
      hint: "Harus belajar dengan giat."
    },
    {
      id: "c3_l4",
      audioText: "Anna is a very diligent and polite girl.",
      question: "What are Anna's personality traits?",
      options: ["Naughty and lazy", "Diligent and polite", "Patient and quiet", "Helpful but funny"],
      correctAnswer: "Diligent and polite",
      hint: "Rajin dan sopan."
    },
    {
      id: "c3_l5",
      audioText: "I want to help you.",
      question: "What does the speaker express?",
      options: ["I want to study", "I have to leave", "I want to help you", "I need a tie"],
      correctAnswer: "I want to help you",
      hint: "Ingin menolongmu."
    }
  ]
};
