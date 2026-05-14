"use client";

import { ArrowUpRight, ClipboardList, Factory, Handshake, Store } from "lucide-react";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { aboutPage } from "@/data/about";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";

const sectionIcons = [Store, Factory, Handshake, ClipboardList];

export function AboutPageClient() {
  const { locale } = useLanguage();

  return (
    <main className="min-h-screen text-text-primary">
      <StealthNavbar />
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-32 md:px-10">
        <div className="grid gap-8 border-b border-border-metallic pb-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: aboutPage.eyebrow_en, ar: aboutPage.eyebrow_ar })}</p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">{pickLocalized(locale, { en: aboutPage.title_en, ar: aboutPage.title_ar })}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">{pickLocalized(locale, { en: aboutPage.intro_en, ar: aboutPage.intro_ar })}</p>
          </div>
          <GlassCard className="h-fit p-5">
            <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: "What this means", ar: "يعني إيه؟" })}</p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {pickLocalized(locale, { en: "Factory + market experience + retailer support.", ar: "مصنع + خبرة سوق + دعم للتاجر." })}
            </p>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              {pickLocalized(locale, {
                en: "Built for retailers who want clear choices before spending on display pieces, store setup, or bulk supply.",
                ar: "معمول للتاجر اللي عايز اختيارات واضحة قبل ما يصرف على قطع عرض أو تجهيز محل أو توريد جملة.",
              })}
            </p>
          </GlassCard>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {aboutPage.sections.map((section, index) => {
            const Icon = sectionIcons[index] ?? Store;

            return (
              <GlassCard key={section.title_en} className="p-6">
                <Icon aria-hidden className="mb-5 h-6 w-6 text-accent-platinum" strokeWidth={1.7} />
                <h2 className="font-headline text-3xl text-white">{pickLocalized(locale, { en: section.title_en, ar: section.title_ar })}</h2>
                <p className="mt-4 leading-7 text-text-secondary">{pickLocalized(locale, { en: section.body_en, ar: section.body_ar })}</p>
              </GlassCard>
            );
          })}
        </div>

        <section className="mt-10 grid gap-8 border-y border-border-metallic py-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Retailer-first promise", ar: "وعدنا للتاجر" })}</p>
            <h2 className="mt-3 font-headline text-4xl text-white md:text-5xl">{pickLocalized(locale, { en: aboutPage.cta_title_en, ar: aboutPage.cta_title_ar })}</h2>
            <p className="mt-5 max-w-2xl leading-7 text-text-secondary">{pickLocalized(locale, { en: aboutPage.cta_body_en, ar: aboutPage.cta_body_ar })}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button href="/fit-out" icon={ClipboardList} className="platinum-pulse">
              {pickLocalized(locale, { en: "Plan Store Setup", ar: "جهز محلك" })}
            </Button>
            <Button href="/catalog" icon={ArrowUpRight} variant="glass">
              {pickLocalized(locale, { en: "Browse Catalog", ar: "تصفح المنتجات" })}
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
