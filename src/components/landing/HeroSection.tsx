"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ClipboardList, HelpCircle } from "lucide-react";
import { MannequinLoader } from "@/components/shared/MannequinLoader";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { MannequinCard } from "@/components/ui/MannequinCard";
import {
  aboutPreview,
  categoryFallbacks,
  homeHero,
  homeStats,
  quickPaths,
  storeSetupSteps,
} from "@/data/home";
import { getFeaturedFaqs } from "@/data/faqs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { categoryDescription, categoryName, faqCategoryName, pickLocalized } from "@/i18n/config";
import { type Category, type Product, listCategories, listProducts } from "@/lib/catalog";

const HeroMannequinScene = dynamic(
  () => import("@/components/three/HeroMannequinScene").then((module) => module.HeroMannequinScene),
  {
    ssr: false,
    loading: () => <MannequinLoader className="min-h-[560px]" label="Preparing 3D showcase" labelAr="بنجهز عرض 3D" />,
  },
);

export function HeroSection() {
  const { locale } = useLanguage();
  const { scrollY } = useScroll();
  const yStage = useTransform(scrollY, [0, 520], [0, 72]);
  const yCopy = useTransform(scrollY, [0, 520], [0, -24]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadHomeData() {
      try {
        const [productData, categoryData] = await Promise.all([
          listProducts({ per_page: 9 }),
          listCategories(),
        ]);

        if (!cancelled) {
          setProducts(productData.data);
          setCategories(categoryData);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setCategories([]);
        }
      }
    }

    loadHomeData();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);
  const categoryCards = useMemo(() => categories.slice(0, 4), [categories]);
  const featuredFaqs = getFeaturedFaqs(4);

  return (
    <main>
      <section
        style={{
          backgroundImage: "url('/brand/hero-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-border-metallic px-5 pb-16 pt-28 md:px-10 md:!bg-none"
      >
        {/* Mobile-only obsidian overlay for premium contrast & perfect typography legibility */}
        <div className="absolute inset-0 bg-background-obsidian/75 z-0 pointer-events-none md:hidden" />

        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] z-10 relative">
          <motion.div style={{ y: yCopy }} className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-platinum">
              {pickLocalized(locale, { en: homeHero.eyebrow_en, ar: homeHero.eyebrow_ar })}
            </p>

            {/* Premium Category Quick Navigation Bar for Mobile-first retail discovery */}
            <div className="mb-6 flex flex-wrap gap-1.5 justify-center lg:justify-start">
              {[
                { label: locale === "ar" ? "مانيكان" : "Mannequins", href: "/catalog?category=premium-window-mannequins" },
                { label: locale === "ar" ? "استاندات" : "Stands", href: "/catalog?category=display-props-stands" },
                { label: locale === "ar" ? "شماعات" : "Hangers", href: "/catalog?category=modular-retail-forms" },
                { label: locale === "ar" ? "تحف" : "Antiques", href: "/catalog?category=display-props-stands" },
                { label: locale === "ar" ? "اكسسوار" : "Accessories", href: "/catalog?category=display-props-stands" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent-platinum border border-border-metallic/30 bg-white/[0.01] hover:bg-white hover:text-background-obsidian hover:border-white transition-all duration-300 rounded-sm glass-panel"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <h1 className="font-headline text-[1.95rem] leading-[1.12] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {pickLocalized(locale, { en: homeHero.title_en, ar: homeHero.title_ar })}
            </h1>
            {locale === "ar" ? (
              <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-100/95 md:text-base md:leading-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                <span className="inline-flex items-center gap-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 animate-pulse drop-shadow-[0_0_15px_rgba(245,158,11,0.85)]">
                  الشبيني رقم ١
                  <span className="text-[10px] sm:text-xs">⭐</span>
                </span>{" "}
                في تجهيز المحلات لو حابب مانيكان استاند شماعات تحف اكسسوار تغير شكل محلك يبقا ده مكانك خبرتنا تفرق ♥️
              </p>
            ) : (
              <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base md:leading-8">
                {homeHero.body_en}
              </p>
            )}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/fit-out" icon={ClipboardList} className="platinum-pulse">
                {pickLocalized(locale, { en: homeHero.primary_cta_en, ar: homeHero.primary_cta_ar })}
              </Button>
              <Button href="/catalog" icon={ArrowUpRight} variant="glass">
                {pickLocalized(locale, { en: homeHero.secondary_cta_en, ar: homeHero.secondary_cta_ar })}
              </Button>
            </div>
            <div className="mt-9 hidden md:grid gap-3 sm:grid-cols-3">
              {homeStats.map((stat) => (
                <div key={stat.label_en} className="border border-border-metallic bg-white/[0.02] p-3">
                  <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: stat.label_en, ar: stat.label_ar })}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{pickLocalized(locale, { en: stat.value_en, ar: stat.value_ar })}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: yStage }} className="hidden md:flex justify-center">
            <HeroMannequinScene />
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border-metallic px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-3">
          {quickPaths.map((item) => {
            const Icon = item.icon;

            return (
              <GlassCard key={item.title_en} className="p-6">
                <Icon aria-hidden className="mb-5 h-6 w-6 text-accent-platinum" strokeWidth={1.7} />
                <h2 className="font-headline text-2xl text-white">{pickLocalized(locale, { en: item.title_en, ar: item.title_ar })}</h2>
                <p className="mt-3 min-h-20 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: item.body_en, ar: item.body_ar })}</p>
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase text-accent-platinum">
                  {pickLocalized(locale, { en: item.label_en, ar: item.label_ar })}
                  <ArrowUpRight aria-hidden className="h-4 w-4 rtl-flip" strokeWidth={1.8} />
                </Link>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="border-b border-border-metallic px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Featured Products", ar: "منتجات مختارة" })}</p>
              <h2 className="mt-3 font-headline text-4xl text-white md:text-5xl">
                {pickLocalized(locale, { en: "Real catalog picks for real stores.", ar: "اختيارات من الكتالوج لمحلات حقيقية." })}
              </h2>
            </div>
            <Button href="/catalog" icon={ArrowUpRight} variant="glass">
              {pickLocalized(locale, { en: "View all products", ar: "شوف كل المنتجات" })}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.length > 0
              ? featuredProducts.map((product) => <MannequinCard key={product.id} product={product} />)
              : Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="glass-panel h-[520px] rounded-md">
                    <MannequinLoader className="h-full" label="Loading product line" labelAr="بنحمل المنتجات" compact />
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-metallic px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.78fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Best-selling categories", ar: "أشهر التصنيفات" })}</p>
            <h2 className="mt-3 font-headline text-4xl text-white md:text-5xl">
              {pickLocalized(locale, { en: "Start from the type of display your store needs.", ar: "ابدأ من نوع العرض اللي محلك محتاجه." })}
            </h2>
            <p className="mt-5 text-text-secondary">
              {pickLocalized(locale, {
                en: "Local retailers usually understand categories faster than technical terms, so the home page keeps common paths visible.",
                ar: "التاجر غالبًا بيفهم التصنيفات أسرع من الكلام التقني، علشان كده المداخل المهمة ظاهرة قدامه.",
              })}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {categoryCards.length > 0
              ? categoryCards.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/catalog?category=${category.slug}`}
                    className="glass-panel rounded-md p-5 transition hover:border-white"
                  >
                    <p className="text-xs uppercase text-text-secondary">
                      {category.products_count ?? pickLocalized(locale, { en: "View", ar: "شوف" })} {pickLocalized(locale, { en: "products", ar: "منتج" })}
                    </p>
                    <h3 className="mt-3 font-headline text-3xl text-white">{categoryName(category, locale)}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">{categoryDescription(category, locale)}</p>
                  </Link>
                ))
              : categoryFallbacks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <GlassCard key={item.title_en} className="p-5">
                      <Icon aria-hidden className="mb-5 h-6 w-6 text-accent-steel" strokeWidth={1.6} />
                      <h3 className="font-headline text-3xl text-white">{pickLocalized(locale, { en: item.title_en, ar: item.title_ar })}</h3>
                      <p className="mt-3 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: item.body_en, ar: item.body_ar })}</p>
                    </GlassCard>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="border-b border-border-metallic px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Store setup service", ar: "خدمة تجهيز المحلات" })}</p>
            <h2 className="mt-3 max-w-4xl font-headline text-4xl text-white md:text-6xl">
              {pickLocalized(locale, { en: "The mannequin is the product. Store setup is the bigger promise.", ar: "المانيكان هو المنتج. تجهيز المحل هو الوعد الأكبر." })}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              {pickLocalized(locale, {
                en: "The fit-out path prepares the buyer before the quote: store type, display style, space, quantity, and the right product mix.",
                ar: "مسار التجهيز بيجهزك قبل عرض السعر: نوع المحل، شكل العرض، المساحة، الكمية، ومزيج المنتجات المناسب.",
              })}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/fit-out" icon={ClipboardList} className="platinum-pulse">
                {pickLocalized(locale, { en: "Plan Store Setup", ar: "جهز محلك" })}
              </Button>
              <Button href="/faq" icon={HelpCircle} variant="glass">
                {pickLocalized(locale, { en: "Common Questions", ar: "أسئلة مهمة" })}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {storeSetupSteps.map((step, index) => (
              <div key={step.title_en} className="glass-panel rounded-md p-5">
                <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: "Step", ar: "خطوة" })} {index + 1}</p>
                <h3 className="mt-2 font-headline text-3xl text-white">{pickLocalized(locale, { en: step.title_en, ar: step.title_ar })}</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: step.body_en, ar: step.body_ar })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.8fr_1fr]">
          <GlassCard className="p-7">
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: aboutPreview.eyebrow_en, ar: aboutPreview.eyebrow_ar })}</p>
            <h2 className="mt-3 font-headline text-4xl text-white">{pickLocalized(locale, { en: aboutPreview.title_en, ar: aboutPreview.title_ar })}</h2>
            <p className="mt-5 leading-7 text-text-secondary">{pickLocalized(locale, { en: aboutPreview.body_en, ar: aboutPreview.body_ar })}</p>
            <Button href="/about" icon={ArrowUpRight} variant="glass" className="mt-7">
              {pickLocalized(locale, { en: aboutPreview.cta_en, ar: aboutPreview.cta_ar })}
            </Button>
          </GlassCard>
          <GlassCard className="p-7">
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "FAQ Preview", ar: "أسئلة قبل الطلب" })}</p>
            <h2 className="mt-3 font-headline text-4xl text-white">
              {pickLocalized(locale, { en: "Questions retailers ask before ordering.", ar: "أسئلة التجار قبل ما يطلبوا." })}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {featuredFaqs.map((faq) => (
                <Link key={faq.slug} href={`/faq/${faq.slug}`} className="border border-border-metallic bg-white/[0.02] p-4 transition hover:border-white">
                  <p className="text-xs uppercase text-text-secondary">{faqCategoryName(faq.category, locale)}</p>
                  <h3 className="mt-2 text-sm font-semibold text-white">{pickLocalized(locale, { en: faq.question_en, ar: faq.question_ar })}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{pickLocalized(locale, { en: faq.short_answer_en, ar: faq.short_answer_ar })}</p>
                </Link>
              ))}
            </div>
            <Button href="/faq" icon={ArrowUpRight} className="mt-7">
              {pickLocalized(locale, { en: "Open FAQ", ar: "افتح الأسئلة" })}
            </Button>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
