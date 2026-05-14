import type { Category, Product } from "@/lib/catalog";
import type { FaqCategory } from "@/data/faqs";

export type Locale = "ar" | "en";

export const DEFAULT_LOCALE: Locale = "ar";
export const LOCALE_STORAGE_KEY = "elshbiny.locale";

export const localeLabels: Record<Locale, { short: string; label: string; dir: "rtl" | "ltr" }> = {
  ar: { short: "عربي", label: "العربية", dir: "rtl" },
  en: { short: "EN", label: "English", dir: "ltr" },
};

export type LocalizedPair = {
  en?: string | null;
  ar?: string | null;
};

export function directionFor(locale: Locale) {
  return localeLabels[locale].dir;
}

export function pickLocalized(locale: Locale, value: LocalizedPair, fallback = "") {
  const preferred = locale === "ar" ? value.ar : value.en;
  const secondary = locale === "ar" ? value.en : value.ar;

  return preferred?.trim() || secondary?.trim() || fallback;
}

export function categoryName(category: Category | Product["category"] | { name_en?: string | null; name_ar?: string | null }, locale: Locale) {
  if (!category) {
    return locale === "ar" ? "قطعة عرض" : "Studio Object";
  }

  if (typeof category === "string") {
    return category;
  }

  return pickLocalized(locale, { en: category.name_en, ar: category.name_ar }, locale === "ar" ? "تصنيف عرض" : "Studio Object");
}

export function categoryDescription(category: Category, locale: Locale) {
  return pickLocalized(locale, { en: category.description_en, ar: category.description_ar }, locale === "ar" ? "شوف منتجات التصنيف ده." : "Browse this retail display category.");
}

export function productName(product: Pick<Product, "name_en" | "name_ar">, locale: Locale) {
  return pickLocalized(locale, { en: product.name_en, ar: product.name_ar }, product.name_en);
}

export function priceCopy(locale: Locale, status?: Product["price_visibility"], price?: string | null) {
  if (price) {
    return price;
  }

  if (status === "authenticated") {
    return locale === "ar" ? "سجل دخولك علشان تشوف السعر" : "Login to View Price";
  }

  return locale === "ar" ? "اطلب السعر" : "Contact for Price";
}

export const faqCategoryLabels: Record<FaqCategory, { en: string; ar: string }> = {
  "Store Setup": { en: "Store Setup", ar: "تجهيز المحلات" },
  Mannequins: { en: "Mannequins", ar: "المانيكانات" },
  "Pricing & Orders": { en: "Pricing & Orders", ar: "الأسعار والطلبات" },
  "Materials & Quality": { en: "Materials & Quality", ar: "الخامات والجودة" },
  Delivery: { en: "Delivery", ar: "التوصيل" },
  "Custom Work": { en: "Custom Work", ar: "الشغل الخاص" },
  "B2B / Wholesale": { en: "B2B / Wholesale", ar: "الجملة والشركات" },
};

export function faqCategoryName(category: FaqCategory, locale: Locale) {
  return faqCategoryLabels[category][locale];
}

const specLabels: Record<string, { en: string; ar: string }> = {
  material: { en: "Material", ar: "الخامة" },
  pose: { en: "Pose", ar: "الوضعية" },
  gender: { en: "Gender", ar: "النوع" },
  mount_type: { en: "Mount Type", ar: "نوع التثبيت" },
  height: { en: "Height", ar: "الارتفاع" },
  weight: { en: "Weight", ar: "الوزن" },
  assembly: { en: "Assembly", ar: "طريقة التركيب" },
};

export function formatSpecLabel(key: string, locale: Locale) {
  const normalized = key.toLowerCase();
  const known = specLabels[normalized];

  if (known) {
    return known[locale];
  }

  return key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function labelFromValue(value: string, locale: Locale) {
  if (locale === "ar") {
    const common: Record<string, string> = {
      male: "رجالي",
      female: "حريمي",
      kids: "أطفال",
      chrome: "كروم",
      fiberglass: "فايبر جلاس",
      seated: "قاعد",
      standing: "واقف",
      abstract: "مجرد",
      athletic: "رياضي",
    };

    return common[value.toLowerCase()] ?? value;
  }

  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
