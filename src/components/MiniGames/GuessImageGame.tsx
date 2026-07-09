/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { GuessImageQuestion } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { SVGIllustration } from "../SVGIllustrations";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star } from "lucide-react";

interface GuessImageGameProps {
  questions: GuessImageQuestion[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const GuessImageGame: React.FC<GuessImageGameProps> = ({ questions, onComplete, onBack }) => {
  const { progress } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
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

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
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

  const progressPercentage = (currentIndex / questions.length) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${progress.highContrast ? 'contrast-125' : ''}`}>
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
        <span className="font-sans font-semibold text-slate-800">Guess Picture Quest</span>
        <div className="flex items-center gap-1.5 text-amber-500 font-sans font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
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
      <main className="flex-1 max-w-xl w-full mx-auto p-4 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-5">
          {/* Main Visual Board */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-4 mt-2">
            <span className="font-mono text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Quest {currentIndex + 1} of {questions.length}
            </span>

            {/* Flat SVG Illustration Rendering */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center w-40 h-40">
              <SVGIllustration name={currentQuestion.illustrationKey} className="w-32 h-32 transform hover:scale-105 transition duration-300" />
            </div>

            <h2 className="text-lg md:text-xl font-sans font-medium text-slate-800 text-center leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options List */}
          <div className={`grid grid-cols-2 gap-3 ${shake ? "animate-shake" : ""}`}>
            {currentQuestion.options.map((option) => {
              let btnClass = "border-slate-200 hover:border-orange-100 hover:bg-slate-50 bg-white text-slate-700 cursor-pointer";

              if (selectedOption === option) {
                btnClass = "border-orange-600 bg-orange-50 text-orange-950 font-semibold ring-2 ring-orange-100 cursor-pointer";
              }

              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-100";
                } else if (selectedOption === option) {
                  btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-100";
                } else {
                  btnClass = "opacity-40 border-slate-100 bg-white text-slate-500";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border-2 transition duration-200 flex flex-col items-center justify-center gap-1.5 text-base md:text-lg text-center cursor-pointer ${btnClass}`}
                  style={{ minHeight: "68px" }}
                >
                  <span>{option}</span>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <Flaticon name="check" className="w-6 h-6 mt-1" />
                  )}
                  {isAnswered && selectedOption === option && option !== currentQuestion.correctAnswer && (
                    <Flaticon name="cross" className="w-6 h-6 mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={`flex-1 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  selectedOption
                    ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                style={{ minHeight: "52px" }}
              >
                <Flaticon name="check_picture" className="w-6 h-6" />
                <span>Check Picture</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-[#F97316] hover:bg-[#EA580C] active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                style={{ minHeight: "52px" }}
              >
                <span>{currentIndex + 1 === questions.length ? "Finish Quest" : "Next Picture"}</span>
                <Flaticon name="arrow_next" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
