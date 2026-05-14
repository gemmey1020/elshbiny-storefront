"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MannequinSilhouette } from "@/components/shared/MannequinSilhouette";
import type { HydratedInquiryItem } from "@/hooks/useCartHydration";
import { useLanguage } from "@/i18n/LanguageProvider";
import { priceCopy, productName } from "@/i18n/config";
import { useInquiryStore } from "@/store/useInquiryStore";

function priceLabel(item: HydratedInquiryItem, locale: "ar" | "en") {
  if (item.current_price) {
    return item.current_price;
  }

  if (item.price_status === "authenticated") {
    return locale === "ar" ? "السعر محمي - سجل دخولك" : "Price Gated - Login to View";
  }

  if (item.price_status === "missing") {
    return locale === "ar" ? "مستني التحديث" : "Sync Pending";
  }

  return priceCopy(locale, item.price_status === "public" ? "public" : "hidden", null);
}

export function CartItem({ item }: { item: HydratedInquiryItem }) {
  const { locale } = useLanguage();
  const setQuantity = useInquiryStore((state) => state.setQuantity);
  const removeItem = useInquiryStore((state) => state.removeItem);
  const imageUrl = item.freshProduct?.media?.tiny_float_url ?? item.freshProduct?.media?.catalog_url ?? item.image_tiny;
  const slug = item.freshProduct?.slug ?? item.slug;
  const name = item.freshProduct ? productName(item.freshProduct, locale) : productName(item, locale);

  return (
    <article className="glass-panel grid gap-5 rounded-md p-4 md:grid-cols-[112px_1fr_auto] md:items-center">
      <div className="relative aspect-[3/4] w-28 overflow-hidden border border-border-metallic bg-black/20">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill unoptimized sizes="112px" className="object-cover" />
        ) : (
          <MannequinSilhouette />
        )}
      </div>

      <div className="min-w-0">
        <p className="rtl-ltr text-xs uppercase text-text-secondary">{item.sku ?? (locale === "ar" ? "الكود بيتجهز" : "SKU Pending")}</p>
        <h2 className="mt-2 font-headline text-3xl text-white">{name}</h2>
        {slug ? (
          <Link href={`/catalog/${slug}`} className="mt-3 inline-block text-sm font-semibold uppercase text-accent-platinum">
            {locale === "ar" ? "افتح المنتج" : "Inspect product"}
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 md:min-w-56 md:justify-items-end">
        <div className="text-left md:text-right">
          <p className="text-xs uppercase text-text-secondary">{locale === "ar" ? "السعر الحالي" : "Current price"}</p>
          <p className="mt-1 text-lg font-semibold text-white">{priceLabel(item, locale)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={locale === "ar" ? "قلل الكمية" : "Decrease quantity"}
            onClick={() => setQuantity(item.id, item.quantity - 1)}
            className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
          >
            <Minus aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <span className="inline-flex h-10 min-w-12 items-center justify-center border border-border-metallic px-3 text-sm font-semibold text-white">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label={locale === "ar" ? "زود الكمية" : "Increase quantity"}
            onClick={() => setQuantity(item.id, item.quantity + 1)}
            className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
          >
            <Plus aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label={locale === "ar" ? "احذف المنتج" : "Remove item"}
            onClick={() => removeItem(item.id)}
            className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white hover:border-white"
          >
            <Trash2 aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}
