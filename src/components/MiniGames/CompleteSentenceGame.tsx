/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CompleteSentenceExercise } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star } from "lucide-react";

interface CompleteSentenceGameProps {
  exercises: CompleteSentenceExercise[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const CompleteSentenceGame: React.FC<CompleteSentenceGameProps> = ({ exercises, onComplete, onBack }) => {
  const { progress } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const currentExercise = exercises[currentIndex];

  // Initialize scrambled words
  useEffect(() => {
    // Shuffle the provided words list
    const shuffled = [...currentExercise.scrambled].sort(() => Math.random() - 0.5);
    setWords(shuffled);
    setSelectedWords([]);
    setIsAnswered(false);
    setIsCorrect(null);
  }, [currentIndex, currentExercise]);

  const handleWordSelect = (word: string, index: number) => {
    if (isAnswered) return;
    playSound("click", progress.soundEnabled);
    
    // Add to composed sentence
    setSelectedWords((prev) => [...prev, word]);

    // Remove from choices by index
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleWordRemove = (word: string, index: number) => {
    if (isAnswered) return;
    playSound("click", progress.soundEnabled);

    // Return to choices
    setWords((prev) => [...prev, word]);

    // Remove from composed list by index
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (isAnswered) return;
    playSound("click", progress.soundEnabled);
    setWords([...currentExercise.scrambled]);
    setSelectedWords([]);
  };

  const handleCheckAnswer = () => {
    if (selectedWords.length === 0 || isAnswered) return;

    const composed = selectedWords.join(" ").toLowerCase().trim().replace(/[.]/g, "");
    const correct = currentExercise.correct.toLowerCase().trim().replace(/[.]/g, "");

    const matches = composed === correct;
    setIsAnswered(true);
    setIsCorrect(matches);

    if (matches) {
      setScore((s) => s + 1);
      playSound("correct", progress.soundEnabled);
    } else {
      setShake(true);
      playSound("wrong", progress.soundEnabled);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      const percentage = (score / exercises.length) * 100;
      let stars = 1;
      let coins = 10;
      let xp = 20;

      if (percentage === 100) {
        stars = 3;
        coins = 25;
        xp = 50;
      } else if (percentage >= 70) {
        stars = 2;
        coins = 18;
        xp = 35;
      }

      playSound("victory", progress.soundEnabled);
      onComplete(xp, stars, coins);
    }
  };

  const progressPercentage = (currentIndex / exercises.length) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${progress.highContrast ? "contrast-125" : ""}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition"
          aria-label="Back"
          style={{ minHeight: "44px" }}
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <span className="font-sans font-semibold text-slate-800">Sentence Builder Quest</span>
        <div className="flex items-center gap-1.5 text-orange-600 font-sans font-bold bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
          <Star className="w-5 h-5 fill-orange-400 stroke-orange-500" />
          <span>{score}</span>
        </div>
      </header>

      {/* Progress */}
      <div className="w-full bg-slate-200 h-2">
        <div
          className="bg-orange-500 h-2 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 mt-2">
          {/* Scrambled Box Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-4">
            <span className="font-mono text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Sentence {currentIndex + 1} of {exercises.length}
            </span>

            {/* Instruction / Translation Prompt */}
            <p className="text-base font-sans text-slate-500 italic">
              Translate: "{currentExercise.hint}"
            </p>

            {/* Composed Sentence Slots */}
            <div className={`w-full min-h-[96px] p-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-wrap gap-2.5 items-center justify-center ${shake ? "animate-shake" : ""}`}>
              {selectedWords.length === 0 ? (
                <span className="text-slate-400 font-sans text-sm">Tap words below to arrange them...</span>
              ) : (
                selectedWords.map((word, index) => (
                  <button
                    key={`${word}_sel_${index}`}
                    disabled={isAnswered}
                    onClick={() => handleWordRemove(word, index)}
                    className="px-4 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-sans font-medium rounded-xl shadow-sm text-base flex items-center gap-1.5 cursor-pointer transform active:scale-95 transition"
                    style={{ minHeight: "44px" }}
                  >
                    <span>{word}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Scrambled Word Badges */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-xs text-slate-400 font-semibold uppercase tracking-widest">
                Scrambled Words:
              </span>
              {!isAnswered && selectedWords.length > 0 && (
                <button
                  onClick={handleReset}
                  className="text-xs font-sans text-orange-600 hover:text-orange-800 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Flaticon name="reset" className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
              {words.length === 0 && selectedWords.length > 0 && !isAnswered ? (
                <span className="text-xs text-emerald-600 font-sans font-semibold">Perfect! Tap check answer below.</span>
              ) : (
                words.map((word, index) => (
                  <button
                    key={`${word}_opt_${index}`}
                    onClick={() => handleWordSelect(word, index)}
                    disabled={isAnswered}
                    className="px-5 py-3 border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50/20 rounded-xl bg-white text-slate-800 font-sans font-medium transition duration-200 text-base cursor-pointer"
                    style={{ minHeight: "52px" }}
                  >
                    {word}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Feedback Section */}
          {isAnswered && (
            <div className={`rounded-xl p-4 border animate-fadeIn ${
              isCorrect
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-rose-50 border-rose-200 text-rose-900"
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                {isCorrect ? (
                  <Flaticon name="check" className="w-6 h-6 shrink-0" />
                ) : (
                  <Flaticon name="cross" className="w-6 h-6 shrink-0" />
                )}
                <span className="font-bold font-sans text-base">
                  {isCorrect ? "Perfectly Arranged!" : "That isn't quite right. The correct arrangement is:"}
                </span>
              </div>
              <p className="text-base font-sans pl-8 font-semibold leading-relaxed">
                "{currentExercise.correct}."
              </p>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="sticky bottom-4">
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedWords.length === 0}
              className={`w-full font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                selectedWords.length > 0
                  ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
              style={{ minHeight: "52px" }}
            >
              <Flaticon name="check_arrangement" className="w-6 h-6" />
              <span>Check Arrangement</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-[#F97316] hover:bg-[#EA580C] active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              style={{ minHeight: "52px" }}
            >
              <span>{currentIndex + 1 === exercises.length ? "Finish Quest" : "Next Sentence"}</span>
              <Flaticon name="arrow_next" className="w-6 h-6" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
