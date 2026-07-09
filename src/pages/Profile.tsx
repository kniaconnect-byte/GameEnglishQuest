/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { SVGIllustration } from "../components/SVGIllustrations";
import { Edit2, Check, Star, Trophy, Award, Sparkles, BookOpen, Gamepad2 } from "lucide-react";
import { playSound } from "../utils/audio";

interface ProfileProps {
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const { progress, updateProfile } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(progress.nickname);

  const handleEditClick = () => {
    playSound("click", progress.soundEnabled);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    playSound("click", progress.soundEnabled);
    const trimmed = tempName.trim();
    if (trimmed) {
      updateProfile(trimmed, progress.selectedAvatar);
    }
    setIsEditing(false);
  };

  // Convert XP into visual levels (100 XP per level)
  const currentLevel = Math.floor(progress.xp / 100) + 1;
  const currentLevelXp = progress.xp % 100;

  // Complete game activity count
  const completedCount = Object.values(progress.completedActivities).reduce<number>(
    (acc, arr) => acc + (arr as string[]).length,
    0
  );

  const totalActivitiesCount = 5 * 7; // 5 chapters, 7 activities per chapter

  // Badges catalog
  const allBadges = [
    { id: "star_catcher", title: "Star Catcher", desc: "Earn 15 stars in quests", icon: "star" },
    { id: "wealthy", title: "Coin Master", desc: "Collect 50 gold coins", icon: "coin" },
    { id: "brainy", title: "Super Brain", desc: "Earn 300 XP in total", icon: "achievement" },
    { id: "explorer", title: "Chapter 3 Explorer", desc: "Unlock Chapter 3", icon: "badge" },
    { id: "champion", title: "Ultimate Champion", desc: "Unlock Chapter 5", icon: "trophy" },
  ];

