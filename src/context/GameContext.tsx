/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProgress } from "../types";

interface GameContextType {
  progress: UserProgress;
  addXp: (amount: number) => void;
  addStars: (amount: number) => void;
  addCoins: (amount: number) => void;
  completeActivity: (chapterId: number, activityKey: string, xpEarned: number, starsEarned: number, coinsEarned: number) => void;
  unlockChapter: (chapterId: number) => void;
  updateProfile: (nickname: string, selectedAvatar: string) => void;
  updateSettings: (settings: Partial<Pick<UserProgress, "soundEnabled" | "musicEnabled" | "highContrast" | "reducedMotion">>) => void;
  unlockBadge: (badgeId: string) => boolean; // returns true if newly unlocked
  resetProgress: () => void;
}

const DEFAULT_PROGRESS: UserProgress = {
  unlockedChapters: [1], // Chapter 1 unlocked by default
  completedActivities: {},
  xp: 0,
  stars: 0,
  coins: 0,
  unlockedBadges: [],
  selectedAvatar: "avatar_boy1",
  nickname: "Guest Hero",
  soundEnabled: true,
  musicEnabled: true,
  highContrast: false,
  reducedMotion: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem("kniaworld_englishquest_progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure defaults are backfilled in case of updates
        return { ...DEFAULT_PROGRESS, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load local progress:", e);
    }
    return DEFAULT_PROGRESS;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem("kniaworld_englishquest_progress", JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save local progress:", e);
    }
  }, [progress]);

  const addXp = (amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const updated = { ...prev, xp: newXp };
      checkAndTriggerBadges(updated);
      return updated;
    });
  };

  const addStars = (amount: number) => {
    setProgress((prev) => {
      const newStars = prev.stars + amount;
      const updated = { ...prev, stars: newStars };
      checkAndTriggerBadges(updated);
      return updated;
    });
  };

  const addCoins = (amount: number) => {
    setProgress((prev) => ({ ...prev, coins: prev.coins + amount }));
  };

  const completeActivity = (
    chapterId: number,
    activityKey: string,
    xpEarned: number,
    starsEarned: number,
    coinsEarned: number
  ) => {
    setProgress((prev) => {
      const currentChapterActivities = prev.completedActivities[chapterId] || [];
      const alreadyCompleted = currentChapterActivities.includes(activityKey);

      // Only award full XP, Stars, and Coins if it's the first completion of this activity.
      // Otherwise, give a smaller booster (e.g. 50% XP, 1 coin, 0 extra stars).
      const finalXp = alreadyCompleted ? Math.max(2, Math.floor(xpEarned * 0.3)) : xpEarned;
      const finalStars = alreadyCompleted ? 0 : starsEarned;
      const finalCoins = alreadyCompleted ? 1 : coinsEarned;

      const newActivities = alreadyCompleted
        ? currentChapterActivities
        : [...currentChapterActivities, activityKey];

      const updatedCompleted = {
        ...prev.completedActivities,
        [chapterId]: newActivities,
      };

      const updated = {
        ...prev,
        completedActivities: updatedCompleted,
        xp: prev.xp + finalXp,
        stars: prev.stars + finalStars,
        coins: prev.coins + finalCoins,
      };

      // Automatically unlock the next chapter if they completed enough activities
      // Let's say completing 3 activities in Chapter X unlocks Chapter X+1
      if (newActivities.length >= 3) {
        const nextChapter = chapterId + 1;
        if (nextChapter <= 5 && !updated.unlockedChapters.includes(nextChapter)) {
          updated.unlockedChapters = [...updated.unlockedChapters, nextChapter];
        }
      }

      checkAndTriggerBadges(updated);
      return updated;
    });
  };

  const unlockChapter = (chapterId: number) => {
    setProgress((prev) => {
      if (prev.unlockedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        unlockedChapters: [...prev.unlockedChapters, chapterId],
      };
    });
  };

  const updateProfile = (nickname: string, selectedAvatar: string) => {
    setProgress((prev) => ({
      ...prev,
      nickname: nickname.trim() || prev.nickname,
      selectedAvatar,
    }));
  };

  const updateSettings = (settings: Partial<Pick<UserProgress, "soundEnabled" | "musicEnabled" | "highContrast" | "reducedMotion" >>) => {
    setProgress((prev) => ({
      ...prev,
      ...settings,
    }));
  };

  const unlockBadge = (badgeId: string): boolean => {
    let unlocked = false;
    setProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      unlocked = true;
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
    });
    return unlocked;
  };

  // Automated Badge Checker
  const checkAndTriggerBadges = (state: UserProgress) => {
    const badgesToAdd: string[] = [];

    // Explorer Badge - Unlock Chapter 3
    if (state.unlockedChapters.includes(3) && !state.unlockedBadges.includes("explorer")) {
      badgesToAdd.push("explorer");
    }
    // Champion Badge - Unlock Chapter 5
    if (state.unlockedChapters.includes(5) && !state.unlockedBadges.includes("champion")) {
      badgesToAdd.push("champion");
    }
    // Star Catcher - Reach 15 stars
    if (state.stars >= 15 && !state.unlockedBadges.includes("star_catcher")) {
      badgesToAdd.push("star_catcher");
    }
    // Coin Collector - Reach 100 coins
    if (state.coins >= 50 && !state.unlockedBadges.includes("wealthy")) {
      badgesToAdd.push("wealthy");
    }
    // Brainy - Earn 500 XP
    if (state.xp >= 300 && !state.unlockedBadges.includes("brainy")) {
      badgesToAdd.push("brainy");
    }

    if (badgesToAdd.length > 0) {
      state.unlockedBadges = [...state.unlockedBadges, ...badgesToAdd];
    }
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  return (
    <GameContext.Provider
      value={{
        progress,
        addXp,
        addStars,
        addCoins,
        completeActivity,
        unlockChapter,
        updateProfile,
        updateSettings,
        unlockBadge,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
