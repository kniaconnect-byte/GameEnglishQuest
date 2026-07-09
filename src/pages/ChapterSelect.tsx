/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { allChapters } from "../data";
import { SVGIllustration } from "../components/SVGIllustrations";
import { Lock, Star, Play, Check, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { playSound } from "../utils/audio";

interface ChapterSelectProps {
  onBack: () => void;
  onLaunchGame: (chapterId: number, activityKey: string) => void;
}

export const ChapterSelect: React.FC<ChapterSelectProps> = ({ onBack, onLaunchGame }) => {
  const { progress } = useGame();
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(1);

  const toggleChapterExpand = (chapterId: number, isUnlocked: boolean) => {
    if (!isUnlocked) {
      playSound("wrong", progress.soundEnabled);
      return;
    }
    playSound("click", progress.soundEnabled);
    setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
  };

  const handleStartActivity = (chapterId: number, activityKey: string) => {
    playSound("click", progress.soundEnabled);
    onLaunchGame(chapterId, activityKey);
  };

  // Maps activity IDs to their human-friendly game types and titles
  const activityMetadata: { [key: string]: { name: string; desc: string; icon: string } } = {
    guessImage: { name: "Picture Guesser", desc: "Guess terms using cards", icon: "apple" },
    matching: { name: "Card Matcher", desc: "Connect matching words", icon: "friendly" },
    dragDrop: { name: "Word Filler", desc: "Fill in sentence blanks", icon: "helping_hand" },
    listening: { name: "Listening Quest", desc: "Hear words and choose translations", icon: "compass" },
    reading: { name: "Reading Story", desc: "Read stories and answer questions", icon: "clever" },
    writing: { name: "Spelling Test", desc: "Spell and write translations", icon: "achievement" },
    completeSentence: { name: "Sentence Builder", desc: "Assemble word scrambles", icon: "patient" },
  };

  return (
    <div className={`flex flex-col gap-6 pb-12 ${progress.highContrast ? "contrast-125" : ""}`}>
      
      {/* Dynamic Curriculum Hub Overview Card */}
      <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-sans font-black text-slate-900 tracking-tight">
              Grade 5 Curriculum Journey
            </h3>
            <p className="text-slate-500 font-sans text-xs leading-relaxed mt-0.5 max-w-lg">
              Each chapter represents an official educational theme. Unlock subsequent chapters by completing activities in active ones! Earn 3 Stars to achieve mastery status.
            </p>
          </div>
        </div>
      </div>

      {/* Chapters list layout */}
      <div className="flex flex-col gap-6">
        {allChapters.map((chapter) => {
          const isUnlocked = progress.unlockedChapters.includes(chapter.id);
          const isExpanded = expandedChapterId === chapter.id;
          
          // Count completed activities in this chapter
          const allowedActivityKeys = ["guessImage", "matching", "dragDrop", "listening", "reading", "writing", "completeSentence"];
          const completedList = (progress.completedActivities[chapter.id] || []).filter(key => allowedActivityKeys.includes(key));
          const totalActivitiesCount = 7; 
          const completedCount = completedList.length;

          // Calculate earned stars
          let starsEarned = 0;
          if (completedCount === totalActivitiesCount) starsEarned = 3;
          else if (completedCount >= 4) starsEarned = 2;
          else if (completedCount >= 1) starsEarned = 1;

          const isFullyDone = completedCount === totalActivitiesCount;

          return (
            <div
              key={chapter.id}
              className={`transition-all duration-300 relative overflow-hidden ${
                isUnlocked
                  ? isExpanded
                    ? "bg-white rounded-[2rem] p-6 shadow-2xl shadow-orange-150/30 border-2 border-[#F97316] ring-4 ring-orange-50"
                    : "bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-orange-350"
                  : "bg-slate-100/50 rounded-[2rem] p-6 border border-dashed border-slate-300 opacity-60"
              }`}
            >
              
              {/* Checkmark Ribbon for fully completed chapters */}
              {isUnlocked && isFullyDone && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
              )}

              {/* Header card area clickable to toggle expansion */}
              <div
                onClick={() => toggleChapterExpand(chapter.id, isUnlocked)}
                className={`flex items-start gap-5 select-none ${isUnlocked ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {/* Chapter Icon Badge */}
                <div className={`p-3 rounded-2xl shrink-0 border transition-all duration-300 ${
                  isUnlocked 
                    ? isExpanded
                      ? "bg-[#F97316] border-[#F97316] text-white shadow-lg shadow-orange-100" 
                      : "bg-orange-50 border-orange-100 text-[#F97316]" 
                    : "bg-slate-200 border-slate-300 text-slate-400"
                }`}>
                  {isUnlocked ? (
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-8 h-8">
                        {chapter.id === 1 && <path d="M50 20 L20 80 L80 80 Z" fill="currentColor" />}
                        {chapter.id === 2 && <circle cx="50" cy="50" r="30" fill="currentColor" />}
                        {chapter.id === 3 && <rect x="25" y="25" width="50" height="50" rx="10" fill="currentColor" />}
                        {chapter.id === 4 && <polygon points="50,15 85,45 70,85 30,85 15,45" fill="currentColor" />}
                        {chapter.id === 5 && <path d="M50 15 L60 40 L85 45 L65 65 L70 90 L50 75 L30 90 L35 65 L15 45 L40 40 Z" fill="currentColor" />}
                      </svg>
                    </div>
                  ) : (
                    <Lock className="w-10 h-10 p-1 text-slate-400" />
                  )}
                </div>

                {/* Info titles */}
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-black text-[#F97316] uppercase tracking-widest bg-orange-50 border border-orange-100/50 px-2 py-0.5 rounded-md">
                      Chapter {chapter.id}
                    </span>
                    
                    {/* Stars earned display */}
                    {isUnlocked && (
                      <div className="flex gap-0.5 text-amber-400 pl-1">
                        {[1, 2, 3].map((starNum) => (
                          <Star
                            key={starNum}
                            className={`w-4 h-4 ${starNum <= starsEarned ? "fill-amber-400 stroke-amber-500" : "text-slate-200 stroke-slate-300"}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h4 className="text-xl font-sans font-black text-slate-900 tracking-tight leading-tight mt-1">
                    {chapter.title}
                  </h4>
                  <p className="text-slate-500 font-sans text-xs font-semibold leading-relaxed mt-0.5 pr-8">
                    {chapter.subtitle}
                  </p>

                  {/* Progress Line */}
                  {isUnlocked && (
                    <div className="flex items-center gap-3 mt-3 max-w-md">
                      <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/40">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                          style={{ width: `${(completedCount / totalActivitiesCount) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 font-black whitespace-nowrap">
                        {completedCount}/{totalActivitiesCount} Complete
                      </span>
                    </div>
                  )}
                </div>

                {/* Expander indicators */}
                {isUnlocked && (
                  <div className="text-slate-400 self-center pl-2">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#F97316] stroke-[3]" /> : <ChevronDown className="w-5 h-5 text-slate-400 stroke-[2.5]" />}
                  </div>
                )}
              </div>

              {/* Expandable Activities View */}
              {isUnlocked && isExpanded && (
                <div className="mt-6 pt-6 border-t border-slate-150/80 flex flex-col gap-5 animate-slideDown">
                  
                  {/* Objectives panel */}
                  <div className="bg-slate-50/70 rounded-2xl p-4 md:p-5 border border-slate-150 flex flex-col gap-2">
                    <span className="font-sans font-extrabold text-xs text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                      Chapter Objectives:
                    </span>
                    <ul className="list-disc pl-5 font-sans text-slate-600 text-xs sm:text-sm space-y-1.5 font-medium leading-relaxed">
                      {chapter.learningObjectives.map((obj, oIdx) => (
                        <li key={oIdx}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Available games list */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans font-black text-[10px] text-slate-400 uppercase tracking-widest pl-1 leading-none mb-1">
                      Chapter Activities:
                    </span>
                    <div className="flex flex-col gap-3">
                      {Object.keys(activityMetadata).map((activityKey) => {
                        const meta = activityMetadata[activityKey];
                        const isCompletedActivity = completedList.includes(activityKey);

                        return (
                          <div
                            key={activityKey}
                            className={`bg-white rounded-2xl p-4 border border-slate-150 flex items-center justify-between gap-4 shadow-sm hover:border-orange-100 hover:shadow transition duration-200`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className={`p-2.5 rounded-xl shrink-0 border ${
                                isCompletedActivity ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-orange-50/50 border-orange-100/50 text-[#F97316]"
                              }`}>
                                <div className="w-7 h-7 flex items-center justify-center font-bold text-xs uppercase font-mono">
                                  {activityKey.slice(0, 2)}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-sans font-black text-slate-800 text-sm leading-tight flex items-center gap-2">
                                  <span>{meta.name}</span>
                                  {isCompletedActivity && (
                                    <span className="p-0.5 bg-emerald-100 rounded-full shrink-0">
                                      <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                                    </span>
                                  )}
                                </span>
                                <span className="text-slate-400 font-sans text-xs font-semibold mt-0.5 leading-tight">
                                  {meta.desc}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleStartActivity(chapter.id, activityKey)}
                              className={`px-4 font-sans font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 border uppercase tracking-wider cursor-pointer ${
                                isCompletedActivity
                                  ? "bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border-slate-200 hover:border-orange-200 text-slate-500"
                                  : "bg-[#F97316] hover:bg-[#EA580C] text-white border-[#F97316]"
                              }`}
                              style={{ minHeight: "40px" }}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isCompletedActivity ? "Replay" : "Play"}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
