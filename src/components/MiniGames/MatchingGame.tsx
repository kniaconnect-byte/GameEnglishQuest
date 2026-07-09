/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MatchingPair } from "../../types";
import { playSound } from "../../utils/audio";
import { useGame } from "../../context/GameContext";
import { Flaticon } from "../Flaticon";
import { ArrowLeft, Star } from "lucide-react";

interface MatchingGameProps {
  pairs: MatchingPair[];
  onComplete: (xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

interface CardItem {
  id: string;
  text: string;
  type: "left" | "right";
  pairId: string;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({ pairs, onComplete, onBack }) => {
  const { progress } = useGame();
  const [leftCards, setLeftCards] = useState<CardItem[]>([]);
  const [rightCards, setRightCards] = useState<CardItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<CardItem | null>(null);
  const [selectedRight, setSelectedRight] = useState<CardItem | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [incorrectPairIds, setIncorrectPairIds] = useState<{left: string, right: string} | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Initialize and shuffle columns separately to ensure random layouts
  useEffect(() => {
    // Standard Fisher-Yates shuffle
    const shuffleArray = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    // Grab first 5-6 pairs to fit comfortably on small mobile screens
    const activePairs = pairs.slice(0, 6);

    const left = activePairs.map((p) => ({
      id: `left_${p.id}`,
      text: p.left,
      type: "left" as const,
      pairId: p.id,
    }));

    const right = activePairs.map((p) => ({
      id: `right_${p.id}`,
      text: p.right,
      type: "right" as const,
      pairId: p.id,
    }));

    setLeftCards(shuffleArray(left));
    setRightCards(shuffleArray(right));
    setMatchedPairIds([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setAttempts(0);
  }, [pairs]);

  // Handle Match Checking Logic
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      setAttempts((a) => a + 1);

      if (selectedLeft.pairId === selectedRight.pairId) {
        // MATCH!
        setMatchedPairIds((prev) => [...prev, selectedLeft.pairId]);
        playSound("correct", progress.soundEnabled);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // MISMATCH!
        setIncorrectPairIds({ left: selectedLeft.id, right: selectedRight.id });
        playSound("wrong", progress.soundEnabled);

        const timer = setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setIncorrectPairIds(null);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [selectedLeft, selectedRight]);

  const handleCardClick = (card: CardItem) => {
    if (matchedPairIds.includes(card.pairId)) return;
    if (incorrectPairIds) return; // wait for feedback to clear

    playSound("click", progress.soundEnabled);

    if (card.type === "left") {
      setSelectedLeft(card);
    } else {
      setSelectedRight(card);
    }
  };

  const isCompleted = matchedPairIds.length === Math.min(6, pairs.length) && matchedPairIds.length > 0;

  const handleFinish = () => {
    // Reward calculation based on attempts
    const totalPossiblePairs = Math.min(6, pairs.length);
    const efficiency = totalPossiblePairs / attempts; // 1.0 means perfect matching

    let stars = 1;
    let coins = 10;
    let xp = 20;

    if (efficiency >= 0.9) {
      stars = 3;
      coins = 25;
      xp = 50;
    } else if (efficiency >= 0.7) {
      stars = 2;
      coins = 18;
      xp = 35;
    }

    playSound("victory", progress.soundEnabled);
    onComplete(xp, stars, coins);
  };

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
        <span className="font-sans font-semibold text-slate-800">Word Match Quest</span>
        <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-sm">
          <span>Pairs matched: </span>
          <span>{matchedPairIds.length} / {Math.min(6, pairs.length)}</span>
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-4 mt-2">
          {/* Instructions Box */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
            <h2 className="font-sans font-medium text-slate-800">
              Match the English words on the left with their translations on the right!
            </h2>
            <p className="text-xs font-sans text-slate-500 mt-1">
              Tap a card from each column to link them.
            </p>
          </div>

          {/* Cards Column Split Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column (English) */}
            <div className="flex flex-col gap-3">
              <span className="text-center font-mono text-xs text-slate-500 font-semibold uppercase tracking-widest py-1 border-b border-slate-200">
                English
              </span>
              {leftCards.map((card) => {
                const isMatched = matchedPairIds.includes(card.pairId);
                const isSelected = selectedLeft?.id === card.id;
                const isIncorrect = incorrectPairIds?.left === card.id;

                let cardClass = "border-slate-200 hover:border-orange-100 hover:bg-slate-50/50 bg-white text-slate-800 cursor-pointer";

                if (isSelected) {
                  cardClass = "border-[#F97316] bg-orange-50 text-orange-950 font-semibold ring-2 ring-orange-200 scale-98 cursor-pointer";
                }
                if (isMatched) {
                  cardClass = "border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold opacity-60 cursor-not-allowed";
                }
                if (isIncorrect) {
                  cardClass = "border-rose-500 bg-rose-100 text-rose-900 font-bold ring-2 ring-rose-200 animate-shake cursor-pointer";
                }

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched}
                    className={`p-4 rounded-xl border-2 transition duration-200 flex items-center justify-between shadow-sm ${cardClass}`}
                    style={{ minHeight: "60px" }}
                  >
                    <span className="text-sm sm:text-base font-sans text-left leading-snug">{card.text}</span>
                    {isMatched && <Flaticon name="check" className="w-5 h-5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>

            {/* Right Column (Indonesian / Translation) */}
            <div className="flex flex-col gap-3">
              <span className="text-center font-mono text-xs text-slate-500 font-semibold uppercase tracking-widest py-1 border-b border-slate-200">
                Indonesian
              </span>
              {rightCards.map((card) => {
                const isMatched = matchedPairIds.includes(card.pairId);
                const isSelected = selectedRight?.id === card.id;
                const isIncorrect = incorrectPairIds?.right === card.id;

                let cardClass = "border-slate-200 hover:border-orange-100 hover:bg-slate-50/50 bg-white text-slate-800 cursor-pointer";

                if (isSelected) {
                  cardClass = "border-[#F97316] bg-orange-50 text-orange-950 font-semibold ring-2 ring-orange-200 scale-98 cursor-pointer";
                }
                if (isMatched) {
                  cardClass = "border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold opacity-60 cursor-not-allowed";
                }
                if (isIncorrect) {
                  cardClass = "border-rose-500 bg-rose-100 text-rose-900 font-bold ring-2 ring-rose-200 animate-shake cursor-pointer";
                }

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched}
                    className={`p-4 rounded-xl border-2 transition duration-200 flex items-center justify-between shadow-sm ${cardClass}`}
                    style={{ minHeight: "60px" }}
                  >
                    <span className="text-sm sm:text-base font-sans text-left leading-snug">{card.text}</span>
                    {isMatched && <Flaticon name="check" className="w-5 h-5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="sticky bottom-4">
          <button
            onClick={handleFinish}
            disabled={!isCompleted}
            className={`w-full font-sans font-bold text-white rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
              isCompleted
                ? "bg-[#F97316] hover:bg-[#EA580C] active:scale-95"
                : "bg-slate-300 cursor-not-allowed opacity-50"
            }`}
            style={{ minHeight: "52px" }}
          >
            <Flaticon name="trophy" className="w-6 h-6" />
            <span>Finish Matching</span>
          </button>
        </div>
      </main>
    </div>
  );
};
