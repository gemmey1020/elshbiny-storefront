"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, LockKeyhole } from "lucide-react";
import { MannequinSilhouette } from "@/components/shared/MannequinSilhouette";
import { useLanguage } from "@/i18n/LanguageProvider";
import { categoryName, priceCopy, productName, labelFromValue, type Locale } from "@/i18n/config";

export type MannequinProduct = {
  id: number;
  name_en: string;
  name_ar?: string | null;
  slug: string;
  sku?: string | null;
  base_price?: string | null;
  price_visibility?: "public" | "authenticated" | "hidden";
  category?: { name_en?: string | null; name_ar?: string | null } | string | null;
  technical_specs?: Record<string, string | number | boolean | null | undefined> | null;
  media?: {
    tiny_float_url?: string | null;
    catalog_url?: string | null;
  } | null;
  image_tiny?: string | null;
};

type MannequinCardProps = {
  product: MannequinProduct;
  href?: string;
};

function productImage(product: MannequinProduct) {
  return product.media?.tiny_float_url ?? product.media?.catalog_url ?? product.image_tiny ?? null;
}

function specPreview(product: MannequinProduct, locale: Locale) {
  const specs = product.technical_specs ?? {};
  const values = [specs.material, specs.pose, specs.gender]
    .filter(Boolean)
    .map((val) => labelFromValue(String(val), locale));

  const fallback = product.sku ?? (locale === "ar" ? "المواصفات قيد الإعداد" : "Spec matrix pending");
  return values.length > 0 ? values.join(" / ") : fallback;
}

export function MannequinCard({ product, href }: MannequinCardProps) {
  const { locale } = useLanguage();
  const imageUrl = productImage(product);
  const productHref = href ?? `/catalog/${product.slug}`;
  const gated = !product.base_price && product.price_visibility === "authenticated";
  const name = productName(product, locale);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="glass-panel group overflow-hidden rounded-md p-4"
    >
      <Link href={productHref} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-white">
        <div className="relative aspect-[3/4] overflow-hidden rounded bg-black/20">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              unoptimized
              sizes="(min-width: 1024px) 320px, 90vw"
              className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
            />
          ) : (
            <MannequinSilhouette />
          )}
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <p className="text-xs uppercase text-text-secondary">{categoryName(product.category, locale)}</p>
            <h3 className="mt-2 font-headline text-2xl text-white">{name}</h3>
          </div>
          <p className="min-h-5 text-sm text-text-secondary">{specPreview(product, locale)}</p>
          <div className="flex items-center justify-between gap-4 border-t border-border-metallic pt-4">
            <span className="text-sm font-semibold text-white">{priceCopy(locale, product.price_visibility, product.base_price)}</span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-accent-platinum">
              {gated ? (
                <LockKeyhole aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              ) : (
                <ClipboardList aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              )}
              {locale === "ar" ? "التفاصيل" : "Specs"}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
