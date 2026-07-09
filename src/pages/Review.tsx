/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { allChapters } from "../data";
import { VocabularyItem } from "../types";
import { SVGIllustration } from "../components/SVGIllustrations";
import { ChevronLeft, ChevronRight, RefreshCw, Star, Info, BookOpen, Languages } from "lucide-react";
import { playSound } from "../utils/audio";

interface ReviewProps {
  onBack: () => void;
}

export const Review: React.FC<ReviewProps> = ({ onBack }) => {
  const { progress } = useGame();
  const [selectedChapterId, setSelectedChapterId] = useState<number | "all">("all");
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Compile vocabulary based on selected chapter filter
  useEffect(() => {
    let list: VocabularyItem[] = [];
    if (selectedChapterId === "all") {
      allChapters.forEach((ch) => {
        list = [...list, ...ch.vocabulary];
      });
    } else {
      const chapter = allChapters.find((ch) => ch.id === selectedChapterId);
      if (chapter) {
        list = [...chapter.vocabulary];
      }
    }
    setVocabList(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedChapterId]);

  const handleFlipCard = () => {
    playSound("click", progress.soundEnabled);
    setIsFlipped(!isFlipped);
  };

  const handlePrev = () => {
    playSound("click", progress.soundEnabled);
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setCurrentIndex(vocabList.length - 1); // wrap around
    }
  };

  const handleNext = () => {
    playSound("click", progress.soundEnabled);
    setIsFlipped(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0); // wrap around
    }
  };

  const currentVocab = vocabList[currentIndex];

  return (
    <div className={`flex flex-col gap-6 pb-12 ${progress.highContrast ? "contrast-125" : ""}`}>
      
      {/* Dynamic Summary bar */}
      <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-slate-100/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-sans font-black text-slate-900 leading-tight">Vocabulary Training Deck</h3>
            <p className="text-slate-500 font-sans text-xs">
              Flip through cards to practice vocabulary spelling and Indonesian translation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-black text-orange-700 bg-orange-50 border border-orange-100/50 px-3.5 py-2 rounded-full shrink-0">
          <span>{vocabList.length} words registered</span>
        </div>
      </div>

      {/* Horizontal filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none scroll-smooth">
        <button
          onClick={() => { playSound("click", progress.soundEnabled); setSelectedChapterId("all"); }}
          className={`px-4 py-2 font-sans font-black text-xs rounded-xl border-2 transition shrink-0 uppercase tracking-wider cursor-pointer ${
            selectedChapterId === "all"
              ? "bg-[#F97316] border-[#F97316] text-white shadow-md shadow-orange-100/60"
              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
          style={{ minHeight: "38px" }}
        >
          All Chapters
        </button>
        {[1, 2, 3, 4, 5].map((chId) => (
          <button
            key={chId}
            onClick={() => { playSound("click", progress.soundEnabled); setSelectedChapterId(chId); }}
            className={`px-4 py-2 font-sans font-black text-xs rounded-xl border-2 transition shrink-0 uppercase tracking-wider cursor-pointer ${
              selectedChapterId === chId
                ? "bg-[#F97316] border-[#F97316] text-white shadow-md shadow-orange-100/60"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
            style={{ minHeight: "38px" }}
          >
            Ch {chId}
          </button>
        ))}
      </div>

      {/* The 3D Interactive Flip Card Component */}
      {vocabList.length > 0 && currentVocab ? (
        <div className="flex flex-col items-center gap-6 mt-1">
          
          {/* Card perspective wrapper */}
          <div
            onClick={handleFlipCard}
            className="perspective-[1200px] w-full max-w-md h-80 cursor-pointer group"
          >
            {/* Inner container applying flip rotation */}
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              
              {/* CARD FACE FRONT: English & Illustration */}
              <div 
                className={`absolute w-full h-full backface-hidden bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-2xl shadow-slate-100/60 p-6 flex flex-col items-center justify-between transition-opacity duration-300 ${
                  isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                style={{ visibility: isFlipped ? "hidden" : "visible" }}
              >
                <span className="font-mono text-[9px] text-[#F97316] font-black uppercase tracking-widest bg-orange-50 border border-orange-150/60 px-3 py-1 rounded-full">
                  Vocabulary Front • Tap card to flip
                </span>

                {/* Illustration SVG representation */}
                <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-3xl w-32 h-32 flex items-center justify-center shadow-inner mt-2">
                  <SVGIllustration name={currentVocab.illustrationKey} className="w-24 h-24 transform group-hover:scale-105 transition duration-300" />
                </div>

                <div className="text-center mt-3 flex flex-col gap-0.5">
                  <h2 className="text-3xl font-sans font-black text-slate-900 tracking-tight leading-none">
                    {currentVocab.word}
                  </h2>
                  {currentVocab.category && (
                    <p className="font-sans text-xs text-slate-400 font-semibold italic mt-2">
                      Category: {currentVocab.category}
                    </p>
                  )}
                </div>

                <div className="w-full max-w-xs bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-2xl py-3 px-4 flex items-center justify-center gap-2.5 text-emerald-700 font-sans font-extrabold text-xs shadow-md shadow-emerald-50/50 transition-all duration-250 active:scale-95">
                  <Languages className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>LIHAT TERJEMAHAN (SHOW TRANSLATION)</span>
                </div>
              </div>

              {/* CARD FACE BACK: Translation & Meanings */}
              <div 
                className={`absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-[2.5rem] border-2 border-[#F97316] shadow-2xl shadow-orange-100/30 p-6 flex flex-col justify-between transition-opacity duration-300 ${
                  isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ visibility: isFlipped ? "visible" : "hidden" }}
              >
                
                {/* Top info row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="font-mono text-[9px] text-emerald-700 font-black uppercase tracking-widest bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-full">
                    Translation Back
                  </span>
                  <span className="text-[10px] font-sans font-black text-slate-400 uppercase tracking-wider bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
                    Category: {currentVocab.category || "Word"}
                  </span>
                </div>

                {/* Indonesian Translation & Definition */}
                <div className="flex-1 flex flex-col justify-center gap-4 py-2 text-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-sans text-[10px] uppercase tracking-widest font-black leading-none mb-1.5">Indonesian:</span>
                    <h3 className="text-3xl font-sans font-black text-emerald-600 leading-none">
                      {currentVocab.meaning}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-150 text-left shadow-inner">
                    <span className="text-[10px] font-sans font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#F97316]" />
                      English word:
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-slate-700 font-semibold italic leading-relaxed">
                      {currentVocab.word}
                    </p>
                  </div>
                </div>

                {/* Bottom trigger hint */}
                <div className="w-full max-w-xs mx-auto bg-orange-50 hover:bg-orange-100 border border-orange-200/80 rounded-2xl py-3 px-4 flex items-center justify-center gap-2.5 text-orange-700 font-sans font-extrabold text-xs shadow-md shadow-orange-50/50 transition-all duration-250 active:scale-95">
                  <RefreshCw className="w-3.5 h-3.5 text-[#F97316] animate-spinSlow" />
                  <span>LIHAT KATA INGGRIS (SHOW ENGLISH)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Elegant Flip Button */}
          <button
            onClick={handleFlipCard}
            className="w-full max-w-md bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-650 hover:to-emerald-700 active:scale-95 text-white font-sans font-black text-sm py-4 px-6 rounded-2xl shadow-xl shadow-emerald-200/80 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer mt-2"
            style={{ minHeight: "52px" }}
          >
            <Languages className="w-5 h-5 text-white animate-pulse" />
            <span>{isFlipped ? "LIHAT BAHASA INGGRIS (SHOW ENGLISH)" : "LIHAT TERJEMAHAN (SHOW TRANSLATION)"}</span>
          </button>

          {/* Pagination Controllers */}
          <div className="flex items-center justify-between gap-6 w-full max-w-xs mt-3">
            <button
              onClick={handlePrev}
              className="p-3.5 bg-white border-2 border-slate-200 hover:border-orange-350 text-slate-700 rounded-full shadow-md active:scale-95 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 cursor-pointer"
              aria-label="Previous Word"
              style={{ minHeight: "52px", minWidth: "52px" }}
            >
              <ChevronLeft className="w-6 h-6 text-slate-700 stroke-[2.5]" />
            </button>

            <span className="font-mono text-sm text-slate-500 font-black">
              {currentIndex + 1} / {vocabList.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3.5 bg-white border-2 border-slate-200 hover:border-orange-350 text-slate-700 rounded-full shadow-md active:scale-95 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 cursor-pointer"
              aria-label="Next Word"
              style={{ minHeight: "52px", minWidth: "52px" }}
            >
              <ChevronRight className="w-6 h-6 text-slate-700 stroke-[2.5]" />
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-150 p-8 text-center text-slate-500 flex flex-col gap-2 shadow-sm">
          <span className="font-sans font-bold">No vocabulary entries found for this chapter.</span>
          <p className="text-xs text-slate-400">Please choose another Chapter filter above.</p>
        </div>
      )}

    </div>
  );
};
