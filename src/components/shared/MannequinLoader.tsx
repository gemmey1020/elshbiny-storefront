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
      <span className="absolute left-1/2 top-0 h-[16%] w-[32%] -translate-x-1/2 rounded-[48%] border border-white/55 bg-white/[0.08] shadow-[0_0_28px_rgba(255,255,255,0.18)]" />
      <span className="absolute left-1/2 top-[17%] h-[10%] w-[16%] -translate-x-1/2 rounded-b-full border-x border-white/40 bg-white/[0.03]" />
      <span className="absolute left-1/2 top-[28%] h-[18%] w-[72%] -translate-x-1/2 rounded-t-[52%] border-x border-t border-white/45 bg-white/[0.04]" />
      <span className="absolute left-1/2 top-[34%] h-[34%] w-[50%] -translate-x-1/2 rounded-t-[38%] rounded-b-[42%] border border-white/55 bg-white/[0.06] shadow-[inset_0_0_24px_rgba(255,255,255,0.05)]" />
      <span className="absolute left-[10%] top-[35%] h-[34%] w-[10%] rotate-[10deg] rounded-full border border-white/35 bg-white/[0.035]" />
      <span className="absolute right-[10%] top-[35%] h-[34%] w-[10%] rotate-[-10deg] rounded-full border border-white/35 bg-white/[0.035]" />
      <span className="absolute left-1/2 top-[65%] h-[13%] w-[40%] -translate-x-1/2 rounded-b-[50%] border-x border-b border-white/40 bg-white/[0.035]" />
      <span className="absolute left-[33%] top-[76%] h-[18%] w-[10%] rounded-full border border-white/35 bg-white/[0.03]" />
      <span className="absolute right-[33%] top-[76%] h-[18%] w-[10%] rounded-full border border-white/35 bg-white/[0.03]" />
      <span className="absolute bottom-[2%] left-1/2 h-[4%] w-[78%] -translate-x-1/2 border border-white/35 bg-black/20" />
      <span className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-white/30" />
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
          <MannequinGlyph compact={compact} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-accent-platinum">{text}</p>
      </div>
    </div>
  );
}
