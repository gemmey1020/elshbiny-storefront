"use client";

import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { getFaqCategories, getFeaturedFaqs } from "@/data/faqs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { faqCategoryName, pickLocalized } from "@/i18n/config";

function categoryId(category: string) {
  return `faq-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function FaqIndexClient() {
  const { locale } = useLanguage();
  const groupedFaqs = getFaqCategories();
  const featuredFaqs = getFeaturedFaqs(6);
  const totalQuestions = groupedFaqs.reduce((total, group) => total + group.items.length, 0);

  return (
    <main className="min-h-screen text-text-primary">
      <StealthNavbar />
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-32 md:px-10">
        <div className="grid gap-8 border-b border-border-metallic pb-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Retailer FAQ", ar: "أسئلة التجار" })}</p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">
              {pickLocalized(locale, {
                en: "Clear answers before you choose mannequins or set up a store.",
                ar: "إجابات واضحة قبل ما تختار المانيكانات أو تجهز المحل.",
              })}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
              {pickLocalized(locale, {
                en: "Start with a category, scan the short answer, then open the question when you need the full detail.",
                ar: "ابدأ بالتصنيف، اقرأ الإجابة المختصرة، وافتح السؤال لو محتاج التفاصيل.",
              })}
            </p>
          </div>
          <GlassCard className="h-fit p-5">
            <HelpCircle aria-hidden className="h-7 w-7 text-accent-platinum" strokeWidth={1.6} />
            <p className="mt-5 text-3xl font-semibold text-white">
              {totalQuestions} {pickLocalized(locale, { en: "questions", ar: "سؤال" })}
            </p>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              {pickLocalized(locale, {
                en: "Answers are grouped so store owners can move from price questions to setup decisions without digging.",
                ar: "الأسئلة متقسمة علشان صاحب المحل يوصل من السعر للتجهيز من غير تدوير كتير.",
              })}
            </p>
          </GlassCard>
        </div>

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Featured answers", ar: "إجابات مهمة" })}</p>
              <h2 className="mt-2 font-headline text-4xl text-white">
                {pickLocalized(locale, { en: "Start here if you are planning a store.", ar: "ابدأ من هنا لو بتجهز محل." })}
              </h2>
            </div>
            <Button href="/fit-out" icon={ArrowUpRight} variant="glass">
              {pickLocalized(locale, { en: "Plan Store Setup", ar: "جهز محلك" })}
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredFaqs.map((faq) => (
              <Link key={faq.slug} href={`/faq/${faq.slug}`} className="glass-panel rounded-md p-5 transition hover:border-white">
                <p className="text-xs uppercase text-text-secondary">{faqCategoryName(faq.category, locale)}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{pickLocalized(locale, { en: faq.question_en, ar: faq.question_ar })}</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: faq.short_answer_en, ar: faq.short_answer_ar })}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[270px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass-panel rounded-md p-4">
              <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "FAQ categories", ar: "تصنيفات الأسئلة" })}</p>
              <div className="mt-4 hidden gap-2 lg:grid">
                {groupedFaqs.map((group) => (
                  <a
                    key={group.category}
                    href={`#${categoryId(group.category)}`}
                    className="flex items-center justify-between border border-border-metallic bg-white/[0.03] px-3 py-3 text-sm font-semibold text-white transition hover:border-white"
                  >
                    <span>{faqCategoryName(group.category, locale)}</span>
                    <span className="text-xs text-text-secondary">{group.items.length}</span>
                  </a>
                ))}
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {groupedFaqs.map((group) => (
                  <a
                    key={group.category}
                    href={`#${categoryId(group.category)}`}
                    className="shrink-0 border border-border-metallic bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase text-white"
                  >
                    {faqCategoryName(group.category, locale)}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            {groupedFaqs.map((group) => (
              <div key={group.category} id={categoryId(group.category)} className="scroll-mt-28 border-t border-border-metallic pt-8">
                <h2 className="font-headline text-4xl text-white">{faqCategoryName(group.category, locale)}</h2>
                <div className="mt-5 grid gap-3">
                  {group.items.map((faq) => (
                    <Link
                      key={faq.slug}
                      href={`/faq/${faq.slug}`}
                      className="grid gap-3 border border-border-metallic bg-white/[0.02] p-4 transition hover:border-white md:grid-cols-[1fr_320px] md:items-center"
                    >
                      <span className="font-semibold text-white">{pickLocalized(locale, { en: faq.question_en, ar: faq.question_ar })}</span>
                      <span className="text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: faq.short_answer_en, ar: faq.short_answer_ar })}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
