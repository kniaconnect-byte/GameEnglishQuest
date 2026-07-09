/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { SVGIllustration } from "../components/SVGIllustrations";
import { Sparkles, Gamepad2 } from "lucide-react";
import { playSound } from "../utils/audio";

interface SplashProps {
  onEnterApp: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onEnterApp }) => {
  const { progress, updateProfile } = useGame();
  const [nickname, setNickname] = useState(progress.nickname === "Guest Hero" ? "" : progress.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(progress.selectedAvatar);

  const avatars = ["avatar_boy1", "avatar_girl1", "avatar_boy2", "avatar_girl2"];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = nickname.trim() || "Quest Hero";
    updateProfile(finalName, selectedAvatar);
    playSound("click", progress.soundEnabled);
    playSound("correct", progress.soundEnabled);
    onEnterApp();
  };

  const selectAvatarOption = (av: string) => {
    playSound("click", progress.soundEnabled);
    setSelectedAvatar(av);
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 md:p-6 ${progress.highContrast ? 'contrast-125' : ''}`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 flex flex-col items-center gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="px-3.5 py-1 bg-orange-50 text-orange-600 font-mono text-xs font-bold rounded-full tracking-wider border border-orange-100">
            kniaWorld Premium
          </div>
          <div className="p-1 bg-white rounded-2xl shadow-md border border-slate-100 mt-2 flex items-center justify-center w-24 h-24 overflow-hidden">
            <img 
              src="https://www.image2url.com/r2/default/images/1782743163523-0a2a9e50-d44f-41f3-8e18-c971453384e1.png" 
              alt="English Quest Logo" 
              className="w-full h-full object-contain transform hover:scale-105 transition duration-300" 
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl font-sans font-black text-slate-900 tracking-tight mt-1">
            English Quest
          </h1>
          <p className="text-sm font-sans text-slate-500 font-medium uppercase tracking-widest">
            Grade 5 Educational Game
          </p>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleStart} className="w-full flex flex-col gap-5">
          {/* Nickname field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nickname" className="font-mono text-xs text-slate-500 font-semibold uppercase tracking-widest px-1">
              What is your nickname?
            </label>
            <input
              id="nickname"
              type="text"
              required
              maxLength={15}
              placeholder="Enter your hero name..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl text-base font-sans font-semibold transition outline-none"
              style={{ minHeight: "52px" }}
            />
          </div>

          {/* Avatar selector Grid */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs text-slate-500 font-semibold uppercase tracking-widest px-1">
              Choose your Character Avatar:
            </span>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map((av) => {
                const isSelected = selectedAvatar === av;
                return (
                  <button
                    key={av}
                    type="button"
                    onClick={() => selectAvatarOption(av)}
                    className={`p-1.5 rounded-xl border-2 transition duration-200 flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 scale-102 shadow-sm"
                        : "border-slate-100 hover:border-slate-200 bg-white"
                    }`}
                    style={{ minHeight: "72px" }}
                  >
                    <SVGIllustration name={av} className="w-12 h-12" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-sans font-bold rounded-xl shadow-lg shadow-orange-100 hover:shadow-orange-200 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
            style={{ minHeight: "52px" }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Learning Quest</span>
          </button>
        </form>

        {/* Footer info */}
        <p className="text-center font-sans text-xs text-slate-400 font-medium">
          Supports Offline play • Saves automatically
        </p>
      </div>
    </div>
  );
};
