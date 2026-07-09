/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ReadingExercise } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star, BookOpen } from "lucide-react";

interface ReadingGameProps {
  exercises: ReadingExercise[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

export const ReadingGame: React.FC<ReadingGameProps> = ({ exercises, onComplete, onBack }) => {
  const { progress } = useGame();
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const currentExercise = exercises[exerciseIndex];
  const currentQuestion = currentExercise.questions[questionIndex];

  // Total questions in this entire game across all passages
  const totalQuestionsInGame = exercises.reduce((acc, ex) => acc + ex.questions.length, 0);
  // Current absolute question offset
  const absoluteQuestionIndex = exercises.slice(0, exerciseIndex).reduce((acc, ex) => acc + ex.questions.length, 0) + questionIndex;

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

    // Flow controls
    if (questionIndex + 1 < currentExercise.questions.length) {
      setQuestionIndex((q) => q + 1);
    } else if (exerciseIndex + 1 < exercises.length) {
      setExerciseIndex((e) => e + 1);
      setQuestionIndex(0);
    } else {
      // Completed all reading passages!
      const percentage = (score / totalQuestionsInGame) * 100;
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

  const progressPercentage = (absoluteQuestionIndex / totalQuestionsInGame) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${progress.highContrast ? "contrast-125" : ""}`}>
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
        <span className="font-sans font-semibold text-slate-800">Reading Comprehension</span>
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

      {/* Responsive Layout split - Bento Grid on desktop, stack on mobile */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-stretch">
        
        {/* LEFT COLUMN: Passage Card (Takes 5 cols) */}
        <div className="lg:col-span-6 flex flex-col mb-6 lg:mb-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-orange-600 border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="font-sans font-semibold text-sm uppercase tracking-wider">
                Reading Passage {exerciseIndex + 1} of {exercises.length}
              </span>
            </div>
            
            <h2 className="text-xl font-sans font-bold text-slate-900 leading-tight">
              {currentExercise.title}
            </h2>
            
            {/* The actual reading text */}
            <div className="flex-1 text-slate-700 font-sans leading-relaxed text-base overflow-y-auto max-h-[300px] lg:max-h-full bg-slate-50/50 p-4 rounded-xl border border-slate-100 mt-2">
              {currentExercise.passage}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Question and Options (Takes 6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            {/* Question Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <span className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Comprehension Question {questionIndex + 1} of {currentExercise.questions.length}
              </span>
              <h3 className="text-lg font-sans font-medium text-slate-800 mt-2 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Multiple Choice Options */}
            <div className={`grid grid-cols-1 gap-3 ${shake ? "animate-shake" : ""}`}>
              {currentQuestion.options.map((option) => {
                let btnClass = "border-slate-200 hover:border-slate-300 bg-white text-slate-800 cursor-pointer";

                if (selectedOption === option) {
                  btnClass = "border-orange-600 bg-orange-50/60 ring-2 ring-orange-100 text-orange-900 font-semibold cursor-pointer";
                }

                if (isAnswered) {
                  if (option === currentQuestion.correctAnswer) {
                    btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-100";
                  } else if (selectedOption === option) {
                    btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-100";
                  } else {
                    btnClass = "opacity-40 border-slate-200 bg-white text-slate-500";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition duration-200 flex items-center justify-between text-base cursor-pointer ${btnClass}`}
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

          {/* Action button container */}
          <div className="sticky bottom-4">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={`w-full font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  selectedOption
                    ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                style={{ minHeight: "52px" }}
              >
                <Flaticon name="check_reading" className="w-6 h-6" />
                <span>Check Reading Answer</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full bg-[#F97316] hover:bg-[#EA580C] active:scale-95 font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                style={{ minHeight: "52px" }}
              >
                <span>
                  {absoluteQuestionIndex + 1 === totalQuestionsInGame
                    ? "Finish Quest"
                    : "Next Question"}
                </span>
                <Flaticon name="arrow_next" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};
