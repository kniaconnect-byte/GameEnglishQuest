/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { QuizQuestion } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { SVGIllustration } from "../SVGIllustrations";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star } from "lucide-react";

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete, onBack }) => {
  const { progress } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    playSound("click", progress.soundEnabled);
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
      playSound("correct", progress.soundEnabled);
    } else {
      setShake(true);
      playSound("wrong", progress.soundEnabled);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setShowHint(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Game Complete! Calculate rewards
      const percentage = (score / questions.length) * 100;
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

  const progressPercentage = ((currentIndex) / questions.length) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${progress.highContrast ? 'contrast-125' : ''}`}>
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition"
          aria-label="Back to Chapter Selection"
          style={{ minHeight: "44px" }}
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <span className="font-sans font-semibold text-slate-800">Multiple Choice Quest</span>
        <div className="flex items-center gap-1.5 text-amber-500 font-sans font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
          <span>{score}</span>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="w-full bg-slate-200 h-2">
        <div
          className="bg-orange-500 h-2 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-6">
          {/* Question Box Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-2">
            <span className="font-mono text-xs font-semibold text-orange-500 uppercase tracking-wider">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <h2 className="text-xl md:text-2xl font-sans font-medium text-slate-900 mt-2 leading-snug">
              {currentQuestion.question}
            </h2>
            {currentQuestion.meaning && (
              <p className="text-sm font-sans italic text-slate-500 mt-1">
                ({currentQuestion.meaning})
              </p>
            )}
          </div>

          {/* Answer Options Grid */}
          <div className={`grid grid-cols-1 gap-3 ${shake ? "animate-shake" : ""}`}>
            {currentQuestion.options.map((option) => {
              let btnClass = "border-slate-200 hover:border-slate-300 bg-white text-slate-800";
              
              if (selectedOption === option) {
                btnClass = "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-950 font-bold";
              }

              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-100";
                } else if (selectedOption === option) {
                  btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-100";
                } else {
                  btnClass = "opacity-50 border-slate-200 bg-white text-slate-600";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition duration-200 flex items-center justify-between text-base md:text-lg ${btnClass}`}
                  style={{ minHeight: "56px" }}
                >
                  <span>{option}</span>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <Flaticon name="check" className="w-6 h-6" />
                  )}
                  {isAnswered && selectedOption === option && option !== currentQuestion.correctAnswer && (
                    <Flaticon name="cross" className="w-6 h-6" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls & Hint Drawer */}
        <div className="flex flex-col gap-4">
          {/* Hint Card */}
          {showHint && currentQuestion.hint && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-slate-800 animate-fadeIn">
              <Flaticon name="help" className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold font-sans text-sm text-amber-900">Vocabulary Tip:</p>
                <p className="text-sm text-amber-800">{currentQuestion.hint}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-4">
            {currentQuestion.hint && !isAnswered && (
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
                <Flaticon name="help" className="w-6 h-6" />
                <span className="hidden sm:inline">Hint</span>
              </button>
            )}

            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={`flex-1 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 ${
                  selectedOption
                    ? "bg-orange-500 hover:bg-orange-600 active:scale-95 cursor-pointer"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                style={{ minHeight: "52px" }}
              >
                <Flaticon name="check_button" className="w-6 h-6" />
                <span>Check Answer</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 animate-pulseOnce cursor-pointer"
                style={{ minHeight: "52px" }}
              >
                <span>{currentIndex + 1 === questions.length ? "Finish Quest" : "Next Question"}</span>
                <Flaticon name="arrow_next" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
