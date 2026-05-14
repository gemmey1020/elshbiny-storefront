"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { categoryName, labelFromValue, pickLocalized } from "@/i18n/config";
import { uiCopy } from "@/i18n/copy";
import type { Category } from "@/lib/catalog";

export type CatalogFilters = {
  category?: string;
  material?: string;
  gender?: string;
  pose?: string;
};

type FilterSidebarProps = {
  categories: Category[];
  filters: CatalogFilters;
  facetOptions: {
    material: string[];
    gender: string[];
    pose: string[];
  };
  resultCount?: number;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  onFilterChange: (key: keyof CatalogFilters, value?: string) => void;
  onClear: () => void;
};

function FilterGroup({
  title,
  values,
  active,
  onSelect,
}: {
  title: string;
  values: string[];
  active?: string;
  onSelect: (value?: string) => void;
}) {
  const { locale } = useLanguage();

  return (
    <section className="space-y-3">
      <h3 className="font-headline text-sm uppercase text-accent-platinum">{title}</h3>
      <div className="grid gap-2">
        {values.length === 0 ? (
          <p className="border border-border-metallic bg-white/[0.02] p-3 text-sm text-text-secondary">
            {pickLocalized(locale, {
              en: "Options appear when the showroom has enough product variety.",
              ar: "الاختيارات هتظهر لما يبقى فيه تنوع كفاية في المنتجات.",
            })}
          </p>
        ) : null}
        {values.map((value) => {
          const selected = active === value;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(selected ? undefined : value)}
              className={`flex h-11 items-center justify-between border px-3 text-left text-sm transition ${
                selected
                  ? "border-accent-white bg-accent-white text-background-obsidian"
                  : "border-border-metallic bg-white/[0.02] text-text-primary hover:border-white"
              }`}
            >
              <span>{labelFromValue(value, locale)}</span>
              <span className="text-xs uppercase opacity-70">
                {selected ? pickLocalized(locale, { en: "on", ar: "مفعل" }) : pickLocalized(locale, { en: "off", ar: "مقفل" })}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function FilterSidebar({
  categories,
  filters,
  facetOptions,
  resultCount,
  mobileOpen = false,
  onMobileClose,
  onFilterChange,
  onClear,
}: FilterSidebarProps) {
  const { locale } = useLanguage();
  const content = (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: "Studio Filters", ar: "فلاتر المعرض" })}</p>
          <h2 className="mt-2 font-headline text-3xl text-white">{pickLocalized(locale, { en: "Refine the lineup", ar: "ظبط اختياراتك" })}</h2>
        </div>
        <button
          type="button"
          aria-label={pickLocalized(locale, { en: "Close filters", ar: "اقفل الفلاتر" })}
          onClick={onMobileClose}
          className="inline-flex h-10 w-10 items-center justify-center border border-border-metallic text-white md:hidden"
        >
          <X aria-hidden className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 border-y border-border-metallic py-4">
        <div>
          <p className="text-xs uppercase text-text-secondary">{pickLocalized(locale, { en: "Results", ar: "النتائج" })}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{resultCount ?? "..."}</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="border border-border-metallic px-3 text-sm font-semibold uppercase text-text-primary transition hover:border-white"
        >
          {pickLocalized(locale, uiCopy.common.clear)}
        </button>
      </div>

      <section className="space-y-3">
        <h3 className="font-headline text-sm uppercase text-accent-platinum">{pickLocalized(locale, { en: "Category", ar: "التصنيف" })}</h3>
        <div className="grid gap-2">
          {categories.length === 0 ? (
            <p className="border border-border-metallic bg-white/[0.02] p-3 text-sm text-text-secondary">
              {pickLocalized(locale, { en: "Categories are being prepared for this showroom.", ar: "التصنيفات بتتجهز للمعرض." })}
            </p>
          ) : null}
          {categories.map((category) => {
            const selected = filters.category === category.slug;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onFilterChange("category", selected ? undefined : category.slug)}
                className={`flex min-h-12 items-center justify-between gap-3 border px-3 text-left text-sm transition ${
                  selected
                    ? "border-accent-white bg-accent-white text-background-obsidian"
                    : "border-border-metallic bg-white/[0.02] text-text-primary hover:border-white"
                }`}
              >
                <span>{categoryName(category, locale)}</span>
                <span className="text-xs uppercase opacity-70">{category.products_count ?? "-"}</span>
              </button>
            );
          })}
        </div>
      </section>

      <FilterGroup
        title={pickLocalized(locale, { en: "Material", ar: "الخامة" })}
        values={facetOptions.material}
        active={filters.material}
        onSelect={(value) => onFilterChange("material", value)}
      />
      <FilterGroup
        title={pickLocalized(locale, { en: "Gender", ar: "النوع" })}
        values={facetOptions.gender}
        active={filters.gender}
        onSelect={(value) => onFilterChange("gender", value)}
      />
      <FilterGroup title={pickLocalized(locale, { en: "Pose", ar: "الوضعية" })} values={facetOptions.pose} active={filters.pose} onSelect={(value) => onFilterChange("pose", value)} />
    </div>
  );

  return (
    <>
      <aside className="glass-panel sticky top-24 hidden h-fit w-80 shrink-0 rounded-md p-6 md:block">{content}</aside>
      <div
        className={`fixed inset-0 z-[70] bg-background-obsidian/80 backdrop-blur-sm transition md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <aside
          className={`glass-panel ml-auto h-full w-[88vw] max-w-sm overflow-y-auto rounded-l-md p-5 transition duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {content}
        </aside>
      </div>
    </>
  );
}

export function MobileFilterButton({ count, onClick }: { count?: number; onClick: () => void }) {
  const { locale } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 left-5 right-5 z-40 flex h-12 items-center justify-center gap-3 border border-accent-white bg-accent-white text-sm font-bold uppercase text-background-obsidian shadow-[0_0_24px_rgba(255,255,255,0.16)] md:hidden"
    >
      <SlidersHorizontal aria-hidden className="h-4 w-4" strokeWidth={1.8} />
      {pickLocalized(locale, { en: "View filters", ar: "شوف الفلاتر" })}
      <span className="border border-background-obsidian/20 px-2 py-1">{count ?? "..."}</span>
    </button>
  );
}
