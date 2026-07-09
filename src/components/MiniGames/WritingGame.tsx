/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { WritingExercise } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star } from "lucide-react";

interface WritingGameProps {
  exercises: WritingExercise[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const WritingGame: React.FC<WritingGameProps> = ({ exercises, onComplete, onBack }) => {
  const { progress } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const currentExercise = exercises[currentIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAnswered) return;
    setUserAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (!userAnswer.trim() || isAnswered) return;

    // Clean comparison: lowercase, trim, remove final dot/comma, replace double spaces
    const cleanStr = (str: string) =>
      str.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ");

    const cleanedUser = cleanStr(userAnswer);
    const hasMatch = currentExercise.correctAnswers.some(
      (ans) => cleanStr(ans) === cleanedUser
    );

    setIsAnswered(true);
    setIsCorrect(hasMatch);

    if (hasMatch) {
      setScore((s) => s + 1);
      playSound("correct", progress.soundEnabled);
    } else {
      setShake(true);
      playSound("wrong", progress.soundEnabled);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrect(null);
    setShowHint(false);

    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate final grade
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
        <span className="font-sans font-semibold text-slate-800">Spelling & Writing Quest</span>
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

      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 mt-2">
          {/* Prompt card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-2">
            <span className="font-mono text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Quest {currentIndex + 1} of {exercises.length}
            </span>
            <h2 className="text-xl md:text-2xl font-sans font-bold text-slate-850 mt-1 leading-snug">
              {currentExercise.prompt}
            </h2>
          </div>

          {/* Input Box */}
          <div className={`flex flex-col gap-3 ${shake ? "animate-shake" : ""}`}>
            <label htmlFor="writing-input" className="font-mono text-xs text-slate-500 font-semibold uppercase tracking-widest px-1">
              Type your English answer:
            </label>
            <input
              id="writing-input"
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              disabled={isAnswered}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Type here..."
              className={`w-full px-5 py-4 border-2 rounded-xl text-lg font-sans transition outline-none ${
                isAnswered
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                    : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                  : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-white"
              }`}
              style={{ minHeight: "56px" }}
            />
          </div>

          {/* Feedbacks on checks */}
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
                  {isCorrect ? "Brilliant! That is correct." : "Oops! Let's check the correct spelling:"}
                </span>
              </div>
              <p className="text-base font-sans pl-8 font-medium">
                Answer: <span className="underline decoration-orange-300 decoration-2 font-bold text-orange-950">{currentExercise.correctAnswers[0]}</span>
              </p>
            </div>
          )}
        </div>

        {/* Hints and triggers */}
        <div className="flex flex-col gap-4">
          {showHint && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-slate-800 animate-fadeIn">
              <Flaticon name="help" className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-semibold font-sans text-sm text-amber-900">Spelling Hint:</p>
                <p className="text-sm text-amber-800">{currentExercise.hint}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!isAnswered && (
              <button
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setShowHint(!showHint);
                }}
                className={`px-4 rounded-xl border border-amber-200 flex items-center justify-center gap-2 transition cursor-pointer ${
                  showHint ? "bg-amber-100 text-amber-900" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                }`}
                style={{ minHeight: "52px" }}
              >
                <Flaticon name="help" className="w-5 h-5" />
                <span className="hidden sm:inline">Hint</span>
              </button>
            )}

            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!userAnswer.trim()}
                className={`flex-1 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  userAnswer.trim()
                    ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                style={{ minHeight: "52px" }}
              >
                <Flaticon name="check_spelling" className="w-6 h-6" />
                <span>Submit Writing</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-[#F97316] hover:bg-[#EA580C] active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                style={{ minHeight: "52px" }}
              >
                <span>{currentIndex + 1 === exercises.length ? "Finish Quest" : "Next Writing"}</span>
                <Flaticon name="arrow_next" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
