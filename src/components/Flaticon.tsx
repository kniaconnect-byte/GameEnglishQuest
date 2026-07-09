/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface FlaticonProps extends React.SVGProps<SVGSVGElement> {
  name:
    | "check"
    | "cross"
    | "check_button"
    | "check_picture"
    | "check_sentence"
    | "check_spelling"
    | "check_arrangement"
    | "check_reading"
    | "star"
    | "warning"
    | "help"
    | "trophy"
    | "badge"
    | "compass"
    | "arrow_next"
    | "hand_drag";
  className?: string;
}

export const Flaticon: React.FC<FlaticonProps> = ({ name, className = "w-6 h-6", ...props }) => {
  const n = name.toLowerCase().trim();

  switch (n) {
    case "check":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Flat green circle shadow */}
          <circle cx="52" cy="52" r="40" fill="#15803D" opacity="0.3" />
          {/* Main 3D Green Circle */}
          <circle cx="50" cy="50" r="40" fill="url(#greenGrad)" stroke="#166534" strokeWidth="3" />
          {/* Highlight ring */}
          <circle cx="50" cy="50" r="36" fill="none" stroke="#4ADE80" strokeWidth="2.5" opacity="0.6" />
          {/* Check mark */}
          <path
            d="M 32 50 L 45 63 L 68 36"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Sparkles */}
          <circle cx="75" cy="22" r="4" fill="#FACC15" />
          <circle cx="22" cy="72" r="2.5" fill="#FACC15" />
          
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "cross":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Shadow */}
          <circle cx="52" cy="52" r="40" fill="#991B1B" opacity="0.3" />
          {/* Main red circle */}
          <circle cx="50" cy="50" r="40" fill="url(#redGrad)" stroke="#991B1B" strokeWidth="3" />
          {/* Highlight ring */}
          <circle cx="50" cy="50" r="36" fill="none" stroke="#F87171" strokeWidth="2.5" opacity="0.6" />
          {/* Cross lines */}
          <path d="M 33 33 L 67 67" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <path d="M 67 33 L 33 67" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          {/* Sad details */}
          <circle cx="22" cy="28" r="3" fill="#FECDD3" opacity="0.5" />
          <circle cx="78" cy="72" r="3.5" fill="#FECDD3" opacity="0.5" />

          <defs>
            <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "check_button":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Check icon for verify button */}
          <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#orangeGrad)" stroke="#C2410C" strokeWidth="3" />
          <rect x="16" y="16" width="68" height="68" rx="14" fill="none" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />
          {/* Checkmark in center */}
          <path
            d="M 30 52 L 44 66 L 70 34"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="76" cy="72" r="4.5" fill="#FFFFFF" opacity="0.7" />
          <circle cx="24" cy="24" r="3" fill="#FFFFFF" opacity="0.7" />

          <defs>
            <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "check_picture":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Outer circle badge */}
          <circle cx="50" cy="50" r="42" fill="url(#skyGrad)" stroke="#0369A1" strokeWidth="3" />
          {/* Inner picture landscape silhouette */}
          <path d="M 24 64 L 38 46 L 52 60 L 64 42 L 76 64 Z" fill="#E0F2FE" />
          {/* Sun */}
          <circle cx="34" cy="38" r="7" fill="#FDE047" />
          {/* Magnifying Glass Overlay */}
          <circle cx="64" cy="62" r="16" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
          <line x1="75" y1="73" x2="86" y2="84" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
          {/* Sparkly green check */}
          <path d="M 59 62 L 63 66 L 70 58" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />

          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "check_sentence":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Flat 3D chat bubbles in orange/yellow */}
          <path d="M 16 52 C 16 35, 34 22, 54 22 C 74 22, 88 35, 88 52 C 88 69, 74 80, 54 80 C 48 80, 42 78, 36 75 L 18 84 L 24 68 C 19 63, 16 58, 16 52 Z" fill="url(#chatGrad)" stroke="#B45309" strokeWidth="3" />
          {/* Lines representing sentence words */}
          <rect x="32" y="40" width="36" height="6" rx="3" fill="#FFFFFF" />
          <rect x="32" y="52" width="26" height="6" rx="3" fill="#FFFFFF" />
          {/* Check overlay badge */}
          <circle cx="74" cy="68" r="15" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path d="M 68 68 L 73 73 L 80 64" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="chatGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "check_spelling":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Spelling clipboard checklist */}
          <rect x="22" y="16" width="56" height="68" rx="8" fill="url(#paperGrad)" stroke="#475569" strokeWidth="3" />
          {/* Clipboard binder clamp top */}
          <path d="M 40 18 L 60 18 L 56 10 L 44 10 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
          {/* Letter rows */}
          <text x="32" y="38" fontSize="11" fontWeight="bold" fill="#334155" fontFamily="monospace">A B C</text>
          <text x="32" y="54" fontSize="11" fontWeight="bold" fill="#334155" fontFamily="monospace">D E _</text>
          {/* Pencil overlay */}
          <polygon points="62,72 52,82 48,82 48,78 58,68" fill="#F59E0B" stroke="#9A3412" strokeWidth="1.5" />
          <polygon points="48,82 48,78 44,84" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
          {/* Check star badge */}
          <circle cx="72" cy="72" r="14" fill="#10B981" stroke="#065F46" strokeWidth="2.5" />
          <path d="M 66 72 L 70 76 L 78 67" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "check_arrangement":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Puzzle block elements / word block arrangement */}
          <g transform="translate(4,4)">
            {/* Left Block */}
            <rect x="8" y="24" width="38" height="42" rx="10" fill="url(#violetGrad)" stroke="#5B21B6" strokeWidth="2.5" />
            <text x="27" y="50" fill="#FFFFFF" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">W</text>
            
            {/* Right Block */}
            <rect x="46" y="24" width="38" height="42" rx="10" fill="url(#fuchsiaGrad)" stroke="#86198F" strokeWidth="2.5" />
            <text x="65" y="50" fill="#FFFFFF" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">D</text>

            {/* Glowing sparkle badge overlay */}
            <circle cx="72" cy="64" r="15" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
            <path d="M 66 64 L 70 68 L 78 59" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          <defs>
            <linearGradient id="violetGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#5B21B6" />
            </linearGradient>
            <linearGradient id="fuchsiaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D946EF" />
              <stop offset="100%" stopColor="#86198F" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "check_reading":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Reading Open Book */}
          <path d="M 50 82 C 45 75, 20 75, 12 80 L 12 25 C 20 20, 45 20, 50 27 C 55 20, 80 20, 88 25 L 88 80 C 80 75, 55 75, 50 82 Z" fill="url(#bookGrad)" stroke="#1E3A8A" strokeWidth="3" />
          <path d="M 50 27 L 50 82" fill="none" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Simulated text lines */}
          <line x1="22" y1="36" x2="42" y2="36" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="46" x2="38" y2="46" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="56" x2="42" y2="56" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />

          <line x1="58" y1="36" x2="78" y2="36" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="46" x2="74" y2="46" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
          {/* Check star overlay */}
          <circle cx="72" cy="62" r="15" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path d="M 66 62 L 70 66 L 78 57" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#EFF6FF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "star":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Shadow */}
          <path
            d="M 50 8 L 63 34 L 92 38 L 71 58 L 76 87 L 50 73 L 24 87 L 29 58 L 8 38 L 37 34 Z"
            fill="#B45309"
            opacity="0.2"
            transform="translate(2, 3)"
          />
          {/* Golden yellow star body with gradient */}
          <path
            d="M 50 8 L 63 34 L 92 38 L 71 58 L 76 87 L 50 73 L 24 87 L 29 58 L 8 38 L 37 34 Z"
            fill="url(#starGrad)"
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Shiny inner highlight line */}
          <path
            d="M 50 14 L 60 36 L 86 39 L 66 57 L 71 82 L 50 69 L 29 82 L 34 57 L 14 39 L 40 36 Z"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="2"
            opacity="0.75"
            strokeLinejoin="round"
          />
          {/* Cute happy eyes & mouth */}
          <circle cx="42" cy="46" r="3" fill="#451A03" />
          <circle cx="58" cy="46" r="3" fill="#451A03" />
          <path d="M 47 52 Q 50 56, 53 52" fill="none" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
          {/* Blushing cheeks */}
          <circle cx="38" cy="50" r="2.5" fill="#F87171" opacity="0.6" />
          <circle cx="62" cy="50" r="2.5" fill="#F87171" opacity="0.6" />

          <defs>
            <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "warning":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Rounded Caution Triangle with warning face */}
          <path d="M 50 12 L 88 78 C 91 83, 87 88, 81 88 L 19 88 C 13 88, 9 83, 12 78 Z" fill="url(#yellowGrad)" stroke="#B45309" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 50 18 L 82 76 C 84 79, 81 82, 77 82 L 23 82 C 19 82, 16 79, 18 76 Z" fill="none" stroke="#FEF08A" strokeWidth="2.5" opacity="0.5" strokeLinejoin="round" />
          
          {/* Exclamation exclamation mark */}
          <rect x="46" y="38" width="8" height="24" rx="4" fill="#78350F" />
          <circle cx="50" cy="71" r="5" fill="#78350F" />

          <defs>
            <linearGradient id="yellowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "help":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Colorful Question bubble */}
          <circle cx="50" cy="50" r="40" fill="url(#pinkGrad)" stroke="#BE185D" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#FCE7F3" strokeWidth="2" opacity="0.4" />
          {/* Cute question mark */}
          <path d="M 38 38 C 38 26, 62 26, 62 38 C 62 46, 50 48, 50 56" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <circle cx="50" cy="72" r="6" fill="#FFFFFF" />

          <defs>
            <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "trophy":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Platform pedestal base */}
          <ellipse cx="50" cy="84" rx="28" ry="8" fill="#1E293B" opacity="0.2" />
          <rect x="36" y="74" width="28" height="10" rx="3" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <polygon points="46,55 54,55 54,74 46,74" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
          
          {/* Side handles */}
          <path d="M 24 38 C 12 38, 12 55, 30 55" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <path d="M 76 38 C 88 38, 88 55, 70 55" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          
          {/* Golden cup */}
          <path d="M 30 30 L 70 30 L 64 58 C 64 64, 36 64, 36 58 Z" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="3" />
          {/* Shine flare on cup */}
          <ellipse cx="40" cy="44" rx="4" ry="10" fill="#FFFFFF" opacity="0.3" transform="rotate(-15, 40, 44)" />
          {/* Level Star on cup */}
          <polygon points="50,38 53,44 60,45 55,50 56,56 50,53 44,56 45,50 40,45 47,44" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />

          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "badge":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Back ribbon tails */}
          <polygon points="34,50 24,84 38,76 45,58" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <polygon points="66,50 76,84 62,76 55,58" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          {/* Round badge body */}
          <circle cx="50" cy="46" r="32" fill="url(#badgeGrad)" stroke="#B45309" strokeWidth="3" />
          <circle cx="50" cy="46" r="27" fill="none" stroke="#FEF08A" strokeWidth="2.5" opacity="0.5" />
          {/* Star in center */}
          <polygon points="50,28 56,38 68,40 59,48 61,60 50,54 39,60 41,48 32,40 44,38" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />

          <defs>
            <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "compass":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Explorer Compass */}
          <circle cx="50" cy="50" r="42" fill="url(#metalGrad)" stroke="#334155" strokeWidth="3" />
          <circle cx="50" cy="50" r="36" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
          {/* Compass ticks */}
          <line x1="50" y1="18" x2="50" y2="24" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="82" x2="50" y2="76" stroke="#475569" strokeWidth="2" />
          <line x1="18" y1="50" x2="24" y2="50" stroke="#475569" strokeWidth="2" />
          <line x1="82" y1="50" x2="76" y2="50" stroke="#475569" strokeWidth="2" />
          {/* Needle shadow */}
          <polygon points="50,28 54,50 46,50" fill="#E2E8F0" opacity="0.8" transform="translate(1, 2)" />
          {/* North red pointer needle */}
          <polygon points="50,26 56,50 44,50" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
          {/* South blue pointer needle */}
          <polygon points="50,74 56,50 44,50" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          {/* Center golden pin */}
          <circle cx="50" cy="50" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />

          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "arrow_next":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Playful Orange Arrow pointing right */}
          <circle cx="50" cy="50" r="40" fill="url(#arrowGrad)" stroke="#C2410C" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#FFEDD5" strokeWidth="2.5" opacity="0.4" />
          <path d="M 38 50 L 62 50" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <path d="M 50 34 L 66 50 L 50 66" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "hand_drag":
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          {/* Puzzle hand drag flaticon */}
          <circle cx="50" cy="50" r="42" fill="url(#greenGrad)" stroke="#047857" strokeWidth="3" />
          <path d="M 32 46 C 32 38, 38 32, 46 32 C 54 32, 60 38, 60 46 L 60 52 L 68 52 C 74 52, 78 56, 78 62 C 78 68, 74 72, 68 72 L 46 72 C 38 72, 32 66, 32 58 Z" fill="#FFFFFF" stroke="#047857" strokeWidth="2.5" />
          {/* Arrow vectors */}
          <path d="M 36 24 L 64 24" fill="none" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
          <path d="M 56 16 L 68 24 L 56 32" fill="none" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
          <circle cx="50" cy="50" r="40" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
          <text x="50" y="58" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#475569">?</text>
        </svg>
      );
  }
};