  return (
    <div className={`flex flex-col gap-6 pb-12 ${progress.highContrast ? "contrast-125" : ""}`}>
      
      {/* Profile Overview Card (Avatar & Name Edit) */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/25 flex flex-col items-center gap-4 text-center">
        
        {/* Avatar frame */}
        <div className="p-4 bg-orange-50 border-2 border-orange-100 rounded-full shadow-inner relative flex items-center justify-center w-28 h-28 hover:scale-105 transition duration-300">
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            {progress.selectedAvatar === "avatar_boy1" && (
              <>
                <circle cx="50" cy="50" r="45" fill="#38BDF8" />
                <circle cx="50" cy="48" r="20" fill="#FDBA74" />
                <path d="M 30 40 Q 50 15, 70 40" fill="#1E293B" />
                <circle cx="43" cy="48" r="2.5" fill="#1E293B" />
                <circle cx="57" cy="48" r="2.5" fill="#1E293B" />
              </>
            )}
            {progress.selectedAvatar === "avatar_girl1" && (
              <>
                <circle cx="50" cy="50" r="45" fill="#FDA4AF" />
                <circle cx="50" cy="48" r="20" fill="#FDBA74" />
                <circle cx="28" cy="38" r="8" fill="#78350F" />
                <circle cx="72" cy="38" r="8" fill="#78350F" />
                <path d="M 30 40 Q 50 25, 70 40" fill="#78350F" stroke="#78350F" strokeWidth="2" />
                <circle cx="43" cy="48" r="2.5" fill="#1E293B" />
                <circle cx="57" cy="48" r="2.5" fill="#1E293B" />
              </>
            )}
            {progress.selectedAvatar === "avatar_boy2" && (
              <>
                <circle cx="50" cy="50" r="45" fill="#FCD34D" />
                <circle cx="50" cy="48" r="20" fill="#FDBA74" />
                <path d="M 30 40 Q 50 22, 70 40" fill="#FDE047" stroke="#FDE047" strokeWidth="2" />
                <circle cx="43" cy="48" r="2.5" fill="#1E293B" />
                <circle cx="57" cy="48" r="2.5" fill="#1E293B" />
              </>
            )}
            {progress.selectedAvatar === "avatar_girl2" && (
              <>
                <circle cx="50" cy="50" r="45" fill="#C084FC" />
                <circle cx="50" cy="48" r="20" fill="#FDBA74" />
                <path d="M 28 35 L 32 70 L 34 40 Q 50 20, 66 40 L 68 70 L 72 35 Z" fill="#1E293B" />
                <circle cx="43" cy="48" r="2.5" fill="#1E293B" />
                <circle cx="57" cy="48" r="2.5" fill="#1E293B" />
              </>
            )}
          </svg>
          
          {/* Level tag */}
          <div className="absolute -bottom-1 right-1 bg-[#F97316] border-2 border-white text-white font-mono font-black text-xs px-2.5 py-1 rounded-full shadow-md">
            LVL {currentLevel}
          </div>
        </div>

        {/* Nickname Editor */}
        <div className="w-full flex items-center justify-center gap-2.5 mt-1 px-2">
          {isEditing ? (
            <div className="flex w-full max-w-xs gap-1.5">
              <input
                type="text"
                maxLength={15}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-3 py-1.5 border-2 border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-lg text-base font-sans font-bold outline-none"
                style={{ minHeight: "36px" }}
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition shrink-0"
                style={{ minHeight: "36px" }}
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-sans font-black text-slate-850 tracking-tight leading-none">
                {progress.nickname}
              </span>
              <button
                onClick={handleEditClick}
                className="p-1.5 text-slate-400 hover:text-orange-600 transition cursor-pointer"
                aria-label="Edit Nickname"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Level XP Bar Details */}
        <div className="w-full flex flex-col gap-1.5 px-2 max-w-md">
          <div className="flex justify-between text-[11px] font-mono text-slate-500 font-bold px-0.5">
            <span>Experience Points (XP)</span>
            <span>{currentLevelXp}/100 XP</span>
          </div>
          <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#F97316] h-full rounded-full"
              style={{ width: `${currentLevelXp}%` }}
            />
          </div>
        </div>

      </div>

      {/* Numeric Statistics Bento */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/20 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-150 pb-2">
          <Trophy className="w-5 h-5 text-orange-600" />
          <h4 className="font-sans font-black text-slate-850 text-sm uppercase tracking-wider">Report Card Statistics</h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Stars */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-150 flex flex-col gap-1 shadow-inner">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
              <span className="font-sans font-black text-slate-500 text-xs">Total Stars</span>
            </div>
            <span className="font-mono text-2xl font-black text-slate-800">{progress.stars}</span>
          </div>

          {/* Coins */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-150 flex flex-col gap-1 shadow-inner">
            <div className="flex items-center gap-1.5 text-yellow-600">
              <Gamepad2 className="w-5 h-5 text-yellow-500" />
              <span className="font-sans font-black text-slate-500 text-xs">Gold Coins</span>
            </div>
            <span className="font-mono text-2xl font-black text-slate-800">{progress.coins}</span>
          </div>

          {/* Completed Activities */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-150 flex flex-col gap-1 shadow-inner">
            <div className="flex items-center gap-1.5 text-orange-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-sans font-black text-slate-500 text-xs">Completed Activities</span>
            </div>
            <span className="font-mono text-xl font-black text-slate-800 leading-tight">
              {completedCount} / {totalActivitiesCount}
            </span>
          </div>

          {/* Unlocked Chapters */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-150 flex flex-col gap-1 shadow-inner">
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span className="font-sans font-black text-slate-500 text-xs">Unlocked Map</span>
            </div>
            <span className="font-mono text-xl font-black text-slate-800 leading-tight">
              Chapter {progress.unlockedChapters[progress.unlockedChapters.length - 1]} / 5
            </span>
          </div>
        </div>

      </div>

      {/* Badges and achievements cabinet */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/20 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-150 pb-2">
          <Award className="w-5 h-5 text-orange-600" />
          <h4 className="font-sans font-black text-slate-850 text-sm uppercase tracking-wider">Achievements Cabinet</h4>
        </div>

        <div className="flex flex-col gap-3">
          {allBadges.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition ${
                  isUnlocked
                    ? "bg-slate-50/60 border-slate-200"
                    : "bg-slate-100/50 border-slate-100 opacity-60"
                }`}
              >
                <div className={`p-1 rounded-xl shrink-0 ${isUnlocked ? "" : "grayscale"}`}>
                  <SVGIllustration name={badge.icon} className="w-10 h-10" />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className={`font-sans font-black text-sm leading-tight ${isUnlocked ? "text-slate-800" : "text-slate-500"}`}>
                    {badge.title}
                  </span>
                  <span className="text-slate-400 font-sans text-xs mt-0.5 leading-none">
                    {badge.desc}
                  </span>
                </div>
                {isUnlocked ? (
                  <span className="px-2.5 py-1 bg-emerald-100 border border-emerald-150 rounded-full text-emerald-700 font-sans font-black text-[10px] uppercase tracking-wider shrink-0 leading-none">
                    Earned
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-slate-200 border border-slate-300 rounded-full text-slate-400 font-sans font-black text-[10px] uppercase tracking-wider shrink-0 leading-none">
                    Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
