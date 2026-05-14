"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList, LockKeyhole } from "lucide-react";
import { StealthNavbar } from "@/components/landing/StealthNavbar";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import { CheckoutLoader } from "@/components/cart/CheckoutLoader";
import { useCartHydration } from "@/hooks/useCartHydration";
import { useCheckoutPipeline } from "@/hooks/useCheckoutPipeline";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";
import { useAuthStore } from "@/store/useAuthStore";
import { useInquiryStore } from "@/store/useInquiryStore";

export function CartPage() {
  const { locale } = useLanguage();
  const hasHydrated = useHasHydrated();
  const totalItems = useInquiryStore((state) => state.totalItems);
  const token = useAuthStore((state) => state.token);
  const { hydratedItems, isLoading, error } = useCartHydration();
  const { submitToOmega, isCompiling, hashData, error: checkoutError, primaryItem } = useCheckoutPipeline();
  const hasItems = hasHydrated && hydratedItems.length > 0;
  const hasGatedItems = hydratedItems.some((item) => item.price_status === "authenticated" && !item.current_price);

  return (
    <main className="min-h-screen bg-background-obsidian text-text-primary">
      <StealthNavbar />
      {isCompiling ? <CheckoutLoader hashData={hashData} primaryItem={primaryItem} /> : null}

      <section className="mx-auto max-w-[1180px] px-5 pb-24 pt-32 md:px-10">
        <div className="grid gap-8 border-b border-border-metallic pb-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-platinum">{pickLocalized(locale, { en: "Quote Review", ar: "مراجعة عرض السعر" })}</p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">
              {pickLocalized(locale, { en: "Hydrate the inquiry before handoff.", ar: "راجع الاستفسار قبل ما يتبعت." })}
            </h1>
          </div>
          <div className="glass-panel h-fit rounded-md p-5">
            <p className="text-sm text-text-secondary">
              {pickLocalized(locale, {
                en: "Prices and availability are synced from `/api/v1/products/sync` before quote generation. WhatsApp receives hash-only context.",
                ar: "بنحدث السعر والتوافر قبل طلب عرض السعر، وبعدها يتبعت مرجع مختصر للتواصل.",
              })}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            {!hasHydrated ? (
              <div className="glass-panel rounded-md p-8">
                <h2 className="font-headline text-3xl text-white">{pickLocalized(locale, { en: "Restoring inquiry", ar: "بنرجع الاستفسار" })}</h2>
              </div>
            ) : null}

            {hasHydrated && !hasItems ? (
              <div className="glass-panel rounded-md p-8">
                <ClipboardList aria-hidden className="h-8 w-8 text-accent-steel" strokeWidth={1.5} />
                <h2 className="mt-6 font-headline text-4xl text-white">{pickLocalized(locale, { en: "No inquiry items yet", ar: "لسه مفيش منتجات في الاستفسار" })}</h2>
                <p className="mt-3 text-text-secondary">
                  {pickLocalized(locale, { en: "Start from the catalog or fit-out flow before generating a quote.", ar: "ابدأ من الكتالوج أو تجهيز المحل قبل طلب عرض السعر." })}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href="/catalog" icon={ArrowRight}>
                    {pickLocalized(locale, { en: "Browse Catalog", ar: "تصفح المنتجات" })}
                  </Button>
                  <Button href="/fit-out" icon={ArrowRight} variant="glass">
                    {pickLocalized(locale, { en: "Start Fit-Out", ar: "ابدأ تجهيز المحل" })}
                  </Button>
                </div>
              </div>
            ) : null}

            {hasItems ? hydratedItems.map((item) => <CartItem key={item.id} item={item} />) : null}

            {error ? (
              <p className="border border-border-metallic p-4 text-sm text-text-secondary">
                {pickLocalized(locale, { en: error, ar: "مش قادرين نحدث بيانات الاستفسار دلوقتي." })}
              </p>
            ) : null}
            {checkoutError ? (
              <p className="border border-border-metallic p-4 text-sm text-text-secondary">
                {pickLocalized(locale, { en: checkoutError, ar: "مش قادرين نجهز عرض السعر دلوقتي." })}
              </p>
            ) : null}
          </section>

          <aside className="glass-panel h-fit rounded-md p-6">
            <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: "Inquiry total", ar: "إجمالي الاستفسار" })}</p>
            <p className="mt-2 text-4xl font-semibold text-white">{hasHydrated ? totalItems() : 0}</p>
            <div className="mt-6 space-y-3 border-y border-border-metallic py-5 text-sm text-text-secondary">
              <p>{pickLocalized(locale, { en: "Hydration", ar: "تحديث البيانات" })}: {isLoading ? pickLocalized(locale, { en: "Syncing latest backend data", ar: "بنحدث آخر بيانات" }) : pickLocalized(locale, { en: "Ready", ar: "جاهز" })}</p>
              <p>{pickLocalized(locale, { en: "Quote payload: product ids and quantities only", ar: "طلب السعر: أرقام المنتجات والكميات بس" })}</p>
              <p>{pickLocalized(locale, { en: "WhatsApp payload: hash reference only", ar: "الواتساب: مرجع مختصر بس" })}</p>
            </div>

            {hasGatedItems && !token ? (
              <Link
                href="/login"
                className="mt-5 flex items-start gap-3 border border-border-metallic bg-white/[0.02] p-4 text-sm text-text-secondary hover:border-white"
              >
                <LockKeyhole aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-steel" strokeWidth={1.8} />
                {pickLocalized(locale, { en: "Login to reveal authenticated pricing before submission.", ar: "سجل دخولك علشان تظهر الأسعار المحمية قبل الإرسال." })}
              </Link>
            ) : null}

            <Button
              icon={ArrowRight}
              onClick={submitToOmega}
              disabled={!hasItems || isLoading || isCompiling}
              className="mt-6 w-full"
            >
              {pickLocalized(locale, { en: "Confirm & Generate Quote", ar: "أكد واطلب عرض السعر" })}
            </Button>
          </aside>
        </div>
      </section>
    </main>
  );
}
