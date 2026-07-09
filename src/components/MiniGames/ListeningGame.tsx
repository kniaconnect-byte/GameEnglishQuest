/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ListeningQuestion } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star, Volume2 } from "lucide-react";

interface ListeningGameProps {
  questions: ListeningQuestion[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const ListeningGame: React.FC<ListeningGameProps> = ({ questions, onComplete, onBack }) => {
  const { progress } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSpeak = () => {
    if (!currentQuestion) return;
    
    setIsPlayingAudio(true);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.audioText);
      utterance.lang = "en-US";
      const isLongSentence = currentQuestion.audioText.split(" ").length > 3;
      utterance.rate = isLongSentence ? 0.6 : 0.7; // Slower, highly legible rate for Grade 5 learners
      
      utterance.onend = () => {
        setIsPlayingAudio(false);
      };
      
      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      console.warn("Speech Synthesis not supported.");
      setIsPlayingAudio(false);
    }
  };

  // Auto-speak on question change
  useEffect(() => {
    // Small delay to allow component state transition and prevent issues
    const timer = setTimeout(() => {
      handleSpeak();
    }, 400);

    return () => clearTimeout(timer);
  }, [currentIndex]);

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

  const progressPercentage = (currentIndex / questions.length) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${progress.highContrast ? "contrast-125" : ""}`}>
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
          aria-label="Back to Chapter Selection"
          style={{ minHeight: "44px" }}
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <span className="font-sans font-semibold text-slate-800">Listening Quest</span>
        <div className="flex items-center gap-1.5 text-[#F97316] font-sans font-bold bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
          <Star className="w-5 h-5 fill-orange-400 stroke-orange-500" />
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

      <main className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          {/* Audio Player Card Board */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-5 mt-2">
            <span className="font-mono text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Question {currentIndex + 1} of {questions.length}
            </span>

            {/* Speaking / Audio Core Button */}
            <div className="relative flex items-center justify-center my-2">
              {/* Ripple Effect Animation */}
              {isPlayingAudio && (
                <>
                  <div className="absolute w-28 h-28 bg-orange-100 rounded-full animate-ping opacity-40" />
                  <div className="absolute w-36 h-36 bg-orange-50 rounded-full animate-pulse opacity-30" />
                </>
              )}
              
              <button
                onClick={handleSpeak}
                className="relative z-10 w-24 h-24 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition cursor-pointer"
                aria-label="Listen to pronunciation"
                style={{ minHeight: "96px" }}
              >
                <Volume2 className={`w-10 h-10 ${isPlayingAudio ? "animate-bounce" : ""}`} />
              </button>
            </div>

            <div className="text-center">
              <h3 className="text-lg md:text-xl font-sans font-extrabold text-slate-800 leading-tight">
                Listen and Answer
              </h3>
              <p className="text-sm font-sans text-slate-500 mt-1 max-w-sm">
                Tap the speaker button to hear the English words. Then, select the correct answer!
              </p>
            </div>

            <div className="w-full border-t border-slate-100 pt-4 mt-1">
              <p className="font-sans font-bold text-slate-850 text-base text-center">
                {currentQuestion.question}
              </p>
            </div>
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
                  btnClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold pointer-events-none";
                } else if (selectedOption === option) {
                  btnClass = "border-rose-500 bg-rose-50 text-rose-950 font-semibold pointer-events-none";
                } else {
                  btnClass = "border-slate-100 bg-slate-50 text-slate-400 opacity-60 pointer-events-none";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border-2 transition duration-200 flex flex-col items-center justify-center gap-1.5 text-base md:text-lg text-center ${btnClass}`}
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

          {/* Hint Card */}
          {showHint && currentQuestion.hint && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-slate-800 animate-fadeIn">
              <Flaticon name="help" className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold font-sans text-sm text-amber-900">Translation / Clue:</p>
                <p className="text-sm text-amber-800">{currentQuestion.hint}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Section */}
        <div className="flex gap-3 mt-6">
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
              className={`flex-1 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                selectedOption
                  ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
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
              className="flex-1 bg-[#F97316] hover:bg-[#EA580C] active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              style={{ minHeight: "52px" }}
            >
              <span>{currentIndex + 1 === questions.length ? "Finish Quest" : "Next Question"}</span>
              <Flaticon name="arrow_next" className="w-6 h-6" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
