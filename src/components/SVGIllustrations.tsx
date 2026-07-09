/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface SVGIllustrationProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

export const SVGIllustration: React.FC<SVGIllustrationProps> = ({ name, className = "w-24 h-24", ...props }) => {
  const normalized = name.toLowerCase().trim();

  // Color palette constants
  const colors = {
    primary: "#4F46E5",
    secondary: "#22C55E",
    accent: "#F59E0B",
    danger: "#EF4444",
    sky: "#38BDF8",
    blue: "#3B82F6",
    yellow: "#FBBF24",
    red: "#F87171",
    gray: "#94A3B8",
    lightGray: "#E2E8F0",
    darkGray: "#475569",
    skin: "#FDBA74",
    hairDark: "#1E293B",
    hairFair: "#FDE047",
    hairBrown: "#78350F",
    white: "#FFFFFF",
  };

  switch (normalized) {
    // === FOODS ===
    case "apple":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="55" r="30" fill={colors.red} />
          <circle cx="40" cy="55" r="28" fill={colors.danger} />
          <path d="M 50 25 C 45 20, 48 10, 43 12 C 43 12, 48 15, 50 25" fill="none" stroke={colors.hairBrown} strokeWidth="4" strokeLinecap="round" />
          <path d="M 50 25 C 55 20, 65 18, 62 13 C 58 12, 53 20, 50 25" fill={colors.secondary} />
          <ellipse cx="65" cy="45" rx="4" ry="10" fill={colors.white} opacity="0.3" transform="rotate(-15, 65, 45)" />
        </svg>
      );
    case "banana":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 20 25 C 45 25, 75 45, 80 80 C 65 75, 40 55, 20 25 Z" fill={colors.yellow} />
          <path d="M 18 22 C 20 22, 23 25, 20 25 C 18 25, 15 22, 18 22" fill={colors.hairBrown} />
          <path d="M 76 76 C 78 78, 83 83, 80 80 C 78 78, 76 76, 76 76" fill={colors.hairBrown} strokeWidth="4" stroke={colors.hairBrown} />
          <path d="M 30 32 C 45 35, 65 50, 72 70" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "burger":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Bottom Bun */}
          <path d="M 20 70 C 20 80, 80 80, 80 70 Z" fill="#D97706" />
          {/* Patty */}
          <rect x="16" y="58" width="68" height="12" rx="6" fill="#451A03" />
          {/* Cheese */}
          <polygon points="18,58 82,58 75,66 50,62 25,66" fill={colors.yellow} />
          {/* Lettuce */}
          <path d="M 15 50 C 15 56, 85 56, 85 50 Z" fill={colors.secondary} />
          {/* Top Bun */}
          <path d="M 20 44 C 20 20, 80 20, 80 44 Z" fill="#D97706" />
          {/* Sesame seeds */}
          <ellipse cx="35" cy="30" rx="1" ry="2" fill={colors.white} transform="rotate(20 35 30)" />
          <ellipse cx="50" cy="25" rx="1" ry="2" fill={colors.white} />
          <ellipse cx="65" cy="32" rx="1" ry="2" fill={colors.white} transform="rotate(-20 65 32)" />
        </svg>
      );
    case "milk":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <rect x="30" y="25" width="40" height="55" rx="5" fill={colors.white} stroke={colors.lightGray} strokeWidth="2" />
          <polygon points="30,25 50,15 70,25" fill="#38BDF8" />
          <rect x="30" y="45" width="40" height="15" fill={colors.sky} />
          <text x="50" y="56" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">MILK</text>
          <path d="M 40 32 C 45 35, 55 35, 60 32" fill="none" stroke={colors.sky} strokeWidth="2" />
        </svg>
      );
    case "rice":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Bowl */}
          <path d="M 20 50 C 20 85, 80 85, 80 50 Z" fill={colors.primary} />
          <path d="M 15 50 L 85 50 L 80 48 L 20 48 Z" fill="#312E81" />
          {/* Rice Mound */}
          <path d="M 25 50 C 25 30, 75 30, 75 50 Z" fill={colors.white} />
          <ellipse cx="50" cy="40" rx="18" ry="10" fill="#F8FAFC" />
          {/* Grains details */}
          <ellipse cx="45" cy="42" rx="1.5" ry="3" fill={colors.gray} transform="rotate(30, 45, 42)" />
          <ellipse cx="55" cy="38" rx="1.5" ry="3" fill={colors.gray} transform="rotate(-30, 55, 38)" />
          <ellipse cx="50" cy="45" rx="1.5" ry="3" fill={colors.gray} transform="rotate(10, 50, 45)" />
        </svg>
      );

    // === WEATHER ===
    case "sunny":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="50" r="20" fill={colors.yellow} />
          {/* Sunrays */}
          <g stroke={colors.accent} strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="15" x2="50" y2="25" />
            <line x1="50" y1="75" x2="50" y2="85" />
            <line x1="15" y1="50" x2="25" y2="50" />
            <line x1="75" y1="50" x2="85" y2="50" />
            <line x1="25" y1="25" x2="32" y2="32" />
            <line x1="68" y1="68" x2="75" y2="75" />
            <line x1="75" y1="25" x2="68" y2="32" />
            <line x1="32" y1="68" x2="25" y2="75" />
          </g>
        </svg>
      );
    case "rainy":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Cloud */}
          <path d="M 30 50 C 20 50, 15 40, 25 30 C 25 15, 50 10, 60 25 C 75 15, 85 30, 75 45 C 85 48, 80 60, 65 58 C 65 58, 35 58, 30 50 Z" fill={colors.gray} />
          {/* Raindrops */}
          <g stroke={colors.sky} strokeWidth="3" strokeLinecap="round">
            <line x1="35" y1="65" x2="30" y2="75" />
            <line x1="50" y1="65" x2="45" y2="75" />
            <line x1="65" y1="65" x2="60" y2="75" />
            <line x1="42" y1="78" x2="37" y2="88" />
            <line x1="58" y1="78" x2="53" y2="88" />
          </g>
        </svg>
      );
    case "cloudy":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Back Cloud (darker) */}
          <path d="M 50 50 C 40 50, 35 40, 45 30 C 45 15, 70 10, 80 25 C 95 15, 100 35, 90 45 C 90 45, 55 45, 50 50 Z" fill="#CBD5E1" opacity="0.8" />
          {/* Front Cloud */}
          <path d="M 30 65 C 20 65, 15 55, 25 45 C 25 30, 50 25, 60 40 C 75 30, 85 45, 75 60 C 85 63, 80 75, 65 73 C 65 73, 35 73, 30 65 Z" fill="#F1F5F9" />
        </svg>
      );
    case "windy":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 20 35 Q 50 35, 65 30 T 80 25" fill="none" stroke={colors.gray} strokeWidth="4" strokeLinecap="round" />
          <path d="M 15 50 Q 55 50, 60 55 T 75 45" fill="none" stroke={colors.gray} strokeWidth="4" strokeLinecap="round" />
          <path d="M 25 65 Q 45 65, 55 60 T 70 65" fill="none" stroke={colors.gray} strokeWidth="4" strokeLinecap="round" />
          {/* Wind leaves / lines */}
          <path d="M 40 35 Q 45 25, 50 35" fill="none" stroke={colors.gray} strokeWidth="3" />
          <path d="M 55 50 Q 60 40, 65 50" fill="none" stroke={colors.gray} strokeWidth="3" />
        </svg>
      );

    // === BODY PARTS ===
    case "ears":
    case "ear":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 40 20 C 20 20, 20 60, 45 70 C 50 72, 55 65, 50 55 C 45 45, 35 45, 45 35 C 50 30, 55 35, 50 22 C 48 20, 43 20, 40 20 Z" fill={colors.skin} stroke="#E0A96D" strokeWidth="2" />
          <path d="M 42 35 C 38 40, 38 50, 44 55" fill="none" stroke="#E0A96D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "eyes":
    case "eye":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Eyeball base */}
          <path d="M 15 50 Q 50 20, 85 50 Q 50 80, 15 50 Z" fill={colors.white} stroke={colors.darkGray} strokeWidth="3" />
          {/* Iris */}
          <circle cx="50" cy="50" r="16" fill={colors.primary} />
          {/* Pupil */}
          <circle cx="50" cy="50" r="8" fill={colors.hairDark} />
          {/* Catchlight */}
          <circle cx="46" cy="46" r="3" fill={colors.white} />
          {/* Eyelashes / Eyebrow */}
          <path d="M 15 30 Q 50 10, 85 30" fill="none" stroke={colors.hairDark} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "nose":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 45 20 L 45 65 C 45 75, 58 75, 58 65" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <path d="M 38 65 C 38 62, 42 60, 45 65" fill="none" stroke="#D97706" strokeWidth="3" />
          <path d="M 65 65 C 65 62, 61 60, 58 65" fill="none" stroke="#D97706" strokeWidth="3" />
        </svg>
      );
    case "mouth":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Lips */}
          <path d="M 20 50 Q 50 35, 80 50 Q 50 75, 20 50 Z" fill={colors.red} />
          {/* Teeth / Inner Mouth */}
          <path d="M 25 50 Q 50 45, 75 50 Q 50 68, 25 50 Z" fill={colors.hairDark} />
          <path d="M 30 50 Q 50 45, 70 50 Q 65 54, 35 54 Z" fill={colors.white} />
        </svg>
      );
    case "head":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Neck */}
          <rect x="42" y="65" width="16" height="20" fill={colors.skin} />
          {/* Head circle */}
          <circle cx="50" cy="45" r="25" fill={colors.skin} />
          {/* Hair */}
          <path d="M 23 40 C 23 20, 77 20, 77 40 C 70 30, 30 30, 23 40 Z" fill={colors.hairDark} />
          {/* Eyes */}
          <circle cx="42" cy="45" r="3" fill={colors.hairDark} />
          <circle cx="58" cy="45" r="3" fill={colors.hairDark} />
          {/* Smile */}
          <path d="M 44 55 Q 50 60, 56 55" fill="none" stroke={colors.danger} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "teeth":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <rect x="20" y="30" width="60" height="40" rx="10" fill={colors.red} />
          {/* Teeth Row */}
          <rect x="25" y="38" width="50" height="10" fill={colors.white} rx="2" />
          <rect x="25" y="52" width="50" height="10" fill={colors.white} rx="2" />
          <g stroke={colors.gray} strokeWidth="1">
            <line x1="35" y1="38" x2="35" y2="62" />
            <line x1="45" y1="38" x2="45" y2="62" />
            <line x1="55" y1="38" x2="55" y2="62" />
            <line x1="65" y1="38" x2="65" y2="62" />
          </g>
        </svg>
      );

    // === HAIR & PEOPLE DESCRIPTION (CHAPTER 2) ===
    case "curly_hair":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Curly Head */}
          <circle cx="50" cy="55" r="22" fill={colors.skin} />
          {/* Curly shapes */}
          <g fill={colors.hairDark}>
            <circle cx="35" cy="40" r="10" />
            <circle cx="45" cy="32" r="10" />
            <circle cx="55" cy="32" r="10" />
            <circle cx="65" cy="40" r="10" />
            <circle cx="30" cy="50" r="9" />
            <circle cx="70" cy="50" r="9" />
            <circle cx="28" cy="60" r="8" />
            <circle cx="72" cy="60" r="8" />
          </g>
          {/* Facial features */}
          <circle cx="43" cy="55" r="2.5" fill={colors.hairDark} />
          <circle cx="57" cy="55" r="2.5" fill={colors.hairDark} />
          <path d="M 45 63 Q 50 67, 55 63" fill="none" stroke={colors.danger} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "straight_hair":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Behind Hair */}
          <rect x="26" y="35" width="48" height="40" rx="8" fill={colors.hairBrown} />
          {/* Face */}
          <circle cx="50" cy="50" r="22" fill={colors.skin} />
          {/* Bangs Straight */}
          <path d="M 26 38 Q 50 30, 74 38 L 74 48 L 68 40 L 32 40 L 26 48 Z" fill={colors.hairBrown} />
          <circle cx="43" cy="50" r="2.5" fill={colors.hairDark} />
          <circle cx="57" cy="50" r="2.5" fill={colors.hairDark} />
          <path d="M 45 58 Q 50 62, 55 58" fill="none" stroke={colors.danger} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "beard":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="42" r="22" fill={colors.skin} />
          {/* Beard covering chin */}
          <path d="M 28 42 C 28 65, 72 65, 72 42 C 72 45, 65 68, 50 68 C 35 68, 28 45, 28 42 Z" fill={colors.hairDark} />
          <circle cx="42" cy="40" r="2" fill={colors.hairDark} />
          <circle cx="58" cy="40" r="2" fill={colors.hairDark} />
          <path d="M 44 48 Q 50 51, 56 48" fill="none" stroke={colors.white} strokeWidth="2" />
        </svg>
      );
    case "moustache":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="45" r="22" fill={colors.skin} />
          {/* Moustache */}
          <path d="M 35 52 Q 45 45, 50 52 Q 55 45, 65 52 Q 50 58, 35 52" fill={colors.hairDark} />
          <circle cx="42" cy="42" r="2" fill={colors.hairDark} />
          <circle cx="58" cy="42" r="2" fill={colors.hairDark} />
        </svg>
      );
    case "bald":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="50" r="24" fill={colors.skin} />
          <circle cx="42" cy="48" r="2.5" fill={colors.hairDark} />
          <circle cx="58" cy="48" r="2.5" fill={colors.hairDark} />
          {/* Shiny bald reflection */}
          <ellipse cx="40" cy="34" rx="10" ry="3" fill={colors.white} opacity="0.4" transform="rotate(-15, 40, 34)" />
          <path d="M 44 60 Q 50 65, 56 60" fill="none" stroke={colors.danger} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "braces":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="45" r="22" fill={colors.skin} />
          {/* Smile with teeth showing braces */}
          <path d="M 32 50 Q 50 65, 68 50 Z" fill={colors.white} stroke={colors.danger} strokeWidth="2" />
          <line x1="33" y1="52" x2="67" y2="52" stroke={colors.gray} strokeWidth="2.5" />
          <rect x="38" y="50" width="3" height="4" fill={colors.darkGray} />
          <rect x="45" y="50" width="3" height="5" fill={colors.darkGray} />
          <rect x="52" y="50" width="3" height="5" fill={colors.darkGray} />
          <rect x="59" y="50" width="3" height="4" fill={colors.darkGray} />
          <circle cx="42" cy="40" r="2" fill={colors.hairDark} />
          <circle cx="58" cy="40" r="2" fill={colors.hairDark} />
        </svg>
      );

    // === PERSONALITY TRAITS (CHAPTER 3) ===
    case "clever":
    case "book":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <rect x="25" y="25" width="50" height="55" rx="4" fill={colors.primary} />
          <rect x="30" y="20" width="40" height="5" fill={colors.accent} rx="1" />
          {/* Pages */}
          <line x1="72" y1="30" x2="72" y2="75" stroke={colors.lightGray} strokeWidth="4" />
          {/* Bulb/Star decoration on cover */}
          <circle cx="50" cy="48" r="8" fill={colors.yellow} />
          <path d="M 50 40 L 50 56 M 42 48 L 58 48" stroke={colors.white} strokeWidth="2" />
          <text x="50" y="72" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">ENGLISH</text>
        </svg>
      );
    case "friendly":
    case "handshake":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Two hands shaking */}
          <rect x="10" y="42" width="25" height="16" rx="4" fill={colors.primary} />
          <rect x="65" y="42" width="25" height="16" rx="4" fill={colors.secondary} />
          <path d="M 30 50 C 40 45, 45 45, 50 50 C 55 55, 60 45, 70 50" fill="none" stroke={colors.skin} strokeWidth="8" strokeLinecap="round" />
          <path d="M 38 46 C 42 41, 52 41, 56 46" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <path d="M 44 54 C 48 58, 54 58, 58 54" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "patient":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Clock for waiting patiently */}
          <circle cx="50" cy="50" r="35" fill={colors.white} stroke={colors.primary} strokeWidth="6" />
          <circle cx="50" cy="50" r="3" fill={colors.darkGray} />
          {/* Hands */}
          <line x1="50" y1="50" x2="50" y2="28" stroke={colors.darkGray} strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="68" y2="50" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
          {/* Tick marks */}
          <line x1="50" y1="18" x2="50" y2="22" stroke={colors.primary} strokeWidth="2" />
          <line x1="50" y1="78" x2="50" y2="82" stroke={colors.primary} strokeWidth="2" />
          <line x1="18" y1="50" x2="22" y2="50" stroke={colors.primary} strokeWidth="2" />
          <line x1="78" y1="50" x2="82" y2="50" stroke={colors.primary} strokeWidth="2" />
        </svg>
      );
    case "helpful":
    case "helping_hand":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Helping a small plant grow or hands raising up */}
          <path d="M 20 80 Q 50 40, 50 15 Q 50 40, 80 80 Z" fill={colors.secondary} opacity="0.2" />
          <path d="M 50 85 L 50 40" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M 50 55 Q 35 45, 30 55 C 32 60, 42 60, 50 55" fill={colors.secondary} />
          <path d="M 50 45 Q 65 35, 70 45 C 68 50, 58 50, 50 45" fill={colors.secondary} />
          <circle cx="50" cy="28" r="8" fill={colors.accent} />
        </svg>
      );

    // === HEALTH & PROBLEMS (CHAPTER 4) ===
    case "headache":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="55" r="22" fill={colors.skin} />
          {/* Hands holding head */}
          <path d="M 22 75 C 22 60, 32 50, 35 48" fill="none" stroke={colors.darkGray} strokeWidth="5" strokeLinecap="round" />
          <path d="M 78 75 C 78 60, 68 50, 65 48" fill="none" stroke={colors.darkGray} strokeWidth="5" strokeLinecap="round" />
          {/* Dizzy symbols / lightning lines */}
          <path d="M 40 25 L 35 15 M 50 20 L 50 10 M 60 25 L 65 15" stroke={colors.danger} strokeWidth="3" strokeLinecap="round" />
          {/* Sad face */}
          <circle cx="43" cy="52" r="2" fill={colors.hairDark} />
          <circle cx="57" cy="52" r="2" fill={colors.hairDark} />
          <path d="M 44 63 Q 50 58, 56 63" fill="none" stroke={colors.hairDark} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "earache":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="50" r="22" fill={colors.skin} />
          {/* Hand holding ear */}
          <path d="M 24 70 Q 24 45, 32 45" fill="none" stroke={colors.darkGray} strokeWidth="5" strokeLinecap="round" />
          {/* Pain indicator on ear */}
          <circle cx="28" cy="50" r="6" fill={colors.danger} opacity="0.4" />
          <path d="M 14 45 L 20 50 L 14 55" stroke={colors.danger} strokeWidth="3" fill="none" />
          {/* Sad face */}
          <circle cx="44" cy="48" r="2" fill={colors.hairDark} />
          <circle cx="56" cy="48" r="2" fill={colors.hairDark} />
          <path d="M 45 58 Q 50 54, 55 58" fill="none" stroke={colors.hairDark} strokeWidth="2" />
        </svg>
      );
    case "toothache":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="50" r="22" fill={colors.skin} />
          {/* Bandage around jaw */}
          <path d="M 40 26 Q 50 22, 60 26 L 62 65 Q 50 74, 38 65 Z" fill={colors.lightGray} opacity="0.9" stroke={colors.gray} strokeWidth="1" />
          <circle cx="50" cy="24" r="4" fill={colors.accent} />
          {/* Swollen cheek side indicator */}
          <ellipse cx="64" cy="58" rx="8" ry="10" fill={colors.red} opacity="0.3" />
          {/* Sad face */}
          <ellipse cx="43" cy="46" rx="1.5" ry="3" fill={colors.hairDark} />
          <ellipse cx="57" cy="46" rx="1.5" ry="3" fill={colors.hairDark} />
          <path d="M 45 58 Q 50 54, 54 58" stroke={colors.hairDark} strokeWidth="2" fill="none" />
        </svg>
      );
    case "medicine_bottle":
    case "medicine":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Medicine Bottle */}
          <rect x="32" y="30" width="36" height="50" rx="6" fill="#0284C7" />
          {/* Cap */}
          <rect x="42" y="20" width="16" height="10" rx="2" fill={colors.lightGray} />
          {/* Label */}
          <rect x="34" y="42" width="32" height="26" fill={colors.white} />
          {/* Red Cross */}
          <rect x="47" y="49" width="6" height="12" fill={colors.danger} />
          <rect x="44" y="52" width="12" height="6" fill={colors.danger} />
        </svg>
      );
    case "ambulance":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Cab */}
          <path d="M 20 35 L 60 35 L 75 48 L 75 70 L 20 70 Z" fill={colors.white} stroke={colors.lightGray} strokeWidth="2" />
          <rect x="60" y="42" width="10" height="12" fill={colors.sky} />
          {/* Red Stripe */}
          <rect x="20" y="52" width="45" height="6" fill={colors.danger} />
          {/* Red Cross on side */}
          <rect x="35" y="42" width="4" height="10" fill={colors.danger} />
          <rect x="32" y="45" width="10" height="4" fill={colors.danger} />
          {/* Wheels */}
          <circle cx="32" cy="72" r="10" fill={colors.hairDark} />
          <circle cx="32" cy="72" r="4" fill={colors.lightGray} />
          <circle cx="62" cy="72" r="10" fill={colors.hairDark} />
          <circle cx="62" cy="72" r="4" fill={colors.lightGray} />
          {/* Siren */}
          <rect x="40" y="30" width="8" height="5" fill={colors.danger} />
          <circle cx="44" cy="28" r="4" fill={colors.accent} />
        </svg>
      );

    // === KITCHEN & UTENSILS (CHAPTER 5) ===
    case "spoon":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 45 15 C 33 15, 33 40, 45 40 C 57 40, 57 15, 45 15 Z" fill={colors.lightGray} stroke={colors.gray} strokeWidth="2" />
          <rect x="43" y="40" width="4" height="45" rx="2" fill={colors.lightGray} stroke={colors.gray} strokeWidth="1.5" />
          <ellipse cx="45" cy="27" rx="6" ry="10" fill={colors.white} opacity="0.4" />
        </svg>
      );
    case "fork":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Fork Head */}
          <path d="M 38 18 L 38 38 C 38 45, 52 45, 52 38 L 52 18" fill="none" stroke={colors.lightGray} strokeWidth="4" strokeLinecap="round" />
          {/* Prongs */}
          <line x1="45" y1="18" x2="45" y2="38" stroke={colors.lightGray} strokeWidth="4" />
          {/* Stem */}
          <rect x="43" y="42" width="4" height="43" rx="2" fill={colors.lightGray} stroke={colors.gray} strokeWidth="1.5" />
        </svg>
      );
    case "knife":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Blade */}
          <path d="M 46 15 C 46 15, 53 15, 53 50 L 46 50 Z" fill={colors.lightGray} stroke={colors.gray} strokeWidth="1.5" />
          {/* Handle */}
          <rect x="45" y="50" width="5" height="35" rx="2" fill="#78350F" />
          <circle cx="47.5" cy="58" r="1" fill={colors.lightGray} />
          <circle cx="47.5" cy="70" r="1" fill={colors.lightGray} />
        </svg>
      );
    case "plate":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Outer plate circle */}
          <circle cx="50" cy="50" r="38" fill={colors.white} stroke={colors.lightGray} strokeWidth="2" />
          {/* Rim decoration */}
          <circle cx="50" cy="50" r="34" fill="none" stroke={colors.sky} strokeWidth="1.5" />
          {/* Inner plate circle */}
          <circle cx="50" cy="50" r="24" fill="#F8FAFC" stroke={colors.lightGray} strokeWidth="1" />
          {/* Shadow detail */}
          <path d="M 32 32 A 25 25 0 0 0 68 68" fill="none" stroke={colors.lightGray} strokeWidth="1" />
        </svg>
      );
    case "glass":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Glass vessel */}
          <polygon points="35,25 65,25 60,80 40,80" fill="none" stroke={colors.lightGray} strokeWidth="4" strokeLinejoin="round" />
          {/* Liquid (water/juice) */}
          <polygon points="37,45 63,45 59,78 41,78" fill={colors.sky} />
          {/* Ice Cube */}
          <rect x="44" y="52" width="10" height="10" rx="1" fill={colors.white} opacity="0.6" transform="rotate(15 49 57)" />
          {/* Reflection */}
          <line x1="39" y1="32" x2="42" y2="72" stroke={colors.white} strokeWidth="2" opacity="0.4" />
        </svg>
      );
    case "oven":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <rect x="22" y="25" width="56" height="55" rx="5" fill="#475569" />
          <rect x="22" y="25" width="56" height="12" fill="#334155" />
          {/* Knobs */}
          <circle cx="30" cy="31" r="3" fill={colors.yellow} />
          <circle cx="40" cy="31" r="3" fill={colors.lightGray} />
          <circle cx="50" cy="31" r="3" fill={colors.lightGray} />
          {/* Digital Timer */}
          <rect x="62" y="28" width="10" height="6" fill="#022C22" />
          <text x="67" y="33" fill={colors.secondary} fontSize="5" fontFamily="monospace" textAnchor="middle">12:00</text>
          {/* Glass Door */}
          <rect x="28" y="43" width="44" height="28" rx="2" fill="#1E293B" stroke={colors.lightGray} strokeWidth="2" />
          {/* Handle */}
          <rect x="34" y="39" width="32" height="3" rx="1" fill={colors.lightGray} />
          {/* Pizza/Cake inside */}
          <ellipse cx="50" cy="62" rx="14" ry="4" fill={colors.accent} />
        </svg>
      );
    case "fridge":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Main Body */}
          <rect x="28" y="15" width="44" height="72" rx="4" fill={colors.lightGray} stroke={colors.gray} strokeWidth="2" />
          {/* Split Line */}
          <line x1="28" y1="42" x2="72" y2="42" stroke={colors.gray} strokeWidth="2" />
          {/* Handles */}
          <rect x="32" y="25" width="3" height="12" rx="1" fill={colors.darkGray} />
          <rect x="32" y="46" width="3" height="18" rx="1" fill={colors.darkGray} />
          {/* Small magnets details */}
          <rect x="52" y="24" width="6" height="6" rx="1" fill={colors.primary} />
          <circle cx="62" cy="32" r="3" fill={colors.accent} />
        </svg>
      );

    // === DEFAULT SHIELDS/REWARDS ===
    case "star":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 50 15 L 61 38 L 85 38 L 66 54 L 73 78 L 50 63 L 27 78 L 34 54 L 15 38 L 39 38 Z" fill={colors.yellow} stroke={colors.accent} strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Base */}
          <rect x="35" y="75" width="30" height="8" fill={colors.darkGray} rx="2" />
          <polygon points="45,75 55,75 53,60 47,60" fill={colors.gray} />
          {/* Cup */}
          <path d="M 30 25 L 70 25 C 70 50, 30 50, 30 25 Z" fill={colors.yellow} stroke={colors.accent} strokeWidth="2" />
          {/* Rim */}
          <ellipse cx="50" cy="25" rx="20" ry="4" fill="#FDE047" stroke={colors.accent} strokeWidth="2" />
          {/* Handles */}
          <path d="M 30 30 Q 18 32, 30 42" fill="none" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
          <path d="M 70 30 Q 82 32, 70 42" fill="none" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
          {/* Star on Cup */}
          <path d="M 50 32 L 53 38 L 59 38 L 54 42 L 56 48 L 50 44 L 44 48 L 46 42 L 41 38 L 47 38 Z" fill={colors.white} />
        </svg>
      );
    case "coin":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="50" r="35" fill={colors.yellow} stroke={colors.accent} strokeWidth="4" />
          <circle cx="50" cy="50" r="27" fill="none" stroke="#FEF08A" strokeWidth="2" />
          <text x="50" y="59" fill={colors.accent} fontSize="26" fontWeight="900" textAnchor="middle">C</text>
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <path d="M 50 35 C 50 20, 20 15, 20 40 C 20 62, 50 82, 50 82 C 50 82, 80 62, 80 40 C 80 15, 50 20, 50 35 Z" fill={colors.danger} stroke="#B91C1C" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="32" cy="32" rx="4" ry="8" fill={colors.white} opacity="0.3" transform="rotate(-30 32 32)" />
        </svg>
      );
    case "badge":
    case "achievement":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Ribbon */}
          <polygon points="35,50 35,85 50,75 65,85 65,50" fill={colors.red} />
          <polygon points="40,50 40,80 50,72 60,80 60,50" fill="#EF4444" />
          {/* Medal */}
          <circle cx="50" cy="42" r="26" fill={colors.yellow} stroke={colors.accent} strokeWidth="3" />
          <circle cx="50" cy="42" r="20" fill={colors.white} opacity="0.2" />
          <path d="M 50 28 L 53 35 L 60 35 L 55 39 L 57 46 L 50 42 L 43 46 L 45 39 L 40 35 L 47 35 Z" fill={colors.accent} />
        </svg>
      );

    // === AVATARS (SVG INLINE CHARACTERS) ===
    case "avatar_boy1":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="#0EA5E9" />
          {/* Dino Green Hoodie Body */}
          <path d="M 30 90 C 30 70, 70 70, 70 90" fill="#22C55E" />
          {/* Dino Spikes on hood */}
          <path d="M 38 32 L 32 24 L 43 27 L 46 16 L 53 23 L 58 12 L 63 24 L 68 18" fill="#FACC15" />
          {/* Face */}
          <circle cx="50" cy="54" r="21" fill={colors.skin} />
          {/* Dino Hood opening */}
          <path d="M 50 30 C 32 30, 27 50, 31 66 C 36 78, 64 78, 69 66 C 73 50, 68 30, 50 30 Z" fill="none" stroke="#22C55E" strokeWidth="6" />
          {/* Blushing cheeks */}
          <circle cx="37" cy="60" r="3.5" fill="#F87171" opacity="0.6" />
          <circle cx="63" cy="60" r="3.5" fill="#F87171" opacity="0.6" />
          {/* Sparkling eyes (one winking, one open with catchlights) */}
          <path d="M 33 50 Q 38 45, 41 51" fill="none" stroke={colors.hairDark} strokeWidth="3" strokeLinecap="round" />
          <circle cx="58" cy="50" r="4.5" fill={colors.hairDark} />
          <circle cx="56.5" cy="48.5" r="1.5" fill={colors.white} />
          {/* Happy Open Mouth with tongue */}
          <path d="M 45 61 Q 50 67, 55 61 Z" fill="#EF4444" />
          <path d="M 47 63 Q 50 65, 53 63" fill="#FCD34D" />
        </svg>
      );
    case "avatar_girl1":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="#F472B6" />
          {/* Cute pink collar dress */}
          <path d="M 30 90 C 30 75, 70 75, 70 90" fill="#FF8A8A" />
          <polygon points="40,78 50,86 60,78 50,75" fill={colors.white} />
          {/* Face */}
          <circle cx="50" cy="52" r="21" fill={colors.skin} />
          {/* Fluffy double hair buns */}
          <circle cx="28" cy="35" r="11" fill={colors.hairBrown} />
          <circle cx="72" cy="35" r="11" fill={colors.hairBrown} />
          {/* Red bows on buns */}
          <path d="M 28 42 L 20 45 L 24 38 L 28 42 Z" fill="#EF4444" />
          <path d="M 72 42 L 80 45 L 76 38 L 72 42 Z" fill="#EF4444" />
          {/* Hair frame */}
          <path d="M 28 42 C 28 22, 72 22, 72 42 C 67 33, 33 33, 28 42" fill={colors.hairBrown} />
          <path d="M 27 42 C 27 58, 32 58, 32 46" fill={colors.hairBrown} />
          <path d="M 73 42 C 73 58, 68 58, 68 46" fill={colors.hairBrown} />
          {/* Cute Cat-Ear headband */}
          <path d="M 33 34 Q 50 25, 67 34" fill="none" stroke={colors.white} strokeWidth="3.5" />
          <polygon points="34,31 24,16 38,22" fill={colors.white} />
          <polygon points="32,29 26,19 35,23" fill="#FDA4AF" />
          <polygon points="66,31 76,16 62,22" fill={colors.white} />
          <polygon points="68,29 74,19 65,23" fill="#FDA4AF" />
          {/* Cute big anime eyes */}
          <circle cx="39" cy="51" r="5" fill={colors.hairDark} />
          <circle cx="37.5" cy="49" r="1.8" fill={colors.white} />
          <circle cx="40.2" cy="53" r="0.8" fill={colors.white} />
          <circle cx="61" cy="51" r="5" fill={colors.hairDark} />
          <circle cx="59.5" cy="49" r="1.8" fill={colors.white} />
          <circle cx="62.2" cy="53" r="0.8" fill={colors.white} />
          {/* Rosy blush */}
          <circle cx="34" cy="58" r="4" fill="#FB7185" opacity="0.65" />
          <circle cx="66" cy="58" r="4" fill="#FB7185" opacity="0.65" />
          {/* Sweet smiling open mouth */}
          <path d="M 45 59 C 45 68, 55 68, 55 59 Z" fill="#E11D48" />
          <path d="M 47 62 Q 50 64, 53 62" fill="#FDBA74" />
        </svg>
      );
    case "avatar_boy2":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="#FBBF24" />
          {/* Cute orange vest body */}
          <path d="M 30 90 C 30 75, 70 75, 70 90" fill="#F97316" />
          {/* Face */}
          <circle cx="50" cy="52" r="21" fill={colors.skin} />
          {/* Bear / Koala fuzzy cap */}
          <path d="M 28 42 C 28 24, 72 24, 72 42 Z" fill="#60A5FA" />
          {/* Bear ears */}
          <circle cx="30" cy="26" r="10" fill="#60A5FA" />
          <circle cx="30" cy="26" r="6" fill="#93C5FD" />
          <circle cx="70" cy="26" r="10" fill="#60A5FA" />
          <circle cx="70" cy="26" r="6" fill="#93C5FD" />
          {/* Cap peak */}
          <path d="M 27 42 C 34 38, 66 38, 73 42 Z" fill="#3B82F6" />
          {/* Round wireframe Glasses */}
          <circle cx="39" cy="50" r="8" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="61" cy="50" r="8" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="47" y1="50" x2="53" y2="50" stroke="#1E293B" strokeWidth="2.5" />
          {/* Sparkling eyes behind glasses */}
          <circle cx="39" cy="50" r="3.5" fill="#1E293B" />
          <circle cx="37.5" cy="48.5" r="1.2" fill={colors.white} />
          <circle cx="61" cy="50" r="3.5" fill="#1E293B" />
          <circle cx="59.5" cy="48.5" r="1.2" fill={colors.white} />
          {/* Cheerful rosy cheeks with cute freckles */}
          <circle cx="34" cy="59" r="3.5" fill="#EF4444" opacity="0.5" />
          <circle cx="66" cy="59" r="3.5" fill="#EF4444" opacity="0.5" />
          <circle cx="33" cy="56" r="0.6" fill="#B45309" />
          <circle cx="35" cy="56" r="0.6" fill="#B45309" />
          <circle cx="65" cy="56" r="0.6" fill="#B45309" />
          <circle cx="67" cy="56" r="0.6" fill="#B45309" />
          {/* Joyful open smile showing one cute little tooth! */}
          <path d="M 45 61 Q 50 68, 55 61 Z" fill="#991B1B" />
          <rect x="48" y="61" width="4" height="2.5" fill={colors.white} rx="0.5" />
        </svg>
      );
    case "avatar_girl2":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="#A78BFA" />
          {/* Cute purple outfit */}
          <path d="M 30 90 C 30 75, 70 75, 70 90" fill="#7C3AED" />
          {/* Face */}
          <circle cx="50" cy="52" r="21" fill={colors.skin} />
          {/* Star high buns */}
          <circle cx="28" cy="34" r="10.5" fill={colors.hairDark} />
          <circle cx="72" cy="34" r="10.5" fill={colors.hairDark} />
          {/* Hair frame */}
          <path d="M 28 39 C 28 20, 72 20, 72 39 C 68 31, 32 31, 28 39" fill={colors.hairDark} />
          {/* Shiny Star Clips */}
          <path d="M 28 29 L 30 33 L 34 33 L 31 35 L 32 39 L 28 36 L 24 39 L 25 35 L 22 33 L 26 33 Z" fill="#FBBF24" />
          <path d="M 72 29 L 74 33 L 78 33 L 75 35 L 76 39 L 72 36 L 68 39 L 69 35 L 66 33 L 70 33 Z" fill="#FBBF24" />
          {/* Sweet blushing cheeks */}
          <circle cx="34" cy="59" r="4" fill="#EC4899" opacity="0.6" />
          <circle cx="66" cy="59" r="4" fill="#EC4899" opacity="0.6" />
          {/* Cute sparkling wink */}
          <path d="M 33 50 Q 38 45, 41 51" fill="none" stroke={colors.hairDark} strokeWidth="3" strokeLinecap="round" />
          <circle cx="61" cy="50" r="4.5" fill={colors.hairDark} />
          <circle cx="59.5" cy="48" r="1.5" fill={colors.white} />
          {/* Happy winking cat mouth */}
          <path d="M 46 59 Q 50 62, 54 59" fill="none" stroke={colors.hairDark} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    default:
      // Generic placeholder graphic (question mark in shield)
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <polygon points="50,15 80,25 80,60 50,85 20,60 20,25" fill={colors.primary} />
          <polygon points="50,20 75,28 75,58 50,80 25,58 25,28" fill="#6366F1" />
          <text x="50" y="58" fill={colors.white} fontSize="28" fontWeight="bold" textAnchor="middle">?</text>
        </svg>
      );
  }
};
