/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useGame } from "../context/GameContext";
import { SVGIllustration } from "../components/SVGIllustrations";
import { Gamepad2, Award, BookOpen, User, Compass, Sparkles, Trophy, Star, ArrowRight } from "lucide-react";
import { playSound } from "../utils/audio";

interface HomeProps {
  onNavigate: (page: "splash" | "home" | "chapters" | "settings" | "profile" | "review") => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { progress } = useGame();

  const handleNavigateClick = (page: "splash" | "home" | "chapters" | "settings" | "profile" | "review") => {
    playSound("click", progress.soundEnabled);
    onNavigate(page);
  };

  // Convert XP into visual levels (100 XP per level)
  const currentLevel = Math.floor(progress.xp / 100) + 1;
  const currentLevelXp = progress.xp % 100;

  // Static badges dictionary
  const badgeMap: { [key: string]: { title: string; desc: string; icon: string } } = {
    explorer: { title: "Explorer", desc: "Unlock Chapter 3", icon: "badge" },
    champion: { title: "Quest Champion", desc: "Unlock Chapter 5", icon: "trophy" },
    star_catcher: { title: "Star Catcher", desc: "Earn 15 Stars", icon: "star" },
    wealthy: { title: "Coin Master", desc: "Earn 50 Coins", icon: "coin" },
    brainy: { title: "Super Brain", desc: "Earn 300 XP", icon: "achievement" },
  };

  return (
    <div className={`flex flex-col gap-6 md:gap-8 pb-12 ${progress.highContrast ? "contrast-125" : ""}`}>
      
      {/* Personalized Welcome Banner & Level Card */}
      <div className="bg-gradient-to-r from-[#FF6B35] via-[#FF8F3D] to-[#F59E0B] rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-orange-150/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Dynamic ambient rays in welcome card */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-300/25 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10 shrink-0">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
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
          </div>

          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="font-mono text-xs bg-white/20 border border-white/10 px-2 py-0.5 rounded-full font-bold">
                LEVEL {currentLevel}
              </span>
              <span className="text-white/80 font-mono text-[10px] font-black uppercase tracking-wider">
                Hero Tier
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight mt-1">
              Hai, {progress.nickname}!
            </h2>
            <p className="text-white/85 text-sm font-sans mt-0.5">
              Ready to learn English chapters and gain spectacular powers?
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => handleNavigateClick("chapters")}
          className="bg-white text-[#E05318] hover:bg-slate-50 hover:scale-105 active:scale-95 px-6 py-3.5 rounded-2xl font-bold font-sans text-sm shadow-lg shadow-orange-900/10 flex items-center gap-2 transition duration-200 cursor-pointer"
          style={{ minHeight: "48px" }}
        >
          <span>Start Chapters Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Play Action Banner */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-100/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 animate-pulseSlow text-orange-600">
            <Compass className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-sans font-black text-slate-900 tracking-tight">
              Adventure Quest Map
            </h3>
            <p className="text-slate-500 font-sans text-sm max-w-md leading-relaxed mt-0.5">
              Play curriculum chapters matched for Grade 5! Complete quizzes, drag-and-drop, writing exercises and unlock new worlds.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleNavigateClick("chapters")}
          className="w-full md:w-56 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-sans font-black text-base rounded-2xl shadow-lg shadow-orange-100/60 transition flex items-center justify-center gap-2 cursor-pointer"
          style={{ minHeight: "52px" }}
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Launch Quest Map</span>
        </button>
      </div>

      {/* Feature Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {/* Flashcards Deck card */}
        <button
          onClick={() => handleNavigateClick("review")}
          className="bg-white hover:bg-slate-50 active:scale-95 border border-slate-100 p-6 rounded-[2rem] shadow-xl shadow-slate-100/30 text-left flex items-start gap-4 transition group"
          style={{ minHeight: "120px" }}
        >
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-12 h-12 flex items-center justify-center border border-emerald-100/60 shrink-0 group-hover:scale-110 transition duration-350">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-sans font-black text-slate-900 text-base leading-tight">
              Vocabulary Deck
            </h4>
            <p className="text-slate-500 font-sans text-xs leading-relaxed mt-1">
              Flip beautiful 3D flashcards covering Grade 5 terms. Practice definitions, Indonesian translations, and spelling.
            </p>
            <div className="flex items-center gap-1.5 mt-3 font-bold text-xs text-emerald-600">
              <span>Review words</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </button>

        {/* Profile Stats card */}
        <button
          onClick={() => handleNavigateClick("profile")}
          className="bg-white hover:bg-slate-50 active:scale-95 border border-slate-100 p-6 rounded-[2rem] shadow-xl shadow-slate-100/30 text-left flex items-start gap-4 transition group"
          style={{ minHeight: "120px" }}
        >
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-12 h-12 flex items-center justify-center border border-amber-100/60 shrink-0 group-hover:scale-110 transition duration-350">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-sans font-black text-slate-900 text-base leading-tight">
              My Profile Progress
            </h4>
            <p className="text-slate-500 font-sans text-xs leading-relaxed mt-1">
              Inspect your XP accomplishments, star counts, coins, and claim epic achievement awards. Customize your Nickname!
            </p>
            <div className="flex items-center gap-1.5 mt-3 font-bold text-xs text-amber-600">
              <span>View badges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </button>
      </div>

      {/* Unlocked Badges Showcase */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/20 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            <h4 className="font-sans font-extrabold text-slate-800 text-sm uppercase tracking-wider">
              Unlocked Badges ({progress.unlockedBadges.length})
            </h4>
          </div>
          <button
            onClick={() => handleNavigateClick("profile")}
            className="text-xs text-orange-600 font-black hover:underline cursor-pointer"
          >
            All Achievements
          </button>
        </div>

        {progress.unlockedBadges.length === 0 ? (
          <div className="text-center py-6 flex flex-col items-center gap-1 text-slate-400">
            <div className="p-3 bg-slate-50 rounded-full border border-slate-100 mb-1">
              <Award className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-xs font-sans font-bold">No badges unlocked yet.</p>
            <p className="text-[11px] font-sans text-slate-400">Keep playing curriculum quests to claim badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {progress.unlockedBadges.slice(0, 4).map((badgeId) => {
              const badge = badgeMap[badgeId];
              if (!badge) return null;
              return (
                <div key={badgeId} className="flex items-center gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                  <div className="p-1 bg-white rounded-xl shadow-sm border border-slate-100 shrink-0">
                    <SVGIllustration name={badge.icon} className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-black text-slate-800 text-sm leading-tight">{badge.title}</span>
                    <span className="text-slate-400 font-sans text-[11px] mt-0.5">{badge.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Weekend Challenge Promo bento card (Vibe booster) */}
      <div className="bg-[#FEF3C7]/40 border-2 border-dashed border-[#F59E0B]/30 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5 flex-col sm:flex-row">
          <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
            <Trophy className="w-5.5 h-5.5 fill-current" />
          </div>
          <div>
            <h5 className="font-sans font-black text-amber-900 text-sm">
              Weekend Master Challenge Quest!
            </h5>
            <p className="text-xs text-amber-700 font-sans mt-0.5">
              Score 3 Stars in all Chapter activities to earn the mythical Coin Master badge!
            </p>
          </div>
        </div>
        <button
          onClick={() => handleNavigateClick("chapters")}
          className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-sans font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-amber-200 transition duration-200"
          style={{ minHeight: "36px" }}
        >
          Check Map
        </button>
      </div>

    </div>
  );
};
