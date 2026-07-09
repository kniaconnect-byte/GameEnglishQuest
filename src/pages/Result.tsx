/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useGame } from "../context/GameContext";
import { SVGIllustration } from "../components/SVGIllustrations";
import { ArrowLeft, Star, Coins, Sparkles, BookOpen, ChevronRight, Trophy } from "lucide-react";
import { playSound } from "../utils/audio";

interface ResultProps {
  xpEarned: number;
  starsEarned: number;
  coinsEarned: number;
  onContinue: () => void;
}

export const Result: React.FC<ResultProps> = ({ xpEarned, starsEarned, coinsEarned, onContinue }) => {
  const { progress } = useGame();

  const handleContinueClick = () => {
    playSound("click", progress.soundEnabled);
    onContinue();
  };

  // Convert XP into levels (100 XP per level)
  const currentLevel = Math.floor(progress.xp / 100) + 1;
  const currentLevelXp = progress.xp % 100;

  // Celebratory text based on stars earned
  const getFeedbackMessage = () => {
    switch (starsEarned) {
      case 3:
        return {
          title: "Spectacular Job!",
          subtitle: "Luar Biasa! Perfect score! Keep on questing!",
        };
      case 2:
        return {
          title: "Brilliant Effort!",
          subtitle: "Hebat! Almost perfect! You are growing stronger!",
        };
      default:
        return {
          title: "Quest Completed!",
          subtitle: "Bagus! Keep practicing to get three stars next time!",
        };
    }
  };

  const feedback = getFeedbackMessage();

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 md:p-6 relative overflow-hidden ${progress.highContrast ? "contrast-125" : ""}`}>
      
      {/* Absolute Decorative SVG floating shapes (Vector Confetti replacement) */}
      <div className="absolute top-12 left-8 text-amber-300 opacity-20 pointer-events-none animate-bounceSlow">
        <Star className="w-16 h-16 fill-current" />
      </div>
      <div className="absolute bottom-20 right-10 text-orange-200 opacity-20 pointer-events-none animate-bounceSlow" style={{ animationDelay: "1s" }}>
        <Trophy className="w-20 h-20" />
      </div>
      <div className="absolute top-1/2 right-12 text-yellow-300 opacity-20 pointer-events-none animate-pulseSlow">
        <Coins className="w-12 h-12" />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 flex flex-col items-center gap-6 relative z-10">
        
        {/* Level Complete Header */}
        <div className="flex flex-col items-center text-center gap-1.5 mt-2">
          <div className="p-3 bg-orange-50 border border-orange-100 rounded-2xl text-orange-600 mb-1.5">
            <Trophy className="w-8 h-8 text-orange-600" />
          </div>
          <span className="font-mono text-xs font-bold text-orange-700 uppercase tracking-widest leading-none">
            Quest Finished!
          </span>
          <h1 className="text-3xl font-sans font-black text-slate-900 tracking-tight">
            {feedback.title}
          </h1>
          <p className="text-sm font-sans text-slate-500 font-medium max-w-xs mt-0.5 leading-relaxed">
            {feedback.subtitle}
          </p>
        </div>

        {/* Stars animation panel */}
        <div className="flex justify-center gap-4.5 py-2.5">
          {[1, 2, 3].map((starNum) => {
            const active = starNum <= starsEarned;
            return (
              <div
                key={starNum}
                className={`transform transition duration-500 scale-100 ${
                  active ? "scale-110 animate-pulseSlow" : "opacity-30"
                }`}
                style={{ animationDelay: `${starNum * 0.15}s` }}
              >
                <SVGIllustration name="star" className={`w-14 h-14 ${starNum === 2 ? "w-16 h-16" : ""}`} />
              </div>
            );
          })}
        </div>

        {/* Rewards Breakdown Cards */}
        <div className="w-full bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col gap-3 shadow-inner">
          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-0.5">
            Your earned rewards:
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            {/* XP */}
            <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col items-center justify-center gap-1 text-center">
              <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">EXP</span>
              <span className="font-mono text-base font-extrabold text-[#F97316] leading-none">+{xpEarned} XP</span>
            </div>

            {/* Stars */}
            <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col items-center justify-center gap-1 text-center">
              <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">STARS</span>
              <span className="font-mono text-base font-extrabold text-amber-500 leading-none">+{starsEarned}</span>
            </div>

            {/* Coins */}
            <div className="bg-white border border-slate-150 p-2.5 rounded-lg flex flex-col items-center justify-center gap-1 text-center">
              <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">COINS</span>
              <span className="font-mono text-base font-extrabold text-yellow-600 leading-none">+{coinsEarned}</span>
            </div>
          </div>

          {/* Current Level XP Line bar */}
          <div className="flex flex-col gap-1.5 mt-1.5 px-0.5">
            <div className="flex justify-between text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wide">
              <span>Next Level Progress</span>
              <span>{currentLevelXp}/100 XP</span>
            </div>
            <div className="w-full bg-slate-150 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#F97316] h-2.5 rounded-full"
                style={{ width: `${currentLevelXp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinueClick}
          className="w-full bg-[#F97316] hover:bg-[#EA580C] active:scale-95 text-white font-sans font-bold text-base rounded-xl shadow-lg shadow-orange-100/60 transition flex items-center justify-center gap-2 cursor-pointer"
          style={{ minHeight: "52px" }}
        >
          <Sparkles className="w-5 h-5" />
          <span>Continue Adventure</span>
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
