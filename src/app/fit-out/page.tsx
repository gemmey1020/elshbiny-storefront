"use client";

import { FitOutEngine } from "@/components/fit-out/FitOutEngine";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { MannequinLoader } from "@/components/shared/MannequinLoader";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";

export default function Page() {
  const { locale } = useLanguage();

  return (
    <main className="min-h-screen bg-background-obsidian text-text-primary">
      <StealthNavbar />
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 md:px-10">
        <div className="mb-10 grid gap-8 border-b border-border-metallic pb-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-steel">{pickLocalized(locale, { en: "Virtual Merchandiser", ar: "مساعد تجهيز المحل" })}</p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">
              {pickLocalized(locale, { en: "Configure the retail story before the quote.", ar: "ظبط قصة عرض محلك قبل عرض السعر." })}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
              {pickLocalized(locale, {
                en: "A guided studio path for store owners who need the right mannequins, quantities, finishes, and display direction.",
                ar: "مسار بسيط لصاحب المحل اللي محتاج المانيكانات والعدد والتشطيب واتجاه العرض المناسب.",
              })}
            </p>
          </div>
          <div className="glass-panel rounded-md p-6">
            <MannequinLoader label="Store setup studio" labelAr="استوديو تجهيز المحل" />
          </div>
        </div>
        <FitOutEngine />
      </section>
    </main>
  );
}
