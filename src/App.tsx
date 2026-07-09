/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "./context/GameContext";
import { Splash } from "./pages/Splash";
import { Home } from "./pages/Home";
import { ChapterSelect } from "./pages/ChapterSelect";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { Review } from "./pages/Review";
import { Result } from "./pages/Result";
import { allChapters } from "./data";
import { playSound } from "./utils/audio";

// Import mini-game components
import { QuizGame } from "./components/MiniGames/QuizGame";
import { GuessImageGame } from "./components/MiniGames/GuessImageGame";
import { MatchingGame } from "./components/MiniGames/MatchingGame";
import { DragDropGame } from "./components/MiniGames/DragDropGame";
import { ReadingGame } from "./components/MiniGames/ReadingGame";
import { WritingGame } from "./components/MiniGames/WritingGame";
import { CompleteSentenceGame } from "./components/MiniGames/CompleteSentenceGame";
import { ListeningGame } from "./components/MiniGames/ListeningGame";

function MainAppController() {
  const { progress, completeActivity } = useGame();
  
  // Navigation State Machine
  const [activePage, setActivePage] = useState<
    "splash" | "home" | "chapters" | "settings" | "profile" | "review" | "game" | "result"
  >("splash");

  // Game Launch State
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [activeActivityKey, setActiveActivityKey] = useState<string | null>(null);
  
  // Completed Session Rewards
  const [sessionRewards, setSessionRewards] = useState<{
    xp: number;
    stars: number;
    coins: number;
  } | null>(null);

  // If the user already registered, skip the splash card and jump to the dashboard!
  useEffect(() => {
    if (progress.nickname !== "Guest Hero") {
      setActivePage("home");
    }
  }, []);

  const handleLaunchGame = (chapterId: number, activityKey: string) => {
    setActiveChapterId(chapterId);
    setActiveActivityKey(activityKey);
    setActivePage("game");
  };

  const handleGameComplete = (xpEarned: number, starsEarned: number, coinsEarned: number) => {
    if (activeChapterId && activeActivityKey) {
      // Save progress to local storage context
      completeActivity(activeChapterId, activeActivityKey, starsEarned, coinsEarned, xpEarned);
      
      // Load stats for final splash results page
      setSessionRewards({
        xp: xpEarned,
        stars: starsEarned,
        coins: coinsEarned,
      });

      setActivePage("result");
    }
  };

  const handleGameBack = () => {
    setActivePage("chapters");
    setActiveChapterId(null);
    setActiveActivityKey(null);
  };

  // Render Page Content based on State Router
  const renderActivePage = () => {
    switch (activePage) {
      case "splash":
        return <Splash onEnterApp={() => setActivePage("home")} />;
      case "home":
        return <Home onNavigate={(target) => setActivePage(target)} />;
      case "chapters":
        return (
          <ChapterSelect
            onBack={() => setActivePage("home")}
            onLaunchGame={handleLaunchGame}
          />
        );
      case "settings":
        return <Settings onBack={() => setActivePage("home")} />;
      case "profile":
        return <Profile onBack={() => setActivePage("home")} />;
      case "review":
        return <Review onBack={() => setActivePage("home")} />;
      
      case "game": {
        if (!activeChapterId || !activeActivityKey) {
          setActivePage("chapters");
          return null;
        }

        const chapter = allChapters.find((ch) => ch.id === activeChapterId);
        if (!chapter) {
          setActivePage("chapters");
          return null;
        }

        // Return appropriate mini game screen
        switch (activeActivityKey) {
          case "quiz":
            return (
              <QuizGame
                questions={chapter.quiz}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "guessImage":
            return (
              <GuessImageGame
                questions={chapter.guessImage}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "matching":
            return (
              <MatchingGame
                pairs={chapter.matching}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "dragDrop":
            return (
              <DragDropGame
                items={chapter.dragDrop}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "reading":
            return (
              <ReadingGame
                exercises={chapter.reading}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "writing":
            return (
              <WritingGame
                exercises={chapter.writing}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "completeSentence":
            return (
              <CompleteSentenceGame
                exercises={chapter.completeSentence}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          case "listening":
            return (
              <ListeningGame
                questions={chapter.listening}
                onComplete={handleGameComplete}
                onBack={handleGameBack}
              />
            );
          default:
            setActivePage("chapters");
            return null;
        }
      }

      case "result":
        return (
          <Result
            xpEarned={sessionRewards?.xp ?? 20}
            starsEarned={sessionRewards?.stars ?? 1}
            coinsEarned={sessionRewards?.coins ?? 10}
            onContinue={() => setActivePage("chapters")}
          />
        );
      
      default:
        return <Home onNavigate={(target) => setActivePage(target)} />;
    }
  };

  const isDashboardPage = ["home", "chapters", "settings", "profile", "review"].includes(activePage);

  // Convert XP into levels
  const currentLevel = Math.floor(progress.xp / 100) + 1;
  const currentLevelXp = progress.xp % 100;

  // Active student stats calculations
  const allowedActivityKeys = ["guessImage", "matching", "dragDrop", "listening", "reading", "writing", "completeSentence"];
  const completedCount = Object.values(progress.completedActivities).reduce<number>(
    (acc, arr) => {
      const activeCompleted = (arr as string[]).filter(key => allowedActivityKeys.includes(key));
      return acc + activeCompleted.length;
    },
    0
  );
  const totalActivitiesCount = 35; // 5 chapters * 7 games

  const getHeaderTitle = () => {
    switch (activePage) {
      case "home":
        return {
          title: "English Quest",
          highlight: "Grade 5",
          subtext: "kniaWorld Educational Hub",
        };
      case "chapters":
        return {
          title: "Curriculum",
          highlight: "Map",
          subtext: "Choose your Chapter Quest",
        };
      case "review":
        return {
          title: "Vocabulary",
          highlight: "Flashcards",
          subtext: "Study terms and definitions",
        };
      case "profile":
        return {
          title: "Student",
          highlight: "Hero Card",
          subtext: "Check levels, trophies & stats",
        };
      case "settings":
        return {
          title: "Settings &",
          highlight: "Audio",
          subtext: "Customize your quest game",
        };
      default:
        return {
          title: "English Quest",
          highlight: "Grade 5",
          subtext: "kniaWorld Educational",
        };
    }
  };

  const headerInfo = getHeaderTitle();

  if (!isDashboardPage) {
    return (
      <div className={progress.highContrast ? "high-contrast" : ""}>
        {renderActivePage()}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-hidden text-slate-800 ${progress.highContrast ? "high-contrast" : ""}`}>
      
      {/* Top Navigation / HUD Console */}
      <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-sm z-30 sticky top-0 shrink-0">
        <div className="flex items-center gap-3">
          {/* Back button next to title on subpages */}
          {activePage !== "home" && (
            <button
              onClick={() => {
                playSound("click", progress.soundEnabled);
                setActivePage("home");
              }}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition mr-1 md:mr-2 flex items-center justify-center border border-slate-150 shadow-sm bg-white active:scale-95"
              aria-label="Back to Hub"
              style={{ minHeight: "40px", minWidth: "40px" }}
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Icon frame */}
          <div className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
            <img 
              src="https://www.image2url.com/r2/default/images/1782743163523-0a2a9e50-d44f-41f3-8e18-c971453384e1.png" 
              alt="English Quest Logo" 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h1 className="text-sm md:text-lg font-black text-slate-900 tracking-tight leading-tight">
              {headerInfo.title} <span className="text-[#F97316]">{headerInfo.highlight}</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-none mt-0.5">
              {headerInfo.subtext}
            </p>
          </div>
        </div>

        {/* HUD Wallet Stats */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* XP Badge */}
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100/70 px-2.5 md:px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulseSlow hidden md:inline-block" />
            <span className="font-mono text-xs md:text-sm font-black text-orange-700">{progress.xp} XP</span>
          </div>

          {/* Stars Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 md:px-3.5 py-1.5 rounded-full shadow-sm text-amber-600">
            <svg className="w-4 h-4 text-amber-500 fill-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-mono text-xs md:text-sm font-black text-amber-700">{progress.stars}</span>
          </div>

          {/* Coins Pill */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 md:px-3.5 py-1.5 rounded-full shadow-sm text-emerald-600">
            <svg className="w-4 h-4 text-emerald-500 fill-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
            </svg>
            <span className="font-mono text-xs md:text-sm font-black text-emerald-700">{progress.coins}</span>
          </div>

          {/* User profile bubble */}
          <button
            onClick={() => {
              playSound("click", progress.soundEnabled);
              setActivePage("profile");
            }}
            className="w-10 h-10 rounded-full border-2 border-indigo-200 bg-white hover:scale-105 active:scale-95 transition overflow-hidden shrink-0 shadow-sm flex items-center justify-center p-0.5"
            aria-label="My Profile Card"
          >
            {/* Inline dynamic avatar display */}
            <div className="w-full h-full flex items-center justify-center rounded-full bg-indigo-50">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                {progress.selectedAvatar === "avatar_boy1" && (
                  <>
                    <circle cx="50" cy="50" r="45" fill="#38BDF8" />
                    <circle cx="50" cy="48" r="20" fill="#FDBA74" />
                    <path d="M 30 40 Q 50 15, 70 40 C 65 30, 35 30, 30 40" fill="#1E293B" />
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
          </button>
        </div>
      </header>

      {/* Main Container viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Sidebar Nav (visible on medium & up screens) */}
        <nav className="hidden md:flex w-64 bg-white border-r border-slate-200 p-6 flex-col justify-between shrink-0 z-20 shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-2 leading-none">
              Main Menu
            </span>

            {/* DASHBOARD HUB */}
            <button
              onClick={() => {
                playSound("click", progress.soundEnabled);
                setActivePage("home");
              }}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition duration-200 text-left font-bold text-sm border cursor-pointer ${
                activePage === "home"
                  ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200/40"
                  : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-orange-600"
              }`}
              style={{ minHeight: "52px" }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard Hub</span>
            </button>

            {/* CURRICULUM MAP */}
            <button
              onClick={() => {
                playSound("click", progress.soundEnabled);
                setActivePage("chapters");
              }}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition duration-200 text-left font-bold text-sm border cursor-pointer ${
                activePage === "chapters"
                  ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200/40"
                  : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-orange-600"
              }`}
              style={{ minHeight: "52px" }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Chapters Map</span>
            </button>

            {/* VOCABULARY DECK */}
            <button
              onClick={() => {
                playSound("click", progress.soundEnabled);
                setActivePage("review");
              }}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition duration-200 text-left font-bold text-sm border cursor-pointer ${
                activePage === "review"
                  ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200/40"
                  : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-orange-600"
              }`}
              style={{ minHeight: "52px" }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Vocabulary Deck</span>
            </button>

            {/* MY PROGRESS */}
            <button
              onClick={() => {
                playSound("click", progress.soundEnabled);
                setActivePage("profile");
              }}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition duration-200 text-left font-bold text-sm border cursor-pointer ${
                activePage === "profile"
                  ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200/40"
                  : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-orange-600"
              }`}
              style={{ minHeight: "52px" }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Progress</span>
            </button>

            {/* SETTINGS */}
            <button
              onClick={() => {
                playSound("click", progress.soundEnabled);
                setActivePage("settings");
              }}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition duration-200 text-left font-bold text-sm border cursor-pointer ${
                activePage === "settings"
                  ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-200/40"
                  : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-orange-600"
              }`}
              style={{ minHeight: "52px" }}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </div>

          {/* Daily Goal card */}
          <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200 shadow-sm mt-auto">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">
              Total Progress
            </p>
            <div className="flex justify-between text-xs font-black mb-1">
              <span className="text-slate-600">Completion</span>
              <span className="text-indigo-600">{completedCount}/{totalActivitiesCount}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#22C55E] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                style={{ width: `${Math.max(4, (completedCount / totalActivitiesCount) * 100)}%` }}
              />
            </div>
          </div>
        </nav>

        {/* Content Viewframe (Scrollable) */}
        <main className="flex-1 bg-[#F8FAFC] relative overflow-y-auto overflow-x-hidden p-4 md:p-8 min-h-0">
          
          {/* Decorative floating blur spheres */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-indigo-200/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-80 h-80 bg-amber-200/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Staggered container */}
          <div className="max-w-4xl mx-auto h-full flex flex-col justify-between relative">
            <div className="flex-1 pb-4">
              {renderActivePage()}
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-6 text-slate-400 text-xs font-sans border-t border-slate-200/60 mt-8 mb-24 md:mb-4">
              <p>Created by Anisahknia 2026, All Rights Reserved.</p>
              <p className="mt-1 font-medium text-slate-400/70">Not for resale / Not to be commercialized.</p>
            </footer>

            {/* Mobile Touch Bar navigation */}
            <div className="md:hidden flex justify-around bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 rounded-2xl shadow-xl mt-6 shrink-0 fixed bottom-4 left-4 right-4 z-40">
              <button
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setActivePage("home");
                }}
                className={`p-3 rounded-xl transition flex items-center justify-center ${
                  activePage === "home" ? "text-[#4F46E5] bg-indigo-50" : "text-slate-500 hover:text-slate-700"
                }`}
                aria-label="Home Hub"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setActivePage("chapters");
                }}
                className={`p-3 rounded-xl transition flex items-center justify-center ${
                  activePage === "chapters" ? "text-[#4F46E5] bg-indigo-50" : "text-slate-500 hover:text-slate-700"
                }`}
                aria-label="Chapters Map"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setActivePage("review");
                }}
                className={`p-3 rounded-xl transition flex items-center justify-center ${
                  activePage === "review" ? "text-[#4F46E5] bg-indigo-50" : "text-slate-500 hover:text-slate-700"
                }`}
                aria-label="Flashcards"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </button>
              <button
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setActivePage("profile");
                }}
                className={`p-3 rounded-xl transition flex items-center justify-center ${
                  activePage === "profile" ? "text-[#4F46E5] bg-indigo-50" : "text-slate-500 hover:text-slate-700"
                }`}
                aria-label="My Progress"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  playSound("click", progress.soundEnabled);
                  setActivePage("settings");
                }}
                className={`p-3 rounded-xl transition flex items-center justify-center ${
                  activePage === "settings" ? "text-[#4F46E5] bg-indigo-50" : "text-slate-500 hover:text-slate-700"
                }`}
                aria-label="Settings"
                style={{ minHeight: "44px", minWidth: "44px" }}
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainAppController />
    </GameProvider>
  );
}
