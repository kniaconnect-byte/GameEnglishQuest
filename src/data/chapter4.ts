/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChapterData } from "../types";

export const chapter4Data: ChapterData = {
  id: 4,
  title: "What's The Matter?",
  subtitle: "Sickness, Medicine, and Medical Helpers",
  description: "Learn about various illnesses (headache, toothache, cold, temperature) and medical vocabulary. We will learn how to express when we are sick and practice structures like 'use something for doing something' or 'use something to do something'.",
  learningObjectives: [
    "Identify and name common illnesses (headache, cold, fever)",
    "Express physical discomfort and symptoms in English",
    "Identify medical helpers (dentist, doctor, ambulance)",
    "Use grammar structures 'use to do' and 'use for doing' correctly"
  ],
  vocabulary: [
    { word: "Headache", meaning: "Sakit kepala", category: "Illnesses", illustrationKey: "headache" },
    { word: "Earache", meaning: "Sakit telinga", category: "Illnesses", illustrationKey: "earache" },
    { word: "Toothache", meaning: "Sakit gigi", category: "Illnesses", illustrationKey: "toothache" },
    { word: "Stomachache", meaning: "Sakit perut", category: "Illnesses", illustrationKey: "headache" },
    { word: "Cold", meaning: "Flu / Pilek", category: "Illnesses", illustrationKey: "headache" },
    { word: "Temperature", meaning: "Demam / Suhu tinggi", category: "Illnesses", illustrationKey: "headache" },
    { word: "Medicine", meaning: "Obat-obatan", category: "Medical", illustrationKey: "medicine" },
    { word: "Ambulance", meaning: "Ambulans", category: "Medical", illustrationKey: "ambulance" },
    { word: "Dentist", meaning: "Dokter gigi", category: "Medical", illustrationKey: "braces" },
    { word: "Doctor", meaning: "Dokter", category: "Medical", illustrationKey: "avatar_boy1" },
    { word: "Hospital", meaning: "Rumah sakit", category: "Medical", illustrationKey: "ambulance" },
    { word: "Cough", meaning: "Batuk", category: "Illnesses", illustrationKey: "headache" },
    { word: "Bandage", meaning: "Perban", category: "Medical", illustrationKey: "braces" },
    { word: "Tissue", meaning: "Tisu", category: "Medical", illustrationKey: "milk" },
    { word: "Stethoscope", meaning: "Stetoskop", category: "Medical", illustrationKey: "badge" },
    { word: "Sore throat", meaning: "Sakit tenggorokan", category: "Illnesses", illustrationKey: "headache" },
    { word: "Healthy", meaning: "Sehat", category: "Medical", illustrationKey: "apple" },
    { word: "Sick", meaning: "Sakit", category: "Illnesses", illustrationKey: "headache" },
    { word: "Use to", meaning: "Gunakan untuk (melakukan)", category: "Grammar", illustrationKey: "helpful" },
    { word: "Use for", meaning: "Gunakan untuk (pekerjaan/benda)", category: "Grammar", illustrationKey: "helpful" }
  ],
  quiz: [
    {
      id: "c4_q1",
      question: "If your head hurts badly, you have a...",
      options: ["Earache", "Headache", "Toothache", "Cold"],
      correctAnswer: "Headache",
      hint: "Sakit kepala."
    },
    {
      id: "c4_q2",
      question: "Where should a person go if they are severely sick and need a doctor?",
      options: ["Kitchen", "Hospital", "Park", "School"],
      correctAnswer: "Hospital"
    },
    {
      id: "c4_q3",
      question: "Which professional cleans and repairs our teeth?",
      options: ["Doctor", "Dentist", "Nurse", "Teacher"],
      correctAnswer: "Dentist"
    },
    {
      id: "c4_q4",
      question: "Complete the sentence: 'I use medicine ____ curing my cold.'",
      options: ["to", "for", "with", "from"],
      correctAnswer: "for",
      hint: "We use 'for' before verbs with -ing."
    },
    {
      id: "c4_q5",
      question: "What vehicle has a siren and is used to transport sick people?",
      options: ["Taxi", "Ambulance", "Bus", "Bicycle"],
      correctAnswer: "Ambulance"
    },
    {
      id: "c4_q6",
      question: "Complete: 'She has a high ____, she feels very hot!'",
      options: ["temperature", "cold", "medicine", "dentist"],
      correctAnswer: "temperature"
    },
    {
      id: "c4_q7",
      question: "We use bandages ____ cover cuts and wounds.",
      options: ["to", "for", "by", "about"],
      correctAnswer: "to",
      hint: "We use 'to' before base verbs."
    },
    {
      id: "c4_q8",
      question: "What is 'earache' in Indonesian?",
      options: ["Sakit gigi", "Sakit perut", "Sakit kepala", "Sakit telinga"],
      correctAnswer: "Sakit telinga"
    },
    {
      id: "c4_q9",
      question: "What should you take to feel better when you are sick?",
      options: ["Burger", "Medicine", "Ice cream", "Sunny"],
      correctAnswer: "Medicine"
    },
    {
      id: "c4_q10",
      question: "If you have a very bad cold, you might use tissues for...",
      options: ["eating food", "blowing your nose", "drawing a picture", "cleaning teeth"],
      correctAnswer: "blowing your nose"
    },
    {
      id: "c4_q11",
      question: "What is the matter with him? He has a bad tooth. He has...",
      options: ["Headache", "Toothache", "Earache", "Cold"],
      correctAnswer: "Toothache"
    },
    {
      id: "c4_q12",
      question: "What do doctors use a stethoscope for?",
      options: ["Doing surgery", "Listening to heartbeats", "Writing prescriptions", "Checking teeth"],
      correctAnswer: "Listening to heartbeats"
    },
    {
      id: "c4_q13",
      question: "Complete: 'My throat hurts and it is hard to swallow. I have a ____.'",
      options: ["sore throat", "headache", "stomachache", "toothache"],
      correctAnswer: "sore throat"
    },
    {
      id: "c4_q14",
      question: "If you eat too many spicy chili peppers, you might get a...",
      options: ["headache", "stomachache", "earache", "cold"],
      correctAnswer: "stomachache"
    },
    {
      id: "c4_q15",
      question: "Opposite of 'sick' is...",
      options: ["feverish", "healthy", "naughty", "coughing"],
      correctAnswer: "healthy"
    }
  ],
  matching: [
    { id: "c4_m1", left: "Headache", right: "Sakit kepala" },
    { id: "c4_m2", left: "Toothache", right: "Sakit gigi" },
    { id: "c4_m3", left: "Earache", right: "Sakit telinga" },
    { id: "c4_m4", left: "Cold", right: "Pilek / Flu" },
    { id: "c4_m5", left: "Medicine", right: "Obat" },
    { id: "c4_m6", left: "Dentist", right: "Dokter gigi" },
    { id: "c4_m7", left: "Hospital", right: "Rumah sakit" },
    { id: "c4_m8", left: "Ambulance", right: "Ambulans" },
    { id: "c4_m9", left: "Bandage", right: "Perban" },
    { id: "c4_m10", left: "Temperature", right: "Demam" }
  ],
  dragDrop: [
    { id: "c4_dd1", sentence: "He is coughing and sneezing because he has a ____.", blankValue: "cold", options: ["cold", "dentist", "to"] },
    { id: "c4_dd2", sentence: "We use a thermometer ____ measuring body temperature.", blankValue: "for", options: ["for", "to", "at"] },
    { id: "c4_dd3", sentence: "Please call an ____! The man has met an accident.", blankValue: "ambulance", options: ["ambulance", "hospital", "medicine"] },
    { id: "c4_dd4", sentence: "I have to visit a ____ because my tooth hurts.", blankValue: "dentist", options: ["dentist", "doctor", "tissue"] },
    { id: "c4_dd5", sentence: "Take this white pill; it is very effective ____.", blankValue: "medicine", options: ["medicine", "headache", "bandage"] },
    { id: "c4_dd6", sentence: "She has a terrible pain in her stomach. It is a ____.", blankValue: "stomachache", options: ["stomachache", "cold", "use for"] },
    { id: "c4_dd7", sentence: "We use syrup medicine ____ curing a cough.", blankValue: "for", options: ["for", "to", "with"] },
    { id: "c4_dd8", sentence: "We use warm blankets ____ warm our bodies.", blankValue: "to", options: ["to", "for", "from"] }
  ],
  guessImage: [
    { id: "c4_gi1", illustrationKey: "headache", question: "What ailment does this sad person have?", options: ["Earache", "Headache", "Toothache", "Cold"], correctAnswer: "Headache" },
    { id: "c4_gi2", illustrationKey: "earache", question: "What is the matter with this person clutching their ear?", options: ["Earache", "Headache", "Toothache", "Cold"], correctAnswer: "Earache" },
    { id: "c4_gi3", illustrationKey: "toothache", question: "What is the matter with this person with a bandage around their jaw?", options: ["Earache", "Headache", "Toothache", "Cold"], correctAnswer: "Toothache" },
    { id: "c4_gi4", illustrationKey: "medicine", question: "What medical item is shown in this blue bottle?", options: ["Medicine", "Apple", "Rice", "Milk"], correctAnswer: "Medicine" },
    { id: "c4_gi5", illustrationKey: "ambulance", question: "What emergency vehicle is shown with a red cross?", options: ["Ambulance", "Taxi", "Bus", "Plate"], correctAnswer: "Ambulance" },
    { id: "c4_gi6", illustrationKey: "braces", question: "If you want to straighten your teeth, you visit the...", options: ["Dentist", "Oven", "Ambulance", "Stove"], correctAnswer: "Dentist" },
    { id: "c4_gi7", illustrationKey: "apple", question: "Eating an apple a day keeps you...", options: ["Sick", "Healthy", "Cold", "Hot"], correctAnswer: "Healthy" },
    { id: "c4_gi8", illustrationKey: "avatar_boy1", question: "A medical doctor uses a stethoscope to listen to your...", options: ["Eyes", "Ears", "Heartbeat", "Nose"], correctAnswer: "Heartbeat" },
    { id: "c4_gi9", illustrationKey: "headache", question: "A high temperature means you have a...", options: ["Fever", "Toothache", "Earache", "Cold"], correctAnswer: "Fever" },
    { id: "c4_gi10", illustrationKey: "badge", question: "A health badge represents a student who is...", options: ["Sick", "Naughty", "Healthy", "Bald"], correctAnswer: "Healthy" }
  ],
  reading: [
    {
      id: "c4_r1",
      title: "Tony Has a Toothache",
      passage: "Tony loves eating candies and chocolates, but he often forgets to brush his teeth. Today, Tony is crying in his room. What's the matter? He has a terrible toothache! His mother takes him to the dentist. The dentist uses special tools to clean Tony's teeth and gives him some pain medicine. Tony promises to brush his teeth twice a day.",
      questions: [
        {
          id: "c4_r1_q1",
          question: "Why does Tony have a toothache?",
          options: ["He drinks water", "He eats candies and forgets to brush", "He plays football", "He fell down"],
          correctAnswer: "He eats candies and forgets to brush"
        },
        {
          id: "c4_r1_q2",
          question: "Who does Tony's mother take him to?",
          options: ["A teacher", "A dentist", "A cook", "A driver"],
          correctAnswer: "A dentist"
        },
        {
          id: "c4_r1_q3",
          question: "What does the dentist give Tony?",
          options: ["Chocolates", "Candies", "Pain medicine", "A blue toothbrush"],
          correctAnswer: "Pain medicine"
        }
      ]
    },
    {
      id: "c4_r2",
      title: "Siti's High Fever",
      passage: "Yesterday, it was rainy and windy. Siti played in the rain for a long time. This morning, she has a cold and a very high temperature. Her head hurts, which means she also has a headache. Her father takes her to the hospital. The doctor says Siti has a fever and needs to rest. Siti has to take red medicine syrup for curing her fever.",
      questions: [
        {
          id: "c4_r2_q1",
          question: "What did Siti do yesterday in the rainy weather?",
          options: ["Played in the rain", "Slept in the house", "Ate bananas", "Cooked in the kitchen"],
          correctAnswer: "Played in the rain"
        },
        {
          id: "c4_r2_q2",
          question: "What symptoms does Siti have today?",
          options: ["Toothache and stomachache", "Cold, fever, and headache", "Earache", "No symptoms"],
          correctAnswer: "Cold, fever, and headache"
        },
        {
          id: "c4_r2_q3",
          question: "What is the red medicine syrup used for?",
          options: ["For playing", "For curing her fever", "For drawing", "For eating with rice"],
          correctAnswer: "For curing her fever"
        }
      ]
    }
  ],
  writing: [
    { id: "c4_w1", prompt: "Translate 'sakit kepala' into English.", correctAnswers: ["headache"], hint: "H-e-a-d-a-c-h-e" },
    { id: "c4_w2", prompt: "Complete with 'to' or 'for': 'I use tissues ____ blowing my nose.'", correctAnswers: ["for"], hint: "Used before an -ing verb." },
    { id: "c4_w3", prompt: "Translate 'dokter gigi' into English.", correctAnswers: ["dentist"], hint: "D-e-n-t-i-s-t" },
    { id: "c4_w4", prompt: "Translate 'obat' into English.", correctAnswers: ["medicine"], hint: "M-e-d-i-c-i-n-e" },
    { id: "c4_w5", prompt: "Translate 'sakit telinga' into English.", correctAnswers: ["earache"], hint: "E-a-r-a-c-h-e" },
    { id: "c4_w6", prompt: "Complete with 'to' or 'for': 'We use bandages ____ protect wounds.'", correctAnswers: ["to"], hint: "Used before a base verb." }
  ],
  completeSentence: [
    { id: "c4_cs1", scrambled: ["he", "has", "stomachache", "a", "terrible"], correct: "he has a terrible stomachache", hint: "Dia sakit perut yang parah." },
    { id: "c4_cs2", scrambled: ["use", "tissues", "I", "cold", "for", "my"], correct: "I use tissues for my cold", hint: "Saya memakai tisu untuk flu saya." },
    { id: "c4_cs3", scrambled: ["hospital", "she", "has", "go", "to", "to"], correct: "she has to go to hospital", hint: "Dia harus pergi ke rumah sakit." },
    { id: "c4_cs4", scrambled: ["dentist", "my", "teeth", "checks", "the"], correct: "the dentist checks my teeth", hint: "Dokter gigi memeriksa gigi saya." },
    { id: "c4_cs5", scrambled: ["medicine", "take", "to", "feel", "better", "I"], correct: "I take medicine to feel better", hint: "Saya minum obat agar merasa baikan." },
    { id: "c4_cs6", scrambled: ["ambulance", "is", "coming", "the", "fast"], correct: "the ambulance is coming fast", hint: "Ambulans datang dengan cepat." }
  ],
  listening: [
    {
      id: "c4_l1",
      audioText: "He has a terrible stomachache.",
      question: "What health problem does the boy have?",
      options: ["Headache", "Stomachache", "Toothache", "Cold"],
      correctAnswer: "Stomachache",
      hint: "Sakit perut."
    },
    {
      id: "c4_l2",
      audioText: "I use tissues for my cold.",
      question: "What does the speaker use tissues for?",
      options: ["For a headache", "For a cold", "For a cut", "For a toothache"],
      correctAnswer: "For a cold",
      hint: "Flu atau pilek."
    },
    {
      id: "c4_l3",
      audioText: "The dentist checks my teeth.",
      question: "Who is checking the speaker's teeth?",
      options: ["The doctor", "The nurse", "The dentist", "The teacher"],
      correctAnswer: "The dentist",
      hint: "Dokter gigi."
    },
    {
      id: "c4_l4",
      audioText: "The ambulance is coming fast.",
      question: "What vehicle did you hear in the description?",
      options: ["The bus", "The car", "The ambulance", "The truck"],
      correctAnswer: "The ambulance",
      hint: "Mobil ambulans."
    },
    {
      id: "c4_l5",
      audioText: "I take medicine to feel better.",
      question: "Why does the speaker take medicine?",
      options: ["To play outside", "To feel better", "To go to school", "To sleep early"],
      correctAnswer: "To feel better",
      hint: "Agar merasa baikan."
    }
  ]
};
