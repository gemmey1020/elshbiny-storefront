"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ClipboardList } from "lucide-react";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import type { FaqItem } from "@/data/faqs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { faqCategoryName, pickLocalized } from "@/i18n/config";

type FaqDetailClientProps = {
  faq: FaqItem;
  relatedFaqs: FaqItem[];
};

export function FaqDetailClient({ faq, relatedFaqs }: FaqDetailClientProps) {
  const { locale } = useLanguage();

  return (
    <main className="min-h-screen text-text-primary">
      <StealthNavbar />
      <section className="mx-auto max-w-[980px] px-5 pb-20 pt-32 md:px-10">
        <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-text-secondary hover:text-white">
          <ArrowLeft aria-hidden className="h-4 w-4 rtl-flip" strokeWidth={1.8} />
          {pickLocalized(locale, { en: "Back to FAQ", ar: "ارجع للأسئلة" })}
        </Link>

        <article className="mt-8 border-b border-border-metallic pb-10">
          <p className="text-xs font-semibold uppercase text-accent-platinum">{faqCategoryName(faq.category, locale)}</p>
          <h1 className="mt-4 font-headline text-5xl text-white md:text-7xl">{pickLocalized(locale, { en: faq.question_en, ar: faq.question_ar })}</h1>
          <GlassCard className="mt-8 p-5">
            <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: "Short answer", ar: "الإجابة المختصرة" })}</p>
            <p className="mt-3 text-2xl font-semibold leading-8 text-white">{pickLocalized(locale, { en: faq.short_answer_en, ar: faq.short_answer_ar })}</p>
          </GlassCard>
          <div className="mt-8 text-lg leading-8 text-text-secondary">
            <p>{pickLocalized(locale, { en: faq.answer_en, ar: faq.answer_ar })}</p>
          </div>
        </article>

        {relatedFaqs.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-headline text-4xl text-white">{pickLocalized(locale, { en: "Related questions", ar: "أسئلة قريبة" })}</h2>
            <div className="mt-5 grid gap-3">
              {relatedFaqs.map((item) => (
                <Link key={item.slug} href={`/faq/${item.slug}`} className="border border-border-metallic bg-white/[0.02] p-4 transition hover:border-white">
                  <p className="text-sm font-semibold text-white">{pickLocalized(locale, { en: item.question_en, ar: item.question_ar })}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: item.short_answer_en, ar: item.short_answer_ar })}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 grid gap-4 border-t border-border-metallic pt-10 sm:grid-cols-2">
          <Button href="/fit-out" icon={ClipboardList} className="platinum-pulse">
            {pickLocalized(locale, { en: "Plan Store Setup", ar: "جهز محلك" })}
          </Button>
          <Button href="/catalog" icon={ArrowUpRight} variant="glass">
            {pickLocalized(locale, { en: "Browse Catalog", ar: "تصفح المنتجات" })}
          </Button>
        </section>
      </section>
    </main>
  );
}
