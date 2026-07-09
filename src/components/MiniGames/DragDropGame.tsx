/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DragDropItem } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star } from "lucide-react";

interface DragDropGameProps {
  items: DragDropItem[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const DragDropGame: React.FC<DragDropGameProps> = ({ items, onComplete, onBack }) => {
  const { progress } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWord, setPlacedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const currentItem = items[currentIndex];

  const handleWordSelect = (word: string) => {
    if (isAnswered) return;
    playSound("click", progress.soundEnabled);
    if (placedWord === word) {
      setPlacedWord(null); // Deselect
    } else {
      setPlacedWord(word); // Place word
    }
  };

  const handleCheckAnswer = () => {
    if (!placedWord || isAnswered) return;

    const correct = placedWord === currentItem.blankValue;
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
    setPlacedWord(null);
    setIsAnswered(false);
    setIsCorrect(null);

    if (currentIndex + 1 < items.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate final game completion
      const percentage = (score / items.length) * 100;
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

  // Render sentence parts split around the blank space "____"
  const renderSentenceWithBlank = () => {
    const parts = currentItem.sentence.split("____");
    return (
      <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-2 text-lg md:text-xl font-sans text-slate-800 text-center font-medium leading-relaxed">
        <span>{parts[0]}</span>
        <div
          onClick={() => !isAnswered && setPlacedWord(null)}
          className={`px-4 py-1.5 min-w-[100px] border-2 rounded-xl flex items-center justify-center transition duration-200 cursor-pointer ${
            placedWord
              ? isAnswered
                ? isCorrect
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                  : "border-rose-500 bg-rose-50 text-rose-900 font-bold"
                : "border-orange-600 bg-orange-50 text-orange-950 font-bold animate-fadeIn"
              : "border-dashed border-slate-300 bg-slate-100 text-slate-400 font-normal hover:border-slate-400"
          }`}
          style={{ minHeight: "44px" }}
        >
          {placedWord || "?"}
        </div>
        <span>{parts[1]}</span>
      </div>
    );
  };

  const progressPercentage = (currentIndex / items.length) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${progress.highContrast ? 'contrast-125' : ''}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
          aria-label="Back"
          style={{ minHeight: "44px" }}
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <span className="font-sans font-semibold text-slate-800">Fill in the Blanks</span>
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
          {/* Sentence Display Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center gap-4">
            <span className="font-mono text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Item {currentIndex + 1} of {items.length}
            </span>

            <div className={`w-full py-4 px-2 ${shake ? "animate-shake" : ""}`}>
              {renderSentenceWithBlank()}
            </div>
          </div>

          {/* Word Choices */}
          <div className="flex flex-col gap-2">
            <span className="text-center font-mono text-xs text-slate-400 font-semibold uppercase tracking-widest">
              Tap a word to place it above
            </span>
            <div className="flex flex-wrap justify-center gap-3 mt-1">
              {currentItem.options.map((option) => {
                const isSelected = placedWord === option;
                let choiceClass = "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/20 text-slate-700 cursor-pointer";

                if (isSelected) {
                  choiceClass = "border-[#F97316] bg-orange-50 text-orange-950 font-semibold ring-2 ring-orange-200 opacity-50 cursor-pointer";
                }

                if (isAnswered) {
                  if (option === currentItem.blankValue) {
                    choiceClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold cursor-not-allowed";
                  } else if (isSelected) {
                    choiceClass = "border-rose-500 bg-rose-50 text-rose-950 font-semibold cursor-not-allowed";
                  } else {
                    choiceClass = "opacity-30 border-slate-100 bg-white text-slate-300 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleWordSelect(option)}
                    disabled={isAnswered}
                    className={`px-6 py-3 rounded-xl border-2 shadow-sm font-sans font-medium transition duration-200 text-base ${choiceClass}`}
                    style={{ minHeight: "52px" }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!placedWord}
                className={`flex-1 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  placedWord
                    ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                style={{ minHeight: "52px" }}
              >
                <Flaticon name="check_sentence" className="w-6 h-6" />
                <span>Check Sentence</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-[#F97316] hover:bg-[#EA580C] active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                style={{ minHeight: "52px" }}
              >
                <span>{currentIndex + 1 === items.length ? "Finish Quest" : "Next Sentence"}</span>
                <Flaticon name="arrow_next" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
