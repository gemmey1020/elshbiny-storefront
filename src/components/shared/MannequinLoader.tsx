"use client";

import type { HTMLAttributes } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";

type MannequinLoaderProps = {
  label?: string;
  labelAr?: string;
  compact?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function MannequinGlyph({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto ${compact ? "h-16 w-12" : "h-28 w-20"} ${className}`}
    >
      {/* Head */}
      <span className="absolute left-1/2 top-0 h-[15%] w-[28%] -translate-x-1/2 rounded-[50%_50%_45%_45%] border border-white/50 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.1)]" />

      {/* Neck */}
      <span className="absolute left-1/2 top-[15%] h-[7%] w-[10%] -translate-x-1/2 border-x border-white/30 bg-white/[0.03]" />

      {/* Shoulders - Curved and sloping */}
      <span className="absolute left-1/2 top-[22%] h-[14%] w-[82%] -translate-x-1/2 rounded-[50%_50%_20%_20%] border-x border-t border-white/40 bg-white/[0.04]" />

      {/* Torso - Tapered / Hourglass form */}
      <span className="absolute left-1/2 top-[34%] h-[38%] w-[52%] -translate-x-1/2 rounded-[15%_15%_45%_45%] border border-white/50 bg-white/[0.06] shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]" />

      {/* Arms - Subtle posture */}
      <span className="absolute left-[7%] top-[34%] h-[30%] w-[7%] rotate-[12deg] rounded-full border border-white/25 bg-white/[0.02]" />
      <span className="absolute right-[7%] top-[34%] h-[30%] w-[7%] rotate-[-12deg] rounded-full border border-white/25 bg-white/[0.02]" />

      {/* Stand Connector */}
      <span className="absolute left-1/2 top-[72%] h-[15%] w-[2px] -translate-x-1/2 bg-white/20" />

      {/* Display Base */}
      <span className="absolute bottom-[6%] left-1/2 h-[8%] w-[40%] -translate-x-1/2 rounded-[50%_50%_10%_10%] border border-white/30 bg-white/[0.05]" />

      {/* Ground Reflection */}
      <span className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </div>
  );
}

export function MannequinGlyphSVG({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto flex items-center justify-center ${compact ? "h-16 w-12" : "h-28 w-20"} ${className}`}
    >
      <svg
        viewBox="0 0 100 150"
        className="h-full w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Organic Tailoring Mannequin Path */}
        <path
          d="M50 5 C44 5 40 10 40 16 C40 22 44 27 50 27 C56 27 60 22 60 16 C60 10 56 5 50 5 Z 
             M47 27 L53 27 L55 33 L45 33 Z 
             M50 33 C35 33 22 36 18 48 C15 58 18 78 24 98 C27 108 38 118 50 118 C62 118 73 108 76 98 C82 78 85 58 82 48 C78 36 65 33 50 33 Z"
          className="fill-white/10 stroke-white/50"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Glass Glow Highlights */}
        <path
          d="M30 50 C28 60 32 80 38 95"
          className="stroke-white/20"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Central Stand Support */}
        <path
          d="M50 118 L50 142"
          className="stroke-white/30"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Designer Circular Base */}
        <path
          d="M32 144 C32 141 68 141 68 144 L70 148 C70 151 30 151 30 148 Z"
          className="fill-white/10 stroke-white/40"
          strokeWidth="1.5"
        />

        {/* Ground Light Stripe */}
        <line
          x1="10"
          y1="152"
          x2="90"
          y2="152"
          className="stroke-white/10"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export function MannequinGlyphPremium({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto ${compact ? "h-16 w-12" : "h-28 w-20"} ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-[6%] w-[22%] -translate-x-1/2 rounded-t-sm border border-white/50 bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
      <span className="absolute left-1/2 top-[6%] h-[8%] w-[10%] -translate-x-1/2 border-x border-white/30 bg-white/[0.05]" />
      <span className="absolute left-1/2 top-[14%] h-[12%] w-[82%] -translate-x-1/2 rounded-t-[50%_40%] border-x border-t border-white/45 bg-white/[0.06]" />
      <span className="absolute left-1/2 top-[26%] h-[46%] w-[54%] -translate-x-1/2 rounded-[10%_10%_48%_48%] border border-white/55 bg-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
      <span className="absolute left-1/2 top-[72%] h-[18%] w-[2px] -translate-x-1/2 bg-white/30" />
      <span className="absolute bottom-[2%] left-1/2 h-[8%] w-[42%] -translate-x-1/2 rounded-[50%_50%_10%_10%] border border-white/35 bg-white/[0.05] shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
      <span className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

export function MannequinGlyphFinal({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto flex items-center justify-center ${compact ? "h-16 w-12" : "h-28 w-20"} ${className}`}
    >
      <svg
        viewBox="0 0 100 150"
        className="h-full w-full drop-shadow-[0_10px_20px_rgba(255,255,255,0.07)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50" cy="142" rx="40" ry="3" className="fill-white/5" />
        <path d="M25 140 L75 140 L68 134 L32 134 Z" className="fill-white/20 stroke-white/40" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="38" y="130" width="24" height="4" className="fill-white/30" />
        <rect x="46" y="95" width="8" height="35" className="fill-white/10 stroke-white/30" strokeWidth="1" />
        <path 
          d="M40 20 C 40 10, 60 10, 60 20 L 85 30 C 92 32, 92 45, 86 55 L 70 100 C 65 110, 35 110, 30 100 L 14 55 C 8 45, 8 32, 15 30 Z" 
          className="fill-white/10 stroke-white/50" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        <path d="M42 15 L58 15 L55 8 L45 8 Z" className="fill-white/40" />
        <rect x="48" y="4" width="4" height="4" className="fill-white/60" />
        <line x1="50" y1="20" x2="50" y2="105" className="stroke-white/20" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M17 45 Q 50 58 83 45" className="stroke-white/30" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 80 Q 50 88 74 80" className="stroke-white/20" strokeWidth="1" strokeLinecap="round" />
        <path d="M20 35 C 26 45, 26 60, 20 70" className="stroke-white/40" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M80 35 C 74 45, 74 60, 80 70" className="stroke-white/40" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function MannequinLoader({ label = "Preparing the showroom", labelAr, compact = false, className = "", ...props }: MannequinLoaderProps) {
  const { locale } = useLanguage();
  const text = pickLocalized(locale, { en: label, ar: labelAr }, label);

  return (
    <div className={`grid place-items-center text-center ${className}`} {...props}>
      <div>
        <div className="mannequin-loader-pulse">
          <MannequinGlyphFinal compact={compact} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-accent-platinum">{text}</p>
      </div>
    </div>
  );
}
