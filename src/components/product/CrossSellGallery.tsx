"use client";

import { MannequinCard } from "@/components/ui/MannequinCard";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Product } from "@/lib/catalog";

export function CrossSellGallery({ products }: { products?: Product[] }) {
  const { locale } = useLanguage();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-border-metallic pt-12">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase text-accent-platinum">{locale === "ar" ? "ترشيحات مناسبة" : "Cross Sell"}</p>
          <h2 className="mt-3 font-headline text-4xl text-white">{locale === "ar" ? "منتجات ممكن تكمل نفس العرض" : "Architectural recommendations"}</h2>
        </div>
        <p className="hidden max-w-sm text-sm text-text-secondary md:block">
          {locale === "ar"
            ? "ترشيحات قريبة من نفس التصنيف علشان تكمل شكل العرض في المحل."
            : "Served from the verified product detail contract as embedded category-proximity recommendations."}
        </p>
      </div>
      <div className="flex snap-x gap-6 overflow-x-auto pb-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] snap-start md:min-w-[320px]">
            <MannequinCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
