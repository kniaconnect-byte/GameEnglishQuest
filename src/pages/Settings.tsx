/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { Volume2, ShieldAlert, Accessibility, RotateCcw } from "lucide-react";
import { playSound } from "../utils/audio";

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { progress, updateSettings, resetProgress } = useGame();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const toggleSound = () => {
    const nextVal = !progress.soundEnabled;
    updateSettings({ soundEnabled: nextVal });
    playSound("click", nextVal); // play feedback with nextVal
  };

  const toggleMusic = () => {
    playSound("click", progress.soundEnabled);
    updateSettings({ musicEnabled: !progress.musicEnabled });
  };

  const toggleHighContrast = () => {
    playSound("click", progress.soundEnabled);
    updateSettings({ highContrast: !progress.highContrast });
  };

  const toggleReducedMotion = () => {
    playSound("click", progress.soundEnabled);
    updateSettings({ reducedMotion: !progress.reducedMotion });
  };

  const handleTriggerReset = () => {
    playSound("click", progress.soundEnabled);
    setShowConfirmReset(true);
  };

  const handleConfirmReset = () => {
    playSound("click", progress.soundEnabled);
    resetProgress();
    setShowConfirmReset(false);
    window.location.reload(); // Refresh to clean reload everything
  };

  return (
    <div className={`flex flex-col gap-6 pb-12 ${progress.highContrast ? "contrast-125" : ""}`}>
      
      {/* Sound & Audio Config Box */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/20 flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-150 pb-2.5">
          <Volume2 className="w-5 h-5 text-orange-600" />
          <h4 className="font-sans font-black text-slate-850 text-sm uppercase tracking-wider">Sound & Audio</h4>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between py-1.5 gap-4">
          <div className="flex flex-col">
            <span className="font-sans font-black text-slate-800 text-sm">Sound Effects</span>
            <span className="font-sans text-slate-400 text-xs mt-0.5 font-semibold">Audible clicks, correct pings, and level fanfares</span>
          </div>
          <button
            onClick={toggleSound}
            className={`w-14 h-8 rounded-full transition-colors relative outline-none flex items-center px-1 shrink-0 cursor-pointer ${
              progress.soundEnabled ? "bg-orange-500" : "bg-slate-300"
            }`}
            style={{ minHeight: "32px", minWidth: "56px" }}
            aria-label="Toggle Sound effects"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                progress.soundEnabled ? "transform translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* Music Toggle */}
        <div className="flex items-center justify-between py-1.5 gap-4">
          <div className="flex flex-col">
            <span className="font-sans font-black text-slate-800 text-sm">Background Ambience</span>
            <span className="font-sans text-slate-400 text-xs mt-0.5 font-semibold">Soft continuous background melodies for focus</span>
          </div>
          <button
            onClick={toggleMusic}
            className={`w-14 h-8 rounded-full transition-colors relative outline-none flex items-center px-1 shrink-0 cursor-pointer ${
              progress.musicEnabled ? "bg-orange-500" : "bg-slate-300"
            }`}
            style={{ minHeight: "32px", minWidth: "56px" }}
            aria-label="Toggle Background Music"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                progress.musicEnabled ? "transform translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Accessibility options */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/20 flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-150 pb-2.5">
          <Accessibility className="w-5 h-5 text-orange-600" />
          <h4 className="font-sans font-black text-slate-850 text-sm uppercase tracking-wider">Accessibility</h4>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between py-1.5 gap-4">
          <div className="flex flex-col">
            <span className="font-sans font-black text-slate-800 text-sm">High Contrast Mode</span>
            <span className="font-sans text-slate-400 text-xs mt-0.5 font-semibold">Increases contrast and text readability</span>
          </div>
          <button
            onClick={toggleHighContrast}
            className={`w-14 h-8 rounded-full transition-colors relative outline-none flex items-center px-1 shrink-0 cursor-pointer ${
              progress.highContrast ? "bg-orange-500" : "bg-slate-300"
            }`}
            style={{ minHeight: "32px", minWidth: "56px" }}
            aria-label="Toggle High contrast mode"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                progress.highContrast ? "transform translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between py-1.5 gap-4">
          <div className="flex flex-col">
            <span className="font-sans font-black text-slate-800 text-sm">Reduced Motion</span>
            <span className="font-sans text-slate-400 text-xs mt-0.5 font-semibold">Disables shaking and complex interface transit effects</span>
          </div>
          <button
            onClick={toggleReducedMotion}
            className={`w-14 h-8 rounded-full transition-colors relative outline-none flex items-center px-1 shrink-0 cursor-pointer ${
              progress.reducedMotion ? "bg-orange-500" : "bg-slate-300"
            }`}
            style={{ minHeight: "32px", minWidth: "56px" }}
            aria-label="Toggle Reduced motion settings"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                progress.reducedMotion ? "transform translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-150/20 flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-150 pb-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <h4 className="font-sans font-black text-slate-850 text-sm uppercase tracking-wider text-rose-600">Danger Zone</h4>
        </div>

        {!showConfirmReset ? (
          <div className="flex flex-col gap-3.5">
            <p className="font-sans text-slate-500 text-xs font-semibold leading-relaxed">
              Resetting progress is permanent. You will lose your stars, coins, level milestones, achievements cabinet awards, and unlocked curriculum chapters.
            </p>
            <button
              onClick={handleTriggerReset}
              className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 text-rose-600 hover:text-rose-700 font-sans font-black text-sm rounded-2xl transition flex items-center justify-center gap-2"
              style={{ minHeight: "52px" }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Game Progress</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 bg-rose-50 border border-rose-200 p-5 rounded-2xl text-center">
            <span className="font-sans font-black text-rose-950 text-base leading-none">Are you absolutely sure?</span>
            <p className="font-sans text-xs text-rose-800 leading-relaxed font-semibold">
              This action is IRREVERSIBLE! You will start over as a brand new student hero.
            </p>
            <div className="grid grid-cols-2 gap-3.5 mt-2">
              <button
                type="button"
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setShowConfirmReset(false);
                }}
                className="bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-sans font-bold text-sm rounded-xl transition"
                style={{ minHeight: "44px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold text-sm rounded-xl shadow-lg shadow-rose-200/50 transition"
                style={{ minHeight: "44px" }}
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
