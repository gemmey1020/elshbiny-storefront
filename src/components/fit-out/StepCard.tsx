"use client";

import type { FitOutOption, FitOutQuestion } from "@/lib/fitOut";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";

type StepCardProps = {
  question: FitOutQuestion;
  selectedValue?: string | number | boolean | string[];
  onSelect: (value: string) => void;
};

export function StepCard({ question, selectedValue, onSelect }: StepCardProps) {
  const { locale } = useLanguage();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {question.options.map((option: FitOutOption) => {
        const selected = selectedValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option.value)}
            className={`min-h-32 border p-5 text-left transition duration-300 ${
              selected
                ? "border-accent-steel bg-accent-steel/10 shadow-[0_0_24px_rgba(148,163,184,0.16)]"
                : "border-border-metallic bg-surface-glass hover:border-white hover:bg-white/[0.04]"
            }`}
          >
            <span className="block font-headline text-2xl text-white">{pickLocalized(locale, { en: option.label_en, ar: option.label_ar })}</span>
            {option.description_en || option.description_ar ? (
              <span className="mt-3 block text-sm text-text-secondary">{pickLocalized(locale, { en: option.description_en, ar: option.description_ar })}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
